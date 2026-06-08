// Seed menu_images Firestore collection from known category slugs
// Constructs Firebase Storage download URLs without needing listAll permission
// node seed-menu-images.mjs

import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { createRequire } from 'module'
import https from 'https'

const require = createRequire(import.meta.url)
const serviceAccount = require('/Users/shaneruddle/Downloads/gen-lang-client-0174805651-ee94a058741d.json')

initializeApp({ credential: cert(serviceAccount), projectId: 'gen-lang-client-0174805651' })
const db = getFirestore('default')

const BUCKET = 'gen-lang-client-0174805651.firebasestorage.app'
const SLUGS = ['starters', 'mains', 'burgers', 'thai-food', 'kids-menu', 'desserts', 'drinks']
const EXTS = ['jpg', 'jpeg', 'png', 'webp']

// Test if a URL is accessible (returns 200)
function testUrl(url) {
  return new Promise(resolve => {
    const req = https.request(url, { method: 'HEAD' }, res => {
      resolve(res.statusCode === 200)
    })
    req.on('error', () => resolve(false))
    req.setTimeout(5000, () => { req.destroy(); resolve(false) })
    req.end()
  })
}

async function run() {
  console.log('Checking existing Firestore records...')
  const existing = await db.collection('menu_images').get()
  const existingSlugs = new Set(existing.docs.map(d => d.id))
  console.log('Already in Firestore:', [...existingSlugs].join(', ') || 'none')

  console.log('\nTrying to find images in Storage for each category...')

  for (const slug of SLUGS) {
    if (existingSlugs.has(slug)) {
      console.log(`✓ ${slug} — already in Firestore, skipping`)
      continue
    }

    let found = false
    for (const ext of EXTS) {
      const encodedPath = encodeURIComponent(`menu-categories/${slug}.${ext}`)
      const url = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodedPath}?alt=media`
      const ok = await testUrl(url)
      if (ok) {
        console.log(`✓ ${slug}.${ext} — found, saving to Firestore`)
        await db.collection('menu_images').doc(slug).set({
          imageUrl: url,
          updatedAt: new Date().toISOString(),
        })
        found = true
        break
      }
    }

    if (!found) {
      console.log(`✗ ${slug} — not found (may need to upload via admin panel)`)
    }
  }

  console.log('\nDone. Check /admin → Menu Images to verify.')
}

run().catch(console.error)
