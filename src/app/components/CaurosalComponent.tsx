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
  const fallbackImage = "/product-placeholder.png"; // Fallback image agar koi image na mile

  return (
    <div className="w-full">
      <Carousel className="w-full max-w-xl mx-auto mt-3 rounded-xl shadow-xl overflow-hidden bg-white">
        <CarouselContent>
          {(images && images.length > 0 ? images : [fallbackImage]).map(
            (img, index) => (
              <CarouselItem key={index} className="relative w-full">
                <Image
                  src={img}
                  alt={`Product image ${index + 1}`}
                  height={500}
                  width={500}
                  className="object-cover w-full h-auto"
                  priority={index === 0} // Pehli image ko priority
                />
              </CarouselItem>
            )
          )}
        </CarouselContent>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <CarouselPrevious className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 hover:bg-gray-200 p-3 rounded-full shadow-lg z-10" />
            <CarouselNext className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white text-gray-700 hover:bg-gray-200 p-3 rounded-full shadow-lg z-10" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default CaurosalComponent;
