import { Building2, Trees, Waves, Users, ChefHat, Monitor, Wifi, Car } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import EventGallery from '../components/EventGallery'

const spaces = [
  { icon: Building2, title: 'Private Dining Room', desc: 'Indoor, air-conditioned and quiet — boardroom lunches, planning sessions, award dinners.' },
  { icon: Trees, title: 'Lakeside Outdoor Area', desc: 'Open-air dining over Lake Mabprachan — the change of scene that gets people talking.' },
  { icon: Waves, title: 'Pool Area', desc: 'Casual team days and end-of-quarter parties — loungers, drinks service, no neckties.' },
  { icon: Users, title: 'Full Venue Hire', desc: 'The whole venue for your company — 100+ capacity for town halls, parties and client events.' },
]

const useCases = [
  'Team days & away days',
  'Company lunches & dinners',
  'Award nights & staff parties',
  'Client entertainment',
  'Product launches & celebrations',
  'Year-end & festive events',
]

const practical = [
  { icon: ChefHat, title: 'Custom Catering', desc: 'Set menus, buffets or sharing menus — built to your headcount, dietary needs and budget.' },
  { icon: Monitor, title: 'AV on Request', desc: 'Screens for presentations, slideshows and live feeds when the event calls for it.' },
  { icon: Wifi, title: 'Wi-Fi & Air Con', desc: 'Reliable connectivity indoors, comfortable spaces whatever the weather.' },
  { icon: Car, title: 'Easy Access & Parking', desc: 'Free on-site parking, 30 minutes from central Pattaya and an easy run from Amata and Hemaraj.' },
]

export default function Corporate() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0d0d0d] z-10" />
        <div
          className="absolute inset-0 bg-cover bg-bottom"
          style={{ backgroundImage: "url('/hero.webp')" }}
        />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Corporate Events</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-2xl">
              Get Out of the Meeting Room
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              A professional venue that doesn’t feel like one. Great food, lakeside views and
              flexible spaces that keep your people engaged &mdash; not checking their phones.
            </p>
            <a
              href="#enquiry"
              className="inline-block px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors"
            >
              Plan Your Event
            </a>
          </div>
        </div>
      </section>

      {/* Spaces */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Flexible Spaces</p>
            <h2 className="text-3xl sm:text-4xl font-bold">One Venue, Four Formats</h2>
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

      {/* Use cases strip */}
      <section className="py-16 px-4 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3">
            {useCases.map(uc => (
              <span key={uc} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm">
                {uc}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Practical details */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">The Practical Bits</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Everything Your Event Needs</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {practical.map(({ icon: Icon, title, desc }) => (
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

      {/* Gallery (admin-managed) */}
      <EventGallery type="corporate" label="Past Events" title="How Companies Use the Lake" />

      {/* Enquiry */}
      <section id="enquiry" className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Tell Us About Your Event</h2>
            <p className="text-gray-500 text-sm">
              Fully custom — headcount, format and budget. We’ll put a proposal together.
            </p>
          </div>
          <EnquiryForm
            type="corporate"
            title="Corporate Enquiry"
            subtitle="We typically respond within one business day"
          />
        </div>
      </section>
    </div>
  )
}
