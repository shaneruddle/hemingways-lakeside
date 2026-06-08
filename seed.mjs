// Firestore seed script via REST API — node seed.mjs
import { readFileSync } from 'fs'

// Load .env.local
const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split('\n')
    .filter(l => l.includes('='))
    .map(l => {
      const idx = l.indexOf('=')
      return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()]
    })
)

const PROJECT_ID = env.VITE_FIREBASE_PROJECT_ID
const API_KEY = env.VITE_FIREBASE_API_KEY
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`

// Sign in with email/password to get an ID token for authenticated writes
const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error('Usage: ADMIN_EMAIL=x ADMIN_PASSWORD=y node seed.mjs')
  process.exit(1)
}

// Get Firebase ID token
const authRes = await fetch(
  `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD, returnSecureToken: true }),
  }
)

if (!authRes.ok) {
  const err = await authRes.json()
  console.error('Auth failed:', err.error?.message)
  process.exit(1)
}

const { idToken } = await authRes.json()
console.log('✓ Authenticated\n')

// Helpers
function toFirestore(val) {
  if (val === null || val === undefined) return { nullValue: null }
  if (typeof val === 'boolean') return { booleanValue: val }
  if (typeof val === 'number') return Number.isInteger(val) ? { integerValue: String(val) } : { doubleValue: val }
  if (typeof val === 'string') return { stringValue: val }
  if (Array.isArray(val)) return { arrayValue: { values: val.map(toFirestore) } }
  if (typeof val === 'object') {
    return {
      mapValue: {
        fields: Object.fromEntries(Object.entries(val).map(([k, v]) => [k, toFirestore(v)])),
      },
    }
  }
  return { stringValue: String(val) }
}

async function listDocs(col) {
  const res = await fetch(`${BASE}/${col}?key=${API_KEY}`)
  if (!res.ok) return []
  const data = await res.json()
  return data.documents || []
}

async function deleteDoc(name) {
  await fetch(`https://firestore.googleapis.com/v1/${name}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${idToken}` },
  })
}

