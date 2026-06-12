import { useEffect, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { getExpenses, saveExpense, deleteExpense, getIncome, saveIncome, deleteIncome } from '../../lib/firestore'
import { logActivity } from '../../utils/logger'
import { auth } from '../../lib/firebase'
import type { Expense, Income, ExpenseCategory, IncomeCategory } from '../../types'

const EXPENSE_CATS: ExpenseCategory[] = ['food', 'drinks', 'utilities', 'staff', 'equipment', 'rent', 'marketing', 'repairs', 'other']
const INCOME_CATS: IncomeCategory[] = ['food', 'drinks', 'events', 'pool', 'other']

function currentMonth() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

// ─── Expense Form ─────────────────────────────────────────────────────────────
function ExpenseForm({ onSaved }: { onSaved: () => void }) {
  const empty = { date: new Date().toISOString().slice(0, 10), category: 'food' as ExpenseCategory, description: '', amount: '', notes: '' }
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const amt = parseFloat(form.amount)
    if (!form.description || isNaN(amt) || amt <= 0) return toast.error('Fill in all required fields')
    setSaving(true)
    try {
      await saveExpense({
        date: form.date,
        category: form.category,
        description: form.description,
        amount: amt,
        notes: form.notes || undefined,
        loggedBy: auth.currentUser?.email ?? 'unknown',
        createdAt: new Date().toISOString(),
      })
      await logActivity('Expense logged', `${form.category}: ${form.description} ฿${amt}`, 'finance')
      toast.success('Expense saved')
      setForm(empty)
      onSaved()
    } catch {
      toast.error('Failed to save expense')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-2 gap-3">
      <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
        className="bg-[#1a1a1a] border border-white/10 text-white text-sm rounded px-3 py-2" />
      <select value={form.category} onChange={e => set('category', e.target.value)}
        className="bg-[#1a1a1a] border border-white/10 text-white text-sm rounded px-3 py-2 capitalize">
        {EXPENSE_CATS.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <input placeholder="Description *" value={form.description} onChange={e => set('description', e.target.value)}
        className="bg-[#1a1a1a] border border-white/10 text-white text-sm rounded px-3 py-2 placeholder-gray-500" />
      <input type="number" placeholder="Amount ฿ *" value={form.amount} onChange={e => set('amount', e.target.value)}
        className="bg-[#1a1a1a] border border-white/10 text-white text-sm rounded px-3 py-2 placeholder-gray-500" />
      <input placeholder="Notes" value={form.notes} onChange={e => set('notes', e.target.value)}
        className="col-span-2 bg-[#1a1a1a] border border-white/10 text-white text-sm rounded px-3 py-2 placeholder-gray-500" />
      <button type="submit" disabled={saving}
        className="col-span-2 bg-[#c9a84c] hover:bg-[#b8973b] text-black text-sm font-medium py-2 rounded transition-colors disabled:opacity-50">
        {saving ? 'Saving...' : 'Add Expense'}
      </button>
    </form>
  )
}

// ─── Income Form ──────────────────────────────────────────────────────────────
function IncomeForm({ onSaved }: { onSaved: () => void }) {
  const empty = { date: new Date().toISOString().slice(0, 10), category: 'food' as IncomeCategory, amount: '', notes: '' }
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  const set = (k: keyof typeof form, v: string) => setForm(p => ({ ...p, [k]: v }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const amt = parseFloat(form.amount)
    if (isNaN(amt) || amt <= 0) return toast.error('Enter a valid amount')
    setSaving(true)
    try {
      await saveIncome({
        date: form.date,
        category: form.category,
        amount: amt,
        notes: form.notes || undefined,
        loggedBy: auth.currentUser?.email ?? 'unknown',
        createdAt: new Date().toISOString(),
      })
      await logActivity('Income logged', `${form.category}: ฿${amt}`, 'finance')
      toast.success('Income saved')
      setForm(empty)
      onSaved()
    } catch {
      toast.error('Failed to save income')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-2 gap-3">
      <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
        className="bg-[#1a1a1a] border border-white/10 text-white text-sm rounded px-3 py-2" />
      <select value={form.category} onChange={e => set('category', e.target.value)}
        className="bg-[#1a1a1a] border border-white/10 text-white text-sm rounded px-3 py-2 capitalize">
        {INCOME_CATS.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <input type="number" placeholder="Amount ฿ *" value={form.amount} onChange={e => set('amount', e.target.value)}
        className="col-span-2 bg-[#1a1a1a] border border-white/10 text-white text-sm rounded px-3 py-2 placeholder-gray-500" />
      <input placeholder="Notes" value={form.notes} onChange={e => set('notes', e.target.value)}
        className="col-span-2 bg-[#1a1a1a] border border-white/10 text-white text-sm rounded px-3 py-2 placeholder-gray-500" />
      <button type="submit" disabled={saving}
        className="col-span-2 bg-green-700 hover:bg-green-600 text-white text-sm font-medium py-2 rounded transition-colors disabled:opacity-50">
        {saving ? 'Saving...' : 'Add Income'}
      </button>
    </form>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function FinanceManager() {
  const [tab, setTab] = useState<'expenses' | 'income'>('expenses')
  const [month, setMonth] = useState(currentMonth())
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [income, setIncome] = useState<Income[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  const load = async () => {
    setLoading(true)
    const [exp, inc] = await Promise.all([getExpenses(month), getIncome(month)])
    setExpenses(exp)
    setIncome(inc)
    setLoading(false)
  }

  useEffect(() => { load() }, [month])

  const handleDeleteExpense = async (id: string) => {
    if (!confirm('Delete this expense?')) return
    await deleteExpense(id)
    setExpenses(prev => prev.filter(e => e.id !== id))
    toast.success('Deleted')
  }

  const handleDeleteIncome = async (id: string) => {
    if (!confirm('Delete this income entry?')) return
    await deleteIncome(id)
    setIncome(prev => prev.filter(i => i.id !== id))
    toast.success('Deleted')
  }

  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0)
  const totalIncome = income.reduce((s, i) => s + i.amount, 0)
  const profit = totalIncome - totalExpenses

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Finance</h2>
        <div className="flex items-center gap-3">
          <input
            type="month"
            value={month}
            onChange={e => setMonth(e.target.value)}
            className="bg-[#1a1a1a] border border-white/10 text-white text-sm rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-gray-400 text-xs mb-1">Income</p>
          <p className="text-green-400 text-xl font-bold">฿{totalIncome.toLocaleString()}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-gray-400 text-xs mb-1">Expenses</p>
          <p className="text-red-400 text-xl font-bold">฿{totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-white/5 rounded-lg p-4">
          <p className="text-gray-400 text-xs mb-1">Profit</p>
          <p className={`text-xl font-bold ${profit >= 0 ? 'text-[#c9a84c]' : 'text-red-400'}`}>
            ฿{profit.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => { setTab('expenses'); setShowForm(false) }}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${tab === 'expenses' ? 'bg-[#c9a84c] text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}
        >
          Expenses ({expenses.length})
        </button>
        <button
          onClick={() => { setTab('income'); setShowForm(false) }}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${tab === 'income' ? 'bg-[#c9a84c] text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}
        >
          Income ({income.length})
        </button>
        <button
          onClick={() => setShowForm(p => !p)}
          className="ml-auto flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded transition-colors"
        >
          <Plus size={14} />
          Add {tab === 'expenses' ? 'Expense' : 'Income'}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white/5 rounded-lg p-4 mb-4">
          {tab === 'expenses'
            ? <ExpenseForm onSaved={() => { load(); setShowForm(false) }} />
            : <IncomeForm onSaved={() => { load(); setShowForm(false) }} />}
        </div>
      )}

      {/* List */}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : tab === 'expenses' ? (
        expenses.length === 0 ? (
          <p className="text-gray-500 text-sm">No expenses for this month.</p>
        ) : (
          <div className="space-y-2">
            {expenses.map(e => (
              <div key={e.id} className="bg-white/5 rounded-lg p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium">{e.description}</p>
                  <p className="text-gray-400 text-xs capitalize">{e.category} · {e.date} · {e.loggedBy}</p>
                  {e.notes && <p className="text-gray-500 text-xs">{e.notes}</p>}
                </div>
                <p className="text-red-400 font-semibold">฿{e.amount.toLocaleString()}</p>
                <button onClick={() => handleDeleteExpense(e.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )
      ) : (
        income.length === 0 ? (
          <p className="text-gray-500 text-sm">No income for this month.</p>
        ) : (
          <div className="space-y-2">
            {income.map(i => (
              <div key={i.id} className="bg-white/5 rounded-lg p-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium capitalize">{i.category}</p>
                  <p className="text-gray-400 text-xs">{i.date} · {i.loggedBy}</p>
                  {i.notes && <p className="text-gray-500 text-xs">{i.notes}</p>}
                </div>
                <p className="text-green-400 font-semibold">฿{i.amount.toLocaleString()}</p>
                <button onClick={() => handleDeleteIncome(i.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}
