"use client";

import Link from "next/link";
import { Facebook, Instagram, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-red-950 text-white py-10 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & About */}
        <div>
          <img src="/Logo.PNG" alt="Mian Cloth House" className="w-32 mb-4" />
          <p className="text-gray-300 text-sm">
            Your trusted clothing store for premium quality fabrics and designs.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="#categories" className="hover:text-gray-300">
                Categories
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-300">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="flex items-center gap-2">
            <Phone size={18} /> +92 302 7726309
          </p>
          <p className="flex items-center gap-2">
            <Mail size={18} /> mianclothhouse@gmail.com
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-gray-300"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center text-gray-400 mt-8 border-t border-gray-700 pt-4 text-sm">
        © {new Date().getFullYear()} Mian Cloth House. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
