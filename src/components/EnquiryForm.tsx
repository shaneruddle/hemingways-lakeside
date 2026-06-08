import { useState } from 'react'
import { toast } from 'sonner'
import { submitEnquiry } from '../lib/firestore'
import type { Enquiry } from '../types'

interface Props {
  type?: Enquiry['type']
  title?: string
  subtitle?: string
}

export default function EnquiryForm({ type = 'general', title = 'Make an Enquiry', subtitle }: Props) {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    guestCount: '',
    message: '',
  })

  const set = (key: string, val: string) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone) {
      toast.error('Name and phone are required')
      return
    }
    setLoading(true)
    try {
      await submitEnquiry({
        name: form.name,
        phone: form.phone,
        email: form.email,
        type,
        message: form.message,
        date: form.date,
        guestCount: form.guestCount ? parseInt(form.guestCount) : undefined,
      })
      toast.success("Thanks! We'll be in touch soon.")
      setForm({ name: '', phone: '', email: '', date: '', guestCount: '', message: '' })
    } catch {
      toast.error('Something went wrong. Please call us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      {subtitle && <p className="text-gray-500 text-sm mb-6">{subtitle}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2">Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="Your name"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2">Phone *</label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => set('phone', e.target.value)}
              placeholder="Your phone number"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={e => set('email', e.target.value)}
            placeholder="your@email.com"
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
          />
        </div>

        {(type === 'birthday' || type === 'kids_party' || type === 'pool' || type === 'corporate' || type === 'event') && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2">Preferred Date</label>
              <input
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2">Number of Guests</label>
              <input
                type="number"
                value={form.guestCount}
                onChange={e => set('guestCount', e.target.value)}
                placeholder="Est. guests"
                min="1"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
              />
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs tracking-wider uppercase text-gray-500 mb-2">Message</label>
          <textarea
            value={form.message}
            onChange={e => set('message', e.target.value)}
            placeholder="Tell us about your event or enquiry..."
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/50 transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#c9a84c] hover:bg-[#b8973d] disabled:opacity-50 text-black font-bold text-sm tracking-widest uppercase rounded-lg transition-colors"
        >
          {loading ? 'Sending...' : 'Send Enquiry'}
        </button>

        <p className="text-center text-gray-600 text-xs">
          Or call us directly:{' '}
          <a href="tel:0642400222" className="text-[#c9a84c] hover:underline">
            064-240-0222
          </a>
        </p>
      </form>
    </div>
  )
}
