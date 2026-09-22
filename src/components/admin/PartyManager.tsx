import { useState, useEffect, useRef } from 'react'
import { ref, uploadBytes, getDownloadURL, deleteObject, getBlob } from 'firebase/storage'
import { storage } from '../../lib/firebase'
import { getParties, saveParty, updateParty, deleteParty } from '../../lib/firestore'
import { preparePhoto, prepareFromOriginal, renderBlurred, canvasToJpeg, slugify, type PreparedPhoto } from '../../lib/faceBlur'
import type { Party, PartyPhoto } from '../../types'
import { toast } from 'sonner'
import { Plus, Trash2, Upload, Eye, EyeOff, X, Star, ArrowLeft, ArrowRight, ShieldCheck, Loader2, Pencil, ExternalLink } from 'lucide-react'

const TYPES: { key: Party['type']; label: string }[] = [
  { key: 'kids', label: 'Kids party' },
  { key: 'birthday', label: 'Adult birthday' },
  { key: 'corporate', label: 'Company / group' },
  { key: 'other', label: 'Other' },
]

const inputClass = 'w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]'

/**
 * Party albums → /parties. Photos are face-blurred IN THE BROWSER before upload
 * (see lib/faceBlur.ts). Every face is blurred by default; click a face in the
 * preview to un-blur it (adults, birthday child with parents' OK).
 */
