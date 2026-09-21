import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { IceCreamCone, Cake, Bell } from 'lucide-react'
import Seo from '../components/Seo'
import { submitEnquiry } from '../lib/firestore'

// Same Cloud Function the EnquiryForm uses — emails the sign-up to info@hemingwayslakeside.com
const EMAIL_FUNCTION_URL = 'https://asia-southeast1-gen-lang-client-0174805651.cloudfunctions.net/emailEnquiry'

const MONTHS = [
  'January · มกราคม', 'February · กุมภาพันธ์', 'March · มีนาคม', 'April · เมษายน',
  'May · พฤษภาคม', 'June · มิถุนายน', 'July · กรกฎาคม', 'August · สิงหาคม',
  'September · กันยายน', 'October · ตุลาคม', 'November · พฤศจิกายน', 'December · ธันวาคม',
]

const perks = [
  {
    icon: IceCreamCone,
    title: 'A free birthday treat',
    th: 'ของหวานหรือไอศกรีมฟรีสำหรับน้อง ๆ ในเดือนเกิด',
    desc: 'A free dessert or ice cream for your child during their birthday month.',
  },
  {
    icon: Bell,
    title: 'First to hear',
    th: 'รับข่าวโปรโมชันจัดงานวันเกิดก่อนใคร',
    desc: "Kids' party offers and family events, before we post them anywhere else.",
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
 * Sign-ups are stored in the existing `enquiries` collection with type 'birthday_club',
 * so they show up in Admin and are emailed like any other enquiry — no new Firestore rules needed.
 */
export default function BirthdayClub() {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', childName: '', birthMonth: '', consent: false })

  const set = (key: string, val: string | boolean) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.phone || !form.birthMonth) {
      toast.error('Name, phone/LINE and birthday month are required')
      return
    }
    if (!form.consent) {
      toast.error('Please tick the box so we can message you')
      return
    }
    setLoading(true)
    const month = parseInt(form.birthMonth)
    const message = `Birthday Club sign-up. Child: ${form.childName || '-'}. Birthday month: ${MONTHS[month - 1]}.`
    try {
      await submitEnquiry({
        name: form.name,
        phone: form.phone,
        email: form.email,
        type: 'birthday_club',
        message,
        birthMonth: month,
        ...(form.childName ? { childName: form.childName } : {}),
      })

      fetch(EMAIL_FUNCTION_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, phone: form.phone, email: form.email, type: 'birthday_club', message }),
      }).catch(() => {})

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
        description="Join the Hemingways Lakeside Birthday Club - a free dessert or ice cream for your child in their birthday month, and first word on kids' party offers at our lakeside pool venue in East Pattaya."
      />

      {/* Hero */}
      <section className="px-4 pt-40 pb-16 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Hemingways Lakeside</p>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4">Join the Birthday Club</h1>
          <p className="text-2xl text-gray-200 mb-4">สมัคร Birthday Club ฟรี</p>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Tell us your child's birthday month and they get a free treat when it comes round. Takes 30 seconds.
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
                We'll message you before the birthday month. Planning a party already?
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
                <label className={labelClass}>Your name · ชื่อผู้ปกครอง *</label>
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
                  <label className={labelClass}>Child's first name (optional) · ชื่อน้อง</label>
                  <input type="text" value={form.childName} onChange={e => set('childName', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Birthday month · เดือนเกิด *</label>
                  <select value={form.birthMonth} onChange={e => set('birthMonth', e.target.value)} className={inputClass}>
                    <option value="">Select · เลือกเดือน</option>
                    {MONTHS.map((m, i) => (
                      <option key={m} value={i + 1}>{m}</option>
                    ))}
                  </select>
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
                  I'm happy for Hemingways Lakeside to message me about the Birthday Club and kids' party offers. We only
                  use your details for this, and you can opt out any time.
                  <br />
                  ยินยอมให้ร้านส่งข่าว Birthday Club และโปรโมชันงานวันเกิด ยกเลิกได้ทุกเมื่อ
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
                One treat per child per year, with any food or drink purchase.
                <br />
                รับสิทธิ์ 1 ครั้งต่อเด็ก 1 คนต่อปี เมื่อสั่งอาหารหรือเครื่องดื่ม
              </p>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
