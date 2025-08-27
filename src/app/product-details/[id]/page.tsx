import ProductDetailClient from "@/app/components/productsDetailClient";
import { on } from "events";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;




  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cloths?id=${id}`,
    {
      cache: "force-cache", 
    }
  );

  if (!res.ok) {
     console.log("Failed to fetch product details",res);
  }

  const product = await res.json();

  return <ProductDetailClient key={product?.[0]._id} product={product?.[0]} />;
}
