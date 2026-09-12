import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  time: string
  text: string
  photos?: string[]
}

/**
 * Real Google review quotes specifically about parties/events at Hemingways Lakeside —
 * sourced directly from the venue's Google Business Profile reviews (pulled Sept 2026).
 * Distinct from the generic homepage testimonials, which aren't event-specific.
 */
export default function EventTestimonials({ heading, items }: { heading: string; items: Testimonial[] }) {
  if (!items.length) return null

  return (
    <section className="py-24 px-4 bg-[#f6efe0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">Real Reviews</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">{heading}</h2>
        </div>
        <div className={`grid grid-cols-1 ${items.length > 1 ? 'sm:grid-cols-2' : ''} gap-6 max-w-4xl mx-auto`}>
          {items.map(t => (
            <div key={t.name} className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-[#c9a84c] fill-[#c9a84c]" />
                ))}
              </div>
              <p className="text-[#3d372e] text-sm leading-relaxed mb-6">"{t.text}"</p>
              {t.photos && t.photos.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {t.photos.map(src => (
                    <img
                      key={src}
                      src={src}
                      alt={`Photo from a real event at Hemingways Lakeside, shared by ${t.name}`}
                      loading="lazy"
                      className="w-full aspect-square object-cover rounded-lg border border-black/10"
                    />
                  ))}
                </div>
              )}
              <div>
                <p className="text-[#1a1512] font-semibold text-sm">{t.name}</p>
                <p className="text-[#8a6d2f] text-xs">{t.time} · Google Review</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
