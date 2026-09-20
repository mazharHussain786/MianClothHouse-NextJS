"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import type { PublicOrder } from "@/lib/serializeOrder";

const statuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function OrdersList({
  initialOrders,
  isAdmin = false,
}: {
  initialOrders: PublicOrder[];
  isAdmin?: boolean;
}) {
  const [orders, setOrders] = useState(initialOrders);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not update order.");
      setOrders((prev) => prev.map((order) => (order._id === id ? data.order : order)));
      toast.success("Order updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update order.");
    }
  };

  if (!orders.length) {
    return (
      <div className="border border-dashed border-border py-16 text-center text-muted-foreground">
        No orders yet.
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {orders.map((order) => (
        <article key={order._id} className="grid gap-4 bg-card p-5 shadow-sm md:grid-cols-[96px_1fr_auto]">
          <div className="relative h-24 w-24 overflow-hidden bg-secondary">
            {order.productImage ? (
              <Image
                src={order.productImage}
                alt={order.productTitle}
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : null}
          </div>
          <div>
            <h3 className="font-display text-xl text-primary sm:text-2xl">{order.productTitle}</h3>
            <p className="mt-1 text-sm text-foreground/80">
              Qty {order.quantity} · Rs. {order.price * order.quantity}
              {order.color ? ` · ${order.color}` : ""}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {order.customerName} · {order.phone}
            </p>
            <p className="text-sm text-muted-foreground">
              {order.address}, {order.city}
            </p>
            {order.notes && (
              <p className="mt-1 text-sm text-muted-foreground">Note: {order.notes}</p>
            )}
            <p className="mt-2 text-xs uppercase tracking-[0.12em] text-gold">
              {new Date(order.createdAt).toLocaleDateString()} · COD
            </p>
            {order.expectedDeliveryDate && (
              <p className="mt-1 text-sm text-foreground/80">
                Expected delivery:{" "}
                {new Date(order.expectedDeliveryDate).toLocaleDateString()}
              </p>
            )}
          </div>
          <div className="md:text-right">
            {isAdmin ? (
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="border border-border bg-background px-3 py-2 text-sm capitalize"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            ) : (
              <span className="inline-block border border-border px-3 py-1 text-xs uppercase tracking-[0.12em] text-primary">
                {order.status}
              </span>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
