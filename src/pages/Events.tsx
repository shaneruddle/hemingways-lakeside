import { Link } from 'react-router-dom'
import { Cake, PartyPopper, Briefcase, Waves, ArrowRight } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'

const eventTypes = [
  {
    icon: Cake,
    title: 'Birthday Parties',
    desc: 'Make your birthday unforgettable. Private area, custom menu, decorations — we handle everything.',
    href: '/events/birthdays',
    cta: 'Birthday Packages',
  },
  {
    icon: PartyPopper,
    title: 'Kids Parties',
    desc: 'Pool parties, party food, entertainment. Kids love it and parents relax. The perfect combo.',
    href: '/events/kids',
    cta: 'Kids Party Info',
  },
  {
    icon: Briefcase,
    title: 'Corporate Events',
    desc: 'Team lunches, client dinners, company celebrations. Private space, AV available, great catering.',
    href: '/events/corporate',
    cta: 'Corporate Info',
  },
  {
    icon: Waves,
    title: 'Pool Events',
    desc: 'Host your event poolside. Perfect for summer parties, swim galas, and group days out.',
    href: '/pool',
    cta: 'Pool Packages',
  },
]

const howItWorks = [
  { step: '01', title: 'Get in Touch', desc: 'Fill in the form below or call us. Tell us what you have in mind.' },
  { step: '02', title: 'We Plan It', desc: "We'll put together a package that fits your group, budget, and date." },
  { step: '03', title: 'You Enjoy It', desc: 'Show up on the day and let us handle everything else.' },
]

export default function Events() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#1a0a00] to-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Private Hire</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">Events & Parties</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            From intimate birthday dinners to full pool parties for 100+ guests — Hemingways Lakeside is the venue.
          </p>
        </div>
      </section>

      {/* Event types */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventTypes.map(({ icon: Icon, title, desc, href, cta }) => (
            <div key={title} className="bg-[#141414] border border-white/5 rounded-2xl p-10 hover:border-[#c9a84c]/20 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-6 group-hover:bg-[#c9a84c]/20 transition-colors">
                <Icon size={22} className="text-[#c9a84c]" />
              </div>
              <h3 className="text-xl font-bold mb-3">{title}</h3>
              <p className="text-gray-500 leading-relaxed mb-6">{desc}</p>
              <Link
                to={href}
                className="inline-flex items-center gap-2 text-[#c9a84c] text-sm tracking-wider uppercase hover:gap-3 transition-all"
              >
                {cta} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Simple Process</p>
            <h2 className="text-3xl font-bold">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="text-4xl font-bold text-[#c9a84c]/20 mb-3">{step}</div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Start Planning Your Event</h2>
            <p className="text-gray-500 text-sm">Tell us the basics and we'll get back to you within a few hours</p>
          </div>
          <EnquiryForm
            type="event"
            title="Event Enquiry"
            subtitle="We'll put together a package just for you"
          />
        </div>
      </section>
    </div>
  )
}
