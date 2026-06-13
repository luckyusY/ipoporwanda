"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Building2, Car, Home, MapPin, Menu, PlusCircle, X } from "lucide-react";

const navLinks = [
  { href: "/properties", icon: Building2, label: "Properties" },
  { href: "/#locations", icon: MapPin, label: "Locations" },
  { href: "/#contact", icon: Car, label: "Cars" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (!open) return;
    const saved = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = saved;
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line/60 bg-background/92 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5" aria-label="Ipopo Rwanda home">
            <span className="grid size-9 flex-none place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-sm shadow-brand/30">
              <Home size={17} strokeWidth={2.5} aria-hidden />
            </span>
            <div className="leading-none">
              <span className="block text-[15px] font-black tracking-tight">Ipopo Rwanda</span>
              <span className="mt-0.5 block text-[11px] text-muted">Premium Kigali properties</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {navLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold text-muted transition hover:bg-surface-soft hover:text-foreground"
              >
                <Icon size={14} aria-hidden />
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="hidden items-center gap-1.5 rounded-full bg-brand px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-brand/25 transition hover:bg-brand-dark sm:inline-flex"
            >
              <PlusCircle size={15} strokeWidth={2.5} aria-hidden />
              List now
            </Link>

            {/* Hamburger — 44 × 44 px touch target */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-11 place-items-center rounded-full border border-line transition hover:bg-surface-soft md:hidden"
              aria-label="Open navigation"
              aria-expanded={open}
              aria-controls="mobile-drawer"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ─────────────────────────────────── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="overlay-enter fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm"
            aria-hidden="true"
            onClick={close}
          />

          {/* Panel — clamp width so it never overflows a 320 px screen */}
          <aside
            id="mobile-drawer"
            className="drawer-enter fixed right-0 top-0 z-[70] flex h-full w-[min(80vw,22rem)] flex-col bg-background shadow-2xl"
            aria-label="Mobile navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="grid size-7 flex-none place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-dark text-white">
                  <Home size={13} strokeWidth={2.5} aria-hidden />
                </span>
                <span className="text-sm font-black">Ipopo Rwanda</span>
              </div>

              {/* Close — 44 × 44 px */}
              <button
                type="button"
                onClick={close}
                className="grid size-11 place-items-center rounded-full border border-line transition hover:bg-surface-soft"
                aria-label="Close navigation"
              >
                <X size={18} />
              </button>
            </div>

            {/* Links — each row min-h 52 px for easy tap */}
            <nav
              className="flex flex-1 flex-col gap-1 overflow-y-auto p-4"
              aria-label="Mobile menu"
            >
              {navLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={close}
                  className="flex min-h-[52px] items-center gap-3 rounded-xl px-4 text-[15px] font-semibold transition hover:bg-surface-soft hover:text-brand"
                >
                  <span className="grid size-9 flex-none place-items-center rounded-lg bg-brand-soft text-brand">
                    <Icon size={16} aria-hidden />
                  </span>
                  {label}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="border-t border-line p-4">
              <Link
                href="/admin"
                onClick={close}
                className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-bold text-white transition hover:bg-brand-dark"
              >
                <PlusCircle size={16} strokeWidth={2.5} aria-hidden />
                List a property
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
