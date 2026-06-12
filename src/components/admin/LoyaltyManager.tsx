import { useEffect, useState } from 'react'
import { Plus, Search, ChevronDown, ChevronUp, X } from 'lucide-react'
import { toast } from 'sonner'
import {
  getLoyaltyCustomers,
  saveLoyaltyCustomer,
  updateLoyaltyCustomer,
  deleteLoyaltyCustomer,
  getLoyaltyTransactions,
  addLoyaltyTransaction,
} from '../../lib/firestore'
import { logActivity } from '../../utils/logger'
import { auth } from '../../lib/firebase'
import type { LoyaltyCustomer, LoyaltyTransaction, LoyaltyTxType } from '../../types'

// ─── New Customer Form ────────────────────────────────────────────────────────
function NewCustomerForm({ onSaved }: { onSaved: () => void }) {
  const [form, setForm] = useState({ name: '', phone: '', email: '' })
  const [saving, setSaving] = useState(false)

  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) return toast.error('Name and phone required')
    setSaving(true)
    try {
      await saveLoyaltyCustomer({
        name: form.name,
        phone: form.phone,
        email: form.email,
        balance: 0,
        loyaltyEnabled: true,
        createdAt: new Date().toISOString(),
        enrolledAt: new Date().toISOString(),
      })
      await logActivity('Loyalty customer created', `${form.name} (${form.phone})`, 'loyalty')
      toast.success('Customer enrolled')
      setForm({ name: '', phone: '', email: '' })
      onSaved()
    } catch {
      toast.error('Failed to enrol customer')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-white/5 rounded-lg p-4 mb-6">
      <p className="text-sm font-medium text-white mb-3">Enrol New Customer</p>
      <div className="grid grid-cols-3 gap-3">
        <input
          placeholder="Name *"
          value={form.name}
          onChange={e => set('name', e.target.value)}
          className="bg-[#1a1a1a] border border-white/10 text-white text-sm rounded px-3 py-2 placeholder-gray-500"
        />
        <input
          placeholder="Phone *"
          value={form.phone}
          onChange={e => set('phone', e.target.value)}
          className="bg-[#1a1a1a] border border-white/10 text-white text-sm rounded px-3 py-2 placeholder-gray-500"
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={e => set('email', e.target.value)}
          className="bg-[#1a1a1a] border border-white/10 text-white text-sm rounded px-3 py-2 placeholder-gray-500"
        />
      </div>
      <button
        type="submit"
        disabled={saving}
        className="mt-3 bg-[#c9a84c] hover:bg-[#b8973b] text-black text-sm font-medium px-4 py-2 rounded transition-colors disabled:opacity-50"
      >
        {saving ? 'Enrolling...' : 'Enrol Customer'}
      </button>
    </form>
  )
}

