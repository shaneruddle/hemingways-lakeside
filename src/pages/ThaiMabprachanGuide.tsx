import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bike, Footprints, Car, Sun, Waves, UtensilsCrossed, MapPin, Clock } from 'lucide-react'
import Seo from '../components/Seo'
import { buildFaqSchema } from '../lib/schema'

const PAGE_URL = 'https://hemingwayslakeside.com/th/mabprachan-reservoir-guide'
const EN_URL = 'https://hemingwayslakeside.com/lake-mabprachan'
const LAKE_MAPS_URL = 'https://maps.google.com/?q=อ่างเก็บน้ำมาบประชัน'
const VENUE_MAPS_URL = 'https://maps.google.com/?q=Hemingways+Lakeside+Pattaya'
const FB_MESSENGER_URL = 'https://m.me/hemingwayslakeside'

// ข้อมูลยืนยันโดยเจ้าของร้าน (ก.ย. 2026): รอบละ 10.8 กม. ที่จอดรถหลายร้อยคัน คึกคักสุดประมาณ 18:00
// ร่มเงาน้อย สุนัขจรจัดมีบ้างแต่ไม่เป็นปัญหา เช่าจักรยาน 50 บาท เติมลมยาง 20 บาท
const LOOP_KM = '10.8'

const essentials = [
  { icon: Footprints, title: `รอบอ่าง ${LOOP_KM} กม.`, desc: 'ถนนราบเรียบวนรอบอ่างเก็บน้ำ เดิน วิ่ง ปั่นจักรยานได้หมด ส่วนใหญ่วนทวนเข็มนาฬิกา เดินประมาณ 2 ชม. วิ่ง 1–1.5 ชม. ปั่นสบาย ๆ 30–45 นาที' },
  { icon: Bike, title: 'เช่าจักรยาน 50 บาท', desc: 'มีจักรยานให้เช่าริมอ่าง คันละ 50 บาท เอาจักรยานมาเองก็เติมลมยางได้ 20 บาท' },
  { icon: Car, title: 'ที่จอดรถไม่มีปัญหา', desc: 'ที่จอดรถฟรีรอบอ่างหลายร้อยคัน จอดตรงไหนก็ได้ หรือจอดที่ Hemingways Lakeside แล้วเริ่มเดินจากร้านเลย' },
  { icon: Sun, title: 'ช่วงเวลาที่ดีที่สุด 18:00', desc: 'รอบอ่างร่มเงาน้อย กลางวันร้อนและเงียบ แต่ตั้งแต่ 17:30 คนแน่น บรรยากาศดีมาก พระอาทิตย์ตกริมน้ำ คนพัทยาตะวันออกออกมาเดินวิ่งกันทั้งอ่าง' },
]

const afterwards = [
  { icon: Waves, title: 'สระว่ายน้ำฟรีเมื่อทานอาหาร', desc: 'เดินหรือวิ่งเสร็จ มาลงสระว่ายน้ำริมทะเลสาบได้เลย ฟรีเมื่อสั่งอาหารหรือเครื่องดื่ม มีห้องอาบน้ำและห้องเปลี่ยนเสื้อผ้า' },
  { icon: UtensilsCrossed, title: 'อาหารเช้าถึงมื้อค่ำ', desc: 'เปิด 08:00 รับอาหารเช้าหลังวิ่งรอบเช้า มีอาหารไทย อาหารฝรั่ง เมนูเด็ก กาแฟ และเบียร์เย็น ๆ ในสวนเบียร์ตอนเย็น' },
  { icon: Clock, title: 'จ. พ. พฤ. 08:00–21:30 · ศ.–อา. 08:00–22:00', desc: 'ปิดวันอังคาร · Happy Hour วันธรรมดา 16:00–19:00 เสาร์–อาทิตย์ 13:00–21:00' },
]

