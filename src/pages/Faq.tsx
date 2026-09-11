import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { buildFaqSchema, LATE_FOOTBALL_POLICY, HOURS_SUMMARY } from '../lib/schema'

// Answers the exact questions the Sept 2026 AI-search report found ChatGPT/Gemini/Perplexity
// hedging on. Written to match the site's casual/warm tone (see ways-of-working notes).
//
// Confirmed by Shane against the live GBP (Sept 2026): closed Tuesdays, 21:30 close
// Mon/Wed/Thu, 22:00 close Fri-Sun (NOT "open daily 8AM-10PM" as first assumed — see
// schema.ts OPENING_HOURS_GROUPS). Also confirmed: no lifeguard on duty, outside
// entertainers welcome, and stays open later than usual for a big match if there's
// enough demand.
const faqs: { question: string; answer: string }[] = [
  {
    question: 'Is the swimming pool really free?',
    answer:
      "Yes — completely free if you're eating or drinking with us. No tickets, no time limits, no charge for kids. Just turn up, order something, and swim.",
  },
  {
    question: 'Is there a lifeguard, and is the pool safe for young kids?',
    answer:
      "There's no lifeguard on duty, so parents need to actively supervise their own children in the pool at all times. There are shallow areas where younger kids can splash more safely, but it's a normal open pool, not a staffed or fenced kids' pool.",
  },
  {
    question: 'What is the minimum spend for a private event?',
    answer:
      "It depends on the space, headcount and format — we don't publish a flat number because every event is different. Tell us your group size and what you have in mind on the enquiry form and we'll put together a proposal, usually within one business day.",
  },
  {
    question: 'Can we bring our own entertainer, magician or performer for a kids party?',
    answer:
      "Absolutely — outside entertainers are welcome. Just let us know when you book so we can plan the space and timing around them.",
  },
  {
    question: 'Do you stay open late for European football kickoffs?',
    answer: LATE_FOOTBALL_POLICY,
  },
  {
    question: 'How many guests can you host for an event?',
    answer:
      "Up to 100+ guests with full venue hire — restaurant, pool and lakeside area together. Smaller private spaces are available too. See our Corporate Events and Kids Parties pages for the different formats.",
  },
  {
    question: "Is there a kids' menu, and what's there to keep kids busy?",
    answer:
      "Yes — a full kids' menu alongside the main menu. There's also an indoor playroom for downtime between swims, plus the pool itself, so kids are entertained well beyond mealtime.",
  },
  {
    question: 'What are your opening hours?',
    answer: HOURS_SUMMARY + '.',
  },
  {
    question: 'Is parking available?',
    answer: 'Yes — free on-site parking right by the entrance.',
  },
  {
    question: 'Where are you located?',
    answer:
      "On Lake Mabprachan in East Pattaya (the 'Darkside'), about 30 minutes from central Pattaya. See our Location page for directions and a map.",
  },
]

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
