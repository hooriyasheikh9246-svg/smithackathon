'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, ClipboardList, UserPlus, Sparkles, UserCheck, Shield } from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  userRole: 'Customer' | 'Provider'
  onRoleToggle: () => void
}

export default function DashboardLayout({
  children,
  title,
  userRole,
  onRoleToggle,
}: DashboardLayoutProps) {
  const pathname = usePathname()

  const navItems = [
    { name: 'Browse Experts', href: '/', icon: Home },
    { name: 'Booking Console', href: '/orders', icon: ClipboardList },
    { name: 'Join as Provider', href: '/register', icon: UserPlus },
    { name: 'AI Assistant', href: '/ai-assistant', icon: Sparkles },
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col justify-between hidden md:flex border-r border-slate-800">
        <div>
          {/* Logo & Brand Name */}
          <div className="p-6 border-b border-slate-800">
            <Link flex items-center gap-2 href="/">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-base">
                K
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                KarachiServe
              </span>
            </Link>
            <p className="text-[11px] text-slate-400 mt-1">Local Service Marketplace</p>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Role Switcher Widget */}
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800/60 rounded-xl p-3 border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                Current Role
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                userRole === 'Customer' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {userRole}
              </span>
            </div>
            <button
              onClick={onRoleToggle}
              className="w-full py-1.5 px-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              {userRole === 'Customer' ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-400" /> Switch to Provider
                </>
              ) : (
                <>
                  <Shield className="w-3.5 h-3.5 text-indigo-400" /> Switch to Customer
                </>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">{title}</h1>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex items-center gap-2 md:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`p-2 rounded-lg text-xs font-semibold ${
                  pathname === item.href ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-slate-100'
                }`}
              >
                {item.name.split(' ')[0]}
              </Link>
            ))}
          </div>
        </header>

        {/* Dynamic Page Body */}
        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  )
}