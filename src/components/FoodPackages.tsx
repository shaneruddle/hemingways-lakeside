import { UtensilsCrossed, Beer, Flame, Check } from 'lucide-react'

/**
 * Real party/event food package pricing — from Shane's printed "Birthday & Event
 * Food Packages" poster (Sept 2026). Used on Birthday and Kids party pages, where
 * a real published price point removes the biggest friction to enquiring.
 * Corporate stays enquiry/quote-only per Shane's call — do not add this component
 * to Corporate.tsx without checking with him first.
 */

interface Package {
  letter: string
  price: string
  items: string
  extras: string[]
  custom?: boolean
}

const packages: Package[] = [
  {
    letter: 'A',
    price: '250–300 THB / person',
    items: '5 food items',
    extras: ['Including soft drinks', 'Finger food / buffet', 'Soft drink × 12 qty'],
  },
  {
    letter: 'B',
    price: '400 THB / person',
    items: '7 food items',
    extras: ['Including soft drinks', 'Finger food / buffet', 'Soft drink × 24 qty'],
  },
  {
    letter: 'C',
    price: '500–700 THB / person',
    items: '10 food items',
    extras: ['Including soft drinks', 'Finger food / buffet', 'Soft drink × 48 qty'],
  },
  {
    letter: 'D',
    price: 'Budget or Custom',
    items: 'Tell us your number of guests and your budget',
    extras: ["We'll build a package to fit"],
    custom: true,
  },
]

const sampleFood = [
  'Crispy Seafood Mixed', 'Thai Spicy Prawn Salad', 'Jalapeño Poppers', 'Canapés',
  'Prawn Cocktail', 'Chicken Wings / Satay / BBQ', 'Mini Sausages, Burgers & Sandwiches',
  'Homemade Pizza / Spring Rolls / Nuggets', 'Seasonal Salad / Fries / Bruschetta',
  'Lab Moo Tod (Thai Minced Pork Salad)', 'Fried Rice / Rice Noodles',
  'Thai Curries — Green, Red, Massaman', 'Cashew Nut Chicken / Thai Basil Chicken',
  'Roasted Pork / Roast Beef / Grilled Seafood', 'And many more…',
]

export default function FoodPackages({ heading = 'Food Packages' }: { heading?: string }) {
  return (
    <section id="packages" className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Great Food · Good Company · Memorable Moments</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{heading}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            We usually work with a budget of 300–1,000 THB per person, depending on your guest
            count, the amount of food, and the food & drinks you'd like. Already have a budget
            in mind? Tell us and we'll prepare a quotation around it.
          </p>
        </div>

        {/* Package cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {packages.map(pkg => (
            <div
              key={pkg.letter}
              className={`rounded-2xl p-6 border ${
                pkg.custom
                  ? 'bg-[#c9a84c]/10 border-[#c9a84c]/30'
                  : 'bg-[#141414] border-white/5'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#c9a84c] font-bold text-sm">{pkg.letter}</span>
                </div>
                <h3 className="text-white font-bold">Package {pkg.letter}</h3>
              </div>
              <p className="text-2xl font-bold text-[#c9a84c] mb-1">{pkg.price}</p>
              <p className="text-gray-300 text-sm mb-4">{pkg.items}</p>
              <ul className="space-y-2">
                {pkg.extras.map(extra => (
                  <li key={extra} className="flex items-start gap-2 text-gray-500 text-xs">
                    <Check size={14} className="text-[#c9a84c] mt-0.5 shrink-0" />
                    {extra}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Roasted pig + sample food */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="lg:col-span-1 bg-[#141414] border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-4">
              <Flame size={20} className="text-[#c9a84c]" />
            </div>
            <h3 className="text-white font-bold text-lg mb-1">Roasted Pig — Special Price</h3>
            <p className="text-2xl font-bold text-[#c9a84c] mb-2">4,000–6,000 THB / pig</p>
            <p className="text-gray-500 text-sm">A showstopper for your special event.</p>
          </div>
          <div className="lg:col-span-2 bg-[#141414] border border-white/5 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-4">
              <UtensilsCrossed size={20} className="text-[#c9a84c]" />
            </div>
            <h3 className="text-white font-bold text-lg mb-3">Sample Food Options</h3>
            <div className="flex flex-wrap gap-2">
              {sampleFood.map(item => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Drinks package */}
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 sm:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center">
              <Beer size={20} className="text-[#c9a84c]" />
            </div>
            <h3 className="text-white font-bold text-lg">Drinks Package</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-[#c9a84c] text-xs tracking-wider uppercase mb-2">Draft Beer</p>
              <ul className="space-y-1 text-gray-400 text-sm">
                <li>Tiger — 20L 3,500 THB / 30L 4,500 THB</li>
                <li>Heineken — 20L 4,000 THB / 30L 5,000 THB</li>
              </ul>
            </div>
            <div>
              <p className="text-[#c9a84c] text-xs tracking-wider uppercase mb-2">Bottled Beer (24 bottles)</p>
              <ul className="space-y-1 text-gray-400 text-sm">
                <li>Tiger / Singha / Chang / Leo — 1,200 THB</li>
                <li>Heineken / San Miguel — 1,500 THB</li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-600 text-xs max-w-xl mx-auto">
          You can specify the food you want and anything else you require. Prices don't include
          activities and decorations — ask us about those when you enquire.
        </p>
      </div>
    </section>
  )
}
