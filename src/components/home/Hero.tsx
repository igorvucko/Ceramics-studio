'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-[#fdf6ec] text-neutral-900 py-40 px-4 text-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src='/hero1.jpg'
          alt="Hero Background Vase"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
          Luxury Handmade Ceramics
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-700">
          Handcrafted with care by an academic artist.
        </p>
        <Link href="/shop">
          <button className="bg-black text-white px-6 py-3 rounded hover:bg-neutral-800 transition">
            SHOP NOW
          </button>
        </Link>
      </div>
    </section>
  );
}