import { UtensilsCrossed, Clock, Users, MapPin, Beef } from 'lucide-react'
import { Link } from 'react-router-dom'
import EnquiryForm from '../components/EnquiryForm'
import FaqMini from '../components/FaqMini'
import Seo from '../components/Seo'
import { buildFaqSchema, SITE_FAQS, HOURS_SUMMARY, type FaqItem } from '../lib/schema'
import { SUNDAY_ROAST } from '../data/menuHighlights'

const roastFaqs: FaqItem[] = [
  ...SITE_FAQS.filter(f => f.question.startsWith('Is the Sunday Roast')),
  {
    question: 'What time does the Sunday roast start and finish?',
    answer: `The carvery opens at ${SUNDAY_ROAST.from} every Sunday and runs until it sells out - usually mid-afternoon on a busy weekend, so come early if you want the full choice of meats.`,
    categories: ['food'],
  },
  {
    question: 'How much is the Sunday roast?',
    answer: `Small plate ${SUNDAY_ROAST.small} THB, big plate ${SUNDAY_ROAST.big} THB. Both include the self-service soup and all the trimmings. Kids can share a big plate or order from the kids' menu.`,
    categories: ['food'],
  },
  {
    question: 'Which meats are on the carvery?',
    answer: `${SUNDAY_ROAST.meats.join(', ')} - choose one or mix. The exact selection can vary week to week.`,
    categories: ['food'],
  },
  {
    question: 'Do I need to book for Sunday lunch?',
    answer: 'Walk-ins are always welcome. For groups of six or more, or if you want a table by the lake or poolside, message us and we will hold it.',
    categories: ['food'],
  },
]

const MAPS_URL = 'https://maps.google.com/?q=Hemingways+Lakeside+Pattaya'

const whatToExpect = [
  { icon: Beef, title: 'Carvery, Five Meats', desc: `${SUNDAY_ROAST.meats.join(', ')} - carved to order from ${SUNDAY_ROAST.from} until it runs out.` },
  { icon: UtensilsCrossed, title: 'All The Trimmings', desc: 'Roast potatoes, Yorkshire pudding, seasonal veg and proper gravy - plus a self-service soup to start, included in the price.' },
  { icon: Users, title: 'A Lakeside Sunday', desc: 'Eat inside, outside by the lake, or poolside if the kids want a swim first.' },
]

export default function SundayRoast() {
  return (
    <div>
      <Seo
        title="Sunday Roast Carvery, East Pattaya - from 279 THB"
        description={`Sunday roast carvery at Hemingways Lakeside, East Pattaya - small plate ${SUNDAY_ROAST.small} THB, big plate ${SUNDAY_ROAST.big} THB, choice of porchetta, beef, lamb, chicken or pork, soup included. From ${SUNDAY_ROAST.from} every Sunday by Lake Mabprachan.`}
        jsonLd={[buildFaqSchema(roastFaqs)]}
      />
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0d0d0d] z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.webp')" }}
        />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">A Lake Mabprachan Sunday</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-2xl">
              Sunday Roast, By The Lake
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              A proper Sunday roast with all the trimmings - eat inside, lakeside outdoors, or
              poolside while the kids swim it off.
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

      {/* Hours banner */}
      <section className="py-10 px-4 bg-[#c9a84c]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <h2 className="text-black font-bold text-xl sm:text-2xl">Every Sunday from {SUNDAY_ROAST.from} until it runs out</h2>
          <span className="flex items-center gap-2 text-black/80 text-sm font-bold tracking-wider uppercase shrink-0">
            <Clock size={16} /> {HOURS_SUMMARY}
          </span>
        </div>
      </section>

      {/* What to expect */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">What To Expect</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">A Sunday Done Right</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatToExpect.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#8a6d2f]" />
                </div>
                <h3 className="text-[#1a1512] font-bold text-lg mb-1">{title}</h3>
                <p className="text-[#5c5346] text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mt-14">
            <div className="bg-white border border-[#c9a84c]/40 rounded-2xl p-8 text-center">
              <p className="text-[#9c7a2e] text-xs tracking-[0.3em] uppercase mb-2">Small Plate</p>
              <p className="text-4xl font-bold text-[#1a1512] mb-2">{SUNDAY_ROAST.small} <span className="text-base font-normal text-[#5c5346]">THB</span></p>
              <p className="text-[#5c5346] text-sm">One meat, all the trimmings, soup included.</p>
            </div>
            <div className="bg-white border border-[#c9a84c]/40 rounded-2xl p-8 text-center">
              <p className="text-[#9c7a2e] text-xs tracking-[0.3em] uppercase mb-2">Big Plate</p>
              <p className="text-4xl font-bold text-[#1a1512] mb-2">{SUNDAY_ROAST.big} <span className="text-base font-normal text-[#5c5346]">THB</span></p>
              <p className="text-[#5c5346] text-sm">Bigger portion, mix your meats, soup included.</p>
            </div>
          </div>
          <p className="text-[#5c5346] text-sm text-center mt-8">{SUNDAY_ROAST.note} Meats and prices as printed on the day's board.</p>
        </div>
      </section>

      {/* FAQ (also feeds FAQPage schema above) */}
      <FaqMini heading="Sunday Roast Questions" items={roastFaqs} />

      {/* Groups CTA */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2 text-[#1a1512]">Coming As A Group?</h2>
            <p className="text-[#5c5346] text-sm">Walk-ins always welcome - book ahead for groups of 6+.</p>
          </div>
          <EnquiryForm
            type="general"
            title="Sunday Roast Enquiry"
            subtitle="Let us know your group size and what time you're thinking of coming"
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
