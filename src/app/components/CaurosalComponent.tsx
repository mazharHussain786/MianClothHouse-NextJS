"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

type Props = {
  images: string[];
};

const CaurosalComponent = ({ images }: Props) => {
  const fallbackImage = "/product-1.png";

  return (
    <div className="w-full">
      <Carousel className="mx-auto w-full overflow-hidden bg-card shadow-sm">
        <CarouselContent>
          {(images && images.length > 0 ? images : [fallbackImage]).map(
            (img, index) => (
              <CarouselItem key={index} className="relative aspect-[4/5] w-full">
                <Image
                  src={img}
                  alt={`Product image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
              </CarouselItem>
            )
          )}
        </CarouselContent>

        {images.length > 1 && (
          <>
            <CarouselPrevious className="absolute top-1/2 left-2 z-10 h-8 w-8 -translate-y-1/2 border-border bg-card/90 sm:left-3 sm:h-10 sm:w-10" />
            <CarouselNext className="absolute top-1/2 right-2 z-10 h-8 w-8 -translate-y-1/2 border-border bg-card/90 sm:right-3 sm:h-10 sm:w-10" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default CaurosalComponent;
