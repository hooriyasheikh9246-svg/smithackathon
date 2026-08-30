'use client'

import React, { useState, useEffect } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { createClient } from '@supabase/supabase-js'
import { Calendar, Clock, MapPin, User, FileText, CheckCircle2, Clock3, AlertCircle, RefreshCw } from 'lucide-react'

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (!url || !key) return

      const supabase = createClient(url, key)
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setBookings(data)
      }
    } catch (e) {
      console.warn('Failed to fetch bookings:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (!url || !key) return

      const supabase = createClient(url, key)
      await supabase.from('bookings').update({ status: newStatus }).eq('id', id)
      
      setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b))
    } catch (e) {
      console.error('Status update failed:', e)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div style={{ backgroundColor: '#3D2317' }} className="rounded-2xl p-6 border border-[#5C3D2E] text-white flex justify-between items-center">
          <div>
            <span style={{ color: '#C68B59' }} className="text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Service Requests
            </span>
            <h1 style={{ color: '#F5EBE0' }} className="text-2xl font-extrabold mt-1">
              Customer Bookings Tracker
            </h1>
            <p style={{ color: '#D7C4B7' }} className="text-xs mt-1">
              Monitor incoming requests, scheduled appointments, and job statuses.
            </p>
          </div>
          <button 
            onClick={fetchBookings} 
            className="p-2.5 bg-[#2B1810] hover:bg-[#5C3D2E] text-[#F5EBE0] rounded-xl border border-[#5C3D2E] transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.length === 0 ? (
            <div className="col-span-full bg-white rounded-2xl p-8 border border-stone-200 text-center text-stone-400">
              {loading ? 'Loading bookings database...' : 'No active bookings found. Book a service from the marketplace!'}
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-bold text-[#C68B59] uppercase tracking-wider">
                        {booking.service}
                      </span>
                      <h3 className="font-bold text-stone-900 text-base">{booking.provider_name}</h3>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      booking.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                      booking.status === 'Accepted' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {booking.status || 'Pending'}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-stone-400" />
                      <span className="font-semibold text-stone-800">Customer: {booking.customer_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{booking.date} at {booking.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{booking.location}</span>
                    </div>
                    {booking.description && (
                      <div className="flex items-start gap-2 pt-1 border-t border-stone-200/60 mt-1">
                        <FileText className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <span className="italic text-stone-500">{booking.description}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 mt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="font-bold text-stone-900 text-xs">{booking.price}</span>
                  <div className="flex gap-1">
                    {booking.status !== 'Completed' && (
                      <button
                        onClick={() => updateStatus(booking.id, 'Completed')}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-semibold rounded-lg transition-colors"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}