async function addDoc(col, fields) {
  const res = await fetch(`${BASE}/${col}?key=${API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      fields: Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, toFirestore(v)])),
    }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(JSON.stringify(err))
  }
}

async function seed(col, docs) {
  // Clear existing
  const existing = await listDocs(col)
  for (const d of existing) await deleteDoc(d.name)
  // Add new
  for (const doc of docs) await addDoc(col, doc)
  console.log(`✓ ${col} — ${docs.length} docs`)
}

// ── Data ──────────────────────────────────────────────────────────────────────

const menu = [
  { name: 'Chicken Wings', description: '8 crispy wings, BBQ or buffalo sauce, celery sticks', price: 179, category: 'Starters', available: true },
  { name: 'Garlic Bread', description: 'Toasted baguette with garlic butter', price: 89, category: 'Starters', available: true },
  { name: 'Soup of the Day', description: "Ask your server for today's soup", price: 99, category: 'Starters', available: true },
  { name: 'Nachos', description: 'Tortilla chips, cheese, jalapeños, sour cream, salsa', price: 149, category: 'Starters', available: true },
  { name: 'Fish & Chips', description: 'Beer-battered cod, chunky chips, mushy peas, tartar sauce', price: 259, category: 'Mains', available: true },
  { name: 'Full English Breakfast', description: 'Eggs, bacon, sausages, beans, toast, mushrooms, tomato', price: 199, category: 'Mains', available: true },
  { name: 'Bangers & Mash', description: 'Pork sausages, creamy mash, onion gravy', price: 219, category: 'Mains', available: true },
  { name: 'Steak & Ale Pie', description: 'Slow-cooked beef, shortcrust pastry, chips, peas', price: 269, category: 'Mains', available: true },
  { name: 'Chicken Schnitzel', description: 'Breaded chicken breast, chips, coleslaw, lemon', price: 239, category: 'Mains', available: true },
  { name: "Shepherd's Pie", description: 'Minced lamb, vegetables, creamy mash topping', price: 229, category: 'Mains', available: true },
  { name: 'Classic Burger', description: 'Beef patty, cheese, lettuce, tomato, gherkin, fries', price: 229, category: 'Burgers', available: true },
  { name: 'Bacon Cheeseburger', description: 'Double beef, streaky bacon, double cheese, fries', price: 259, category: 'Burgers', available: true },
  { name: 'Chicken Burger', description: 'Crispy fried chicken, slaw, pickles, mayo, fries', price: 219, category: 'Burgers', available: true },
  { name: 'Mushroom Swiss Burger', description: 'Beef patty, sautéed mushrooms, Swiss cheese, fries', price: 239, category: 'Burgers', available: true },
  { name: 'Pad Thai', description: 'Classic Thai noodles, chicken or prawns, bean sprouts, egg', price: 149, category: 'Thai Food', available: true },
  { name: 'Green Curry', description: 'Authentic Thai green curry, jasmine rice — chicken or tofu', price: 159, category: 'Thai Food', available: true },
  { name: 'Red Curry', description: 'Rich Thai red curry, jasmine rice — beef or chicken', price: 159, category: 'Thai Food', available: true },
  { name: 'Fried Rice', description: 'Thai fried rice, egg, vegetables — choice of protein', price: 139, category: 'Thai Food', available: true },
  { name: 'Tom Yum Soup', description: 'Spicy Thai soup, lemongrass, mushrooms, prawns', price: 149, category: 'Thai Food', available: true },
  { name: 'Kids Fish & Chips', description: 'Smaller portion of our famous fish & chips', price: 119, category: 'Kids Menu', available: true },
  { name: 'Kids Burger & Chips', description: 'Beef burger with fries and ketchup', price: 109, category: 'Kids Menu', available: true },
  { name: 'Kids Pizza', description: 'Margherita pizza, crispy base', price: 109, category: 'Kids Menu', available: true },
  { name: 'Chicken Nuggets & Chips', description: '6 nuggets, fries, ketchup or sweet chilli', price: 99, category: 'Kids Menu', available: true },
  { name: 'Sticky Toffee Pudding', description: 'Warm sponge, toffee sauce, vanilla ice cream', price: 129, category: 'Desserts', available: true },
  { name: 'Chocolate Brownie', description: 'Warm brownie, chocolate sauce, vanilla ice cream', price: 119, category: 'Desserts', available: true },
  { name: 'Apple Crumble', description: 'Baked apple crumble, custard or cream', price: 119, category: 'Desserts', available: true },
  { name: 'Ice Cream (3 scoops)', description: 'Vanilla, chocolate, strawberry', price: 89, category: 'Desserts', available: true },
  { name: 'Draught Beer (Pint)', description: 'Chang, Leo, Singha — ask about guest taps', price: 99, category: 'Drinks', available: true },
  { name: 'Draught Beer (Half)', description: 'Half pint of draught beer', price: 59, category: 'Drinks', available: true },
  { name: 'Bottled Beer', description: 'Heineken, Corona, Tiger, Asahi', price: 89, category: 'Drinks', available: true },
  { name: 'House Wine (Glass)', description: 'Red or white, ask your server', price: 149, category: 'Drinks', available: true },
  { name: 'Soft Drink', description: 'Coke, Diet Coke, Sprite, Fanta, juice', price: 59, category: 'Drinks', available: true },
  { name: 'Coffee', description: 'Espresso, Americano, Latte, Cappuccino', price: 69, category: 'Drinks', available: true },
]

const specials = [
  { title: 'Monday Wing Night', description: 'Buy 8 wings get 8 free — crispy wings all day Monday', day: 'Monday', active: true },
  { title: 'Steak Tuesday', description: 'Sirloin steak + fries + sauce only ฿299', day: 'Tuesday', price: 299, active: true },
  { title: 'Burger Wednesday', description: 'Any burger + a pint for ฿259', day: 'Wednesday', price: 259, active: true },
  { title: 'Thirsty Thursday', description: 'All cocktails ฿99 from 4pm–7pm', day: 'Thursday', active: true },
  { title: 'Fish Friday', description: 'Traditional fish & chips all day ฿199', day: 'Friday', price: 199, active: true },
  { title: 'Sunday Roast', description: 'A proper Sunday roast — beef, chicken or pork ฿279. Starts noon, book early, always sells out!', day: 'Sunday', price: 279, active: true },
  { title: 'Happy Hour', description: 'All draught beers ฿79/pint — daily 4pm–6pm', day: 'Daily', active: true },
]

const sports = [
  { title: 'Premier League', teams: 'Man City vs Chelsea', competition: 'Premier League', date: '2026-06-14', time: '17:30', channel: 'True Premier', featured: true },
  { title: 'Champions League', teams: 'Real Madrid vs PSG', competition: 'UEFA Champions League', date: '2026-06-15', time: '21:00', channel: 'True Sport', featured: true },
  { title: 'Formula 1', teams: 'Canadian Grand Prix', competition: 'Formula 1', date: '2026-06-15', time: '20:00', channel: 'True Sport 3', featured: false },
  { title: 'Premier League', teams: 'Liverpool vs Tottenham', competition: 'Premier League', date: '2026-06-16', time: '20:00', channel: 'True Premier', featured: false },
  { title: 'Boxing', teams: 'World Title Fight TBC', competition: 'World Boxing', date: '2026-06-17', time: '05:00', channel: 'True Sport 2', featured: false },
  { title: 'UFC', teams: 'UFC Fight Night', competition: 'UFC', date: '2026-06-20', time: '09:00', channel: 'True Sport 2', featured: false },
]

const poolPackages = [
  {
    name: 'Pool Day Pass',
    description: 'Full day access to our swimming pool with a sun lounger and welcome drink.',
    price: 200,
    includes: ['Full day pool access (8am–9pm)', 'Sun lounger', 'Complimentary welcome drink'],
  },
  {
    name: 'Pool & Lunch',
    description: 'The most popular option — pool access plus a full meal and drinks.',
    price: 500,
    includes: ['Full day pool access', 'Sun lounger', '1 main course of your choice', '2 draught beers or soft drinks'],
  },
  {
    name: 'Family Package',
    description: 'Perfect for a family day out. Pool, food, and drinks for the whole family.',
    price: 1500,
    includes: ['Full day pool access for 2 adults + 2 kids', 'Sun loungers for all', '4 meals (adult or kids menu)', 'Soft drinks for kids, beers for adults'],
  },
]

// ── Run ───────────────────────────────────────────────────────────────────────

console.log('🌱 Seeding Firestore...\n')

await seed('menu', menu)
await seed('specials', specials)
await seed('sports', sports)
await seed('pool_packages', poolPackages)

console.log('\n✅ Done! Firestore is seeded.')
process.exit(0)
