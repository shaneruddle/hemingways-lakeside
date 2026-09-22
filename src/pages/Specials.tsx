import { useState, useEffect } from 'react'
import Seo from '../components/Seo'
import { getSpecials } from '../lib/firestore'
import type { Special } from '../types'

export default function Specials() {
  const [specials, setSpecials] = useState<Special[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSpecials()
      .then(data => setSpecials(data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const active = specials
    .filter(s => s.active)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))

  return (
    <div>
      <Seo title="Daily Specials - Pizza Day, Sunday Roast, Thursday Special" description="Weekly deals at Hemingways Lakeside: Saturday pizza day any pizza 250 THB, Sunday roast carvery from 279 THB, Thursday chicken parma 249 and fajitas 279." />
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-[#f6efe0]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-4">Great Value</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-[#1a1512]">Daily Specials</h1>
          <p className="text-[#5c5346] text-lg max-w-xl mx-auto">
            Something on every day of the week. Come for the deal, stay for the atmosphere.
          </p>
        </div>
      </section>

      {/* Specials grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#f6efe0] rounded-2xl aspect-[210/297] animate-pulse" />
              ))}
            </div>
          ) : active.length === 0 ? (
            <p className="text-center text-[#5c5346] py-20">No specials at the moment. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {active.map(special => (
                <div
                  key={special.id}
                  className="group relative rounded-2xl overflow-hidden border border-black/10 bg-[#f6efe0] shadow-sm"
                >
                  {special.imageUrl ? (
                    <div className="aspect-[210/297] overflow-hidden">
                      <img
                        src={special.imageUrl}
                        alt={special.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[210/297] bg-black/5 flex items-center justify-center">
                      <span className="text-[#5c5346] text-sm">No image</span>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-[#1a1512] font-bold text-lg tracking-wide">{special.title}</h3>
                    {!special.imageUrl && special.description && (
                      <p className="text-[#5c5346] text-sm mt-1">{special.description}</p>
                    )}
                    {!special.imageUrl && special.day && (
                      <span className="inline-block mt-3 text-xs text-[#8a6d2f] bg-[#c9a84c]/15 px-2 py-0.5 rounded-full">
                        {special.day}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
