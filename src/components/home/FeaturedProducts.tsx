'use client';
import Image from 'next/image';

const features = [
  {
    src: '/hero3.jpg',
    alt: 'Ručno izrađena šalica',
    label: 'Ručna izrada',
    description: 'Svaki komad izrađen s pažnjom i stručnošću.'
  },
  {
    src: '/hero1.jpg',
    alt: 'Inspirirana prirodom zdjela',
    label: 'Inspirirano prirodom',
    description: 'Oblici i teksture nadahnuti zemljom.'
  },
  {
    src: '/hero2.jpg',
    alt: 'Limitirana kolekcija',
    label: 'Limitirane kolekcije',
    description: 'Unikatni radovi dostupni u malim serijama.'
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-[#fdf6ec] py-20 px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
        Unique Handmade Pottery
      </h2>
      <p className="text-md md:text-lg text-gray-700 mb-12">
        Learn about sare codiacay–craftcrafted ceramics.
      </p>

      <div className="container mx-auto grid md:grid-cols-3 gap-12">
        {features.map((feature, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-[240px] h-[240px] overflow-hidden rounded shadow-sm">
              <Image
                src={feature.src}
                alt={feature.alt}
                width={240}
                height={240}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-lg font-semibold mt-4">{feature.label}</h3>
            <p className="text-sm mt-1 text-gray-700">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}