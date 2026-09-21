import { Check } from 'lucide-react'

/**
 * All-in kids' party bundles — prices, headcounts and extra-guest rates set by Shane
 * (21 Sept 2026). Food level maps to the A/B/C packages in FoodPackages.tsx, so keep
 * the two in sync. Entertainment/activities are NOT included (quoted separately).
 */

interface Bundle {
  name: string
  price: string
  guests: string
  food: string
  extraGuest: string
  featured?: boolean
}

const bundles: Bundle[] = [
  { name: 'Splash Party', price: '5,000 THB', guests: 'Up to 10 guests', food: 'Package A food — 5 items, soft drinks included', extraGuest: 'Extra guests 300 THB each' },
  { name: 'Big Splash', price: '10,000 THB', guests: 'Up to 20 guests', food: 'Package B food — 7 items, soft drinks included', extraGuest: 'Extra guests 400 THB each', featured: true },
  { name: 'Ultimate Party', price: '20,000 THB', guests: 'Up to 35 guests', food: 'Package C food — 10 items, soft drinks included', extraGuest: 'Extra guests 500 THB each' },
]

const everyBundle = ['Themed decorations, set up before you arrive', 'Birthday cake', 'Reserved party area', 'Swimming pool and kids’ playroom']

export default function PartyBundles() {
  return (
    <section id="bundles" className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">One Price · All Sorted</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1a1512]">All-In Party Bundles</h2>
          <p className="text-[#5c5346] max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Food, soft drinks, decorations and cake in one price. Pick the size that fits your
            guest list, tell us the theme and the date, and we'll do the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {bundles.map(b => (
            <div
              key={b.name}
              className={`rounded-2xl p-8 border shadow-sm ${
                b.featured ? 'bg-[#c9a84c]/15 border-[#c9a84c]/40' : 'bg-[#f6efe0] border-black/5'
              }`}
            >
              <h3 className="text-[#1a1512] font-bold text-lg mb-1">{b.name}</h3>
              <p className="text-3xl font-bold text-[#8a6d2f] mb-1">{b.price}</p>
              <p className="text-[#3d372e] text-sm mb-5">{b.guests}</p>
              <ul className="space-y-2">
                {[b.food, ...everyBundle, b.extraGuest].map(line => (
                  <li key={line} className="flex items-start gap-2 text-[#5c5346] text-sm">
                    <Check size={16} className="text-[#8a6d2f] mt-0.5 shrink-0" />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-[#5c5346] text-sm max-w-2xl mx-auto">
          Activities and entertainment are extra, and you're welcome to organise your own. There's no lifeguard on duty, so parents supervise in the pool. A 3,000 THB
          deposit secures your date. Closed Tuesdays. Bigger group or a set budget? Ask for a custom quote.
        </p>
        <div className="text-center mt-8">
          <a
            href="#enquiry"
            className="inline-block px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors"
          >
            Check Your Date
          </a>
        </div>
      </div>
    </section>
  )
}
