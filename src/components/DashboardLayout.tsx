// src/components/DashboardLayout.tsx
'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Calendar, UserPlus, ShieldCheck, Wrench } from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navItems = [
    { name: 'Marketplace', href: '/', icon: Home },
    { name: 'Booking Console', href: '/bookings', icon: Calendar },
    { name: 'Join as Provider', href: '/join', icon: UserPlus },
    { name: 'Admin Approvals', href: '/admin/providers', icon: ShieldCheck },
  ]

  return (
    <div className="min-h-screen bg-stone-100 flex text-stone-800">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2B1810] text-[#F5EBE0] flex flex-col justify-between p-5 hidden md:flex shrink-0 border-r border-[#3D2317]">
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="p-2 bg-[#C68B59] rounded-xl text-white">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-black text-lg tracking-wide text-[#F5EBE0]">ZAROORATHUB</h2>
              <p className="text-[10px] text-[#C68B59] font-bold tracking-wider uppercase">Local Service Engine</p>
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
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#C68B59] text-white shadow-md font-bold'
                      : 'text-[#D7C4B7] hover:bg-[#3D2317] hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="p-4 bg-[#3D2317] rounded-xl border border-[#5C3D2E] text-xs">
          <p className="text-[#C68B59] font-bold">ZarooratHub v1.0</p>
          <p className="text-[#D7C4B7] text-[10px] mt-0.5">MVP End-to-End System Ready</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  )
}
