'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: string;
  slug: string;
  image: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filterName, setFilterName] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Jeste li sigurni da želite obrisati proizvod?');
    if (!confirmed) return;
    await fetch(`http://localhost:3001/products/${id}`, {
      method: 'DELETE',
    });
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const filtered = products.filter(
    p =>
      p.name.toLowerCase().includes(filterName.toLowerCase()) &&
      p.price.toLowerCase().includes(filterPrice.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentData = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-10 bg-white min-h-screen text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Popis proizvoda</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input
          placeholder="Filter po nazivu"
          className="border p-2 rounded shadow-sm w-64"
          value={filterName}
          onChange={e => setFilterName(e.target.value)}
        />
        <input
          placeholder="Filter po cijeni"
          className="border p-2 rounded shadow-sm w-64"
          value={filterPrice}
          onChange={e => setFilterPrice(e.target.value)}
        />
      </div>

      <div className="overflow-auto rounded-lg shadow ring-1 ring-black/5">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Slika</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Naziv</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Cijena</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Slug</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Akcije</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {currentData.map(product => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded shadow"
                  />
                </td>
                <td className="px-6 py-4 text-sm">{product.name}</td>
                <td className="px-6 py-4 text-sm">{product.price} €</td>
                <td className="px-6 py-4 text-sm text-gray-500">{product.slug}</td>
                <td className="px-6 py-4 text-sm space-x-3">
                  <Link href={`/admin/products/${product.id}/edit`} className="text-blue-600 hover:underline">
                    Uredi
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Obriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded border text-sm font-medium ${
              currentPage === i + 1 ? 'bg-black text-white' : 'bg-white text-black border-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}