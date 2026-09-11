import { Waves, Users, MapPin, Clock, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import EnquiryForm from '../components/EnquiryForm'
import FaqMini from '../components/FaqMini'
import Seo from '../components/Seo'
import { buildFaqSchema, buildEventSchema, SITE_FAQS, HOURS_SUMMARY } from '../lib/schema'

const poolPartyFaqs = SITE_FAQS.filter(f => f.categories.includes('pool_party'))

const MAPS_URL = 'https://maps.google.com/?q=Hemingways+Lakeside+Pattaya'

const packages = [
  {
    name: 'Pool Day Pass',
    price: 200,
    desc: 'Full day access to our swimming pool with a sun lounger and welcome drink.',
    includes: ['Full day pool access (8am-9pm)', 'Sun lounger', 'Complimentary welcome drink'],
  },
  {
    name: 'Pool & Lunch',
    price: 500,
    desc: 'The most popular option - pool access plus a full meal and drinks.',
    includes: ['Full day pool access', 'Sun lounger', '1 main course of your choice', '2 draught beers or soft drinks'],
    popular: true,
  },
  {
    name: 'Family Package',
    price: 1500,
    desc: 'Perfect for a family day out. Pool, food and drinks for the whole family.',
    includes: ['Pool access for 2 adults + 2 kids', 'Sun loungers for all', '4 meals (adult or kids menu)', 'Soft drinks for kids, beers for adults'],
  },
]

export default function PoolParty() {
  return (
    <div>
      <Seo
        title="Pool Party"
        description="Pool party packages at Hemingways Lakeside - Pool Day Pass, Pool & Lunch or Family Package, on Lake Mabprachan in East Pattaya. Groups and day parties welcome."
        jsonLd={[
          buildFaqSchema(poolPartyFaqs),
          buildEventSchema({
            name: 'Pool Party Season at Hemingways Lakeside',
            description: 'Seasonal pool day packages with food and drinks, on Lake Mabprachan in East Pattaya.',
            startDate: '2026-10-01',
            endDate: '2027-01-31',
            path: '/pool-party',
          }),
        ]}
      />
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0d0d0d] z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/pool.webp')" }}
        />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Pool Party Packages</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-2xl">
              A Pool Party Day, Sorted
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              Whether it's a friends' day out or a big group booking, pick a package below and
              spend the day on the pool with food and drinks handled.
            </p>
            <a
              href="#packages"
              className="inline-block px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors"
            >
              See Packages
            </a>
          </div>
        </div>
      </section>

      {/* Hours banner */}
      <section className="py-10 px-4 bg-[#c9a84c]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <h2 className="text-black font-bold text-xl sm:text-2xl">Pool open every day we're open</h2>
          <span className="flex items-center gap-2 text-black/80 text-sm font-bold tracking-wider uppercase shrink-0">
            <Clock size={16} /> {HOURS_SUMMARY}
          </span>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Pick Your Package</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Three Ways To Do A Pool Day</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <div
                key={pkg.name}
                className={`bg-[#141414] border rounded-2xl p-8 flex flex-col ${
                  pkg.popular ? 'border-[#c9a84c]/50' : 'border-white/5'
                }`}
              >
                {pkg.popular && (
                  <span className="text-xs tracking-widest uppercase text-[#c9a84c] font-bold mb-3">Most Popular</span>
                )}
                <h3 className="text-white font-bold text-xl mb-1">{pkg.name}</h3>
                <p className="text-[#c9a84c] font-bold text-2xl mb-3">{pkg.price} THB <span className="text-gray-500 text-sm font-normal">/ person</span></p>
                <p className="text-gray-500 text-sm mb-6">{pkg.desc}</p>
                <ul className="space-y-2 mt-auto">
                  {pkg.includes.map(item => (
                    <li key={item} className="flex items-start gap-2 text-gray-300 text-sm">
                      <Check size={16} className="text-[#c9a84c] mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm text-center mt-8">Prices per person, may vary - confirm with staff when booking. Eating or drinking a la carte instead? The pool is free with any table or bar order.</p>
        </div>
      </section>

      {/* Groups */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto bg-[#141414] border border-white/10 rounded-3xl p-10 sm:p-14 text-center">
          <Users size={32} className="text-[#c9a84c] mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Bringing A Big Group?</h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-8">
            For groups of 6 or more, or if you want loungers reserved ahead of time, call us or
            send an enquiry and we'll get you sorted.
          </p>
        </div>
      </section>

      {/* FAQ (also feeds FAQPage schema above) */}
      <FaqMini heading="Pool Party Questions" items={poolPartyFaqs} />

      {/* Enquiry */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Book A Pool Day</h2>
            <p className="text-gray-500 text-sm">Tell us your group size and preferred date.</p>
          </div>
          <EnquiryForm
            type="pool"
            title="Pool Party Enquiry"
            subtitle="We'll confirm availability and the best package for your group"
          />
        </div>
      </section>

      <section className="pb-24 px-4 text-center flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#c9a84c]/40 text-[#c9a84c] font-bold text-sm tracking-widest uppercase rounded hover:bg-[#c9a84c]/10 transition-colors"
        >
          <MapPin size={16} /> Get Directions
        </a>
        <Link
          to="/pool"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-widest uppercase rounded hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
        >
          <Waves size={16} /> Pool Facilities
        </Link>
      </section>
    </div>
  )
}
