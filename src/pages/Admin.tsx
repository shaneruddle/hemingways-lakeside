import { useState, useEffect, useRef } from 'react'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { auth, storage } from '../lib/firebase'

type User = { uid: string; email: string | null }
import { getEnquiries, updateEnquiry, getCRMContacts, enquiryToContact, deleteCRMContact, updateCRMContact, saveCRMContact, getBlogPosts, saveBlogPost, updateBlogPost, deleteBlogPost, getMenuImages, saveMenuImage, deleteMenuImage, getSpecials, saveSpecial, updateSpecial, deleteSpecial, getGalleryImages, addGalleryImage, deleteGalleryImage } from '../lib/firestore'
import type { Enquiry, CRMContact, BlogPost, Special, GalleryImage } from '../types'
import { toast } from 'sonner'
import { LogOut, Users, MessageSquare, RefreshCw, UserPlus, Trash2, Phone, Mail, Tag, ChevronDown, ChevronUp, ImageIcon, Upload, ExternalLink, FileText, Edit2, Plus, X, Eye, EyeOff, Star, UtensilsCrossed } from 'lucide-react'
import MenuManager from '../components/admin/MenuManager'

// ── Event Galleries ─────────────────────────────────────────────────────────────
const GALLERY_TYPES: { key: GalleryImage['type']; label: string }[] = [
  { key: 'kids', label: 'Kids Parties' },
  { key: 'birthday', label: 'Adult Birthdays' },
  { key: 'corporate', label: 'Corporate Events' },
]

