export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 py-6 px-4 mt-8">
      <div className="container mx-auto text-sm text-center text-neutral-500">
        © {new Date().getFullYear()} CERAMICS STUDIO. All rights reserved.
      </div>
    </footer>
  );
}