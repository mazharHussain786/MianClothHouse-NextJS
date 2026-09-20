"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import OrdersList from "./OrdersList";
import type { PublicOrder } from "@/lib/serializeOrder";

type TrackedOrder = {
  _id: string;
  productTitle: string;
  quantity: number;
  price: number;
  status: string;
  city: string;
  expectedDeliveryDate: string | null;
  createdAt: string;
};

export default function OrdersHub({
  isLoggedIn,
  orders,
}: {
  isLoggedIn: boolean;
  orders: PublicOrder[];
}) {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [tracked, setTracked] = useState<TrackedOrder | null>(null);

  const trackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTracked(null);
    try {
      const res = await fetch(`/api/orders/track?id=${encodeURIComponent(orderId.trim())}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Order not found.");
      setTracked(data.order);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Order not found.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 md:px-8">
      <p className="text-xs uppercase tracking-[0.24em] text-gold">Orders</p>
      <h1 className="font-display mt-2 text-3xl text-primary sm:text-4xl md:text-5xl">Your Orders</h1>
      <div className="gold-rule mt-4" />

      {isLoggedIn ? (
        <>
          <p className="mt-4 mb-10 text-muted-foreground">
            Orders you placed while logged in appear here.
          </p>
          <OrdersList initialOrders={orders} />
        </>
      ) : (
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="bg-card p-6 shadow-sm">
            <h2 className="font-display text-2xl text-primary">Login karein</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Apne orders dekhne ke liye login karein. Account nahi hai to login page se
              register kar sakte hain.
            </p>
            <Link
              href="/login?callbackUrl=/orders"
              className="mt-6 inline-block bg-primary px-6 py-3 text-sm uppercase tracking-[0.14em] text-primary-foreground"
            >
              Login
            </Link>
          </div>

          <div className="bg-card p-6 shadow-sm">
            <h2 className="font-display text-2xl text-primary">Guest tracking</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Bina login order ID paste karke apna order trace kar sakte hain.
            </p>
            <form onSubmit={trackOrder} className="mt-5 space-y-3">
              <input
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Order ID"
                className="w-full border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full border border-primary py-3 text-sm uppercase tracking-[0.14em] text-primary disabled:opacity-60"
              >
                {loading ? "Checking..." : "Track order"}
              </button>
            </form>

            {tracked && (
              <div className="mt-5 border-t border-border pt-4 text-sm">
                <p className="font-display text-xl text-primary">{tracked.productTitle}</p>
                <p className="mt-1 text-foreground/80">
                  Qty {tracked.quantity} · Rs. {tracked.price * tracked.quantity}
                </p>
                <p className="mt-2 uppercase tracking-[0.12em] text-gold">{tracked.status}</p>
                <p className="mt-1 text-muted-foreground">{tracked.city}</p>
                {tracked.expectedDeliveryDate && (
                  <p className="mt-1 text-foreground/80">
                    Expected delivery:{" "}
                    {new Date(tracked.expectedDeliveryDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
