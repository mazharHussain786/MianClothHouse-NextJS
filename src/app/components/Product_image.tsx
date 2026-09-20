import Image from "next/image";

const Product_image = ({
  images,
  alt = "Product thumbnail",
}: {
  images: string[];
  alt?: string;
}) => {
  const primary = images[0] || "";
  const secondary = images[1];

  if (!primary) {
    return (
      <div className="flex aspect-[3/4] w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
        Image coming soon
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary">
      <Image
        src={primary}
        alt={alt}
        fill
        className={`object-cover transition duration-500 ${
          secondary ? "group-hover:opacity-0" : ""
        }`}
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      {secondary && (
        <Image
          src={secondary}
          alt=""
          fill
          className="object-cover opacity-0 transition duration-500 group-hover:opacity-100"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      )}
    </div>
  );
};

export default Product_image;
