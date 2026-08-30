'use client'

import { useState } from 'react'
import { X, Sparkles } from 'lucide-react'
import { Provider } from '@/lib/mockData'

interface AddBookingModalProps {
  isOpen: boolean
  onClose: () => void
  provider: Provider | null
  onAddBooking: (newBooking: any) => void
}

export default function AddBookingModal({ isOpen, onClose, provider, onAddBooking }: AddBookingModalProps) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [urgency, setUrgency] = useState<'Standard' | 'Urgent'>('Standard')

  if (!isOpen || !provider) return null

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setDescription(text)

    const urgentKeywords = ['urgent', 'emergency', 'asap', 'leak', 'leaking', 'short circuit', 'broken', 'immediately']
    if (urgentKeywords.some(word => text.toLowerCase().includes(word))) {
      setUrgency('Urgent')
    } else {
      setUrgency('Standard')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !time || !location || !description) return

    const newBooking = {
      provider_id: provider.id,
      provider_name: provider.name,
      customer_name: 'Hooriya Sheikh',
      service: provider.service,
      date,
      time,
      location,
      description: urgency === 'Urgent' ? `[URGENT] ${description}` : description,
      status: 'Pending',
      price: provider.price
    }

    onAddBooking(newBooking)
    setDate('')
    setTime('')
    setLocation('')
    setDescription('')
    setUrgency('Standard')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl relative border border-slate-100">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-800">Book Service Request</h3>
          <p className="text-xs text-slate-500 mt-0.5">Requesting: <span className="font-semibold text-indigo-600">{provider.name}</span> ({provider.service})</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Preferred Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Preferred Time</label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Service Location Address</label>
            <input
              type="text"
              required
              placeholder="e.g. House 42, Block 5, Gulshan-e-Iqbal"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-slate-600 uppercase">Issue Description</label>
              <span className="text-[11px] text-indigo-600 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Smart Urgency Detection
              </span>
            </div>
            <textarea
              required
              rows={3}
              placeholder="Describe the issue... (e.g. 'Emergency short circuit in breaker box')"
              value={description}
              onChange={handleDescriptionChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
            />
          </div>

          {urgency === 'Urgent' && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-center justify-between">
              <span>⚡ <strong>Priority Urgency Tagged:</strong> Provider will be flagged for fast response.</span>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
            >
              Submit Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}