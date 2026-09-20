import mongoose from "mongoose";
import { clothModel } from "@/lib/models/cloth";

export function slugify(input: string) {
  return (
    input
      .toLowerCase()
      .trim()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 80) || "product"
  );
}

export function looksLikeObjectId(value: string) {
  return mongoose.Types.ObjectId.isValid(value) && String(new mongoose.Types.ObjectId(value)) === value;
}

export async function uniqueSlug(title: string, excludeId?: string) {
  const base = slugify(title);
  let slug = base;
  let n = 2;

  while (true) {
    const existing = await clothModel
      .findOne(excludeId ? { slug, _id: { $ne: excludeId } } : { slug })
      .select("_id")
      .lean();
    if (!existing) return slug;
    slug = `${base}-${n++}`;
  }
}

export async function ensureProductSlugs<
  T extends { _id: unknown; title?: string; slug?: string },
>(docs: T[]) {
  const used = new Set(
    (
      await clothModel
        .find({ slug: { $exists: true, $nin: [null, ""] } })
        .select("slug")
        .lean()
    ).map((doc) => String(doc.slug))
  );

  for (const doc of docs) {
    if (doc.slug) {
      used.add(doc.slug);
      continue;
    }

    const base = slugify(doc.title || "product");
    let slug = base;
    let n = 2;
    while (used.has(slug)) slug = `${base}-${n++}`;
    used.add(slug);
    await clothModel.updateOne({ _id: doc._id }, { $set: { slug } });
    doc.slug = slug;
  }

  return docs;
}
