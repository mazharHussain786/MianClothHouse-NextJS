"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import type { PublicOrder } from "@/lib/serializeOrder";

type AdminUser = {
  _id: string;
  fullName: string;
  phone: string;
  createdAt: string;
};

export default function AdminDashboard({
  users,
  initialOrders,
}: {
  users: AdminUser[];
  initialOrders: PublicOrder[];
}) {
  const [orders, setOrders] = useState(initialOrders);

  const updateOrder = async (
    id: string,
    payload: { status?: string; expectedDeliveryDate?: string | null }
  ) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not update order.");
      setOrders((prev) => prev.map((order) => (order._id === id ? data.order : order)));
      toast.success("Order updated");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update order.");
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gold">Admin</p>
          <h1 className="font-display mt-2 text-3xl text-primary sm:text-4xl md:text-5xl">Dashboard</h1>
          <div className="gold-rule mt-4" />
        </div>
        <Link
          href="/admin/add-cloth"
          className="border border-primary px-5 py-2 text-xs uppercase tracking-[0.16em] text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Add Cloth
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="font-display text-3xl text-primary">Users</h2>
        <p className="mt-1 mb-5 text-sm text-muted-foreground">
          Registered customers by phone number.
        </p>
        {users.length ? (
          <div className="overflow-x-auto bg-card shadow-sm">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-border/70">
                    <td className="px-4 py-3">{user.fullName}</td>
                    <td className="px-4 py-3">{user.phone}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="border border-dashed border-border py-10 text-center text-muted-foreground">
            No registered users yet.
          </p>
        )}
      </div>

      <div className="mt-14">
        <h2 className="font-display text-3xl text-primary">Orders</h2>
        <p className="mt-1 mb-5 text-sm text-muted-foreground">
          Confirm orders and set an expected delivery date.
        </p>
        {orders.length ? (
          <div className="overflow-x-auto bg-card shadow-sm">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-[0.12em] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Product</th>
                  <th className="px-4 py-3">Confirm</th>
                  <th className="px-4 py-3">Delivery date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-border/70 align-top">
                    <td className="px-4 py-3">{order.customerName}</td>
                    <td className="px-4 py-3">{order.phone}</td>
                    <td className="px-4 py-3">
                      <p>{order.productTitle}</p>
                      <p className="text-xs text-muted-foreground">
                        Qty {order.quantity} · Rs. {order.price * order.quantity}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={order.status === "confirmed" || order.status === "shipped" || order.status === "delivered"}
                          onChange={(e) =>
                            updateOrder(order._id, {
                              status: e.target.checked ? "confirmed" : "pending",
                            })
                          }
                        />
                        <span className="capitalize">{order.status}</span>
                      </label>
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="date"
                        value={
                          order.expectedDeliveryDate
                            ? order.expectedDeliveryDate.slice(0, 10)
                            : ""
                        }
                        onChange={(e) =>
                          updateOrder(order._id, {
                            expectedDeliveryDate: e.target.value || null,
                          })
                        }
                        className="border border-border bg-background px-3 py-2"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="border border-dashed border-border py-10 text-center text-muted-foreground">
            No orders yet.
          </p>
        )}
      </div>
    </section>
  );
}
