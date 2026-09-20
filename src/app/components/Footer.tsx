import Link from "next/link";
import { Facebook, Instagram, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-0 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 md:grid-cols-4 md:px-8 md:py-16">
        <div>
          <p className="font-display text-3xl">Mian Cloth House</p>
          <div className="gold-rule mt-4" />
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">
            A trusted cloth house for premium fabrics, festive wear, and
            everyday collections in Mailsi.
          </p>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold">
            Quick Links
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/#categories" className="hover:text-white">
                Collections
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold">
            Contact
          </h3>
          <div className="mt-4 space-y-3 text-sm text-primary-foreground/80">
            <p className="flex items-start gap-2">
              <Phone size={16} className="mt-0.5 shrink-0" />
              +92 302 7726309
            </p>
            <p className="flex items-start gap-2">
              <Mail size={16} className="mt-0.5 shrink-0" />
              mianclothhouse@gmail.com
            </p>
            <p className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              Kot Muzaffar, Tehsil Mailsi
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] text-gold">
            Follow Us
          </h3>
          <div className="mt-4 flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center border border-primary-foreground/20 hover:border-gold hover:text-gold"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center border border-primary-foreground/20 hover:border-gold hover:text-gold"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs tracking-wide text-primary-foreground/55">
        © {new Date().getFullYear()} Mian Cloth House. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
