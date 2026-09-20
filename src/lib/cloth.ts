export type ClothDoc = {
  _id: unknown;
  title: string;
  slug?: string;
  category: string;
  price: number;
  discountPrice?: number;
  description?: string;
  colors?: string[];
  images?: string[];
  season?: string;
};

export function asCloth(doc: unknown): ClothDoc | null {
  if (!doc || typeof doc !== "object" || Array.isArray(doc)) return null;
  return doc as ClothDoc;
}
