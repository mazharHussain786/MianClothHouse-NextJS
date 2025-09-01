"use client";
import Link from "next/link";
import Product_image from "./Product_image";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import { Divide, Trash2 } from "lucide-react";

export interface productSchema {
  _id: string;
  title: string;
  price: string;
  images: string[];
}

export default function ProductsClient({
  initialProducts,
}: {
  initialProducts: productSchema[];
}) {
  const { data: session } = useSession();
  const [products, setProducts] = useState<productSchema[]>(initialProducts);
  const [deletingId, setDeletingId] = useState<string | null>();
  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/cloths/${id}`, { method: "DELETE" });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        toast.success("Product deleted successfully!");
      } else {
        toast.error("Failed to delete product.");
      }
    } catch (error) {
      toast.error("⚠ Error deleting product.");
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products?.map((product: any) => (
        <div
          key={product.id}
          className="border border-gray-300 rounded-2xl relative"
        >
          {deletingId && (
            <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mt-2 mx-auto"></div>
          )}

          {session?.user?.role === "admin" && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Trash2 className="absolute top-2 right-2 cursor-pointer text-red-600" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete <b>{product.title}</b>? This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(product._id)}
                    disabled={deletingId === product._id}
                  >
                    {deletingId === product._id ? "Deleting..." : "Delete"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
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
