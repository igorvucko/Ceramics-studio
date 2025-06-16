'use client';

import { useEffect, useState } from 'react';

interface Order {
  id: number;
  customer: string;
  total: string;
  status: string;
  date: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterCustomer, setFilterCustomer] = useState('');
  const [filterTotal, setFilterTotal] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch('http://localhost:3001/orders')
      .then(res => res.json())
      .then(data => setOrders(data));
  }, []);

  const filtered = orders.filter(o =>
    o.customer.toLowerCase().includes(filterCustomer.toLowerCase()) &&
    o.total.toLowerCase().includes(filterTotal.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-10 bg-white min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Pregled narudžbi</h1>

      <div className="flex gap-4 mb-6">
        <input
          placeholder="Filtriraj po kupcu"
          className="border p-2 rounded shadow-sm w-64"
          value={filterCustomer}
          onChange={e => setFilterCustomer(e.target.value)}
        />
        <input
          placeholder="Filtriraj po cijeni"
          className="border p-2 rounded shadow-sm w-64"
          value={filterTotal}
          onChange={e => setFilterTotal(e.target.value)}
        />
      </div>

      <div className="overflow-auto rounded shadow-lg">
        <table className="min-w-full border-collapse table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left font-medium">Kupac</th>
              <th className="p-3 text-left font-medium">Ukupno</th>
              <th className="p-3 text-left font-medium">Status</th>
              <th className="p-3 text-left font-medium">Datum</th>
              <th className="p-3 text-left font-medium">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map(order => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.total} €</td>
                <td className="p-3">{order.status}</td>
                <td className="p-3">{order.date}</td>
                <td className="p-3 space-x-2">
                  <a
                    href={`/admin/orders/${order.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Detalji
                  </a>
                  <button className="text-red-600 hover:underline">
                    Storniraj
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded border ${
              currentPage === i + 1
                ? 'bg-black text-white'
                : 'bg-white text-black'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}