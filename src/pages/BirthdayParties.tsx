import { UtensilsCrossed, Trees, Waves, Building2, Martini, Users } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import EventGallery from '../components/EventGallery'

const spaces = [
  { icon: Building2, title: 'Private Dining Room', desc: 'An indoor room of your own — long-table dinners, speeches, and air-con when you want it.' },
  { icon: Trees, title: 'Lakeside Outdoor Area', desc: 'Open-air tables under the festoon lights with Lake Mabprachan behind you. The golden-hour spot.' },
  { icon: Waves, title: 'Pool Area', desc: 'Loungers, poolside tables and drinks service — for parties that don’t want to stay seated.' },
  { icon: Users, title: 'Full Venue Hire', desc: 'Take the whole place — restaurant, pool and lakeside area — for celebrations of up to 100+.' },
]

const promises = [
  { icon: UtensilsCrossed, title: 'Your Menu, Your Way', desc: 'Set menus, sharing feasts, buffets or à la carte — built around your group and budget.' },
  { icon: Martini, title: 'Bar & Poolside Service', desc: 'Cocktails, wine and cold beer wherever the party is — table, lakeside or lounger.' },
  { icon: Users, title: 'Any Size of Night', desc: 'From a dinner for eight to a hundred-plus party that runs from sunset till close.' },
]

export default function BirthdayParties() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0d0d0d] z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-evening.webp')" }}
        />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Birthday Celebrations</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-2xl">
              Celebrate It Properly, Lakeside
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              An intimate dinner, a big group party, or something that starts at the table
              and ends by the pool &mdash; the venue flexes around your night.
            </p>
            <a
              href="#enquiry"
              className="inline-block px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors"
            >
              Start Planning
            </a>
          </div>
        </div>
      </section>

      {/* Spaces */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Pick Your Space</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Four Ways to Take Over the Lake</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {spaces.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#141414] border border-white/5 rounded-2xl p-8">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#c9a84c]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customisation promises */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Made For Your Group</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Nothing Off the Shelf</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promises.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-[#141414] border border-white/5 rounded-2xl p-6 text-center">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-4 mx-auto">
                  <Icon size={20} className="text-[#c9a84c]" />
                </div>
                <h3 className="text-white font-bold mb-1">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery (admin-managed) */}
      <EventGallery type="birthday" label="Past Celebrations" title="Nights We’ve Hosted" />

      {/* Enquiry */}
      <section id="enquiry" className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Tell Us About Your Night</h2>
            <p className="text-gray-500 text-sm">
              Every celebration is fully custom &mdash; date, group size and the vibe you’re after. We’ll do the rest.
            </p>
          </div>
          <EnquiryForm
            type="birthday"
            title="Birthday Enquiry"
            subtitle="We’ll come back with options and a tailored plan"
          />
        </div>
      </section>
    </div>
  )
}
