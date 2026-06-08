import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Menu', to: '/menu' },
  {
    label: 'Events',
    to: '/events',
    children: [
      { label: 'All Events', to: '/events' },
      { label: 'Birthday Parties', to: '/events/birthdays' },
      { label: 'Kids Parties', to: '/events/kids' },
      { label: 'Corporate', to: '/events/corporate' },
    ],
  },
  { label: 'Pool', to: '/pool' },
  { label: 'Sports', to: '/sports' },
  { label: 'Specials', to: '/specials' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [eventsOpen, setEventsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setEventsOpen(false)
  }, [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span className="text-[#c9a84c] font-bold text-lg tracking-widest uppercase">Hemingways</span>
            <span className="text-white text-xs tracking-[0.3em] uppercase">Lakeside</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link =>
              link.children ? (
                <div key={link.label} className="relative group">
                  <button
                    className="flex items-center gap-1 text-sm tracking-wider uppercase text-gray-300 hover:text-[#c9a84c] transition-colors"
                    onMouseEnter={() => setEventsOpen(true)}
                    onMouseLeave={() => setEventsOpen(false)}
                  >
                    {link.label}
                    <ChevronDown size={14} />
                  </button>
                  <div
                    className={`absolute top-full left-0 mt-2 w-48 bg-black/95 border border-white/10 rounded-lg overflow-hidden transition-all duration-200 ${
                      eventsOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                    onMouseEnter={() => setEventsOpen(true)}
                    onMouseLeave={() => setEventsOpen(false)}
                  >
                    {link.children.map(child => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="block px-4 py-3 text-sm text-gray-300 hover:text-[#c9a84c] hover:bg-white/5 transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm tracking-wider uppercase transition-colors ${
                    location.pathname === link.to
                      ? 'text-[#c9a84c]'
                      : 'text-gray-300 hover:text-[#c9a84c]'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-black/98 border-t border-white/10 transition-all duration-300 overflow-hidden ${
          open ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map(link =>
            link.children ? (
              <div key={link.label}>
                <button
                  className="w-full text-left px-3 py-3 text-sm tracking-wider uppercase text-gray-300 flex items-center justify-between"
                  onClick={() => setEventsOpen(!eventsOpen)}
                >
                  {link.label}
                  <ChevronDown size={14} className={`transition-transform ${eventsOpen ? 'rotate-180' : ''}`} />
                </button>
                {eventsOpen && (
                  <div className="pl-4 border-l border-[#c9a84c]/30 ml-3 mb-2">
                    {link.children.map(child => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="block px-3 py-2 text-sm text-gray-400 hover:text-[#c9a84c]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-3 text-sm tracking-wider uppercase transition-colors ${
                  location.pathname === link.to ? 'text-[#c9a84c]' : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
          <Link
            to="/contact"
            className="mt-4 mx-3 py-3 text-center text-sm tracking-wider uppercase bg-[#c9a84c] text-black font-bold rounded"
          >
            Make an Enquiry
          </Link>
        </div>
      </div>
    </nav>
  )
}
