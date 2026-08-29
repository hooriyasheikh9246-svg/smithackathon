'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, Users, ShoppingBag, Settings, Menu, X, LogOut } from 'lucide-react'

interface DashboardLayoutProps {
  children: React.ReactNode
  title?: string
}

export default function DashboardLayout({ children, title = 'Dashboard' }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 flex justify-between items-center border-b border-slate-800">
          <h1 className="text-xl font-bold tracking-tight text-indigo-400">SMIT Hack Kit</h1>
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors font-medium text-sm"
          >
            <LayoutDashboard className="w-5 h-5 text-indigo-400" />
            <span>Overview</span>
          </Link>

          <Link
            href="/users"
            className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors font-medium text-sm"
          >
            <Users className="w-5 h-5 text-indigo-400" />
            <span>Manage Users</span>
          </Link>

          <Link
            href="/orders"
            className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors font-medium text-sm"
          >
            <ShoppingBag className="w-5 h-5 text-indigo-400" />
            <span>Orders</span>
          </Link>
        </nav>

        {/* Footer Link / User profile area */}
        <div className="p-4 border-t border-slate-800">
          <button 
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors font-medium text-sm"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-slate-600 hover:text-slate-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-slate-800">{title}</h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1.5 rounded-full font-semibold">
              Admin Mode
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
