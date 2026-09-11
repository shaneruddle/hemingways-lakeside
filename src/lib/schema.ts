// Central source of truth for structured data (JSON-LD) across the site.
// Used by <Seo> to inject Restaurant/LocalBusiness + page-specific schema.
//
// GEO/SEO context: see the Sept 2026 "Competitive & AI-Search Strategy Report" —
// AI assistants (ChatGPT/Gemini/Perplexity) weigh consistent NAP data and
// machine-readable structured data heavily when recommending local businesses.
//
// A couple of small items are still open — see the remaining TODO below.

export const SITE_URL = 'https://hemingwayslakeside.com'

// Confirmed by Shane against the live Google Business Profile (Sept 2026) — closed
// Tuesdays, 21:30 close Mon/Wed/Thu, 22:00 close Fri-Sun. This is the OPPOSITE of what
// every page on the site said ("Open Daily 8AM-10PM") before this fix — the site was
// wrong, not the GBP listing. See Footer.tsx/Location.tsx/Pool.tsx/Sports.tsx/Home.tsx.
export const OPENING_HOURS_GROUPS = [
  { days: ['Monday', 'Wednesday', 'Thursday'], opens: '08:00', closes: '21:30' },
  { days: ['Friday', 'Saturday', 'Sunday'], opens: '08:00', closes: '22:00' },
]
export const CLOSED_DAYS = ['Tuesday']
// Human-readable summary for on-page copy — keep in sync with the groups above.
export const HOURS_SUMMARY = 'Mon, Wed, Thu 8AM–9:30PM · Fri–Sun 8AM–10PM · Closed Tuesdays'

// Confirmed by Shane (Sept 2026): stays open later than usual for a big live match
// if there's enough demand for it — not a fixed rule, so kept as "call ahead" advice
// rather than a specific closing time.
export const LATE_FOOTBALL_POLICY: string =
  "For a big live match, we'll often stay open later than usual if there's enough demand — call ahead on 064-240-0222 to check before you head over."

export const BUSINESS = {
  name: 'Hemingways Lakeside',
  // Exact name as registered on Google Business Profile — keep both in sync (NAP consistency)
  legalOrTradingName: 'Hemingways (Lakeside) Restaurant & Bar',
  description:
    "East Pattaya's family-friendly restaurant and sports bar on Lake Mabprachan — free swimming pool with dining, kids' playroom, 10+ sports screens, and private event spaces for 100+ guests.",
  telephone: '+66642400222',
  telephoneDisplay: '064-240-0222',
  email: 'info@hemingwayslakeside.com',
  // Source: Google Business Profile knowledge panel (Sept 2026). Confirm before publishing —
  // Location.tsx currently shows a shorter/looser version of this address.
  address: {
    streetAddress: '11/2 M4, Pornprapanimit Road',
    addressLocality: 'Pattaya City',
    addressRegion: 'Chonburi',
    postalCode: '20150',
    addressCountry: 'TH',
  },
  // Source: existing Google Maps embed in Location.tsx
  geo: { latitude: 12.9206794, longitude: 100.9620102 },
  priceRange: '฿200-400',
  // Facebook + Instagram confirmed by Shane (Sept 2026). Tripadvisor and the Google Maps
  // place URL are still open — guessing exact URLs there would hurt more than help.
  sameAs: [
    'https://www.facebook.com/hemingwayslakeside',
    'https://www.instagram.com/hemingways.lakeside/',
    // 'https://www.tripadvisor.com/<exact listing URL>',
    // 'https://www.google.com/maps/place/<exact place URL or CID>',
  ] as string[],
}

export const AMENITIES = [
  { name: 'Free swimming pool (with dining)', value: true },
  { name: "Kids' playroom", value: true },
  { name: '10+ sports screens', value: true },
  { name: 'Private event space (100+ capacity)', value: true },
  { name: 'Free on-site parking', value: true },
  { name: 'Wi-Fi', value: true },
  { name: 'Wheelchair accessible entrance, car park, toilet and seating', value: true }, // confirmed on live GBP
]

function amenityFeatureList() {
  return AMENITIES.map(a => ({
    '@type': 'LocationFeatureSpecification',
    name: a.name,
    value: a.value,
  }))
}

function openingHoursSpecification() {
  return OPENING_HOURS_GROUPS.map(g => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: g.days,
    opens: g.opens,
    closes: g.closes,
  }))
  // Closed days (CLOSED_DAYS) are simply omitted — schema.org has no "closed" value,
  // absence from dayOfWeek is the correct way to represent it.
}

/** Core Restaurant + LocalBusiness schema — include on every page via <Seo businessSchema>. */
export function buildBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    alternateName: BUSINESS.legalOrTradingName,
    description: BUSINESS.description,
    url: SITE_URL,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    servesCuisine: ['British', 'Thai', 'Pub Food'],
    address: {
      '@type': 'PostalAddress',
      ...BUSINESS.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: openingHoursSpecification(),
    amenityFeature: amenityFeatureList(),
    ...(BUSINESS.sameAs.length ? { sameAs: BUSINESS.sameAs } : {}),
    // ⚠️ TODO(Shane): once you're actively logging fresh Google reviews (report recommends
    // this — AI assistants weigh review VOLUME heavily above a ~4.3-4.4★ floor), consider
    // adding an AggregateRating block here, pulled from a live count rather than hardcoded
    // (a stale number is worse than none). Flagging rather than hardcoding a snapshot figure.
  }
}

/** FAQPage schema — pass the same Q&A array rendered on the FAQ page. */
export function buildFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  }
}

/** Event schema for a recurring/seasonal offering (pool parties, Christmas, etc). */
export function buildEventSchema(opts: {
  name: string
  description: string
  startDate: string // ISO date
  endDate?: string
  path: string // e.g. '/pool'
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: opts.name,
    description: opts.description,
    startDate: opts.startDate,
    ...(opts.endDate ? { endDate: opts.endDate } : {}),
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: {
      '@type': 'Place',
      name: BUSINESS.name,
      address: { '@type': 'PostalAddress', ...BUSINESS.address },
    },
    url: `${SITE_URL}${opts.path}`,
  }
}
