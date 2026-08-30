'use client'

import React, { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { createClient } from '@supabase/supabase-js'
import { UserCheck, CheckCircle2, AlertCircle } from 'lucide-react'

const categories = ['Electrical', 'Cleaning', 'HVAC', 'Plumbing', 'Design & Web', 'Carpentry']

export default function RegisterProviderPage() {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    category: 'Electrical',
    phone: '',
    location: '',
    experience: '',
    price: '',
    avatar: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const payload = {
      ...formData,
      rating: 5.0,
      reviews: 0,
      approved: false // Requires admin verification
    }

    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (url && key) {
        const supabase = createClient(url, key)
        const { error: dbError } = await supabase.from('providers').insert([payload])
        if (dbError) throw dbError
      }
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Failed to submit registration.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-6 py-4">
        <div style={{ backgroundColor: '#3D2317' }} className="rounded-2xl p-6 border border-[#5C3D2E] text-white">
          <span style={{ color: '#C68B59' }} className="text-xs font-bold tracking-wider uppercase">
            Provider Onboarding
          </span>
          <h1 style={{ color: '#F5EBE0' }} className="text-2xl font-extrabold mt-1">
            Join ZarooratHub as an Expert
          </h1>
          <p style={{ color: '#D7C4B7' }} className="text-xs mt-1">
            Register your services to start receiving bookings from local customers across Karachi.
          </p>
        </div>

        {success ? (
          <div className="bg-white rounded-2xl p-8 border border-stone-200 text-center space-y-3 shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-bold text-stone-900">Application Submitted!</h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto">
              Your profile has been submitted for review. An admin will verify your details before activating your marketplace listing.
            </p>
            <button
              onClick={() => {
                setSuccess(false)
                setFormData({ name: '', service: '', category: 'Electrical', phone: '', location: '', experience: '', price: '', avatar: '' })
              }}
              style={{ backgroundColor: '#2B1810', color: '#F5EBE0' }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#3D2317] transition-colors mt-2"
            >
              Submit Another Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C68B59]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Primary Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C68B59]"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Service Title / Speciality</label>
                <input
                  type="text"
                  name="service"
                  required
                  placeholder="e.g. AC Repair & Leakage Specialist"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C68B59]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">WhatsApp / Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  required
                  placeholder="e.g. +923334567890"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C68B59]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Location / Area</label>
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="e.g. DHA Phase 6, Karachi"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C68B59]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Years of Experience</label>
                <input
                  type="text"
                  name="experience"
                  required
                  placeholder="e.g. 8 Years"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C68B59]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Hourly Rate / Price</label>
                <input
                  type="text"
                  name="price"
                  required
                  placeholder="e.g. PKR 1,800/hr"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C68B59]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Avatar / Profile Image URL (Optional)</label>
              <input
                type="url"
                name="avatar"
                placeholder="https://images.unsplash.com/..."
                value={formData.avatar}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C68B59]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{ backgroundColor: '#2B1810', color: '#F5EBE0' }}
              className="w-full py-3 rounded-xl text-xs font-bold hover:bg-[#3D2317] transition-colors flex items-center justify-center gap-2 mt-2"
            >
              <UserCheck className="w-4 h-4" />
              {isSubmitting ? 'Submitting Application...' : 'Submit Provider Registration'}
            </button>
          </form>
        )}
      </div>
    </DashboardLayout>
  )
}