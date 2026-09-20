import ProductDetailClient from "@/app/components/productsDetailClient";
import dbConnect from "@/lib/mongodb";
import { clothModel } from "@/lib/models/cloth";
import { asCloth } from "@/lib/cloth";
import { looksLikeObjectId, uniqueSlug } from "@/lib/slug";
import { notFound, redirect } from "next/navigation";

export const revalidate = 172800;
export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  await dbConnect();
  const products = await clothModel.find({ slug: { $exists: true, $nin: [null, ""] } }).select("slug").lean();
  return products.map((product) => ({ slug: String((product as { slug?: string }).slug || "") }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  await dbConnect();
  const raw = looksLikeObjectId(slug)
    ? await clothModel.findById(slug).select("title").lean()
    : await clothModel.findOne({ slug }).select("title").lean();
  const doc = asCloth(raw);

  return {
    title: doc?.title
      ? `${doc.title} | Mian Cloth House`
      : "Product | Mian Cloth House",
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  await dbConnect();

  let doc = asCloth(await clothModel.findOne({ slug }).lean());
  if (!doc && looksLikeObjectId(slug)) {
    doc = asCloth(await clothModel.findById(slug).lean());
  }
  if (!doc) notFound();

  let productSlug = doc.slug;
  if (!productSlug) {
    productSlug = await uniqueSlug(doc.title, String(doc._id));
    await clothModel.updateOne({ _id: doc._id }, { $set: { slug: productSlug } });
  }

  if (slug !== productSlug) {
    redirect(`/product-details/${productSlug}`);
  }

  const product = {
    _id: String(doc._id),
    title: doc.title,
    category: doc.category,
    price: doc.price,
    discountPrice: doc.discountPrice,
    description: doc.description,
    colors: doc.colors || [],
    images: doc.images || [],
    season: doc.season || "all",
  };

  return <ProductDetailClient key={product._id} product={product} />;
}
