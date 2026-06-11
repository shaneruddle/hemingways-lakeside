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
