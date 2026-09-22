import { useState } from 'react'
import { toast } from 'sonner'
import { Bell } from 'lucide-react'
import { submitPublicSignup } from '../lib/signup'
import { trackEnquirySubmit } from '../lib/analytics'

/**
 * Newsletter sign-up → CRM (source 'newsletter', tag 'newsletter').
 * `variant="footer"` is the compact dark strip used on every page; `"section"` is the
 * full-width cream block on the homepage.
 */
export default function NewsletterSignup({ variant = 'footer' }: { variant?: 'footer' | 'section' }) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email)) { toast.error('Please enter a valid email'); return }
    setLoading(true)
    try {
      await submitPublicSignup({ name: name.trim() || email.split('@')[0], email, source: 'newsletter', tag: 'newsletter' })
      trackEnquirySubmit('newsletter')
      setDone(true)
    } catch {
      toast.error('Could not sign you up - please try again')
    } finally {
      setLoading(false)
    }
  }

  if (variant === 'section') {
    return (
      <section className="py-20 px-4 bg-[#1a1512] border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Stay In The Loop</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">Know About Events First. Get Exclusive Offers.</h2>
          <p className="text-gray-400 mb-8">Live sport, quiz nights, party deals and members-only specials - straight to your inbox, no spam.</p>
          {done ? (
            <p className="text-[#c9a84c] font-semibold">You're on the list - see you at the lake.</p>
          ) : (
            <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <input value={name} onChange={e => setName(e.target.value)} placeholder="First name" className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#c9a84c]/60" />
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="Email address" className="flex-[1.4] bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#c9a84c]/60" />
              <button type="submit" disabled={loading} className="px-6 py-3 bg-[#c9a84c] hover:bg-[#b8973d] disabled:opacity-50 text-black font-bold text-sm tracking-widest uppercase rounded-lg transition-colors">
                {loading ? 'Joining…' : 'Sign Up'}
              </button>
            </form>
          )}
          <p className="text-gray-600 text-xs mt-4">By signing up you agree to receive emails from Hemingways Lakeside. Unsubscribe any time.</p>
        </div>
      </section>
    )
  }

  return (
    <div>
      <h4 className="text-white text-xs tracking-widest uppercase mb-3 flex items-center gap-2"><Bell size={12} className="text-[#c9a84c]" /> Events & Offers</h4>
      <p className="text-gray-500 text-sm mb-4">Know about events first and get exclusive offers.</p>
      {done ? (
        <p className="text-[#c9a84c] text-sm">You're on the list.</p>
      ) : (
        <form onSubmit={submit} className="flex gap-2">
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="Email address" aria-label="Email address"
            className="min-w-0 flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#c9a84c]/60" />
          <button type="submit" disabled={loading} className="px-3 py-2 bg-[#c9a84c] hover:bg-[#b8973d] disabled:opacity-50 text-black font-bold text-xs tracking-wider uppercase rounded-lg transition-colors">
            {loading ? '…' : 'Join'}
          </button>
        </form>
      )}
    </div>
  )
}
