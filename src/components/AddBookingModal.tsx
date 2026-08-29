'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface AddBookingModalProps {
  isOpen: boolean
  onClose: () => void
  onAddBooking: (newBooking: { id: string; client: string; service: string; status: 'Confirmed' | 'Pending' | 'Completed'; price: string }) => void
}

export default function AddBookingModal({ isOpen, onClose, onAddBooking }: AddBookingModalProps) {
  const [client, setClient] = useState('')
  const [service, setService] = useState('')
  const [status, setStatus] = useState<'Confirmed' | 'Pending' | 'Completed'>('Pending')
  const [price, setPrice] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!client || !service || !price) return

    const newBooking = {
      id: `BK-${Math.floor(100 + Math.random() * 900)}`,
      client,
      service,
      status,
      price: price.startsWith('$') ? price : `$${price}`
    }

    onAddBooking(newBooking)
    setClient('')
    setService('')
    setStatus('Pending')
    setPrice('')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl relative border border-slate-100">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-slate-800 mb-4">Create New Booking</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Client Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Sara Ahmed"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Service Type</label>
            <input
              type="text"
              required
              placeholder="e.g. Full Stack Integration"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'Confirmed' | 'Pending' | 'Completed')}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Price ($)</label>
              <input
                type="text"
                required
                placeholder="250"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Save Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}