import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { buildFaqSchema, SITE_FAQS } from '../lib/schema'

const faqs = SITE_FAQS

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div>
      <Seo
        title="FAQ"
        description="Answers to common questions about Hemingways Lakeside — the free pool, private events, opening hours, parking and more."
        jsonLd={[buildFaqSchema(faqs)]}
      />

      <section className="pt-32 pb-16 px-4 bg-[#f6efe0]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-4">Good To Know</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 text-[#1a1512]">FAQ</h1>
          <p className="text-[#5c5346] text-lg">Everything people usually ask us, in one place.</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => {
            const open = openIndex === i
            return (
              <div key={faq.question} className="bg-[#f6efe0] border border-black/5 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  aria-expanded={open}
                >
                  <span className="text-[#1a1512] font-bold">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#8a6d2f] shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </button>
                {open && <p className="px-6 pb-5 text-[#5c5346] text-sm leading-relaxed">{faq.answer}</p>}
              </div>
            )
          })}
        </div>

        <div className="max-w-3xl mx-auto mt-14 text-center">
          <p className="text-[#5c5346] text-sm mb-4">Still have a question?</p>
          <Link
            to="/contact"
            className="inline-block px-8 py-4 bg-[#c9a84c] text-black font-bold text-sm tracking-widest uppercase rounded hover:bg-[#b8973d] transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
