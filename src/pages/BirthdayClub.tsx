import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { IceCreamCone, Cake, Bell } from 'lucide-react'
import Seo from '../components/Seo'
import { submitPublicSignup } from '../lib/signup'
import { trackEnquirySubmit } from '../lib/analytics'

const perks = [
  {
    icon: IceCreamCone,
    title: 'A free birthday dessert',
    th: 'ของหวานฟรีในวันเกิดของคุณ',
    desc: 'A free dessert on us in your birthday week - for you, or for the kids.',
  },
  {
    icon: Bell,
    title: 'First to hear',
    th: 'รับข่าวโปรโมชันจัดงานวันเกิดก่อนใคร',
    desc: 'Events, party offers and specials, before we post them anywhere else.',
  },
  {
    icon: Cake,
    title: 'Party planning, sorted',
    th: 'สระว่ายน้ำ ห้องเล่นเด็ก อาหาร และเค้ก ครบในที่เดียว',
    desc: 'Pool, playroom, food and cake in one lakeside venue when the big day comes round.',
  },
]

/**
 * Birthday Club sign-up (QR code on the in-venue poster points here).
 * Anyone can join - adults or kids. Stored straight in the CRM (crm_contacts) with the
 * full date of birth and a 'birthday' tag, via the public-signup Firestore rule.
 */
export default function BirthdayClub() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', dob: '', forWhom: '', consent: false })

  const set = (key: string, val: string | boolean) => setForm(f => ({ ...f, [key]: val }))
  const today = new Date().toISOString().slice(0, 10)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.dob) {
      toast.error('Name, phone/LINE and date of birth are required')
      return
    }
    if (form.dob > today || form.dob < '1920-01-01') {
      toast.error('Please check the date of birth')
      return
    }
    if (!form.consent) {
      toast.error('Please tick the box so we can message you')
      return
    }
    setLoading(true)
    const month = parseInt(form.dob.slice(5, 7))
    try {
      await submitPublicSignup({
        name: form.name,
        phone: form.phone,
        email: form.email,
        dob: form.dob,
        source: 'birthday',
        tag: 'birthday',
        notes: form.forWhom ? `Birthday Club - birthday is for: ${form.forWhom}` : 'Birthday Club',
      })
      trackEnquirySubmit('birthday_club', { birth_month: month })
      setDone(true)
    } catch {
      toast.error('Something went wrong. Please ask a member of staff.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full bg-white border border-black/10 rounded-lg px-4 py-3 text-sm text-[#1a1512] placeholder-gray-400 focus:outline-none focus:border-[#c9a84c] transition-colors'
  const labelClass = 'block text-xs tracking-wider uppercase text-[#5c5346] mb-2'

  return (
    <div>
      <Seo
        title="Birthday Club"
        description="Join the Hemingways Lakeside Birthday Club - a free dessert on your birthday, for adults and kids, plus first word on events and offers at our lakeside venue in East Pattaya."
      />

      {/* Hero */}
      <section className="px-4 pt-40 pb-16 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Hemingways Lakeside</p>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">Free Dessert On Your Birthday</h1>
          <p className="text-2xl text-gray-200 mb-4">สมัคร Birthday Club ฟรี · รับของหวานฟรีวันเกิด</p>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Tell us your birthday and we'll treat you to a free dessert when it comes round. Adults and kids welcome. Takes 30 seconds.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 px-4 bg-[#f6efe0]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {perks.map(({ icon: Icon, title, th, desc }) => (
            <div key={title} className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center mb-4">
                <Icon size={20} className="text-[#8a6d2f]" />
              </div>
              <h2 className="text-[#1a1512] font-bold text-lg mb-1">{title}</h2>
              <p className="text-[#5c5346] text-sm mb-2">{desc}</p>
              <p className="text-[#8a6d2f] text-sm">{th}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sign-up */}
      <section className="py-16 px-4 bg-[#f6efe0]">
        <div className="max-w-xl mx-auto bg-white border border-black/5 rounded-3xl p-8 sm:p-10 shadow-sm">
          {done ? (
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold text-[#1a1512] mb-3">You're in! · สมัครเรียบร้อยค่ะ</h2>
              <p className="text-[#5c5346] mb-6">
                We'll message you in your birthday week with your free dessert. Planning a party already?
              </p>
              <Link
                to="/events/kids"
                className="inline-block px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors"
              >
                See Kids' Party Packages
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Your name · ชื่อ *</label>
                <input type="text" value={form.name} onChange={e => set('name', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Phone or LINE ID · เบอร์โทรหรือ LINE *</label>
                <input type="text" value={form.phone} onChange={e => set('phone', e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email (optional) · อีเมล</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} className={inputClass} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Date of birth · วันเกิด *</label>
                  <input type="date" value={form.dob} min="1920-01-01" max={today} onChange={e => set('dob', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Whose birthday? (optional) · วันเกิดของใคร</label>
                  <input type="text" value={form.forWhom} onChange={e => set('forWhom', e.target.value)} placeholder="Me / my daughter Mia…" className={inputClass} />
                </div>
              </div>
              <label className="flex items-start gap-3 text-sm text-[#5c5346]">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={e => set('consent', e.target.checked)}
                  className="mt-1 accent-[#c9a84c]"
                />
                <span>
                  I'm happy for Hemingways Lakeside to message me about the Birthday Club, events and offers. We only
                  use your details for this, and you can opt out any time.
                  <br />
                  ยินยอมให้ร้านส่งข่าว Birthday Club กิจกรรม และโปรโมชัน ยกเลิกได้ทุกเมื่อ
                </span>
              </label>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#c9a84c] hover:bg-[#b8973d] disabled:opacity-50 text-black font-bold text-sm tracking-widest uppercase rounded-lg transition-colors"
              >
                {loading ? 'Joining...' : 'Join · สมัคร'}
              </button>
              <p className="text-center text-xs text-[#5c5346]">
                One free dessert per person per year, in your birthday week, with any food or drink purchase.
                <br />
                รับสิทธิ์ 1 ครั้งต่อคนต่อปี ในสัปดาห์วันเกิด เมื่อสั่งอาหารหรือเครื่องดื่ม
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
