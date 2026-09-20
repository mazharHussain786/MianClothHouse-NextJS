import Hero from "./components/Hero";
import FeaturedCategories from "./components/Categories";
import ProductsPage from "./components/FeaturedProducts";
import TrustStrip from "./components/TrustStrip";

export const revalidate = 172800;
export const dynamic = "force-static";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FeaturedCategories />
      <ProductsPage />
    </>
  );
}
