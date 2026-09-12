import type { FaqItem } from '../lib/schema'

/**
 * Compact FAQ block for landing/party pages. Pass the same items to
 * buildFaqSchema() (via <Seo jsonLd={...}>) so the visible copy and the
 * structured data always match - see src/lib/schema.ts SITE_FAQS.
 */
export default function FaqMini({ heading, items }: { heading: string; items: FaqItem[] }) {
  if (!items.length) return null

  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#9c7a2e] text-xs tracking-[0.4em] uppercase mb-3">Good To Know</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1a1512]">{heading}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map(({ question, answer }) => (
            <div key={question} className="bg-[#f6efe0] border border-black/5 rounded-2xl p-6">
              <h3 className="text-[#1a1512] font-bold mb-2">{question}</h3>
              <p className="text-[#5c5346] text-sm leading-relaxed">{answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
