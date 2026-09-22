import { Link } from 'react-router-dom'
import { Waves, Flag, Church, Grape, TreePine, Mountain, UtensilsCrossed, MapPin, Car } from 'lucide-react'
import Seo from '../components/Seo'
import FaqMini from '../components/FaqMini'
import { buildFaqSchema, HOURS_SUMMARY, type FaqItem } from '../lib/schema'

const PAGE_URL = 'https://hemingwayslakeside.com/east-pattaya-darkside'
const MAPS_URL = 'https://maps.google.com/?q=Hemingways+Lakeside+Pattaya'

// Drive times are rough, from Lake Mabprachan, off-peak. Keep hedged - they are here as
// orientation, not a timetable.
const places = [
  { icon: Waves, name: 'Lake Mabprachan', dist: 'You are here', desc: 'The reservoir at the heart of the Darkside - a 10.8 km loop for walking, running and cycling, busiest and best at 6pm. Bike hire 50 THB by the lake.', link: '/lake-mabprachan' },
  { icon: Flag, name: 'Golf: Siam Country Club, Phoenix Gold, Burapha, Pattana', dist: '10-25 min', desc: "The Darkside is Pattaya's golf country. Siam CC's courses and Phoenix Gold are minutes from the lake; Burapha and Pattana a little further north and east. We are the natural 19th hole - free pool, cold beer, big screens." },
  { icon: Church, name: 'Wat Yansangwararam (Wat Yan)', dist: '~20 min', desc: 'A large, peaceful temple complex south of the lake with gardens, a lake of its own and a Chinese-style pavilion. Dress modestly; go in the morning before the heat.' },
  { icon: Mountain, name: 'Khao Chi Chan (Buddha Mountain)', dist: '~20 min', desc: 'The 100-plus-metre Buddha image laser-carved into a limestone cliff, next door to Wat Yan. Free, quick, and one of the most photographed spots outside town.' },
  { icon: Grape, name: 'Silverlake Vineyard', dist: '~20 min', desc: 'Vineyard, cafe and viewpoint under Khao Chi Chan - popular with Thai day-trippers for the photos and the grape juice as much as the wine.' },
  { icon: TreePine, name: 'Nong Nooch Tropical Garden', dist: '~25 min', desc: 'Enormous landscaped gardens, cultural shows and the dinosaur valley the kids remember. Allow half a day.' },
  { icon: Car, name: 'Khao Kheow Open Zoo', dist: '~35 min', desc: 'Drive-through safari-style zoo north-east of the lake - a full day out with kids, best started early.' },
]

const faqs: FaqItem[] = [
  {
    question: 'What is the "Pattaya Darkside"?',
    answer:
      'The Darkside is the expat nickname for East Pattaya - everything inland (east) of Sukhumvit Road, around Lake Mabprachan, Pong, Nong Prue and the golf courses. It got the name because it was dark and quiet compared with the neon of Beach Road; today it is where a lot of families and long-term residents live.',
    categories: ['general'],
  },
  {
    question: 'How far is East Pattaya from the beach?',
    answer: 'Roughly 20-30 minutes by car from Pattaya Beach or Jomtien to Lake Mabprachan, depending on traffic on Sukhumvit and Siam Country Club Road.',
    categories: ['general'],
  },
  {
    question: 'What is there to do on the Darkside?',
    answer: 'Walk or cycle Lake Mabprachan, play golf (Siam Country Club, Phoenix Gold, Burapha, Pattana), visit Wat Yan and Khao Chi Chan Buddha Mountain, Silverlake Vineyard and Nong Nooch Tropical Garden - then eat and swim at Hemingways Lakeside on the lake.',
    categories: ['general'],
  },
  {
    question: 'Where can I eat in East Pattaya?',
    answer: `Hemingways Lakeside is on Lake Mabprachan itself: British pub classics, Australian steaks, Thai and Indian, a Sunday roast carvery, a beer garden and a swimming pool that is free when you eat. ${HOURS_SUMMARY}.`,
    categories: ['general', 'food'],
  },
  {
    question: 'Is East Pattaya good for families?',
    answer: 'Yes - it is quieter than the beach side, with the lake, gardens, the zoo and family restaurants. Hemingways Lakeside has a free pool, an indoor kids\' games room and a kids\' menu.',
    categories: ['general', 'kids'],
  },
]

