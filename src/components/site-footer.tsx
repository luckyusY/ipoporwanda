"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Send } from "lucide-react";

const whatsappUrl =
  "https://wa.me/250788000000?text=Hello%20Ipopo%20Rwanda%2C%20I%20need%20help%20with%20a%20listing.";

export function SiteFooter() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.5fr]">

          {/* ── Brand ──────────────────────────────────────────── */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-white/10 p-1.5">
                <Image
                  src="/logo.png"
                  alt="Ipopo Rwanda"
                  width={64}
                  height={64}
                  className="size-full object-contain"
                />
              </span>
              <div className="leading-tight">
                <p className="text-lg font-black">Ipopo Rwanda</p>
                <p className="text-[11px] text-white/50">Real estate marketplace</p>
              </div>
            </Link>

            <div className="mt-6 flex items-start gap-2 text-sm text-white/60">
              <MapPin size={15} className="mt-0.5 shrink-0 text-gold" strokeWidth={2.5} />
              <p>KN 70 Street, Kigali<br />Rwanda</p>
            </div>

            <div className="mt-5 flex gap-2.5">
              {[
                ["Facebook", "f", "#"],
                ["Twitter / X", "𝕏", "#"],
                ["Instagram", "in", "#"],
                ["YouTube", "▶", "#"],
              ].map(([label, glyph, href]) => (
                <a
                  key={String(label)}
                  href={String(href)}
                  aria-label={String(label)}
                  className="grid size-9 place-items-center rounded-full border border-white/15 text-[13px] font-black text-white/55 transition hover:border-gold hover:text-gold"
                >
                  {String(glyph)}
                </a>
              ))}
            </div>
          </div>

          {/* ── Get to know us ─────────────────────────────────── */}
          <div>
            <h3 className="mb-5 font-black">Get to know us</h3>
            <ul className="space-y-3 text-sm text-white/60">
              {[
                ["About", "/#contact"],
                ["All properties", "/properties"],
                ["All cars", "/#cars"],
                ["Locations", "/#locations"],
                ["Owner studio", "/admin"],
              ].map(([label, href]) => (
                <li key={String(label)}>
                  <Link href={String(href)} className="transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Interact with us ───────────────────────────────── */}
          <div>
            <h3 className="mb-5 font-black">Interact with us</h3>
            <ul className="space-y-3 text-sm text-white/60">
              {[
                ["List a property", "/admin"],
                ["Add a car", "/admin"],
                ["WhatsApp us", whatsappUrl],
                ["Contact us", "/#contact"],
              ].map(([label, href]) => (
                <li key={String(label)}>
                  <Link href={String(href)} className="transition hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Newsletter ─────────────────────────────────────── */}
          <div>
            <h3 className="mb-3 font-black">Newsletter</h3>
            <p className="mb-5 text-sm leading-6 text-white/60">
              Subscribe and receive updates of new properties via email.
            </p>
            <form className="flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email*"
                required
                className="h-11 flex-1 rounded-l-md border border-white/15 bg-white/8 px-4 text-sm text-white outline-none placeholder:text-white/35 focus:border-gold"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid h-11 w-12 shrink-0 place-items-center rounded-r-md bg-gold text-white transition hover:bg-[#c9a200]"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────── */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>All Rights Reserved © Ipopo Rwanda 2026</p>
          <div className="flex gap-5">
            <Link href="/#contact" className="transition hover:text-white">
              Terms &amp; Conditions
            </Link>
            <Link href="/#contact" className="transition hover:text-white">
              Privacy &amp; Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
