import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { UserProfile } from '../types'

// Staff who can be tagged on a "Salary & Staff Advances" expense or picked in
// Payroll. On Lakeside every signed-in user can read `users`, so this reads
// the collection directly (Cajun keeps a separate read-restricted
// staff_directory for the same purpose).
const PAYROLL_ELIGIBLE_ROLES: string[] = ['manager', 'staff']

export interface StaffDirectoryEntry {
  uid: string
  name: string
  role: string
  nickname?: string
}

export function staffLabel(entry: Pick<StaffDirectoryEntry, 'name' | 'nickname'>): string {
  return entry.nickname?.trim() ? `${entry.name} (${entry.nickname.trim()})` : entry.name
}

export function useStaffOptions(): StaffDirectoryEntry[] {
  const [staff, setStaff] = useState<StaffDirectoryEntry[]>([])

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, 'users'),
      (snap: any) => {
        const list = snap.docs
          .map((d: any) => ({ uid: d.id as string, ...(d.data() as Partial<UserProfile>) }))
          .filter((u: any) => !!u.role && PAYROLL_ELIGIBLE_ROLES.includes(u.role) && !u.disabled)
          .map((u: any): StaffDirectoryEntry => ({ uid: u.uid, name: u.displayName || u.email || 'Unnamed', role: u.role as string, nickname: u.nickname }))
          .sort((a: StaffDirectoryEntry, b: StaffDirectoryEntry) => a.name.localeCompare(b.name))
        setStaff(list)
      },
      (err: any) => console.error('useStaffOptions error:', err)
    )
    return unsub
  }, [])

  return staff
}
