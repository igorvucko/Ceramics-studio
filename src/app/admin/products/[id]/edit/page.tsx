'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { uploadImage } from '@/app/api/image/uploadImage';

type Product = {
  id: number; name: string; price: string; slug: string;
  image: string; description: string; details: string;
};

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: '', price: '', slug: '', image: '', description: '', details: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
fetch(`http://localhost:3000/products/id/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setForm({
name: data.name || '', price: data.price || '', slug: data.slug || '',
          image: data.image || '', description: data.description || '', details: data.details || '',
        });
      })
      .catch(() => setError('Greška pri dohvatu proizvoda.'));
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
if (!form.name || !form.price || !form.slug) {
      setError('Sva osnovna polja su obavezna.');
      return;
    }

    try {
      let imageUrl = form.image;
      if (file) {
        imageUrl = await uploadImage(file);
      }

const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, image: imageUrl }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Greška pri spremanju proizvoda.');
      }

      router.push('/admin/products');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (!product) return <p>Učitavanje...</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Uredi proizvod</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="price" placeholder="Naziv" className="w-full border p-2" value={form.name} onChange={handleChange} />
        <input name="price" placeholder="Cijena" className="w-full border p-2" value={form.price} onChange={handleChange} />
        <input name="slug" placeholder="Slug" className="w-full border p-2" value={form.slug} onChange={handleChange} />
        <input name="image" placeholder="Trenutni URL slike" className="w-full border p-2" value={form.image} onChange={handleChange} />
        <input type="file" onChange={handleImageChange} className="w-full border p-2" />
        <input name="description" placeholder="Opis" className="w-full border p-2" value={form.description} onChange={handleChange} />
        <textarea name="details" placeholder="Detalji" className="w-full border p-2" value={form.details} onChange={handleChange} />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">Spremi</button>
      </form>
    </div>
  );
}