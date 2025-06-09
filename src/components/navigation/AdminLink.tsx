import Link from 'next/link';

export default function AdminLink() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link
        href="/admin"
        className="bg-black text-white px-4 py-2 rounded-full shadow-lg hover:bg-neutral-800 transition"
      >
        Admin
      </Link>
    </div>
  );
}
