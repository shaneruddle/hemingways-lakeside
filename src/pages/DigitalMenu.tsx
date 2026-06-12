import { useState, useEffect, useRef } from 'react'
import { getDigitalMenuItems, getMenuCategories } from '../lib/firestore'
import type { DigitalMenuItem, DigitalMenuCategory } from '../types'

export default function DigitalMenu() {
  const [categories, setCategories] = useState<DigitalMenuCategory[]>([])
  const [items, setItems] = useState<DigitalMenuItem[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [loading, setLoading] = useState(true)
  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    Promise.all([getMenuCategories(), getDigitalMenuItems()])
      .then(([cats, its]) => {
        setCategories(cats)
        setItems(its.filter(i => i.available))
      })
      .finally(() => setLoading(false))
  }, [])

  const visibleItems = activeCategory === 'All'
    ? items
    : items.filter(i => i.category === activeCategory)

  const categoryNames = ['All', ...categories.map(c => c.name)]

  const scrollTabIntoView = (name: string) => {
    const el = tabsRef.current?.querySelector(`[data-cat="${name}"]`) as HTMLElement | null
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  const handleCategoryClick = (name: string) => {
    setActiveCategory(name)
    scrollTabIntoView(name)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {/* Header */}
      <header className="bg-[#0a0a0a] border-b border-white/5 px-6 py-5 flex items-center justify-between">
        <div>
          <div className="text-[#c9a84c] font-bold tracking-[0.3em] uppercase text-sm">Hemingways</div>
          <div className="text-white text-xl font-bold tracking-wide">Lakeside Menu</div>
        </div>
        <div className="text-gray-600 text-xs text-right">
          Prices in Thai Baht (฿)<br />
          <span className="text-gray-700">Ask staff about allergens</span>
        </div>
      </header>

      {/* Sticky category tabs */}
      <div className="sticky top-0 z-20 bg-[#0d0d0d]/95 backdrop-blur border-b border-white/5">
        <div ref={tabsRef} className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
          {categoryNames.map(name => (
            <button
              key={name}
              data-cat={name}
              onClick={() => handleCategoryClick(name)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors shrink-0 ${
                activeCategory === name
                  ? 'bg-[#c9a84c] text-black font-bold'
                  : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="px-4 py-6 max-w-5xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-[#141414] rounded-2xl overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-white/5" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-white/5 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-full" />
                  <div className="h-3 bg-white/5 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : visibleItems.length === 0 ? (
          <div className="text-center text-gray-600 py-24">Nothing in this category yet</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleItems.map(item => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 px-4 border-t border-white/5 mt-8">
        <p className="text-gray-700 text-xs">Menu items and prices may vary · Ask our staff for today's specials</p>
      </footer>
    </div>
  )
}

function ItemCard({ item }: { item: DigitalMenuItem }) {
  const hasSecondPrice = item.price2 && item.price2Label

  return (
    <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden hover:border-[#c9a84c]/20 transition-colors flex flex-col">
      {item.imageUrl ? (
        <div className="aspect-[4/3] overflow-hidden bg-black">
          <img
            src={item.imageUrl}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-[4/3] bg-white/3 flex items-center justify-center">
          <span className="text-gray-700 text-xs">No image</span>
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white font-bold text-base mb-1 leading-snug">{item.name}</h3>
        {item.description && (
          <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-3">{item.description}</p>
        )}

        {/* Price */}
        <div className="mt-auto">
          {hasSecondPrice ? (
            <div className="flex gap-3">
              {item.priceLabel && (
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-600 uppercase tracking-wider">{item.priceLabel}</span>
                  <span className="text-[#c9a84c] font-bold text-lg">฿{item.price}</span>
                </div>
              )}
              {!item.priceLabel && <span className="text-[#c9a84c] font-bold text-lg">฿{item.price}</span>}
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-600 uppercase tracking-wider">{item.price2Label}</span>
                <span className="text-[#c9a84c] font-bold text-lg">฿{item.price2}</span>
              </div>
            </div>
          ) : (
            <span className="text-[#c9a84c] font-bold text-xl">฿{item.price}</span>
          )}
        </div>
      </div>
    </div>
  )
}
