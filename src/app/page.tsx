'use client'

import React, { useState, useEffect } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { createClient } from '@supabase/supabase-js'
import { Search, Star, MapPin, Award, Phone, X, Calendar, Clock, FileText, CheckCircle2 } from 'lucide-react'

const defaultProviders = [
  {
    id: '1',
    name: 'Tariq Mehmood',
    service: 'AC Repair & Pipe Leakage Specialist',
    category: 'Plumbing',
    phone: '+923334567890',
    location: 'DHA Phase 6, Karachi',
    experience: '8 Years',
    price: 'PKR 1,800/hr',
    rating: 4.9,
    reviews: 42,
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
    approved: true
  },
  {
    id: '2',
    name: 'Kamran Akmal',
    service: 'Bathroom & Pipe Fitting Master',
    category: 'Plumbing',
    phone: '+923221122334',
    location: 'Bahadurabad, Karachi',
    experience: '6 Years',
    price: 'PKR 1,600/hr',
    rating: 4.8,
    reviews: 31,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150',
    approved: true
  },
  {
    id: '3',
    name: 'Zubair Ahmed',
    service: 'Master Electrician & Wiring',
    category: 'Electrical',
    phone: '+923001234567',
    location: 'Gulshan-e-Iqbal, Karachi',
    experience: '6 Years',
    price: 'PKR 1,500/hr',
    rating: 4.9,
    reviews: 58,
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150',
    approved: true
  },
  {
    id: '4',
    name: 'Saima Khan',
    service: 'Deep Home Cleaning Specialist',
    category: 'Cleaning',
    phone: '+923219876543',
    location: 'PECHS, Karachi',
    experience: '5 Years',
    price: 'PKR 1,200/hr',
    rating: 4.9,
    reviews: 64,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    approved: true
  }
]

const categories = ['All', 'Electrical', 'Cleaning', 'HVAC', 'Plumbing', 'Design & Web', 'Carpentry']

