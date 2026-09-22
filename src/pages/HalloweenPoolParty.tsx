import { Link } from 'react-router-dom'
import { Ghost, Waves, Gamepad2, UtensilsCrossed, MapPin, Phone } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import Seo from '../components/Seo'
import { buildEventSchema } from '../lib/schema'

const MAPS_URL = 'https://maps.google.com/?q=Hemingways+Lakeside+Pattaya'

const points = [
  { icon: Ghost, title: 'Costumes Welcome', desc: 'Come dressed up - little monsters, witches and superheroes all welcome, grown-ups included.' },
  { icon: Waves, title: 'Pool Party', desc: 'Our swimming pool is the party, with shallow areas for younger kids. No lifeguard on duty - parents supervise.' },
  { icon: Gamepad2, title: 'Playroom Too', desc: "An indoor kids' playroom for a break from the sun, or if the weather turns." },
  { icon: UtensilsCrossed, title: 'Food & Drinks', desc: "Kids' menu and our full Western and Thai menu, lakeside, while the kids run wild." },
]

export default function HalloweenPoolParty() {
  return (
    <div>
      <Seo
        title="Halloween Kids Pool Party - Sat 31 October 2026"
        description="Halloween Kids Pool Party at Hemingways Lakeside, East Pattaya - Saturday 31 October 2026. Costumes, swimming pool, kids' playroom and food by Lake Mabprachan. Register your family's interest."
        jsonLd={[
          buildEventSchema({
            name: 'Halloween Kids Pool Party at Hemingways Lakeside',
            description: "A family Halloween pool party by Lake Mabprachan, East Pattaya - costumes, swimming pool, kids' playroom and food.",
            startDate: '2026-10-31',
            path: '/events/halloween',
          }),
        ]}
      />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[#0d0d0d] z-10" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/kids-hero.webp')" }} />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Saturday 31 October 2026</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-2xl">Halloween Kids Pool Party</h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              Halloween lands on a Saturday this year, so we're throwing a pool party for the kids. Costumes on,
              swimmers packed, lakeside in East Pattaya.
            </p>
            <a
              href="#enquiry"
              className="inline-block px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors"
            >
              Save Your Family's Spot
            </a>
          </div>
        </div>
      </section>

      {/* Points */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">What To Expect</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">Spooky, Splashy, Sorted</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {points.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#8a6d2f]" />
                </div>
                <h3 className="text-[#1a1512] font-bold text-lg mb-1">{title}</h3>
                <p className="text-[#5c5346] text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note on details */}
      <section className="py-16 px-4 bg-white border-y border-black/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#5c5346] leading-relaxed">
            Times, activities and ticket details are being confirmed. Register below and we'll message you as soon
            as they're set - registered families hear first.
          </p>
          <p className="text-[#5c5346] leading-relaxed mt-4">
            Got a birthday coming up?{' '}
            <Link to="/birthday-club" className="underline hover:text-[#8a6d2f]">Join the Birthday Club</Link> for a
            free birthday dessert, or see our{' '}
            <Link to="/events/kids" className="underline hover:text-[#8a6d2f]">kids' party packages</Link>.
          </p>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquiry" className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2 text-[#1a1512]">Register Your Interest</h2>
            <p className="text-[#5c5346] text-sm">
              Tell us how many kids and adults are coming and we'll be in touch with the details.
            </p>
          </div>
          <EnquiryForm
            type="event"
            title="Halloween Kids Pool Party"
            subtitle="Saturday 31 October 2026 - let us know your group size"
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
        <a
          href="tel:0642400222"
          className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-widest uppercase rounded hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
        >
          <Phone size={16} /> 064-240-0222
        </a>
      </section>
    </div>
  )
}