function GalleryManager() {
  const [galleryType, setGalleryType] = useState<GalleryImage['type']>('kids')
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement | null>(null)

  const load = async (type: GalleryImage['type']) => {
    setLoading(true)
    try { setImages(await getGalleryImages(type)) } finally { setLoading(false) }
  }

  useEffect(() => { load(galleryType) }, [galleryType])

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    setUploading(true)
    try {
      for (const file of files) {
        const ext = file.name.split('.').pop()
        const path = `event-galleries/${galleryType}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
        const storageRef = ref(storage, path)
        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)
        await addGalleryImage(galleryType, url)
      }
      toast.success(`${files.length} photo${files.length > 1 ? 's' : ''} uploaded`)
      if (fileRef.current) fileRef.current.value = ''
      await load(galleryType)
    } catch (err: any) {
      console.error('Gallery upload error:', err)
      toast.error(`Upload failed: ${err?.message || err?.code || String(err)}`)
    } finally { setUploading(false) }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this photo from the gallery?')) return
    await deleteGalleryImage(id)
    toast.success('Photo removed')
    await load(galleryType)
  }

  return (
    <div>
      <div className="flex gap-2 mb-6 flex-wrap">
        {GALLERY_TYPES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setGalleryType(key)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              galleryType === key ? 'bg-white text-black font-bold' : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 mb-6">
        <label className="flex items-center justify-center gap-3 border-2 border-dashed border-white/10 rounded-xl py-10 cursor-pointer hover:border-[#c9a84c]/40 transition-colors">
          <Upload size={18} className="text-[#c9a84c]" />
          <span className="text-gray-400 text-sm">
            {uploading ? 'Uploading…' : 'Click to upload photos (you can select multiple)'}
          </span>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            disabled={uploading}
            onChange={handleFiles}
          />
        </label>
      </div>

      {loading ? (
        <div className="text-center text-gray-600 py-16">Loading…</div>
      ) : images.length === 0 ? (
        <div className="text-center text-gray-600 py-16">No photos in this gallery yet</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map(img => (
            <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden bg-black border border-white/5">
              <img src={img.imageUrl} alt="" className="w-full h-full object-cover" />
              <button
                onClick={() => handleDelete(img.id)}
                className="absolute top-2 right-2 p-2 rounded-lg bg-black/70 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Delete photo"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Menu Images ────────────────────────────────────────────────────────────────
function MenuImages() {
  const [images, setImages] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [newName, setNewName] = useState('')
  const [newFile, setNewFile] = useState<File | null>(null)
  const [newPreview, setNewPreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  const load = async () => {
    setLoading(true)
    try { setImages(await getMenuImages()) } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setNewFile(file)
    setNewPreview(URL.createObjectURL(file))
  }

  const handleAdd = async () => {
    if (!newName.trim()) { toast.error('Category name required'); return }
    if (!newFile) { toast.error('Image required'); return }
    setUploading(true)
    try {
      const slug = newName.trim().toLowerCase().replace(/ /g, '-')
      const ext = newFile.name.split('.').pop()
      const storageRef = ref(storage, `menu-categories/${slug}.${ext}`)
      await uploadBytes(storageRef, newFile)
      const url = await getDownloadURL(storageRef)
      await saveMenuImage(slug, url)
      toast.success(`${newName} added`)
      setNewName('')
      setNewFile(null)
      setNewPreview(null)
      await load()
    } catch (err: any) {
      console.error('Upload error:', err)
      toast.error(`Upload failed: ${err?.message || err?.code || String(err)}`)
    } finally { setUploading(false) }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete "${slug}"?`)) return
    await deleteMenuImage(slug)
    toast.success('Deleted')
    setImages(prev => { const n = { ...prev }; delete n[slug]; return n })
  }

  const entries = Object.entries(images)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Menu Categories</h2>
      </div>

      {/* Add new */}
      <div className="bg-[#141414] border border-white/10 rounded-xl p-6 space-y-4">
        <h3 className="text-white font-semibold">Add Category</h3>
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          placeholder="Category name (e.g. Starters)"
          className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c9a84c]/50"
        />
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-white/20 transition-colors"
        >
          {newPreview ? (
            <img src={newPreview} alt="" className="w-full max-h-48 object-cover" />
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-gray-600">
              <ImageIcon size={28} className="mb-2" />
              <span className="text-sm">Click to select image</span>
            </div>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        <button
          onClick={handleAdd}
          disabled={uploading}
          className="w-full bg-[#c9a84c] text-black py-2.5 rounded-lg font-semibold text-sm hover:bg-[#d4b05a] transition-colors disabled:opacity-50"
        >
          {uploading ? 'Uploading…' : 'Add Category'}
        </button>
      </div>

      {/* Existing */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1,2,3].map(i => <div key={i} className="bg-[#141414] rounded-xl aspect-video animate-pulse" />)}
        </div>
      ) : entries.length === 0 ? (
        <p className="text-center text-gray-600 py-10">No categories yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {entries.map(([slug, url]) => (
            <div key={slug} className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden">
              <div className="aspect-video">
                <img src={url} alt={slug} className="w-full h-full object-cover" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <p className="text-white text-sm font-medium capitalize">{slug.replace(/-/g, ' ')}</p>
                <button onClick={() => handleDelete(slug)} className="p-1 text-gray-600 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Blog Manager ───────────────────────────────────────────────────────────────
function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<BlogPost | null>(null)
  const [creating, setCreating] = useState(false)

  const emptyForm = {
    title: '', slug: '', excerpt: '', content: '',
    imageUrl: '', author: 'Hemingways Lakeside',
    tags: [] as string[], publishedAt: new Date().toISOString().slice(0, 10),
    published: true,
  }
  const [form, setForm] = useState(emptyForm)
  const [tagInput, setTagInput] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      setPosts(await getBlogPosts())
    } catch {
      toast.error('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const slugify = (str: string) =>
    str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  const setField = (key: string, val: any) =>
    setForm(f => ({ ...f, [key]: val }))

  const openCreate = () => {
    setForm(emptyForm)
    setTagInput('')
    setEditing(null)
    setCreating(true)
  }

  const openEdit = (post: BlogPost) => {
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      imageUrl: post.imageUrl || '',
      author: post.author,
      tags: post.tags,
      publishedAt: post.publishedAt.slice(0, 10),
      published: (post as any).published !== false,
    })
    setTagInput('')
    setEditing(post)
    setCreating(false)
  }

  const close = () => {
    setEditing(null)
    setCreating(false)
  }

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !form.tags.includes(t)) {
      setField('tags', [...form.tags, t])
    }
    setTagInput('')
  }

  const removeTag = (tag: string) =>
    setField('tags', form.tags.filter((t: string) => t !== tag))

  const handleSave = async () => {
    if (!form.title) { toast.error('Title is required'); return }
    const slug = form.slug || slugify(form.title)
    const data = { ...form, slug, publishedAt: new Date(form.publishedAt).toISOString() }
    try {
      if (editing) {
        await updateBlogPost(editing.id, data)
        toast.success('Post updated')
      } else {
        await saveBlogPost(data)
        toast.success('Post created')
      }
      await load()
      close()
    } catch {
      toast.error('Failed to save post')
    }
  }

  const handleDelete = async (post: BlogPost) => {
    if (!confirm(`Delete "${post.title}"?`)) return
    try {
      await deleteBlogPost(post.id)
      toast.success('Post deleted')
      await load()
    } catch {
      toast.error('Failed to delete post')
    }
  }

  const togglePublish = async (post: BlogPost) => {
    try {
      const published = !((post as any).published !== false)
      await updateBlogPost(post.id, { published } as any)
      toast.success(published ? 'Published' : 'Unpublished')
      await load()
    } catch {
      toast.error('Failed to update')
    }
  }

  if (creating || editing) {
    return (
      <div className="max-w-3xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-bold text-lg">{editing ? 'Edit Post' : 'New Post'}</h2>
          <button onClick={close} className="text-gray-500 hover:text-white p-1">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={e => {
                setField('title', e.target.value)
                if (!editing) setField('slug', slugify(e.target.value))
              }}
              placeholder="Post title"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2">Slug</label>
              <input
                type="text"
                value={form.slug}
                onChange={e => setField('slug', e.target.value)}
                placeholder="url-friendly-slug"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/50"
              />
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2">Publish Date</label>
              <input
                type="date"
                value={form.publishedAt}
                onChange={e => setField('publishedAt', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c9a84c]/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={e => setField('excerpt', e.target.value)}
              placeholder="Short summary shown in blog listing..."
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/50 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2">Content</label>
            <textarea
              value={form.content}
              onChange={e => setField('content', e.target.value)}
              placeholder="Full post content (supports line breaks)..."
              rows={12}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/50 resize-y font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={e => setField('author', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c9a84c]/50"
              />
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2">Cover Image URL</label>
              <input
                type="text"
                value={form.imageUrl}
                onChange={e => setField('imageUrl', e.target.value)}
                placeholder="https://..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2">Tags</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {form.tags.map((tag: string) => (
                <span key={tag} className="flex items-center gap-1 text-xs bg-[#c9a84c]/10 text-[#c9a84c] px-2 py-1 rounded-full">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-white"><X size={10} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                placeholder="Add tag..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/50"
              />
              <button onClick={addTag} className="px-4 py-2 bg-white/5 text-gray-400 hover:text-white text-sm rounded-lg transition-colors">
                Add
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-[#c9a84c] text-black font-bold text-sm rounded-lg hover:bg-[#b8973d] transition-colors"
            >
              {editing ? 'Save Changes' : 'Publish Post'}
            </button>
            <button
              onClick={close}
              className="px-6 py-3 bg-white/5 text-gray-400 text-sm rounded-lg hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-500 text-sm">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-[#c9a84c] text-black font-bold text-sm rounded-lg hover:bg-[#b8973d] transition-colors"
        >
          <Plus size={14} /> New Post
        </button>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-600">Loading...</div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 text-gray-600">No posts yet. Create your first one!</div>
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.id} className="bg-[#141414] border border-white/5 rounded-xl p-5 flex items-center gap-4">
              {post.imageUrl && (
                <img src={post.imageUrl} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-semibold truncate">{post.title}</span>
                  {(post as any).published === false && (
                    <span className="text-xs bg-gray-500/20 text-gray-400 px-2 py-0.5 rounded-full">Draft</span>
                  )}
                </div>
                <p className="text-gray-500 text-sm truncate">{post.excerpt}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                  <span>{post.publishedAt.slice(0, 10)}</span>
                  <span>{post.author}</span>
                  {post.tags.map(t => <span key={t} className="bg-white/5 px-1.5 py-0.5 rounded">{t}</span>)}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => togglePublish(post)}
                  title={(post as any).published === false ? 'Publish' : 'Unpublish'}
                  className="p-2 text-gray-600 hover:text-[#c9a84c] transition-colors"
                >
                  {(post as any).published === false ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button
                  onClick={() => openEdit(post)}
                  className="p-2 text-gray-600 hover:text-white transition-colors"
                >
                  <Edit2 size={15} />
                </button>
                <button
                  onClick={() => handleDelete(post)}
                  className="p-2 text-gray-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Specials Manager ───────────────────────────────────────────────────────────
function SpecialsManager() {
  const [specials, setSpecials] = useState<Special[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [editing, setEditing] = useState<Special | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: '', imageUrl: '' })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await getSpecials(false)
      setSpecials(data.sort((a, b) => (a.order ?? 999) - (b.order ?? 999)))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const openNew = () => {
    setEditing(null)
    setForm({ title: '', imageUrl: '' })
    setImageFile(null)
    setImagePreview(null)
    setShowForm(true)
  }

  const openEdit = (s: Special) => {
    setEditing(s)
    setForm({ title: s.title, imageUrl: s.imageUrl || '' })
    setImageFile(null)
    setImagePreview(s.imageUrl || null)
    setShowForm(true)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSave = async () => {
    if (!form.title.trim()) { toast.error('Title required'); return }
    setUploading(true)
    try {
      let imageUrl = form.imageUrl
      if (imageFile) {
        const id = editing?.id || Date.now().toString()
        const ext = imageFile.name.split('.').pop()
        const storageRef = ref(storage, `specials/${id}.${ext}`)
        await uploadBytes(storageRef, imageFile)
        imageUrl = await getDownloadURL(storageRef)
      }
      if (editing) {
        await updateSpecial(editing.id, { title: form.title, imageUrl, active: editing.active })
        toast.success('Updated')
      } else {
        await saveSpecial({ title: form.title, imageUrl, active: true, order: specials.length })
        toast.success('Added')
      }
      setEditing(null)
      setShowForm(false)
      setForm({ title: '', imageUrl: '' })
      setImageFile(null)
      setImagePreview(null)
      await load()
    } catch (err: any) {
      toast.error(err?.message || 'Save failed')
    } finally {
      setUploading(false)
    }
  }

  const toggleActive = async (s: Special) => {
    await updateSpecial(s.id, { active: !s.active })
    setSpecials(prev => prev.map(x => x.id === s.id ? { ...x, active: !x.active } : x))
  }

  const handleDelete = async (s: Special) => {
    if (!confirm(`Delete "${s.title}"?`)) return
    await deleteSpecial(s.id)
    toast.success('Deleted')
    setSpecials(prev => prev.filter(x => x.id !== s.id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">Specials</h2>
        <button
          onClick={openNew}
          className="flex items-center gap-2 bg-[#c9a84c] text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#d4b05a] transition-colors"
        >
          <Plus size={15} /> Add Special
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-[#141414] border border-white/10 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white font-semibold">{editing ? 'Edit Special' : 'New Special'}</h3>
            <button onClick={() => { setEditing(null); setShowForm(false); setForm({ title: '', imageUrl: '' }); setImageFile(null); setImagePreview(null) }} className="text-gray-500 hover:text-white">
              <X size={16} />
            </button>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Title</label>
            <input
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              placeholder="e.g. Tuesday Burger Night"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c9a84c]/50"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1 uppercase tracking-wider">Image</label>
            <div
              onClick={() => fileRef.current?.click()}
              className="border-2 border-dashed border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-white/20 transition-colors"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="" className="w-full max-h-64 object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-gray-600">
                  <ImageIcon size={32} className="mb-2" />
                  <span className="text-sm">Click to upload image</span>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>
          <button
            onClick={handleSave}
            disabled={uploading}
            className="w-full bg-[#c9a84c] text-black py-2.5 rounded-lg font-semibold text-sm hover:bg-[#d4b05a] transition-colors disabled:opacity-50"
          >
            {uploading ? 'Saving…' : editing ? 'Update Special' : 'Add Special'}
          </button>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="bg-[#141414] rounded-xl h-20 animate-pulse" />)}
        </div>
      ) : specials.length === 0 ? (
        <p className="text-center text-gray-600 py-16">No specials yet. Add one above.</p>
      ) : (
        <div className="space-y-3">
          {specials.map(s => (
            <div key={s.id} className="bg-[#141414] border border-white/5 rounded-xl p-4 flex items-center gap-4">
              {s.imageUrl ? (
                <img src={s.imageUrl} alt="" className="w-16 h-16 rounded-lg object-cover shrink-0" />
              ) : (
                <div className="w-16 h-16 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <ImageIcon size={18} className="text-gray-600" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <span className="text-white font-semibold truncate block">{s.title}</span>
                <span className={`text-xs mt-0.5 ${s.active ? 'text-green-400' : 'text-gray-500'}`}>
                  {s.active ? 'Active' : 'Hidden'}
                </span>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleActive(s)}
                  title={s.active ? 'Hide' : 'Show'}
                  className={`p-2 transition-colors ${s.active ? 'text-green-400 hover:text-gray-400' : 'text-gray-600 hover:text-green-400'}`}
                >
                  {s.active ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button onClick={() => openEdit(s)} className="p-2 text-gray-600 hover:text-white transition-colors">
                  <Edit2 size={15} />
                </button>
                <button onClick={() => handleDelete(s)} className="p-2 text-gray-600 hover:text-red-400 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Login ──────────────────────────────────────────────────────────────────────
const googleProvider = new GoogleAuthProvider()

function Login({ onLogin }: { onLogin: (u: User) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      onLogin(cred.user)
    } catch {
      toast.error('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setGoogleLoading(true)
    try {
      const cred = await signInWithPopup(auth, googleProvider)
      onLogin(cred.user)
    } catch {
      toast.error('Google sign-in failed')
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-[#c9a84c] font-bold text-xl tracking-widest uppercase">Hemingways</div>
          <div className="text-white text-sm tracking-[0.3em] uppercase">Lakeside Admin</div>
        </div>
        <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 space-y-4">
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full py-3 bg-white text-gray-800 font-semibold text-sm rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors flex items-center justify-center gap-3"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.1-4z"/>
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 15.1 18.9 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34.1 6.5 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
              <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.4-5l-6.2-5.2C29.3 35.3 26.8 36 24 36c-5.2 0-9.6-3-11.3-7.2l-6.5 5C9.5 39.6 16.3 44 24 44z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.4 4.2-4.4 5.5l6.2 5.2C41 35.3 44 30 44 24c0-1.3-.1-2.7-.4-4z"/>
            </svg>
            {googleLoading ? 'Signing in...' : 'Sign in with Google'}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-600 text-xs">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c9a84c]/50"
              />
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c9a84c]/50"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded-lg hover:bg-[#b8973d] disabled:opacity-50 transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

// ── Enquiry card ───────────────────────────────────────────────────────────────
function EnquiryCard({ enquiry, onRefresh }: { enquiry: Enquiry; onRefresh: () => void }) {
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)

  const statusColors: Record<string, string> = {
    new: 'bg-green-500/20 text-green-400',
    contacted: 'bg-blue-500/20 text-blue-400',
    booked: 'bg-[#c9a84c]/20 text-[#c9a84c]',
    closed: 'bg-gray-500/20 text-gray-400',
  }

  const updateStatus = async (status: Enquiry['status']) => {
    setLoading(true)
    try {
      await updateEnquiry(enquiry.id, { status })
      toast.success(`Status updated to ${status}`)
      onRefresh()
    } catch {
      toast.error('Failed to update status')
    } finally {
      setLoading(false)
    }
  }

  const addToContacts = async () => {
    setLoading(true)
    try {
      await enquiryToContact(enquiry)
      toast.success('Added to CRM contacts')
      onRefresh()
    } catch {
      toast.error('Failed to add contact')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden">
      <div
        className="p-5 flex items-center gap-4 cursor-pointer hover:bg-white/2"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-white font-semibold truncate">{enquiry.name}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[enquiry.status]}`}>
              {enquiry.status}
            </span>
            <span className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded-full">{enquiry.type}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{enquiry.phone}</span>
            {enquiry.date && <span>📅 {enquiry.date}</span>}
            {enquiry.guestCount && <span>👥 {enquiry.guestCount} guests</span>}
            <span className="text-xs text-gray-700">{enquiry.createdAt.slice(0, 10)}</span>
          </div>
        </div>
        {expanded ? <ChevronUp size={16} className="text-gray-500 shrink-0" /> : <ChevronDown size={16} className="text-gray-500 shrink-0" />}
      </div>

      {expanded && (
        <div className="px-5 pb-5 border-t border-white/5 pt-4 space-y-4">
          <div className="text-gray-400 text-sm bg-white/3 rounded-lg p-4">
            <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">Message</p>
            {enquiry.message || <span className="text-gray-600 italic">No message</span>}
          </div>
          {enquiry.email && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Mail size={14} />
              <a href={`mailto:${enquiry.email}`} className="hover:text-[#c9a84c]">{enquiry.email}</a>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            {(['new', 'contacted', 'booked', 'closed'] as Enquiry['status'][]).map(s => (
              <button
                key={s}
                onClick={() => updateStatus(s)}
                disabled={loading || enquiry.status === s}
                className={`px-3 py-1.5 rounded-lg text-xs tracking-wider uppercase transition-colors ${
                  enquiry.status === s
                    ? 'bg-[#c9a84c]/20 text-[#c9a84c] cursor-default'
                    : 'bg-white/5 text-gray-500 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
            <button
              onClick={addToContacts}
              disabled={loading}
              className="ml-auto px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 bg-white/5 text-gray-400 hover:text-[#c9a84c] transition-colors"
            >
              <UserPlus size={12} />
              Add to CRM
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── CRM Contact ───────────────────────────────────────────────────────────────
function ContactCard({ contact, onRefresh }: { contact: CRMContact; onRefresh: () => void }) {
  const [notes, setNotes] = useState(contact.notes)
  const [editing, setEditing] = useState(false)

  const saveNotes = async () => {
    try {
      await updateCRMContact(contact.id, { notes, lastContact: new Date().toISOString() })
      toast.success('Saved')
      setEditing(false)
      onRefresh()
    } catch {
      toast.error('Failed to save')
    }
  }

  const remove = async () => {
    if (!confirm(`Remove ${contact.name} from CRM?`)) return
    try {
      await deleteCRMContact(contact.id)
      toast.success('Contact removed')
      onRefresh()
    } catch {
      toast.error('Failed to remove')
    }
  }

  return (
    <div className="bg-[#141414] border border-white/5 rounded-xl p-5">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <h3 className="text-white font-semibold">{contact.name}</h3>
          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Phone size={12} />{contact.phone}</span>
            {contact.email && <span className="flex items-center gap-1"><Mail size={12} />{contact.email}</span>}
          </div>
        </div>
        <button onClick={remove} className="text-gray-700 hover:text-red-400 transition-colors p-1">
          <Trash2 size={14} />
        </button>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {contact.tags.map(tag => (
          <span key={tag} className="text-xs bg-[#c9a84c]/10 text-[#c9a84c] px-2 py-0.5 rounded-full flex items-center gap-1">
            <Tag size={10} />{tag}
          </span>
        ))}
        <span className="text-xs text-gray-700">via {contact.source}</span>
      </div>
      {editing ? (
        <div>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white resize-none focus:outline-none focus:border-[#c9a84c]/50"
          />
          <div className="flex gap-2 mt-2">
            <button onClick={saveNotes} className="px-3 py-1.5 bg-[#c9a84c] text-black text-xs font-bold rounded">Save</button>
            <button onClick={() => { setNotes(contact.notes); setEditing(false) }} className="px-3 py-1.5 bg-white/5 text-gray-400 text-xs rounded">Cancel</button>
          </div>
        </div>
      ) : (
        <p
          className="text-gray-500 text-sm cursor-pointer hover:text-gray-300 transition-colors"
          onClick={() => setEditing(true)}
        >
          {notes || <span className="italic text-gray-700">Click to add notes...</span>}
        </p>
      )}
    </div>
  )
}

// ── CRM Tab (with Add Contact) ─────────────────────────────────────────────────
function CRMTab({ contacts, onRefresh }: { contacts: CRMContact[]; onRefresh: () => void }) {
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const emptyForm = { name: '', phone: '', email: '', notes: '', tags: [] as string[] }
  const [form, setForm] = useState(emptyForm)

  const setField = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const addTag = () => {
    const t = tagInput.trim()
    if (t && !form.tags.includes(t)) setField('tags', [...form.tags, t])
    setTagInput('')
  }

  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('Name required'); return }
    if (!form.phone.trim()) { toast.error('Phone required'); return }
    setSaving(true)
    try {
      await saveCRMContact({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        notes: form.notes.trim(),
        tags: form.tags,
        source: 'manual',
        lastContact: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      })
      toast.success('Contact added')
      setForm(emptyForm)
      setTagInput('')
      setShowForm(false)
      onRefresh()
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-500 text-sm">{contacts.length} contact{contacts.length !== 1 ? 's' : ''}</p>
        <button
          onClick={() => setShowForm(v => !v)}
          className="flex items-center gap-2 px-4 py-2 bg-[#c9a84c] text-black font-bold text-sm rounded-lg hover:bg-[#b8973d] transition-colors"
        >
          <UserPlus size={14} /> New Contact
        </button>
      </div>

      {showForm && (
        <div className="bg-[#141414] border border-white/10 rounded-xl p-6 space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold">Add Contact</h3>
            <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white"><X size={16} /></button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Name *</label>
              <input value={form.name} onChange={e => setField('name', e.target.value)} placeholder="Full name"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c9a84c]/50" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Phone *</label>
              <input value={form.phone} onChange={e => setField('phone', e.target.value)} placeholder="+66 8x xxx xxxx"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c9a84c]/50" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Email</label>
            <input value={form.email} onChange={e => setField('email', e.target.value)} placeholder="email@example.com" type="email"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c9a84c]/50" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Tags</label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {form.tags.map(t => (
                <span key={t} className="flex items-center gap-1 text-xs bg-[#c9a84c]/10 text-[#c9a84c] px-2 py-1 rounded-full">
                  {t} <button onClick={() => setField('tags', form.tags.filter((x: string) => x !== t))}><X size={10} /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={tagInput} onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                placeholder="e.g. birthday, corporate" className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c9a84c]/50" />
              <button onClick={addTag} className="px-3 py-2 bg-white/5 text-gray-400 hover:text-white text-sm rounded-lg">Add</button>
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Notes</label>
            <textarea value={form.notes} onChange={e => setField('notes', e.target.value)} rows={3} placeholder="Any notes about this contact..."
              className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[#c9a84c]/50" />
          </div>
          <button onClick={handleSave} disabled={saving}
            className="w-full bg-[#c9a84c] text-black py-2.5 rounded-lg font-semibold text-sm hover:bg-[#d4b05a] transition-colors disabled:opacity-50">
            {saving ? 'Saving…' : 'Add Contact'}
          </button>
        </div>
      )}

      {contacts.length === 0 ? (
        <div className="text-center text-gray-600 py-16">No contacts yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contacts.map(c => <ContactCard key={c.id} contact={c} onRefresh={onRefresh} />)}
        </div>
      )}
    </div>
  )
}

// ── Main Admin ─────────────────────────────────────────────────────────────────
export default function Admin() {
  const [user, setUser] = useState<User | null>(null)
  const [tab, setTab] = useState<'enquiries' | 'crm' | 'menu' | 'blog' | 'specials' | 'galleries' | 'digital-menu'>('enquiries')
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [contacts, setContacts] = useState<CRMContact[]>([])
  const [loading, setLoading] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser)
    return unsub
  }, [])

  const loadData = async () => {
    if (!user) return
    setLoading(true)
    try {
      const [enq, crm] = await Promise.all([getEnquiries(), getCRMContacts()])
      setEnquiries(enq)
      setContacts(crm)
    } catch {
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) loadData()
  }, [user])

  if (!user) return <Login onLogin={setUser} />

  const filteredEnquiries = statusFilter === 'all'
    ? enquiries
    : enquiries.filter(e => e.status === statusFilter)

  const newCount = enquiries.filter(e => e.status === 'new').length

  const NAV_ITEMS = [
    { key: 'enquiries', label: 'Enquiries', icon: MessageSquare, badge: newCount > 0 ? newCount : null },
    { key: 'crm', label: 'CRM Contacts', icon: Users },
    { key: 'menu', label: 'Menu Images', icon: ImageIcon },
    { key: 'blog', label: 'Blog', icon: FileText },
    { key: 'specials', label: 'Specials', icon: Star },
    { key: 'galleries', label: 'Galleries', icon: ImageIcon },
    { key: 'digital-menu', label: 'Digital Menu', icon: UtensilsCrossed },
  ] as const

  return (
    <div className="min-h-screen pt-16 flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-white/5 bg-[#0a0a0a] flex flex-col">
        <div className="p-6 border-b border-white/5">
          <div className="text-[#c9a84c] font-bold text-sm tracking-widest uppercase">Hemingways</div>
          <div className="text-gray-600 text-xs tracking-wider mt-0.5">Lakeside Admin</div>
        </div>

        <nav className="flex-1 py-4 space-y-0.5 px-2">
          {NAV_ITEMS.map(({ key, label, icon: Icon, badge }: any) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                tab === key
                  ? 'bg-[#c9a84c]/10 text-[#c9a84c] font-semibold'
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon size={15} />
                {label}
              </span>
              {badge && (
                <span className="text-xs bg-[#c9a84c] text-black font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
          <a
            href="https://hemingwayslakeside.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-white text-xs transition-colors hover:bg-white/5 w-full"
          >
            <ExternalLink size={13} /> Visit Site
          </a>
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-white text-xs transition-colors hover:bg-white/5 w-full"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
          <button
            onClick={() => signOut(auth)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-red-400 text-xs transition-colors hover:bg-white/5 w-full"
          >
            <LogOut size={13} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Stats — only on enquiries/crm */}
          {(tab === 'enquiries' || tab === 'crm') && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Enquiries', value: enquiries.length },
                { label: 'New', value: newCount, highlight: newCount > 0 },
                { label: 'Booked', value: enquiries.filter(e => e.status === 'booked').length },
                { label: 'CRM Contacts', value: contacts.length },
              ].map(({ label, value, highlight }) => (
                <div key={label} className={`rounded-xl p-5 border ${highlight ? 'bg-[#c9a84c]/10 border-[#c9a84c]/30' : 'bg-[#141414] border-white/5'}`}>
                  <div className={`text-2xl font-bold ${highlight ? 'text-[#c9a84c]' : 'text-white'}`}>{value}</div>
                  <div className="text-gray-500 text-sm">{label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Enquiries */}
          {tab === 'enquiries' && (
            <div>
              <div className="flex gap-2 mb-4 flex-wrap">
                {['all', 'new', 'contacted', 'booked', 'closed'].map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 rounded-full text-xs tracking-wider uppercase transition-colors ${
                      statusFilter === s ? 'bg-white text-black font-bold' : 'bg-white/5 text-gray-500 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {filteredEnquiries.length === 0 ? (
                  <div className="text-center text-gray-600 py-16">No enquiries yet</div>
                ) : (
                  filteredEnquiries.map(e => (
                    <EnquiryCard key={e.id} enquiry={e} onRefresh={loadData} />
                  ))
                )}
              </div>
            </div>
          )}

          {/* CRM */}
          {tab === 'crm' && <CRMTab contacts={contacts} onRefresh={loadData} />}

          {/* Menu Images */}
          {tab === 'menu' && <MenuImages />}

          {/* Blog */}
          {tab === 'blog' && <BlogManager />}

          {/* Specials */}
          {tab === 'specials' && <SpecialsManager />}

          {/* Event Galleries */}
          {tab === 'galleries' && <GalleryManager />}

          {/* Digital Menu */}
          {tab === 'digital-menu' && <MenuManager />}
        </div>
      </main>
    </div>
  )
}
