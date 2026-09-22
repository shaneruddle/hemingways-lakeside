import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Waves, Gamepad2, UtensilsCrossed, Cake, Check, MapPin, Phone, MessageCircle } from 'lucide-react'
import Seo from '../components/Seo'
import PartyStrip from '../components/PartyStrip'
import { buildFaqSchema, BUSINESS } from '../lib/schema'

const MAPS_URL = 'https://maps.google.com/?q=Hemingways+Lakeside+Pattaya'
const FB_MESSENGER_URL = 'https://m.me/hemingwayslakeside'
const PAGE_URL = 'https://hemingwayslakeside.com/th/kids-cafe-pool-pattaya'
const EN_URL = 'https://hemingwayslakeside.com/events/kids'

const pillars = [
  {
    icon: Waves,
    title: 'สระว่ายน้ำฟรี',
    desc: 'สั่งอาหารหรือเครื่องดื่ม เด็ก ๆ ลงสระได้ฟรี ไม่มีค่าเข้า ไม่จำกัดเวลา มีโซนน้ำตื้นสำหรับเด็กเล็ก',
  },
  {
    icon: Gamepad2,
    title: 'ห้องเล่นเด็กในร่ม',
    desc: 'พักจากแดดหรือเล่นต่อได้แม้ฝนตก ผู้ปกครองนั่งจิบกาแฟริมทะเลสาบได้สบาย ๆ',
  },
  {
    icon: UtensilsCrossed,
    title: 'เมนูเด็กและอาหารครบ',
    desc: 'เมนูเด็กแยกต่างหาก พร้อมอาหารไทย อาหารฝรั่ง กาแฟ และของหวานสำหรับทั้งครอบครัว',
  },
  {
    icon: Cake,
    title: 'จัดงานวันเกิดริมสระ',
    desc: 'สระว่ายน้ำ ห้องเล่น พื้นที่ปาร์ตี้ อาหาร และเค้ก จัดให้ครบในที่เดียว รองรับสูงสุด 200 ท่าน',
  },
]

const packages = [
  { name: 'แพ็กเกจ A', price: '250–300 บาท/ท่าน', detail: 'อาหาร 5 อย่าง รวมน้ำอัดลม' },
  { name: 'แพ็กเกจ B', price: '400 บาท/ท่าน', detail: 'อาหาร 7 อย่าง รวมน้ำอัดลม' },
  { name: 'แพ็กเกจ C', price: '500–700 บาท/ท่าน', detail: 'อาหาร 10 อย่าง รวมน้ำอัดลม' },
  { name: 'แพ็กเกจ D', price: 'ตามงบประมาณ', detail: 'แจ้งจำนวนแขกและงบ เราจัดให้พอดี' },
]

const bundles = [
  { name: 'Splash Party', price: '5,000 บาท', detail: 'สูงสุด 10 ท่าน · อาหารแพ็กเกจ A (5 อย่าง) · เพิ่มท่านละ 300 บาท' },
  { name: 'Big Splash', price: '10,000 บาท', detail: 'สูงสุด 20 ท่าน · อาหารแพ็กเกจ B (7 อย่าง) · เพิ่มท่านละ 400 บาท' },
  { name: 'Ultimate Party', price: '20,000 บาท', detail: 'สูงสุด 35 ท่าน · อาหารแพ็กเกจ C (10 อย่าง) · เพิ่มท่านละ 500 บาท' },
]

const goodToKnow = [
  'ไม่มีค่าเข้า สระว่ายน้ำฟรีสำหรับลูกค้าที่ทานอาหารหรือเครื่องดื่ม',
  'ไม่มีไลฟ์การ์ดประจำสระ ผู้ปกครองต้องดูแลบุตรหลานตลอดเวลา',
  'มีห้องอาบน้ำและห้องเปลี่ยนเสื้อผ้า',
  'ที่จอดรถฟรีหน้าร้าน',
  'เปิด จ. พ. พฤ. 08:00–21:30 · ศ.–อา. 08:00–22:00 · ปิดวันอังคาร',
]

