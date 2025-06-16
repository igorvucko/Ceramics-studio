'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLink() {
  const router = useRouter();

  const handleLogout = async () => {
await fetch('http://localhost:3001/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    router.push('/login');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex gap-3">
      <Link
        href="/admin"
        className="bg-black text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition"
      >
        Admin
      </Link>

      <button
        onClick={handleLogout}
        className="bg-white text-black border border-black px-4 py-2 rounded-full shadow-lg hover:bg-red-500 transition"
      >
        Odjava
      </button>
    </div>
  );
}