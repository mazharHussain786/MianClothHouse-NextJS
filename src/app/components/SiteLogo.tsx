import Link from "next/link";

export default function SiteLogo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center border sm:h-11 sm:w-11 ${
          light ? "border-primary-foreground/25" : "border-primary/20"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className={`h-6 w-6 ${light ? "text-primary-foreground" : "text-primary"}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <circle cx="12" cy="5.2" r="1.5" />
          <path d="M12 6.7V9L3.2 16.2h17.6L12 9" />
        </svg>
      </span>
      <span className="leading-tight">
        <span
          className={`font-display block truncate text-[1.15rem] tracking-wide sm:text-[1.35rem] ${
            light ? "text-primary-foreground" : "text-primary"
          }`}
        >
          Mian Cloth House
        </span>
      </span>
    </Link>
  );
}
