"use client";

import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogOutIcon, Menu } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Session } from "next-auth";

const MobileNavbar = (
  { handleSession ,handleLogout,session}: { handleSession: () => void ,  handleLogout: () => void,session:Session | null}

) => {
  const [isOpen, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <div className="flex justify-between items-center py-3 px-4 shadow-md bg-white md:hidden">
      <div className="flex items-center p-2">
        <span className="text-2xl  text-red-800 text-center flex items-center">
          {" "}
          𝑀𝒾𝒶𝓃 𝒞𝓁𝑜𝓉𝒽 𝐻𝑜𝓊𝓈𝑒{" "}
        </span>
      </div>

      <Sheet open={isOpen} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button className="p-2 rounded-md text-red-950 hover:bg-gray-100 transition">
            <Menu size={28} />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="bg-white p-6 w-64">
          {/* Sidebar Header */}
          <div className="flex items-center mt-3">
            <span className="text-2xl  text-red-800 text-center ">
              {" "}
              𝑀𝒾𝒶𝓃 𝒞𝓁𝑜𝓉𝒽 𝐻𝑜𝓊𝓈𝑒{" "}
            </span>
          </div>

          {/* Sidebar Links */}
          <nav className="space-y-4 mt-8">
            <Link
              href="/"
              onClick={handleClose}
              className="block w-full text-center py-3 border-2 bg-red-950 text-white hover:bg-red-800 transition rounded"
            >
              Home
            </Link>

            {/* Categories with Accordion */}
            <Accordion type="single" collapsible>
              <AccordionItem value="categories">
                <AccordionTrigger className="bg-red-950 text-white rounded px-4 py-3 hover:bg-red-800 flex justify-center">
                  Categories
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2 mt-2">
                    <Link
                      href="/category/men"
                      onClick={handleClose}
                      className="block w-full text-center py-2 border-2 bg-gray-100 hover:bg-gray-200 text-red-950 rounded"
                    >
                      Men
                    </Link>
                    <Link
                      href="/category/women"
                      onClick={handleClose}
                      className="block w-full text-center py-2 border-2 bg-gray-100 hover:bg-gray-200 text-red-950 rounded"
                    >
                      Women
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <Link
              href="/about"
              onClick={handleClose}
              className="block w-full text-center py-3 border-2 bg-red-950 text-white hover:bg-red-800 transition rounded"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              onClick={handleClose}
              className="block w-full text-center py-3 border-2 bg-red-950 text-white hover:bg-red-800 transition rounded"
            >
              Contact Us
            </Link>

            <button
              onClick={() => {
                handleSession();
                handleClose();
              }}
              className="block w-full text-center py-3 border-2 bg-red-950 text-white hover:bg-red-800 transition rounded cursor-pointer"
            >
              My Account
            </button>
                {session &&   <button
              onClick={handleLogout}
              className="w-full h-10 flex items-center justify-center rounded-full text-white bg-red-950 hover:bg-red-800 transition cursor-pointer"
            >
              <LogOutIcon size={20} className="text-white" /> Logout
            </button>}
          
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavbar;
