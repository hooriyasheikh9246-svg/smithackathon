'use client'

import React, { useState, useEffect } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { createClient } from '@supabase/supabase-js'
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react'

interface Booking {
  id: string
  provider_name: string
  customer_name: string
  service: string
  date: string
  time: string
  location: string
  description: string
  status: string
  price: string
  created_at: string
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = async () => {
    setLoading(true)
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

    if (url && key) {
      const supabase = createClient(url, key)
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) setBookings(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const updateStatus = async (id: string, newStatus: string) => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

    if (url && key) {
      const supabase = createClient(url, key)
      await supabase.from('bookings').update({ status: newStatus }).eq('id', id)
      fetchBookings()
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Booking Console</h1>
            <p className="text-xs text-stone-500 mt-1">Manage live service requests.</p>
          </div>
          <button 
            onClick={fetchBookings} 
            className="p-2.5 bg-stone-100 hover:bg-stone-200 rounded-xl text-stone-700"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-stone-500 text-sm">Loading bookings...</div>
        ) : bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">{item.service}</h3>
                    <p className="text-xs text-stone-500 font-semibold">Provider: {item.provider_name}</p>
                  </div>
                  <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full">{item.status}</span>
                </div>
                <div className="space-y-1 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl">
                  <p><span className="font-bold">Customer:</span> {item.customer_name}</p>
                  <p><span className="font-bold">Schedule:</span> {item.date} at {item.time}</p>
                  <p><span className="font-bold">Location:</span> {item.location}</p>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-extrabold text-stone-900 text-sm">{item.price}</span>
                  {item.status === 'Pending' && (
                    <button 
                      onClick={() => updateStatus(item.id, 'Accepted')}
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-semibold"
                    >
                      Accept Booking
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center text-stone-500 text-sm border border-stone-200">
            No active bookings found.
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
