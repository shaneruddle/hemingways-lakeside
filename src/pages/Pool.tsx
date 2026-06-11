import { Waves, Gamepad2, Martini, UtensilsCrossed, ShowerHead, Car, MapPin, Clock, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import EnquiryForm from '../components/EnquiryForm'

const MAPS_URL = 'https://maps.google.com/?q=Hemingways+Lakeside+Pattaya'

const facilities = [
  { icon: Waves, title: 'Swimming Pool', desc: 'Clean, well-kept pool with shallow areas where little ones can splash safely.' },
  { icon: Gamepad2, title: 'Kids’ Playroom', desc: 'An indoor playroom to keep the kids busy when they’re done swimming.' },
  { icon: UtensilsCrossed, title: 'Full Restaurant', desc: 'Proper meals, wood-fired pizzas and a full kids’ menu — served all day.' },
  { icon: Martini, title: 'Poolside Bar', desc: 'Cold beers, cocktails and coffees brought straight to your lounger.' },
  { icon: ShowerHead, title: 'Changing Rooms', desc: 'Changing rooms and showers on-site — arrive, swim, freshen up, eat.' },
  { icon: Car, title: 'Easy Parking', desc: 'Free on-site parking right by the entrance. No circling, no stress.' },
]

const dayPlan = [
  { time: 'Arrive', desc: 'Grab a table or a lounger — the kids are in the pool before you’ve ordered drinks.' },
  { time: 'Swim & Play', desc: 'Pool, beach balls, inflatables, and the playroom for a break from the sun.' },
  { time: 'Lunch', desc: 'Order from the full menu poolside or at your table. Kids’ menu included.' },
  { time: 'Stay On', desc: 'Coffee and cake, a cold beer, one more swim. Nobody’s rushing you out.' },
]

export default function Pool() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0d0d0d] z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/pool.webp')" }}
        />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Free For Diners & Guests</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-2xl">
              A Family Day Out, Not Just a Meal
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              Swim, eat, play and relax by Lake Mabprachan. The pool is free for anyone
              dining or visiting as a guest &mdash; just turn up.
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

      {/* Free with dining banner */}
      <section className="py-12 px-4 bg-[#c9a84c]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h2 className="text-black font-bold text-2xl sm:text-3xl">The pool is free. Really.</h2>
            <p className="text-black/70 text-base sm:text-lg">
              Eat or drink with us and the whole family swims at no charge. No tickets, no time limits.
            </p>
          </div>
          <div className="flex items-center gap-6 text-black/80 text-sm font-bold tracking-wider uppercase shrink-0">
            <span className="flex items-center gap-2"><Clock size={16} /> Daily 8 AM &ndash; 10 PM</span>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Everything On-Site</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Built for a Full Day</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map(({ icon: Icon, title, desc }) => (
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

      {/* How a day works */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Your Day at the Lake</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dayPlan.map(({ time, desc }, i) => (
              <div key={time} className="relative bg-[#141414] border border-white/5 rounded-2xl p-6">
                <div className="text-[#c9a84c] font-bold text-4xl mb-3 opacity-30">{i + 1}</div>
                <h3 className="text-white font-bold mb-1">{time}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Worth the trip / directions */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto bg-[#141414] border border-white/10 rounded-3xl p-10 sm:p-14 text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Worth the Drive</p>
          <h2 className="text-3xl font-bold mb-4">30 Minutes From Central Pattaya</h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-8">
            We&rsquo;re out at Lake Mabprachan in East Pattaya &mdash; away from the traffic and the crowds.
            An easy drive, free parking when you arrive, and a day the kids will ask to repeat.
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
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#c9a84c]/40 text-[#c9a84c] font-bold text-sm tracking-widest uppercase rounded hover:bg-[#c9a84c]/10 transition-colors"
            >
              <Phone size={16} /> 064-240-0222
            </a>
          </div>
        </div>
      </section>

      {/* Kids pool parties CTA */}
      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Kids Love It</p>
          <h2 className="text-3xl font-bold mb-4">Planning a Kids Pool Party?</h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-8">
            We specialise in kids birthday pool parties. Food, drinks, pool time, and a private
            area for your group. We handle everything.
          </p>
          <Link
            to="/events/kids"
            className="inline-block px-8 py-4 border border-[#c9a84c]/40 text-[#c9a84c] font-bold text-sm tracking-widest uppercase rounded hover:bg-[#c9a84c]/10 transition-colors"
          >
            Kids Party Packages
          </Link>
        </div>
      </section>

      {/* Enquiry */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Coming With a Group?</h2>
            <p className="text-gray-500 text-sm">Walk-ins always welcome &mdash; book ahead for groups of 6+</p>
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
