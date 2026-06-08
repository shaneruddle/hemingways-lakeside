import { Wifi, Monitor, Users, ChefHat } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'

const features = [
  { icon: Users, title: 'Up to 100 Guests', desc: 'Flexible seating for small team lunches or large company events' },
  { icon: Monitor, title: 'AV Available', desc: 'Screens available for presentations, slideshows, or live feeds' },
  { icon: ChefHat, title: 'Custom Catering', desc: 'Set menus, buffets, or à la carte — we work to your brief' },
  { icon: Wifi, title: 'Wi-Fi & Air Con', desc: 'Comfortable, well-equipped venue with reliable connectivity' },
]

export default function Corporate() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#0a0a1a] to-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-4xl mb-4">🤝</div>
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Corporate Hire</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">Corporate Events</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Team lunches, client dinners, company parties, and away days. A relaxed venue with professional service.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-[#141414] border border-white/5 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center mb-4">
                <Icon size={20} className="text-[#c9a84c]" />
              </div>
              <h3 className="text-white font-bold mb-1">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Enquiry */}
      <section className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Get a Corporate Quote</h2>
            <p className="text-gray-500 text-sm">Tell us your requirements and we'll put a package together</p>
          </div>
          <EnquiryForm
            type="corporate"
            title="Corporate Enquiry"
          />
        </div>
      </section>
    </div>
  )
}
