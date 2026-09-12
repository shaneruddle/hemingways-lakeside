import { Waves, Gamepad2, PartyPopper, Cake, Sparkles, Music, Users, Check } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'
import EventGallery from '../components/EventGallery'
import FoodPackages from '../components/FoodPackages'
import EventTestimonials from '../components/EventTestimonials'
import Seo from '../components/Seo'
import FaqMini from '../components/FaqMini'
import { buildFaqSchema, SITE_FAQS } from '../lib/schema'

const kidsFaqs = SITE_FAQS.filter(f => f.categories.includes('kids'))

const included = [
  { icon: Waves, title: 'Pool Access', desc: 'The pool is the party — safe shallow areas, floats and beach balls, with staff keeping an eye out.' },
  { icon: Gamepad2, title: 'Kids’ Playroom', desc: 'An indoor playroom for downtime between swims — and a lifesaver if the weather turns.' },
  { icon: PartyPopper, title: 'Party Area', desc: 'A dedicated party space for your group — cake table, presents corner, room to run around.' },
  { icon: Cake, title: 'Custom Menu & Cake', desc: 'Kids’ favourites done properly, plus a birthday cake made to your theme.' },
  { icon: Sparkles, title: 'Decorations', desc: 'Balloons, banners and theming set up before you arrive. Walk in, it’s done.' },
  { icon: Music, title: 'Entertainment', desc: 'Games and activities to keep the whole group busy from start to finish.' },
]

const parentPoints = [
  'You turn up with the cake candles — we handle everything else',
  'Sit down, order a coffee or a cold drink, and actually enjoy the party',
  'Changing rooms and showers for the post-swim cleanup',
  'Free parking and space for 100+ guests if the whole class is coming',
]

export default function KidsParties() {
  return (
    <div>
      <Seo
        title="Kids Birthday Parties"
        description="Kids' pool birthday parties at Hemingways Lakeside — pool access, playroom, party area, custom menu and cake, decorations and entertainment all handled for you. Food packages from 250 THB/person."
        jsonLd={[buildFaqSchema(kidsFaqs)]}
      />
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0d0d0d] z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/kids-hero.webp')" }}
        />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Kids Birthday Parties</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-2xl">
              The Party They’ll Talk About All Year
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              Pool, playroom, food, cake, decorations and entertainment &mdash; all sorted,
              all in one lakeside venue. You enjoy the party. We do the work.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#enquiry"
                className="inline-block px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors"
              >
                Plan Their Party
              </a>
              <a
                href="#packages"
                className="text-gray-300 text-sm hover:text-[#c9a84c] transition-colors"
              >
                Packages from <span className="text-[#c9a84c] font-bold">250 THB/person</span> &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Everything included */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">All In One Place</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">Everything’s Handled</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {included.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm">
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

      {/* For the parents */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-4xl mx-auto bg-white border border-black/5 rounded-3xl p-10 sm:p-14 shadow-sm">
          <div className="text-center mb-10">
            <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">For The Parents</p>
            <h2 className="text-3xl font-bold text-[#1a1512]">Stress-Free Means You Too</h2>
          </div>
          <ul className="space-y-4 max-w-xl mx-auto">
            {parentPoints.map(point => (
              <li key={point} className="flex items-start gap-3 text-[#3d372e]">
                <Check size={18} className="text-[#8a6d2f] mt-1 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex items-center justify-center gap-3 text-[#5c5346] text-sm">
            <Users size={16} className="text-[#8a6d2f]" />
            Lakeside setting, capacity for 100+ guests
          </div>
        </div>
      </section>

      {/* Gallery (admin-managed) */}
      <EventGallery type="kids" label="Past Parties" title="Real Parties, Real Smiles" />

      {/* Real package pricing — from Shane's Sept 2026 Birthday & Event Food Packages poster */}
      <FoodPackages heading="Party Food Packages" />

      {/* Real Google reviews mentioning birthday parties (pulled Sept 2026) */}
      <EventTestimonials
        heading="What Guests Say About Their Parties"
        items={[
          {
            name: 'Mike S.',
            time: '9 months ago',
            text: "We celebrated a birthday at Hemingways, highly recommended. We viewed a few other restaurants but after seeing Hemingways we knew it was the place for us. Fred the manager and the rest of the staff were so easy to deal with, the price was right, the food was great, and everything went smoothly.",
          },
          {
            name: 'Marcella C.',
            time: '1 year ago',
            text: 'We organized a birthday party brunch for about 20 people. They were very organized and accommodating.',
          },
        ]}
      />

      {/* FAQ (also feeds FAQPage schema above) */}
      <FaqMini heading="Kids Party Questions" items={kidsFaqs} />

      {/* Enquiry */}
      <section id="enquiry" className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold mb-2">Let’s Plan Their Day</h2>
            <p className="text-gray-400 text-sm">
              Every party is custom &mdash; tell us the age, the date and the headcount, and we’ll build it around your child.
            </p>
          </div>
          <EnquiryForm
            type="kids_party"
            title="Kids Party Enquiry"
            subtitle="We’ll come back to you with ideas and a custom package — usually within one business day"
          />
        </div>
      </section>
    </div>
  )
}
