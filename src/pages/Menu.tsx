import { useState, useEffect, useMemo } from 'react'
import { X, List, Image as ImageIcon } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { getMenuPages, getMenuCategories, getDigitalMenuItems } from '../lib/firestore'
import Seo from '../components/Seo'
import { buildMenuSchema } from '../lib/schema'
import type { MenuPage, DigitalMenuCategory, DigitalMenuItem } from '../types'

type View = 'prices' | 'boards'

/**
 * /menu — two views of the same menu:
 *  - "prices": the digital menu (Firestore digital_menu_items) rendered as text + photos.
 *    Default, because text is what search engines and phones can read. Also emits Menu JSON-LD.
 *  - "boards": the designed A4 menu images (menu_images), as before.
 * ?view=boards deep-links the image view.
 */
export default function Menu() {
  const [params, setParams] = useSearchParams()
  const view: View = params.get('view') === 'boards' ? 'boards' : 'prices'
  const setView = (v: View) => setParams(v === 'prices' ? {} : { view: v }, { replace: true })

  const [pages, setPages] = useState<MenuPage[]>([])
  const [categories, setCategories] = useState<DigitalMenuCategory[]>([])
  const [items, setItems] = useState<DigitalMenuItem[]>([])
  const [activeCategory, setActiveCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState<MenuPage | null>(null)

  useEffect(() => {
    Promise.all([
      getMenuPages().catch(() => [] as MenuPage[]),
      getMenuCategories().catch(() => [] as DigitalMenuCategory[]),
      getDigitalMenuItems().catch(() => [] as DigitalMenuItem[]),
    ])
      .then(([p, c, i]) => {
        setPages(p)
        setCategories(c)
        setItems(i.filter(x => x.available))
      })
      .finally(() => setLoading(false))
  }, [])

  // Reset the chip when switching views — the two views have different category sets.
  useEffect(() => setActiveCategory('All'), [view])

  const boardGroups = Array.from(new Set(pages.map(p => p.group)))
  const priceCategories = categories.map(c => c.name)
  const chips = ['All', ...(view === 'prices' ? priceCategories : boardGroups)]

  const visiblePages = activeCategory === 'All' ? pages : pages.filter(p => p.group === activeCategory)
  const visibleCategories = activeCategory === 'All' ? categories : categories.filter(c => c.name === activeCategory)

  const menuSchema = useMemo(() => (items.length ? [buildMenuSchema(categories, items)] : []), [categories, items])

  return (
    <div>
      <Seo
        title="Lakeside Menu & Prices - Hemingways Lakeside, East Pattaya"
        description="Full food menu with prices for Hemingways Lakeside (Lake Mabprachan, East Pattaya): English breakfast from 165 THB, fish & chips 325, Australian steaks from 550, Sunday roast carvery from 279, Thai, Indian, pizzas, burgers and kids' meals."
        jsonLd={menuSchema}
      />

      {/* Hero */}
      <section className="pt-32 pb-12 px-4 bg-[#f6efe0]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-4">Culinary Excellence</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-[#1a1512]">Lakeside Food Menu</h1>
          <p className="text-[#5c5346] text-lg max-w-xl mx-auto">
            Authentic British pub favourites, quality Western dishes, and traditional Thai specialties. Prices in Thai baht.
          </p>

          {/* View toggle */}
          <div className="inline-flex mt-8 rounded-full border border-black/10 bg-white p-1 shadow-sm" role="tablist" aria-label="Menu view">
            <button
              role="tab"
              aria-selected={view === 'prices'}
              onClick={() => setView('prices')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                view === 'prices' ? 'bg-[#c9a84c] text-black' : 'text-[#5c5346] hover:text-[#1a1512]'
              }`}
            >
              <List size={16} /> Prices &amp; descriptions
            </button>
            <button
              role="tab"
              aria-selected={view === 'boards'}
              onClick={() => setView('boards')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                view === 'boards' ? 'bg-[#c9a84c] text-black' : 'text-[#5c5346] hover:text-[#1a1512]'
              }`}
            >
              <ImageIcon size={16} /> Menu boards
            </button>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur border-b border-black/10 py-4 px-4">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide">
          {chips.map(cat => (
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

      {/* Prices view */}
      {view === 'prices' && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto space-y-16">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-[#f6efe0] rounded-2xl h-40 animate-pulse" />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="text-center text-[#5c5346] py-16">
                The price list is being updated -{' '}
                <button onClick={() => setView('boards')} className="underline hover:text-[#8a6d2f]">see the menu boards</button>.
              </div>
            ) : (
              visibleCategories.map(cat => {
                const catItems = items.filter(i => i.category === cat.name)
                if (!catItems.length) return null
                return (
                  <div key={cat.id} id={slug(cat.name)}>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1512] mb-6">{cat.name}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {catItems.map(item => (
                        <MenuItemCard key={item.id} item={item} />
                      ))}
                    </div>
                  </div>
                )
              })
            )}
            {!loading && items.length > 0 && (
              <p className="text-[#5c5346] text-sm text-center">
                Prices in Thai baht and may change. Ask our staff for today's specials and allergens.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Boards view */}
      {view === 'boards' && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-[#f6efe0] rounded-2xl aspect-[2/3] animate-pulse" />
                ))}
              </div>
            ) : visiblePages.length > 0 ? (
              <div className={`grid grid-cols-1 gap-6 ${visiblePages.length === 1 ? 'max-w-2xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-3'}`}>
                {visiblePages.map(page => (
                  <button
                    key={page.id}
                    onClick={() => setLightbox(page)}
                    className="group relative rounded-2xl overflow-hidden border border-black/10 hover:border-[#c9a84c]/40 transition-colors cursor-pointer bg-[#f6efe0] shadow-sm"
                  >
                    <img src={page.imageUrl} alt={`${page.name} menu`} loading="lazy" className="w-full h-auto" />
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center text-[#5c5346] py-16">Nothing in this category yet</div>
            )}
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-start md:items-center justify-center p-4 overflow-y-auto"
          onClick={() => setLightbox(null)}
        >
          <button onClick={() => setLightbox(null)} className="fixed top-6 right-6 z-50 text-white/70 hover:text-white" aria-label="Close">
            <X size={32} />
          </button>
          <img src={lightbox.imageUrl} alt={`${lightbox.name} menu`} className="max-w-full md:max-h-[95vh] md:object-contain rounded-lg" />
        </div>
      )}

      {/* Cross-links */}
      <section className="py-16 px-4 bg-[#f6efe0] border-t border-black/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <Link to="/food" className="bg-white border border-black/5 rounded-xl p-5 shadow-sm hover:border-[#c9a84c]/40 transition-colors">
            <span className="text-[#1a1512] font-semibold text-sm">Pub Classics</span>
          </Link>
          <Link to="/steak" className="bg-white border border-black/5 rounded-xl p-5 shadow-sm hover:border-[#c9a84c]/40 transition-colors">
            <span className="text-[#1a1512] font-semibold text-sm">Steaks</span>
          </Link>
          <Link to="/sunday-roast" className="bg-white border border-black/5 rounded-xl p-5 shadow-sm hover:border-[#c9a84c]/40 transition-colors">
            <span className="text-[#1a1512] font-semibold text-sm">Sunday Roast</span>
          </Link>
          <Link to="/beer-garden" className="bg-white border border-black/5 rounded-xl p-5 shadow-sm hover:border-[#c9a84c]/40 transition-colors">
            <span className="text-[#1a1512] font-semibold text-sm">Beer Garden</span>
          </Link>
        </div>
        <p className="text-center text-[#5c5346] text-sm mt-8">Menu items and prices may vary. Ask our staff for today's specials.</p>
      </section>
    </div>
  )
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function MenuItemCard({ item }: { item: DigitalMenuItem }) {
  const hasSecondPrice = Boolean(item.price2 && item.price2Label)
  return (
    <article className="bg-[#f6efe0] border border-black/5 rounded-2xl overflow-hidden flex flex-col">
      {item.imageUrl && (
        <div className="aspect-[4/3] overflow-hidden bg-white">
          <img src={item.imageUrl} alt={item.name} loading="lazy" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="text-[#1a1512] font-bold leading-snug">{item.name}</h3>
          {!hasSecondPrice && <span className="text-[#8a6d2f] font-bold shrink-0">{item.price} THB</span>}
        </div>
        {item.description && <p className="text-[#5c5346] text-sm leading-relaxed flex-1">{item.description}</p>}
        {hasSecondPrice && (
          <div className="flex gap-5 mt-3">
            <div>
              <div className="text-[10px] text-[#5c5346] uppercase tracking-wider">{item.priceLabel || 'Full'}</div>
              <div className="text-[#8a6d2f] font-bold">{item.price} THB</div>
            </div>
            <div>
              <div className="text-[10px] text-[#5c5346] uppercase tracking-wider">{item.price2Label}</div>
              <div className="text-[#8a6d2f] font-bold">{item.price2} THB</div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
