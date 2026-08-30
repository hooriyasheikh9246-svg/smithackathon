'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import { Sparkles, Calculator, AlertTriangle, CheckCircle2, ArrowRight } from 'lucide-react'

export default function AIAssistantPage() {
  const [userRole, setUserRole] = useState<'Customer' | 'Provider'>('Customer')
  
  // Cost Estimator State
  const [category, setCategory] = useState('Electrical')
  const [scope, setScope] = useState('Minor Repair')
  const [urgency, setUrgency] = useState('Standard')
  const [estimatedCost, setEstimatedCost] = useState<string | null>(null)
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null)

  // Troubleshooting State
  const [query, setQuery] = useState('')
  const [solution, setSolution] = useState<string | null>(null)

  // Calculate AI Estimate
  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    let baseRate = 25
    let hours = 1.5

    if (category === 'HVAC') { baseRate = 35; hours = 2 }
    if (category === 'Plumbing') { baseRate = 30; hours = 1.5 }
    if (category === 'Cleaning') { baseRate = 40; hours = 3 }
    if (category === 'Design & Web') { baseRate = 50; hours = 5 }

    if (scope === 'Medium Overhaul') hours *= 1.8
    if (scope === 'Major Installation') hours *= 3

    if (urgency === 'Urgent') baseRate *= 1.25

    const total = Math.round(baseRate * hours)
    setEstimatedCost(`$${total}`)
    setEstimatedTime(`${hours.toFixed(1)} hours`)
  }

  // Generate Smart Solution
  const handleTroubleshoot = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return

    const lower = query.toLowerCase()
    if (lower.includes('leak') || lower.includes('water')) {
      setSolution('Turn off the main water valve immediately. Clear nearby electric appliances and contact a Plumbing Specialist.')
    } else if (lower.includes('spark') || lower.includes('short') || lower.includes('power')) {
      setSolution('Flip the main breaker switch to OFF. Do not touch exposed copper wires. Request an Emergency Electrician.')
    } else if (lower.includes('ac') || lower.includes('cooling') || lower.includes('heat')) {
      setSolution('Clean or replace your AC air filters. If coils are frozen, shut off the unit for 2 hours before calling an HVAC expert.')
    } else {
      setSolution('Ensure area safety, document photos/videos of the problem, and submit an urgent booking request for an on-site expert inspect.')
    }
  }

  return (
    <DashboardLayout 
      title="QuickServe AI Tools"
      userRole={userRole}
      onRoleToggle={() => setUserRole(prev => (prev === 'Customer' ? 'Provider' : 'Customer'))}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tool 1: AI Cost & Time Estimator */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase mb-1">
            <Calculator className="w-4 h-4" /> AI Cost Estimator
          </div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">Estimate Job Rates & Duration</h2>
          <p className="text-xs text-slate-500 mb-6">Get intelligent pricing insights before booking a service provider.</p>

          <form onSubmit={handleCalculate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Service Type</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white"
              >
                <option value="Electrical">Electrical Work</option>
                <option value="Cleaning">Deep Home Cleaning</option>
                <option value="HVAC">AC & Inverter Servicing</option>
                <option value="Plumbing">Plumbing & Sanitary</option>
                <option value="Design & Web">Web & Graphic Design</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Job Scope</label>
              <select
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 bg-white"
              >
                <option value="Minor Repair">Minor Repair / Quick Fix</option>
                <option value="Medium Overhaul">Standard Maintenance / Overhaul</option>
                <option value="Major Installation">Full Installation / Complex Job</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Urgency Level</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setUrgency('Standard')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border ${
                    urgency === 'Standard' ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  Standard
                </button>
                <button
                  type="button"
                  onClick={() => setUrgency('Urgent')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg border ${
                    urgency === 'Urgent' ? 'bg-amber-500 text-white border-amber-500' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  ⚡ Urgent (+25%)
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
            >
              Calculate AI Estimate
            </button>
          </form>

          {estimatedCost && (
            <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-600 block">Estimated Cost</span>
                <span className="text-xl font-bold text-slate-800">{estimatedCost}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-indigo-600 block">Est. Completion</span>
                <span className="text-sm font-bold text-slate-800">{estimatedTime}</span>
              </div>
            </div>
          )}
        </div>

        {/* Tool 2: Emergency Diagnostic Assistant */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase mb-1">
            <Sparkles className="w-4 h-4" /> AI Emergency Assistant
          </div>
          <h2 className="text-lg font-bold text-slate-800 mb-1">Instant Issue Diagnostics</h2>
          <p className="text-xs text-slate-500 mb-6">Describe an emergency problem to get immediate safety steps.</p>

          <form onSubmit={handleTroubleshoot} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Describe Emergency Issue</label>
              <textarea
                rows={4}
                required
                placeholder="e.g. Water leaking near main distribution box, or AC throwing warm air..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Diagnose & Get Protocol
            </button>
          </form>

          {solution && (
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs mb-1">
                <AlertTriangle className="w-4 h-4" /> Safety Protocol Advice
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">{solution}</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}