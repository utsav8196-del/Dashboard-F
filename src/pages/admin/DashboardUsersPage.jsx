import { useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle.js";
import { fetchUsers, updateUserStatus } from "../../services/userService.js";

export default function DashboardUsersPage() {
  const [users, setUsers] = useState([]);

  useDocumentTitle("Manage users");

  async function loadUsers() {
    const data = await fetchUsers();
    setUsers(data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[rgb(var(--muted))]">Access control</p>
        <h2 className="font-display text-2xl sm:text-3xl font-bold">Users</h2>
      </div>
      <div className="panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="px-5 py-4 font-semibold">{user.name}</td>
                  <td className="px-5 py-4">{user.email}</td>
                  <td className="px-5 py-4">
                    <span className="badge bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`badge ${user.isActive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200" : "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200"}`}>
                      {user.isActive ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      className="btn-secondary !px-4 !py-2"
                      onClick={() => updateUserStatus(user._id, { isActive: !user.isActive }).then(loadUsers)}
                    >
                      {user.isActive ? "Block" : "Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
