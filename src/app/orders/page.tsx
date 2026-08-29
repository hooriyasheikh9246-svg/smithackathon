import DashboardLayout from '@/components/DashboardLayout'
import { MOCK_BOOKINGS, STATUS_COLORS } from '@/lib/mockData'

export default function OrdersPage() {
  return (
    <DashboardLayout title="Orders Overview">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">All Orders</h2>
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase bg-slate-50 text-slate-400 font-bold border-b border-slate-100">
            <tr>
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Client</th>
              <th className="py-3 px-4">Service</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {MOCK_BOOKINGS.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3 px-4 text-xs font-mono">{row.id}</td>
                <td className="py-3 px-4 font-semibold text-slate-800">{row.client}</td>
                <td className="py-3 px-4">{row.service}</td>
                <td className="py-3 px-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${STATUS_COLORS[row.status] || ''}`}>
                    {row.status}
                  </span>
                </td>
                <td className="py-3 px-4 font-semibold text-slate-800">{row.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}