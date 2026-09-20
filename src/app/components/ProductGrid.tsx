import Link from "next/link";
import Product_image from "./Product_image";
import AdminDeleteProduct from "./AdminDeleteProduct";
import { seasonLabel } from "@/lib/seasons";
import type { ProductCardData } from "@/lib/productCard";

export default function ProductGrid({
  products,
}: {
  products: ProductCardData[];
}) {
  if (!products.length) {
    return (
      <div className="border border-dashed border-border py-16 text-center text-muted-foreground">
        New pieces are being added. Please check back soon.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product._id}
          className="group relative overflow-hidden bg-card shadow-[0_8px_30px_rgba(28,22,20,0.05)] transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(28,22,20,0.08)]"
        >
          <AdminDeleteProduct id={product._id} title={product.title} />
          <Link href={`/product-details/${product.slug || product._id}`}>
            <Product_image images={product.images} alt={product.title} />
            <div className="p-5 text-center">
              <h3 className="font-display line-clamp-2 min-h-[3.5rem] text-2xl text-primary">
                {product.title}
              </h3>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-gold">
                {seasonLabel(product.season)}
              </p>
              <p className="mt-2 text-sm tracking-wide text-foreground/70">
                Rs. {product.price}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
