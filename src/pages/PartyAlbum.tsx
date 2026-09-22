import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, X, ShieldCheck, MessageCircle } from 'lucide-react'
import Seo from '../components/Seo'
import { getPartyBySlug } from '../lib/firestore'
import { formatPartyDate } from '../components/PartyStrip'
import { SITE_URL } from '../lib/schema'
import type { Party } from '../types'

const FB_MESSENGER_URL = 'https://m.me/hemingwayslakeside'

/** One party album: date, title, every photo, lightbox with keyboard nav. */
export default function PartyAlbum() {
  const { slug = '' } = useParams()
  const [party, setParty] = useState<Party | null | undefined>(undefined)
  const [index, setIndex] = useState<number | null>(null)

  useEffect(() => {
    setParty(undefined)
    getPartyBySlug(slug).then(setParty).catch(() => setParty(null))
  }, [slug])

  useEffect(() => {
    if (index === null || !party) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null)
      if (e.key === 'ArrowRight') setIndex(i => (i === null ? null : (i + 1) % party.photos.length))
      if (e.key === 'ArrowLeft') setIndex(i => (i === null ? null : (i - 1 + party.photos.length) % party.photos.length))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, party])

  if (party === undefined) {
    return <div className="pt-32 min-h-screen bg-white flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#c9a84c] border-t-transparent rounded-full animate-spin" /></div>
  }
  if (!party) {
    return (
      <div className="pt-32 min-h-screen bg-white text-center px-4">
        <p className="text-[#5c5346] mb-4">We couldn't find that party.</p>
        <Link to="/parties" className="text-[#8a6d2f] underline">All parties</Link>
      </div>
    )
  }

  const cover = party.photos[party.coverIndex] ?? party.photos[0]
  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: party.title,
    datePublished: party.date,
    url: `${SITE_URL}/parties/${party.slug}`,
    image: party.photos.map(p => p.url),
  }

  return (
    <div>
      <Seo
        title={`${party.title} - ${formatPartyDate(party.date)}`}
        description={party.summary || `Photos from ${party.title} at Hemingways Lakeside, East Pattaya - ${party.photos.length} photos. Pool, playroom, cake and decorations by Lake Mabprachan.`}
        jsonLd={[gallerySchema]}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0d0d0d] z-10" />
        {cover && <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${cover.url}')` }} />}
        <div className="relative z-20 px-4 pb-16 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <Link to="/parties" className="inline-flex items-center gap-1 text-gray-300 hover:text-white text-sm mb-6"><ArrowLeft size={14} /> All parties</Link>
            <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">{formatPartyDate(party.date)} · {party.photos.length} photos</p>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl">{party.title}</h1>
            {party.titleTh && <p className="text-gray-200 text-lg mt-2">{party.titleTh}</p>}
            {party.summary && <p className="text-gray-200 text-lg max-w-2xl mt-4">{party.summary}</p>}
          </div>
        </div>
      </section>

      {/* Photos */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="columns-2 md:columns-3 gap-3 sm:gap-4 [&>button]:mb-3 sm:[&>button]:mb-4">
            {party.photos.map((ph, i) => (
              <button key={ph.storagePath} onClick={() => setIndex(i)} className="block w-full break-inside-avoid rounded-xl overflow-hidden bg-[#f6efe0] border border-black/5 shadow-sm">
                <img src={ph.url} alt={`${party.title} - photo ${i + 1}`} loading={i < 6 ? 'eager' : 'lazy'} width={ph.width} height={ph.height} className="w-full h-auto" />
              </button>
            ))}
          </div>
          <p className="text-center text-[#5c5346] text-xs mt-8 inline-flex w-full justify-center items-center gap-1">
            <ShieldCheck size={14} className="text-[#8a6d2f]" /> Shared with the host's permission · children's faces blurred
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-[#f6efe0] border-t border-black/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#1a1512] mb-4">Book one like this</h2>
          <p className="text-[#5c5346] mb-8">All-in kids' parties from 5,000 THB - pool, playroom, food, cake and decorations, by Lake Mabprachan. Message us with your date.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/events/kids" className="px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors">Party Packages</Link>
            <a href={FB_MESSENGER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#c9a84c]/50 text-[#8a6d2f] font-bold text-sm tracking-widest uppercase rounded hover:bg-[#c9a84c]/10 transition-colors">
              <MessageCircle size={16} /> Message Us
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {index !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={() => setIndex(null)}>
          <button onClick={() => setIndex(null)} className="absolute top-6 right-6 text-white/70 hover:text-white" aria-label="Close"><X size={32} /></button>
          <button onClick={e => { e.stopPropagation(); setIndex((index - 1 + party.photos.length) % party.photos.length) }} className="absolute left-2 sm:left-6 text-white/70 hover:text-white p-2" aria-label="Previous"><ChevronLeft size={36} /></button>
          <img src={party.photos[index].url} alt="" className="max-w-[92vw] max-h-[90vh] object-contain rounded-lg" onClick={e => e.stopPropagation()} />
          <button onClick={e => { e.stopPropagation(); setIndex((index + 1) % party.photos.length) }} className="absolute right-2 sm:right-6 text-white/70 hover:text-white p-2" aria-label="Next"><ChevronRight size={36} /></button>
          <p className="absolute bottom-6 text-white/60 text-sm">{index + 1} / {party.photos.length}</p>
        </div>
      )}
    </div>
  )
}
