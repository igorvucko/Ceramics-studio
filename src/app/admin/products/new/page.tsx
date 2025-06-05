'use client';
import { uploadImage } from '@/app/api/image/uploadImage';
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
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'YOUR_UPLOAD_PRESET'); // zamijeni stvarnim presetom

  console.log('⏫ Uploading to Cloudinary...');

const res = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  console.log('✅ Cloudinary response:', data);

  if (!res.ok || !data.secure_url) {
    throw new Error(data.error?.message || 'Slika nije učitana na Cloudinary.');
  }

  return data.secure_url;
};

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
if (!form.name || !form.price || !form.slug) {
    alert('Sva polja su obavezna.');
    return;
  }

  try {
    setUploading(true);
    let imageUrl = form.image;

    if (file) {
      imageUrl = await uploadImage(file);
      console.log('✅ Image URL dobiven:', imageUrl);

      if (!imageUrl || typeof imageUrl !== 'string') {
        throw new Error('Image URL nije ispravno generiran.');
      }
    }

const res = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, image: imageUrl }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Greška pri spremanju proizvoda.');
    }

    const saved = await res.json();
    router.push(`/product/${saved.slug}`);
  } catch (err) {
    if (err instanceof Error) {
      alert('Greška: ' + err.message);
    } else {
      alert('Dogodila se nepoznata greška');
    }
  } finally {
    setUploading(false);
  }
};

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Dodaj novi proizvod</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Naziv" className="w-full border p-2" value={form.name} onChange={handleChange} />
        <input name="price" placeholder="Cijena (npr. 20)" className="w-full border p-2" value={form.price} onChange={handleChange} />
        <input name="slug" placeholder="Slug (npr. salica)" className="w-full border p-2" value={form.slug} onChange={handleChange} />
        <input name="image" placeholder="Putanja slike (nije obavezno)" className="w-full border p-2" value={form.image} onChange={handleChange} />
        <input type="file" accept="image/*" className="w-full border p-2" onChange={handleFileChange} />
        <textarea name="description" placeholder="Kratki opis proizvoda" className="w-full border p-2" value={form.description} onChange={handleChange} />
        <textarea name="details" placeholder="Detalji o proizvodu (materijal, porijeklo...)" className="w-full border p-2" value={form.details} onChange={handleChange} />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          {uploading ? 'Spremanje...' : 'Spremi'}
        </button>
      </form>
    </div>
  );
}
