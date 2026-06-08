import { useState, useEffect } from 'react'
import { getMenuItems } from '../lib/firestore'
import type { MenuItem } from '../types'

const fallbackCategories = ['Starters', 'Mains', 'Burgers', 'Thai Food', 'Desserts', 'Drinks']

const fallbackItems: MenuItem[] = [
  { id: '1', name: 'Fish & Chips', description: 'Battered cod fillet, chunky chips, mushy peas, tartar sauce', price: 259, category: 'Mains', available: true },
  { id: '2', name: 'Full English Breakfast', description: 'Eggs, bacon, sausages, beans, toast, mushrooms, tomato', price: 199, category: 'Mains', available: true },
  { id: '3', name: 'Classic Burger', description: 'Beef patty, cheese, lettuce, tomato, gherkin, fries', price: 229, category: 'Burgers', available: true },
  { id: '4', name: 'Chicken Wings', description: '8 crispy wings, your choice of sauce, celery sticks', price: 179, category: 'Starters', available: true },
  { id: '5', name: 'Pad Thai', description: 'Classic Thai noodles with your choice of chicken or prawns', price: 149, category: 'Thai Food', available: true },
  { id: '6', name: 'Green Curry', description: 'Authentic Thai green curry, jasmine rice', price: 159, category: 'Thai Food', available: true },
  { id: '7', name: 'Draught Beer (Pint)', description: 'Ask about our selection of draught beers and ciders', price: 99, category: 'Drinks', available: true },
  { id: '8', name: 'Sticky Toffee Pudding', description: 'Warm pudding, toffee sauce, vanilla ice cream', price: 129, category: 'Desserts', available: true },
]

export default function Menu() {
  const [items, setItems] = useState<MenuItem[]>(fallbackItems)
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMenuItems()
      .then(data => { if (data.length) setItems(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const categories = ['All', ...Array.from(new Set(items.map(i => i.category)))]
  const filtered = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory)

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-[#1a0d00] to-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Culinary Excellence</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">Food Menu</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Authentic British pub favourites, quality Western dishes, and traditional Thai specialties.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="sticky top-16 md:top-20 z-30 bg-[#0d0d0d]/95 backdrop-blur border-b border-white/10 py-4 px-4">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-[#c9a84c] text-black font-bold'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Items */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#141414] rounded-2xl h-36 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.filter(i => i.available).map(item => (
                <div key={item.id} className="bg-[#141414] border border-white/5 rounded-2xl p-6 hover:border-[#c9a84c]/20 transition-colors">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <span className="text-xs text-[#c9a84c] tracking-wider uppercase">{item.category}</span>
                      <h3 className="text-white font-bold mt-1 mb-1">{item.name}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                    </div>
                    <span className="text-[#c9a84c] font-bold text-lg shrink-0">฿{item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Note */}
      <section className="py-8 px-4 text-center border-t border-white/5">
        <p className="text-gray-600 text-sm">Menu items and prices may vary. Ask our staff for today's specials.</p>
      </section>
    </div>
  )
}
