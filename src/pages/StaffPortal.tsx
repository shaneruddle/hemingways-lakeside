import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'
import { toast, Toaster } from 'sonner'
import { Search, LogOut } from 'lucide-react'
import { auth } from '../lib/firebase'
import {
  getLoyaltyCustomers,
  getLoyaltyTransactions,
  addLoyaltyTransaction,
  updateLoyaltyCustomer,
  saveLoyaltyCustomer,
  getUserProfile,
} from '../lib/firestore'
import { logActivity } from '../utils/logger'
import type { LoyaltyCustomer, LoyaltyTransaction, LoyaltyTxType } from '../types'

const BONUS_RATE = 0.10

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      const profile = await getUserProfile(cred.user.uid)
      if (!profile || (profile.role !== 'admin' && profile.role !== 'manager' && profile.role !== 'staff')) {
        await signOut(auth)
        toast.error('Access denied')
        return
      }
      onLogin()
    } catch {
      toast.error('Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Hemingways Lakeside</h1>
          <p className="text-gray-400 text-sm mt-1">Staff Portal</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 placeholder-gray-500 text-sm"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 placeholder-gray-500 text-sm"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c9a84c] hover:bg-[#b8973b] text-black font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Customer Card ────────────────────────────────────────────────────────────
function CustomerCard({ customer, onTransactionDone }: { customer: LoyaltyCustomer; onTransactionDone: (id: string, balance: number) => void }) {
  const [txs, setTxs] = useState<LoyaltyTransaction[]>([])
  const [loadingTxs, setLoadingTxs] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [type, setType] = useState<LoyaltyTxType>('TOP_UP')
  const [amount, setAmount] = useState('')
  const [saving, setSaving] = useState(false)

  const loadTxs = async () => {
    if (showHistory) { setShowHistory(false); return }
    setLoadingTxs(true)
    const data = await getLoyaltyTransactions(customer.id)
    setTxs(data)
    setLoadingTxs(false)
    setShowHistory(true)
  }

  const processTransaction = async (e: React.FormEvent) => {
    e.preventDefault()
    const amt = parseFloat(amount)
    if (isNaN(amt) || amt <= 0) return toast.error('Enter a valid amount')

    if (type === 'REDEEM' && amt > customer.balance) {
      return toast.error(`Insufficient balance (฿${customer.balance.toLocaleString()})`)
    }

    setSaving(true)
    try {
      const bonus = type === 'TOP_UP' ? Math.floor(amt * BONUS_RATE) : 0
      const delta = type === 'REDEEM' ? -amt : amt + bonus
      const balanceAfter = Math.max(0, customer.balance + delta)

      const tx: Omit<LoyaltyTransaction, 'id'> = {
        type,
        amount: amt,
        bonus: bonus || undefined,
        balanceAfter,
        details: `${type} by staff`,
        processedBy: auth.currentUser?.email ?? 'staff',
        timestamp: new Date().toISOString(),
      }

      await addLoyaltyTransaction(customer.id, tx)
      await updateLoyaltyCustomer(customer.id, { balance: balanceAfter })
      await logActivity(`Staff ${type}`, `${customer.name}: ฿${amt}, balance ฿${balanceAfter}`, 'loyalty')

      onTransactionDone(customer.id, balanceAfter)
      toast.success(`${type === 'TOP_UP' ? `Topped up ฿${amt} + ฿${bonus} bonus` : `Redeemed ฿${amt}`}`)
      setAmount('')
      setShowHistory(false)
    } catch {
      toast.error('Transaction failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5">
      {/* Customer info */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-white font-semibold text-lg">{customer.name}</p>
          <p className="text-gray-400 text-sm">{customer.phone}</p>
          {customer.email && <p className="text-gray-500 text-xs">{customer.email}</p>}
        </div>
        <div className="text-right">
          <p className="text-[#c9a84c] text-2xl font-bold">฿{customer.balance.toLocaleString()}</p>
          <p className="text-gray-500 text-xs">wallet balance</p>
        </div>
      </div>

      {/* Transaction form */}
      <form onSubmit={processTransaction} className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setType('TOP_UP')}
            className={`py-2 rounded-lg text-sm font-medium transition-colors ${type === 'TOP_UP' ? 'bg-[#c9a84c] text-black' : 'bg-white/10 text-gray-300'}`}
          >
            Top Up
          </button>
          <button
            type="button"
            onClick={() => setType('REDEEM')}
            className={`py-2 rounded-lg text-sm font-medium transition-colors ${type === 'REDEEM' ? 'bg-red-600 text-white' : 'bg-white/10 text-gray-300'}`}
          >
            Redeem
          </button>
        </div>
        {type === 'TOP_UP' && amount && !isNaN(parseFloat(amount)) && parseFloat(amount) > 0 && (
          <p className="text-yellow-400 text-xs text-center">+฿{Math.floor(parseFloat(amount) * BONUS_RATE)} bonus included</p>
        )}
        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            placeholder="Amount ฿"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="flex-1 bg-[#1a1a1a] border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={saving}
            className="bg-[#c9a84c] hover:bg-[#b8973b] text-black font-semibold px-5 rounded-lg transition-colors disabled:opacity-50 text-sm"
          >
            {saving ? '...' : 'OK'}
          </button>
        </div>
      </form>

      {/* History toggle */}
      <button
        onClick={loadTxs}
        className="mt-3 w-full text-xs text-gray-500 hover:text-gray-300 transition-colors py-1"
      >
        {loadingTxs ? 'Loading...' : showHistory ? 'Hide history' : 'View history'}
      </button>

      {showHistory && (
        <div className="mt-3 space-y-2 border-t border-white/5 pt-3">
          {txs.length === 0 ? (
            <p className="text-gray-500 text-xs text-center">No transactions yet</p>
          ) : txs.slice(0, 10).map(tx => (
            <div key={tx.id} className="flex items-center justify-between text-xs">
              <div>
                <span className={tx.type === 'REDEEM' ? 'text-red-400' : 'text-green-400'}>{tx.type}</span>
                <span className="text-gray-600 ml-2">{new Date(tx.timestamp).toLocaleDateString('en-GB')}</span>
              </div>
              <div className="text-right">
                <span className={tx.type === 'REDEEM' ? 'text-red-400' : 'text-green-400'}>
                  {tx.type === 'REDEEM' ? '-' : '+'}฿{tx.amount}
                  {tx.bonus ? <span className="text-yellow-400"> +฿{tx.bonus}</span> : null}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Enrol Form ───────────────────────────────────────────────────────────────
function EnrolForm({ onEnrolled }: { onEnrolled: (c: LoyaltyCustomer) => void }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [saving, setSaving] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return toast.error('Name and phone required')
    setSaving(true)
    try {
      const ref = await saveLoyaltyCustomer({
        name: form.name, phone: form.phone, email: form.email,
        balance: 0, loyaltyEnabled: true,
        createdAt: new Date().toISOString(), enrolledAt: new Date().toISOString(),
      })
      await logActivity('Customer enrolled', `${form.name} (${form.phone})`, 'loyalty')
      const newCustomer: LoyaltyCustomer = { id: ref.id, ...form, balance: 0, loyaltyEnabled: true, createdAt: new Date().toISOString() }
      onEnrolled(newCustomer)
      setForm({ name: '', phone: '', email: '' })
      toast.success('Customer enrolled!')
    } catch {
      toast.error('Failed to enrol')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3">
      <p className="text-white font-semibold">Enrol New Customer</p>
      <input placeholder="Full Name *" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
        className="w-full bg-[#1a1a1a] border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm placeholder-gray-500" />
      <input placeholder="Phone *" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
        className="w-full bg-[#1a1a1a] border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm placeholder-gray-500" />
      <input placeholder="Email (optional)" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
        className="w-full bg-[#1a1a1a] border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm placeholder-gray-500" />
      <button type="submit" disabled={saving}
        className="w-full bg-[#c9a84c] hover:bg-[#b8973b] text-black font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 text-sm">
        {saving ? 'Enrolling...' : 'Enrol Customer'}
      </button>
    </form>
  )
}

// ─── Portal Main ─────────────────────────────────────────────────────────────
function Portal() {
  const [customers, setCustomers] = useState<LoyaltyCustomer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showEnrol, setShowEnrol] = useState(false)

  useEffect(() => {
    getLoyaltyCustomers().then(data => { setCustomers(data); setLoading(false) })
  }, [])

  const handleLogout = async () => {
    await signOut(auth)
  }

  const handleTransactionDone = (id: string, balance: number) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, balance } : c))
  }

  const handleEnrolled = (c: LoyaltyCustomer) => {
    setCustomers(prev => [c, ...prev])
    setShowEnrol(false)
  }

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  )

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      {/* Top bar */}
      <div className="bg-[#141414] border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-white font-semibold text-sm">Hemingways Lakeside</p>
          <p className="text-gray-500 text-xs">Staff Portal · Loyalty</p>
        </div>
        <button onClick={handleLogout} className="text-gray-400 hover:text-white">
          <LogOut size={18} />
        </button>
      </div>

      <div className="max-w-lg mx-auto p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            placeholder="Search by name or phone..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white rounded-lg pl-9 pr-4 py-3 text-sm placeholder-gray-500"
          />
        </div>

        {/* Enrol toggle */}
        <button
          onClick={() => setShowEnrol(p => !p)}
          className="w-full py-2.5 rounded-lg border border-[#c9a84c]/40 text-[#c9a84c] text-sm font-medium hover:bg-[#c9a84c]/10 transition-colors"
        >
          {showEnrol ? 'Cancel' : '+ Enrol New Customer'}
        </button>

        {showEnrol && <EnrolForm onEnrolled={handleEnrolled} />}

        {/* Customer list */}
        {loading ? (
          <p className="text-gray-500 text-sm text-center py-8">Loading...</p>
        ) : filtered.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">
            {search ? 'No customers match your search.' : 'No customers enrolled yet.'}
          </p>
        ) : (
          <div className="space-y-3">
            {filtered.map(c => (
              <CustomerCard key={c.id} customer={c} onTransactionDone={handleTransactionDone} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function StaffPortal() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, (user: any) => {
      setAuthed(!!user)
      setChecking(false)
    })
  }, [])

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    )
  }

  return (
    <>
      <Toaster position="top-center" />
      {authed ? <Portal /> : <LoginScreen onLogin={() => setAuthed(true)} />}
    </>
  )
}
