"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
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

export default function AdminDeleteProduct({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  if (session?.user?.role !== "admin") return null;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/cloths/${id}`, { method: "DELETE" });
      if (!res.ok) {
        toast.error("Failed to delete product.");
        return;
      }
      toast.success("Product deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error("Error deleting product.");
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          className="absolute top-3 right-3 z-10 rounded-full bg-card/90 p-2 text-destructive shadow"
          aria-label={`Delete ${title}`}
        >
          <Trash2 size={16} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Product?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <b>{title}</b>? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
