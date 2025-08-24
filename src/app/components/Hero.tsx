


// "use client";

// import Image from "next/image";
// import React from "react";

// const Hero = () => {
//   return (
//     <section className="flex flex-col md:flex-row w-full min-h-[80vh] items-center bg-white justify-between px-6 py-8 md:py-12 border-2 gap-6">
//       {/* Left Content */}
//       <div className="text-center md:text-left max-w-lg">
//         <h1 className="text-3xl md:text-5xl font-bold mb-4">
//           Trendy & Affordable Clothes
//         </h1>
//         <p className="text-lg md:text-xl mb-6">
//           Discover the latest fashion for men and women
//         </p>
//         <a
//           href="#products"
//           className="inline-block px-6 py-3 bg-red-950 hover:bg-red-800 text-white font-semibold rounded-lg transition"
//         >
//           View Collection
//         </a>
//       </div>

//       {/* Image Container */}


//        <div className="relative w-80 h-80">
//     <Image
//       src="/Hero-image.jpg"
//       alt="Hero-image"
//       fill
//       className="object-cover rounded-lg"
//     />
//   </div>
//       {/* <div className="relative w-full md:w-1/2 h-64 md:h-[400px]">
//         <Image
//           src="/Hero-image.jpg"
//           alt="Hero-image"
//           fill
//           className="object-cover rounded-lg"
//           priority
//         />
//       </div> */}
//     </section>
//   );
// };

// export default Hero;



// "use client";

// import Image from "next/image";
// import React from "react";

// const Hero = () => (
//   <section className="relative w-full h-screen flex flex-col md:flex-row items-center">
//     {/* Left: Text & CTA */}
//     <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center px-6 md:px-16 text-center md:text-left">
//       <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
//         Embrace Style & Comfort
//       </h1>
//       <p className="text-white text-lg md:text-2xl mb-6 max-w-md">
//         Explore our premium collection for men & women—tailored trends at great prices.
//       </p>
//       <a
//         href="#products"
//         className="inline-block bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-md font-semibold transition"
//       >
//         Shop the Collection
//       </a>
//     </div>

//     {/* Right: Background Image */}
//     <div className="flex-1 w-full h-full relative">
//       <Image
//         src="https://www.nameerabyfarooq.com/cdn/shop/products/EmbellishedSimpleLongSalwarKameezPakistaniPartyDress_620x.jpg?v=1658423122"
//         alt="Stylish clothing display"
//         fill
//         priority
//         className="object-contain"
//       />
//     </div>
//   </section>
// );

// export default Hero;



"use client";

import Image from "next/image";
import React from "react";
import { FaTshirt, FaTags, FaTruck } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
        src="/Capture.jpg"
          // src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1473&q=80"
          // src="https://azrakh.com/wp-content/uploads/2025/03/WhatsAppImage2024-02-17at4.17.26PM.jpg"
          // src="https://www.faisalabadfabricstore.com/wp-content/uploads/2023/05/2pcs-R-7.jpg"
          alt="Fashion Collection"
          fill
          className="object-cover scale-110 transition-transform duration-[10000ms]"
          priority
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 text-white">
        <div className="max-w-xl animate-fadeIn">
          <p className="text-pink-200 uppercase tracking-[3px] text-lg mb-4">
            New Collection 2025
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Embrace Style & Comfort
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Discover our premium collection for men & women—tailored trends at
            exceptional prices. Elevate your wardrobe with pieces designed for
            modern living.
          </p>
          <a
            href="#products"
            className="inline-block bg-red-700 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
          >
            Shop the Collection
          </a>

          {/* Hero Stats */}
          <div className="flex gap-10 mt-12 flex-wrap">
            <div className="flex items-center gap-4">
              <FaTshirt className="text-3xl text-pink-200" />
              <div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm">New Arrivals</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaTags className="text-3xl text-pink-200" />
              <div>
                <div className="text-2xl font-bold">30%</div>
                <div className="text-sm">Discount</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaTruck className="text-3xl text-pink-200" />
              <div>
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm">Shipping</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2">
        <span className="text-xs tracking-[3px]">SCROLL DOWN</span>
        <div className="w-5 h-5 border-b-2 border-r-2 border-white rotate-45 animate-bounce"></div>
      </div>
    </section>
  );
};

export default Hero;

