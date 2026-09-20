export type PublicOrder = {
  _id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  price: number;
  quantity: number;
  color: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  notes: string;
  status: string;
  paymentMethod: string;
  expectedDeliveryDate: string | null;
  createdAt: string;
};

export function serializeOrder(doc: unknown): PublicOrder {
  const data = (
    doc && typeof doc === "object" && !Array.isArray(doc) ? doc : {}
  ) as Record<string, unknown>;
  return {
    _id: String(data._id),
    productId: String(data.productId),
    productTitle: String(data.productTitle || ""),
    productImage: String(data.productImage || ""),
    price: Number(data.price || 0),
    quantity: Number(data.quantity || 1),
    color: String(data.color || ""),
    customerName: String(data.customerName || ""),
    phone: String(data.phone || ""),
    address: String(data.address || ""),
    city: String(data.city || ""),
    notes: String(data.notes || ""),
    status: String(data.status || "pending"),
    paymentMethod: String(data.paymentMethod || "cod"),
    expectedDeliveryDate: data.expectedDeliveryDate
      ? new Date(data.expectedDeliveryDate as string).toISOString()
      : null,
    createdAt: data.createdAt
      ? new Date(data.createdAt as string).toISOString()
      : new Date().toISOString(),
  };
}
