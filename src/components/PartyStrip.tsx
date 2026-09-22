import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getParties } from '../lib/firestore'
import type { Party } from '../types'

export function formatPartyDate(iso: string, lang: 'en' | 'th' = 'en') {
  const d = new Date(`${iso}T12:00:00`)
  return d.toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

/** "Recent parties" strip for the party pages — real, face-blurred albums from /parties. */
export default function PartyStrip({
  type,
  limit = 3,
  lang = 'en',
  label,
  title,
}: {
  type?: Party['type']
  limit?: number
  lang?: 'en' | 'th'
  label?: string
  title?: string
}) {
  const [parties, setParties] = useState<Party[]>([])

  useEffect(() => {
    getParties()
      .then(all => setParties((type ? all.filter(p => p.type === type) : all).slice(0, limit)))
      .catch(() => {})
  }, [type, limit])

  if (parties.length === 0) return null

  const th = lang === 'th'
  return (
    <section className="py-24 px-4 bg-white border-y border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">{label ?? (th ? 'งานจริง ลูกค้าจริง' : 'Real Parties')}</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">{title ?? (th ? 'งานที่เราจัดไปล่าสุด' : 'Recent Parties At The Lake')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {parties.map(p => {
            const cover = p.photos[p.coverIndex] ?? p.photos[0]
            return (
              <Link key={p.id} to={`/parties/${p.slug}`} className="group bg-[#f6efe0] border border-black/5 rounded-2xl overflow-hidden shadow-sm hover:border-[#c9a84c]/50 transition-colors">
                {cover && (
                  <div className="aspect-[4/3] overflow-hidden bg-white">
                    <img src={cover.url} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-[#8a6d2f] text-xs tracking-wider uppercase mb-1">{formatPartyDate(p.date, lang)} · {p.photos.length} {th ? 'รูป' : 'photos'}</p>
                  <h3 className="text-[#1a1512] font-bold">{th && p.titleTh ? p.titleTh : p.title}</h3>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="text-center mt-10">
          <Link to="/parties" className="inline-block px-8 py-4 border border-[#c9a84c]/50 text-[#8a6d2f] font-bold text-sm tracking-widest uppercase rounded hover:bg-[#c9a84c]/10 transition-colors">
            {th ? 'ดูงานทั้งหมด' : 'See All Parties'}
          </Link>
        </div>
      </div>
    </section>
  )
}
