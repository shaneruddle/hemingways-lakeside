import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  doc,
  query,
  where,
  orderBy,
} from 'firebase/firestore'
import { db } from './firebase'
import type { MenuItem, Event, Special, BlogPost, SportsFixture, PoolPackage, Enquiry, CRMContact } from '../types'

// ── Menu Images ───────────────────────────────────────────────────────────────
export const getMenuImages = async (): Promise<Record<string, string>> => {
  const snap = await getDocs(collection(db, 'menu_images'))
  const result: Record<string, string> = {}
  snap.docs.forEach((d: any) => { result[d.id] = d.data().imageUrl })
  return result
}

export const saveMenuImage = async (slug: string, imageUrl: string) => {
  return setDoc(doc(db, 'menu_images', slug), { imageUrl, updatedAt: new Date().toISOString() })
}

// ── Menu ──────────────────────────────────────────────────────────────────────
export const getMenuItems = async (): Promise<MenuItem[]> => {
  const snap = await getDocs(query(collection(db, 'menu'), orderBy('category')))
  return snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as MenuItem))
}

export const saveMenuItem = async (item: Omit<MenuItem, 'id'>) => {
  return addDoc(collection(db, 'menu'), item)
}

export const updateMenuItem = async (id: string, data: Partial<MenuItem>) => {
  return updateDoc(doc(db, 'menu', id), data)
}

export const deleteMenuItem = async (id: string) => {
  return deleteDoc(doc(db, 'menu', id))
}

// ── Events ────────────────────────────────────────────────────────────────────
export const getEvents = async (): Promise<Event[]> => {
  const snap = await getDocs(query(collection(db, 'events'), orderBy('date')))
  return snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as Event))
}

export const getFeaturedEvents = async (): Promise<Event[]> => {
  const snap = await getDocs(query(collection(db, 'events'), where('featured', '==', true)))
  return snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as Event))
}

export const saveEvent = async (event: Omit<Event, 'id'>) => {
  return addDoc(collection(db, 'events'), event)
}

export const updateEvent = async (id: string, data: Partial<Event>) => {
  return updateDoc(doc(db, 'events', id), data)
}

export const deleteEvent = async (id: string) => {
  return deleteDoc(doc(db, 'events', id))
}

// ── Specials ──────────────────────────────────────────────────────────────────
export const getSpecials = async (): Promise<Special[]> => {
  const snap = await getDocs(query(collection(db, 'specials'), where('active', '==', true)))
  return snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as Special))
}

export const saveSpecial = async (special: Omit<Special, 'id'>) => {
  return addDoc(collection(db, 'specials'), special)
}

export const updateSpecial = async (id: string, data: Partial<Special>) => {
  return updateDoc(doc(db, 'specials', id), data)
}

export const deleteSpecial = async (id: string) => {
  return deleteDoc(doc(db, 'specials', id))
}

// ── Blog ──────────────────────────────────────────────────────────────────────
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const snap = await getDocs(query(collection(db, 'blog'), orderBy('publishedAt', 'desc')))
  return snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as BlogPost))
}

export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  const snap = await getDoc(doc(db, 'blog', id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as BlogPost
}

export const saveBlogPost = async (post: Omit<BlogPost, 'id'>) => {
  return addDoc(collection(db, 'blog'), post)
}

export const updateBlogPost = async (id: string, data: Partial<BlogPost>) => {
  return updateDoc(doc(db, 'blog', id), data)
}

export const deleteBlogPost = async (id: string) => {
  return deleteDoc(doc(db, 'blog', id))
}

// ── Sports ────────────────────────────────────────────────────────────────────
export const getSportsFixtures = async (): Promise<SportsFixture[]> => {
  const snap = await getDocs(query(collection(db, 'sports'), orderBy('date')))
  return snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as SportsFixture))
}

export const saveSportsFixture = async (fixture: Omit<SportsFixture, 'id'>) => {
  return addDoc(collection(db, 'sports'), fixture)
}

export const updateSportsFixture = async (id: string, data: Partial<SportsFixture>) => {
  return updateDoc(doc(db, 'sports', id), data)
}

export const deleteSportsFixture = async (id: string) => {
  return deleteDoc(doc(db, 'sports', id))
}

// ── Pool ──────────────────────────────────────────────────────────────────────
export const getPoolPackages = async (): Promise<PoolPackage[]> => {
  const snap = await getDocs(collection(db, 'pool_packages'))
  return snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as PoolPackage))
}

export const savePoolPackage = async (pkg: Omit<PoolPackage, 'id'>) => {
  return addDoc(collection(db, 'pool_packages'), pkg)
}

// ── Enquiries ─────────────────────────────────────────────────────────────────
export const submitEnquiry = async (enquiry: Omit<Enquiry, 'id' | 'status' | 'createdAt'>) => {
  return addDoc(collection(db, 'enquiries'), {
    ...enquiry,
    status: 'new',
    createdAt: new Date().toISOString(),
  })
}

export const getEnquiries = async (): Promise<Enquiry[]> => {
  const snap = await getDocs(query(collection(db, 'enquiries'), orderBy('createdAt', 'desc')))
  return snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as Enquiry))
}

export const updateEnquiry = async (id: string, data: Partial<Enquiry>) => {
  return updateDoc(doc(db, 'enquiries', id), data)
}

// ── CRM ───────────────────────────────────────────────────────────────────────
export const getCRMContacts = async (): Promise<CRMContact[]> => {
  const snap = await getDocs(query(collection(db, 'crm_contacts'), orderBy('createdAt', 'desc')))
  return snap.docs.map((d: any) => ({ id: d.id, ...d.data() } as CRMContact))
}

export const saveCRMContact = async (contact: Omit<CRMContact, 'id'>) => {
  return addDoc(collection(db, 'crm_contacts'), contact)
}

export const updateCRMContact = async (id: string, data: Partial<CRMContact>) => {
  return updateDoc(doc(db, 'crm_contacts', id), data)
}

export const deleteCRMContact = async (id: string) => {
  return deleteDoc(doc(db, 'crm_contacts', id))
}

// Convert enquiry to CRM contact
export const enquiryToContact = async (enquiry: Enquiry) => {
  await saveCRMContact({
    name: enquiry.name,
    phone: enquiry.phone,
    email: enquiry.email || '',
    source: enquiry.type,
    tags: [enquiry.type],
    notes: enquiry.message,
    lastContact: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  })
  await updateEnquiry(enquiry.id, { status: 'contacted' })
}
