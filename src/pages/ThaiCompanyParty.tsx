import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Users, Trees, Car, Mic, Check, MapPin, Phone, MessageCircle, Mail } from 'lucide-react'
import Seo from '../components/Seo'
import { buildFaqSchema, BUSINESS } from '../lib/schema'

const MAPS_URL = 'https://maps.google.com/?q=Hemingways+Lakeside+Pattaya'
const FB_MESSENGER_URL = 'https://m.me/hemingwayslakeside'
const PAGE_URL = 'https://hemingwayslakeside.com/th/company-party-pattaya'
const EN_URL = 'https://hemingwayslakeside.com/events/corporate'

const pillars = [
  { icon: Users, title: 'รองรับสูงสุด 200 ท่าน', desc: 'เหมาทั้งร้านได้ถึง 200 ท่าน หรือเลือกโซนในร่ม 60 ที่นั่ง กลางแจ้ง 60 ที่นั่ง หรือยืนกลางแจ้ง 100 ท่าน' },
  { icon: Trees, title: 'บรรยากาศริมทะเลสาบ', desc: 'พื้นที่ในร่มและกลางแจ้งริมอ่างเก็บน้ำมาบประชัน พร้อมสระว่ายน้ำ ต่างจากห้องจัดเลี้ยงโรงแรมทั่วไป' },
  { icon: Car, title: 'เดินทางสะดวก จอดรถฟรี', desc: 'ห่างจากตัวเมืองพัทยาประมาณ 30 นาที มีที่จอดรถฟรีหน้าร้าน' },
  { icon: Mic, title: 'บริการเสริมตามต้องการ', desc: 'ดีเจและเครื่องเสียง ช่างภาพ บาร์ส่วนตัว และการตกแต่งเพิ่มเติม สอบถามได้ตอนขอใบเสนอราคา' },
]

const packages = [
  { name: 'แพ็กเกจ A', price: '250–300 บาท/ท่าน', detail: 'อาหาร 5 อย่าง รวมน้ำอัดลม' },
  { name: 'แพ็กเกจ B', price: '400 บาท/ท่าน', detail: 'อาหาร 7 อย่าง รวมน้ำอัดลม' },
  { name: 'แพ็กเกจ C', price: '500–700 บาท/ท่าน', detail: 'อาหาร 10 อย่าง รวมน้ำอัดลม' },
  { name: 'แพ็กเกจ D', price: 'ตามงบประมาณ', detail: 'แจ้งจำนวนคนและงบ เราจัดให้พอดี' },
]

const occasions = [
  'งานเลี้ยงปีใหม่บริษัท',
  'งานเลี้ยงสังสรรค์พนักงาน',
  'งานเลี้ยงส่ง / เลี้ยงรับ',
  'กิจกรรมทีมบิลดิ้งและสปอร์ตเดย์',
  'เลี้ยงรุ่น และงานเลี้ยงกลุ่มใหญ่',
]

const faqs = [
  {
    question: 'รองรับได้กี่คน?',
    answer: 'เหมาทั้งร้านรองรับได้สูงสุด 200 ท่าน โซนในร่ม 60 ที่นั่ง โซนกลางแจ้ง 60 ที่นั่ง หรือยืนกลางแจ้งได้ 100 ท่าน',
  },
  {
    question: 'ราคาต่อหัวเท่าไหร่?',
    answer:
      'แพ็กเกจอาหารเริ่มต้น 250 บาท/ท่าน รวมน้ำอัดลม (A 250–300, B 400, C 500–700 บาท/ท่าน) เป็นบุฟเฟต์หรือฟิงเกอร์ฟู้ด หรือแจ้งงบประมาณให้เราจัดแพ็กเกจให้ หมูหันทั้งตัว 4,000–6,000 บาท',
  },
  {
    question: 'ต้องมัดจำเท่าไหร่ และจองอย่างไร?',
    answer: 'มัดจำ 3,000 บาทเพื่อยืนยันการจอง แจ้งจำนวนคน วันที่ และงบประมาณ เราจะส่งใบเสนอราคาให้ภายใน 1 วันทำการ',
  },
  {
    question: 'ร้านเปิดวันไหนบ้าง?',
    answer: 'เปิดวันจันทร์ พุธ พฤหัสบดี 08:00–21:30 และวันศุกร์–อาทิตย์ 08:00–22:00 ปิดวันอังคาร',
  },
]

