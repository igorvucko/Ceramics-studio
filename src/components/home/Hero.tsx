"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center bg-neutral-100 overflow-hidden">
      <Image
        src="/slika1.jpg"
        alt="Handmade ceramic art"
        fill
        className="object-cover opacity-40"
        priority
      />
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-serif font-light tracking-wider mb-4">
          Ceramics Studio
        </h1>
        <p className="text-lg md:text-xl text-neutral-700 italic">
          Contemporary handmade ceramics by an academic artist
        </p>
      </div>
    </section>
  );
}