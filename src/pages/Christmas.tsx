import { PartyPopper, Users, Calendar, MapPin, Phone } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import Seo from '../components/Seo'
import { buildEventSchema } from '../lib/schema'

const MAPS_URL = 'https://maps.google.com/?q=Hemingways+Lakeside+Pattaya'

const points = [
  { icon: Users, title: 'Groups & Families', desc: 'Lakeside tables, indoor dining or the full venue - whatever size your Christmas or New Year group is.' },
  { icon: Calendar, title: 'Book Ahead', desc: "December is our busiest month - the earlier you get in touch, the more choice you'll have on dates and space." },
  { icon: PartyPopper, title: 'A Different Kind Of Christmas', desc: 'Warm weather, a lake view and a swimming pool - a proper alternative to a hotel ballroom.' },
]

export default function Christmas() {
  return (
    <div>
      <Seo
        title="Christmas & New Year"
        description="Christmas Day and New Year's Eve bookings at Hemingways Lakeside, East Pattaya - lakeside and poolside dining, groups and families welcome. Enquire now for December availability."
        jsonLd={[
          buildEventSchema({
            name: "Christmas & New Year at Hemingways Lakeside",
            description: "Christmas Day and New Year's Eve bookings for groups and families, lakeside in East Pattaya.",
            startDate: '2026-12-24',
            endDate: '2027-01-01',
            path: '/christmas',
          }),
        ]}
      />
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-[#0d0d0d] z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-evening.webp')" }}
        />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Christmas & New Year 2026</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-2xl">
              Spend It Lakeside This Year
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              Christmas Day and New Year's Eve bookings are now open. Lakeside tables, poolside
              space for the kids, and a full menu - tell us your group and we'll build your day.
            </p>
            <a
              href="#enquiry"
              className="inline-block px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors"
            >
              Enquire About December
            </a>
          </div>
        </div>
      </section>

      {/* Points */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">Why Book Here</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">A Different Kind Of Festive Season</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            Full Christmas Day and New Year's Eve menus, set times and pricing are confirmed closer
            to December. Send an enquiry now to register interest and we'll be in touch with the
            details as soon as they're set.
          </p>
        </div>
      </section>

      {/* Enquiry */}
      <section id="enquiry" className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2 text-[#1a1512]">Register Your Interest</h2>
            <p className="text-[#5c5346] text-sm">
              Tell us your group size and which day (Christmas Day or New Year's Eve) - we'll come
              back with options as soon as this year's plans are confirmed.
            </p>
          </div>
          <EnquiryForm
            type="event"
            title="Christmas & New Year Enquiry"
            subtitle="Let us know your group and preferred date"
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
