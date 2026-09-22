import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bike, Footprints, Car, Sun, Waves, UtensilsCrossed, MapPin, Clock } from 'lucide-react'
import Seo from '../components/Seo'
import { buildFaqSchema, HOURS_SUMMARY } from '../lib/schema'

const PAGE_URL = 'https://hemingwayslakeside.com/lake-mabprachan'
const TH_URL = 'https://hemingwayslakeside.com/th/mabprachan-reservoir-guide'
const LAKE_MAPS_URL = 'https://maps.google.com/?q=Mabprachan+Reservoir'
const VENUE_MAPS_URL = 'https://maps.google.com/?q=Hemingways+Lakeside+Pattaya'

// Facts confirmed by Shane (Sept 2026): 10.8 km loop, hundreds of parking spots,
// busiest and best at ~6pm, little shade, few stray dogs, bike hire 50 THB, tyre air 20 THB.
const LOOP_KM = '10.8'

const essentials = [
  { icon: Footprints, title: `${LOOP_KM} km loop`, desc: 'A flat road runs the whole way round the reservoir. Walkers, runners and cyclists all share it - most people go anticlockwise.' },
  { icon: Bike, title: 'Bike hire 50 THB', desc: 'Rent a bike by the lake for 50 baht. Brought your own? Air for your tyres is 20 baht.' },
  { icon: Car, title: 'Parking is never a problem', desc: 'Hundreds of free spots around the lake. Park, walk a lap, drive round to us afterwards - or park at Hemingways and start from here.' },
  { icon: Sun, title: 'Go at 6pm', desc: 'There is not much shade, so the lake is quiet in the midday heat. From about 5.30pm it fills up and the atmosphere is brilliant - sunset over the water, the whole of East Pattaya out for a lap.' },
]

const afterwards = [
  { icon: Waves, title: 'Free pool with your meal', desc: 'Cool off in our swimming pool - free when you eat or drink with us. Showers and changing rooms on site.' },
  { icon: UtensilsCrossed, title: 'Breakfast, lunch, dinner', desc: 'Open from 8am for breakfast after an early lap; full Western and Thai menu, a kids\' menu, and cold beer in the beer garden after an evening one.' },
  { icon: Clock, title: HOURS_SUMMARY, desc: 'Closed Tuesdays. Happy hour weekdays 4-7pm, weekends 1-9pm.' },
]

const faqs = [
  {
    question: 'Where is Lake Mabprachan?',
    answer:
      'Mabprachan Reservoir (Lake Mabprachan) is in Pong, East Pattaya, Chonburi - the area locals call the "Darkside", inland from Sukhumvit Road. It is roughly 20-30 minutes by car from Pattaya Beach and Jomtien. Hemingways Lakeside sits right on the lake.',
  },
  {
    question: 'How far is it around Lake Mabprachan?',
    answer: `The loop road around the reservoir is about ${LOOP_KM} km - a comfortable walk of around 2 hours, a 60-90 minute run, or a 30-45 minute easy cycle.`,
  },
  {
    question: 'What are the opening hours of Mabprachan Reservoir?',
    answer:
      'The lake is a public reservoir with an open road around it, so there are no gates or opening hours and no entry fee. Most people come early morning or from about 5.30pm, when it is cooler.',
  },
  {
    question: 'Is there parking at Lake Mabprachan?',
    answer: 'Yes - hundreds of free parking spots around the lake. Parking is never a problem, even at 6pm when it is busiest.',
  },
  {
    question: 'Can you hire a bike at Lake Mabprachan?',
    answer: 'Yes. Bike hire by the lake is 50 baht, and if you bring your own bike you can top up your tyres for 20 baht.',
  },
  {
    question: 'What is the best time to visit?',
    answer:
      'Around 6pm. There is not much shade on the loop, so midday is hot and empty. In the early evening it is packed with walkers, runners and cyclists and the atmosphere is the best in East Pattaya. Early morning (6-8am) is the quiet alternative.',
  },
  {
    question: 'Are there stray dogs?',
    answer: 'A few, but not many, and they are not a problem - they are used to hundreds of people walking past every evening.',
  },
  {
    question: 'Can you swim in Lake Mabprachan?',
    answer:
      'The reservoir is a water supply, not a swimming lake - people walk, run, cycle and fish there rather than swim. If you want a swim, Hemingways Lakeside has a swimming pool on the lake that is free when you eat or drink with us.',
  },
  {
    question: 'Where can I eat near Lake Mabprachan?',
    answer:
      'Hemingways Lakeside is on the lake itself, open from 8am for breakfast through to dinner (closed Tuesdays), with a Western and Thai menu, a beer garden and a free pool with dining. Free parking on site.',
  },
]

