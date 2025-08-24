// import Image from "next/image";
// import Link from "next/link";

// const FeaturedCategories = () => (
//   <section className="py-12 px-6" id="categories">
//     <h2 className="text-3xl font-bold mb-8 text-center">Featured Categories</h2>
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
//       {/* Men’s Category */}
//       <Link href="/categories/men" className="relative group rounded-lg overflow-hidden">
//         <Image
//           src="/men-category.jpg"
//           alt="Men’s Collection"
//           width={400}
//           height={400}
//           className="object-cover w-full h-64 group-hover:scale-105 transition duration-500"
//         />
//         <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
//           <span className="text-white text-2xl font-bold">Men’s Collection</span>
//         </div>
//       </Link>

//       {/* Women’s Category */}
//       <Link href="/categories/women" className="relative group rounded-lg overflow-hidden">
//         <Image
//           src="/women-category-1.jpg"
//           alt="Women’s Collection"
//           width={400}
//           height={100}
//           className="object-cover w-full h-64 group-hover:scale-105 transition duration-500"
//         />
//         <div className="absolute inset-0  bg-opacity-40 flex items-center justify-center">
//           <span className="text-black text-2xl font-bold">Women’s Collection</span>
//         </div>
//       </Link>

//     </div>
//   </section>
// );

// export default FeaturedCategories;



"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const categories = [
  {
    id: 1,
    name: "Men's Collection",
    description:
      "Elegant sherwanis, traditional kurtas, and modern fusion wear for the contemporary man",
    image:
      "/men-category.jpg",
    count: "0 Items",
    link: "/category/men",
  },
  {
    id: 2,
    name: "Women's Collection",
    description:
      "Exquisite shalwar kameez, elegant sarees, and stunning fusion wear for the modern woman",
    image:
      "/women-category-1.jpg",
    count: "200+ Items",
    link: "/category/women",
  },
];

const FeaturedCategories = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".category-card");
    cards.forEach((card, index) => {
      (card as HTMLElement).style.opacity = "0";
      (card as HTMLElement).style.transform = "translateY(30px)";
      setTimeout(() => {
        (card as HTMLElement).style.transition =
          "opacity 0.8s ease, transform 0.8s ease";
        (card as HTMLElement).style.opacity = "1";
        (card as HTMLElement).style.transform = "translateY(0)";
      }, 300 + index * 200);
    });
  }, []);

  return (
    <section className="max-w-7xl mx-auto py-16 px-4" id="categories">
      <h2 className="text-4xl font-bold text-center mb-4 text-gray-800 relative pb-4">
        Featured Collections
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-amber-700 rounded"></span>
      </h2>
      <p className="text-center text-lg text-gray-600 max-w-2xl mx-auto mb-12">
        Discover our exquisite range of traditional and contemporary attire
        crafted with precision and love
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-10">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group h-[400px]"
          >
            {/* Image */}
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Count Badge */}
            <span className="absolute top-4 right-4 bg-white/90 text-gray-800 px-4 py-1 rounded-full text-sm font-semibold backdrop-blur">
              {cat.count}
            </span>

            {/* Overlay */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 text-white group-hover:bg-amber-800/80 transition-all duration-500">
              <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
              <p className="text-sm opacity-90 mb-4">{cat.description}</p>
              <Link
                href={cat.link}
                className="inline-flex items-center text-white font-semibold text-lg hover:underline"
              >
                Explore Collection <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategories;
