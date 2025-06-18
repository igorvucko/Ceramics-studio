import { NextSeo } from "next-seo";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  slug: string;
}

async function getProducts(): Promise<Product[]> {
  const res = await fetch('http://localhost:3001/products', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Greška kod dohvaćanja proizvoda');
  }

  return res.json();
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
     <><NextSeo
      title="Prodavaonica | Ceramics Studio"
      description="Pogledajte našu ponudu unikatne keramike. Vaze, šalice i još mnogo toga – ručno izrađeno u Hrvatskoj."
      canonical="https://www.ceramics-studio.com/shop" /><section className="py-16 px-6 bg-white min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-serif mb-10 text-center">Naša kolekcija</h1>

          {products.length === 0 ? (
            <p className="text-center text-neutral-500">Nema dostupnih proizvoda.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {products.map((product) => (
                <a
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="block bg-neutral-100 rounded-xl overflow-hidden shadow-md transition-transform hover:scale-105"
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover" />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-neutral-500 italic">
                      Nema slike
                    </div>
                  )}
                  <div className="p-4">
                    <h2 className="text-lg font-serif font-semibold">{product.name}</h2>
                    <p className="text-sm text-neutral-700">{product.price}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section></>
  );
}