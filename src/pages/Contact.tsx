import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import EnquiryForm from '../components/EnquiryForm'

export default function Contact() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#0d0d1a] to-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Get In Touch</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-400 text-lg">Questions, bookings, or just want to say hello — we'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-white font-bold text-xl mb-6">Find Us</h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: 'Address', value: 'Pornprapanimit Road, East Pattaya, Bang Lamung District, Chonburi, Thailand' },
                  { icon: Phone, label: 'Phone', value: '064-240-0222', href: 'tel:0642400222' },
                  { icon: Mail, label: 'Email', value: 'info@hemingwayslakeside.com', href: 'mailto:info@hemingwayslakeside.com' },
                  { icon: Clock, label: 'Hours', value: 'Wed–Mon: 8:00 AM – 10:00 PM · Closed Tuesdays' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-[#c9a84c]" />
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs tracking-wider uppercase mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="text-white hover:text-[#c9a84c] transition-colors">{value}</a>
                      ) : (
                        <p className="text-white">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <EnquiryForm
              type="general"
              title="Send a Message"
              subtitle="We usually respond within a few hours"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
