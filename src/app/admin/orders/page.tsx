'use client';

import { useEffect, useState } from 'react';

type Order = {
  id: number;
  quantity: number;
  total: number;
  createdAt: string;
  product: {
    name: string;
    price: string;
    image: string;
    slug: string;
  };
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

 useEffect(() => {
fetch('http://localhost:3000/orders')
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Greška: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) {
        throw new Error('Vraćeni podaci nisu lista.');
      }
      setOrders(data);
    })
    .catch((err) => {
      console.error('Greška kod dohvata narudžbi:', err);
      setOrders([]);
    });
}, []);


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Narudžbe</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Proizvod</th>
            <th className="p-2 text-left">Količina</th>
            <th className="p-2 text-left">Ukupno</th>
            <th className="p-2 text-left">Datum</th>
          </tr>
        </thead>
        <tbody>
  {orders.map((order) => (
    <tr key={order.id} className="border-t">
      <td className="p-2">{order.product.name}</td>
      <td className="p-2">{order.quantity}</td>
      <td className="p-2">{order.total}€</td>
      <td className="p-2">{new Date(order.createdAt).toLocaleString()}</td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}
