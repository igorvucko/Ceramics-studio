import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PatternDivider from "@/components/home/PatternDivider";

export default function HomePage() {
  return (
    <main className="bg-white text-neutral-900">
      <Hero />

      <FeaturedProducts />


    </main>
  );
}
