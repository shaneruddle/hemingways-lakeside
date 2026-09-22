import { doc, setDoc } from 'firebase/firestore'
import { db } from './firebase'
import type { CRMContact } from '../types'

// Same Cloud Function the EnquiryForm uses — emails a copy to info@hemingwayslakeside.com
const EMAIL_FUNCTION_URL = 'https://asia-southeast1-gen-lang-client-0174805651.cloudfunctions.net/emailEnquiry'

export function normalisePhone(raw: string): string {
  const p = raw.replace(/[\s\-().]/g, '')
  if (!p) return ''
  if (p.startsWith('+')) return p
  if (p.startsWith('00')) return '+' + p.slice(2)
  if (p.startsWith('0') && (p.length === 10 || p.length === 9)) return '+66' + p.slice(1)
  if (/^66\d{8,9}$/.test(p)) return '+' + p
  if (/^[689]\d{8}$/.test(p)) return '+66' + p
  return p // LINE IDs etc. are kept as typed
}

async function contactId(email: string, phone: string): Promise<string> {
  const key = (email || phone).toLowerCase()
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key))
  return 'pub-' + Array.from(new Uint8Array(buf)).slice(0, 12).map(b => b.toString(16).padStart(2, '0')).join('')
}

export interface PublicSignup {
  name: string
  phone?: string
  email?: string
  dob?: string // YYYY-MM-DD
  source: 'newsletter' | 'birthday'
  tag: string
  notes?: string
}

/**
 * Public (unauthenticated) sign-up → crm_contacts. Allowed by the isPublicSignup()
 * rule in firestore.rules, which whitelists exactly these fields. A repeat sign-up
 * with the same email/phone merges into the same doc (deterministic id).
 */
export async function submitPublicSignup(s: PublicSignup) {
  const email = (s.email || '').trim().toLowerCase()
  const phone = normalisePhone(s.phone || '')
  if (!email && !phone) throw new Error('Email or phone required')
  const now = new Date().toISOString()
  const id = await contactId(email, phone)
  const data: Omit<CRMContact, 'id'> = {
    name: s.name.trim(),
    phone,
    source: s.source,
    segment: 'lakeside',
    consent: 'opt-in',
    tags: [s.tag],
    notes: s.notes || '',
    lastContact: now,
    createdAt: now,
  }
  if (email) data.email = email
  if (s.dob) data.dob = s.dob
  // merge: true so a second sign-up (e.g. newsletter then birthday) lands on the same
  // contact. Public forms can't read, so tags/createdAt simply reflect the latest sign-up.
  await setDoc(doc(db, 'crm_contacts', id), data, { merge: true })

  fetch(EMAIL_FUNCTION_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: data.name, phone, email, type: s.source, message: s.notes || `${s.tag} sign-up${s.dob ? ` · DOB ${s.dob}` : ''}` }),
  }).catch(() => {})
}