const faqs = [
  {
    question: 'ที่นี่เป็นคาเฟ่เด็กหรือร้านอาหาร?',
    answer:
      'Hemingways Lakeside เป็นร้านอาหารครอบครัวริมอ่างเก็บน้ำมาบประชัน ที่มีสระว่ายน้ำ ห้องเล่นเด็กในร่ม และเมนูเด็ก พ่อแม่นั่งทานอาหารหรือกาแฟได้ขณะที่เด็ก ๆ เล่นน้ำและเล่นในห้องเล่น',
  },
  {
    question: 'เด็กเล่นน้ำต้องเสียค่าใช้จ่ายไหม?',
    answer:
      'ไม่เสียค่าใช้จ่ายสำหรับลูกค้าที่สั่งอาหารหรือเครื่องดื่ม ไม่มีค่าเข้า ไม่จำกัดเวลา ไม่มีไลฟ์การ์ดประจำสระ ผู้ปกครองต้องดูแลบุตรหลานตลอดเวลา',
  },
  {
    question: 'จัดงานวันเกิดเด็กราคาเท่าไหร่?',
    answer:
      'แพ็กเกจอาหารเริ่มต้น 250 บาท/ท่าน รวมน้ำอัดลม (A 250–300, B 400, C 500–700 บาท/ท่าน) หรือแจ้งงบประมาณให้เราจัดให้ได้ ราคายังไม่รวมของตกแต่งและกิจกรรม มัดจำ 3,000 บาทสำหรับการจองพื้นที่ส่วนตัว',
  },
  {
    question: 'นำนักแสดงหรือทีมจัดกิจกรรมมาเองได้ไหม?',
    answer: 'ได้ค่ะ ยินดีต้อนรับ แจ้งล่วงหน้าตอนจองเพื่อให้เราเตรียมพื้นที่และเวลาให้',
  },
]

