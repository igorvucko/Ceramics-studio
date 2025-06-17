'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      try {
const res = await fetch('http://localhost:3001/auth/me', {
          credentials: 'include',
        });
        setIsLoggedIn(res.ok);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkLogin();
    window.addEventListener('auth-changed', checkLogin);
    return () => window.removeEventListener('auth-changed', checkLogin);
  }, []);

  const handleLogout = async () => {
await fetch('http://localhost:3001/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setIsLoggedIn(false);
    router.refresh();
  };

  return (
    <header className="border-b border-neutral-200 py-6 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-serif tracking-wide">
          <Link href="/">CERAMICS STUDIO</Link>
        </h1>
        <nav className="space-x-6 text-sm uppercase font-medium tracking-wider flex items-center">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="text-xs border px-3 py-1 rounded hover:bg-gray-100 uppercase tracking-wide"
            >
              Odjava
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
