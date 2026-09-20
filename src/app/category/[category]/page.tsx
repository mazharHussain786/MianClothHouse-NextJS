import Link from "next/link";
import ProductGrid from "@/app/components/ProductGrid";
import dbConnect from "@/lib/mongodb";
import { clothModel } from "@/lib/models/cloth";
import { ensureProductSlugs } from "@/lib/slug";
import { toProductCard } from "@/lib/productCard";

export const revalidate = 172800;
export const dynamic = "force-static";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  await dbConnect();
  const categories = await clothModel.distinct("category");
  return categories.map((cat: string) => ({ category: cat }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  await dbConnect();
  const docs = await clothModel.find({ category }).select("-__v -updatedAt").lean();
  await ensureProductSlugs(docs);
  const products = docs.map(toProductCard);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-8">
      <nav className="mb-8 text-sm text-muted-foreground">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/#categories" className="hover:text-primary">
              Collections
            </Link>
          </li>
          <li>/</li>
          <li className="capitalize text-primary">{category}</li>
        </ol>
      </nav>

      <div className="mb-12 text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-gold">Collection</p>
        <h2 className="font-display mt-3 text-3xl capitalize text-primary sm:text-4xl md:text-5xl">
          {category} Collection
        </h2>
        <div className="gold-rule mx-auto mt-4" />
      </div>

      <ProductGrid products={products} />
    </section>
  );
}
