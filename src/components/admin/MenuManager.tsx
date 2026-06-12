import { useState, useEffect, useRef } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../lib/firebase'
import {
  getMenuCategories, saveMenuCategory, updateMenuCategory, deleteMenuCategory,
  getDigitalMenuItems, saveDigitalMenuItem, updateDigitalMenuItem, deleteDigitalMenuItem,
} from '../../lib/firestore'
import type { DigitalMenuCategory, DigitalMenuItem } from '../../types'
import { toast } from 'sonner'
import { Plus, Trash2, Edit2, X, ImageIcon, Upload, Eye, EyeOff, ChevronDown, ChevronUp } from 'lucide-react'

// ── Category Manager ──────────────────────────────────────────────────────────
function CategoryManager({
  categories, onRefresh,
}: { categories: DigitalMenuCategory[]; onRefresh: () => void }) {
  const [newName, setNewName] = useState('')
  const [saving, setSaving] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')

  const handleAdd = async () => {
    if (!newName.trim()) return
    setSaving(true)
    try {
      await saveMenuCategory({ name: newName.trim(), order: categories.length })
      toast.success('Category added')
      setNewName('')
      onRefresh()
    } catch { toast.error('Failed to add') } finally { setSaving(false) }
  }

  const handleRename = async (id: string) => {
    if (!editName.trim()) return
    try {
      await updateMenuCategory(id, { name: editName.trim() })
      toast.success('Renamed')
      setEditId(null)
      onRefresh()
    } catch { toast.error('Failed to rename') }
  }

  const handleDelete = async (cat: DigitalMenuCategory) => {
    if (!confirm(`Delete category "${cat.name}"? Items in this category won't be deleted.`)) return
    try {
      await deleteMenuCategory(cat.id)
      toast.success('Deleted')
      onRefresh()
    } catch { toast.error('Failed to delete') }
  }

  return (
    <div className="bg-[#141414] border border-white/10 rounded-xl p-5 space-y-4">
      <h3 className="text-white font-semibold">Categories</h3>

      {/* Add */}
      <div className="flex gap-2">
        <input
          value={newName}
          onChange={e => setNewName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') handleAdd() }}
          placeholder="New category name…"
          className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c9a84c]/50"
        />
        <button
          onClick={handleAdd}
          disabled={saving || !newName.trim()}
          className="px-4 py-2 bg-[#c9a84c] text-black text-sm font-semibold rounded-lg hover:bg-[#d4b05a] disabled:opacity-40 transition-colors"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* List */}
      <div className="space-y-2">
        {categories.map(cat => (
          <div key={cat.id} className="flex items-center gap-2 bg-black/20 rounded-lg px-3 py-2">
            {editId === cat.id ? (
              <>
                <input
                  autoFocus
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleRename(cat.id); if (e.key === 'Escape') setEditId(null) }}
                  className="flex-1 bg-black/40 border border-white/10 rounded px-2 py-1 text-white text-sm focus:outline-none"
                />
                <button onClick={() => handleRename(cat.id)} className="text-[#c9a84c] hover:text-white text-xs px-2">Save</button>
                <button onClick={() => setEditId(null)} className="text-gray-600 hover:text-white"><X size={13} /></button>
              </>
            ) : (
              <>
                <span className="flex-1 text-white text-sm">{cat.name}</span>
                <button onClick={() => { setEditId(cat.id); setEditName(cat.name) }} className="text-gray-600 hover:text-white p-1"><Edit2 size={13} /></button>
                <button onClick={() => handleDelete(cat)} className="text-gray-600 hover:text-red-400 p-1"><Trash2 size={13} /></button>
              </>
            )}
          </div>
        ))}
        {categories.length === 0 && <p className="text-gray-700 text-sm">No categories yet.</p>}
      </div>
    </div>
  )
}

// ── Item Form ─────────────────────────────────────────────────────────────────
const emptyForm = {
  name: '', description: '', price: '', price2: '', price2Label: '', priceLabel: '',
  category: '', available: true, order: 0, imageUrl: '',
}

