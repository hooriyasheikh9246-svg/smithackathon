export const MOCK_BOOKINGS = [
  { id: 'BK-101', client: 'Ayesha Khan', service: 'Full Web App Audit', date: '2026-08-28', status: 'Confirmed', price: '$150' },
  { id: 'BK-102', client: 'Bilal Ahmed', service: 'UI/UX Redesign', date: '2026-08-29', status: 'Pending', price: '$300' },
  { id: 'BK-103', client: 'Sana Malik', service: 'Database Integration', date: '2026-08-30', status: 'Completed', price: '$200' },
]

export const STATUS_COLORS: Record<string, string> = {
  Confirmed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Completed: 'bg-blue-100 text-blue-700 border-blue-200',
  Pending: 'bg-amber-100 text-amber-700 border-amber-200',
  Cancelled: 'bg-rose-100 text-rose-700 border-rose-200',
}