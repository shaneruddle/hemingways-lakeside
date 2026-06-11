// Seed menu_images Firestore collection from the designed menu-page images
// already uploaded to Storage under menu-categories/.
// Adds name, group and order fields so the frontend can render the menu book.
// node seed-menu-pages.mjs

import { initializeApp, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const serviceAccount = require('/Users/shaneruddle/Downloads/gen-lang-client-0174805651-ee94a058741d.json')

initializeApp({ credential: cert(serviceAccount), projectId: 'gen-lang-client-0174805651' })
const db = getFirestore('default')

const BUCKET = 'gen-lang-client-0174805651.firebasestorage.app'
const url = file =>
  `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent(`menu-categories/${file}`)}?alt=media`

// file in storage, display name, group, order
const PAGES = [
  ['1778836517441-Breakfast.jpg',           'Breakfast',           'Breakfast',          1],
  ['1778838345228-Breakfast Classics.jpg',  'Breakfast Classics',  'Breakfast',          2],
  ['1778838372072-Breakfast Eggs.jpg',      'Breakfast Eggs',      'Breakfast',          3],
  ['1778838397663-Snacks.jpg',              'Snacks',              'Snacks',             4],
  ['1778838420393-Sandwiches & Wraps.jpg',  'Sandwiches & Wraps',  'Sandwiches & Wraps', 5],
  ['1778838681821-Burgers.jpg',             'Burgers',             'Burgers',            6],
  ['1778838596802-Parmos.jpg',              'Parmos',              'Parmos',             7],
  ['1778838718113-Pies .jpg',               'Pies',                'Pies',               8],
  ['1778838621167-Pasta.jpg',               'Pasta',               'Pasta',              9],
  ['1778838752588-Pizzas.jpg',              'Pizzas',              'Pizzas',             10],
  ['1778838733115-Steak.jpg',               'Steak',               'Steak',              11],
  ['1778838640836-Main Meals.jpg',          'Main Meals',          'Main Meals',         12],
  ['1778838655624-Main Meals 2.jpg',        'Main Meals 2',        'Main Meals',         13],
  ['1778838696882-Indian.jpg',              'Indian',              'Indian',             14],
  ['1778838790473-Thai.jpg',                'Thai',                'Thai',               15],
  ['1778838839351-Thai 2.jpg',              'Thai 2',              'Thai',               16],
  ['1778838867422-Thai 3.jpg',              'Thai 3',              'Thai',               17],
  ['1778838888597-Kids Meal.jpg',           'Kids Meal',           'Kids Meal',          18],
]

const slugify = s => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

async function run() {
  // Remove stale test docs that point at old files
  const existing = await db.collection('menu_images').get()
  for (const doc of existing.docs) {
    console.log(`deleting stale doc: ${doc.id}`)
    await doc.ref.delete()
  }

  for (const [file, name, group, order] of PAGES) {
    const slug = slugify(name)
    await db.collection('menu_images').doc(slug).set({
      imageUrl: url(file),
      name,
      group,
      order,
      updatedAt: new Date().toISOString(),
    })
    console.log(`✓ ${slug} (${group} #${order})`)
  }
  console.log('Done:', PAGES.length, 'menu pages seeded.')
}

run().catch(e => { console.error(e); process.exit(1) })
