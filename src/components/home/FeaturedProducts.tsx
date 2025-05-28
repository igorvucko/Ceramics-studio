const mockProducts = [
  { id: 1, name: "Porculanska zdjela", image: "/product-1.jpg" },
  { id: 2, name: "Skulpturalna vaza", image: "/product-2.jpg" },
  { id: 3, name: "Unikatna šalica", image: "/product-3.jpg" },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-neutral-50 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-serif text-center mb-10">
          Izdvojeni radovi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockProducts.map((product) => (
            <div key={product.id} className="text-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover rounded-2xl shadow-md"
              />
              <p className="mt-4 text-lg font-medium">{product.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}