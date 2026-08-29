'use client'
import { useState } from 'react'
import { LayoutDashboard, Users, ShoppingBag, Settings, Menu, X, LogOut } from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  role?: 'admin' | 'user'
}

export default function DashboardLayout({ children, title, role = 'user' }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navItems = role === 'admin' 
    ? [
        { label: 'Overview', icon: LayoutDashboard, href: '/' },
        { label: 'Manage Users', icon: Users, href: '#' },
        { label: 'Orders', icon: ShoppingBag, href: '#' },
      ]
    : [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/' },
        { label: 'My Bookings', icon: ShoppingBag, href: '#' },
        { label: 'Settings', icon: Settings, href: '#' },
      ]

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out flex flex-col justify-between p-4`}>
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-slate-800">
            <span className="text-xl font-bold text-indigo-400">SMIT Hack Kit</span>
            <button className="md:hidden" onClick={() => setSidebarOpen(false)}><X className="w-6 h-6" /></button>
          </div>
          <nav className="mt-6 space-y-2">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition">
                <item.icon className="w-5 h-5 text-indigo-400" />
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <button className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-400 hover:bg-slate-800 rounded-lg w-full text-left">
          <LogOut className="w-5 h-5" /> Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-600" onClick={() => setSidebarOpen(true)}><Menu className="w-6 h-6" /></button>
            <h1 className="text-xl font-semibold text-slate-800">{title}</h1>
          </div>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700 capitalize">{role} Mode</span>
        </header>
        <main className="p-6 overflow-y-auto flex-1">{children}</main>
      </div>
    </div>
  )
}