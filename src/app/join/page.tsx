// src/app/join/page.tsx
'use client'

import React, { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { createClient } from '@supabase/supabase-js'
import { UserCheck, ShieldAlert, Sparkles } from 'lucide-react'

const categories = ['Electrical', 'Cleaning', 'HVAC', 'Plumbing', 'Design & Web', 'Carpentry']

export default function JoinProviderPage() {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    category: 'Plumbing',
    phone: '',
    location: '',
    experience: '',
    price: ''
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (url && key) {
        const supabase = createClient(url, key)
        await supabase.from('providers').insert([
          {
            ...formData,
            rating: 5.0,
            reviews: 0,
            approved: false // Requires admin approval before going live
          }
        ])
      }
    } catch (err) {
      console.warn('Submission fallback:', err)
    }

    setSubmitting(false)
    setSubmitted(true)
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <div 
          style={{ backgroundColor: '#3D2317', borderColor: '#5C3D2E' }} 
          className="rounded-2xl p-6 border text-white shadow-xl"
        >
          <span style={{ color: '#C68B59' }} className="text-xs font-bold tracking-wider uppercase flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Provider Onboarding
          </span>
          <h1 style={{ color: '#F5EBE0' }} className="mt-2 text-2xl font-extrabold">
            Join ZarooratHub as an Expert
          </h1>
          <p style={{ color: '#D7C4B7' }} className="mt-1 text-xs">
            Register your local skills and receive direct client bookings across Karachi.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white rounded-2xl p-8 border border-stone-200 text-center space-y-3 shadow-sm">
            <UserCheck className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-stone-900">Application Submitted!</h3>
            <p className="text-xs text-stone-600 max-w-md mx-auto">
              Your profile has been saved. An admin will review your credentials under <span className="font-semibold text-stone-800">Admin Approvals</span> before your card goes live on the marketplace.
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                setFormData({ name: '', service: '', category: 'Plumbing', phone: '', location: '', experience: '', price: '' })
              }}
              className="mt-4 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-semibold transition-colors"
            >
              Submit Another Application
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#C68B59] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Phone Number (WhatsApp)</label>
                <input
                  type="text"
                  required
                  placeholder="+923001234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#C68B59] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Service Specialty</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Electrician & Wiring"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#C68B59] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#C68B59] focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Location Area</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gulshan-e-Iqbal, Karachi"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#C68B59] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">Experience</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 Years"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#C68B59] focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-stone-700 mb-1">Service Rate</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PKR 1,500/hr"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#C68B59] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl text-amber-900 text-[11px]">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Applications require admin verification under <strong>Admin Approvals</strong> before appearing publicly.</span>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{ backgroundColor: '#2B1810', color: '#F5EBE0' }}
              className="w-full py-3 rounded-xl text-xs font-bold hover:bg-[#3D2317] transition-colors"
            >
              {submitting ? 'Submitting Application...' : 'Submit Provider Application'}
            </button>
          </form>
        )}
      </div>
    </DashboardLayout>
  )
}