/** Thai-language landing page targeting คาเฟ่เด็ก พัทยา / ที่เที่ยวเด็ก พัทยา searches (Sept 2026 keyword data). */
export default function ThaiKidsCafePool() {
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
        title="คาเฟ่เด็ก พัทยา ชลบุรี มีสระว่ายน้ำฟรี ริมอ่างมาบประชัน"
        description="พาลูกเที่ยวพัทยา Hemingways Lakeside ร้านอาหารครอบครัวริมอ่างมาบประชัน สระว่ายน้ำฟรีเมื่อสั่งอาหาร ห้องเล่นเด็กในร่ม เมนูเด็ก ที่จอดรถฟรี รับจัดงานวันเกิดเด็ก แพ็กเกจเริ่มต้น 250 บาท/ท่าน"
        jsonLd={[buildFaqSchema(faqs)]}
      />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#0d0d0d] z-10" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/kids-hero.webp')" }} />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-4">Hemingways Lakeside · พัทยาตะวันออก</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-2xl leading-tight">
              พาลูกเที่ยวพัทยา เล่นน้ำฟรี มีห้องเล่นเด็ก ริมอ่างมาบประชัน
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              ร้านอาหารครอบครัวที่เด็ก ๆ ได้ว่ายน้ำ เล่นในห้องเล่น และทานเมนูเด็ก ส่วนพ่อแม่ได้นั่งพักริมทะเลสาบ
              ห่างจากตัวเมืองพัทยาประมาณ 30 นาที
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
                href={FB_MESSENGER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border border-white/30 text-white font-bold text-sm tracking-widest rounded hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors text-center"
              >
                สอบถามจัดงานวันเกิด
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#9c7a2e] text-xs tracking-[0.3em] uppercase mb-3">เที่ยวได้ทั้งวัน</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">ที่เที่ยวเด็กที่พ่อแม่ก็ได้พัก</h2>
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

      {/* Gallery */}
      <section className="px-4 pb-8 bg-[#f6efe0]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[['/pool-lounge.webp','สระว่ายน้ำ ฟรีเมื่อทานอาหาร'],['/games-room.webp','ห้องเล่นเด็กในร่ม โต๊ะโกล ฮอกกี้ พูล ปิงปอง'],['/terrace.webp','ระเบียงนั่งทานอาหารริมสระ']].map(([src,cap]) => (
            <figure key={src} className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm">
              <img src={src} alt={`Hemingways Lakeside - ${cap}`} loading="lazy" className="w-full aspect-[4/3] object-cover" />
              <figcaption className="text-sm text-[#5c5346] px-4 py-3">{cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Party packages */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#9c7a2e] text-xs tracking-[0.3em] uppercase mb-3">งานวันเกิดเด็ก</p>
            <h2 className="text-3xl font-bold text-[#1a1512]">แพ็กเกจอาหารงานวันเกิด</h2>
            <p className="text-[#5c5346] mt-3 max-w-xl mx-auto">
              เลือกแพ็กเกจเหมาจ่ายราคาเดียว หรือแพ็กเกจอาหารคิดตามจำนวนท่าน (บุฟเฟต์หรือฟิงเกอร์ฟู้ด ยังไม่รวมของตกแต่งและกิจกรรม)
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
            {bundles.map(b => (
              <div key={b.name} className="bg-[#c9a84c]/15 border border-[#c9a84c]/40 rounded-2xl p-6 text-center">
                <h3 className="font-bold text-[#1a1512] mb-1">{b.name}</h3>
                <p className="text-[#8a6d2f] font-bold text-2xl mb-2">{b.price}</p>
                <p className="text-[#5c5346] text-sm">{b.detail}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[#5c5346] mb-12">
            แพ็กเกจเหมารวมอาหาร น้ำอัดลม ของตกแต่งตามธีม เค้กวันเกิด และพื้นที่ปาร์ตี้ ยังไม่รวมกิจกรรมและการแสดง
          </p>
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
            มัดจำ 3,000 บาทสำหรับการจองพื้นที่ส่วนตัว ·{' '}
            <Link to="/birthday-club" className="underline hover:text-[#8a6d2f]">
              สมัคร Birthday Club รับของหวานฟรีในวันเกิด
            </Link>
          </p>
        </div>
      </section>

      {/* Good to know */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-4xl mx-auto bg-white border border-black/5 rounded-3xl p-10 sm:p-14 shadow-sm">
          <div className="text-center mb-10">
            <p className="text-[#9c7a2e] text-xs tracking-[0.3em] uppercase mb-3">ควรรู้ก่อนมา</p>
            <h2 className="text-3xl font-bold text-[#1a1512]">ข้อมูลสำหรับครอบครัว</h2>
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

      <PartyStrip type="kids" lang="th" />

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
          <h2 className="text-3xl font-bold mb-4 text-[#1a1512]">มาเที่ยวได้เลย ไม่ต้องจอง</h2>
          <p className="text-[#5c5346] max-w-lg mx-auto mb-8">
            จัดงานวันเกิดหรือมาเป็นกลุ่มใหญ่ ติดต่อล่วงหน้าเพื่อให้เราเตรียมพื้นที่ให้
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
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#8a6d2f]/40 text-[#8a6d2f] font-bold text-sm tracking-widest rounded hover:bg-[#c9a84c]/10 transition-colors"
            >
              <MapPin size={16} /> แผนที่
            </a>
          </div>
          <p className="mt-8 text-sm text-[#5c5346]">
            <Link to="/th/family-pool-mabprachan" className="underline hover:text-[#8a6d2f]">ร้านอาหารครอบครัว ริมอ่างมาบประชัน</Link>
            {' · '}
            <Link to="/events/kids" className="underline hover:text-[#8a6d2f]">Kids parties in English</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
