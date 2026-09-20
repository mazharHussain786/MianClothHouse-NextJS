"use client";
import Image from "next/image";
import Link from "next/link";

const values = [
  {
    title: "Quality",
    text: "Every fabric is chosen for feel, durability, and how it sits on the body.",
  },
  {
    title: "Fair Prices",
    text: "Premium fashion without the luxury markup. Style should be reachable.",
  },
  {
    title: "Customer First",
    text: "We build relationships, not just sales — in store and on WhatsApp.",
  },
];

export default function AboutUs() {
  return (
    <div className="px-4 py-12 sm:px-6 md:px-12 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-gold">Our Story</p>
        <h1 className="font-display mt-3 text-4xl text-primary sm:text-5xl md:text-6xl">
          About Mian Cloth House
        </h1>
        <div className="gold-rule mx-auto mt-5" />
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Where tradition meets modern fashion. We bring premium fabrics, considered
          designs, and honest pricing to Mailsi and beyond.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl text-primary">A trusted local name</h2>
          <p className="mt-4 leading-relaxed text-foreground/80">
            Established with a passion for quality and style, Mian Cloth House is
            known for fabrics that combine elegance with comfort — from everyday
            essentials to festive wear.
          </p>
          <p className="mt-4 leading-relaxed text-foreground/80">
            Our mission is simple: make every customer feel looked after, whether
            they visit the shop in Kot Muzaffar or order on WhatsApp.
          </p>
        </div>
        <div className="relative h-80 w-full overflow-hidden md:h-[420px]">
          <Image
            src="/about.jpg"
            alt="Mian Cloth House store"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl">
        <h2 className="font-display text-center text-3xl text-primary sm:text-4xl">Our Values</h2>
        <div className="gold-rule mx-auto mt-4" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {values.map((value) => (
            <div key={value.title} className="bg-card p-8 shadow-sm">
              <h3 className="font-display text-2xl text-primary">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {value.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-3xl bg-primary px-8 py-14 text-center text-primary-foreground">
        <h2 className="font-display text-4xl">Visit the store or shop online</h2>
        <p className="mt-3 text-primary-foreground/75">
          Experience the collection at Mian Cloth House.
        </p>
        <Link
          href="/#products"
          className="mt-8 inline-block bg-card px-8 py-3 text-sm uppercase tracking-[0.16em] text-primary"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
