import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import dbConnect from "@/lib/mongodb";
import { orderModel } from "@/lib/models/order";
import { authOptions } from "@/lib/auth";
import { serializeOrder } from "@/lib/serializeOrder";

const allowedStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const update: Record<string, unknown> = {};

    if (body.status) {
      if (!allowedStatuses.includes(body.status)) {
        return NextResponse.json({ error: "Invalid status." }, { status: 400 });
      }
      update.status = body.status;
    }

    if (body.expectedDeliveryDate !== undefined) {
      update.expectedDeliveryDate = body.expectedDeliveryDate
        ? new Date(body.expectedDeliveryDate)
        : null;
    }

    if (!Object.keys(update).length) {
      return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
    }

    await dbConnect();
    const order = await orderModel.findByIdAndUpdate(id, update, { new: true }).lean();
    if (!order) {
      return NextResponse.json({ error: "Order not found." }, { status: 404 });
    }

    return NextResponse.json({ order: serializeOrder(order) });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not update order." }, { status: 500 });
  }
}
