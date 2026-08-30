'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Sparkles, CheckCircle2, User, Briefcase, DollarSign, MapPin, FileText } from 'lucide-react'

export default function RegisterProviderPage() {
  const [userRole, setUserRole] = useState<'Customer' | 'Provider'>('Provider')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    serviceTitle: '',
    category: 'Electrical',
    location: '',
    experience: '',
    price: '',
    description: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <DashboardLayout 
      title="Provider Registration"
      userRole={userRole}
      onRoleToggle={() => setUserRole(prev => (prev === 'Customer' ? 'Provider' : 'Customer'))}
    >
      <div className="max-w-2xl mx-auto">
        {isSubmitted ? (
          <div className="bg-white border border-slate-100 rounded-2xl p-8 text-center shadow-sm">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Application Submitted!</h2>
            <p className="text-slate-600 text-sm mt-2">
              Thank you, <span className="font-semibold text-slate-800">{formData.fullName}</span>. Your provider profile for <strong>{formData.serviceTitle}</strong> has been created and is pending verification.
            </p>

            <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mt-6 text-left text-xs text-slate-600 space-y-2">
              <p><strong>Category:</strong> {formData.category}</p>
              <p><strong>Location:</strong> {formData.location}</p>
              <p><strong>Hourly / Unit Rate:</strong> {formData.price}</p>
              <p><strong>Experience:</strong> {formData.experience}</p>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  fullName: '',
                  serviceTitle: '',
                  category: 'Electrical',
                  location: '',
                  experience: '',
                  price: '',
                  description: ''
                })
              }}
              className="mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
            >
              Register Another Profile
            </button>
          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded">
                Join ZarooratHub Platform
              </span>
              <h2 className="text-xl font-bold text-slate-800 mt-2">Become a Verified Service Provider</h2>
              <p className="text-xs text-slate-500 mt-1">List your skills and start receiving local job requests from Karachi residents.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Zubair Ahmed"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Service Title</label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="serviceTitle"
                      required
                      placeholder="e.g. Master Electrician & Wiring"
                      value={formData.serviceTitle}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
                  >
                    <option value="Electrical">Electrical</option>
                    <option value="Cleaning">Cleaning</option>
                    <option value="HVAC">HVAC</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Design & Web">Design & Web</option>
                    <option value="Carpentry">Carpentry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Area / Location</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="location"
                      required
                      placeholder="e.g. Gulshan-e-Iqbal, Karachi"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Years of Experience</label>
                  <input
                    type="text"
                    name="experience"
                    required
                    placeholder="e.g. 5 Years"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Rate / Price Tag</label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      name="price"
                      required
                      placeholder="e.g. $25/hr or $35/visit"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Service Bio & Description</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  placeholder="Summarize your tools, certifications, and service focus..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold transition-colors shadow-sm mt-2"
              >
                Submit Provider Application
              </button>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}