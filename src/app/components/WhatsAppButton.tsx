"use client";
import React, { useEffect, useState } from "react";

const WhatsAppButton = ({ title }: { title: string }) => {
  const [productUrl, setProductUrl] = useState("");

  useEffect(() => {
    setProductUrl(window.location.href);
  }, []);

  return (
    <a
      href={`https://wa.me/923027726309?text=${encodeURIComponent(
        `Asslam-o-Alaikum I am interested in ${title}. Is it available?\n\nProduct Link: ${productUrl}`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block flex gap-4 mt-9 bg-red-700 text-white px-5 py-3 rounded-lg hover:bg-red-800 font-semibold w-full justify-center"
    >
      Order on WhatsApp
    </a>
  );
};

export default WhatsAppButton;
