import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { getMenuItems, getMenuPages } from '../lib/firestore'
import type { MenuItem, MenuPage } from '../types'

// Categories that have no designed menu page and render as text cards
const TEXT_CATEGORIES = ['Desserts', 'Drinks']

export default function Menu() {
  const [pages, setPages] = useState<MenuPage[]>([])
  const [items, setItems] = useState<MenuItem[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState<MenuPage | null>(null)

  useEffect(() => {
    Promise.all([
      getMenuPages().catch(() => [] as MenuPage[]),
      getMenuItems().catch(() => [] as MenuItem[]),
    ])
      .then(([p, i]) => { setPages(p); setItems(i) })
      .finally(() => setLoading(false))
  }, [])

  const imageGroups = Array.from(new Set(pages.map(p => p.group)))
  const textCategories = TEXT_CATEGORIES.filter(c => items.some(i => i.category === c && i.available))
  const categories = ['All', ...imageGroups, ...textCategories]

  const visiblePages =
    activeCategory === 'All' ? pages :
    imageGroups.includes(activeCategory) ? pages.filter(p => p.group === activeCategory) : []

  const visibleItems =
    activeCategory === 'All' ? items.filter(i => TEXT_CATEGORIES.includes(i.category) && i.available) :
    TEXT_CATEGORIES.includes(activeCategory) ? items.filter(i => i.category === activeCategory && i.available) : []

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

      {/* Designed menu pages */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#141414] rounded-2xl aspect-[2/3] animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              {visiblePages.length > 0 && (
                <div className={`grid grid-cols-1 gap-6 ${
                  visiblePages.length === 1
                    ? 'max-w-2xl mx-auto'
                    : 'md:grid-cols-2 lg:grid-cols-3'
                }`}>
                  {visiblePages.map(page => (
                    <button
                      key={page.id}
                      onClick={() => setLightbox(page)}
                      className="group relative rounded-2xl overflow-hidden border border-white/10 hover:border-[#c9a84c]/40 transition-colors cursor-pointer bg-[#141414]"
                    >
                      <img
                        src={page.imageUrl}
                        alt={`${page.name} menu`}
                        loading="lazy"
                        className="w-full h-auto"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Text categories (Desserts / Drinks) */}
              {visibleItems.length > 0 && (
                <div className={visiblePages.length > 0 ? 'mt-16' : ''}>
                  {TEXT_CATEGORIES.filter(c => visibleItems.some(i => i.category === c)).map(cat => (
                    <div key={cat} className="mb-12">
                      <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold">{cat}</h2>
                        <div className="flex-1 h-px bg-white/10" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {visibleItems.filter(i => i.category === cat).map(item => (
                          <div key={item.id} className="bg-[#141414] border border-white/5 rounded-2xl p-6 hover:border-[#c9a84c]/20 transition-colors">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex-1">
                                <h3 className="text-white font-bold mb-1">{item.name}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                              </div>
                              <span className="text-[#c9a84c] font-bold text-lg shrink-0">฿{item.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {visiblePages.length === 0 && visibleItems.length === 0 && (
                <div className="text-center text-gray-600 py-16">Nothing in this category yet</div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-start md:items-center justify-center p-4 overflow-y-auto"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="fixed top-6 right-6 z-50 text-white/70 hover:text-white"
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <img
            src={lightbox.imageUrl}
            alt={`${lightbox.name} menu`}
            className="max-w-full md:max-h-[95vh] md:object-contain rounded-lg"
          />
        </div>
      )}

      {/* Note */}
      <section className="py-8 px-4 text-center border-t border-white/5">
        <p className="text-gray-600 text-sm">Menu items and prices may vary. Ask our staff for today's specials.</p>
      </section>
    </div>
  )
}
