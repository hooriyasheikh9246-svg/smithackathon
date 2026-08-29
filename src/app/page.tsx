'use client'
import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import AuthModal from '@/components/AuthModal'
import { MOCK_BOOKINGS, STATUS_COLORS } from '@/lib/mockData'
import { useAuth } from '@/context/AuthContext'
import { UserCheck, LogOut } from 'lucide-react'

export default function Home() {
  const { user, signOut } = useAuth()
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  return (
    <DashboardLayout title="Boilerplate Overview" role="admin">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Hackathon Starter Ready</h2>
          <p className="text-xs text-slate-500">Next.js + Tailwind + Supabase Auth + Layout Shell</p>
        </div>
        <div>
          {user ? (
            <button onClick={() => signOut()} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-red-700">
              <LogOut className="w-4 h-4" /> Sign Out ({user.email})
            </button>
          ) : (
            <button onClick={() => setIsAuthOpen(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-indigo-700">
              <UserCheck className="w-4 h-4" /> Test Auth Modal
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase text-xs">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_BOOKINGS.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-4 font-mono text-xs">{row.id}</td>
                <td className="px-6 py-4 font-medium text-slate-800">{row.client}</td>
                <td className="px-6 py-4">{row.service}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${STATUS_COLORS[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </DashboardLayout>
  )
}