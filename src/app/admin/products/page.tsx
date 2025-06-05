'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  price: string;
  image: string;
  slug: string;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Želite li sigurno obrisati proizvod?');
    if (!confirmed) return;

await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
    });

setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Popis proizvoda</h1>
        <Link
          href="/admin/products/new"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Novi proizvod
        </Link>
      </div>

      <table className="w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left text-sm uppercase tracking-wider">
            <th className="p-3">Slika</th>
            <th className="p-3">Naziv</th>
            <th className="p-3">Cijena</th>
            <th className="p-3">Slug</th>
            <th className="p-3">Akcije</th>
          </tr>
        </thead>
      <tbody>
  {products.map((product) => (
    <tr key={product.id} className="border-t border-gray-100">
      <td className="p-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover rounded"
        />
      </td>
      <td>{product.name}</td>
      <td className="p-3">{product.price} €</td>
      <td className="p-3 text-gray-600">{product.slug}</td>
      <td className="p-3 space-x-2">
        <Link
          href={`/admin/products/${product.id}/edit`}
          className="text-blue-600 underline"
        >
          Uredi
        </Link>
        <button
          onClick={() => handleDelete(product.id)}
          className="text-red-600 underline"
        >
          Obriši
        </button>
      </td>
    </tr>
  ))}
</tbody>
</table>
</div>
  )}