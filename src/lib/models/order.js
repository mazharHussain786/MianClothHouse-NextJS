import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cloth",
      required: true,
    },
    productTitle: { type: String, required: true, trim: true },
    productImage: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1, max: 20, default: 1 },
    color: { type: String, default: "" },
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    notes: { type: String, default: "", trim: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    expectedDeliveryDate: {
      type: Date,
      default: null,
    },
    paymentMethod: {
      type: String,
      default: "cod",
    },
  },
  { timestamps: true }
);

export const orderModel =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);
