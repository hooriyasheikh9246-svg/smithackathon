'use client'

import React, { useState, useEffect } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { createClient } from '@supabase/supabase-js'
import { ShieldCheck, Check, X, Trash2, RefreshCw, Star } from 'lucide-react'

export default function AdminDashboardPage() {
  const [providers, setProviders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProviders = async () => {
    setLoading(true)
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (!url || !key) return

      const supabase = createClient(url, key)
      const { data, error } = await supabase.from('providers').select('*').order('created_at', { ascending: false })
      if (!error && data) {
        setProviders(data)
      }
    } catch (e) {
      console.warn('Failed to load admin data:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProviders()
  }, [])

  const toggleApproval = async (id: string, currentStatus: boolean) => {
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (!url || !key) return

      const supabase = createClient(url, key)
      await supabase.from('providers').update({ approved: !currentStatus }).eq('id', id)
      
      setProviders(providers.map(p => p.id === id ? { ...p, approved: !currentStatus } : p))
    } catch (e) {
      console.error('Update failed:', e)
    }
  }

  const deleteProvider = async (id: string) => {
    if (!confirm('Are you sure you want to delete this provider?')) return
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      if (!url || !key) return

      const supabase = createClient(url, key)
      await supabase.from('providers').delete().eq('id', id)
      setProviders(providers.filter(p => p.id !== id))
    } catch (e) {
      console.error('Delete failed:', e)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div style={{ backgroundColor: '#3D2317' }} className="rounded-2xl p-6 border border-[#5C3D2E] text-white flex justify-between items-center">
          <div>
            <span style={{ color: '#C68B59' }} className="text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Admin Console
            </span>
            <h1 style={{ color: '#F5EBE0' }} className="text-2xl font-extrabold mt-1">
              Provider Verification & Approvals
            </h1>
            <p style={{ color: '#D7C4B7' }} className="text-xs mt-1">
              Approve or reject service providers before they go live on the ZarooratHub marketplace.
            </p>
          </div>
          <button 
            onClick={fetchProviders} 
            className="p-2.5 bg-[#2B1810] hover:bg-[#5C3D2E] text-[#F5EBE0] rounded-xl border border-[#5C3D2E] transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex justify-between items-center">
            <h3 className="font-bold text-stone-900 text-sm">Registered Providers ({providers.length})</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-600">
              <thead className="bg-stone-50 text-stone-700 uppercase tracking-wider text-[10px] border-b border-stone-200">
                <tr>
                  <th className="p-3">Provider</th>
                  <th className="p-3">Category & Service</th>
                  <th className="p-3">Location & Phone</th>
                  <th className="p-3">Rate</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {providers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-stone-400">
                      {loading ? 'Fetching records...' : 'No external providers found in Supabase database.'}
                    </td>
                  </tr>
                ) : (
                  providers.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50/50 transition-colors">
                      <td className="p-3 flex items-center gap-2.5">
                        <img 
                          src={p.avatar || p.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'} 
                          alt={p.name} 
                          className="w-8 h-8 rounded-full object-cover border border-[#C68B59]" 
                        />
                        <div>
                          <p className="font-bold text-stone-900">{p.name}</p>
                          <span className="text-[10px] text-stone-400">{p.experience} Exp</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <p className="font-semibold text-stone-800">{p.service}</p>
                        <span style={{ color: '#C68B59' }} className="text-[10px] font-bold bg-amber-50 px-2 py-0.5 rounded-md inline-block">
                          {p.category}
                        </span>
                      </td>
                      <td className="p-3">
                        <p className="text-stone-800">{p.location}</p>
                        <p className="text-stone-400 text-[10px]">{p.phone}</p>
                      </td>
                      <td className="p-3 font-bold text-stone-900">{p.price || p.hourly_rate}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                          p.approved 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.approved ? 'Approved' : 'Pending Approval'}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => toggleApproval(p.id, p.approved)}
                          className={`p-1.5 rounded-lg border text-xs font-semibold ${
                            p.approved
                              ? 'bg-stone-100 text-stone-600 border-stone-200 hover:bg-stone-200'
                              : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                          }`}
                        >
                          {p.approved ? <X className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => deleteProvider(p.id)}
                          className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}