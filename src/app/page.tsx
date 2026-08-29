'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import AuthModal from '@/components/AuthModal'
import AddBookingModal from '@/components/AddBookingModal'
import { MOCK_BOOKINGS, STATUS_COLORS } from '@/lib/mockData'
import { UserCheck, DollarSign, Clock, ArrowUpRight, Search, Filter, Plus } from 'lucide-react'

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [bookings, setBookings] = useState(MOCK_BOOKINGS)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  // Analytics recalculated dynamically from state
  const totalRevenue = bookings.reduce((sum, item) => {
    return sum + parseInt(item.price.replace('$', '') || '0')
  }, 0)
  
  const pendingCount = bookings.filter(b => b.status === 'Pending').length
  const completedCount = bookings.filter(b => b.status === 'Completed' || b.status === 'Confirmed').length

  const handleAddBooking = (newBooking: any) => {
    setBookings([newBooking, ...bookings])
  }

  const filteredBookings = bookings.filter((item) => {
    const matchesSearch = item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <DashboardLayout title="Boilerplate Overview">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-400">Total Revenue</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-1">${totalRevenue}</h3>
            <span className="inline-flex items-center text-xs text-emerald-600 font-medium mt-2">
              <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> Dynamic calculation
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
          <div className="flex gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Booking
            </button>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="bg-slate-800 hover:bg-slate-900 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Auth
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search client, service, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Table */}
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
              {filteredBookings.length > 0 ? (
                filteredBookings.map((row) => (
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
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    No results match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddBookingModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddBooking={handleAddBooking}
      />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </DashboardLayout>
  )
}