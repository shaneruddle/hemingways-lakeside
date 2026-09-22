import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, MessageCircle } from 'lucide-react'
import Seo from '../components/Seo'
import { buildFaqSchema, SITE_URL } from '../lib/schema'

const PAGE_PATH = '/th/kids-cafe-pattaya-chonburi'
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`
const FB_MESSENGER_URL = 'https://m.me/hemingwayslakeside'

// Round-up compiled Sept 2026 from public reviews/listings (poolvillapattaya, gangbeauty, sweetstay,
// Lemon8/TikTok creators, Google Maps). Descriptions are deliberately short and hedged — details,
// prices and hours change; the page tells readers to check each venue's own page before going.
interface Venue {
  name: string
  area: string
  tags: string[]
  desc: string
  bestFor: string
  ours?: boolean
  url?: string
}

const venues: Venue[] = [
  {
    name: 'Hemingways Lakeside',
    area: 'พัทยาตะวันออก · ริมอ่างเก็บน้ำมาบประชัน',
    tags: ['สระว่ายน้ำฟรี', 'ห้องเล่นเด็กในร่ม', 'เมนูเด็ก', 'ที่จอดรถฟรี'],
    desc:
      'ร้านของเราเอง ร้านอาหารครอบครัวริมทะเลสาบ มีสระว่ายน้ำที่ลงได้ฟรีเมื่อสั่งอาหารหรือเครื่องดื่ม (มีโซนน้ำตื้น ไม่มีไลฟ์การ์ด ผู้ปกครองดูแลเอง) ห้องเล่นเด็กในร่มสำหรับวันฝนตก เมนูเด็ก อาหารไทยและฝรั่ง รับจัดงานวันเกิดเด็กแบบเหมาจ่าย 5,000 / 10,000 / 20,000 บาท',
    bestFor: 'ครอบครัวที่อยากให้ลูกเล่นน้ำทั้งวันส่วนพ่อแม่นั่งทานข้าวริมทะเลสาบ ปิดวันอังคาร',
    ours: true,
    url: '/th/kids-cafe-pool-pattaya',
  },
  {
    name: 'LariDea Kids\' Café',
    area: 'กลางเมืองพัทยา · ตรงข้าม Terminal 21',
    tags: ['สนามเด็กเล่นในร่ม', 'ห้องแอร์', 'มีพี่เลี้ยง'],
    desc: 'คาเฟ่เด็กในร่มเปิดใหม่ใจกลางเมือง สนามเด็กเล่นและของเล่นเสริมพัฒนาการในห้องแอร์ รีวิวชมว่ามีพี่เลี้ยงช่วยดูแล พ่อแม่นั่งจิบกาแฟได้',
    bestFor: 'เด็กเล็ก วันที่ร้อนหรือฝนตก พักโรงแรมในเมือง',
  },
  {
    name: 'ป้าบุญคาเฟ่',
    area: 'หนองปลาไหล · บางละมุง',
    tags: ['สนามเด็กเล่น', 'บ่อปลาคาร์ป', 'มินิซู', 'ร่มรื่น'],
    desc: 'คาเฟ่ครอบครัวยอดนิยม พื้นที่กว้าง ร่มรื่น มีบ่อปลาให้อาหาร สัตว์เลี้ยง สนามเด็กเล่น และอาหารไทย อีสาน ฝรั่งครบ',
    bestFor: 'ครอบครัวใหญ่ที่อยากนั่งนาน ๆ ให้เด็กวิ่งเล่นกลางแจ้ง',
  },
  {
    name: 'Loftbit Park (คาเฟ่กระต่าย)',
    area: 'บางละมุง · ใกล้ Monsters Aquarium',
    tags: ['สวนกระต่าย', 'ป้อนอาหารสัตว์', 'สไลเดอร์'],
    desc: 'สวนอาหารและคาเฟ่ที่มีสวนกระต่ายให้เด็ก ๆ ป้อนอาหาร มีสไลเดอร์และของเล่น บรรยากาศน้ำตกและต้นไม้',
    bestFor: 'เด็กที่ชอบสัตว์ ไปต่อ Monsters Aquarium ได้',
  },
  {
    name: 'มองช้างคาเฟ่',
    area: 'เมืองพัทยา · บางละมุง',
    tags: ['ช้าง', 'มินิซู', 'กิจกรรม'],
    desc: 'คาเฟ่แนว edutainment ในธีมป่ากลางเมือง ได้ดูช้างใกล้ ๆ และมีสัตว์อื่น ๆ พร้อมกิจกรรมสำหรับเด็ก',
    bestFor: 'เด็กวัยอนุบาล–ประถมที่อยากเจอสัตว์ตัวใหญ่',
  },
  {
    name: 'Chaodoi Dinosaur (ชาวดอย คอฟฟี่)',
    area: 'ถนนสุขุมวิท · เมืองพัทยา',
    tags: ['ไดโนเสาร์ยักษ์', 'บ่อทราย', 'ระบายสี'],
    desc: 'ร้านกาแฟที่มีหุ่นไดโนเสาร์ตัวใหญ่ให้ถ่ายรูป บ่อทราย มุมระบายสี และกิจกรรมฟรีสำหรับเด็ก',
    bestFor: 'แวะพักระหว่างทางบนสุขุมวิท เด็กสายไดโนเสาร์',
  },
  {
    name: 'Rain Forest Cafe Pattaya',
    area: 'ถนนสุขุมวิท · หนองปรือ',
    tags: ['บ่อปลาคาร์ป', 'สนามเด็กเล่น', 'ร่มรื่น'],
    desc: 'คาเฟ่สวนสีขาวสะอาดตา ร่มรื่น มีบ่อปลาคาร์ปและสนามเด็กเล่น เมนูอาหารไทยและเทศหลากหลาย',
    bestFor: 'ครอบครัวที่อยากได้บรรยากาศสวนแต่ยังใกล้เมือง',
  },
  {
    name: 'Coco Play',
    area: 'ในโรงแรม · เมืองพัทยา',
    tags: ['สนามเด็กเล่นในร่ม', 'ห้องแอร์', 'ใหญ่'],
    desc: 'สนามเด็กเล่นในร่มขนาดใหญ่ในโรงแรม รีวิวว่าเป็นหนึ่งในเพลย์กราวด์ในร่มที่ใหญ่ที่สุดในพัทยา มีคาเฟ่ให้ผู้ปกครองนั่งรอ',
    bestFor: 'วันฝนตก เด็กพลังเยอะที่ต้องปล่อยให้วิ่ง',
  },
  {
    name: 'Fairy Sweet Village',
    area: 'ถนนทัพพระยา · เมืองพัทยา',
    tags: ['ธีมขนมหวาน', 'จุดถ่ายรูป', 'ของหวาน'],
    desc: 'หมู่บ้านขนมหวานจำลอง จุดถ่ายรูปเยอะ คาเฟ่ขนมและไอศกรีม เด็ก ๆ ชอบเดินดูตุ๊กตาและสีสัน',
    bestFor: 'สายถ่ายรูป เด็กเล็กที่ไม่ต้องการที่เล่นหนัก ๆ',
  },
  {
    name: 'Roar Land Kids Café & Playground',
    area: 'เสม็ด · เมืองชลบุรี',
    tags: ['สนามเด็กเล่นในร่ม', 'คาเฟ่เด็ก', 'ชลบุรี'],
    desc: 'คาเฟ่เด็กพร้อมเพลย์กราวด์ในตัวเมืองชลบุรี สำหรับครอบครัวฝั่งชลบุรี–ศรีราชาที่ไม่อยากขับมาถึงพัทยา',
    bestFor: 'ครอบครัวในเมืองชลบุรีและศรีราชา',
  },
]

const faqs = [
  {
    question: 'คาเฟ่เด็กพัทยาที่มีสระว่ายน้ำมีที่ไหนบ้าง?',
    answer:
      'ในลิสต์นี้ Hemingways Lakeside ที่พัทยาตะวันออกมีสระว่ายน้ำที่เด็กลงได้ฟรีเมื่อสั่งอาหารหรือเครื่องดื่ม พร้อมห้องเล่นเด็กในร่มและเมนูเด็ก ร้านอื่น ๆ ส่วนใหญ่เน้นสนามเด็กเล่นหรือสัตว์',
  },
  {
    question: 'วันฝนตกพาลูกไปที่ไหนดีในพัทยา?',
    answer:
      'เลือกที่มีโซนในร่ม เช่น LariDea Kids\' Café, Coco Play หรือห้องเล่นเด็กในร่มของ Hemingways Lakeside ซึ่งมีห้องอาบน้ำและห้องเปลี่ยนเสื้อผ้าด้วย',
  },
  {
    question: 'คาเฟ่เด็กพัทยาส่วนใหญ่เก็บค่าเข้าไหม?',
    answer:
      'แตกต่างกันไป คาเฟ่เด็กในร่มบางแห่งเก็บค่าเล่น ส่วนคาเฟ่สวนและร้านอาหารครอบครัวมักไม่เก็บค่าเข้าแต่ต้องสั่งอาหาร ควรเช็กเพจของแต่ละร้านก่อนไป ราคาและเวลาเปิดเปลี่ยนบ่อย',
  },
  {
    question: 'จัดงานวันเกิดเด็กที่คาเฟ่เด็กพัทยาได้ไหม?',
    answer:
      'ได้หลายที่ Hemingways Lakeside มีแพ็กเกจเหมาจ่าย 5,000 / 10,000 / 20,000 บาท รวมอาหาร น้ำอัดลม ของตกแต่ง เค้ก พื้นที่ปาร์ตี้ สระว่ายน้ำและห้องเล่น ทักแชทเพจเพื่อสอบถามวันว่าง',
  },
]

/** Thai round-up targeting คาเฟ่เด็ก พัทยา / คาเฟ่เด็ก ชลบุรี / ที่เที่ยวเด็ก ชลบุรี (Sept 2026 keyword data). Honest list, us included. */
export default function ThaiKidsCafeList() {
  useEffect(() => {
    const html = document.documentElement
    const prevLang = html.getAttribute('lang')
    html.setAttribute('lang', 'th')
    return () => {
      if (prevLang) html.setAttribute('lang', prevLang)
    }
  }, [])

  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'คาเฟ่เด็ก พัทยา–ชลบุรี 10 ที่พาลูกเที่ยว',
    url: PAGE_URL,
    itemListElement: venues.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: v.name,
      ...(v.ours ? { url: `${SITE_URL}${v.url}` } : {}),
    })),
  }

  return (
    <div>
      <Seo
        title="คาเฟ่เด็ก พัทยา–ชลบุรี 2026: 10 ที่พาลูกเที่ยว มีสระว่ายน้ำ สนามเด็กเล่น สัตว์"
        description="รวมคาเฟ่เด็กและที่เที่ยวเด็กในพัทยาและชลบุรี 10 ที่ ทั้งแบบมีสระว่ายน้ำ สนามเด็กเล่นในร่ม บ่อปลา กระต่าย ช้าง และไดโนเสาร์ พร้อมบอกว่าแต่ละที่เหมาะกับใคร"
        jsonLd={[itemList, buildFaqSchema(faqs)]}
      />

      {/* Hero */}
      <section className="px-4 pt-40 pb-16 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase mb-4">พาลูกเที่ยว พัทยา · ชลบุรี</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 leading-tight">
            คาเฟ่เด็ก พัทยา–ชลบุรี 10 ที่พาลูกเที่ยว
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            รวมที่พาลูกไปกินไปเล่นในพัทยาและชลบุรี คัดจากรีวิวและเพจของแต่ละร้าน มีทั้งสระว่ายน้ำ สนามเด็กเล่นในร่ม บ่อปลา กระต่าย ช้าง
            และไดโนเสาร์ บอกตรง ๆ ว่าแต่ละที่เหมาะกับใคร (ข้อ 1 คือร้านของเราเอง)
          </p>
        </div>
      </section>

      {/* List */}
      <section className="py-16 px-4 bg-[#f6efe0]">
        <div className="max-w-4xl mx-auto space-y-6">
          {venues.map((v, i) => (
            <article
              key={v.name}
              className={`rounded-2xl p-6 sm:p-8 shadow-sm border ${v.ours ? 'bg-white border-[#c9a84c]/60' : 'bg-white border-black/5'}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center font-bold text-[#8a6d2f]">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold text-[#1a1512]">{v.name}</h2>
                    {v.ours && (
                      <span className="text-[10px] tracking-widest uppercase bg-[#c9a84c] text-black px-2 py-0.5 rounded">ร้านของเรา</span>
                    )}
                  </div>
                  <p className="text-sm text-[#8a6d2f] mb-3 flex items-center gap-1"><MapPin size={14} /> {v.area}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {v.tags.map(t => (
                      <span key={t} className="text-xs bg-[#f6efe0] border border-black/5 text-[#5c5346] px-2 py-1 rounded-full">{t}</span>
                    ))}
                  </div>
                  <p className="text-[#5c5346] leading-relaxed mb-2">{v.desc}</p>
                  <p className="text-sm text-[#5c5346]"><span className="font-bold text-[#1a1512]">เหมาะกับ:</span> {v.bestFor}</p>
                  {v.ours && (
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {[['/pool-lounge.webp','สระว่ายน้ำริมทะเลสาบ'],['/games-room.webp','ห้องเล่นเด็กในร่ม'],['/terrace.webp','โซนนั่งทานอาหาร']].map(([src,alt]) => (
                        <img key={src} src={src} alt={`Hemingways Lakeside - ${alt}`} loading="lazy" className="rounded-xl aspect-[4/3] object-cover w-full" />
                      ))}
                    </div>
                  )}
                  {v.ours && v.url && (
                    <Link to={v.url} className="inline-block mt-4 text-sm font-bold text-[#8a6d2f] underline hover:text-[#1a1512]">
                      ดูรายละเอียดสระว่ายน้ำและแพ็กเกจวันเกิด →
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
          <p className="text-xs text-[#5c5346] text-center pt-4">
            ข้อมูลรวบรวมจากรีวิวและเพจสาธารณะ (ก.ย. 2026) ราคา เวลาเปิด และกิจกรรมเปลี่ยนได้ กรุณาเช็กเพจของแต่ละร้านก่อนเดินทาง
          </p>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4 bg-white border-y border-black/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1a1512] mb-4">เลือกยังไงให้ไม่พลาด</h2>
          <div className="space-y-3 text-[#5c5346] leading-relaxed">
            <p><span className="font-bold text-[#1a1512]">อากาศร้อนหรือฝนตก:</span> เลือกที่มีโซนในร่ม (LariDea, Coco Play, ห้องเล่นของ Hemingways Lakeside)</p>
            <p><span className="font-bold text-[#1a1512]">อยากให้ลูกเล่นน้ำ:</span> Hemingways Lakeside เป็นที่เดียวในลิสต์ที่มีสระว่ายน้ำ เตรียมชุดว่ายน้ำและห่วงยางมาเอง</p>
            <p><span className="font-bold text-[#1a1512]">ลูกชอบสัตว์:</span> ป้าบุญคาเฟ่ Loftbit Park มองช้างคาเฟ่ Rain Forest Cafe</p>
            <p><span className="font-bold text-[#1a1512]">ครึ่งวันพอ:</span> Chaodoi Dinosaur หรือ Fairy Sweet Village แวะถ่ายรูปกินขนมแล้วไปต่อ</p>
            <p><span className="font-bold text-[#1a1512]">อยู่ฝั่งชลบุรี–ศรีราชา:</span> Roar Land ใกล้กว่า ไม่ต้องขับมาพัทยา</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-[#f6efe0]">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-[#9c7a2e] text-xs tracking-[0.3em] uppercase mb-3">Hemingways Lakeside</p>
          <h2 className="text-3xl font-bold text-[#1a1512] mb-4">พาลูกมาเล่นน้ำริมอ่างมาบประชัน</h2>
          <p className="text-[#5c5346] mb-8">
            สระว่ายน้ำฟรีเมื่อสั่งอาหาร ห้องเล่นเด็กในร่ม เมนูเด็ก ที่จอดรถฟรี เปิด 08:00 ปิดวันอังคาร
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/th/kids-cafe-pool-pattaya"
              className="px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest rounded hover:bg-[#b8973d] transition-colors"
            >
              ดูสระว่ายน้ำและแพ็กเกจ
            </Link>
            <a
              href={FB_MESSENGER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#c9a84c]/50 text-[#8a6d2f] font-bold text-sm tracking-widest rounded hover:bg-[#c9a84c]/10 transition-colors"
            >
              <MessageCircle size={16} /> ทักแชทสอบถาม
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1a1512] mb-8 text-center">คำถามที่พบบ่อย</h2>
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
            ดูเพิ่ม: <Link to="/th/mabprachan-reservoir-guide" className="underline hover:text-[#8a6d2f]">อ่างเก็บน้ำมาบประชัน</Link> ·{' '}
            <Link to="/th/company-party-pattaya" className="underline hover:text-[#8a6d2f]">จัดงานเลี้ยงบริษัท</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
