import { Beer, Sun, Trees, Martini, Clock, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import EnquiryForm from '../components/EnquiryForm'
import FaqMini from '../components/FaqMini'
import Seo from '../components/Seo'
import { buildFaqSchema, SITE_FAQS, HOURS_SUMMARY, HAPPY_HOUR_SUMMARY } from '../lib/schema'

const beerGardenFaqs = SITE_FAQS.filter(f => f.categories.includes('beer_garden'))

const MAPS_URL = 'https://maps.google.com/?q=Hemingways+Lakeside+Pattaya'

const drinks = [
  { name: 'Draught Beer (Pint)', price: 99, desc: 'Chang, Leo, Singha - ask about guest taps' },
  { name: 'Draught Beer (Half)', price: 59, desc: 'Same selection, smaller pour' },
  { name: 'Bottled Beer', price: 89, desc: 'Heineken, Corona, Tiger, Asahi' },
  { name: 'House Wine (Glass)', price: 149, desc: 'Red or white, ask your server' },
]

const features = [
  { icon: Trees, title: 'Right On The Lake', desc: 'Open-air tables looking out over Lake Mabprachan - not a car park with a few plastic chairs.' },
  { icon: Sun, title: 'Festoon-Lit Evenings', desc: 'The outdoor area comes alive after dark under string lights - a proper spot for a long session.' },
  { icon: Beer, title: 'Cold Draught, Always', desc: 'A rotating line-up of draught beers, served cold, poured properly.' },
  { icon: Martini, title: 'Full Bar, Not Just Beer', desc: 'Cocktails, wine and spirits too, if beer is not your thing tonight.' },
]

export default function BeerGarden() {
  return (
    <div>
      <Seo
        title="Beer Garden"
        description="Open-air lakeside beer garden at Hemingways Lakeside - cold draught beer, festoon-lit evening seating right on Lake Mabprachan in East Pattaya."
        jsonLd={[buildFaqSchema(beerGardenFaqs)]}
      />
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0d0d0d] z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-evening.webp')" }}
        />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Lakeside Beer Garden</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-2xl">
              Cold Beer, Open Air, On The Lake
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              Our lakeside outdoor area is the closest thing to a proper beer garden on this side
              of Pattaya - open-air tables, cold draught, and Lake Mabprachan right in front of you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors text-center"
              >
                Get Directions
              </a>
              <Link
                to="/menu"
                className="px-8 py-4 border border-white/30 text-white font-bold text-sm tracking-widest uppercase rounded hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors text-center"
              >
                View Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Happy hour banner */}
      <section className="py-10 px-4 bg-[#c9a84c]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <h2 className="text-black font-bold text-xl sm:text-2xl">{HAPPY_HOUR_SUMMARY}</h2>
          <span className="flex items-center gap-2 text-black/80 text-sm font-bold tracking-wider uppercase shrink-0">
            <Clock size={16} /> {HOURS_SUMMARY}
          </span>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Why Sit Outside</p>
            <h2 className="text-3xl sm:text-4xl font-bold">The Lakeside Difference</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#141414] border border-white/5 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#c9a84c]" />
                </div>
                <h3 className="text-white font-bold mb-1">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Drinks pricing */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">On The Menu</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Beer Garden Prices</h2>
          </div>
          <div className="bg-[#141414] border border-white/5 rounded-2xl divide-y divide-white/5">
            {drinks.map(d => (
              <div key={d.name} className="flex items-center justify-between gap-4 px-6 py-5">
                <div>
                  <p className="text-white font-semibold">{d.name}</p>
                  <p className="text-gray-500 text-sm">{d.desc}</p>
                </div>
                <span className="text-[#c9a84c] font-bold shrink-0">{d.price} THB</span>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-sm text-center mt-6">Prices may vary - ask your server for today's guest taps and cocktail list.</p>
        </div>
      </section>

      {/* FAQ (also feeds FAQPage schema above) */}
      <FaqMini heading="Beer Garden Questions" items={beerGardenFaqs} />

      {/* Groups CTA */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Bringing A Group?</h2>
            <p className="text-gray-500 text-sm">Walk-ins always welcome - let us know ahead for groups of 6+ so we can hold you a table.</p>
          </div>
          <EnquiryForm
            type="general"
            title="Beer Garden Enquiry"
            subtitle="Tell us your group size and when you're thinking of coming"
          />
        </div>
      </section>

      <section className="pb-24 px-4 text-center">
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#c9a84c]/40 text-[#c9a84c] font-bold text-sm tracking-widest uppercase rounded hover:bg-[#c9a84c]/10 transition-colors"
        >
          <MapPin size={16} /> Find Us On The Lake
        </a>
      </section>
    </div>
  )
}
