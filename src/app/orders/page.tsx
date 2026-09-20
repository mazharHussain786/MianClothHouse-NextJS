import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import { orderModel } from "@/lib/models/order";
import { authOptions } from "@/lib/auth";
import { serializeOrder } from "@/lib/serializeOrder";
import OrdersHub from "../components/OrdersHub";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === "admin") redirect("/admin");

  let orders: ReturnType<typeof serializeOrder>[] = [];
  if (session?.user?.id) {
    await dbConnect();
    const docs = await orderModel
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();
    orders = docs.map((doc) => serializeOrder(doc));
  }

  return <OrdersHub isLoggedIn={Boolean(session?.user?.id)} orders={orders} />;
}
