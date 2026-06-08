import { useState, useEffect, useRef } from 'react'
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth'
import { ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage'
import { auth, storage } from '../lib/firebase'

type User = { uid: string; email: string | null }
import { getEnquiries, updateEnquiry, getCRMContacts, enquiryToContact, deleteCRMContact, updateCRMContact } from '../lib/firestore'
import type { Enquiry, CRMContact } from '../types'
import { toast } from 'sonner'
import { LogOut, Users, MessageSquare, RefreshCw, UserPlus, Trash2, Phone, Mail, Tag, ChevronDown, ChevronUp, ImageIcon, Upload } from 'lucide-react'

const CATEGORIES = ['Starters', 'Mains', 'Burgers', 'Thai Food', 'Kids Menu', 'Desserts', 'Drinks']

// ── Menu Images ────────────────────────────────────────────────────────────────
function MenuImages() {
  const [images, setImages] = useState<Record<string, string>>({})
  const [uploading, setUploading] = useState<string | null>(null)
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const loadImages = async () => {
    try {
      const folderRef = ref(storage, 'menu-categories')
      const result = await listAll(folderRef)
      const entries = await Promise.all(
        result.items.map(async (item: any) => {
          const url = await getDownloadURL(item)
          // match filename back to category name
          const name = item.name.replace(/\.[^.]+$/, '').replace(/-/g, ' ')
          const category = CATEGORIES.find(c => c.toLowerCase() === name.toLowerCase()) || name
          return [category, url] as [string, string]
        })
      )
      setImages(Object.fromEntries(entries))
    } catch {
      // folder empty or doesn't exist yet — fine
    }
  }

  useEffect(() => { loadImages() }, [])

  const handleUpload = async (category: string, file: File) => {
    setUploading(category)
    try {
      const ext = file.name.split('.').pop()
      const slug = category.toLowerCase().replace(/ /g, '-')
      const storageRef = ref(storage, `menu-categories/${slug}.${ext}`)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      setImages(prev => ({ ...prev, [category]: url }))
      toast.success(`${category} image updated`)
    } catch {
      toast.error('Upload failed')
    } finally {
      setUploading(null)
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {CATEGORIES.map(cat => (
        <div key={cat} className="bg-[#141414] border border-white/5 rounded-xl overflow-hidden">
          <div className="aspect-video relative bg-white/3">
            {images[cat] ? (
              <img src={images[cat]} alt={cat} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon size={28} className="text-gray-700" />
              </div>
            )}
            {uploading === cat && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <RefreshCw size={20} className="text-[#c9a84c] animate-spin" />
              </div>
            )}
          </div>
          <div className="p-3">
            <p className="text-white text-sm font-medium mb-2">{cat}</p>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={el => { inputRefs.current[cat] = el }}
              onChange={e => {
                const file = e.target.files?.[0]
                if (file) handleUpload(cat, file)
                e.target.value = ''
              }}
            />
            <button
              onClick={() => inputRefs.current[cat]?.click()}
              disabled={uploading === cat}
              className="w-full flex items-center justify-center gap-2 py-1.5 rounded-lg bg-white/5 text-gray-400 hover:text-white text-xs transition-colors disabled:opacity-50"
            >
              <Upload size={12} />
              {images[cat] ? 'Replace' : 'Upload'}
            </button>
          </div>
        </div>
      ))}
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

// ── Main Admin ─────────────────────────────────────────────────────────────────
export default function Admin() {
  const [user, setUser] = useState<User | null>(null)
  const [tab, setTab] = useState<'enquiries' | 'crm' | 'menu'>('enquiries')
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

  return (
    <div className="min-h-screen pt-20 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Hemingways Lakeside</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <button
              onClick={() => signOut(auth)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white text-sm transition-colors"
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>
        </div>

        {/* Stats */}
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

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: 'enquiries', label: 'Enquiries', icon: MessageSquare },
            { key: 'crm', label: 'CRM Contacts', icon: Users },
            { key: 'menu', label: 'Menu Images', icon: ImageIcon },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key as typeof tab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-colors ${
                tab === key ? 'bg-[#c9a84c] text-black font-bold' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

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
        {tab === 'crm' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.length === 0 ? (
              <div className="text-center text-gray-600 py-16 col-span-2">
                No contacts yet. Add contacts from enquiries above.
              </div>
            ) : (
              contacts.map(c => (
                <ContactCard key={c.id} contact={c} onRefresh={loadData} />
              ))
            )}
          </div>
        )}

        {/* Menu Images */}
        {tab === 'menu' && <MenuImages />}
      </div>
    </div>
  )
}
