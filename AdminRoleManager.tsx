'use client'

import { useEffect, useState } from 'react'

export default function AdminRoleManager() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('/api/admin/users').then(res => res.json()).then(setUsers)
  }, [])

  const updateRole = async (id: string, role: string) => {
    await fetch(`/api/admin/users/${id}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role }),
    })
    const updated = await fetch('/api/admin/users').then(res => res.json())
    setUsers(updated)
  }

  return (
    <div className="p-6 bg-gray-100 rounded max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">Manage User Roles</h1>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">Email</th>
            <th className="text-left">Role</th>
            <th className="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u: any) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <select
                  value={u.role}
                  onChange={(e) => updateRole(u.id, e.target.value)}
                  className="p-1 border rounded"
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
