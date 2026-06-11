import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { getGalleryImages } from '../lib/firestore'
import type { GalleryImage } from '../types'

interface Props {
  type: GalleryImage['type']
  label?: string
  title?: string
}

export default function EventGallery({ type, label = 'Gallery', title = 'See It For Yourself' }: Props) {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [lightbox, setLightbox] = useState<string | null>(null)

  useEffect(() => {
    getGalleryImages(type).then(setImages).catch(() => {})
  }, [type])

  if (images.length === 0) return null

  return (
    <section className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">{label}</p>
          <h2 className="text-3xl sm:text-4xl font-bold">{title}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {images.map(img => (
            <button
              key={img.id}
              onClick={() => setLightbox(img.imageUrl)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-[#141414] border border-white/5 cursor-pointer"
            >
              <img
                src={img.imageUrl}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-white/70 hover:text-white"
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <img src={lightbox} alt="" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
        </div>
      )}
    </section>
  )
}