export default function HomePage() {
  const [providers, setProviders] = useState(defaultProviders)
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  
  const [selectedProvider, setSelectedProvider] = useState<any>(null)
  const [bookingDate, setBookingDate] = useState('')
  const [bookingTime, setBookingTime] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  useEffect(() => {
    async function fetchFromSupabase() {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        if (!url || !key) return

        const supabase = createClient(url, key)
        const { data, error } = await supabase.from('providers').select('*')
        
        if (!error && data && data.length > 0) {
          const validProviders = data.filter((p: any) => p.approved === true || p.approved === undefined || p.approved === null)
          if (validProviders.length > 0) {
            setProviders(validProviders)
          }
        }
      } catch (e) {
        console.warn('Using fallback data', e)
      }
    }
    fetchFromSupabase()
  }, [])

  const handleBookNow = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const bookingPayload = {
      provider_id: selectedProvider.id?.length > 10 ? selectedProvider.id : null,
      provider_name: selectedProvider.name,
      customer_name: customerName || 'Valued Customer',
      service: selectedProvider.service,
      date: bookingDate,
      time: bookingTime,
      location: selectedProvider.location,
      description: description || 'Service booking request.',
      status: 'Pending',
      price: selectedProvider.price || selectedProvider.hourly_rate
    }

    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (url && key) {
        const supabase = createClient(url, key)
        await supabase.from('bookings').insert([bookingPayload])
      }
    } catch (err) {
      console.warn('Booking inserted locally:', err)
    }

    const formattedPhone = selectedProvider.phone?.replace(/[^0-9]/g, '') || '923001234567'
    const message = encodeURIComponent(
      `*NEW BOOKING ALERT - ZAROORATHUB*\n\n` +
      `*Customer:* ${bookingPayload.customer_name}\n` +
      `*Service:* ${bookingPayload.service}\n` +
      `*Date:* ${bookingPayload.date} at ${bookingPayload.time}\n` +
      `*Location:* ${bookingPayload.location}\n` +
      `*Note:* ${bookingPayload.description}\n\n` +
      `Please check your ZarooratHub Console to Accept or Decline.`
    )
    
    window.open(`https://wa.me/${formattedPhone}?text=${message}`, '_blank')

    setIsSubmitting(false)
    setBookingSuccess(true)
    setTimeout(() => {
      setBookingSuccess(false)
      setSelectedProvider(null)
      setCustomerName('')
      setBookingDate('')
      setBookingTime('')
      setDescription('')
    }, 2000)
  }

  const filteredProviders = providers.filter((provider) => {
    const matchesCategory = activeCategory === 'All' || provider.category === activeCategory
    const matchesSearch =
      provider.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.service?.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Banner */}
        <div 
          style={{ backgroundColor: '#3D2317', borderColor: '#5C3D2E' }} 
          className="rounded-2xl p-8 border flex justify-between items-center shadow-xl"
        >
          <div>
            <span style={{ color: '#C68B59' }} className="text-xs font-bold tracking-wider uppercase">
              ZAROORATHUB MARKETPLACE
            </span>
            <h1 style={{ color: '#F5EBE0' }} className="mt-2 text-3xl font-extrabold tracking-tight">
              Find & Book Top Local Experts
            </h1>
            <p style={{ color: '#D7C4B7' }} className="mt-2 text-sm max-w-lg">
              Aapki zaroorat, humari zimmedari! Directly connected with Supabase database.
            </p>
          </div>
          
          <div className="flex gap-4">
            <div style={{ backgroundColor: '#2B1810', borderColor: '#5C3D2E' }} className="px-5 py-3 rounded-xl border text-center">
              <span style={{ color: '#C68B59' }} className="block text-2xl font-black">{filteredProviders.length}</span>
              <span style={{ color: '#D7C4B7' }} className="text-[10px] font-bold tracking-wider uppercase">Active Experts</span>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-stone-200 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              placeholder="Search electrician, plumber, cleaning, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C68B59]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={isActive ? { backgroundColor: '#C68B59', color: '#ffffff' } : {}}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive ? 'shadow-sm font-bold' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <div key={provider.id} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={provider.avatar || provider.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'} 
                    alt={provider.name} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-[#C68B59]"
                  />
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">{provider.name}</h3>
                    <p className="text-xs font-semibold text-stone-500">{provider.service}</p>
                    <span style={{ color: '#C68B59' }} className="text-[10px] font-bold bg-amber-50 px-2.5 py-0.5 rounded-full inline-block mt-1">
                      {provider.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-stone-600 mb-4">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="font-bold text-stone-900">{provider.rating || 5.0}</span>
                    <span>({provider.reviews || 0} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-stone-400" />
                    <span>{provider.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-stone-400" />
                    <span>Experience: {provider.experience}</span>
                  </div>
                  {provider.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-stone-400" />
                      <span>{provider.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between mt-2">
                <span className="font-extrabold text-stone-900 text-sm">{provider.price || provider.hourly_rate}</span>
                <button 
                  onClick={() => setSelectedProvider(provider)}
                  style={{ backgroundColor: '#2B1810', color: '#F5EBE0' }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-[#3D2317] transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedProvider && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative border border-stone-200">
              <button 
                onClick={() => setSelectedProvider(null)}
                className="absolute right-4 top-4 text-stone-400 hover:text-stone-600"
              >
                <X className="w-5 h-5" />
              </button>

              {bookingSuccess ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto animate-bounce" />
                  <h3 className="text-xl font-bold text-stone-900">Booking Confirmed!</h3>
                  <p className="text-xs text-stone-600">Your request was saved and sent via WhatsApp to {selectedProvider.name}.</p>
                </div>
              ) : (
                <form onSubmit={handleBookNow} className="space-y-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-wider text-[#C68B59] uppercase">Schedule Appointment</span>
                    <h3 className="text-lg font-bold text-stone-900">Book {selectedProvider.name}</h3>
                    <p className="text-xs text-stone-500">{selectedProvider.service} • {selectedProvider.price || selectedProvider.hourly_rate}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Hooriya Sheikh"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C68B59]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" /> Date
                        </label>
                        <input 
                          type="date" 
                          required
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C68B59]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-stone-400" /> Time Slot
                        </label>
                        <input 
                          type="time" 
                          required
                          value={bookingTime}
                          onChange={(e) => setBookingTime(e.target.value)}
                          className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C68B59]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-stone-400" /> Issue Description
                      </label>
                      <textarea 
                        rows={3}
                        placeholder="Describe what service or fix you need..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C68B59]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{ backgroundColor: '#2B1810', color: '#F5EBE0' }}
                    className="w-full py-3 rounded-xl text-xs font-bold hover:bg-[#3D2317] transition-colors mt-4"
                  >
                    {isSubmitting ? 'Confirming...' : 'Confirm & Notify Provider'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}