/** English guide to Lake Mabprachan - targets "lake mabprachan" / "pattaya darkside" searches (Sept 2026 keyword data). */
export default function LakeMabprachan() {
  useEffect(() => {
    const links = [
      { hreflang: 'en', href: PAGE_URL },
      { hreflang: 'th', href: TH_URL },
      { hreflang: 'x-default', href: PAGE_URL },
    ].map(({ hreflang, href }) => {
      const el = document.createElement('link')
      el.rel = 'alternate'
      el.hreflang = hreflang
      el.href = href
      document.head.appendChild(el)
      return el
    })
    return () => links.forEach(el => el.remove())
  }, [])

  return (
    <div>
      <Seo
        title="Lake Mabprachan, East Pattaya - Walking, Cycling & Where To Eat"
        description={`Guide to Lake Mabprachan (Mabprachan Reservoir), East Pattaya: the ${LOOP_KM} km loop, bike hire, parking, best time to go and where to eat and swim afterwards. Hemingways Lakeside is right on the lake.`}
        jsonLd={[buildFaqSchema(faqs)]}
      />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0d0d0d] z-10" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/hero-evening.webp')" }} />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">East Pattaya · Pong · The Darkside</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-3xl leading-tight">Lake Mabprachan</h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              East Pattaya's reservoir and its favourite evening out: a {LOOP_KM} km loop for walking, running and cycling,
              sunset over the water, and Hemingways Lakeside on the shore when you're done.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={LAKE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors text-center"
              >
                Lake On Google Maps
              </a>
              <a
                href="#afterwards"
                className="px-8 py-4 border border-white/30 text-white font-bold text-sm tracking-widest uppercase rounded hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors text-center"
              >
                Eat &amp; Swim After
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Essentials */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">The Essentials</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">Everything You Need To Know</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {essentials.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center mb-6">
                  <Icon size={22} className="text-[#8a6d2f]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1a1512]">{title}</h3>
                <p className="text-[#5c5346] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-4 bg-white border-y border-black/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1512] mb-6">What is Mabprachan Reservoir?</h2>
          <div className="space-y-4 text-[#5c5346] leading-relaxed">
            <p>
              Mabprachan Reservoir (อ่างเก็บน้ำมาบประชัน) is the big lake in Pong, East Pattaya - the part of town locals
              call the Darkside, a few kilometres inland from Sukhumvit Road. It was built as a water supply reservoir for
              the Pattaya area, and the road that rings it has become East Pattaya's outdoor gym: every evening it fills
              with walkers, runners, cyclists, families with pushchairs and people fishing from the bank.
            </p>
            <p>
              There is no entry fee, no gate and no opening time. Come at 6pm and you'll see why people drive out from
              town for it - the light on the water, the breeze, and the whole neighbourhood out doing a lap.
            </p>
            <p>
              A lap is {LOOP_KM} km. Bring water and a hat - shade is scarce - and if you don't have a bike, hire one by the
              lake for 50 baht.
            </p>
          </div>
        </div>
      </section>

      {/* Afterwards */}
      <section id="afterwards" className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">After Your Lap</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">Hemingways Lakeside Is On The Lake</h2>
            <p className="text-[#5c5346] mt-4 max-w-2xl mx-auto">
              We're on the shore of the reservoir, so finish your loop here: a swim in the pool, a shower, then breakfast
              or dinner looking back over the water.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {afterwards.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center mb-6">
                  <Icon size={22} className="text-[#8a6d2f]" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-[#1a1512]">{title}</h3>
                <p className="text-[#5c5346] leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a
              href={VENUE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors"
            >
              <MapPin size={16} /> Directions To Hemingways
            </a>
            <Link
              to="/pool"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#c9a84c]/50 text-[#8a6d2f] font-bold text-sm tracking-widest uppercase rounded hover:bg-[#c9a84c]/10 transition-colors"
            >
              <Waves size={16} /> The Free Pool
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">FAQ</p>
            <h2 className="text-3xl font-bold text-[#1a1512]">Lake Mabprachan Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(f => (
              <details key={f.question} className="bg-[#f6efe0] border border-black/5 rounded-2xl p-6 group">
                <summary className="font-bold text-[#1a1512] cursor-pointer list-none flex justify-between items-center">
                  {f.question}
                  <span className="text-[#8a6d2f] group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <p className="text-[#5c5346] mt-4 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
          <p className="text-center text-sm text-[#5c5346] mt-10">
            Bringing the kids? See our <Link to="/family-kids" className="underline hover:text-[#8a6d2f]">family &amp; kids page</Link>.
            อ่านภาษาไทย: <Link to="/th/mabprachan-reservoir-guide" className="underline hover:text-[#8a6d2f]">อ่างเก็บน้ำมาบประชัน</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
