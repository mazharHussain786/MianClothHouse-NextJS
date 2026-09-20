import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import { orderModel } from "@/lib/models/order";
import { serializeOrder } from "@/lib/serializeOrder";

export async function GET(req: NextRequest) {
  try {
    const raw = String(req.nextUrl.searchParams.get("id") || "").trim();
    if (!raw) {
      return NextResponse.json({ error: "Please enter an order ID." }, { status: 400 });
    }

    await dbConnect();
    let order = null;

    if (mongoose.Types.ObjectId.isValid(raw) && raw.length === 24) {
      order = await orderModel.findById(raw).lean();
    } else if (/^[a-fA-F0-9]{8}$/.test(raw)) {
      const recent = await orderModel.find().sort({ createdAt: -1 }).limit(300).lean();
      order =
        recent.find(
          (item) => String(item._id).slice(-8).toUpperCase() === raw.toUpperCase()
        ) || null;
    }

    if (!order) {
      return NextResponse.json({ error: "No order found with this ID." }, { status: 404 });
    }

    const serialized = serializeOrder(order);
    return NextResponse.json({
      order: {
        _id: serialized._id,
        productTitle: serialized.productTitle,
        productImage: serialized.productImage,
        quantity: serialized.quantity,
        price: serialized.price,
        status: serialized.status,
        city: serialized.city,
        expectedDeliveryDate: serialized.expectedDeliveryDate,
        createdAt: serialized.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not track order." }, { status: 500 });
  }
}
