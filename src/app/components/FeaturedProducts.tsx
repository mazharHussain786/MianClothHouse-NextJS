import dbConnect from "@/lib/mongodb";
import ProductsClient, { productSchema } from "./ProductClient";
import { clothModel } from "@/lib/models/cloth";

export const revalidate = 86400 * 15;

export default async function ProductsPage() {
 await dbConnect();
  const products = await clothModel.find({ featured: true }).lean() as unknown as productSchema[];

  

  return (
    <section id="products" className="py-10 px-6">
      <h2 className="text-3xl font-bold mb-6 text-center">
        Our Latest Collection
      </h2>
      <ProductsClient key={"featured-products"} initialProducts={products} />
    </section>
  );
}
