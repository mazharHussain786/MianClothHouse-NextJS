import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/mongodb";
import { userModel } from "@/lib/models/user";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const users = await userModel
      .find({ role: { $ne: "admin" } })
      .select("fullName phone role createdAt")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      users.map((user) => ({
        _id: String(user._id),
        fullName: user.fullName || "",
        phone: user.phone || "",
        role: user.role || "user",
        createdAt: user.createdAt
          ? new Date(user.createdAt).toISOString()
          : "",
      }))
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load users." }, { status: 500 });
  }
}
