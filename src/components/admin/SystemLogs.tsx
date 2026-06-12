import { useEffect, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { getSystemLogs } from '../../lib/firestore'
import type { SystemLog, LogCategory } from '../../types'

const CATEGORY_COLOURS: Record<LogCategory, string> = {
  menu: 'bg-blue-900/40 text-blue-300',
  finance: 'bg-green-900/40 text-green-300',
  user: 'bg-purple-900/40 text-purple-300',
  loyalty: 'bg-yellow-900/40 text-yellow-300',
  crm: 'bg-pink-900/40 text-pink-300',
  system: 'bg-gray-700/40 text-gray-300',
  specials: 'bg-orange-900/40 text-orange-300',
  blog: 'bg-teal-900/40 text-teal-300',
  gallery: 'bg-indigo-900/40 text-indigo-300',
}

export default function SystemLogs() {
  const [logs, setLogs] = useState<SystemLog[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<LogCategory | 'all'>('all')

  const load = async () => {
    setLoading(true)
    const data = await getSystemLogs(200)
    setLogs(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const categories: Array<LogCategory | 'all'> = ['all', 'menu', 'finance', 'user', 'loyalty', 'crm', 'system', 'specials', 'blog', 'gallery']

  const visible = filter === 'all' ? logs : logs.filter(l => l.category === filter)

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">System Logs</h2>
        <button
          onClick={load}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors capitalize ${
              filter === cat
                ? 'bg-[#c9a84c] text-black'
                : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : visible.length === 0 ? (
        <p className="text-gray-500 text-sm">No logs found.</p>
      ) : (
        <div className="space-y-2">
          {visible.map(log => (
            <div key={log.id} className="bg-white/5 rounded-lg p-4 flex items-start gap-4">
              <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize shrink-0 ${CATEGORY_COLOURS[log.category] ?? 'bg-gray-700 text-gray-300'}`}>
                {log.category}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium">{log.action}</p>
                <p className="text-gray-400 text-xs mt-0.5 truncate">{log.details}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-gray-500 text-xs">{log.userEmail}</p>
                <p className="text-gray-600 text-xs">{new Date(log.timestamp).toLocaleString('en-GB', { timeZone: 'Asia/Bangkok' })}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
