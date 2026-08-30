'use client'

import React, { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { createClient } from '@supabase/supabase-js'
import { LogIn, Key, Mail, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setMessage('')

    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (url && key) {
        const supabase = createClient(url, key)
        const { error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (authError) throw authError
        setMessage('Successfully authenticated! Redirecting to dashboard...')
      } else {
        setMessage('Demo login successful.')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-md mx-auto space-y-6 py-8">
        <div style={{ backgroundColor: '#3D2317' }} className="rounded-2xl p-6 border border-[#5C3D2E] text-white text-center">
          <span style={{ color: '#C68B59' }} className="text-xs font-bold tracking-wider uppercase">
            Provider Portal
          </span>
          <h1 style={{ color: '#F5EBE0' }} className="text-2xl font-extrabold mt-1">
            Welcome Back
          </h1>
          <p style={{ color: '#D7C4B7' }} className="text-xs mt-1">
            Log in to manage your bookings and service listings.
          </p>
        </div>

        <form onSubmit={handleLogin} className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center gap-2 text-rose-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-emerald-700 text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-stone-400" /> Email Address
            </label>
            <input
              type="email"
              required
              placeholder="provider@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C68B59]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-stone-400" /> Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#C68B59]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{ backgroundColor: '#2B1810', color: '#F5EBE0' }}
            className="w-full py-2.5 rounded-xl text-xs font-bold hover:bg-[#3D2317] transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <LogIn className="w-4 h-4" />
            {isSubmitting ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </DashboardLayout>
  )
}