"use client";
import Link from "next/link";
import Product_image from "./Product_image";

export default function ProductsClient({ products }:{products:any}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products?.map((product:any) => (
        <div key={product.id} className="border border-gray-300 rounded-2xl">
          <Link
            href={`/product-details/${product._id}`}
            className="rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
          >
            <Product_image images={product.images} />
          </Link>
          <div className="p-4 text-center">
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="text-red-700 font-bold">Price : {product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