/** Targets "pattaya darkside" (260/mo) and "east pattaya" queries - Sept 2026 keyword data. */
export default function EastPattayaDarkside() {
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Things to do in East Pattaya (the Darkside)',
    url: PAGE_URL,
    itemListElement: places.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name })),
  }

  return (
    <div>
      <Seo
        title="Pattaya Darkside Guide - Things To Do In East Pattaya"
        description="What locals mean by the Pattaya Darkside, and what to do there: Lake Mabprachan, golf at Siam Country Club and Phoenix, Wat Yan, Buddha Mountain, Silverlake, Nong Nooch - and where to eat and swim on the lake."
        jsonLd={[itemList, buildFaqSchema(faqs)]}
      />

      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0d0d0d] z-10" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/lake-mabprachan.webp')" }} />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">East Pattaya · Pong · Nong Prue</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-3xl leading-tight">The Pattaya Darkside</h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              The quiet, green side of Pattaya - inland from Sukhumvit, around Lake Mabprachan and the golf courses.
              Here is what it is, what to do, and where to eat when you are out here.
            </p>
            <a href="#places" className="inline-block px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors">
              Things To Do
            </a>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="py-20 px-4 bg-white border-b border-black/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1512] mb-6">Why "Darkside"?</h2>
          <div className="space-y-4 text-[#5c5346] leading-relaxed">
            <p>
              Ask a long-term expat where they live and a lot of them will say "the Darkside". It means East Pattaya:
              the side of Sukhumvit Road away from the sea - Pong, Nong Prue, Huay Yai, the roads around Lake
              Mabprachan and Siam Country Club. The name stuck years ago because, next to the lights of Beach Road
              and Walking Street, it was literally the dark side of town: farmland, reservoirs and golf courses.
            </p>
            <p>
              These days it is where families, retirees and golfers choose to live - bigger houses, less traffic,
              international schools, and the lake for an evening walk. It is 20-30 minutes from the beach, and
              most of the region's best days out are on this side.
            </p>
          </div>
        </div>
      </section>

      {/* Places */}
      <section id="places" className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">Things To Do</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">Around The Lake &amp; Beyond</h2>
            <p className="text-[#5c5346] mt-3 text-sm">Drive times are rough, from Lake Mabprachan, outside rush hour.</p>
          </div>
          <div className="space-y-4">
            {places.map(({ icon: Icon, name, dist, desc, link }) => (
              <div key={name} className="bg-white border border-black/5 rounded-2xl p-6 flex gap-4 shadow-sm">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center">
                  <Icon size={20} className="text-[#8a6d2f]" />
                </div>
                <div>
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="text-[#1a1512] font-bold text-lg">{name}</h3>
                    <span className="text-xs text-[#8a6d2f] tracking-wider uppercase">{dist}</span>
                  </div>
                  <p className="text-[#5c5346] text-sm mt-1">{desc}</p>
                  {link && (
                    <Link to={link} className="inline-block mt-2 text-sm font-bold text-[#8a6d2f] underline hover:text-[#1a1512]">Full lake guide →</Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eat here */}
      <section className="py-24 px-4 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">Eat, Drink, Swim</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">Hemingways Lakeside, On The Lake</h2>
            <p className="text-[#5c5346] mt-4 max-w-2xl mx-auto">
              The Darkside's lakeside restaurant and sports bar: breakfast from 8am, British pub classics, Australian
              steaks, a Sunday roast carvery, a beer garden and a pool that is free when you eat. Free parking.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {[['/pool-lounge.webp', 'Free pool with your meal'], ['/terrace.webp', 'Covered terrace by the pool'], ['/games-room.webp', "Kids' games room"]].map(([src, cap]) => (
              <figure key={src} className="bg-[#f6efe0] rounded-2xl overflow-hidden border border-black/5">
                <img src={src} alt={`Hemingways Lakeside - ${cap}`} loading="lazy" className="w-full aspect-[4/3] object-cover" />
                <figcaption className="text-sm text-[#5c5346] px-4 py-3">{cap}</figcaption>
              </figure>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors">
              <MapPin size={16} /> Directions
            </a>
            <Link to="/food" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#c9a84c]/50 text-[#8a6d2f] font-bold text-sm tracking-widest uppercase rounded hover:bg-[#c9a84c]/10 transition-colors">
              <UtensilsCrossed size={16} /> Menu &amp; Prices
            </Link>
          </div>
        </div>
      </section>

      <FaqMini heading="Darkside Questions" items={faqs} />
    </div>
  )
}
