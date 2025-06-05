'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    price: '',
    slug: '',
    image: '',
    description: '',
    details: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement |HTMLTextAreaElement>) => {
setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

if (!form.name || !form.price || !form.slug) {
    alert('Sva polja su obavezna.');
    return;
  }

  try {
const res = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Greška pri spremanju proizvoda.");
    }

    const saved = await res.json(); // ovdje dobijemo `slug` iz backend responsa
    router.push(`/product/${saved.slug}`); // koristi stvarni slug iz baze

  } catch (err) {
    if(err instanceof Error){
    alert("Greška: " + err.message);
    }else{alert("Dogodila se nepoznata greška")}
  }
};
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Dodaj novi proizvod</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Naziv"
          className="w-full border p-2"
value={form.name}
          onChange={handleChange}
        />
        <input
          name="price"
          placeholder="Cijena (npr. 20)"
          className="w-full border p-2"
          value={form.price}
          onChange={handleChange}
        />
        <input
          name="slug"
          placeholder="Slug (npr. salica)"
          className="w-full border p-2"
          value={form.slug}
          onChange={handleChange}
        />
        <input
          name="image"
          placeholder="Ime slike (npr. salica.jpg)"
          className="w-full border p-2"
          value={form.image}
          onChange={handleChange}
        />
          <textarea
          name="description"
          placeholder="Kratki opis proizvoda"
          className="w-full border p-2"
          value={form.description}
          onChange={handleChange}
        />

        <textarea
          name="details"
          placeholder="Detalji o proizvodu (materijal, porijeklo...)"
          className="w-full border p-2"
          value={form.details}
          onChange={handleChange}
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Spremi
        </button>
      </form>
    </div>
  );
}
