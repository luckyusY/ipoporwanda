"use client";

import Link from "next/link";
import { useState } from "react";
import { Building2, Car, Home, MapPin, Menu, PlusCircle, X } from "lucide-react";

const navLinks = [
  { href: "/properties", icon: Building2, label: "Properties" },
  { href: "/#locations", icon: MapPin, label: "Locations" },
  { href: "/#contact", icon: Car, label: "Cars" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line/60 bg-background/92 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="Ipopo Rwanda home">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-sm shadow-brand/30">
              <Home size={17} strokeWidth={2.5} aria-hidden />
            </span>
            <div className="leading-none">
              <span className="block text-[15px] font-black tracking-tight">Ipopo Rwanda</span>
              <span className="mt-0.5 block text-[11px] text-muted">Premium Kigali properties</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold text-muted transition-all hover:bg-surface-soft hover:text-foreground"
              >
                <Icon size={14} />
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
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-9 place-items-center rounded-full border border-line bg-surface transition hover:bg-surface-soft md:hidden"
              aria-label="Open navigation menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <>
          <div
            className="overlay-enter fixed inset-0 z-[60] bg-foreground/30 backdrop-blur-sm"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <aside className="drawer-enter fixed right-0 top-0 z-[70] flex h-full w-[17rem] flex-col bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-dark text-white">
                  <Home size={13} strokeWidth={2.5} />
                </span>
                <span className="text-sm font-black">Ipopo Rwanda</span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-8 place-items-center rounded-full border border-line transition hover:bg-surface-soft"
                aria-label="Close navigation"
              >
                <X size={15} />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 p-4">
              {navLinks.map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition hover:bg-surface-soft hover:text-brand"
                >
                  <span className="grid size-8 place-items-center rounded-lg bg-brand-soft text-brand">
                    <Icon size={15} />
                  </span>
                  {label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-line p-4">
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-sm font-bold text-white transition hover:bg-brand-dark"
              >
                <PlusCircle size={15} strokeWidth={2.5} />
                List a property
              </Link>
            </div>
          </aside>
        </>
      )}
    </>
  );
}