export default function PartyManager() {
  const [parties, setParties] = useState<Party[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Party | null>(null)
  const [creating, setCreating] = useState(false)

  const load = async () => {
    setLoading(true)
    try { setParties(await getParties(false)) } finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  if (creating || editing) {
    return (
      <PartyEditor
        party={editing}
        onClose={() => { setCreating(false); setEditing(null); load() }}
      />
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-white font-bold text-lg">Party albums</h2>
          <p className="text-gray-500 text-sm">Published albums appear at /parties. Faces are blurred before upload.</p>
        </div>
        <div className="flex items-center gap-2">
          <a href="/parties" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-white/15 text-gray-300 hover:text-white hover:border-[#c9a84c]/50 text-sm rounded-lg">
            <ExternalLink size={14} /> View page
          </a>
          <button onClick={() => setCreating(true)} className="inline-flex items-center gap-2 px-4 py-2 bg-[#c9a84c] text-black font-bold text-sm rounded-lg">
            <Plus size={16} /> New party
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-600 py-16">Loading…</div>
      ) : parties.length === 0 ? (
        <div className="text-center text-gray-600 py-16">No parties yet — add the first one.</div>
      ) : (
        <div className="space-y-3">
          {parties.map(p => {
            const cover = p.photos[p.coverIndex] ?? p.photos[0]
            return (
              <div key={p.id} className="bg-[#141414] border border-white/5 hover:border-[#c9a84c]/40 rounded-2xl p-4 flex gap-4 items-center transition-colors">
              <button onClick={() => setEditing(p)} className="flex-1 min-w-0 text-left flex gap-4 items-center">
                <div className="w-20 h-20 rounded-xl bg-black overflow-hidden shrink-0">
                  {cover && <img src={cover.url} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold truncate">{p.title}</div>
                  <div className="text-gray-500 text-sm">{p.date} · {TYPES.find(t => t.key === p.type)?.label} · {p.photos.length} photos</div>
                </div>
              </button>
                <div className="flex items-center gap-2 shrink-0 text-xs">
                  {p.hostConsent && <span className="inline-flex items-center gap-1 text-green-400"><ShieldCheck size={14} /> consent</span>}
                  <span className={`px-2 py-1 rounded ${p.published ? 'bg-green-500/15 text-green-400' : 'bg-white/5 text-gray-500'}`}>{p.published ? 'Published' : 'Draft'}</span>
                  {p.published && (
                    <a href={`/parties/${p.slug}`} target="_blank" rel="noopener noreferrer" title="View on site" className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5">
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ── Editor ────────────────────────────────────────────────────────────────────

interface PendingPhoto {
  id: string
  prepared: PreparedPhoto
  previewUrl: string
  /** Set when re-editing an already-uploaded photo: index into `photos`. */
  editIndex?: number
}

function PartyEditor({ party, onClose }: { party: Party | null; onClose: () => void }) {
  const [id, setId] = useState<string | null>(party?.id ?? null)
  const [title, setTitle] = useState(party?.title ?? '')
  const [titleTh, setTitleTh] = useState(party?.titleTh ?? '')
  const [date, setDate] = useState(party?.date ?? new Date().toISOString().slice(0, 10))
  const [type, setType] = useState<Party['type']>(party?.type ?? 'kids')
  const [summary, setSummary] = useState(party?.summary ?? '')
  const [hostConsent, setHostConsent] = useState(party?.hostConsent ?? false)
  const [published, setPublished] = useState(party?.published ?? false)
  const [photos, setPhotos] = useState<PartyPhoto[]>(party?.photos ?? [])
  const [coverIndex, setCoverIndex] = useState(party?.coverIndex ?? 0)

  const [pending, setPending] = useState<PendingPhoto[]>([])
  const [detecting, setDetecting] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [inspect, setInspect] = useState<PendingPhoto | null>(null)
  const [editSaving, setEditSaving] = useState(false)
  const [editLoading, setEditLoading] = useState<number | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  const slug = party?.slug ?? `${date}-${slugify(title) || 'party'}`

  const buildDoc = (): Omit<Party, 'id'> => ({
    slug,
    title: title.trim(),
    ...(titleTh.trim() ? { titleTh: titleTh.trim() } : {}),
    date,
    type,
    ...(summary.trim() ? { summary: summary.trim() } : {}),
    photos,
    coverIndex: Math.min(coverIndex, Math.max(0, photos.length - 1)),
    hostConsent,
    published,
    createdAt: party?.createdAt ?? new Date().toISOString(),
  })

  /** Ensure a Firestore doc exists so uploads have a stable folder. */
  const ensureSaved = async (): Promise<string> => {
    if (id) return id
    if (!title.trim()) throw new Error('Give the party a title first')
    const refDoc = await saveParty({ ...buildDoc(), published: false })
    setId(refDoc.id)
    return refDoc.id
  }

  const handleSave = async () => {
    if (!title.trim()) { toast.error('Title is required'); return }
    if (published && !hostConsent) { toast.error('Tick "host agreed to photos" before publishing'); return }
    if (published && photos.length === 0) { toast.error('Add at least one photo before publishing'); return }
    setSaving(true)
    try {
      const docId = await ensureSaved()
      await updateParty(docId, buildDoc())
      toast.success(published ? 'Party published' : 'Party saved as draft')
      onClose()
    } catch (e: any) {
      toast.error(e?.message || 'Save failed')
    } finally { setSaving(false) }
  }

  const handleDelete = async () => {
    if (!id) { onClose(); return }
    if (!confirm('Delete this party and all its photos? This cannot be undone.')) return
    try {
      await Promise.all(photos.flatMap(p => [
        deleteObject(ref(storage, p.storagePath)).catch(() => {}),
        ...(p.originalPath ? [deleteObject(ref(storage, p.originalPath)).catch(() => {})] : []),
      ]))
      await deleteParty(id)
      toast.success('Party deleted')
      onClose()
    } catch (e: any) { toast.error(e?.message || 'Delete failed') }
  }

  // Step 1: pick files → detect faces → show previews (nothing uploaded yet)
  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (fileRef.current) fileRef.current.value = ''
    if (!files.length) return
    setDetecting(files.length)
    const next: PendingPhoto[] = []
    for (const file of files) {
      try {
        const prepared = await preparePhoto(file)
        const previewUrl = renderBlurred(prepared).toDataURL('image/jpeg', 0.7)
        next.push({ id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, prepared, previewUrl })
      } catch (err: any) {
        console.error('Face detection failed for', file.name, err)
        toast.error(`Could not process ${file.name}: ${err?.message || err}`)
      } finally {
        setDetecting(n => n - 1)
      }
      setPending(prev => [...prev, ...next.splice(0)])
    }
  }

  const rerender = (p: PendingPhoto): PendingPhoto => ({ ...p, previewUrl: renderBlurred(p.prepared).toDataURL('image/jpeg', 0.7) })

  const toggleFace = (photoId: string, faceIdx: number) => {
    setPending(prev => prev.map(p => {
      if (p.id !== photoId) return p
      const faces = p.prepared.faces.map((f, i) => (i === faceIdx ? { ...f, blur: !f.blur } : f))
      const updated = rerender({ ...p, prepared: { ...p.prepared, faces } })
      if (inspect?.id === photoId) setInspect(updated)
      return updated
    }))
  }

  const removePending = (photoId: string) => setPending(prev => prev.filter(p => p.id !== photoId))

  /** Click on empty space in the inspector = add a manual blur circle (for a face the detector missed). */
  const addManualFace = (photoId: string, relX: number, relY: number) => {
    setPending(prev => prev.map(p => {
      if (p.id !== photoId) return p
      const size = Math.round(p.prepared.width * 0.08)
      const faces = [...p.prepared.faces, { x: relX * p.prepared.width - size / 2, y: relY * p.prepared.height - size / 2, w: size, h: size, blur: true }]
      const updated = rerender({ ...p, prepared: { ...p.prepared, faces } })
      if (inspect?.id === photoId) setInspect(updated)
      return updated
    }))
  }

  // Step 2: upload the blurred renders
  const handleUpload = async () => {
    if (!pending.length) return
    setUploading(true)
    try {
      const docId = await ensureSaved()
      const uploaded: PartyPhoto[] = []
      for (const p of pending.filter(x => x.editIndex === undefined)) {
        const name = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`
        // Un-blurred original → admin-only path, so the blurring can be changed later.
        const originalPath = `parties-private/${docId}/${name}`
        const originalCanvas = document.createElement('canvas')
        originalCanvas.width = p.prepared.width
        originalCanvas.height = p.prepared.height
        originalCanvas.getContext('2d')!.drawImage(p.prepared.bitmap, 0, 0)
        await uploadBytes(ref(storage, originalPath), await canvasToJpeg(originalCanvas, 0.92), { contentType: 'image/jpeg' })

        const blob = await canvasToJpeg(renderBlurred(p.prepared))
        const storagePath = `parties/${docId}/${name}`
        const storageRef = ref(storage, storagePath)
        await uploadBytes(storageRef, blob, { contentType: 'image/jpeg', cacheControl: 'public,max-age=3600' })
        const url = await getDownloadURL(storageRef)
        uploaded.push({
          url, storagePath, originalPath,
          faces: p.prepared.faces,
          width: p.prepared.width, height: p.prepared.height,
          blurred: p.prepared.faces.filter(f => f.blur).length,
        })
      }
      const nextPhotos = [...photos, ...uploaded]
      setPhotos(nextPhotos)
      await updateParty(docId, { photos: nextPhotos })
      setPending(prev => prev.filter(x => x.editIndex !== undefined))
      toast.success(`${uploaded.length} photo${uploaded.length > 1 ? 's' : ''} uploaded`)
    } catch (e: any) {
      toast.error(e?.message || 'Upload failed')
    } finally { setUploading(false) }
  }

  const removePhoto = async (idx: number) => {
    if (!confirm('Remove this photo?')) return
    const p = photos[idx]
    const next = photos.filter((_, i) => i !== idx)
    setPhotos(next)
    if (coverIndex >= next.length) setCoverIndex(0)
    deleteObject(ref(storage, p.storagePath)).catch(() => {})
    if (p.originalPath) deleteObject(ref(storage, p.originalPath)).catch(() => {})
    if (id) await updateParty(id, { photos: next, coverIndex: Math.min(coverIndex, Math.max(0, next.length - 1)) })
  }

  /** Re-edit the blurring on an already-uploaded photo (needs its private original). */
  const editUploaded = async (idx: number) => {
    const ph = photos[idx]
    if (!ph.originalPath) { toast.error('This photo was uploaded before re-editing existed - remove it and upload again.'); return }
    setEditLoading(idx)
    try {
      const blob = await getBlob(ref(storage, ph.originalPath))
      const prepared = await prepareFromOriginal(blob, ph.faces ?? [])
      const p: PendingPhoto = { id: `edit-${idx}-${Date.now()}`, prepared, previewUrl: renderBlurred(prepared).toDataURL('image/jpeg', 0.7), editIndex: idx }
      setPending(prev => [...prev.filter(x => x.editIndex !== idx), p])
      setInspect(p)
    } catch (e: any) {
      toast.error(e?.message || 'Could not load the original')
    } finally { setEditLoading(null) }
  }

  const saveEdit = async (p: PendingPhoto) => {
    if (p.editIndex === undefined || !id) return
    setEditSaving(true)
    try {
      const ph = photos[p.editIndex]
      const blob = await canvasToJpeg(renderBlurred(p.prepared))
      const storageRef = ref(storage, ph.storagePath)
      await uploadBytes(storageRef, blob, { contentType: 'image/jpeg', cacheControl: 'public,max-age=3600' })
      const base = (await getDownloadURL(storageRef)).split('&v=')[0]
      const updated: PartyPhoto = { ...ph, url: `${base}&v=${Date.now()}`, faces: p.prepared.faces, blurred: p.prepared.faces.filter(f => f.blur).length }
      const next = photos.map((x, i) => (i === p.editIndex ? updated : x))
      setPhotos(next)
      await updateParty(id, { photos: next })
      setPending(prev => prev.filter(x => x.id !== p.id))
      setInspect(null)
      toast.success('Blurring updated')
    } catch (e: any) {
      toast.error(e?.message || 'Save failed')
    } finally { setEditSaving(false) }
  }

  const cancelEdit = (p: PendingPhoto) => {
    setPending(prev => prev.filter(x => x.id !== p.id))
    setInspect(null)
  }

  const movePhoto = (idx: number, dir: -1 | 1) => {
    const j = idx + dir
    if (j < 0 || j >= photos.length) return
    const next = [...photos]
    ;[next[idx], next[j]] = [next[j], next[idx]]
    setPhotos(next)
    if (coverIndex === idx) setCoverIndex(j)
    else if (coverIndex === j) setCoverIndex(idx)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <button onClick={onClose} className="text-gray-400 hover:text-white text-sm inline-flex items-center gap-1"><ArrowLeft size={14} /> All parties</button>
        <div className="flex gap-2">
          {party?.published && (
            <a href={`/parties/${slug}`} target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-sm text-gray-300 hover:text-white inline-flex items-center gap-1 border border-white/15 rounded-lg"><ExternalLink size={14} /> View</a>
          )}
          {id && <button onClick={handleDelete} className="px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg inline-flex items-center gap-1"><Trash2 size={14} /> Delete</button>}
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-[#c9a84c] text-black font-bold text-sm rounded-lg disabled:opacity-50">
            {saving ? 'Saving…' : published ? 'Save & publish' : 'Save draft'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Details */}
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-5 space-y-4">
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider">Title *</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Emma's 8th birthday pool party" className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider">Thai title (optional)</label>
            <input value={titleTh} onChange={e => setTitleTh(e.target.value)} placeholder="งานวันเกิดน้องเอ็มม่า 8 ขวบ" className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Date *</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider">Type</label>
              <select value={type} onChange={e => setType(e.target.value as Party['type'])} className={inputClass}>
                {TYPES.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider">Short description (optional)</label>
            <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={3} placeholder="20 kids, Big Splash bundle, unicorn theme, pool all afternoon." className={inputClass} />
          </div>
          <label className="flex items-start gap-2 text-sm text-gray-300">
            <input type="checkbox" checked={hostConsent} onChange={e => setHostConsent(e.target.checked)} className="mt-1 accent-[#c9a84c]" />
            <span>Host agreed to photos being published <span className="text-gray-500">(required to publish)</span></span>
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-300">
            <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} className="accent-[#c9a84c]" />
            <span className="inline-flex items-center gap-1">{published ? <Eye size={14} /> : <EyeOff size={14} />} Published on /parties</span>
          </label>
          <p className="text-xs text-gray-600">URL: /parties/{slug}</p>
        </div>

        {/* Photos */}
        <div className="lg:col-span-2 space-y-6">
          {/* Add photos */}
          <div className="bg-[#141414] border border-white/5 rounded-2xl p-5">
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/10 rounded-xl py-8 cursor-pointer hover:border-[#c9a84c]/40 transition-colors">
              {detecting > 0 ? <Loader2 size={20} className="text-[#c9a84c] animate-spin" /> : <Upload size={20} className="text-[#c9a84c]" />}
              <span className="text-gray-400 text-sm">{detecting > 0 ? `Finding faces in ${detecting} photo${detecting > 1 ? 's' : ''}…` : 'Add photos (select several) — faces are found and blurred before anything is uploaded'}</span>
              <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" disabled={detecting > 0 || uploading} onChange={handleFiles} />
            </label>

            {pending.some(p => p.editIndex === undefined) && (
              <>
                <p className="text-gray-400 text-sm mt-5 mb-3">
                  <ShieldCheck size={14} className="inline mr-1 text-green-400" />
                  Review before upload — click a photo to see the faces, then tap a face to un-blur it (adults only, or with the parents' OK).
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                  {pending.filter(p => p.editIndex === undefined).map(p => (
                    <div key={p.id} className="relative group">
                      <button onClick={() => setInspect(p)} className="block w-full aspect-square rounded-xl overflow-hidden bg-black border border-white/10">
                        <img src={p.previewUrl} alt="" className="w-full h-full object-cover" />
                      </button>
                      <span className="absolute bottom-1 left-1 text-[10px] bg-black/70 text-gray-200 px-1.5 py-0.5 rounded">
                        {p.prepared.faces.filter(f => f.blur).length}/{p.prepared.faces.length} blurred
                      </span>
                      <button onClick={() => removePending(p.id)} className="absolute top-1 right-1 p-1 rounded bg-black/70 text-red-400 opacity-0 group-hover:opacity-100" aria-label="Remove"><X size={12} /></button>
                    </div>
                  ))}
                </div>
                <button onClick={handleUpload} disabled={uploading} className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#c9a84c] text-black font-bold text-sm rounded-lg disabled:opacity-50">
                  {uploading ? <><Loader2 size={14} className="animate-spin" /> Uploading…</> : <><Upload size={14} /> Upload {pending.filter(p => p.editIndex === undefined).length} blurred photo{pending.filter(p => p.editIndex === undefined).length > 1 ? 's' : ''}</>}
                </button>
              </>
            )}
          </div>

          {/* Uploaded */}
          {photos.length > 0 && (
            <div className="bg-[#141414] border border-white/5 rounded-2xl p-5">
              <p className="text-gray-400 text-sm mb-3">{photos.length} photos in this album · star = cover · pencil = change blurring · arrows reorder</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                {photos.map((ph, i) => (
                  <div key={ph.storagePath} className={`relative group aspect-square rounded-xl overflow-hidden bg-black border ${i === coverIndex ? 'border-[#c9a84c]' : 'border-white/10'}`}>
                    <img src={ph.url} alt="" loading="lazy" className="w-full h-full object-cover" />
                    {editLoading === i && <div className="absolute inset-0 bg-black/60 flex items-center justify-center"><Loader2 size={18} className="text-[#c9a84c] animate-spin" /></div>}
                    <span className="absolute top-1 left-1 text-[10px] bg-black/70 text-gray-200 px-1.5 py-0.5 rounded">{ph.blurred} blurred</span>
                    <div className="absolute inset-x-0 bottom-0 flex justify-between items-center p-1 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => movePhoto(i, -1)} className="p-1 text-white/80" aria-label="Move left"><ArrowLeft size={12} /></button>
                      <button onClick={() => setCoverIndex(i)} className={`p-1 ${i === coverIndex ? 'text-[#c9a84c]' : 'text-white/80'}`} aria-label="Set as cover"><Star size={12} /></button>
                      <button onClick={() => editUploaded(i)} className="p-1 text-white/80" aria-label="Change blurring" title="Change which faces are blurred"><Pencil size={12} /></button>
                      <button onClick={() => removePhoto(i)} className="p-1 text-red-400" aria-label="Remove"><Trash2 size={12} /></button>
                      <button onClick={() => movePhoto(i, 1)} className="p-1 text-white/80" aria-label="Move right"><ArrowRight size={12} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Face inspector */}
      {inspect && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => (inspect.editIndex !== undefined ? cancelEdit(inspect) : setInspect(null))}>
          <button onClick={() => (inspect.editIndex !== undefined ? cancelEdit(inspect) : setInspect(null))} className="absolute top-6 right-6 text-white/70 hover:text-white" aria-label="Close"><X size={28} /></button>
          <div className="relative max-w-[95vw] max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <img
              src={inspect.previewUrl}
              alt=""
              className="max-w-[95vw] max-h-[85vh] object-contain block cursor-crosshair"
              onClick={e => {
                const r = (e.target as HTMLImageElement).getBoundingClientRect()
                addManualFace(inspect.id, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height)
              }}
            />
            {inspect.prepared.faces.map((f, i) => (
              <button
                key={i}
                onClick={() => toggleFace(inspect.id, i)}
                title={f.blur ? 'Blurred — click to show' : 'Visible — click to blur'}
                className={`absolute border-2 rounded-md ${f.blur ? 'border-[#c9a84c]' : 'border-red-500'}`}
                style={{
                  left: `${(f.x / inspect.prepared.width) * 100}%`,
                  top: `${(f.y / inspect.prepared.height) * 100}%`,
                  width: `${(f.w / inspect.prepared.width) * 100}%`,
                  height: `${(f.h / inspect.prepared.height) * 100}%`,
                }}
              />
            ))}
            <p className="text-center text-gray-400 text-xs mt-3">
              {inspect.prepared.faces.length} face{inspect.prepared.faces.length === 1 ? '' : 's'} found · gold = blurred, red = visible · click a box to toggle · click anywhere else to add a blur
            </p>
            {inspect.editIndex !== undefined ? (
              <div className="flex justify-center gap-3 mt-4">
                <button onClick={() => cancelEdit(inspect)} className="px-4 py-2 text-sm text-gray-300 border border-white/20 rounded-lg">Cancel</button>
                <button onClick={() => saveEdit(inspect)} disabled={editSaving} className="px-4 py-2 text-sm bg-[#c9a84c] text-black font-bold rounded-lg disabled:opacity-50 inline-flex items-center gap-2">
                  {editSaving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : 'Save blurring'}
                </button>
              </div>
            ) : (
              <div className="flex justify-center mt-4">
                <button onClick={() => setInspect(null)} className="px-4 py-2 text-sm bg-[#c9a84c] text-black font-bold rounded-lg">Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
