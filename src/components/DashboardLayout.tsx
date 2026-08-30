'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Store, Calendar, UserPlus, ShieldCheck, LogIn, Sparkles } from 'lucide-react'

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
        className="w-full md:w-64 border-r flex flex-col justify-between shrink-0"
      >
        <div className="p-5 space-y-6">
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
        </div>

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