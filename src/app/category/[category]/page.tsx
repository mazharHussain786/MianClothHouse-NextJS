import Link from "next/link";
import ProductsClient, { productSchema } from "@/app/components/ProductClient";
import dbConnect from "@/lib/mongodb";
import { clothModel } from "@/lib/models/cloth";

export const revalidate = 86400;

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
  const products = await clothModel.find({ category }).select("-__v -updatedAt").lean() as unknown as productSchema[]

  return (
    <section id="products" className="py-10 px-6">
      {/* ✅ Breadcrumb Navigation */}
      <nav className="text-gray-600 text-sm mb-4">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:underline text-blue-600">
              Home
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="#" className="hover:underline text-blue-600">
              Categories
            </Link>
          </li>
          <li>/</li>
          <li className="font-semibold text-gray-800 capitalize">{category}</li>
        </ol>
      </nav>

      {/* ✅ Page Title */}
      <h2 className="text-3xl font-bold mb-6 text-center">
        {category.toUpperCase()} Collection
      </h2>


      <ProductsClient key={`products-${category}`} initialProducts={products} />
    </section>
  );
}
