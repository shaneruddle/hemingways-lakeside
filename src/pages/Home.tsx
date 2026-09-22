import { Link } from 'react-router-dom'
import { Tv, Beer, ChefHat, Users, Waves, PartyPopper, Star, ArrowRight } from 'lucide-react'
import Seo from '../components/Seo'
import NewsletterSignup from '../components/NewsletterSignup'
import { HOURS_SUMMARY } from '../lib/schema'

const features = [
  { icon: Waves, label: 'Free Swimming Pool', desc: 'Free with any table or bar order — no tickets, no time limits' },
  { icon: Tv, label: '10+ Screen TVs', desc: 'Every sport from around the world on crystal-clear displays' },
  { icon: Beer, label: 'Draught Beers', desc: 'Wide selection of your favourite draught beers and ciders served cold' },
  { icon: ChefHat, label: 'Famous Pub Food', desc: 'Quality western menu and traditional Thai food — local favourites' },
  { icon: Users, label: 'English Management', desc: 'Friendly English staff ensuring top-quality service every visit' },
  { icon: PartyPopper, label: 'Private Events', desc: 'Birthdays, kids parties, corporate functions — we host it all' },
]

// Real Google reviews (5★), copied from the Business Profile on 22 Sept 2026.
// Rating/count below should be refreshed occasionally - or wire up the Places API.
const GOOGLE_RATING = '4.4'
const GOOGLE_REVIEW_COUNT = '395'
const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps/place/?q=place_id:ChIJWfsfAuyVAjERylWF266iQkY'
const testimonials = [
  { name: 'Mike Seo', time: 'Google review', text: 'We celebrated a birthday at Hemingways, highly recommended. We viewed a few other restaurants but after seeing Hemingways we knew it was the place for us. Fred the manager and the rest of the staff were so easy to deal with, the price was right, the food was great, and everything went smoothly.' },
  { name: 'Law Man Ka', time: 'Google review', text: 'A great restaurant for families, with options for children like billiards or swimming. The food is delicious and offers a wide variety of choices. Prices are reasonable.' },
  { name: 'Nangirl Malila', time: 'Google review', text: 'Great food with excellent service. I also love the play room and big swimming pool that kids and everyone in the family can enjoy. Highly recommend for your next meal.' },
]

export default function Home() {
  return (
    <div>
      <Seo />
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0d0d0d] z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero.webp')" }}
        />
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-6">Free Pool · Live Sports · On The Lake</p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-2">HEMINGWAYS</h1>
          <h2 className="text-3xl sm:text-5xl font-light tracking-[0.2em] text-[#c9a84c] mb-6">LAKESIDE</h2>
          <p className="text-gray-300 text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            A free swimming pool with every meal, 10+ screens for every match, and great food
            on the shores of Lake Mabprachan in East Pattaya.
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
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">Why Hemingways</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">Everything You Need</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm hover:border-[#c9a84c]/40 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center mb-5 group-hover:bg-[#c9a84c]/25 transition-colors">
                  <Icon size={22} className="text-[#8a6d2f]" />
                </div>
                <h3 className="text-[#1a1512] font-bold mb-2">{label}</h3>
                <p className="text-[#5c5346] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
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
                to="/pool-party"
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
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#f6efe0] rounded-3xl overflow-hidden flex flex-col md:flex-row items-stretch">
            <div className="flex-1 p-10 sm:p-16 flex flex-col justify-center">
              <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">Private Hire</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-[#1a1512]">Host Your Event Here</h2>
              <p className="text-[#5c5346] max-w-xl mb-8">
                Birthday parties, kids pool parties, corporate functions, sports screenings — we handle everything so you can enjoy the day.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/events/birthdays" className="px-6 py-3 bg-white border border-black/10 rounded-lg text-sm text-[#1a1512] text-center hover:border-[#c9a84c] hover:text-[#8a6d2f] transition-colors">
                  🎂 Birthday Parties
                </Link>
                <Link to="/events/kids" className="px-6 py-3 bg-white border border-black/10 rounded-lg text-sm text-[#1a1512] text-center hover:border-[#c9a84c] hover:text-[#8a6d2f] transition-colors">
                  🎉 Kids Parties
                </Link>
                <Link to="/events/corporate" className="px-6 py-3 bg-white border border-black/10 rounded-lg text-sm text-[#1a1512] text-center hover:border-[#c9a84c] hover:text-[#8a6d2f] transition-colors">
                  🤝 Corporate Events
                </Link>
              </div>
            </div>
            <div
              className="flex-1 min-h-[280px] bg-cover bg-center"
              style={{ backgroundImage: "url('/kids-hero.webp')" }}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">Reviews</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 text-[#1a1512]">What Guests Say</h2>
            <div className="flex items-center justify-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-[#c9a84c] fill-[#c9a84c]" />
              ))}
              <span className="text-[#5c5346] text-sm ml-2">{GOOGLE_RATING} · {GOOGLE_REVIEW_COUNT} Google reviews</span>
            </div>
            <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-xs text-[#8a6d2f] underline underline-offset-2 hover:text-[#1a1512]">Read all reviews on Google</a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.name} className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className="text-[#c9a84c] fill-[#c9a84c]" />
                  ))}
                </div>
                <p className="text-[#3d372e] text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div>
                  <p className="text-[#1a1512] font-semibold text-sm">{t.name}</p>
                  <p className="text-[#8a6d2f] text-xs">{t.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSignup variant="section" />

      {/* Location strip */}
      <section className="py-16 px-4 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-[#1a1512] font-bold text-lg mb-1">{HOURS_SUMMARY}</h3>
            <p className="text-[#5c5346] text-sm">Pornprapanimit Road, East Pattaya, Thailand · 064-240-0222</p>
          </div>
          <Link
            to="/location"
            className="px-6 py-3 border border-[#8a6d2f]/40 text-[#8a6d2f] text-sm tracking-wider uppercase rounded hover:bg-[#c9a84c]/10 transition-colors"
          >
            Get Directions
          </Link>
        </div>
      </section>
    </div>
  )
}
