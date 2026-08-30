'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import AddBookingModal from '@/components/AddBookingModal'
import { supabase } from '@/lib/supabaseClient'
import { Provider, Booking } from '@/lib/mockData'
import { Search, Star, MapPin, Briefcase, PlusCircle, Loader2 } from 'lucide-react'

export default function Home() {
  const [userRole, setUserRole] = useState<'Customer' | 'Provider'>('Customer')
  const [providers, setProviders] = useState<Provider[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [detailProvider, setDetailProvider] = useState<Provider | null>(null)

  const categories = ['All', 'Electrical', 'Cleaning', 'HVAC', 'Plumbing', 'Design & Web', 'Carpentry']

  // 1. Fetch Providers and Bookings live from Supabase
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    const { data: providerData } = await supabase.from('providers').select('*')
    const { data: bookingData } = await supabase.from('bookings').select('*')

    if (providerData) setProviders(providerData)
    if (bookingData) setBookings(bookingData)
    setLoading(false)
  }

  const handleRoleToggle = () => {
    setUserRole(prev => (prev === 'Customer' ? 'Provider' : 'Customer'))
  }

  const handleAddBooking = async (newBooking: any) => {
    // Save to Supabase
    const { data, error } = await supabase.from('bookings').insert([newBooking]).select()
    if (!error && data) {
      setBookings([data[0], ...bookings])
    }
  }

  const filteredProviders = providers.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.service?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <DashboardLayout 
      title={userRole === 'Customer' ? 'Browse Service Providers' : 'Provider Hub'}
      userRole={userRole}
      onRoleToggle={handleRoleToggle}
    >
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-6 mb-8 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-semibold tracking-wider text-indigo-300 uppercase">QuickServe Marketplace</span>
          <h2 className="text-2xl font-bold mt-1">Find & Book Top Local Experts</h2>
          <p className="text-sm text-slate-300 mt-1">Directly connected with Supabase database.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-center">
            <span className="block text-xl font-bold text-indigo-300">{providers.length}</span>
            <span className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Active Experts</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-center">
            <span className="block text-xl font-bold text-emerald-300">{bookings.length}</span>
            <span className="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Total Bookings</span>
          </div>
        </div>
      </div>

      {/* Search Bar & Category Filters */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm mb-8 space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search electrician, cleaning, plumbing, or provider name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-slate-800"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center text-slate-400 gap-2">
          <Loader2 className="w-8 h-8 animate-spin text