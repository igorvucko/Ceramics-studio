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
fetch('http://localhost:3000/products') // Backend
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  const handleDelete = async (id: number) => {
    const confirmed = confirm('Želite li sigurno obrisati proizvod?');
    if (!confirmed) return;

await fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
    });

setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Proizvodi</h1>
        <Link href="/admin/products/new" className="bg-black text-white px-4 py-2 rounded">
          + Novi proizvod
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">Naziv</th>
            <th className="text-left p-2">Cijena</th>
            <th className="text-left p-2">Slug</th>
            <th className="text-left p-2">Akcije</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
            <td className="p-2">{product.price} €</td>
            <td className="p-2">{product.name}</td>
              <td className="p-2">{product.slug}</td>
              <td className="p-2 space-x-2">
                <Link href={`/admin/products/${product.id}/edit`} className="text-blue-600 underline">
                  Uredi
                </Link>
                <button onClick={()=>handleDelete(product.id)}
                className="text-red-600 underline">
                  Obriši
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}