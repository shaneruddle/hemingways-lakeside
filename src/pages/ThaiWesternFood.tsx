import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Egg, Fish, Beef, Flame, Waves, MapPin, MessageCircle } from 'lucide-react'
import Seo from '../components/Seo'
import { buildFaqSchema } from '../lib/schema'
import { BREAKFASTS, PUB_CLASSICS, STEAKS, SUNDAY_ROAST } from '../data/menuHighlights'

const PAGE_URL = 'https://hemingwayslakeside.com/th/western-food-pattaya'
const EN_URL = 'https://hemingwayslakeside.com/food'
const MAPS_URL = 'https://maps.google.com/?q=Hemingways+Lakeside+Pattaya'
const FB_MESSENGER_URL = 'https://m.me/hemingwayslakeside'

const sections = [
  { icon: Egg, title: 'อาหารเช้าอังกฤษ (English Breakfast)', note: 'ทุกเซ็ตรวมกาแฟหรือชา เติมได้ 1 ครั้ง เสิร์ฟตั้งแต่ 08:00', items: BREAKFASTS.slice(0, 3) },
  { icon: Fish, title: 'ฟิชแอนด์ชิปส์และอาหารผับอังกฤษ', note: 'มันฝรั่งทอดทำเอง น้ำเกรวี่แท้ จานใหญ่', items: PUB_CLASSICS.slice(0, 6) },
  { icon: Beef, title: 'สเต็กเนื้อออสเตรเลีย', note: 'Black Angus ทุกจานเลือกเครื่องเคียง 2 อย่างและซอส 1 อย่าง', items: STEAKS },
]

const faqs = [
  {
    question: 'ร้านอาหารฝรั่งพัทยาที่มีอะไรบ้าง?',
    answer:
      'Hemingways Lakeside เป็นร้านอาหารฝรั่งสไตล์ผับอังกฤษริมอ่างเก็บน้ำมาบประชัน พัทยาตะวันออก มีอาหารเช้าอังกฤษ ฟิชแอนด์ชิปส์ ไส้กรอกกับมันบด คอทเทจพาย สเต็กเนื้อออสเตรเลีย พิซซ่า เบอร์เกอร์ อาหารอินเดีย และมีอาหารไทยกับเมนูเด็กด้วย',
  },
  {
    question: 'ฟิชแอนด์ชิปส์ราคาเท่าไหร่?',
    answer: 'ปลาคอดชุบแป้งเบียร์ทอดกับมันฝรั่งทอดทำเอง ถั่วลันเตา และซอสทาร์ทาร์ 325 บาท',
  },
  {
    question: 'สเต็กราคาเริ่มต้นเท่าไหร่?',
    answer:
      'สเต็กไก่ 299 บาท แซลมอน 469 บาท เซอร์ลอยน์ Black Angus ออสเตรเลีย 250 กรัม 550 บาท ริบอาย 250 กรัม 650 บาท แลมชอป 300 กรัม 699 บาท ทุกจานรวมเครื่องเคียง 2 อย่างและซอส',
  },
  {
    question: 'มีซันเดย์โรสต์ไหม?',
    answer: `มีทุกวันอาทิตย์ตั้งแต่ ${SUNDAY_ROAST.from} จนหมด แบบคาร์เวอรี่ เลือกเนื้อได้ (พอร์เชตต้า เนื้อวัว แกะ ไก่ หมู) จานเล็ก ${SUNDAY_ROAST.small} บาท จานใหญ่ ${SUNDAY_ROAST.big} บาท รวมซุป`,
  },
  {
    question: 'อาหารเช้าอังกฤษราคาเท่าไหร่?',
    answer: 'เซ็ตเล็ก 165 บาท เซ็ตกลาง 229 บาท เซ็ตใหญ่ (Full English) 289 บาท รวมกาแฟหรือชา เติมได้ 1 ครั้ง',
  },
  {
    question: 'เด็ก ๆ เล่นน้ำได้ไหมระหว่างรอ?',
    answer: 'ได้ค่ะ สระว่ายน้ำฟรีเมื่อสั่งอาหารหรือเครื่องดื่ม มีห้องเล่นเด็กในร่มและเมนูเด็ก ปิดวันอังคาร',
  },
]

