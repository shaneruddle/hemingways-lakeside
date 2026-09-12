import { Music2, Camera, Wine, Sparkles } from 'lucide-react'

/**
 * Optional event add-ons — confirmed by Shane (Sept 2026): DJ/sound, photographer,
 * private bar and extra decorations are all available on request across corporate,
 * birthday and kids party bookings. No fixed pricing given, so kept as "on request"
 * rather than inventing figures.
 */
const addOns = [
  { icon: Music2, title: 'DJ & Sound System', desc: 'Bring the party up a notch with music and sound handled for you.' },
  { icon: Camera, title: 'Professional Photographer', desc: 'Capture the night without anyone stuck behind a camera.' },
  { icon: Wine, title: 'Private Bar Service', desc: 'A dedicated bar and bartender just for your group.' },
  { icon: Sparkles, title: 'Extra Decorations', desc: 'Take the theming and styling further than the standard setup.' },
]

export default function EventAddOns({ heading = 'Make It Bigger' }: { heading?: string }) {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">Optional Extras</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">{heading}</h2>
          <p className="text-[#5c5346] text-sm mt-3 max-w-xl mx-auto">
            All available on request — just mention it when you enquire and we'll build it into your quote.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {addOns.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-[#f6efe0] border border-black/5 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center mb-4">
                <Icon size={20} className="text-[#8a6d2f]" />
              </div>
              <h3 className="text-[#1a1512] font-bold mb-1">{title}</h3>
              <p className="text-[#5c5346] text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
