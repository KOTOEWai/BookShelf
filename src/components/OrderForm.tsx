'use client';
import Link from 'next/link';
import { useState } from 'react';

const dummyOrders = [
  { id: 1, customer: 'Alice', book: 'Book A', status: 'Pending' },
  { id: 2, customer: 'Bob', book: 'Book B', status: 'Delivered' },
];

export default function OrderList() {
  const [orders, setOrders] = useState(dummyOrders);

  const handleDelete = (id: number) => {
    setOrders(orders.filter((order) => order.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Order List</h1>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Create Order
      </button>
      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Customer</th>
            <th className="p-2 border">Book</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="p-2 border">{order.id}</td>
              <td className="p-2 border">{order.customer}</td>
              <td className="p-2 border">{order.book}</td>
              <td className="p-2 border">{order.status}</td>
              <td className="p-2 border">
                <Link href={`/dashboard/order/${order.id}/edit`} className="text-blue-500 mr-2 underline">Edit</Link>
                <button onClick={() => handleDelete(order.id)} className="text-red-500 underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
