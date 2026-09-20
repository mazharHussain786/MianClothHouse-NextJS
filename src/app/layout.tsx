import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import TopLoader from "./components/TopLoader";
import Footer from "./components/Footer";
import { Toaster } from "sonner";
import Providers from "./Provider";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mian Cloth House | Premium Fabrics & Traditional Wear",
  description:
    "Premium unstitched fabrics and ready collections for women. Order on WhatsApp from Kot Muzaffar, Mailsi.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${cormorant.variable} antialiased font-sans`}
      >
        <Providers>
          <TopLoader />
          <Toaster position="top-right" richColors />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingWhatsApp />
          </div>
        </Providers>
      </body>
    </html>
  );
}
