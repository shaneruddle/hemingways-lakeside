import { Check, Waves, UtensilsCrossed, Smile, Shield } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'

const whyKids = [
  { icon: Waves, title: 'Pool Access', desc: 'Kids get full use of our pool — safe, clean, and fun' },
  { icon: UtensilsCrossed, title: 'Kids Menu', desc: 'Pizza, burgers, chips, nuggets — all the favourites' },
  { icon: Smile, title: 'They Love It', desc: 'Pool + food + friends = the best birthday ever (according to kids)' },
  { icon: Shield, title: 'Supervised & Safe', desc: 'Attentive staff and a safe environment for little ones' },
]

const packages = [
  {
    name: 'Pool Party Starter',
    price: 'From ฿2,500',
    guests: 'Up to 10 kids',
    includes: [
      '2 hours pool access',
      'Kids party food for all',
      'Soft drinks included',
      'Birthday cake cutting',
      'Party bags (optional add-on)',
    ],
    highlight: false,
  },
  {
    name: 'Pool Party Pro',
    price: 'From ฿4,500',
    guests: 'Up to 20 kids',
    includes: [
      '3 hours pool access',
      'Kids buffet for all children',
      'Adult food & drinks available',
      'Birthday cake included',
      'Decoration setup',
      'Dedicated party host',
    ],
    highlight: true,
  },
]

export default function KidsParties() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#0a1a0a] to-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-4xl mb-4">🎉</div>
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Kids Birthday Parties</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">Kids Pool Parties</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The ultimate kids birthday experience in Pattaya. Pool, party food, birthday cake, and a whole lot of fun. Parents love it too — sit back with a cold drink while we handle everything.
          </p>
        </div>
      </section>

      {/* Why kids love it */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyKids.map(({ icon: Icon, title, desc }) => (
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Packages</p>
            <h2 className="text-3xl font-bold">Party Packages</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packages.map(pkg => (
              <div
                key={pkg.name}
                className={`rounded-2xl p-8 border ${
                  pkg.highlight ? 'bg-[#c9a84c]/10 border-[#c9a84c]/40' : 'bg-[#141414] border-white/5'
                }`}
              >
                {pkg.highlight && (
                  <div className="text-xs tracking-widest uppercase text-[#c9a84c] mb-3">Most Popular</div>
                )}
                <h3 className="text-white font-bold text-xl mb-1">{pkg.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{pkg.guests}</p>
                <p className="text-[#c9a84c] text-2xl font-bold mb-6">{pkg.price}</p>
                <ul className="space-y-3">
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
          <p className="text-center text-gray-600 text-sm mt-6">Prices are indicative. All packages fully customisable.</p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-4xl mb-4">⭐⭐⭐⭐⭐</div>
          <blockquote className="text-gray-300 text-lg italic mb-4">
            "Best kids party venue in Pattaya, full stop. My son is already asking to come back for his next birthday. The staff were brilliant with the kids and we parents could actually relax!"
          </blockquote>
          <p className="text-gray-600 text-sm">— Gemma R., kids pool party for 15 children</p>
        </div>
      </section>

      {/* Enquiry */}
      <section className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Book a Kids Party</h2>
            <p className="text-gray-500 text-sm">Let us know the date, ages, and number of kids</p>
          </div>
          <EnquiryForm
            type="kids_party"
            title="Kids Party Enquiry"
            subtitle="We'll send over a package within a few hours"
          />
        </div>
      </section>
    </div>
  )
}
