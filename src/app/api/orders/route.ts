import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import { clothModel } from "@/lib/models/cloth";
import { orderModel } from "@/lib/models/order";
import { authOptions } from "@/lib/auth";
import { serializeOrder } from "@/lib/serializeOrder";
import { isValidPhone, normalizePhone } from "@/lib/phone";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const customerName = String(body.customerName || "").trim();
    const phone = normalizePhone(String(body.phone || ""));
    const address = String(body.address || "").trim();
    const city = String(body.city || "").trim();
    const notes = String(body.notes || "").trim();
    const color = String(body.color || "").trim();
    const productId = String(body.productId || "").trim();
    const quantity = Number(body.quantity || 1);

    if (!customerName || customerName.length < 2) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
    }
    if (!city || city.length < 2) {
      return NextResponse.json({ error: "Please enter your city." }, { status: 400 });
    }
    if (!address || address.length < 8) {
      return NextResponse.json({ error: "Please enter a complete delivery address." }, { status: 400 });
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json({ error: "Invalid product." }, { status: 400 });
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
      return NextResponse.json({ error: "Quantity must be between 1 and 20." }, { status: 400 });
    }

    await dbConnect();
    const product = await clothModel.findById(productId);
    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    const session = await getServerSession(authOptions);
    const price = product.discountPrice || product.price;

    const order = await orderModel.create({
      productId: product._id,
      productTitle: product.title,
      productImage: product.images?.[0] || "",
      price,
      quantity,
      color,
      customerName,
      phone,
      address,
      city,
      notes,
      userId: session?.user?.id || null,
      status: "pending",
      paymentMethod: "cod",
    });

    return NextResponse.json(
      { message: "Order placed successfully.", order: serializeOrder(order.toObject()) },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not place order." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Login required." }, { status: 401 });
    }

    await dbConnect();
    const filter =
      session.user.role === "admin" ? {} : { userId: session.user.id };
    const orders = await orderModel.find(filter).sort({ createdAt: -1 }).lean();

    return NextResponse.json(orders.map((order) => serializeOrder(order)));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load orders." }, { status: 500 });
  }
}
