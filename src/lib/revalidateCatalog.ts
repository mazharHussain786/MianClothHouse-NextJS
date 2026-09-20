import { revalidatePath, revalidateTag } from "next/cache";

export function revalidateCatalog() {
  revalidateTag("products");
  revalidatePath("/");
  revalidatePath("/category/[category]", "page");
  revalidatePath("/product-details/[slug]", "page");
}
