'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Store, Calendar, UserPlus, ShieldCheck, LogIn, Sparkles, Info, Users, CheckCircle, MapPin } from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { label: 'Marketplace', href: '/', icon: Store },
    { label: 'Bookings Tracker', href: '/bookings', icon: Calendar },
    { label: 'Become a Provider', href: '/join', icon: UserPlus },
    { label: 'Admin Console', href: '/admin/providers', icon: ShieldCheck },
    { label: 'Provider Portal', href: '/login', icon: LogIn },
  ]

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside 
        style={{ backgroundColor: '#2B1810', borderColor: '#3D2317' }} 
        className="w-full md:w-72 border-r flex flex-col justify-between shrink-0"
      >
        <div className="p-5 space-y-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div style={{ backgroundColor: '#C68B59' }} className="p-2 rounded-xl text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 style={{ color: '#F5EBE0' }} className="font-extrabold text-lg tracking-tight">
                ZarooratHub
              </h2>
              <p style={{ color: '#D7C4B7' }} className="text-[10px] font-semibold uppercase tracking-wider">
                Karachi Services
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={
                    isActive
                      ? { backgroundColor: '#3D2317', color: '#F5EBE0' }
                      : { color: '#D7C4B7' }
                  }
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors hover:bg-[#3D2317] hover:text-[#F5EBE0] ${
                    isActive ? 'border-l-4 border-[#C68B59]' : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* ABOUT ZAROORATHUB BLOCK */}
          <div style={{ backgroundColor: '#3D2317', borderColor: '#5C3D2E' }} className="rounded-2xl p-4 border space-y-3">
            {/* About Block Header */}
            <div className="flex items-center gap-1.5">
              <Info style={{ color: '#C68B59' }} className="w-4 h-4 shrink-0" />
              <h3 style={{ color: '#F5EBE0' }} className="text-xs font-bold uppercase tracking-wider">
                About ZarooratHub
              </h3>
            </div>

            {/* Platform Description */}
            <p style={{ color: '#D7C4B7' }} className="text-[11px] leading-relaxed">
              Karachi’s all-in-one local marketplace connecting verified technicians, electricians, plumbers, and experts directly with households in real-time.
            </p>

            {/* Stats Divs */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div style={{ backgroundColor: '#2B1810', borderColor: '#5C3D2E' }} className="p-2 rounded-xl border text-center">
                <div className="flex items-center justify-center gap-1">
                  <Users style={{ color: '#C68B59' }} className="w-3 h-3" />
                  <span style={{ color: '#F5EBE0' }} className="text-xs font-black">14+</span>
                </div>
                <span style={{ color: '#D7C4B7' }} className="text-[9px] block uppercase font-medium">Experts</span>
              </div>

              <div style={{ backgroundColor: '#2B1810', borderColor: '#5C3D2E' }} className="p-2 rounded-xl border text-center">
                <div className="flex items-center justify-center gap-1">
                  <CheckCircle style={{ color: '#C68B59' }} className="w-3 h-3" />
                  <span style={{ color: '#F5EBE0' }} className="text-xs font-black">100%</span>
                </div>
                <span style={{ color: '#D7C4B7' }} className="text-[9px] block uppercase font-medium">Verified</span>
              </div>
            </div>

            {/* Location Badge */}
            <div style={{ backgroundColor: '#2B1810' }} className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[10px] text-[#D7C4B7]">
              <MapPin style={{ color: '#C68B59' }} className="w-3 h-3" />
              <span>Serving All Karachi Neighborhoods</span>
            </div>

            {/* About Block Footer */}
            <div className="pt-2 border-t border-[#5C3D2E] text-center">
              <span style={{ color: '#C68B59' }} className="text-[9px] font-bold tracking-widest uppercase block">
                Aapki Zaroorat, Humari Zimmedari
              </span>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#3D2317] text-center">
          <p style={{ color: '#D7C4B7' }} className="text-[10px]">
            ZarooratHub v1.0 • Powered by Supabase
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
    
  )
}