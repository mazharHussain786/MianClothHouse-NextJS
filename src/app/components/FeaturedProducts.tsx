import { unstable_cache } from "next/cache";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import { clothModel } from "@/lib/models/cloth";
import { ensureProductSlugs } from "@/lib/slug";
import { toProductCard } from "@/lib/productCard";
import ProductGrid from "./ProductGrid";
import SectionHeading from "./SectionHeading";

const getFeaturedProducts = unstable_cache(
  async () => {
    await dbConnect();
    const docs = await clothModel.find({ featured: true }).lean();
    await ensureProductSlugs(docs);
    return docs.map(toProductCard);
  },
  ["featured-products"],
  { revalidate: 172800, tags: ["products"] }
);

export default async function ProductsPage() {
  const products = await getFeaturedProducts();

  return (
    <section id="products" className="scroll-mt-28 bg-card/60 px-4 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Latest"
          title="Our Latest Collection"
          subtitle="Featured pieces from the shop floor, ready to order on WhatsApp."
        />
        <ProductGrid products={products} />
        <div className="mt-10 text-center md:mt-12">
          <Link
            href="/category/women"
            className="inline-flex items-center justify-center border border-primary px-7 py-3 text-sm uppercase tracking-[0.16em] text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
}
