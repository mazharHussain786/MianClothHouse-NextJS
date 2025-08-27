"use client";
import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-6 md:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-red-800 mb-4">
          About <span className="text-gray-900">Mian Cloth House</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Welcome to <strong>Mian Cloth House</strong>, where tradition meets
          modern fashion. Since our inception, we’ve been dedicated to bringing
          premium fabrics, unique designs, and affordable luxury to our
          customers.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-semibold text-red-700 mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Established with a passion for quality and style, Mian Cloth House
            has become a trusted name for clothing enthusiasts. We offer a wide
            range of fabrics that combine elegance with
            comfort.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our mission is simple <strong>to make every customer feel special</strong>  with
            our handpicked collections. From everyday essentials to festive
            wear, we have something for everyone.
          </p>
        </div>

        {/* Right Section */}
        <div className="relative w-full h-80">
          <Image
            src="/about.jpg" // add an image in public folder named about.jpg
            alt="Mian Cloth House"
            fill
            className="rounded-xl object-cover shadow-lg"
          />
        </div>
      </div>

      {/* Vision & Values */}
      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-red-700 mb-2">Quality</h3>
            <p className="text-gray-600">
              Every product is crafted with the finest materials to ensure
              durability and elegance.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-red-700 mb-2">
              Affordability
            </h3>
            <p className="text-gray-600">
              Premium fashion at prices you’ll love – because style shouldn’t be
              expensive.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-red-700 mb-2">
              Customer First
            </h3>
            <p className="text-gray-600">
              We believe in building relationships, not just making sales.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">
          Visit Our Store or Shop Online!
        </h2>
        <p className="text-gray-700 mb-6">
          Experience the best in fashion with Mian Cloth House.
        </p>
        <Link
          href="/"
          className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
