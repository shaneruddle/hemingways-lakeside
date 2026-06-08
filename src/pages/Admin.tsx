import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../lib/firebase'

type User = { uid: string; email: string | null }
import { getEnquiries, updateEnquiry, getCRMContacts, enquiryToContact, deleteCRMContact, updateCRMContact } from '../lib/firestore'
import type { Enquiry, CRMContact } from '../types'
import { toast } from 'sonner'
import { LogOut, Users, MessageSquare, RefreshCw, UserPlus, Trash2, Phone, Mail, Tag, ChevronDown, ChevronUp } from 'lucide-react'

// ── Login ──────────────────────────────────────────────────────────────────────
function Login({ onLogin }: { onLogin: (u: User) => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

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

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-[#c9a84c] font-bold text-xl tracking-widest uppercase">Hemingways</div>
          <div className="text-white text-sm tracking-[0.3em] uppercase">Lakeside Admin</div>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#141414] border border-white/10 rounded-2xl p-8 space-y-4">
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
  const [tab, setTab] = useState<'enquiries' | 'crm'>('enquiries')
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
      </div>
    </div>
  )
}
