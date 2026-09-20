"use client";
import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = ({ title }: { title: string }) => {
  const [productUrl, setProductUrl] = useState("");

  useEffect(() => {
    setProductUrl(window.location.href);
  }, []);

  return (
    <a
      href={`https://wa.me/923027726309?text=${encodeURIComponent(
        `Assalam-o-Alaikum, I am interested in ${title}. Is it available?\n\nProduct Link: ${productUrl}`
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center gap-2 border border-[#1f6b4a] bg-[#1f6b4a] px-5 py-3 text-sm font-medium uppercase tracking-[0.12em] text-white transition hover:bg-[#18553b]"
    >
      <FaWhatsapp size={18} />
      Order on WhatsApp
    </a>
  );
};

export default WhatsAppButton;