const faqs = [
  {
    question: 'อ่างเก็บน้ำมาบประชันอยู่ที่ไหน?',
    answer:
      'อ่างเก็บน้ำมาบประชันอยู่ที่ตำบลโป่ง อำเภอบางละมุง จังหวัดชลบุรี ฝั่งพัทยาตะวันออก (ที่ชาวต่างชาติเรียกว่า "ดาร์กไซด์") ห่างจากถนนสุขุมวิทเข้ามาไม่กี่กิโลเมตร ขับรถจากหาดพัทยาหรือจอมเทียนประมาณ 20–30 นาที ร้าน Hemingways Lakeside อยู่ริมอ่างพอดี',
  },
  {
    question: 'รอบอ่างเก็บน้ำมาบประชันกี่กิโล?',
    answer: `ถนนรอบอ่างยาวประมาณ ${LOOP_KM} กิโลเมตร เดินประมาณ 2 ชั่วโมง วิ่ง 1–1.5 ชั่วโมง ปั่นจักรยานสบาย ๆ 30–45 นาที`,
  },
  {
    question: 'อ่างเก็บน้ำมาบประชันเปิดกี่โมง?',
    answer:
      'เป็นอ่างเก็บน้ำสาธารณะที่มีถนนวนรอบ ไม่มีประตู ไม่มีเวลาเปิด–ปิด และไม่เก็บค่าเข้า คนส่วนใหญ่มาช่วงเช้าตรู่หรือตั้งแต่ 17:30 เป็นต้นไปเพราะอากาศเย็นกว่า',
  },
  {
    question: 'มีที่จอดรถไหม?',
    answer: 'มีที่จอดรถฟรีรอบอ่างหลายร้อยคัน ไม่เคยเป็นปัญหาแม้ช่วง 18:00 ที่คนเยอะที่สุด',
  },
  {
    question: 'มีจักรยานให้เช่าไหม?',
    answer: 'มีค่ะ เช่าจักรยานริมอ่างคันละ 50 บาท ถ้าเอาจักรยานมาเองก็มีที่เติมลมยาง 20 บาท',
  },
  {
    question: 'ควรไปช่วงเวลาไหน?',
    answer:
      'ประมาณ 18:00 ดีที่สุด รอบอ่างร่มเงาน้อย กลางวันจึงร้อนและเงียบ แต่ช่วงเย็นคนแน่นทั้งเดิน วิ่ง ปั่นจักรยาน บรรยากาศดีที่สุดในพัทยาตะวันออก ถ้าชอบเงียบ ๆ ไปช่วงเช้า 06:00–08:00',
  },
  {
    question: 'มีสุนัขจรจัดไหม?',
    answer: 'มีบ้างแต่ไม่มาก และไม่เป็นปัญหา เพราะสุนัขคุ้นกับคนเดินผ่านวันละหลายร้อยคน',
  },
  {
    question: 'ลงเล่นน้ำในอ่างได้ไหม?',
    answer:
      'อ่างเก็บน้ำเป็นแหล่งน้ำดิบ ไม่ใช่ที่ว่ายน้ำ คนมาเดิน วิ่ง ปั่นจักรยาน และตกปลา ถ้าอยากเล่นน้ำ Hemingways Lakeside มีสระว่ายน้ำริมอ่าง ฟรีเมื่อสั่งอาหารหรือเครื่องดื่ม',
  },
  {
    question: 'ประวัติอ่างเก็บน้ำมาบประชัน',
    answer:
      'อ่างเก็บน้ำมาบประชันสร้างขึ้นเพื่อเป็นแหล่งน้ำสำหรับพื้นที่พัทยาและบางละมุง ปัจจุบันถนนรอบอ่างกลายเป็นที่ออกกำลังกายและพักผ่อนหลักของคนพัทยาตะวันออก ทั้งครอบครัว นักวิ่ง นักปั่น และคนตกปลา',
  },
  {
    question: 'ร้านอาหารใกล้อ่างเก็บน้ำมาบประชัน',
    answer:
      'Hemingways Lakeside อยู่ริมอ่างเก็บน้ำมาบประชัน เปิด 08:00 ถึงมื้อค่ำ (ปิดวันอังคาร) มีอาหารไทย อาหารฝรั่ง สวนเบียร์ สระว่ายน้ำฟรีเมื่อทานอาหาร ห้องเล่นเด็ก และที่จอดรถฟรี',
  },
]

