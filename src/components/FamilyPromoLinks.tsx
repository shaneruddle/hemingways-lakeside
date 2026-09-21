import { Link } from 'react-router-dom'
import { IceCreamCone, Ghost } from 'lucide-react'

/** Internal links to the Birthday Club sign-up and the Halloween event (remove the Halloween card after 31 Oct 2026). */
const promos = [
  {
    icon: IceCreamCone,
    to: '/birthday-club',
    title: 'Join the Birthday Club',
    desc: 'A free dessert or ice cream for your child in their birthday month. Takes 30 seconds.',
    cta: 'Sign Up Free',
  },
  {
    icon: Ghost,
    to: '/events/halloween',
    title: 'Halloween Kids Pool Party',
    desc: 'Saturday 31 October 2026. Costumes on, swimmers packed. Register your family’s interest.',
    cta: 'Save Your Spot',
  },
]

export default function FamilyPromoLinks() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {promos.map(({ icon: Icon, to, title, desc, cta }) => (
          <Link
            key={to}
            to={to}
            className="bg-[#f6efe0] border border-black/5 rounded-2xl p-8 shadow-sm hover:border-[#c9a84c]/40 transition-colors block"
          >
            <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center mb-4">
              <Icon size={20} className="text-[#8a6d2f]" />
            </div>
            <h3 className="text-[#1a1512] font-bold text-lg mb-1">{title}</h3>
            <p className="text-[#5c5346] text-sm mb-4">{desc}</p>
            <span className="text-[#8a6d2f] font-bold text-sm tracking-widest uppercase">{cta} &rarr;</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
