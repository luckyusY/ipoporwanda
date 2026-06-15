"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Eye, EyeOff } from "lucide-react";
import type { Metadata } from "next";

// metadata can't be exported from a client component — handled in layout only

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
      return;
    }

    const data = await res.json().catch(() => null);
    setError(data?.error ?? "Incorrect password.");
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">

        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl bg-brand-dark p-2">
            <Image
              src="/logo.png"
              alt="Ipopo Rwanda"
              width={64}
              height={64}
              className="size-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-black tracking-tight">Admin login</h1>
          <p className="mt-1 text-sm text-muted">Ipopo Rwanda — owner studio</p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="grid gap-4">
            <label className="grid gap-2 text-sm font-semibold">
              <span className="inline-flex items-center gap-1.5">
                <Lock size={12} />
                Password
              </span>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  autoFocus
                  className="h-12 w-full rounded-xl border border-line bg-background px-4 pr-11 font-normal outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 grid size-6 place-items-center text-muted hover:text-foreground"
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </label>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="h-12 w-full rounded-full bg-brand text-sm font-bold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-muted">
          Ipopo Rwanda &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
