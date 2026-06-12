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
  type: 'general' | 'birthday' | 'kids_party' | 'pool' | 'corporate' | 'event'
  message: string
  date?: string
  guestCount?: number
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
export type ExpenseCategory = 'food' | 'drinks' | 'utilities' | 'staff' | 'equipment' | 'rent' | 'marketing' | 'repairs' | 'other'
export type IncomeCategory = 'food' | 'drinks' | 'events' | 'pool' | 'other'

export interface Expense {
  id: string
  date: string
  category: ExpenseCategory
  description: string
  amount: number
  notes?: string
  loggedBy: string
  createdAt: string
}

export interface Income {
  id: string
  date: string
  category: IncomeCategory
  amount: number
  notes?: string
  loggedBy: string
  createdAt: string
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
  phone: string
  email?: string
  source: string
  tags: string[]
  notes: string
  lastContact: string
  createdAt: string
}
