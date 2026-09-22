import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, MessageCircle } from 'lucide-react'
import Seo from '../components/Seo'
import { getParties } from '../lib/firestore'
import { formatPartyDate } from '../components/PartyStrip'
import type { Party } from '../types'

const FB_MESSENGER_URL = 'https://m.me/hemingwayslakeside'
const TYPE_LABEL: Record<Party['type'], string> = { kids: "Kids' party", birthday: 'Birthday', corporate: 'Company party', other: 'Event' }

/** Proof & trust: every published party album, newest first. */
export default function Parties() {
  const [parties, setParties] = useState<Party[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | Party['type']>('all')

  useEffect(() => {
    getParties().then(setParties).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const types = Array.from(new Set(parties.map(p => p.type)))
  const visible = filter === 'all' ? parties : parties.filter(p => p.type === filter)

  return (
    <div>
      <Seo
        title="Real Parties At Hemingways Lakeside - Photos"
        description="Photo albums from real kids' birthday parties, family celebrations and company parties held at Hemingways Lakeside, East Pattaya - pool, playroom, cake and decorations by Lake Mabprachan."
      />

      <section className="pt-32 pb-12 px-4 bg-[#f6efe0]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-4">Proof, Not Promises</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-[#1a1512]">Real Parties, By The Lake</h1>
          <p className="text-[#5c5346] text-lg max-w-2xl mx-auto">
            Every album here is a real party we hosted - pool, playroom, cake, decorations and all. Photos are published
            with the host's permission and children's faces are blurred.
          </p>
          <p className="text-[#5c5346] text-xs mt-4 inline-flex items-center gap-1"><ShieldCheck size={14} className="text-[#8a6d2f]" /> Faces blurred before upload · shared with permission</p>
        </div>
      </section>

      {types.length > 1 && (
        <section className="sticky top-16 md:top-20 z-30 bg-white/95 backdrop-blur border-b border-black/10 py-4 px-4">
          <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide">
            {(['all', ...types] as const).map(t => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${filter === t ? 'bg-[#c9a84c] text-black font-bold' : 'bg-black/5 text-[#5c5346] hover:text-[#1a1512] border border-black/10'}`}
              >
                {t === 'all' ? 'All' : TYPE_LABEL[t]}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => <div key={i} className="bg-[#f6efe0] rounded-2xl aspect-[4/3] animate-pulse" />)}
            </div>
          ) : visible.length === 0 ? (
            <p className="text-center text-[#5c5346] py-16">Albums are on their way - message us and we'll send you photos from recent parties.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visible.map(p => {
                const cover = p.photos[p.coverIndex] ?? p.photos[0]
                return (
                  <Link key={p.id} to={`/parties/${p.slug}`} className="group bg-[#f6efe0] border border-black/5 rounded-2xl overflow-hidden shadow-sm hover:border-[#c9a84c]/50 transition-colors">
                    {cover && (
                      <div className="aspect-[4/3] overflow-hidden bg-white">
                        <img src={cover.url} alt={p.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-[#8a6d2f] text-xs tracking-wider uppercase mb-1">{formatPartyDate(p.date)} · {TYPE_LABEL[p.type]} · {p.photos.length} photos</p>
                      <h2 className="text-[#1a1512] font-bold text-lg">{p.title}</h2>
                      {p.summary && <p className="text-[#5c5346] text-sm mt-1 line-clamp-2">{p.summary}</p>}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-4 bg-[#f6efe0] border-t border-black/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1a1512] mb-4">Want yours here next?</h2>
          <p className="text-[#5c5346] mb-8">All-in kids' parties from 5,000 THB - pool, playroom, food, cake and decorations. Message us with a date and we'll check availability.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events/kids" className="px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors">Party Packages</Link>
            <a href={FB_MESSENGER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#c9a84c]/50 text-[#8a6d2f] font-bold text-sm tracking-widest uppercase rounded hover:bg-[#c9a84c]/10 transition-colors">
              <MessageCircle size={16} /> Message Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
