import { useState, useEffect } from 'react'
import { Tv, Calendar } from 'lucide-react'
import { getSportsFixtures } from '../lib/firestore'
import type { SportsFixture } from '../types'
import { format, parseISO } from 'date-fns'

const fallback: SportsFixture[] = [
  { id: '1', title: 'Premier League', teams: 'Man Utd vs Arsenal', competition: 'Premier League', date: '2026-06-14', time: '17:30', channel: 'True Premier', featured: true },
  { id: '2', title: 'Champions League', teams: 'Real Madrid vs Barcelona', competition: 'UCL Final', date: '2026-06-15', time: '21:00', channel: 'True Sport', featured: true },
  { id: '3', title: 'F1 Grand Prix', teams: 'Canadian GP', competition: 'Formula 1', date: '2026-06-16', time: '20:00', channel: 'True Sport 3', featured: false },
]

export default function Sports() {
  const [fixtures, setFixtures] = useState<SportsFixture[]>(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSportsFixtures()
      .then(data => { if (data.length) setFixtures(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const featured = fixtures.filter(f => f.featured)
  const rest = fixtures.filter(f => !f.featured)

  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-[#0a1a0a] to-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Live Sports</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">Sports Schedule</h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            15 crystal-clear screens. Every major sport from around the world. Premier League, Champions League, F1, Boxing, UFC — we show it all.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-[#0a0a0a] border-y border-white/5">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[['15', 'Screens'], ['HD', 'Picture Quality'], ['All Sports', 'Shown Live']].map(([val, label]) => (
            <div key={label}>
              <div className="text-2xl sm:text-3xl font-bold text-[#c9a84c]">{val}</div>
              <div className="text-gray-500 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured fixtures */}
      {featured.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#c9a84c] animate-pulse" />
              <h2 className="text-lg font-bold tracking-wider uppercase">Featured This Week</h2>
            </div>
            <div className="space-y-4">
              {featured.map(f => (
                <div key={f.id} className="bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <span className="text-xs text-[#c9a84c] tracking-wider uppercase">{f.competition}</span>
                    <h3 className="text-white font-bold text-lg mt-1">{f.teams}</h3>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-[#c9a84c]" />
                      {format(parseISO(f.date), 'EEE d MMM')}
                    </div>
                    <div className="flex items-center gap-2">
                      <Tv size={14} className="text-[#c9a84c]" />
                      {f.time}
                    </div>
                    {f.channel && <span className="text-gray-600">{f.channel}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All fixtures */}
      {rest.length > 0 && (
        <section className="py-10 px-4 pb-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-lg font-bold tracking-wider uppercase mb-6 text-gray-400">All Fixtures</h2>
            <div className="space-y-3">
              {rest.map(f => (
                <div key={f.id} className="bg-[#141414] border border-white/5 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <span className="text-xs text-gray-600 tracking-wider uppercase">{f.competition}</span>
                    <h3 className="text-white font-semibold mt-0.5">{f.teams}</h3>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span>{format(parseISO(f.date), 'EEE d MMM')}</span>
                    <span>{f.time}</span>
                    {f.channel && <span className="text-gray-700">{f.channel}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {loading && (
        <div className="py-20 text-center text-gray-600">Loading schedule...</div>
      )}
    </div>
  )
}
