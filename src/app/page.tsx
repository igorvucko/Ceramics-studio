import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedProducts />
      <CallToAction />
    </>
  );
}