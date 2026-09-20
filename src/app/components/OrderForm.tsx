"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";

const inputClass =
  "w-full border border-border bg-background px-4 py-3 outline-none focus:border-primary";

type OrderFormProps = {
  productId: string;
  productTitle: string;
  price: number;
  colors: string[];
};

type PlacedOrder = {
  _id: string;
  quantity: number;
  price: number;
};

export default function OrderForm({
  productId,
  productTitle,
  price,
  colors,
}: OrderFormProps) {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [placed, setPlaced] = useState<PlacedOrder | null>(null);
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    city: "",
    address: "",
    quantity: 1,
    color: colors[0] || "",
    notes: "",
  });

  useEffect(() => {
    if (!session?.user) return;
    setForm((prev) => ({
      ...prev,
      customerName: prev.customerName || session.user.name || "",
      phone: prev.phone || session.user.phone || "",
    }));
  }, [session]);

  const update = (key: keyof typeof form, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          ...form,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not place order.");
      setPlaced(data.order);
      toast.success("Order placed successfully");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not place order.");
    } finally {
      setLoading(false);
    }
  };

  if (placed) {
    return (
      <div className="mt-6 border border-border bg-secondary/50 p-5">
        <p className="text-xs uppercase tracking-[0.16em] text-gold">Order confirmed</p>
        <h3 className="font-display mt-2 text-2xl text-primary">Thank you</h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          We received your order for <strong>{productTitle}</strong> (x{placed.quantity}).
          Our team will call you on WhatsApp to confirm delivery.
        </p>
        <p className="mt-3 break-all text-sm text-foreground/80">
          Order ID: <strong>{placed._id}</strong>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Save this ID to track from Your Orders without login.
        </p>
        <Link href="/orders" className="mt-4 inline-block text-sm text-primary underline">
          Track this order
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full bg-primary px-5 py-3 text-sm font-medium uppercase tracking-[0.12em] text-primary-foreground transition hover:bg-primary/90"
      >
        {open ? "Hide order form" : "Order on Website"}
      </button>

      {open && (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4 border-t border-border pt-5">
          <p className="text-sm text-muted-foreground">
            No account needed. Fill your details and we will deliver cash on delivery.
          </p>

          <div>
            <label className="mb-1 block text-sm">Full name *</label>
            <input
              value={form.customerName}
              onChange={(e) => update("customerName", e.target.value)}
              className={inputClass}
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Phone *</label>
            <input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass}
              placeholder="03xx xxxxxxx"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm">City *</label>
              <input
                value={form.city}
                onChange={(e) => update("city", e.target.value)}
                className={inputClass}
                placeholder="Mailsi"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm">Quantity *</label>
              <input
                type="number"
                min={1}
                max={20}
                value={form.quantity}
                onChange={(e) => update("quantity", Number(e.target.value))}
                className={inputClass}
                required
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm">Delivery address *</label>
            <textarea
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              className={inputClass}
              rows={3}
              placeholder="House, street, area"
              required
            />
          </div>
          {colors.length > 0 && (
            <div>
              <label className="mb-1 block text-sm">Color</label>
              <select
                value={form.color}
                onChange={(e) => update("color", e.target.value)}
                className={inputClass}
              >
                {colors.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm">Notes</label>
            <textarea
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              className={inputClass}
              rows={2}
              placeholder="Size, timing, or any instruction"
            />
          </div>

          <p className="text-sm text-foreground/80">
            Total: <strong>Rs. {price * form.quantity}</strong> · Cash on delivery
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary py-3 text-sm uppercase tracking-[0.16em] text-primary-foreground disabled:opacity-60"
          >
            {loading ? "Placing order..." : "Confirm order"}
          </button>
        </form>
      )}
    </div>
  );
}
