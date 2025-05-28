import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-20 bg-white text-center px-6">
      <h2 className="text-2xl font-serif mb-6">Spremni otkriti kolekciju?</h2>
      <Link
        href="/shop"
        className="inline-block px-8 py-3 bg-black text-white uppercase tracking-wide text-sm rounded-full hover:bg-neutral-800 transition"
      >
        Pogledaj proizvode
      </Link>
    </section>
  );
}