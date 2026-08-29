'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import AuthModal from '@/components/AuthModal'
import { MOCK_BOOKINGS, STATUS_COLORS } from '@/lib/mockData'
import { UserCheck, DollarSign, Clock, ArrowUpRight } from 'lucide-react'

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  // Quick analytics calculations from mock data
  const totalRevenue = MOCK_BOOKINGS.reduce((sum, item) => {
    return sum + parseInt(item.price.replace('$', ''))
  }, 0)
  
  const pendingCount = MOCK_BOOKINGS.filter(b => b.status === 'Pending').length
  const completedCount = MOCK_BOOKINGS.filter(b => b.status === 'Completed' || b.status === 'Confirmed').length

  return (
    <DashboardLayout title="Boilerplate Overview">
      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">Total Revenue</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">${totalRevenue}</h3>
            <span className="inline-flex items-center text-xs text-emerald-600 font-medium mt-2">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +12% from last week
            </span>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">Active Bookings</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{completedCount}</h3>
            <span className="inline-flex items-center text-xs text-emerald-600 font-medium mt-2">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> Ready to fulfill
            </span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">Pending Actions</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">{pendingCount}</h3>
            <span className="inline-flex items-center text-xs text-amber-600 font-medium mt-2">
              Requires attention
            </span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Hackathon Starter Ready</h2>
            <p className="text-sm text-slate-500">Next.js + Tailwind + Supabase Auth + Layout Shell</p>
          </div>
          <button
            onClick={() => setIsAuthOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors self-start sm:self-auto"
          >
            Test Auth Modal
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase bg-slate-50 text-slate-400 font-bold border-b border-slate-100">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">CLIENT</th>
                <th className="py-3 px-4">SERVICE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">PRICE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {MOCK_BOOKINGS.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 px-4 text-xs font-mono">{row.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{row.client}</td>
                  <td className="py-3 px-4">{row.service}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${STATUS_COLORS[row.status] || ''}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </DashboardLayout>
  )
}