// Central source of truth for structured data (JSON-LD) across the site.
// Used by <Seo> to inject Restaurant/LocalBusiness + page-specific schema.
//
// GEO/SEO context: see the Sept 2026 "Competitive & AI-Search Strategy Report" —
// AI assistants (ChatGPT/Gemini/Perplexity) weigh consistent NAP data and
// machine-readable structured data heavily when recommending local businesses.

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

// Confirmed by Shane (Sept 2026), also set as GBP "Happy hours" special hours. Keep in
// sync with that GBP listing if it ever changes.
export const HAPPY_HOUR_SUMMARY = 'Happy Hour: Weekdays 4-7PM, Weekends 1-9PM'

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
  // Facebook, Instagram, Tripadvisor and Google Maps all confirmed by Shane (Sept 2026).
  sameAs: [
    'https://www.facebook.com/hemingwayslakeside',
    'https://www.instagram.com/hemingways.lakeside/',
    'https://www.tripadvisor.com/Restaurant_Review-g293919-d26840997-Reviews-Hemingways_Lakeside-Pattaya_Chonburi_Province.html',
    'https://www.google.com/maps/place/?q=place_id:ChIJWfsfAuyVAjERylWF266iQkY',
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
export interface FaqItem {
  question: string
  answer: string
  categories: ('general' | 'kids' | 'birthday' | 'corporate' | 'sports' | 'pool_party' | 'food' | 'beer_garden')[]
}

export const SITE_FAQS: FaqItem[] = [
  {
    question: 'Is the swimming pool really free?',
    answer:
      "Yes - completely free if you're eating or drinking with us. No tickets, no time limits, no charge for kids. Just turn up, order something, and swim.",
    categories: ['general', 'kids'],
  },
  {
    question: 'Is there a lifeguard, and is the pool safe for young kids?',
    answer:
      "There's no lifeguard on duty, so parents need to actively supervise their own children in the pool at all times. There are shallow areas where younger kids can splash more safely, but it's a normal open pool, not a staffed or fenced kids' pool.",
    categories: ['kids'],
  },
  {
    question: 'What is the minimum spend for a private event?',
    answer:
      "For corporate events there's no minimum spend - tell us your headcount and budget and we'll put together a proposal, usually within one business day. For birthday and kids parties we publish set food packages from 250 THB/person (see the package options on those pages), or tell us your budget and we'll build a custom package around it.",
    categories: ['corporate', 'birthday', 'kids'],
  },
  {
    question: 'How much do birthday and kids party food packages cost?',
    answer:
      'Four options: Package A at 250-300 THB/person (5 food items, soft drinks, finger food/buffet), Package B at 400 THB/person (7 items), Package C at 500-700 THB/person (10 items), or Package D - tell us your guest count and budget and we\'ll build a custom package. A whole roasted pig is 4,000-6,000 THB as a showstopper option. Prices don\'t include activities or decorations.',
    categories: ['birthday', 'kids'],
  },
  {
    question: 'Can we bring our own entertainer, magician or performer for a kids party?',
    answer:
      "Absolutely - outside entertainers are welcome. Just let us know when you book so we can plan the space and timing around them.",
    categories: ['kids'],
  },
  {
    question: 'Do you stay open late for European football kickoffs?',
    answer: LATE_FOOTBALL_POLICY,
    categories: ['general', 'sports'],
  },
  {
    question: 'How many guests can you host for an event?',
    answer:
      "Up to 100+ guests with full venue hire - restaurant, pool and lakeside area together. Smaller private spaces are available too. See our Corporate Events and Kids Parties pages for the different formats.",
    categories: ['corporate', 'birthday', 'kids'],
  },
  {
    question: "Is there a kids' menu, and what's there to keep kids busy?",
    answer:
      "Yes - a full kids' menu alongside the main menu. There's also an indoor playroom for downtime between swims, plus the pool itself, so kids are entertained well beyond mealtime.",
    categories: ['kids'],
  },
  {
    question: 'What are your opening hours?',
    answer: HOURS_SUMMARY + '.',
    categories: ['general'],
  },
  {
    question: 'Is parking available?',
    answer: 'Yes - free on-site parking right by the entrance.',
    categories: ['general'],
  },
  {
    question: 'Where are you located?',
    answer:
      "On Lake Mabprachan in East Pattaya (the 'Darkside'), about 30 minutes from central Pattaya. See our Location page for directions and a map.",
    categories: ['general'],
  },
  {
    question: 'Can you provide AV equipment for corporate events?',
    answer:
      'Yes - screens for presentations, slideshows and live feeds are available on request, alongside reliable Wi-Fi and air conditioning indoors.',
    categories: ['corporate'],
  },
  {
    question: 'Can the food be customised for a birthday party?',
    answer:
      "Yes - set menus, sharing feasts, buffets or a la carte, built around your group and budget. Nothing off the shelf.",
    categories: ['birthday'],
  },
  {
    question: 'Can I reserve a table or screen for a big game?',
    answer:
      "There's no formal reservation system for match days - just turn up and grab a seat. For a big one (a title fight, the Super Bowl, a final) with a group, call ahead on 064-240-0222 and we'll set you up with the right spot.",
    categories: ['sports'],
  },
  {
    question: 'Is there a cover charge to watch sport at Hemingways?',
    answer:
      'No cover charge, ever. Normal food and drink prices apply, same as any other visit - just come in, order, and watch.',
    categories: ['sports'],
  },
  {
    question: 'Do I need to book a pool day, or can I just turn up?',
    answer:
      "Walk-ins are always welcome. If you want a lounger reserved or you're coming as a group of 6+, call ahead on 064-240-0222 - otherwise just arrive and grab a spot.",
    categories: ['pool_party', 'general'],
  },
  {
    question: 'What do the pool packages include?',
    answer:
      'Three options: a Pool Day Pass (pool access, lounger and a welcome drink), Pool & Lunch (pool access, lounger, a main course and two drinks), and a Family Package (pool access for 2 adults and 2 kids, loungers and four meals). Ask your server which suits your group, or just eat/drink a la carte and the pool is free with that too.',
    categories: ['pool_party'],
  },
  {
    question: 'Is the Sunday Roast available every week?',
    answer:
      "Yes, it's a regular weekly special. The exact dishes can vary - ask your server or check the specials board on the day.",
    categories: ['food'],
  },
  {
    question: 'Do you have a proper beer garden?',
    answer:
      "We've got open-air lakeside seating right on Lake Mabprachan with a full range of draught and bottled beers - it's the closest thing to a beer garden you'll find on this side of Pattaya, without the indoor pub feel.",
    categories: ['beer_garden'],
  },
  {
    question: 'Do you serve steak?',
    answer:
      "Our menu leans British pub classics and Thai favourites rather than a dedicated steakhouse cut - think Steak & Ale Pie, burgers, fish & chips and Thai curries. Ask your server what's on the specials board if you're after something heartier.",
    categories: ['food'],
  },
]

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
