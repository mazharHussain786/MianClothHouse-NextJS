import Image from "next/image";

const Hero = () => {
  return (
    <section className="grid min-h-[auto] overflow-hidden bg-card lg:min-h-[calc(100vh-8rem)] lg:grid-cols-2">
      <div className="flex flex-col justify-center px-4 py-12 sm:px-6 md:px-12 md:py-16 lg:px-16">
        <p className="animate-fadeIn mb-4 text-xs uppercase tracking-[0.22em] text-gold">
          Mian Cloth House
        </p>
        <h1 className="font-display text-3xl leading-[1.15] font-semibold text-primary sm:text-4xl md:text-5xl lg:text-6xl">
          Where fabric becomes heritage.
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:mt-6 sm:text-base md:text-lg">
          Handpicked unstitched fabrics and ready collections for women.
          Order from our Mailsi store on WhatsApp.
        </p>
        <div className="mt-8 sm:mt-10">
          <a
            href="#products"
            className="inline-flex w-full items-center justify-center bg-primary px-7 py-3 text-sm uppercase tracking-[0.16em] text-primary-foreground transition hover:bg-primary/90 sm:w-auto"
          >
            Shop Collection
          </a>
        </div>
      </div>

      <div className="relative min-h-[36vh] sm:min-h-[42vh] lg:min-h-full">
        <Image
          src="/about.jpg"
          alt="Mian Cloth House fabric collection"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent lg:bg-gradient-to-l" />
      </div>
    </section>
  );
};

export default Hero;
