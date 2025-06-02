'use client';
import Link from 'next/link';
import { useState } from 'react';

const dummyUsers = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'Customer' },
];

export default function UserList() {
  const [users, setUsers] = useState(dummyUsers);
const [open,setOpen] = useState(false)
  const handleDelete = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  const openUserform = ()=>{
    setOpen(true)
  }
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User List</h1>
      <button onClick={openUserform} className="bg-blue-500 text-white px-4 py-2 rounded">
        Create User
      </button>
      {
        open && (
            <div>Toewai</div>
        )
      }
      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">
                <Link href={`/dashboard/user/${user.id}/edit`} className="text-blue-500 mr-2 underline">Edit</Link>
                <button onClick={() => handleDelete(user.id)} className="text-red-500 underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
