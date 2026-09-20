import Image from "next/image";
import Link from "next/link";
import SectionHeading from "./SectionHeading";

const FeaturedCategories = () => {
  return (
    <section className="mx-auto max-w-7xl scroll-mt-28 px-4 py-14 md:px-8 md:py-20" id="categories">
      <SectionHeading
        eyebrow="Collection"
        title="Women's Collection"
        subtitle="Lawn, festive wear, and signature unstitched pieces chosen for quality and occasion."
      />

      <Link
        href="/category/women"
        className="group relative mx-auto block h-[320px] max-w-4xl overflow-hidden sm:h-[400px] md:h-[480px]"
      >
        <Image
          src="/women-collection.jpg"
          alt="Women's Collection"
          fill
          quality={90}
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover object-[center_20%] transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-8">
          <h3 className="font-display text-2xl sm:text-4xl">Explore the Collection</h3>
          <p className="mt-2 max-w-md text-sm text-white/80">
            Shalwar kameez, lawn suits, and festive pieces from the shop floor.
          </p>
          <span className="mt-4 inline-block text-xs uppercase tracking-[0.2em] text-gold">
            Shop Women →
          </span>
        </div>
      </Link>
    </section>
  );
};

export default FeaturedCategories;
