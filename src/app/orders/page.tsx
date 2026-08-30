'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { MOCK_BOOKINGS, STATUS_COLORS, Booking } from '@/lib/mockData'
import { Clock, CheckCircle2, PlayCircle, XCircle, Star, MessageSquare, Shield, UserCheck } from 'lucide-react'

export default function OrdersPage() {
  const [userRole, setUserRole] = useState<'Customer' | 'Provider'>('Customer')
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS)
  const [reviewBooking, setReviewBooking] = useState<Booking | null>(null)
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')

  // Status State Management
  const updateStatus = (id: string, newStatus: Booking['status']) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: newStatus } : b))
    )
  }

  // Submit Review
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reviewBooking) return

    setBookings(prev =>
      prev.map(b =>
        b.id === reviewBooking.id
          ? { ...b, hasReviewed: true, rating, reviewText }
          : b
      )
    )

    setReviewBooking(null)
    setRating(5)
    setReviewText('')
  }

  return (
    <DashboardLayout 
      title={userRole === 'Customer' ? 'My Booking Requests' : 'Incoming Provider Jobs'}
      userRole={userRole}
      onRoleToggle={() => setUserRole(prev => (prev === 'Customer' ? 'Provider' : 'Customer'))}
    >
      {/* Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            {userRole === 'Customer' ? 'Customer Dashboard' : 'Provider Work Console'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {userRole === 'Customer' 
              ? 'Track real-time request statuses and submit service reviews.' 
              : 'Accept incoming bookings and update service execution status.'}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-lg border border-slate-200">
          <button
            onClick={() => setUserRole('Customer')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              userRole === 'Customer' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Customer View
          </button>
          <button
            onClick={() => setUserRole('Provider')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              userRole === 'Provider' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Provider View
          </button>
        </div>
      </div>

      {/* Bookings Table / List */}
      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-slate-400">{booking.id}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${STATUS_COLORS[booking.status]}`}>
                    {booking.status}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-800">{booking.service}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Provider: <span className="font-semibold text-slate-700">{booking.providerName}</span> | Customer: <span className="font-semibold text-slate-700">{booking.customerName}</span>
                </p>
              </div>

              <div className="text-left md:text-right">
                <span className="text-xs text-slate-400 uppercase font-semibold block">Agreed Rate</span>
                <span className="text-lg font-bold text-slate-800">{booking.price}</span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600 bg-slate-50 p-3 rounded-lg mb-4">
              <div><strong>Scheduled:</strong> {booking.date} at {booking.time}</div>
              <div><strong>Location:</strong> {booking.location}</div>
              <div className="md:col-span-1 truncate"><strong>Notes:</strong> {booking.description}</div>
            </div>

            {/* Action Bar based on Role */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              {/* Review Info / Status indicator */}
              <div className="text-xs">
                {booking.hasReviewed ? (
                  <div className="flex items-center gap-1.5 text-amber-600 font-medium">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>Reviewed: {booking.rating}/5 — "{booking.reviewText}"</span>
                  </div>
                ) : (
                  <span className="text-slate-400">
                    {booking.status === 'Completed' ? 'Awaiting customer rating' : 'Workflow in progress'}
                  </span>
                )}
              </div>

              {/* Workflow Actions */}
              <div className="flex items-center gap-2">
                {/* PROVIDER ACTIONS */}
                {userRole === 'Provider' && (
                  <>
                    {booking.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => updateStatus(booking.id, 'Rejected')}
                          className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-bold transition-colors border border-rose-200"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => updateStatus(booking.id, 'Accepted')}
                          className="px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-xs font-bold transition-colors shadow-sm"
                        >
                          Accept Booking
                        </button>
                      </>
                    )}

                    {booking.status === 'Accepted' && (
                      <button
                        onClick={() => updateStatus(booking.id, 'In Progress')}
                        className="px-3 py-1.5 bg-purple-600 text-white hover:bg-purple-700 rounded-lg text-xs font-bold transition-colors shadow-sm flex items-center gap-1"
                      >
                        <PlayCircle className="w-3.5 h-3.5" /> Start Service
                      </button>
                    )}

                    {booking.status === 'In Progress' && (
                      <button
                        onClick={() => updateStatus(booking.id, 'Completed')}
                        className="px-3 py-1.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg text-xs font-bold transition-colors shadow-sm flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mark Completed
                      </button>
                    )}
                  </>
                )}

                {/* CUSTOMER ACTIONS */}
                {userRole === 'Customer' && (
                  <>
                    {booking.status === 'Completed' && !booking.hasReviewed && (
                      <button
                        onClick={() => setReviewBooking(booking)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition-colors shadow-sm flex items-center gap-1"
                      >
                        <Star className="w-3.5 h-3.5 fill-white" /> Write Review
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Modal */}
      {reviewBooking && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl relative border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-1">Rate & Review Service</h3>
            <p className="text-xs text-slate-500 mb-4">Share feedback for {reviewBooking.providerName} ({reviewBooking.service})</p>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Star Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Your Feedback</label>
                <textarea
                  required
                  rows={3}
                  placeholder="Excellent work, punctual and professional!"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewBooking(null)}
                  className="flex-1 py-2 px-4 border border-slate-200 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 px-4 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold shadow-sm"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}