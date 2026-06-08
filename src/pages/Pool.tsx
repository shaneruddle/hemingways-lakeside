import { Waves, Sun, UtensilsCrossed, Users, Clock, Phone } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'

const packages = [
  {
    name: 'Pool Day Pass',
    price: '฿200',
    per: 'per person',
    includes: ['Full day pool access', 'Sun lounger', 'Complimentary welcome drink'],
    highlight: false,
  },
  {
    name: 'Pool & Lunch',
    price: '฿500',
    per: 'per person',
    includes: ['Full day pool access', 'Sun lounger', '1 main course meal', '2 drinks included'],
    highlight: true,
  },
  {
    name: 'Family Package',
    price: '฿1,500',
    per: '2 adults + 2 kids',
    includes: ['Full day pool access for family', 'Sun loungers', '4 meals', 'Kids pool area'],
    highlight: false,
  },
]

const highlights = [
  { icon: Waves, title: 'Clean Pool', desc: 'Well-maintained pool in a comfortable, shaded setting' },
  { icon: Sun, title: 'Full Day Access', desc: 'Arrive at 8am and stay until 9pm — make the most of it' },
  { icon: UtensilsCrossed, title: 'Food & Drinks', desc: 'Full menu available poolside — no need to leave' },
  { icon: Users, title: 'Family Friendly', desc: 'Safe, shallow areas for kids, attentive staff' },
]

export default function Pool() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#0a1f2d] to-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Something Unique</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">Pool Days</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            We have a swimming pool at the restaurant. Cool off, eat great food, have cold drinks — all in one place.
          </p>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-[#141414] border border-white/5 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-4">
                <Icon size={20} className="text-[#c9a84c]" />
              </div>
              <h3 className="text-white font-bold mb-1">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Pool Packages</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <div
                key={pkg.name}
                className={`rounded-2xl p-8 border ${
                  pkg.highlight
                    ? 'bg-[#c9a84c]/10 border-[#c9a84c]/40'
                    : 'bg-[#141414] border-white/5'
                }`}
              >
                {pkg.highlight && (
                  <div className="text-xs tracking-widest uppercase text-[#c9a84c] mb-3">Most Popular</div>
                )}
                <h3 className="text-white font-bold text-xl mb-1">{pkg.name}</h3>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-[#c9a84c]">{pkg.price}</span>
                  <span className="text-gray-500 text-sm ml-2">{pkg.per}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.includes.map(item => (
                    <li key={item} className="flex items-start gap-2 text-gray-400 text-sm">
                      <span className="text-[#c9a84c] mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a
                  href="tel:0642400222"
                  className="block text-center py-3 border border-[#c9a84c]/40 text-[#c9a84c] text-sm tracking-wider uppercase rounded-lg hover:bg-[#c9a84c]/10 transition-colors"
                >
                  Book Now
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 text-sm mt-6">* Prices are indicative. Call to confirm current rates.</p>
        </div>
      </section>

      {/* Kids pool parties CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto bg-[#141414] border border-white/10 rounded-3xl p-10 sm:p-14 text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Kids Love It</p>
          <h2 className="text-3xl font-bold mb-4">Planning a Kids Pool Party?</h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-8">
            We specialise in kids birthday pool parties. Food, drinks, pool time, and a private area for your group. We handle everything.
          </p>
          <a
            href="/events/kids"
            className="inline-block px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors"
          >
            Kids Party Packages
          </a>
        </div>
      </section>

      {/* Enquiry */}
      <section className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Book a Pool Day</h2>
            <p className="text-gray-500 text-sm">Walk-ins welcome — but book ahead for groups of 6+</p>
          </div>
          <EnquiryForm
            type="pool"
            title="Pool Enquiry"
            subtitle="Let us know your dates and group size"
          />
        </div>
      </section>
    </div>
  )
}
