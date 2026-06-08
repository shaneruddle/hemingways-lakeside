import { useState, useEffect } from 'react'
import { getSpecials } from '../lib/firestore'
import type { Special } from '../types'

const fallback: Special[] = [
  { id: '1', title: 'Monday Wing Night', description: 'Buy 8 wings get 8 free — all day Monday', day: 'Monday', active: true },
  { id: '2', title: 'Steak Tuesday', description: 'Sirloin steak + fries + sauce for ฿299', day: 'Tuesday', active: true },
  { id: '3', title: 'Burger Wednesday', description: 'Any burger + pint for ฿259', day: 'Wednesday', active: true },
  { id: '4', title: 'Fish Friday', description: 'Traditional fish & chips for ฿199 — all day Friday', day: 'Friday', active: true },
  { id: '5', title: 'Sunday Roast', description: "A proper Sunday roast. Beef, chicken or pork. ฿279. Starts noon — book early as it sells out!", day: 'Sunday', active: true, price: 279 },
  { id: '6', title: 'Happy Hour', description: 'All draught beers at ฿79 per pint', day: 'Daily', active: true },
]

const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Daily']

export default function Specials() {
  const [specials, setSpecials] = useState<Special[]>(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSpecials()
      .then(data => { if (data.length) setSpecials(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long' })
  const sorted = [...specials].sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day))

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

      {/* Specials */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => <div key={i} className="bg-[#141414] rounded-2xl h-28 animate-pulse" />)}
            </div>
          ) : (
            <div className="space-y-4">
              {sorted.map(special => {
                const isToday = special.day === today || special.day === 'Daily'
                return (
                  <div
                    key={special.id}
                    className={`rounded-2xl p-8 border flex flex-col sm:flex-row sm:items-center gap-4 ${
                      isToday
                        ? 'bg-[#c9a84c]/10 border-[#c9a84c]/40'
                        : 'bg-[#141414] border-white/5'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-xs tracking-widest uppercase font-bold ${isToday ? 'text-[#c9a84c]' : 'text-gray-600'}`}>
                          {special.day}
                        </span>
                        {isToday && (
                          <span className="text-xs bg-[#c9a84c] text-black px-2 py-0.5 rounded-full font-bold">Today</span>
                        )}
                      </div>
                      <h3 className="text-white font-bold text-lg">{special.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">{special.description}</p>
                    </div>
                    {special.price && (
                      <div className="text-2xl font-bold text-[#c9a84c]">฿{special.price}</div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
