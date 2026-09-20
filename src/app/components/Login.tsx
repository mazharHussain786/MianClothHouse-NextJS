"use client";

import React, { useState } from "react";
import { getSession, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import SiteLogo from "./SiteLogo";

const inputClass =
  "w-full border border-border bg-background px-4 py-3 outline-none focus:border-primary";

const LoginComponent = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const search = useSearchParams();
  const callbackUrl = search.get("callbackUrl") || "";

  const afterLogin = async () => {
    const session = await getSession();
    toast.success("Welcome back");
    const destination =
      callbackUrl ||
      (session?.user?.role === "admin" ? "/admin" : "/orders");
    router.push(destination);
    router.refresh();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const res = await signIn("credentials", {
      phone,
      password,
      redirect: false,
    });

    if (!res || res.error) {
      setLoading(false);
      setErr("Invalid phone number or password.");
      toast.error("Login failed");
      return;
    }

    await afterLogin();
    setLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, phone, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create account.");

      const login = await signIn("credentials", {
        phone,
        password,
        redirect: false,
      });
      if (!login || login.error) {
        toast.success("Account created. Please login.");
        setMode("login");
        return;
      }
      await afterLogin();
    } catch (error) {
      setErr(error instanceof Error ? error.message : "Could not create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-card px-5 py-8 shadow-sm sm:px-8 sm:py-10">
        <div className="mb-6 flex justify-center">
          <SiteLogo />
        </div>
        <h2 className="font-display text-center text-3xl text-primary sm:text-4xl">
          {mode === "login" ? "Login" : "Create account"}
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {mode === "login"
            ? "Use your phone number to sign in"
            : "Phone number, name and password are enough"}
        </p>

        {err && <p className="mt-4 text-center text-sm text-destructive">{err}</p>}

        <form
          onSubmit={mode === "login" ? handleLogin : handleRegister}
          className="mt-8 space-y-4"
        >
          {mode === "register" && (
            <div>
              <label className="mb-1 block text-sm">Full name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={inputClass}
                placeholder="Your full name"
                required
              />
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm">Phone number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
              placeholder="03xx xxxxxxx"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-primary py-3 text-sm uppercase tracking-[0.16em] text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? mode === "login"
                ? "Signing in..."
                : "Creating account..."
              : mode === "login"
                ? "Login"
                : "Register"}
          </button>
        </form>

        {mode === "login" ? (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setErr("");
              }}
              className="cursor-pointer text-primary underline"
            >
              Register
            </button>
          </p>
        ) : (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setErr("");
              }}
              className="cursor-pointer text-primary underline"
            >
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginComponent;
