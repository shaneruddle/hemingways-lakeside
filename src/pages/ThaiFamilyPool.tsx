import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Waves, Gamepad2, UtensilsCrossed, Cake, Check, MapPin, Phone, MessageCircle, Clock } from 'lucide-react'
import Seo from '../components/Seo'
import { buildFaqSchema, BUSINESS } from '../lib/schema'

const MAPS_URL = 'https://maps.google.com/?q=Hemingways+Lakeside+Pattaya'
const FB_MESSENGER_URL = 'https://m.me/hemingwayslakeside'
const PAGE_URL = 'https://hemingwayslakeside.com/th/family-pool-mabprachan'
const EN_URL = 'https://hemingwayslakeside.com/family-kids'

const pillars = [
  {
    icon: Waves,
    title: 'สระว่ายน้ำฟรี',
    desc: 'ทานอาหารหรือเครื่องดื่มกับเรา ทั้งครอบครัวว่ายน้ำได้ฟรี ไม่มีค่าเข้า ไม่จำกัดเวลา มีโซนน้ำตื้นสำหรับเด็กเล็ก',
  },
  {
    icon: Gamepad2,
    title: 'ห้องเล่นสำหรับเด็ก',
    desc: 'ห้องเล่นในร่มให้เด็ก ๆ ได้พักจากแดด หรือเล่นต่อได้แม้ฝนตก ผู้ปกครองนั่งทานสบาย ๆ ริมน้ำ',
  },
  {
    icon: UtensilsCrossed,
    title: 'เมนูสำหรับเด็ก',
    desc: 'มีเมนูเด็กแยกต่างหาก ควบคู่กับอาหารอังกฤษและอาหารไทยสำหรับผู้ใหญ่ ทุกคนในครอบครัวได้ทานของที่ชอบ',
  },
  {
    icon: Cake,
    title: 'จัดงานวันเกิด',
    desc: 'สระว่ายน้ำ ห้องเล่น พื้นที่ปาร์ตี้ เค้ก และของตกแต่ง เราจัดให้ครบ รองรับตั้งแต่กลุ่มเล็กจนถึง 200 ท่าน',
  },
]

const goodToKnow = [
  'ไม่มีค่าเข้า สระว่ายน้ำฟรีสำหรับลูกค้าที่ทานอาหารหรือเครื่องดื่ม',
  'มีโซนน้ำตื้นสำหรับเด็กเล็ก (ไม่มีไลฟ์การ์ด ผู้ปกครองต้องดูแลบุตรหลานตลอดเวลา)',
  'ห้องเล่นในร่ม ให้เด็ก ๆ มีที่เล่นนอกเหนือจากสระ',
  'เมนูเด็กแยกต่างหาก ควบคู่กับเมนูหลัก',
  'ที่จอดรถฟรีหน้าร้าน',
  'ที่นั่งริมอ่างเก็บน้ำมาบประชัน ลมเย็น บรรยากาศสบาย ๆ',
  'จอใหญ่ 10+ จอ ถ่ายทอดสดฟุตบอลและกีฬา',
  'รับจัดงานวันเกิดและงานเลี้ยง แพ็กเกจอาหารเริ่มต้น 250 บาท/ท่าน',
]

const hours = [
  { day: 'จันทร์ พุธ พฤหัสบดี', time: '08:00 – 21:30' },
  { day: 'ศุกร์ – อาทิตย์', time: '08:00 – 22:00' },
  { day: 'อังคาร', time: 'ปิด' },
]

const faqs = [
  {
    question: 'สระว่ายน้ำฟรีจริงไหม?',
    answer:
      'ฟรีจริงสำหรับลูกค้าที่ทานอาหารหรือเครื่องดื่มกับเรา ไม่มีค่าเข้า ไม่จำกัดเวลา ไม่คิดค่าใช้จ่ายสำหรับเด็ก แค่มาที่ร้าน สั่งอาหารหรือเครื่องดื่ม แล้วลงสระได้เลย',
  },
  {
    question: 'สระปลอดภัยสำหรับเด็กเล็กไหม มีไลฟ์การ์ดหรือเปล่า?',
    answer:
      'ไม่มีไลฟ์การ์ดประจำสระ ผู้ปกครองต้องดูแลบุตรหลานในสระตลอดเวลา มีโซนน้ำตื้นที่เด็กเล็กเล่นน้ำได้สะดวกกว่า แต่เป็นสระเปิดทั่วไป ไม่ใช่สระเด็กที่มีรั้วกั้น',
  },
  {
    question: 'ร้านอยู่ตรงไหน เดินทางอย่างไร?',
    answer:
      'ร้านอยู่ริมอ่างเก็บน้ำมาบประชัน พัทยาตะวันออก (ฝั่งดาร์กไซด์) ถนนพรประภานิมิต ห่างจากตัวเมืองพัทยาประมาณ 30 นาที มีที่จอดรถฟรีหน้าร้าน',
  },
  {
    question: 'จัดงานวันเกิดเด็กต้องจองล่วงหน้าไหม ราคาเท่าไหร่?',
    answer:
      'แนะนำให้ติดต่อล่วงหน้าเพื่อจองพื้นที่ แพ็กเกจอาหารเริ่มต้น 250 บาท/ท่าน มีมัดจำ 3,000 บาทสำหรับการจองพื้นที่ส่วนตัว โทร 064-240-0222 หรือทักเพจ Facebook เพื่อสอบถาม',
  },
]

