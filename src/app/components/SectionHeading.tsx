export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-8 max-w-2xl px-1 text-center md:mb-12">
      {eyebrow && (
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl font-semibold text-primary sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <div className="gold-rule mx-auto mt-4" />
      {subtitle && (
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
