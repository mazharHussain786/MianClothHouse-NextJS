"use client";

import React from "react";
import CaurosalComponent from "@/app/components/CaurosalComponent";
import WhatsAppButton from "./WhatsAppButton";
import OrderForm from "./OrderForm";
import { seasonLabel } from "@/lib/seasons";

type ProductProps = {
  product: {
    _id: string;
    title: string;
    category: string;
    price: number;
    discountPrice?: number;
    description?: string;
    colors: string[];
    images?: string[];
    season?: string;
  };
};

const ProductDetailClient = ({ product }: ProductProps) => {
  const salePrice = product?.discountPrice || product?.price;
  const originalPrice = product?.discountPrice ? product.price : undefined;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-16">
      <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:gap-10">
        <CaurosalComponent images={product?.images || []} />

        <div className="self-start bg-card p-5 shadow-sm sm:p-7 md:sticky md:top-28">
          <p className="text-xs uppercase tracking-[0.2em] text-gold capitalize">
            {product?.category} · {seasonLabel(product?.season)}
          </p>
          <h1 className="font-display mt-2 text-3xl text-primary sm:text-4xl">{product?.title}</h1>

          <div className="mt-5 flex items-end gap-3">
            <span className="font-display text-3xl text-primary">Rs. {salePrice}</span>
            {originalPrice && (
              <span className="text-muted-foreground line-through">
                Rs. {originalPrice}
              </span>
            )}
          </div>

          <p className="mt-5 leading-relaxed text-foreground/80">
            {product.description}
          </p>

          {product?.colors?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Available Colors
              </h3>
              <div className="mt-3 flex gap-3">
                {product.colors.map((color) => (
                  <span
                    key={color}
                    title={color}
                    className="h-7 w-7 rounded-full border border-border"
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>
          )}

          <ul className="mt-8 space-y-2 border-t border-border pt-5 text-sm text-muted-foreground">
            <li>Original premium quality fabric</li>
            <li>Cash on delivery available</li>
            <li>Order on the website or WhatsApp — no account required</li>
            <li>Support throughout the day</li>
          </ul>

          <div className="mt-6 space-y-3">
            <OrderForm
              productId={product._id}
              productTitle={product.title}
              price={salePrice}
              colors={product.colors || []}
            />
            <WhatsAppButton title={product?.title} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailClient;
