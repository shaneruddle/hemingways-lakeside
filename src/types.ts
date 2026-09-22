export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl?: string
  available: boolean
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  imageUrl?: string
  type: 'birthday' | 'kids' | 'pool' | 'sports' | 'corporate' | 'general'
  capacity?: number
  price?: number
  featured: boolean
}

export interface Special {
  id: string
  title: string
  imageUrl?: string
  order?: number
  active: boolean
  // legacy fields kept for backward compat
  description?: string
  price?: number
  day?: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  imageUrl?: string
  publishedAt: string
  author: string
  tags: string[]
  metaTitle?: string
  metaDescription?: string
  status?: 'published' | 'draft'
  imageSuggestion?: string
  createdAt?: string
}

export interface SportsFixture {
  id: string
  title: string
  teams: string
  competition: string
  date: string
  time: string
  channel?: string
  featured: boolean
}

export interface PoolPackage {
  id: string
  name: string
  description: string
  price: number
  includes: string[]
  imageUrl?: string
}

export interface MenuPage {
  id: string
  imageUrl: string
  name: string
  group: string
  order: number
}

export interface PartyFace {
  x: number
  y: number
  w: number
  h: number
  blur: boolean
}

export interface PartyPhoto {
  /** Public, face-blurred JPEG. */
  url: string
  storagePath: string
  /** Un-blurred original (resized), admin-only Storage path — lets us re-edit the blurring later. */
  originalPath?: string
  /** Detected/manual face boxes and their blur state (pixel coords in width×height). */
  faces?: PartyFace[]
  width: number
  height: number
  /** Number of faces blurred in this photo (for the admin list; not shown publicly). */
  blurred: number
}

/** A published party album — the proof/trust section at /parties. */
export interface Party {
  id: string
  slug: string
  title: string
  titleTh?: string
  /** ISO date (YYYY-MM-DD) of the party. */
  date: string
  type: 'kids' | 'birthday' | 'corporate' | 'other'
  summary?: string
  photos: PartyPhoto[]
  coverIndex: number
  hostConsent: boolean
  published: boolean
  createdAt: string
}

export interface GalleryImage {
  id: string
  type: 'kids' | 'birthday' | 'corporate'
  imageUrl: string
  createdAt: string
}

export interface Enquiry {
  id: string
  name: string
  phone: string
  email: string
  type: 'general' | 'birthday' | 'kids_party' | 'pool' | 'corporate' | 'event' | 'birthday_club'
  message: string
  date?: string
  guestCount?: number
  // Birthday Club sign-ups only (type === 'birthday_club')
  birthMonth?: number
  childName?: string
  status: 'new' | 'contacted' | 'booked' | 'closed'
  notes?: string
  createdAt: string
}

// ── Auth / Users ──────────────────────────────────────────────────────────────
export interface UserProfile {
  id: string
  uid: string
  email: string
  displayName?: string
  role: 'admin' | 'manager' | 'staff'
  createdAt: string
  lastLogin?: string
  // Optional payroll fields, shown read-only in Finance → Payroll.
  nickname?: string
  salary?: number
  ssoDeduction?: number // Social Security deduction, THB/month
  otHourlyRate?: number // Overtime rate, THB/hour
  payrollNotes?: string
  disabled?: boolean
}

// ── System Logs ───────────────────────────────────────────────────────────────
export type LogCategory = 'menu' | 'finance' | 'user' | 'loyalty' | 'crm' | 'system' | 'specials' | 'blog' | 'gallery'

export interface SystemLog {
  id: string
  action: string
  details: string
  category: LogCategory
  userEmail: string
  userId: string
  timestamp: string
}

// ── Loyalty ───────────────────────────────────────────────────────────────────
export interface LoyaltyCustomer {
  id: string
  name: string
  phone: string
  email?: string
  balance: number
  loyaltyEnabled: boolean
  createdAt: string
  enrolledAt?: string
}

export type LoyaltyTxType = 'TOP_UP' | 'REDEEM' | 'BONUS' | 'ADJUSTMENT'

export interface LoyaltyTransaction {
  id: string
  type: LoyaltyTxType
  amount: number
  bonus?: number
  balanceAfter: number
  details: string
  processedBy: string
  timestamp: string
}

// ── Finance ───────────────────────────────────────────────────────────────────
// Expense / Income / Ingredient / DailyBalance types live in
// src/components/finance/types.ts (ported from Cajun Life Cafe).

// Payroll time cards (Finance → Payroll). One doc per employee per month in
// `payroll_timecards`, OCR'd from punch-card photos.
export interface TimeCardDayEntry {
  day: number // 1-31
  amIn?: string
  amOut?: string
  pmIn?: string
  pmOut?: string
  otIn?: string
  otOut?: string
  status?: 'CD' | 'OFF' | ''
  note?: string
  // Effective "official" shift start used to clip amIn when computing OT
  // (see computeDayHours in Payroll.tsx). Auto-estimated per month from the
  // most common amIn time unless shiftStartManual is true.
  shiftStart?: string
  shiftStartManual?: boolean
  // "Paid OT" — the overtime hours a manager decides to pay for the day.
  // Manual entry, blank by default.
  otHours?: number
}

export interface TimeCard {
  id?: string
  employeeId: string
  employeeName: string
  month: string // 'YYYY-MM'
  cardNameRaw?: string
  cardPositionRaw?: string
  entries: TimeCardDayEntry[]
  cardImageUrls?: string[]
  uploadedBy: string
  createdAt: string
  updatedAt: string
}

export interface DigitalMenuCategory {
  id: string
  name: string
  order: number
}

export interface DigitalMenuItem {
  id: string
  name: string
  description: string
  price: string           // e.g. "295"
  price2?: string         // optional second price (e.g. half portion)
  price2Label?: string    // e.g. "Half"
  priceLabel?: string     // label for main price, e.g. "Full"
  category: string        // must match a DigitalMenuCategory name
  imageUrl?: string
  available: boolean
  order: number
}

export interface CRMContact {
  id: string
  name: string
  firstName?: string
  lastName?: string
  phone: string // E.164 (+66…) or '' when email-only
  email?: string
  source: string // primary source, e.g. 'enquiry', 'manual', 'LINE', 'Sign In Sheets'
  sources?: string[] // every list the contact appeared on
  // 'lakeside' = gave details to Hemingways Lakeside; 'other-business' = came
  // from ABPC / Rent a Car lists — kept separate for marketing (PDPA).
  segment?: 'lakeside' | 'other-business'
  consent?: 'opt-in' | 'unknown' | 'opt-out'
  gender?: 'male' | 'female'
  dob?: string // YYYY-MM-DD, from the birthday form
  tags: string[]
  notes: string
  lastContact: string
  createdAt: string
}