/** Thai-language page for company year-end parties (ร้านอาหารจัดเลี้ยง พัทยา peaks Oct–Jan per Sept 2026 keyword data). */
export default function ThaiCompanyParty() {
  useEffect(() => {
    const html = document.documentElement
    const prevLang = html.getAttribute('lang')
    html.setAttribute('lang', 'th')

    const links = [
      { hreflang: 'th', href: PAGE_URL },
      { hreflang: 'en', href: EN_URL },
      { hreflang: 'x-default', href: EN_URL },
    ].map(({ hreflang, href }) => {
      const el = document.createElement('link')
      el.rel = 'alternate'
      el.hreflang = hreflang
      el.href = href
      document.head.appendChild(el)
      return el
    })

    return () => {
      if (prevLang) html.setAttribute('lang', prevLang)
      links.forEach(el => el.remove())
    }
  }, [])

  return (
    <div>
      <Seo
        title="ร้านอาหารจัดเลี้ยง พัทยา งานเลี้ยงปีใหม่บริษัท ริมอ่างมาบประชัน"
        description="Hemingways Lakeside รับจัดเลี้ยงบริษัท งานเลี้ยงปีใหม่ เลี้ยงสังสรรค์พนักงาน ริมอ่างเก็บน้ำมาบประชัน พัทยา รองรับสูงสุด 200 ท่าน แพ็กเกจอาหารเริ่มต้น 250 บาท/ท่าน ที่จอดรถฟรี"
        jsonLd={[buildFaqSchema(faqs)]}
      />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0d0d0d] z-10" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/corporate-hero.webp')" }} />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-4">Hemingways Lakeside · พัทยาตะวันออก</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-2xl leading-tight">
              จัดเลี้ยงปีใหม่บริษัท ริมอ่างมาบประชัน พัทยา
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              งานเลี้ยงสังสรรค์พนักงาน เลี้ยงปีใหม่ เลี้ยงส่ง และทีมบิลดิ้ง รองรับสูงสุด 200 ท่าน
              แจ้งจำนวนคนและงบประมาณ เราส่งใบเสนอราคาให้ภายใน 1 วันทำการ
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`tel:${BUSINESS.telephone}`}
                className="px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest rounded hover:bg-[#b8973d] transition-colors text-center"
              >
                โทร {BUSINESS.telephoneDisplay}
              </a>
              <a
                href={FB_MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-white/30 text-white font-bold text-sm tracking-widest rounded hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors text-center"
              >
                ขอใบเสนอราคาทาง Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#9c7a2e] text-xs tracking-[0.3em] uppercase mb-3">ทำไมต้องที่นี่</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">งานเลี้ยงที่ไม่เหมือนห้องจัดเลี้ยงทั่วไป</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm hover:border-[#c9a84c]/40 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center mb-6 group-hover:bg-[#c9a84c]/25 transition-colors">
                  <Icon size={22} className="text-[#8a6d2f]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1a1512]">{title}</h3>
                <p className="text-[#5c5346] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#9c7a2e] text-xs tracking-[0.3em] uppercase mb-3">ราคาต่อท่าน</p>
            <h2 className="text-3xl font-bold text-[#1a1512]">แพ็กเกจอาหารจัดเลี้ยง</h2>
            <p className="text-[#5c5346] mt-3 max-w-xl mx-auto">
              บุฟเฟต์หรือฟิงเกอร์ฟู้ด เลือกเมนูได้ทั้งอาหารไทยและอาหารฝรั่ง หมูหันทั้งตัว 4,000–6,000 บาท
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map(p => (
              <div key={p.name} className="bg-[#f6efe0] border border-black/5 rounded-2xl p-6 text-center">
                <h3 className="font-bold text-[#1a1512] mb-1">{p.name}</h3>
                <p className="text-[#8a6d2f] font-bold mb-2">{p.price}</p>
                <p className="text-[#5c5346] text-sm">{p.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[#5c5346] mt-8">
            ราคายังไม่รวมการตกแต่งและกิจกรรม · มัดจำ 3,000 บาทเพื่อยืนยันการจอง
          </p>
        </div>
      </section>

      {/* Occasions */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-4xl mx-auto bg-white border border-black/5 rounded-3xl p-10 sm:p-14 shadow-sm">
          <div className="text-center mb-10">
            <p className="text-[#9c7a2e] text-xs tracking-[0.3em] uppercase mb-3">เหมาะสำหรับ</p>
            <h2 className="text-3xl font-bold text-[#1a1512]">งานแบบไหนก็จัดได้</h2>
          </div>
          <ul className="space-y-4 max-w-xl mx-auto">
            {occasions.map(point => (
              <li key={point} className="flex items-start gap-3 text-[#3d372e]">
                <Check size={18} className="text-[#8a6d2f] mt-1 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#9c7a2e] text-xs tracking-[0.3em] uppercase mb-3">คำถามที่พบบ่อย</p>
            <h2 className="text-3xl font-bold text-[#1a1512]">ถาม–ตอบ</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(f => (
              <div key={f.question} className="bg-white border border-black/5 rounded-2xl p-6 shadow-sm">
                <h3 className="font-bold text-[#1a1512] mb-2">{f.question}</h3>
                <p className="text-[#5c5346] leading-relaxed">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-4xl mx-auto bg-[#f6efe0] border border-black/5 rounded-3xl p-10 sm:p-14 text-center">
          <p className="text-[#9c7a2e] text-xs tracking-[0.3em] uppercase mb-3">ขอใบเสนอราคา</p>
          <h2 className="text-3xl font-bold mb-4 text-[#1a1512]">แจ้งจำนวนคน วันที่ และงบประมาณ</h2>
          <p className="text-[#5c5346] max-w-lg mx-auto mb-8">
            ช่วงปลายปีมีงานเลี้ยงมาก ติดต่อล่วงหน้าเพื่อเลือกวันและพื้นที่ได้ตามต้องการ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${BUSINESS.telephone}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest rounded hover:bg-[#b8973d] transition-colors"
            >
              <Phone size={16} /> {BUSINESS.telephoneDisplay}
            </a>
            <a
              href={FB_MESSENGER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#8a6d2f]/40 text-[#8a6d2f] font-bold text-sm tracking-widest rounded hover:bg-[#c9a84c]/10 transition-colors"
            >
              <MessageCircle size={16} /> ทักเพจ Facebook
            </a>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#8a6d2f]/40 text-[#8a6d2f] font-bold text-sm tracking-widest rounded hover:bg-[#c9a84c]/10 transition-colors"
            >
              <Mail size={16} /> อีเมล
            </a>
          </div>
          <p className="mt-8 text-sm text-[#5c5346]">
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#8a6d2f]">
              <MapPin size={14} className="inline mr-1" />
              11/2 หมู่ 4 ถนนพรประภานิมิต ริมอ่างเก็บน้ำมาบประชัน
            </a>
            {' · '}
            <Link to="/events/corporate" className="underline hover:text-[#8a6d2f]">Corporate events in English</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
