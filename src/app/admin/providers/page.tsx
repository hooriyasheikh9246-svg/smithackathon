'use client'

import React, { useState, useEffect } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { createClient } from '@supabase/supabase-js'
import { Check, X, ShieldAlert, RefreshCw, UserCheck } from 'lucide-react'

interface PendingProvider {
  id: string
  name: string
  service: string
  category: string
  phone: string
  location: string
  experience: string
  price?: string
  hourly_rate?: string
  approved: boolean
  created_at?: string
}

const fallbackApplicants: PendingProvider[] = [
  {
    id: 'demo-1',
    name: 'Hamza Sheikh',
    service: 'Solar Panel Installation & Wiring',
    category: 'Electrical',
    phone: '+923009876543',
    location: 'Gulshan-e-Iqbal, Karachi',
    experience: '4 Years',
    price: 'PKR 2,500/hr',
    approved: false,
  },
  {
    id: 'demo-2',
    name: 'Bilal Raza',
    service: 'Plumbing & Water Tank Cleaning',
    category: 'Plumbing',
    phone: '+923123456789',
    location: 'North Nazimabad, Karachi',
    experience: '5 Years',
    price: 'PKR 1,800/hr',
    approved: false,
  }
]

export default function AdminProvidersPage() {
  const [applicants, setApplicants] = useState<PendingProvider[]>(fallbackApplicants)
  const [loading, setLoading] = useState(false)

  const fetchApplicants = async () => {
    setLoading(true)
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

      if (url && key) {
        const supabase = createClient(url, key)
        const { data, error } = await supabase
          .from('providers')
          .select('*')
          .order('created_at', { ascending: false })

        if (!error && data && data.length > 0) {
          setApplicants(data)
        }
      }
    } catch (err) {
      console.warn('Using fallback data:', err)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchApplicants()
  }, [])

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    setApplicants((prev) =>
      prev.map((item) => (item.id === id ? { ...item, approved: !currentStatus } : item))
    )

    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

      if (url && key) {
        const supabase = createClient(url, key)
        await supabase
          .from('providers')
          .update({ approved: !currentStatus })
          .eq('id', id)
      }
    } catch (err) {
      console.error('Update error:', err)
    }
  }

  const deleteApplicant = async (id: string) => {
    setApplicants((prev) => prev.filter((item) => item.id !== id))

    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

      if (url && key) {
        const supabase = createClient(url, key)
        await supabase.from('providers').delete().eq('id', id)
      }
    } catch (err) {
      console.error('Delete error:', err)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-stone-900">Provider Approvals</h1>
            <p className="text-xs text-stone-500 mt-1">
              Review new registrations before publishing them to the public marketplace.
            </p>
          </div>
          <button
            onClick={fetchApplicants}
            className="p-2.5 bg-stone-100 hover:bg-stone-200 rounded-xl text-stone-700 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-stone-500 text-sm">Loading applications...</div>
        ) : applicants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {applicants.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-stone-900 text-base">{item.name}</h3>
                    <p className="text-xs text-stone-500 font-semibold">{item.service}</p>
                  </div>
                  {item.approved ? (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <UserCheck className="w-3 h-3" /> Live on Web
                    </span>
                  ) : (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" /> Pending Review
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100">
                  <p><span className="font-bold text-stone-800">Category:</span> {item.category}</p>
                  <p><span className="font-bold text-stone-800">Rate:</span> {item.price || item.hourly_rate || 'PKR 1,500/hr'}</p>
                  <p><span className="font-bold text-stone-800">Location:</span> {item.location}</p>
                  <p><span className="font-bold text-stone-800">Exp:</span> {item.experience}</p>
                  <p className="col-span-2"><span className="font-bold text-stone-800">Phone:</span> {item.phone}</p>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => toggleApproval(item.id, item.approved)}
                    style={item.approved ? { backgroundColor: '#78350F' } : { backgroundColor: '#15803D' }}
                    className="px-3 py-1.5 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    {item.approved ? 'Revoke Approval' : 'Approve & Publish'}
                  </button>

                  <button
                    onClick={() => deleteApplicant(item.id)}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" /> Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center text-stone-500 text-sm border border-stone-200">
            No provider applications pending!
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}