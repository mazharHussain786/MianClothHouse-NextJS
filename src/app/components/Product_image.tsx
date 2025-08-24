"use client";
import React, { useState } from "react";
import Image from "next/image";
import CaurosalComponent from "./CaurosalComponent";

const Product_image = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(images[0] || "");

  if (!currentImage) {
    return (
      <div className="w-full h-72 bg-gray-200 flex items-center justify-center">
    
      
      </div>
    );
  }

  return (
    <div
      className="w-full h-72 md:h-96 overflow-hidden "
      onMouseEnter={() => setCurrentImage(images[1] || images[0])}
      onMouseLeave={() => setCurrentImage(images[0])}
    >
      <Image
        src={currentImage}
        alt="Product Thumbnail"
        width={400}
        height={400}
        className="object-contain w-full h-full transition duration-300"
      />
    </div>
  );
};

export default Product_image;
