import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getUsers, updateUserRole } from '../../lib/firestore'
import { logActivity } from '../../utils/logger'
import type { UserProfile } from '../../types'

const ROLE_COLOURS: Record<UserProfile['role'], string> = {
  admin: 'bg-red-900/40 text-red-300',
  manager: 'bg-yellow-900/40 text-yellow-300',
  staff: 'bg-blue-900/40 text-blue-300',
}

export default function UserManagement() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const data = await getUsers()
    setUsers(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleRoleChange = async (uid: string, role: UserProfile['role'], email: string) => {
    try {
      await updateUserRole(uid, role)
      await logActivity('Role updated', `${email} → ${role}`, 'user')
      toast.success('Role updated')
      setUsers(prev => prev.map(u => u.uid === uid ? { ...u, role } : u))
    } catch {
      toast.error('Failed to update role')
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Users</h2>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : users.length === 0 ? (
        <div className="bg-white/5 rounded-lg p-6 text-center">
          <p className="text-gray-400 text-sm">No users yet. Users are created automatically on first login.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {users.map(user => (
            <div key={user.id} className="bg-white/5 rounded-lg p-4 flex items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm">{user.displayName ?? user.email}</p>
                <p className="text-gray-400 text-xs">{user.email}</p>
                <p className="text-gray-600 text-xs">
                  Joined {new Date(user.createdAt).toLocaleDateString('en-GB')}
                  {user.lastLogin && ` · Last login ${new Date(user.lastLogin).toLocaleDateString('en-GB')}`}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${ROLE_COLOURS[user.role]}`}>
                  {user.role}
                </span>
                <select
                  value={user.role}
                  onChange={e => handleRoleChange(user.uid, e.target.value as UserProfile['role'], user.email)}
                  className="bg-[#1a1a1a] border border-white/10 text-white text-xs rounded px-2 py-1"
                >
                  <option value="admin">admin</option>
                  <option value="manager">manager</option>
                  <option value="staff">staff</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
