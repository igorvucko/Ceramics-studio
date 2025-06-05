export const dynamic = 'force-dynamic';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  slug: string;
  description: string;
  details: string;
}

async function getProduct(slug: string): Promise<Product> {
const res = await fetch(`http://localhost:3000/products/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Proizvod nije pronađen');
  }

  return res.json();
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  return (
    <section className="py-16 px-6 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <img
          src={`/${product.image}`}
alt={product.name}
          className="w-full h-[500px] object-cover rounded-xl shadow-md"
        />
        <div>
          <h1 className="text-3xl font-serif font-semibold mb-4">
{product.name}
          </h1>
          <p className="text-xl text-neutral-700 mb-4">{product.price} €</p>

          {product.description && (
            <p className="text-lg mt-4 text-gray-800">{product.description}</p>
          )}

          {product.details && (
            <div className="mt-6 text-gray-600 whitespace-pre-line">
              {product.details}
            </div>
          )}

          <form action="/api/checkout" method="POST" className="mt-6">

            <input type="hidden" name="price" value={parseFloat(product.price)} />
            <input type="hidden" name="slug" value={product.slug} />
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white rounded-xl hover:bg-neutral-800 transition"
            >
              Kupi
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
