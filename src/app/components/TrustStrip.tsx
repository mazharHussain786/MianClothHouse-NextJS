const items = [
  { title: "Premium Fabrics", text: "Handpicked quality you can feel" },
  { title: "WhatsApp Orders", text: "Simple ordering, fast replies" },
  { title: "Cash on Delivery", text: "Pay when your order arrives" },
  { title: "Mailsi Store", text: "Visit us in Kot Muzaffar" },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:gap-6 sm:px-6 md:grid-cols-4 md:px-8 md:py-10">
        {items.map((item) => (
          <div key={item.title} className="text-center md:text-left">
            <p className="font-display text-lg text-primary sm:text-xl">{item.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
