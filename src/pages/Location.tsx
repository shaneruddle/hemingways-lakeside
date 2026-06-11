import { MapPin, Clock, Phone, Navigation } from 'lucide-react'

export default function Location() {
  return (
    <div>
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#0a1a0a] to-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">We're Easy to Find</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">Location</h1>
          <p className="text-gray-400 text-lg">East Pattaya, right by the lake.</p>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Map embed */}
          <div className="rounded-2xl overflow-hidden bg-[#141414] border border-white/5 aspect-video lg:aspect-auto">
            <iframe
              title="Hemingways Lakeside Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.0!2d100.9620102!3d12.9206794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310295ec021ffb59%3A0x4642a2aedb8555ca!2sHemingways%20(Lakeside)%20Restaurant%20%26%20Bar!5e0!3m2!1sen!2sth!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-white font-bold text-2xl mb-6">Getting Here</h2>
            </div>
            {[
              { icon: MapPin, label: 'Address', value: 'Pornprapanimit Road, Pattaya City, Bang Lamung District, Chonburi 20150, Thailand' },
              { icon: Clock, label: 'Opening Hours', value: 'Open Daily: 8:00 AM – 10:00 PM' },
              { icon: Phone, label: 'Phone', value: '064-240-0222', href: 'tel:0642400222' },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="bg-[#141414] border border-white/5 rounded-xl p-6 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-[#c9a84c]" />
                </div>
                <div>
                  <p className="text-gray-600 text-xs tracking-wider uppercase mb-1">{label}</p>
                  {href ? (
                    <a href={href} className="text-white hover:text-[#c9a84c]">{value}</a>
                  ) : (
                    <p className="text-white text-sm leading-relaxed">{value}</p>
                  )}
                </div>
              </div>
            ))}

            <a
              href="https://maps.google.com/?q=Hemingways+Lakeside+Pattaya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded-xl hover:bg-[#b8973d] transition-colors"
            >
              <Navigation size={16} />
              Open in Google Maps
            </a>

            <div className="bg-[#141414] border border-white/5 rounded-xl p-6">
              <h3 className="text-white font-bold mb-3">Parking</h3>
              <p className="text-gray-500 text-sm">Free parking available outside the venue. Easy access from the main road.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
