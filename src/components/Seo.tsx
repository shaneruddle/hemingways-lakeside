import { useEffect } from 'react'
import { buildBusinessSchema } from '../lib/schema'

interface Props {
  title?: string
  description?: string
  /** Extra JSON-LD objects to inject alongside the core business schema (FAQPage, Event, etc). */
  jsonLd?: object[]
  /** Set false to skip the core Restaurant/LocalBusiness block (it's included by default). */
  businessSchema?: boolean
}

const DEFAULT_TITLE = 'Hemingways Lakeside'
const DEFAULT_DESCRIPTION =
  "Hemingways Lakeside — East Pattaya's best expat sports bar & restaurant. Events, birthday parties, pool days, live sports on 15 screens."

/**
 * Sets per-page <title>/meta description and injects JSON-LD structured data.
 * This is a client-rendered SPA (no SSR/prerendering — see firebase.json rewrites),
 * so this only helps crawlers that execute JS (Google does; confirm before relying
 * on it for others). Mirrors the document.title pattern already used in BlogPost.tsx.
 */
export default function Seo({ title, description, jsonLd = [], businessSchema = true }: Props) {
  useEffect(() => {
    document.title = title ? `${title} | Hemingways Lakeside` : DEFAULT_TITLE

    const metaDesc = document.querySelector('meta[name="description"]')
    const prevDesc = metaDesc?.getAttribute('content') ?? null
    if (metaDesc) metaDesc.setAttribute('content', description || DEFAULT_DESCRIPTION)

    const schemas = [...(businessSchema ? [buildBusinessSchema()] : []), ...jsonLd]
    const scripts = schemas.map(schema => {
      const el = document.createElement('script')
      el.type = 'application/ld+json'
      el.text = JSON.stringify(schema)
      document.head.appendChild(el)
      return el
    })

    return () => {
      document.title = DEFAULT_TITLE
      if (metaDesc && prevDesc !== null) metaDesc.setAttribute('content', prevDesc)
      scripts.forEach(el => el.remove())
    }
  }, [title, description, businessSchema, JSON.stringify(jsonLd)])

  return null
}