// ─── Transaction Panel ────────────────────────────────────────────────────────
function TransactionPanel({ customer, onClose, onUpdate }: { customer: LoyaltyCustomer; onClose: () => void; onUpdate: (id: string, balance: number) => void }) {
  const [txs, setTxs] = useState<LoyaltyTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState<LoyaltyTxType>('TOP_UP')
  const [amount, setAmount] = useState('')
  const [details, setDetails] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getLoyaltyTransactions(customer.id).then(data => { setTxs(data); setLoading(false) })
  }, [customer.id])

  const BONUS_RATE = 0.10

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const amt = parseFloat(amount)
    if (isNaN(amt) || amt <= 0) return toast.error('Enter a valid amount')
    setSaving(true)
    try {
      const bonus = type === 'TOP_UP' ? Math.floor(amt * BONUS_RATE) : 0
      const delta = type === 'REDEEM' || type === 'ADJUSTMENT' ? -amt : amt + bonus
      const balanceAfter = Math.max(0, customer.balance + delta)

      const tx: Omit<LoyaltyTransaction, 'id'> = {
        type,
        amount: amt,
        bonus: bonus || undefined,
        balanceAfter,
        details: details || `${type} by ${auth.currentUser?.email ?? 'staff'}`,
        processedBy: auth.currentUser?.email ?? 'unknown',
        timestamp: new Date().toISOString(),
      }

      await addLoyaltyTransaction(customer.id, tx)
      await updateLoyaltyCustomer(customer.id, { balance: balanceAfter })
      await logActivity(`Loyalty ${type}`, `${customer.name}: ฿${amt}${bonus ? ` + ฿${bonus} bonus` : ''}, balance ฿${balanceAfter}`, 'loyalty')

      setTxs(prev => [{ ...tx, id: Date.now().toString() }, ...prev])
      onUpdate(customer.id, balanceAfter)
      toast.success(`${type} processed`)
      setAmount('')
      setDetails('')
    } catch {
      toast.error('Transaction failed')
    } finally {
      setSaving(false)
    }
  }

  const TX_COLOURS: Record<LoyaltyTxType, string> = {
    TOP_UP: 'text-green-400',
    BONUS: 'text-yellow-400',
    REDEEM: 'text-red-400',
    ADJUSTMENT: 'text-gray-400',
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-[#141414] border border-white/10 rounded-xl w-full max-w-lg max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5">
          <div>
            <p className="text-white font-semibold">{customer.name}</p>
            <p className="text-gray-400 text-sm">{customer.phone} · Balance: <span className="text-[#c9a84c] font-semibold">฿{customer.balance.toLocaleString()}</span></p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white"><X size={20} /></button>
        </div>

        {/* New transaction form */}
        <form onSubmit={submit} className="p-5 border-b border-white/5 space-y-3">
          <p className="text-sm font-medium text-white">New Transaction</p>
          <div className="grid grid-cols-2 gap-3">
            <select
              value={type}
              onChange={e => setType(e.target.value as LoyaltyTxType)}
              className="bg-[#1a1a1a] border border-white/10 text-white text-sm rounded px-3 py-2"
            >
              <option value="TOP_UP">Top Up (+10% bonus)</option>
              <option value="REDEEM">Redeem</option>
              <option value="ADJUSTMENT">Adjustment</option>
            </select>
            <input
              type="number"
              min="1"
              placeholder="Amount ฿"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="bg-[#1a1a1a] border border-white/10 text-white text-sm rounded px-3 py-2 placeholder-gray-500"
            />
          </div>
          {type === 'TOP_UP' && amount && !isNaN(parseFloat(amount)) && (
            <p className="text-yellow-400 text-xs">+ ฿{Math.floor(parseFloat(amount) * BONUS_RATE)} bonus</p>
          )}
          <input
            placeholder="Notes (optional)"
            value={details}
            onChange={e => setDetails(e.target.value)}
            className="w-full bg-[#1a1a1a] border border-white/10 text-white text-sm rounded px-3 py-2 placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={saving}
            className="bg-[#c9a84c] hover:bg-[#b8973b] text-black text-sm font-medium px-4 py-2 rounded transition-colors disabled:opacity-50"
          >
            {saving ? 'Processing...' : 'Process'}
          </button>
        </form>

        {/* Transaction history */}
        <div className="flex-1 overflow-y-auto p-5">
          <p className="text-sm font-medium text-white mb-3">History</p>
          {loading ? (
            <p className="text-gray-500 text-sm">Loading...</p>
          ) : txs.length === 0 ? (
            <p className="text-gray-500 text-sm">No transactions yet.</p>
          ) : (
            <div className="space-y-2">
              {txs.map(tx => (
                <div key={tx.id} className="flex items-center justify-between text-sm py-2 border-b border-white/5">
                  <div>
                    <span className={`font-medium ${TX_COLOURS[tx.type]}`}>{tx.type}</span>
                    {tx.details && <span className="text-gray-400 text-xs ml-2">{tx.details}</span>}
                    <p className="text-gray-600 text-xs">{new Date(tx.timestamp).toLocaleString('en-GB', { timeZone: 'Asia/Bangkok' })}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${tx.type === 'REDEEM' ? 'text-red-400' : 'text-green-400'}`}>
                      {tx.type === 'REDEEM' ? '-' : '+'}฿{tx.amount.toLocaleString()}
                      {tx.bonus ? <span className="text-yellow-400 text-xs ml-1">+฿{tx.bonus}</span> : null}
                    </p>
                    <p className="text-gray-500 text-xs">Balance ฿{tx.balanceAfter.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function LoyaltyManager() {
  const [customers, setCustomers] = useState<LoyaltyCustomer[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<LoyaltyCustomer | null>(null)
  const [showForm, setShowForm] = useState(false)

  const load = async () => {
    setLoading(true)
    const data = await getLoyaltyCustomers()
    setCustomers(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete ${name}? This cannot be undone.`)) return
    await deleteLoyaltyCustomer(id)
    await logActivity('Loyalty customer deleted', name, 'loyalty')
    setCustomers(prev => prev.filter(c => c.id !== id))
    toast.success('Customer removed')
  }

  const handleBalanceUpdate = (id: string, balance: number) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, balance } : c))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, balance } : null)
  }

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  )

  const totalBalance = customers.reduce((s, c) => s + c.balance, 0)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-white">Loyalty & Payments</h2>
          <p className="text-gray-400 text-sm">{customers.length} customers · Total wallet ฿{totalBalance.toLocaleString()}</p>
        </div>
        <button
          onClick={() => setShowForm(p => !p)}
          className="flex items-center gap-2 bg-[#c9a84c] hover:bg-[#b8973b] text-black text-sm font-medium px-4 py-2 rounded transition-colors"
        >
          <Plus size={16} />
          Enrol Customer
          {showForm ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {showForm && <NewCustomerForm onSaved={() => { load(); setShowForm(false) }} />}

      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          placeholder="Search name or phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 text-white text-sm rounded pl-9 pr-4 py-2 placeholder-gray-500"
        />
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">No customers found.</p>
      ) : (
        <div className="space-y-2">
          {filtered.map(c => (
            <div key={c.id} className="bg-white/5 rounded-lg p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">{c.name}</p>
                <p className="text-gray-400 text-xs">{c.phone}{c.email ? ` · ${c.email}` : ''}</p>
              </div>
              <div className="text-right">
                <p className="text-[#c9a84c] font-semibold">฿{c.balance.toLocaleString()}</p>
                <p className="text-gray-600 text-xs">balance</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelected(c)}
                  className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded transition-colors"
                >
                  Manage
                </button>
                <button
                  onClick={() => handleDelete(c.id, c.name)}
                  className="text-xs text-red-400 hover:text-red-300 px-2 py-1.5 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <TransactionPanel
          customer={selected}
          onClose={() => setSelected(null)}
          onUpdate={handleBalanceUpdate}
        />
      )}
    </div>
  )
}
