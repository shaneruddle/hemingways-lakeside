import { Link } from 'react-router-dom'
import { Beef, Flame, Waves, MapPin, MessageCircle } from 'lucide-react'
import Seo from '../components/Seo'
import FaqMini from '../components/FaqMini'
import { buildFaqSchema, HOURS_SUMMARY, type FaqItem } from '../lib/schema'
import { STEAKS, STEAK_SIDES } from '../data/menuHighlights'

const MAPS_URL = 'https://maps.google.com/?q=Hemingways+Lakeside+Pattaya'
const FB_MESSENGER_URL = 'https://m.me/hemingwayslakeside'

const faqs: FaqItem[] = [
  {
    question: 'How much is a steak at Hemingways Lakeside?',
    answer:
      'Australian Black Angus ribeye (250g) 650 THB, sirloin (250g) 550 THB, lamb chops (300g) 699 THB, salmon steak 469 THB and chicken steak (250g) 299 THB. Every steak includes two sides and a sauce.',
    categories: ['food'],
  },
  {
    question: 'What comes with the steak?',
    answer: `Choose one from ${STEAK_SIDES.side1.join(', ').toLowerCase()}; one from ${STEAK_SIDES.side2.join(', ').toLowerCase()}; and a sauce - ${STEAK_SIDES.sauce.join(', ').toLowerCase()}.`,
    categories: ['food'],
  },
  {
    question: 'Where does the beef come from?',
    answer: 'The ribeye and sirloin are Australian Black Angus, and the lamb chops are Australian Angus lamb.',
    categories: ['food'],
  },
  {
    question: 'Can I get a steak by the pool or the lake?',
    answer: 'Yes - eat inside, on the covered terrace by the pool, or at a lakeside table. The pool is free when you eat with us, so a swim before your steak is fine.',
    categories: ['food'],
  },
  {
    question: 'Do I need to book?',
    answer: 'Walk-ins are welcome. For groups of six or more, or a lakeside table at sunset, message us and we will hold it. ' + HOURS_SUMMARY + '.',
    categories: ['food'],
  },
]

/** Targets "steak pattaya" (1,300/mo) and ร้านสเต็ก พัทยา (720/mo) - Sept 2026 keyword data. */
export default function Steak() {
  return (
    <div>
      <Seo
        title="Steak in Pattaya - Australian Angus Steaks by the Lake"
        description="Australian Black Angus steaks in East Pattaya: 250g ribeye 650 THB, sirloin 550, lamb chops 699, salmon 469, chicken 299 - all with two sides and a sauce. Eat lakeside or by the pool at Hemingways Lakeside, Lake Mabprachan."
        jsonLd={[buildFaqSchema(faqs)]}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[#0d0d0d] z-10" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hero-evening.webp')" }} />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Australian Black Angus · East Pattaya</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-2xl">Steak, By The Lake</h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              250g Angus ribeye and sirloin, 300g lamb chops, salmon and chicken steaks - each with two sides
              and a sauce, served on the shore of Lake Mabprachan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#menu" className="px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors text-center">
                Steak Menu &amp; Prices
              </a>
              <a
                href={FB_MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-white/30 text-white font-bold text-sm tracking-widest uppercase rounded hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors text-center"
              >
                Book A Table
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">Steak Menu</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">Cuts &amp; Prices</h2>
            <p className="text-[#5c5346] mt-3">All prices in Thai baht. Every steak includes two sides and a sauce.</p>
          </div>
          <div className="space-y-4">
            {STEAKS.map(s => (
              <div key={s.name} className="bg-white border border-black/5 rounded-2xl p-6 flex items-start justify-between gap-4 shadow-sm">
                <div>
                  <h3 className="text-[#1a1512] font-bold text-lg">{s.name}</h3>
                  <p className="text-[#8a6d2f] text-sm">{s.th}</p>
                  <p className="text-[#5c5346] text-sm mt-1">{s.desc}</p>
                </div>
                <span className="text-[#1a1512] font-bold text-2xl shrink-0">{s.price}<span className="text-sm font-normal text-[#5c5346] ml-1">THB</span></span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {[
              ['Side 1 (choose one)', STEAK_SIDES.side1],
              ['Side 2 (choose one)', STEAK_SIDES.side2],
              ['Sauce (choose one)', STEAK_SIDES.sauce],
            ].map(([title, list]) => (
              <div key={title as string} className="bg-white border border-black/5 rounded-2xl p-6">
                <h3 className="text-[#1a1512] font-bold mb-3">{title}</h3>
                <ul className="text-[#5c5346] text-sm space-y-1">
                  {(list as string[]).map(x => <li key={x}>{x}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-[#5c5346] text-sm text-center mt-8">Prices as printed on the menu board, Sept 2026 - may change. Happy hour weekdays 4-7pm, weekends 1-9pm.</p>
        </div>
      </section>

      {/* Why here */}
      <section className="py-20 px-4 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Beef, title: 'Australian Angus', desc: 'Black Angus ribeye and sirloin, Angus lamb - not a "steak" in name only.' },
            { icon: Flame, title: 'Cooked how you like it', desc: 'Tell your server rare to well done; peppercorn or mushroom sauce, gravy or cream.' },
            { icon: Waves, title: 'Lake, pool, terrace', desc: 'Sunset over Lake Mabprachan from the terrace, a swim before dinner if you want one - the pool is free when you eat.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-[#f6efe0] border border-black/5 rounded-2xl p-8">
              <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center mb-4">
                <Icon size={20} className="text-[#8a6d2f]" />
              </div>
              <h3 className="text-[#1a1512] font-bold text-lg mb-1">{title}</h3>
              <p className="text-[#5c5346] text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <FaqMini heading="Steak Questions" items={faqs} />

      <section className="pb-24 pt-8 px-4 text-center flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors">
          <MapPin size={16} /> Directions
        </a>
        <a href={FB_MESSENGER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#c9a84c]/50 text-[#8a6d2f] font-bold text-sm tracking-widest uppercase rounded hover:bg-[#c9a84c]/10 transition-colors">
          <MessageCircle size={16} /> Message Us
        </a>
      </section>
      <p className="text-center text-sm text-[#5c5346] pb-16 -mt-12">
        Not a steak night? See <Link to="/food" className="underline hover:text-[#8a6d2f]">pub classics &amp; breakfast</Link> or the{' '}
        <Link to="/sunday-roast" className="underline hover:text-[#8a6d2f]">Sunday roast carvery</Link>.
      </p>
    </div>
  )
}
