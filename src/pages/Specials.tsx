import { useState, useEffect } from 'react'
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
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#1a1a00] to-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Great Value</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">Daily Specials</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Something on every day of the week. Come for the deal, stay for the atmosphere.
          </p>
        </div>
      </section>

      {/* Specials grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#141414] rounded-2xl aspect-[4/3] animate-pulse" />
              ))}
            </div>
          ) : active.length === 0 ? (
            <p className="text-center text-gray-600 py-20">No specials at the moment. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {active.map(special => (
                <div
                  key={special.id}
                  className="group relative rounded-2xl overflow-hidden border border-white/5 bg-[#141414]"
                >
                  {special.imageUrl ? (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={special.imageUrl}
                        alt={special.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-white/3 flex items-center justify-center">
                      <span className="text-gray-700 text-sm">No image</span>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-white font-bold text-lg tracking-wide">{special.title}</h3>
                    {special.description && (
                      <p className="text-gray-500 text-sm mt-1">{special.description}</p>
                    )}
                    {special.day && (
                      <span className="inline-block mt-3 text-xs text-[#c9a84c] bg-[#c9a84c]/10 px-2 py-0.5 rounded-full">
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
