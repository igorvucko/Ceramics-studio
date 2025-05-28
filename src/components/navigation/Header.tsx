import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-neutral-200 py-6 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-serif tracking-wide">
          <Link href="/">CERAMICS STUDIO</Link>
        </h1>
        <nav className="space-x-6 text-sm uppercase font-medium tracking-wider">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}