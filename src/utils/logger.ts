import { addDoc, collection } from 'firebase/firestore'
import { db, auth } from '../lib/firebase'
import type { LogCategory } from '../types'

export async function logActivity(action: string, details: string, category: LogCategory) {
  try {
    const user = auth.currentUser
    await addDoc(collection(db, 'system_logs'), {
      action,
      details,
      category,
      userEmail: user?.email ?? 'unknown',
      userId: user?.uid ?? 'unknown',
      timestamp: new Date().toISOString(),
    })
  } catch {
    // silent — logging must never crash the app
  }
}
