import { Link } from 'react-router-dom'
import { Tv, Beer, ChefHat, Users, Waves, PartyPopper, Star, ArrowRight } from 'lucide-react'

const features = [
  { icon: Tv, label: '15 Screen TVs', desc: 'Every sport from around the world on crystal-clear displays' },
  { icon: Beer, label: 'Draught Beers', desc: 'Wide selection of your favourite draught beers and ciders served cold' },
  { icon: ChefHat, label: 'Famous Pub Food', desc: 'Quality western menu and traditional Thai food — local favourites' },
  { icon: Users, label: 'English Management', desc: 'Friendly English staff ensuring top-quality service every visit' },
  { icon: Waves, label: 'Swimming Pool', desc: 'Cool off in our pool — perfect for families and pool days' },
  { icon: PartyPopper, label: 'Private Events', desc: 'Birthdays, kids parties, corporate functions — we host it all' },
]

const testimonials = [
  { name: 'John S.', time: '2 weeks ago', text: 'Fantastic place! Best expat bar in East Pattaya. Food is delicious and staff are amazing.' },
  { name: 'Yummy Mummy', time: '1 month ago', text: 'Great atmosphere, and the Sunday lunch is the best at The Lake. 10/10' },
  { name: 'Dave T.', time: '3 weeks ago', text: "Kids loved the pool and we had a great meal. Perfect family day out in Pattaya." },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0d0d0d] z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.webp')" }}
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-6">East Pattaya's Finest</p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-2">HEMINGWAYS</h1>
          <h2 className="text-3xl sm:text-5xl font-light tracking-[0.2em] text-[#c9a84c] mb-6">LAKESIDE</h2>
          <p className="text-gray-300 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Restaurant & Bar at The Lake. Live Sports. Pool. Great Food. Established 2020.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/events"
              className="px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors"
            >
              Book an Event
            </Link>
            <Link
              to="/menu"
              className="px-8 py-4 border border-white/30 text-white font-bold text-sm tracking-widest uppercase rounded hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
            >
              View Menu
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-12 bg-white/40" />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Why Hemingways</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Everything You Need</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="bg-[#141414] border border-white/5 rounded-2xl p-8 hover:border-[#c9a84c]/20 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-5 group-hover:bg-[#c9a84c]/20 transition-colors">
                <Icon size={22} className="text-[#c9a84c]" />
              </div>
              <h3 className="text-white font-bold mb-2">{label}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pool CTA */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-[#0a2a3a] to-[#0d1f2d] border border-[#c9a84c]/20 rounded-3xl p-10 sm:p-16 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Something Different</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Pool Days at The Lake</h2>
              <p className="text-gray-400 leading-relaxed mb-8">
                Cool off in our swimming pool while enjoying cold drinks and great food. Perfect for families, groups, and anyone who wants to make the most of the Pattaya sun.
              </p>
              <Link
                to="/pool"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors"
              >
                Pool Packages <ArrowRight size={16} />
              </Link>
            </div>
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-[#c9a84c]/10 flex items-center justify-center shrink-0">
              <Waves size={48} className="text-[#c9a84c]" />
            </div>
          </div>
        </div>
      </section>

      {/* Events CTA */}
      <section className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Private Hire</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Host Your Event Here</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10">
            Birthday parties, kids pool parties, corporate functions, sports screenings — we handle everything so you can enjoy the day.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events/birthdays" className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-sm hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors">
              🎂 Birthday Parties
            </Link>
            <Link to="/events/kids" className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-sm hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors">
              🎉 Kids Parties
            </Link>
            <Link to="/events/corporate" className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-sm hover:border-[#c9a84c]/40 hover:text-[#c9a84c] transition-colors">
              🤝 Corporate Events
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Reviews</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">What Guests Say</h2>
            <div className="flex items-center justify-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-[#c9a84c] fill-[#c9a84c]" />
              ))}
              <span className="text-gray-400 text-sm ml-2">4.8 · 250+ reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-[#141414] border border-white/5 rounded-2xl p-8">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="text-[#c9a84c] fill-[#c9a84c]" />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-600 text-xs">{t.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location strip */}
      <section className="py-16 px-4 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white font-bold text-lg mb-1">Open Daily 8:00 AM – 10:00 PM</h3>
            <p className="text-gray-500 text-sm">Pornprapanimit Road, East Pattaya, Thailand · 064-240-0222</p>
          </div>
          <Link
            to="/location"
            className="px-6 py-3 border border-[#c9a84c]/40 text-[#c9a84c] text-sm tracking-wider uppercase rounded hover:bg-[#c9a84c]/10 transition-colors"
          >
            Get Directions
          </Link>
        </div>
      </section>
    </div>
  )
}
