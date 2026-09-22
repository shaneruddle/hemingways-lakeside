import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getMenuPages } from '../lib/firestore'
import Seo from '../components/Seo'
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
      <Seo
        title="Lakeside Menu & Prices - Hemingways Lakeside, East Pattaya"
        description="Full food menu for Hemingways Lakeside (Lake Mabprachan, East Pattaya): English breakfast from 165 THB, fish & chips 325, Australian steaks from 550, Sunday roast carvery from 279, Thai, Indian, pizzas, burgers and kids' meals."
      />
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 bg-[#f6efe0]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-4">Culinary Excellence</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-[#1a1512]">Lakeside Food Menu</h1>
          <p className="text-[#5c5346] text-lg max-w-xl mx-auto">
            Authentic British pub favourites, quality Western dishes, and traditional Thai specialties.
          </p>
          <p className="text-[#5c5346] text-sm mt-4">
            Quick prices: <Link to="/food" className="underline hover:text-[#8a6d2f]">pub classics &amp; breakfast</Link> ·{' '}
            <Link to="/steak" className="underline hover:text-[#8a6d2f]">steaks</Link> ·{' '}
            <Link to="/sunday-roast" className="underline hover:text-[#8a6d2f]">Sunday roast</Link>
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur border-b border-black/10 py-4 px-4">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-[#c9a84c] text-black font-bold'
                  : 'bg-black/5 text-[#5c5346] hover:text-[#1a1512] border border-black/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Designed menu pages */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#f6efe0] rounded-2xl aspect-[2/3] animate-pulse" />
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
                      className="group relative rounded-2xl overflow-hidden border border-black/10 hover:border-[#c9a84c]/40 transition-colors cursor-pointer bg-[#f6efe0] shadow-sm"
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
                <div className="text-center text-[#5c5346] py-16">Nothing in this category yet</div>
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

      {/* Cross-links */}
      <section className="py-16 px-4 bg-[#f6efe0] border-t border-black/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <Link to="/food" className="bg-white border border-black/5 rounded-xl p-5 shadow-sm hover:border-[#c9a84c]/40 transition-colors">
            <span className="text-[#1a1512] font-semibold text-sm">Pub Classics</span>
          </Link>
          <Link to="/sunday-roast" className="bg-white border border-black/5 rounded-xl p-5 shadow-sm hover:border-[#c9a84c]/40 transition-colors">
            <span className="text-[#1a1512] font-semibold text-sm">Sunday Roast</span>
          </Link>
          <Link to="/beer-garden" className="bg-white border border-black/5 rounded-xl p-5 shadow-sm hover:border-[#c9a84c]/40 transition-colors">
            <span className="text-[#1a1512] font-semibold text-sm">Beer Garden</span>
          </Link>
        </div>
      </section>

      {/* Note */}
      <section className="py-8 px-4 text-center bg-white border-t border-black/5">
        <p className="text-[#5c5346] text-sm">Menu items and prices may vary. Ask our staff for today's specials.</p>
      </section>
    </div>
  )
}
