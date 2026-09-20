export type ProductCardData = {
  _id: string;
  slug: string;
  title: string;
  price: number;
  images: string[];
  season: string;
};

export function toProductCard(doc: unknown): ProductCardData {
  const data =
    doc && typeof doc === "object" && !Array.isArray(doc)
      ? (doc as Record<string, unknown>)
      : {};
  const images = Array.isArray(data.images)
    ? data.images.map((image) => String(image))
    : [];

  return {
    _id: String(data._id ?? ""),
    slug: String(data.slug || ""),
    title: String(data.title || ""),
    price: Number(data.price || 0),
    images,
    season: String(data.season || "all"),
  };
}
