import { Tv, Volume2, Beer, MapPin, Phone, Armchair } from 'lucide-react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import FaqMini from '../components/FaqMini'
import { buildFaqSchema, SITE_FAQS, HOURS_SUMMARY, LATE_FOOTBALL_POLICY } from '../lib/schema'

const MAPS_URL = 'https://maps.google.com/?q=Hemingways+Lakeside+Pattaya'

const sportsFaqs = SITE_FAQS.filter(f => f.categories.includes('sports'))

const sports = [
  { emoji: '⚽', name: 'Premier League & Football', desc: 'Every PL game worth watching, plus Champions League, Europa and the internationals.' },
  { emoji: '🥊', name: 'UFC / MMA', desc: 'Every numbered card and the big Fight Nights — ask us to put the prelims on too.' },
  { emoji: '🥊', name: 'Boxing', desc: 'World title fights and the big PPV nights, sound up for the main event.' },
  { emoji: '🏈', name: 'NFL', desc: 'Regular season, playoffs and the Super Bowl — even at silly o\'clock Thailand time.' },
  { emoji: '🏉', name: 'Rugby', desc: 'Six Nations, Rugby Championship, World Cup — union and league both.' },
  { emoji: '⛳', name: 'Golf', desc: 'The majors and the Sunday back nine, on a quiet screen if you prefer.' },
  { emoji: '🏎️', name: 'F1 & Motorsport', desc: 'Lights out for every Grand Prix, plus MotoGP and more.' },
  { emoji: '🏏', name: 'Cricket', desc: 'Test matches, the Ashes, IPL and World Cups — all-day cricket is what the bar was made for.' },
]

const setup = [
  { icon: Tv, title: '10+ Screens', desc: 'Throughout the venue — inside, at the bar and around the pool. You\'re never far from the action.' },
  { icon: Armchair, title: 'Dedicated Sports Bar', desc: 'A proper sports bar area built for match days, not a TV bolted in a corner.' },
  { icon: Volume2, title: 'Sound On for Big Games', desc: 'Commentary up and atmosphere on for the games that matter.' },
  { icon: Beer, title: 'Cold Beer & Drinks Deals', desc: 'Ice-cold draught and drinks deals running alongside the sport. Check the specials board.' },
]

export default function Sports() {
  return (
    <div>
      <Seo
        title="Sports Bar"
        description="East Pattaya's dedicated sports bar at Hemingways Lakeside — 10+ screens, Premier League, UFC, NFL, rugby, F1 and more, plus cold draught beer."
        jsonLd={[buildFaqSchema(sportsFaqs)]}
      />
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[#0d0d0d] z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/sports-hero.webp')" }}
        />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Live Sports</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-2xl">
              If It’s on TV, We’ll Get It On
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              10+ screens, a dedicated sports bar, sound on for the big games and cold beer
              to go with it. No schedule to check &mdash; just come in and ask.
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Setup */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">The Setup</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">Built for Match Days</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {setup.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#8a6d2f]" />
                </div>
                <h3 className="text-[#1a1512] font-bold mb-1">{title}</h3>
                <p className="text-[#5c5346] text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we show */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">What We Show</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">Everything Worth Watching</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sports.map(({ emoji, name, desc }) => (
              <div key={name} className="bg-[#f6efe0] border border-black/5 rounded-2xl p-6">
                <div className="text-3xl mb-3">{emoji}</div>
                <h3 className="text-[#1a1512] font-bold mb-1">{name}</h3>
                <p className="text-[#5c5346] text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[#5c5346] mt-10 max-w-xl mx-auto">
            Not on the list? If it’s being broadcast anywhere, we can almost certainly get it on a
            screen for you &mdash; just ask at the bar.
          </p>
        </div>
      </section>

      {/* FAQ (also feeds FAQPage schema above) */}
      <FaqMini heading="Sports Bar Questions" items={sportsFaqs} />

      {/* Just come in */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-4xl mx-auto bg-white border border-black/5 rounded-3xl p-10 sm:p-14 text-center shadow-sm">
          <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">No Booking Needed</p>
          <h2 className="text-3xl font-bold mb-4 text-[#1a1512]">Just Come In</h2>
          <p className="text-[#5c5346] max-w-lg mx-auto mb-8">
            No schedule, no reservations, no fuss. Turn up, grab a seat, tell us what you want
            on &mdash; and if your game clashes with someone else’s, that’s what 10+ screens are for.
            {' '}{HOURS_SUMMARY}.
          </p>
          <p className="text-[#8a6d2f] text-sm max-w-lg mx-auto mb-8">
            {LATE_FOOTBALL_POLICY}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors"
            >
              <MapPin size={16} /> Get Directions
            </a>
            <a
              href="tel:0642400222"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#8a6d2f]/40 text-[#8a6d2f] font-bold text-sm tracking-widest uppercase rounded hover:bg-[#c9a84c]/10 transition-colors"
            >
              <Phone size={16} /> 064-240-0222
            </a>
          </div>
          <p className="text-[#5c5346] text-sm mt-8">
            Big game day? Pair it with a swim &mdash; <Link to="/pool" className="text-[#8a6d2f] hover:underline">the pool is free for diners</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
