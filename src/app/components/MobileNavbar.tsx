"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogOutIcon, Menu } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";
import SiteLogo from "./SiteLogo";

const MobileNavbar = ({
  handleSession,
  handleLogout,
  session,
}: {
  handleSession: () => void;
  handleLogout: () => void;
  session: Session | null;
}) => {
  const [isOpen, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const linkClass =
    "block w-full border-b border-border py-3 text-sm tracking-[0.12em] uppercase text-foreground/80";

  return (
    <div className="flex items-center justify-between gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur-md">
      <SiteLogo />

      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className="cursor-pointer rounded-md p-2 text-primary transition hover:bg-secondary"
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-72 bg-card p-6">
          <div className="mt-2">
            <SiteLogo />
          </div>

          <nav className="mt-8 space-y-1">
            <Link href="/" onClick={handleClose} className={linkClass}>
              Home
            </Link>

            <Link href="/category/women" onClick={handleClose} className={linkClass}>
              Collection
            </Link>

            <Link href="/about" onClick={handleClose} className={linkClass}>
              About
            </Link>
            <Link href="/contact" onClick={handleClose} className={linkClass}>
              Contact
            </Link>
            <Link href="/orders" onClick={handleClose} className={linkClass}>
              Your Orders
            </Link>
            {session?.user?.role === "admin" && (
              <Link href="/admin" onClick={handleClose} className={linkClass}>
                Dashboard
              </Link>
            )}

            <button
              onClick={() => {
                handleSession();
                handleClose();
              }}
              className="mt-6 w-full cursor-pointer bg-primary py-3 text-sm uppercase tracking-[0.16em] text-primary-foreground"
            >
              {session ? "Profile" : "Login"}
            </button>
            {session && (
              <button
                onClick={() => {
                  handleLogout();
                  handleClose();
                }}
                className="flex w-full items-center justify-center gap-2 py-3 text-sm text-muted-foreground"
              >
                <LogOutIcon size={16} /> Logout
              </button>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
