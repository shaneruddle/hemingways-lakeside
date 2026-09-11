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

      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-[#0a1a0a] to-[#0d0d0d]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-4">Good To Know</p>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4">FAQ</h1>
          <p className="text-gray-400 text-lg">Everything people usually ask us, in one place.</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => {
            const open = openIndex === i
            return (
              <div key={faq.question} className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                  aria-expanded={open}
                >
                  <span className="text-white font-bold">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#c9a84c] shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
                  />
                </button>
                {open && <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">{faq.answer}</p>}
              </div>
            )
          })}
        </div>

        <div className="max-w-3xl mx-auto mt-14 text-center">
          <p className="text-gray-500 text-sm mb-4">Still have a question?</p>
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
