import type { FaqItem } from '../lib/schema'

/**
 * Compact FAQ block for landing/party pages. Pass the same items to
 * buildFaqSchema() (via <Seo jsonLd={...}>) so the visible copy and the
 * structured data always match - see src/lib/schema.ts SITE_FAQS.
 */
export default function FaqMini({ heading, items }: { heading: string; items: FaqItem[] }) {
  if (!items.length) return null

  return (
    <section className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#c9a84c] text-xs tracking-[0.4em] uppercase mb-3">Good To Know</p>
          <h2 className="text-3xl sm:text-4xl font-bold">{heading}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map(({ question, answer }) => (
            <div key={question} className="bg-[#141414] border border-white/5 rounded-2xl p-6">
              <h3 className="text-white font-bold mb-2">{question}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