/** Thai-language landing page targeting ร้านอาหาร มาบประชัน / ร้านอาหารครอบครัว พัทยา searches. */
export default function ThaiFamilyPool() {
  // Mark the document as Thai and declare hreflang pairs with the English family page.
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
        title="ร้านอาหารพัทยา วิวสวย ริมอ่างมาบประชัน มีสระว่ายน้ำฟรี"
        description="Hemingways Lakeside ร้านอาหารบรรยากาศดีริมอ่างเก็บน้ำมาบประชัน พัทยาตะวันออก สระว่ายน้ำฟรีสำหรับลูกค้าที่ทานอาหาร ห้องเล่นเด็ก เมนูเด็ก ที่จอดรถฟรี รับจัดงานวันเกิด"
        jsonLd={[buildFaqSchema(faqs)]}
      />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0d0d0d] z-10" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/pool.webp')" }} />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-4">Hemingways Lakeside · พัทยาตะวันออก</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-2xl leading-tight">
              ร้านอาหารครอบครัว ริมอ่างมาบประชัน สระว่ายน้ำฟรี
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              ทานอาหารกับเรา ทั้งครอบครัวว่ายน้ำฟรี มีห้องเล่นเด็ก เมนูเด็ก ที่จอดรถฟรี
              และบรรยากาศริมทะเลสาบที่เงียบสงบ ห่างจากตัวเมืองพัทยาแค่ 30 นาที
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest rounded hover:bg-[#b8973d] transition-colors text-center"
              >
                ดูแผนที่ / นำทาง
              </a>
              <a
                href={`tel:${BUSINESS.telephone}`}
                className="px-8 py-4 border border-white/30 text-white font-bold text-sm tracking-widest rounded hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors text-center"
              >
                โทร {BUSINESS.telephoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Free with dining banner */}
      <section className="py-12 px-4 bg-[#c9a84c]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <h2 className="text-black font-bold text-2xl sm:text-3xl">สระว่ายน้ำฟรี ที่จอดรถฟรี ไม่มีค่าเข้า</h2>
            <p className="text-black/70 text-base sm:text-lg">ทานอาหารหรือเครื่องดื่มกับเรา ทั้งครอบครัวลงสระได้เลย</p>
          </div>
          <div className="text-black/80 text-sm font-bold tracking-wider shrink-0">
            เปิด จ. พ. พฤ. 08:00–21:30 · ศ.–อา. 08:00–22:00 · ปิดวันอังคาร
          </div>
        </div>
      </section>

      {/* Four pillars */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#9c7a2e] text-xs tracking-[0.3em] uppercase mb-3">ครบทุกอย่างสำหรับครอบครัว</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">พาลูกมาเที่ยวได้ทั้งวัน</h2>
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

      {/* Good to know */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-4xl mx-auto bg-white border border-black/5 rounded-3xl p-10 sm:p-14 shadow-sm">
          <div className="text-center mb-10">
            <p className="text-[#9c7a2e] text-xs tracking-[0.3em] uppercase mb-3">ควรรู้ก่อนมา</p>
            <h2 className="text-3xl font-bold text-[#1a1512]">วันครอบครัวที่นี่เป็นอย่างไร</h2>
          </div>
          <ul className="space-y-4 max-w-xl mx-auto">
            {goodToKnow.map(point => (
              <li key={point} className="flex items-start gap-3 text-[#3d372e]">
                <Check size={18} className="text-[#8a6d2f] mt-1 shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Hours + location */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#f6efe0] border border-black/5 rounded-3xl p-10">
            <div className="flex items-center gap-3 mb-6">
              <Clock size={20} className="text-[#8a6d2f]" />
              <h2 className="text-2xl font-bold text-[#1a1512]">เวลาเปิด–ปิด</h2>
            </div>
            <ul className="space-y-3">
              {hours.map(h => (
                <li key={h.day} className="flex justify-between text-[#3d372e] border-b border-black/5 pb-3">
                  <span>{h.day}</span>
                  <span className="font-bold">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#f6efe0] border border-black/5 rounded-3xl p-10">
            <div className="flex items-center gap-3 mb-6">
              <MapPin size={20} className="text-[#8a6d2f]" />
              <h2 className="text-2xl font-bold text-[#1a1512]">ที่ตั้ง</h2>
            </div>
            <p className="text-[#3d372e] leading-relaxed mb-6">
              11/2 หมู่ 4 ถนนพรประภานิมิต ริมอ่างเก็บน้ำมาบประชัน
              <br />
              หนองปรือ บางละมุง ชลบุรี 20150
              <br />
              <span className="text-[#5c5346] text-sm">ห่างจากตัวเมืองพัทยาประมาณ 30 นาที · ที่จอดรถฟรี</span>
            </p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#c9a84c] text-black font-bold text-sm rounded hover:bg-[#b8973d] transition-colors"
            >
              <MapPin size={16} /> เปิดใน Google Maps
            </a>
          </div>
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
          <p className="text-[#9c7a2e] text-xs tracking-[0.3em] uppercase mb-3">ติดต่อเรา</p>
          <h2 className="text-3xl font-bold mb-4 text-[#1a1512]">มาเป็นครอบครัวได้เลย ไม่ต้องจอง</h2>
          <p className="text-[#5c5346] max-w-lg mx-auto mb-8">
            กลุ่มใหญ่หรือจัดงานวันเกิด ติดต่อล่วงหน้าเพื่อให้เราเตรียมพื้นที่ให้
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
          </div>
          <p className="mt-8 text-sm text-[#5c5346]">
            <Link to="/family-kids" className="underline hover:text-[#8a6d2f]">Read this page in English</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
