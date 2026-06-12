import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { getMenuPages } from '../lib/firestore'
import type { MenuPage } from '../types'

export default function Menu() {
  const [pages, setPages] = useState<MenuPage[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState<MenuPage | null>(null)

  useEffect(() => {
    getMenuPages()
      .catch(() => [] as MenuPage[])
      .then(p => setPages(p))
      .finally(() => setLoading(false))
  }, [])

  const imageGroups = Array.from(new Set(pages.map(p => p.group)))
  const categories = ['All', ...imageGroups]

  const visiblePages =
    activeCategory === 'All' ? pages :
    pages.filter(p => p.group === activeCategory)

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

              {visiblePages.length === 0 && (
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
