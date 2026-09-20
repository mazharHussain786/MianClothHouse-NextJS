"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SiteLogo from "./SiteLogo";

const inputClass =
  "w-full border border-border bg-background px-4 py-3 outline-none focus:border-primary";

export default function RegisterComponent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create account.");

      const login = await signIn("credentials", {
        username: form.username,
        password: form.password,
        redirect: false,
      });

      if (!login || login.error) {
        toast.success("Account created. Please login.");
        router.push("/login");
        return;
      }

      toast.success("Welcome to Mian Cloth House");
      router.push("/orders");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-card px-8 py-10 shadow-sm">
        <div className="mb-6 flex justify-center">
          <SiteLogo />
        </div>
        <h2 className="font-display text-center text-4xl text-primary">Create account</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Optional — you can also order as a guest
        </p>

        {error && <p className="mt-4 text-center text-sm text-destructive">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="mb-1 block text-sm">Full name</label>
            <input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className={inputClass}
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Username</label>
            <input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className={inputClass}
              placeholder="Choose a username"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
              placeholder="03xx xxxxxxx"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className={inputClass}
              placeholder="At least 6 characters"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm">Confirm password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              className={inputClass}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary py-3 text-sm uppercase tracking-[0.16em] text-primary-foreground disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="text-primary underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
