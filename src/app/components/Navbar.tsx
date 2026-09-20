"use client";

import Link from "next/link";
import { LogOutIcon, User } from "lucide-react";
import MobileNavbar from "./MobileNavbar";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";
import SiteLogo from "./SiteLogo";

const links = [
  { href: "/", label: "Home" },
  { href: "/#categories", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/orders", label: "Your Orders" },
];

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleSession = () => {
    if (!session) {
      router.push("/login");
      return;
    }
    router.push(session.user?.role === "admin" ? "/admin" : "/orders");
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
    toast.success("Logged out successfully");
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="hidden border-b border-primary/10 bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-2 text-[11px] uppercase tracking-[0.08em]">
          <p>Premium fabrics &nbsp;·&nbsp; Online & WhatsApp orders</p>
        </div>
      </div>

      <div className="hidden border-b border-border bg-card/90 backdrop-blur-md md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-3">
          <SiteLogo />

          <nav className="flex items-center gap-4 lg:gap-8">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs tracking-wide lg:text-sm ${
                    active ? "text-primary" : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {session?.user?.role === "admin" && (
              <Link
                href="/admin"
                className="mr-1 border border-primary px-4 py-2 text-xs uppercase tracking-[0.16em] text-primary transition hover:bg-primary hover:text-primary-foreground"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={handleSession}
              aria-label="Profile"
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border text-primary transition hover:border-primary hover:bg-secondary"
            >
              <User size={18} />
            </button>
            {session && (
              <button
                onClick={handleLogout}
                aria-label="Logout"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border text-primary transition hover:border-primary hover:bg-secondary"
              >
                <LogOutIcon size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <MobileNavbar
          handleSession={handleSession}
          handleLogout={handleLogout}
          session={session}
        />
      </div>
    </header>
  );
};

export default Navbar;
