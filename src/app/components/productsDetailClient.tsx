"use client";

import React from "react";
import CaurosalComponent from "@/app/components/CaurosalComponent";
import WhatsAppButton from "./WhatsAppButton";

type ProductProps = {
  product: {
    _id: string;
    title: string;
    category: string;
    price: number;
    discountPrice: number;
    description: string;
    colors: string[];
    images?: string[];
  };
};

const ProductDetailClient = ({ product }: ProductProps) => {
  return (
    <div className="md:flex pb-24 justify-center gap-6 mt-6">
      {/* Left: Carousel */}
      <div className="w-full md:w-4/6">
        <CaurosalComponent images={product?.images || []} />
      </div>

      {/* Right: Product Details */}
  <div className="bg-white w-full md:w-2/6 p-6 rounded-lg shadow-md sticky top-6 self-start">

        <h1 className="text-2xl font-bold mb-2">{product?.title}</h1>
        <p className="text-gray-500 mb-3 capitalize">{product?.category}</p>

        <div className="mb-4">
          <span className="text-3xl font-bold text-red-600">
            Rs. {product?.discountPrice || product?.price}
          </span>
          <span className="text-gray-400 line-through ml-2">
            Rs. {product?.discountPrice ? product.price : product?.price + 500}
          </span>
        </div>

        <p className="text-gray-700 mb-4">{product.description}</p>

        {product?.colors?.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Available Colors:</h3>
            <div className="flex gap-3">
              {product?.colors?.map((color) => (
                <span
                  key={color}
                  className="w-6 h-6 rounded-full border cursor-pointer"
                  style={{ backgroundColor: color.toLowerCase() }}
                ></span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 border-t pt-4 text-sm text-gray-600">
          <ul className="space-y-1">
            <li>✅ 100% Original & Premium Quality</li>
            <li>✅ Cash on Delivery Available</li>
            <li>✅ Exclusive Limited Stock – Grab Now!</li>
            <li>✅ Premium Quality Fabric – Long Lasting</li>
            <li>✅ 24/7 Customer Support</li>
          </ul>
        </div>

        {/* <div className="flex gap-4 mt-9 bg-red-700 text-white px-5 py-3 rounded-lg hover:bg-red-800 font-semibold w-full justify-center"> */}
          <WhatsAppButton title={product?.title} />
          {/* <a
            href={`https://wa.me/923027726309?text=${encodeURIComponent(
              `Asslam-o-Alaikum I am interested in ${
                product.title
              }. Is it available?\n\nProduct Link: ${
                typeof window !== "undefined" ? window.location.href : ""
              }`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            Order on WhatsApp
          </a> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default ProductDetailClient;
