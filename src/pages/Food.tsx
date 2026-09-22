import { Egg, Fish, Beef, Flame } from 'lucide-react'
import { Link } from 'react-router-dom'
import FaqMini from '../components/FaqMini'
import Seo from '../components/Seo'
import { buildFaqSchema, SITE_FAQS } from '../lib/schema'
import { BREAKFASTS, BREAKFAST_NOTE, PUB_CLASSICS, STEAKS, SUNDAY_ROAST } from '../data/menuHighlights'

const foodFaqs = SITE_FAQS.filter(f => f.categories.includes('food'))

// Verified against the printed menu boards, Sept 2026 (src/data/menuHighlights.ts).
const sections = [
  { icon: Egg, title: 'Full English Breakfast', note: BREAKFAST_NOTE, items: BREAKFASTS },
  { icon: Fish, title: 'Fish & Chips and Pub Classics', note: 'Homemade chips, proper gravy, big portions.', items: PUB_CLASSICS },
  { icon: Beef, title: 'Steaks', note: 'Australian Black Angus - see the steak page for sides and sauces.', items: STEAKS },
]

export default function Food() {
  return (
    <div>
      <Seo
        title="British Pub Classics in East Pattaya - Fish & Chips, Full English, Sunday Roast"
        description="British pub food by Lake Mabprachan, East Pattaya: beer-battered cod & chips 325, full English breakfast from 165, bangers & mash 295, Sunday roast carvery from 279, Australian Angus steaks. Free pool with your meal."
        jsonLd={[buildFaqSchema(foodFaqs)]}
      />
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 bg-[#f6efe0]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-4">British Pub Classics · Thai Favourites</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-[#1a1512]">Proper Food, Big Portions</h1>
          <p className="text-[#5c5346] text-lg max-w-xl mx-auto leading-relaxed">
            Fish and chips, a full English, bangers and mash, a Sunday carvery and Australian steaks -
            alongside Thai, Indian, pizzas and a kids' menu, so one table keeps everyone happy.
          </p>
        </div>
      </section>

      {/* Menu sections with prices */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto space-y-16">
          {sections.map(({ icon: Icon, title, note, items }) => (
            <div key={title}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center">
                  <Icon size={20} className="text-[#8a6d2f]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1512]">{title}</h2>
              </div>
              <p className="text-[#5c5346] text-sm mb-6">{note}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map(item => (
                  <div key={item.name} className="bg-[#f6efe0] border border-black/5 rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="text-[#1a1512] font-bold">{item.name}</h3>
                      <span className="text-[#8a6d2f] font-bold text-sm shrink-0">{item.price} THB</span>
                    </div>
                    <p className="text-[#5c5346] text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-[#c9a84c]/15 border border-[#c9a84c]/40 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame size={18} className="text-[#8a6d2f]" />
              <h2 className="text-2xl font-bold text-[#1a1512]">Sunday Roast Carvery</h2>
            </div>
            <p className="text-[#5c5346] mb-4">
              Small plate {SUNDAY_ROAST.small} · Big plate {SUNDAY_ROAST.big} THB · {SUNDAY_ROAST.meats.join(', ')} · soup included · from {SUNDAY_ROAST.from} every Sunday
            </p>
            <Link to="/sunday-roast" className="text-sm font-bold text-[#8a6d2f] underline hover:text-[#1a1512]">Sunday roast details →</Link>
          </div>

          <p className="text-[#5c5346] text-sm text-center">Prices in Thai baht as printed on the menu boards (Sept 2026) and may change - the full menu also has burgers, parmos, pies, pasta, pizzas, Indian, Thai and kids' meals.</p>
          <div className="text-center">
            <Link
              to="/menu"
              className="inline-block px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors"
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-links to Sunday Roast / Beer Garden */}
      <section className="py-16 px-4 bg-[#f6efe0] border-y border-black/5">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link to="/sunday-roast" className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm hover:border-[#c9a84c]/50 transition-colors">
            <h3 className="text-[#1a1512] font-bold text-lg mb-2">Sunday Roast</h3>
            <p className="text-[#5c5346] text-sm">A proper British Sunday roast, lakeside - every week.</p>
          </Link>
          <Link to="/beer-garden" className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm hover:border-[#c9a84c]/50 transition-colors">
            <h3 className="text-[#1a1512] font-bold text-lg mb-2">Beer Garden</h3>
            <p className="text-[#5c5346] text-sm">Cold draught beer, open-air, right on the lake.</p>
          </Link>
        </div>
      </section>

      {/* FAQ (also feeds FAQPage schema above) */}
      <FaqMini heading="Food Questions" items={foodFaqs} />
    </div>
  )
}
