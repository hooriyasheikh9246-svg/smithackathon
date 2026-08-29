import DashboardLayout from '@/components/DashboardLayout'

const USERS = [
  { id: 1, name: 'Ayesha Khan', email: 'ayesha@example.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Bilal Ahmed', email: 'bilal@example.com', role: 'Client', status: 'Pending' },
  { id: 3, name: 'Sana Malik', email: 'sana@example.com', role: 'Client', status: 'Active' },
]

export default function UsersPage() {
  return (
    <DashboardLayout title="Manage Users">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">User Management</h2>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            + Add User
          </button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="text-xs uppercase bg-slate-50 text-slate-400 font-bold border-b border-slate-100">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-600">
            {USERS.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-3 px-4 font-semibold text-slate-800">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4">
                  <span className="bg-emerald-100 text-emerald-700 text-xs px-2.5 py-1 rounded-full font-medium">
                    {user.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}