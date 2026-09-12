import { UtensilsCrossed, Soup, Pizza, IceCream, Flame } from 'lucide-react'
import { Link } from 'react-router-dom'
import FaqMini from '../components/FaqMini'
import Seo from '../components/Seo'
import { buildFaqSchema, SITE_FAQS } from '../lib/schema'

const foodFaqs = SITE_FAQS.filter(f => f.categories.includes('food'))

const highlights = [
  { icon: Flame, name: 'Steak & Ale Pie', price: 269, desc: 'Slow-cooked beef, shortcrust pastry, chips, peas' },
  { icon: UtensilsCrossed, name: 'Fish & Chips', price: 259, desc: 'Beer-battered cod, chunky chips, mushy peas, tartar sauce' },
  { icon: Soup, name: "Shepherd's Pie", price: 229, desc: 'Minced lamb, vegetables, creamy mash topping' },
  { icon: UtensilsCrossed, name: 'Bangers & Mash', price: 219, desc: 'Pork sausages, creamy mash, onion gravy' },
  { icon: Pizza, name: 'Pad Thai', price: 149, desc: 'Classic Thai noodles, chicken or prawns, bean sprouts, egg' },
  { icon: Soup, name: 'Green Curry', price: 159, desc: 'Authentic Thai green curry, jasmine rice - chicken or tofu' },
  { icon: IceCream, name: 'Sticky Toffee Pudding', price: 129, desc: 'Warm sponge, toffee sauce, vanilla ice cream' },
  { icon: UtensilsCrossed, name: 'Classic Burger', price: 229, desc: 'Beef patty, cheese, lettuce, tomato, gherkin, fries' },
]

export default function Food() {
  return (
    <div>
      <Seo
        title="Food & Pub Classics"
        description="British pub classics and Thai favourites at Hemingways Lakeside - Steak & Ale Pie, fish & chips, burgers, curries and more, lakeside in East Pattaya."
        jsonLd={[buildFaqSchema(foodFaqs)]}
      />
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 bg-[#f6efe0]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-4">Pub Classics & Thai Favourites</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-[#1a1512]">Proper Food, Big Portions</h1>
          <p className="text-[#5c5346] text-lg max-w-xl mx-auto leading-relaxed">
            Authentic British pub favourites alongside traditional Thai dishes - the kind of menu
            that keeps a table happy whatever everyone's in the mood for.
          </p>
        </div>
      </section>

      {/* Highlights grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">Menu Highlights</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">Some Favourites</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map(({ icon: Icon, name, price, desc }) => (
              <div key={name} className="bg-[#f6efe0] border border-black/5 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#8a6d2f]" />
                </div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-[#1a1512] font-bold">{name}</h3>
                  <span className="text-[#8a6d2f] font-bold text-sm shrink-0">{price} THB</span>
                </div>
                <p className="text-[#5c5346] text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-[#5c5346] text-sm text-center mt-10">Menu items and prices may vary - see the full menu or ask your server for today's specials.</p>
          <div className="text-center mt-10">
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