/** Thai guide targeting "อ่างเก็บน้ำมาบประชัน" (~15–27k searches/mo, Sept 2026 keyword data). */
export default function ThaiMabprachanGuide() {
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
        title="อ่างเก็บน้ำมาบประชัน พัทยา - เดิน วิ่ง ปั่นจักรยาน ที่จอดรถ และร้านอาหารริมอ่าง"
        description={`คู่มืออ่างเก็บน้ำมาบประชัน พัทยาตะวันออก: รอบอ่าง ${LOOP_KM} กม. เช่าจักรยาน 50 บาท ที่จอดรถฟรี ช่วงเวลาที่ดีที่สุด เปิดกี่โมง และร้านอาหารริมอ่างที่มีสระว่ายน้ำฟรี Hemingways Lakeside`}
        jsonLd={[buildFaqSchema(faqs)]}
      />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0d0d0d] z-10" />
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/lake-mabprachan.webp')" }} />
        <div className="relative z-20 px-4 pb-20 pt-48 w-full">
          <div className="max-w-7xl mx-auto">
            <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-4">พัทยาตะวันออก · ตำบลโป่ง · บางละมุง</p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-4 max-w-3xl leading-tight">
              อ่างเก็บน้ำมาบประชัน
            </h1>
            <p className="text-gray-200 text-lg sm:text-xl max-w-xl mb-8 leading-relaxed">
              ที่เดิน วิ่ง ปั่นจักรยานของคนพัทยาตะวันออก รอบละ {LOOP_KM} กม. พระอาทิตย์ตกริมน้ำ
              แล้วมาลงสระและทานอาหารต่อที่ Hemingways Lakeside ริมอ่าง
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={LAKE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest rounded hover:bg-[#b8973d] transition-colors text-center"
              >
                แผนที่อ่างเก็บน้ำ
              </a>
              <a
                href="#afterwards"
                className="px-8 py-4 border border-white/30 text-white font-bold text-sm tracking-widest rounded hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors text-center"
              >
                กินและเล่นน้ำหลังเดิน
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Essentials */}
      <section className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#9c7a2e] text-xs tracking-[0.3em] uppercase mb-3">ข้อมูลที่ต้องรู้</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">ก่อนไปอ่างมาบประชัน</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {essentials.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center mb-6">
                  <Icon size={22} className="text-[#8a6d2f]" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1a1512]">{title}</h3>
                <p className="text-[#5c5346] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-4 bg-white border-y border-black/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1a1512] mb-6">อ่างเก็บน้ำมาบประชันคืออะไร</h2>
          <div className="space-y-4 text-[#5c5346] leading-relaxed">
            <p>
              อ่างเก็บน้ำมาบประชันคือทะเลสาบใหญ่ในตำบลโป่ง อำเภอบางละมุง ฝั่งพัทยาตะวันออก ห่างจากถนนสุขุมวิทเข้ามาไม่กี่กิโลเมตร
              สร้างขึ้นเป็นแหล่งน้ำสำหรับพื้นที่พัทยา และถนนที่วนรอบอ่างก็กลายเป็นสนามออกกำลังกายกลางแจ้งของคนแถวนี้
              ทุกเย็นเต็มไปด้วยคนเดิน นักวิ่ง นักปั่น ครอบครัวเข็นรถเด็ก และคนตกปลาริมตลิ่ง
            </p>
            <p>
              ไม่เก็บค่าเข้า ไม่มีประตู ไม่มีเวลาเปิด–ปิด มาตอน 18:00 แล้วจะเข้าใจว่าทำไมคนถึงขับรถออกมาจากในเมือง
              แสงตกกระทบน้ำ ลมเย็น และคนทั้งย่านออกมาเดินรอบอ่างพร้อมกัน
            </p>
            <p>
              รอบละ {LOOP_KM} กม. เตรียมน้ำและหมวกมาด้วยเพราะร่มเงาน้อย ไม่มีจักรยานก็เช่าริมอ่างได้คันละ 50 บาท
            </p>
          </div>
        </div>
      </section>

      {/* Afterwards */}
      <section id="afterwards" className="py-24 px-4 bg-[#f6efe0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#9c7a2e] text-xs tracking-[0.3em] uppercase mb-3">หลังเดินครบรอบ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">Hemingways Lakeside ร้านอาหารริมอ่างมาบประชัน</h2>
            <p className="text-[#5c5346] mt-4 max-w-2xl mx-auto">
              ร้านอยู่ริมอ่างพอดี จบรอบที่นี่ได้เลย ลงสระ อาบน้ำ แล้วนั่งทานอาหารเช้าหรือมื้อค่ำมองวิวทะเลสาบ
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[['/pool-lounge.webp','สระว่ายน้ำ ฟรีเมื่อทานอาหาร'],['/games-room.webp','ห้องเล่นเด็กในร่ม'],['/terrace.webp','ระเบียงริมสระ']].map(([src, cap]) => (
              <figure key={src} className="bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm">
                <img src={src} alt={`Hemingways Lakeside - ${cap}`} loading="lazy" className="w-full aspect-[4/3] object-cover" />
                <figcaption className="text-sm text-[#5c5346] px-4 py-3">{cap}</figcaption>
              </figure>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {afterwards.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white border border-black/5 rounded-2xl p-8 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center mb-6">
                  <Icon size={22} className="text-[#8a6d2f]" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-[#1a1512]">{title}</h3>
                <p className="text-[#5c5346] leading-relaxed text-sm">{desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a
              href={VENUE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest rounded hover:bg-[#b8973d] transition-colors"
            >
              <MapPin size={16} /> นำทางมาร้าน
            </a>
            <a
              href={FB_MESSENGER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#c9a84c]/50 text-[#8a6d2f] font-bold text-sm tracking-widest rounded hover:bg-[#c9a84c]/10 transition-colors"
            >
              ทักแชทสอบถาม
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#9c7a2e] text-xs tracking-[0.3em] uppercase mb-3">คำถามที่พบบ่อย</p>
            <h2 className="text-3xl font-bold text-[#1a1512]">เรื่องอ่างเก็บน้ำมาบประชัน</h2>
          </div>
          <div className="space-y-4">
            {faqs.map(f => (
              <details key={f.question} className="bg-[#f6efe0] border border-black/5 rounded-2xl p-6 group">
                <summary className="font-bold text-[#1a1512] cursor-pointer list-none flex justify-between items-center">
                  {f.question}
                  <span className="text-[#8a6d2f] group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <p className="text-[#5c5346] mt-4 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
          <p className="text-center text-sm text-[#5c5346] mt-10">
            พาลูกมาด้วย? ดู <Link to="/th/kids-cafe-pool-pattaya" className="underline hover:text-[#8a6d2f]">คาเฟ่เด็ก มีสระว่ายน้ำ</Link> ·
            English: <Link to="/lake-mabprachan" className="underline hover:text-[#8a6d2f]">Lake Mabprachan guide</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
