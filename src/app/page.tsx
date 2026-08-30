'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import AddBookingModal from '@/components/AddBookingModal'
import { MOCK_PROVIDERS, MOCK_BOOKINGS, Provider, Booking } from '@/lib/mockData'
import { Search, Star, MapPin, Briefcase, PlusCircle, CheckCircle, Clock } from 'lucide-react'

export default function Home() {
  const [userRole, setUserRole] = useState<'Customer' | 'Provider'>('Customer')
  const [providers] = useState<Provider[]>(MOCK_PROVIDERS)
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [detailProvider, setDetailProvider] = useState<Provider | null>(null)

  // Categories list
  const categories = ['All', 'Electrical', 'Cleaning', 'HVAC', 'Plumbing', 'Design & Web', 'Carpentry']

  // Handle Role Toggle
  const handleRoleToggle = () => {
    setUserRole(prev => (prev === 'Customer' ? 'Provider' : 'Customer'))
  }

  // Add new booking to dynamic state
  const handleAddBooking = (newBooking: Booking) => {
    setBookings([newBooking, ...bookings])
  }

  // Filter providers by search query and category
  const filteredProviders = providers.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchTerm.toLowerCase())
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
          <p className="text-sm text-slate-300 mt-1">Directly connect with verified service providers across Karachi.</p>
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

        {/* Category Pills */}
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

      {/* Provider Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders.length > 0 ? (
          filteredProviders.map((provider) => (
            <div 
              key={provider.id}
              className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Provider Header */}
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={provider.avatar}
                    alt={provider.name}
                    className="w-14 h-14 rounded-full object-cover border border-slate-200 shadow-sm"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {provider.category}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{provider.rating}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-800 text-base mt-1 truncate group-hover:text-indigo-600 transition-colors">
                      {provider.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{provider.service}</p>
                  </div>
                </div>

                {/* Details Meta */}
                <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                  {provider.description}
                </p>

                <div className="space-y-1.5 border-t border-b border-slate-100 py-3 mb-4 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{provider.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>{provider.experience} Experience</span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-between gap-3 pt-1">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Rate</span>
                  <span className="text-base font-bold text-slate-800">{provider.price}</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDetailProvider(provider)}
                    className="px-3 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50 transition-colors"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => setSelectedProvider(provider)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <PlusCircle className="w-3.5 h-3.5" /> Book
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center bg-white rounded-xl border border-slate-100">
            <p className="text-slate-400 text-sm">No service providers match your search or filter options.</p>
          </div>
        )}
      </div>

      {/* Provider Details View Modal */}
      {detailProvider && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl relative border border-slate-100">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={detailProvider.avatar}
                alt={detailProvider.name}
                className="w-16 h-16 rounded-full object-cover border border-slate-200"
              />
              <div>
                <h3 className="text-lg font-bold text-slate-800">{detailProvider.name}</h3>
                <p className="text-xs text-indigo-600 font-semibold">{detailProvider.service}</p>
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500 mt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{detailProvider.rating} / 5.0 Rating</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-lg mb-4">
              <p><strong>Category:</strong> {detailProvider.category}</p>
              <p><strong>Location:</strong> {detailProvider.location}</p>
              <p><strong>Experience:</strong> {detailProvider.experience}</p>
              <p><strong>Pricing Tag:</strong> {detailProvider.price}</p>
              <p className="pt-2 border-t border-slate-200"><strong>Bio:</strong> {detailProvider.description}</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDetailProvider(null)}
                className="flex-1 py-2 px-4 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const p = detailProvider
                  setDetailProvider(null)
                  setSelectedProvider(p)
                }}
                className="flex-1 py-2 px-4 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700"
              >
                Proceed to Book
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Smart Booking Modal */}
      <AddBookingModal
        isOpen={!!selectedProvider}
        onClose={() => setSelectedProvider(null)}
        provider={selectedProvider}
        onAddBooking={handleAddBooking}
      />
    </DashboardLayout>
  )
}