/** Thai page targeting ร้านอาหารฝรั่ง พัทยา / ร้านสเต็ก พัทยา (Sept 2026 keyword data). */
export default function ThaiWesternFood() {
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
        title="ร้านอาหารฝรั่ง พัทยา ริมทะเลสาบ - สเต็ก ฟิชแอนด์ชิปส์ อาหารเช้าอังกฤษ"
        description="ร้านอาหารฝรั่งสไตล์ผับอังกฤษ ริมอ่างเก็บน้ำมาบประชัน พัทยาตะวันออก ฟิชแอนด์ชิปส์ 325 บาท สเต็ก Black Angus ออสเตรเลียเริ่ม 550 บาท อาหารเช้าอังกฤษเริ่ม 165 บาท ซันเดย์โรสต์ 279 บาท สระว่ายน้ำฟรีเมื่อทานอาหาร"
        jsonLd={[buildFaqSchema(faqs)]}
      />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0d0d0d] z-10" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/terrace.webp')" }} />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-4">Hemingways Lakeside · พัทยาตะวันออก</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-3xl leading-tight">
              ร้านอาหารฝรั่ง พัทยา ริมทะเลสาบ
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              ผับอังกฤษแท้ ๆ ริมอ่างมาบประชัน สเต็ก Black Angus ฟิชแอนด์ชิปส์ อาหารเช้าอังกฤษ ซันเดย์โรสต์
              พร้อมสระว่ายน้ำฟรีเมื่อทานอาหาร
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#menu" className="px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest rounded hover:bg-[#b8973d] transition-colors text-center">
                ดูเมนูและราคา
              </a>
              <a href={FB_MESSENGER_URL} target="_blank" rel="noopener noreferrer" className="px-8 py-4 border border-white/30 text-white font-bold text-sm tracking-widest rounded hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors text-center">
                จองโต๊ะ / สอบถาม
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Menu sections */}
      <section id="menu" className="py-20 px-4 bg-[#f6efe0]">
        <div className="max-w-5xl mx-auto space-y-14">
          {sections.map(({ icon: Icon, title, note, items }) => (
            <div key={title}>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center">
                  <Icon size={20} className="text-[#8a6d2f]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1512]">{title}</h2>
              </div>
              <p className="text-[#5c5346] text-sm mb-6">{note}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {items.map(item => (
                  <div key={item.name} className="bg-white border border-black/5 rounded-2xl p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-[#1a1512] font-bold">{item.th ?? item.name}</h3>
                        {item.th && <p className="text-[#8a6d2f] text-xs">{item.name}</p>}
                      </div>
                      <span className="text-[#8a6d2f] font-bold text-sm shrink-0">{item.price} บาท</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-[#c9a84c]/15 border border-[#c9a84c]/40 rounded-2xl p-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame size={18} className="text-[#8a6d2f]" />
              <h2 className="text-2xl font-bold text-[#1a1512]">ซันเดย์โรสต์ คาร์เวอรี่</h2>
            </div>
            <p className="text-[#5c5346]">
              ทุกวันอาทิตย์ตั้งแต่ {SUNDAY_ROAST.from} จนหมด · จานเล็ก {SUNDAY_ROAST.small} บาท · จานใหญ่ {SUNDAY_ROAST.big} บาท · เลือกเนื้อพอร์เชตต้า เนื้อวัว แกะ ไก่ หมู · รวมซุป
            </p>
          </div>
          <p className="text-[#5c5346] text-sm text-center">ราคาตามเมนูหน้าร้าน (ก.ย. 2026) อาจเปลี่ยนแปลง เมนูเต็มมีพิซซ่า เบอร์เกอร์ พาย พาสต้า อาหารอินเดีย อาหารไทย และเมนูเด็ก</p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-4 bg-white border-y border-black/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[['/terrace.webp', 'ระเบียงริมสระ'], ['/pool-lounge.webp', 'สระว่ายน้ำ ฟรีเมื่อทานอาหาร'], ['/lake-mabprachan.webp', 'วิวอ่างเก็บน้ำมาบประชัน']].map(([src, cap]) => (
            <figure key={src} className="bg-[#f6efe0] rounded-2xl overflow-hidden border border-black/5">
              <img src={src} alt={`Hemingways Lakeside - ${cap}`} loading="lazy" className="w-full aspect-[4/3] object-cover" />
              <figcaption className="text-sm text-[#5c5346] px-4 py-3">{cap}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-[#f6efe0]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1a1512] mb-8 text-center">คำถามที่พบบ่อย</h2>
          <div className="space-y-4">
            {faqs.map(f => (
              <details key={f.question} className="bg-white border border-black/5 rounded-2xl p-6 group">
                <summary className="font-bold text-[#1a1512] cursor-pointer list-none flex justify-between items-center">
                  {f.question}
                  <span className="text-[#8a6d2f] group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <p className="text-[#5c5346] mt-4 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest rounded hover:bg-[#b8973d] transition-colors">
              <MapPin size={16} /> นำทางมาร้าน
            </a>
            <a href={FB_MESSENGER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#c9a84c]/50 text-[#8a6d2f] font-bold text-sm tracking-widest rounded hover:bg-[#c9a84c]/10 transition-colors">
              <MessageCircle size={16} /> ทักแชท
            </a>
          </div>
          <p className="text-center text-sm text-[#5c5346] mt-8 flex items-center justify-center gap-1 flex-wrap">
            <Waves size={14} /> พาลูกมาด้วย? <Link to="/th/kids-cafe-pool-pattaya" className="underline hover:text-[#8a6d2f]">คาเฟ่เด็ก มีสระว่ายน้ำ</Link> · <Link to="/th/mabprachan-reservoir-guide" className="underline hover:text-[#8a6d2f]">อ่างเก็บน้ำมาบประชัน</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
