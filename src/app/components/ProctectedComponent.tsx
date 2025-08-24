"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role: string;
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const tokenRole = session?.user?.role;

  useEffect(() => {
    if (status === "loading") return; // Wait until session is fetched
    if (!session) {
      router.replace("/login");
    } else if (tokenRole?.role !== role) {
      router.replace("/");
    }
  }, [status, session]);

  if (status === "loading") {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  return <>{session && tokenRole?.role === "role" && children}</>;
};

export default ProtectedRoute;
