'use client'

import React, { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Star, X, CheckCircle2, AlertCircle } from 'lucide-react'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  providerId: string
  providerName: string
}

export default function ReviewModal({ isOpen, onClose, providerId, providerName }: ReviewModalProps) {
  const [rating, setRating] = useState(5)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (url && key) {
        const supabase = createClient(url, key)
        const { error: dbError } = await supabase.from('reviews').insert([
          {
            provider_id: providerId,
            customer_name: customerName,
            rating,
            comment
          }
        ])
        if (dbError) throw dbError
      }
      setSuccess(true)
    } catch (err: any) {
      setError(err.message || 'Failed to submit review.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-stone-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span style={{ color: '#C68B59' }} className="text-[10px] font-bold tracking-wider uppercase">
            Leave Feedback
          </span>
          <h2 className="text-lg font-bold text-stone-900">Rate {providerName}</h2>
        </div>

        {success ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="font-bold text-stone-900 text-base">Thank You!</h3>
            <p className="text-xs text-stone-600">Your review has been successfully submitted.</p>
            <button
              onClick={onClose}
              style={{ backgroundColor: '#2B1810', color: '#F5EBE0' }}
              className="px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#3D2317] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Your Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= (hoverRating || rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Sara Khan"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C68B59]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Review / Experience</label>
              <textarea
                required
                rows={3}
                placeholder="Share your experience regarding the service quality..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C68B59]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{ backgroundColor: '#2B1810', color: '#F5EBE0' }}
              className="w-full py-2.5 rounded-xl text-xs font-bold hover:bg-[#3D2317] transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Post Review'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}