import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Seo from '../components/Seo'
import EnquiryForm from '../components/EnquiryForm'
import { HOURS_SUMMARY } from '../lib/schema'

export default function Contact() {
  return (
    <div>
      <Seo title="Contact & Opening Hours" description="Contact Hemingways Lakeside, East Pattaya - phone 064-240-0222, info@hemingwayslakeside.com. Open from 8am, closed Tuesdays. Pornprapanimit Road by Lake Mabprachan." />
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-[#f6efe0]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-4">Get In Touch</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-[#1a1512]">Contact Us</h1>
          <p className="text-[#5c5346] text-lg">Questions, bookings, or just want to say hello — we'd love to hear from you.</p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-[#1a1512] font-bold text-xl mb-6">Find Us</h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: 'Address', value: 'Pornprapanimit Road, East Pattaya, Bang Lamung District, Chonburi, Thailand' },
                  { icon: Phone, label: 'Phone', value: '064-240-0222', href: 'tel:0642400222' },
                  { icon: Mail, label: 'Email', value: 'info@hemingwayslakeside.com', href: 'mailto:info@hemingwayslakeside.com' },
                  { icon: Clock, label: 'Hours', value: HOURS_SUMMARY },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-[#8a6d2f]" />
                    </div>
                    <div>
                      <p className="text-[#8a6d2f] text-xs tracking-wider uppercase mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="text-[#1a1512] hover:text-[#8a6d2f] transition-colors">{value}</a>
                      ) : (
                        <p className="text-[#1a1512]">{value}</p>
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
