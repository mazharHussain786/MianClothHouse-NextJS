"use client";

import Link from "next/link";
import { LogOutIcon, User } from "lucide-react";
import MobileNavbar from "./MobileNavbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { toast } from "sonner";

const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const hanldeSession = () => {
    if (session) {
      router.push("/");
      return;
    }
    router.push("/login");
  };
  const handleLogout=()=>{signOut({callbackUrl:"/"}); toast.success("Logout Successfully")}
  return (
    <>
      <div className="hidden md:block">
        <div className="flex justify-between items-center py-4 px-8 shadow-md bg-white">
          {/* Logo */}
          <span className="text-2xl font-bold tracking-wide text-red-950">
            𝑀𝒾𝒶𝓃 𝒞𝓁𝑜𝓉𝒽 𝐻𝑜𝓊𝓈𝑒
          </span>

          {/* Links */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="px-5 py-2 bg-red-950 text-white rounded-full hover:bg-red-800 transition"
            >
              Home
            </Link>

            <a
              href="/#categories"
              className="px-5 py-2 bg-red-950 text-white rounded-full hover:bg-red-800 transition"
            >
              Categories
            </a>

            <Link
              href="/about"
              className="px-5 py-2 bg-red-950 text-white rounded-full hover:bg-red-800 transition"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className="px-5 py-2 bg-red-950 text-white rounded-full hover:bg-red-800 transition"
            >
              Contact Us
            </Link>

            {/* User Icon */}
            < button
              onClick={hanldeSession}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-400 hover:bg-gray-500 transition cursor-pointer"
            >
              <User size={20} className="text-white" />
            </button>
              {session &&
                < button
              onClick={handleLogout}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-400 hover:bg-gray-500 transition cursor-pointer"
            >
              <LogOutIcon size={20} className="text-white" />
            </button>
}
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <MobileNavbar handleSession={hanldeSession} handleLogout={handleLogout} session={session}/>
      </div>
    </>
  );
};

export default Navbar;