function ItemForm({
  categories, initial, onSave, onCancel,
}: {
  categories: DigitalMenuCategory[]
  initial?: DigitalMenuItem
  onSave: (data: Omit<DigitalMenuItem, 'id'>) => Promise<void>
  onCancel: () => void
}) {
  const [form, setForm] = useState(initial ? {
    name: initial.name,
    description: initial.description,
    price: initial.price,
    price2: initial.price2 ?? '',
    price2Label: initial.price2Label ?? '',
    priceLabel: initial.priceLabel ?? '',
    category: initial.category,
    available: initial.available,
    order: initial.order,
    imageUrl: initial.imageUrl ?? '',
  } : { ...emptyForm, category: categories[0]?.name ?? '' })

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(initial?.imageUrl ?? null)
  const [saving, setSaving] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const setField = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    if (!form.name.trim()) { toast.error('Name required'); return }
    if (!form.price.trim()) { toast.error('Price required'); return }
    if (!form.category) { toast.error('Category required'); return }
    setSaving(true)
    try {
      let imageUrl = form.imageUrl
      if (imageFile) {
        const ext = imageFile.name.split('.').pop()
        const path = `digital-menu/${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`
        const storageRef = ref(storage, path)
        await uploadBytes(storageRef, imageFile)
        imageUrl = await getDownloadURL(storageRef)
      }
      await onSave({
        name: form.name.trim(),
        description: form.description.trim(),
        price: form.price.trim(),
        price2: form.price2.trim() || undefined,
        price2Label: form.price2Label.trim() || undefined,
        priceLabel: form.priceLabel.trim() || undefined,
        category: form.category,
        available: form.available,
        order: Number(form.order) || 0,
        imageUrl: imageUrl || undefined,
      })
    } catch (err: any) {
      toast.error(err?.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-[#141414] border border-white/10 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">{initial ? 'Edit Item' : 'New Item'}</h3>
        <button onClick={onCancel} className="text-gray-500 hover:text-white"><X size={16} /></button>
      </div>

      {/* Image */}
      <div
        onClick={() => fileRef.current?.click()}
        className="border-2 border-dashed border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-white/20 transition-colors"
      >
        {imagePreview ? (
          <img src={imagePreview} alt="" className="w-full max-h-52 object-cover" />
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-gray-600">
            <ImageIcon size={28} className="mb-2" />
            <span className="text-sm">Click to upload photo</span>
          </div>
        )}
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

      {/* Name + Category */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Name *</label>
          <input value={form.name} onChange={e => setField('name', e.target.value)} placeholder="e.g. Fish & Chips"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c9a84c]/50" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Category *</label>
          <select value={form.category} onChange={e => setField('category', e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c9a84c]/50">
            {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Description</label>
        <textarea value={form.description} onChange={e => setField('description', e.target.value)}
          rows={2} placeholder="Brief description of the dish…"
          className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-[#c9a84c]/50" />
      </div>

      {/* Prices */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Price ฿ *</label>
          <input value={form.price} onChange={e => setField('price', e.target.value)} placeholder="295"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c9a84c]/50" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Price Label <span className="text-gray-700">(optional)</span></label>
          <input value={form.priceLabel} onChange={e => setField('priceLabel', e.target.value)} placeholder="e.g. Full"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c9a84c]/50" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">2nd Price ฿ <span className="text-gray-700">(optional)</span></label>
          <input value={form.price2} onChange={e => setField('price2', e.target.value)} placeholder="e.g. 185"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c9a84c]/50" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">2nd Price Label <span className="text-gray-700">(optional)</span></label>
          <input value={form.price2Label} onChange={e => setField('price2Label', e.target.value)} placeholder="e.g. Half"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c9a84c]/50" />
        </div>
      </div>

      {/* Order + Available */}
      <div className="flex items-center gap-4">
        <div className="w-28">
          <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Sort Order</label>
          <input type="number" value={form.order} onChange={e => setField('order', e.target.value)}
            className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c9a84c]/50" />
        </div>
        <label className="flex items-center gap-2 cursor-pointer mt-4">
          <input type="checkbox" checked={form.available} onChange={e => setField('available', e.target.checked)} className="w-4 h-4 accent-[#c9a84c]" />
          <span className="text-sm text-gray-400">Available</span>
        </label>
      </div>

      <div className="flex gap-3 pt-1">
        <button onClick={handleSubmit} disabled={saving}
          className="flex-1 bg-[#c9a84c] text-black py-2.5 rounded-lg font-semibold text-sm hover:bg-[#d4b05a] disabled:opacity-50 transition-colors">
          {saving ? 'Saving…' : initial ? 'Save Changes' : 'Add Item'}
        </button>
        <button onClick={onCancel}
          className="px-5 py-2.5 bg-white/5 text-gray-400 text-sm rounded-lg hover:text-white transition-colors">
          Cancel
        </button>
      </div>
    </div>
  )
}

// ── Main MenuManager ──────────────────────────────────────────────────────────
export default function MenuManager() {
  const [categories, setCategories] = useState<DigitalMenuCategory[]>([])
  const [items, setItems] = useState<DigitalMenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showItemForm, setShowItemForm] = useState(false)
  const [editItem, setEditItem] = useState<DigitalMenuItem | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [showCategories, setShowCategories] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const [cats, its] = await Promise.all([getMenuCategories(), getDigitalMenuItems()])
      setCategories(cats)
      setItems(its)
    } finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  const visibleItems = activeCategory === 'All'
    ? items
    : items.filter(i => i.category === activeCategory)

  const handleSaveNew = async (data: Omit<DigitalMenuItem, 'id'>) => {
    await saveDigitalMenuItem(data)
    toast.success('Item added')
    setShowItemForm(false)
    await load()
  }

  const handleSaveEdit = async (data: Omit<DigitalMenuItem, 'id'>) => {
    if (!editItem) return
    await updateDigitalMenuItem(editItem.id, data)
    toast.success('Item updated')
    setEditItem(null)
    await load()
  }

  const handleToggleAvailable = async (item: DigitalMenuItem) => {
    await updateDigitalMenuItem(item.id, { available: !item.available })
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, available: !i.available } : i))
  }

  const handleDelete = async (item: DigitalMenuItem) => {
    if (!confirm(`Delete "${item.name}"?`)) return
    await deleteDigitalMenuItem(item.id)
    toast.success('Deleted')
    setItems(prev => prev.filter(i => i.id !== item.id))
  }

  if (editItem) {
    return (
      <ItemForm
        categories={categories}
        initial={editItem}
        onSave={handleSaveEdit}
        onCancel={() => setEditItem(null)}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-sm">{items.length} item{items.length !== 1 ? 's' : ''}</p>
        <div className="flex gap-2">
          <a
            href="/digital-menu"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-white/5 text-gray-400 hover:text-white text-sm rounded-lg transition-colors"
          >
            Preview ↗
          </a>
          <button
            onClick={() => setShowCategories(v => !v)}
            className="flex items-center gap-1.5 px-4 py-2 bg-white/5 text-gray-400 hover:text-white text-sm rounded-lg transition-colors"
          >
            Categories {showCategories ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          </button>
          <button
            onClick={() => { setShowItemForm(true); setEditItem(null) }}
            className="flex items-center gap-2 px-4 py-2 bg-[#c9a84c] text-black font-bold text-sm rounded-lg hover:bg-[#b8973d] transition-colors"
          >
            <Plus size={14} /> Add Item
          </button>
        </div>
      </div>

      {/* Category manager (collapsible) */}
      {showCategories && (
        <CategoryManager categories={categories} onRefresh={load} />
      )}

      {/* New item form */}
      {showItemForm && (
        <ItemForm
          categories={categories}
          onSave={handleSaveNew}
          onCancel={() => setShowItemForm(false)}
        />
      )}

      {/* Category filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {['All', ...categories.map(c => c.name)].map(name => (
          <button
            key={name}
            onClick={() => setActiveCategory(name)}
            className={`px-4 py-1.5 rounded-full text-xs transition-colors ${
              activeCategory === name
                ? 'bg-[#c9a84c] text-black font-bold'
                : 'bg-white/5 text-gray-500 hover:text-white'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Items list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="bg-[#141414] rounded-xl h-20 animate-pulse" />)}
        </div>
      ) : visibleItems.length === 0 ? (
        <p className="text-center text-gray-600 py-16">
          {items.length === 0 ? 'No items yet. Add your first one above.' : 'No items in this category.'}
        </p>
      ) : (
        <div className="space-y-2">
          {visibleItems.map(item => (
            <div key={item.id} className="bg-[#141414] border border-white/5 rounded-xl p-4 flex items-center gap-4">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <ImageIcon size={16} className="text-gray-700" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-white font-semibold text-sm truncate">{item.name}</span>
                  {!item.available && (
                    <span className="text-xs bg-gray-500/20 text-gray-500 px-1.5 py-0.5 rounded-full shrink-0">Off</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span className="text-[#c9a84c]">
                    ฿{item.price}
                    {item.price2 && item.price2Label && ` / ฿${item.price2} ${item.price2Label}`}
                  </span>
                  <span className="bg-white/5 px-1.5 py-0.5 rounded text-gray-500">{item.category}</span>
                </div>
                {item.description && (
                  <p className="text-gray-600 text-xs truncate mt-0.5">{item.description}</p>
                )}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleToggleAvailable(item)}
                  title={item.available ? 'Mark unavailable' : 'Mark available'}
                  className={`p-2 transition-colors ${item.available ? 'text-green-400 hover:text-gray-400' : 'text-gray-600 hover:text-green-400'}`}
                >
                  {item.available ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button onClick={() => setEditItem(item)} className="p-2 text-gray-600 hover:text-white transition-colors">
                  <Edit2 size={15} />
                </button>
                <button onClick={() => handleDelete(item)} className="p-2 text-gray-600 hover:text-red-400 transition-colors">
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
