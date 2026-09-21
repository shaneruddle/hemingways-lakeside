import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Waves, Gamepad2, UtensilsCrossed, Cake, Check, ArrowRight, MapPin, Phone } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import EventGallery from '../components/EventGallery'
import Seo from '../components/Seo'
import FaqMini from '../components/FaqMini'
import { buildFaqSchema, SITE_FAQS, HOURS_SUMMARY } from '../lib/schema'
import FamilyPromoLinks from '../components/FamilyPromoLinks'

const MAPS_URL = 'https://maps.google.com/?q=Hemingways+Lakeside+Pattaya'

const familyFaqs = SITE_FAQS.filter(f => f.categories.includes('kids'))

const pillars = [
  {
    icon: Waves,
    title: 'Free Swimming Pool',
    desc: 'No tickets, no time limits - the whole family swims free with any table or bar order.',
    href: '/pool',
    cta: 'Pool Details',
  },
  {
    icon: Gamepad2,
    title: "Kids' Playroom",
    desc: 'An indoor playroom for downtime between swims - a lifesaver if the weather turns or nap time hits.',
    href: '/pool',
    cta: "What's On-Site",
  },
  {
    icon: UtensilsCrossed,
    title: "Kids' Menu",
    desc: "A full kids' menu alongside the main one, so everyone eats well without a fuss.",
    href: '/menu',
    cta: 'View The Menu',
  },
  {
    icon: Cake,
    title: 'Birthday Parties',
    desc: 'Pool, playroom, party area, cake and decorations - we handle the whole party for you.',
    href: '/events/kids',
    cta: 'Party Packages',
  },
]

const dayOutPoints = [
  'No entrance fee - the pool is free for anyone eating or drinking with us',
  'Shallow areas where younger kids can splash more safely (parents still supervise - no lifeguard on duty)',
  'Indoor playroom to keep kids busy beyond the pool',
  "Full kids' menu alongside the regular menu",
  'Free on-site parking right by the entrance',
  'Birthday parties planned start to finish, for groups of any size',
]

export default function FamilyKids() {
  // hreflang pair with the Thai landing page (/th/family-pool-mabprachan).
  useEffect(() => {
    const links = [
      { hreflang: 'en', href: 'https://hemingwayslakeside.com/family-kids' },
      { hreflang: 'th', href: 'https://hemingwayslakeside.com/th/family-pool-mabprachan' },
      { hreflang: 'x-default', href: 'https://hemingwayslakeside.com/family-kids' },
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
        title="Family & Kids"
        description="A family day out at Hemingways Lakeside - free swimming pool, kids' playroom, full kids' menu and birthday parties, all on Lake Mabprachan in East Pattaya."
        jsonLd={[buildFaqSchema(familyFaqs)]}
      />
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0d0d0d] z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/pool.webp')" }}
        />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Family & Kids</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-2xl">
              A Family Day Out On The Lake
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              Free pool, an indoor playroom, a proper kids&rsquo; menu, and birthday parties we plan
              for you &mdash; everything a family needs for a full day out, in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/events/kids"
                className="px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors text-center"
              >
                Plan A Birthday Party
              </Link>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-white/30 text-white font-bold text-sm tracking-widest uppercase rounded hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors text-center"
              >
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Birthday Club + Halloween internal links */}
      <FamilyPromoLinks />

      {/* Free with dining banner */}
      <section className="py-12 px-4 bg-[#c9a84c]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h2 className="text-black font-bold text-2xl sm:text-3xl">Free pool. Free parking. No fuss.</h2>
            <p className="text-black/70 text-base sm:text-lg">
              Eat or drink with us and the whole family swims at no charge.
            </p>
          </div>
          <div className="flex items-center gap-6 text-black/80 text-sm font-bold tracking-wider uppercase shrink-0">
            {HOURS_SUMMARY}
          </div>
        </div>
      </section>

      {/* Four pillars */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">Everything Families Need</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">Built For A Family Day Out</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map(({ icon: Icon, title, desc, href, cta }) => (
              <div key={title} className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm hover:border-[#c9a84c]/40 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center mb-6 group-hover:bg-[#c9a84c]/25 transition-colors">
                  <Icon size={22} className="text-[#8a6d2f]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1a1512]">{title}</h3>
                <p className="text-[#5c5346] leading-relaxed mb-6">{desc}</p>
                <Link
                  to={href}
                  className="inline-flex items-center gap-2 text-[#8a6d2f] text-sm tracking-wider uppercase hover:gap-3 transition-all"
                >
                  {cta} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Day out points */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-4xl mx-auto bg-white border border-black/5 rounded-3xl p-10 sm:p-14 shadow-sm">
          <div className="text-center mb-10">
            <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">Good To Know</p>
            <h2 className="text-3xl font-bold text-[#1a1512]">What A Family Day Here Looks Like</h2>
          </div>
          <ul className="space-y-4 max-w-xl mx-auto">
            {dayOutPoints.map(point => (
              <li key={point} className="flex items-start gap-3 text-[#3d372e]">
                <Check size={18} className="text-[#8a6d2f] mt-1 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery (admin-managed) */}
      <EventGallery type="kids" label="Real Families" title="A Day The Kids Will Ask To Repeat" />

      {/* FAQ (also feeds FAQPage schema above) */}
      <FaqMini heading="Family Day Questions" items={familyFaqs} />

      {/* Worth the trip / directions */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto bg-[#f6efe0] border border-black/5 rounded-3xl p-10 sm:p-14 text-center">
          <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">Worth The Drive</p>
          <h2 className="text-3xl font-bold mb-4 text-[#1a1512]">30 Minutes From Central Pattaya</h2>
          <p className="text-[#5c5346] max-w-lg mx-auto mb-8">
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
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#8a6d2f]/40 text-[#8a6d2f] font-bold text-sm tracking-widest uppercase rounded hover:bg-[#c9a84c]/10 transition-colors"
            >
              <Phone size={16} /> 064-240-0222
            </a>
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2 text-[#1a1512]">Planning A Family Visit?</h2>
            <p className="text-[#5c5346] text-sm">Walk-ins always welcome &mdash; let us know ahead for bigger groups or a birthday</p>
          </div>
          <EnquiryForm
            type="general"
            title="Family Visit Enquiry"
            subtitle="Tell us your dates and group size"
          />
        </div>
      </section>
    </div>
  )
}
