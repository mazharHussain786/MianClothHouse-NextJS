import ProductDetailClient from "@/app/components/productsDetailClient";

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
    throw new Error("Failed to fetch product");
  }

  const product = await res.json();

  return <ProductDetailClient key={product?.[0]._id} product={product?.[0]} />;
}
