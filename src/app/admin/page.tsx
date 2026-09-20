import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import { orderModel } from "@/lib/models/order";
import { userModel } from "@/lib/models/user";
import { authOptions } from "@/lib/auth";
import { serializeOrder } from "@/lib/serializeOrder";
import AdminDashboard from "../components/AdminDashboard";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/admin");
  if (session.user.role !== "admin") redirect("/");

  await dbConnect();
  const [orderDocs, userDocs] = await Promise.all([
    orderModel.find().sort({ createdAt: -1 }).lean(),
    userModel
      .find({ role: { $ne: "admin" } })
      .select("fullName phone createdAt")
      .sort({ createdAt: -1 })
      .lean(),
  ]);

  return (
    <AdminDashboard
      users={userDocs.map((user) => ({
        _id: String(user._id),
        fullName: user.fullName || "",
        phone: user.phone || "",
        createdAt: user.createdAt ? new Date(user.createdAt).toISOString() : "",
      }))}
      initialOrders={orderDocs.map((doc) => serializeOrder(doc))}
    />
  );
}
