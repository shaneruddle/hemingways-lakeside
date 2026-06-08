import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <div className="text-[#c9a84c] font-bold text-xl tracking-widest uppercase">Hemingways</div>
              <div className="text-white text-sm tracking-[0.3em] uppercase">Lakeside</div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              East Pattaya's best expat sports bar & restaurant. Live sports, great food, cold beer, and a swimming pool.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-5">Explore</h4>
            <ul className="space-y-3">
              {[
                { label: 'Food Menu', to: '/menu' },
                { label: 'Events', to: '/events' },
                { label: 'Pool Day', to: '/pool' },
                { label: 'Sports Schedule', to: '/sports' },
                { label: 'Daily Specials', to: '/specials' },
                { label: 'Blog', to: '/blog' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-gray-500 text-sm hover:text-[#c9a84c] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-5">Events</h4>
            <ul className="space-y-3">
              {[
                { label: 'Birthday Parties', to: '/events/birthdays' },
                { label: 'Kids Parties', to: '/events/kids' },
                { label: 'Corporate Functions', to: '/events/corporate' },
                { label: 'Pool Parties', to: '/pool' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-gray-500 text-sm hover:text-[#c9a84c] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-5">Find Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#c9a84c] mt-0.5 shrink-0" />
                <span className="text-gray-500 text-sm">Pornprapanimit Road, East Pattaya, Chonburi, Thailand</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-[#c9a84c] shrink-0" />
                <a href="tel:0642400222" className="text-gray-500 text-sm hover:text-[#c9a84c] transition-colors">
                  064-240-0222
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-[#c9a84c] shrink-0" />
                <a href="mailto:info@hemingwayslakeside.com" className="text-gray-500 text-sm hover:text-[#c9a84c] transition-colors">
                  info@hemingwayslakeside.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={15} className="text-[#c9a84c] shrink-0" />
                <span className="text-gray-500 text-sm">Wed–Mon: 8:00 AM – 10:00 PM · Closed Tuesdays</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs tracking-wider">
            © {new Date().getFullYear()} HEMINGWAYS LAKESIDE RESTAURANT & BAR
          </p>
          <Link to="/admin" className="text-gray-700 text-xs hover:text-gray-500 transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
