import { Check } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'

const packages = [
  {
    name: 'The Classic',
    price: 'From ฿3,500',
    guests: 'Up to 20 guests',
    includes: [
      'Private table area for 3 hours',
      'Birthday cake cutting service',
      'Dedicated service staff',
      'Welcome drinks on arrival',
      'Birthday decoration setup',
    ],
    highlight: false,
  },
  {
    name: 'The Pool Party',
    price: 'From ฿7,500',
    guests: 'Up to 40 guests',
    includes: [
      'Private pool area for 4 hours',
      'Buffet or set menu for all guests',
      'Birthday cake included',
      'Full bar service',
      'Pool and lounge access',
      'Dedicated event staff',
      'Decoration setup',
    ],
    highlight: true,
  },
  {
    name: 'The Full Venue',
    price: 'From ฿15,000',
    guests: 'Up to 100 guests',
    includes: [
      'Full venue hire',
      'Customisable menu',
      'Full bar service',
      'Live sports/music if required',
      'Decoration to your brief',
      'Dedicated event coordinator',
      'Pool access included',
    ],
    highlight: false,
  },
]

export default function BirthdayParties() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#1a0a1a] to-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-4xl mb-4">🎂</div>
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Celebrate in Style</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">Birthday Parties</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Make your birthday one to remember. We take care of everything — food, drinks, décor, and service — so you can just enjoy the day.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Packages</p>
            <h2 className="text-3xl font-bold">Choose Your Package</h2>
            <p className="text-gray-500 text-sm mt-2">All packages are customisable — just ask</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <div
                key={pkg.name}
                className={`rounded-2xl p-8 border flex flex-col ${
                  pkg.highlight ? 'bg-[#c9a84c]/10 border-[#c9a84c]/40' : 'bg-[#141414] border-white/5'
                }`}
              >
                {pkg.highlight && (
                  <div className="text-xs tracking-widest uppercase text-[#c9a84c] mb-3">Most Popular</div>
                )}
                <h3 className="text-white font-bold text-xl mb-1">{pkg.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{pkg.guests}</p>
                <p className="text-[#c9a84c] text-2xl font-bold mb-6">{pkg.price}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.includes.map(item => (
                    <li key={item} className="flex items-start gap-2 text-gray-400 text-sm">
                      <Check size={14} className="text-[#c9a84c] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-4 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-4xl mb-4">⭐⭐⭐⭐⭐</div>
          <blockquote className="text-gray-300 text-lg italic mb-4">
            "Hemingways hosted my 50th birthday and it was absolutely perfect. The staff went above and beyond, the food was great, and having the pool available for the kids made it work for the whole family."
          </blockquote>
          <p className="text-gray-600 text-sm">— Sarah M., celebrated her 50th at Hemingways Lakeside</p>
        </div>
      </section>

      {/* Enquiry */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Start Planning</h2>
            <p className="text-gray-500 text-sm">Tell us your date, guest count, and any special requests</p>
          </div>
          <EnquiryForm
            type="birthday"
            title="Birthday Party Enquiry"
            subtitle="We'll send you a custom quote within a few hours"
          />
        </div>
      </section>
    </div>
  )
}
