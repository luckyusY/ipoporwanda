"use client";

import { MessageCircle, Phone, PlusCircle, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MainNav } from "@/components/main-nav";

const phoneDisplay = "+250 788 000 000";
const phoneTel = "+250788000000";
const whatsappUrl = "https://wa.me/250788000000?text=Hello%20Ipopo%20Rwanda%2C%20I%20need%20help%20with%20a%20listing.";

export function SiteHeader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;
      if (currentY < 24) setHidden(false);
      else if (delta > 8) setHidden(true);
      else if (delta < -8) setHidden(false);
      lastY = currentY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 shadow-lg shadow-black/25 transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="bg-ipopo-blue px-2 py-1 text-center text-[10px] font-black leading-[16px] text-white sm:px-4 sm:text-[11px] sm:leading-[18px]">
        <span className="text-gold">Ipopo Rwanda</span> premium property and cars.{" "}
        <Link href="/admin" className="text-gold underline-offset-2 hover:underline">
          LIST NOW
        </Link>
      </div>

      <div className="hidden border-y border-gold/25 bg-brand-dark text-white sm:block">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-4 py-1 text-[10px] font-semibold uppercase tracking-wide 2xl:px-6">
          <div className="hidden gap-5 md:flex">
            <Link href="/properties">Verified Listings</Link>
            <Link href="/#locations">Kigali Locations</Link>
            <Link href="/admin">Owner Studio</Link>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <a href={`tel:${phoneTel}`}>{phoneDisplay}</a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <Link href="/#cars">Cars & Mobility</Link>
          </div>
        </div>
      </div>

      <div className="bg-white text-foreground">
        <div className="mx-auto grid w-full max-w-[1440px] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-3 py-2 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-4 sm:px-4 2xl:px-6">
          <Link href="/" className="flex min-w-0 shrink items-center gap-2" aria-label="Ipopo Rwanda home">
            <Image
              src="/logo.jpg"
              alt="Ipopo Rwanda"
              width={80}
              height={80}
              priority
              className="size-11 shrink-0 rounded-xl border border-line object-cover sm:size-12"
            />
            <span className="min-w-0 leading-tight">
              <span className="block truncate text-sm font-black sm:text-base">Ipopo Rwanda</span>
              <span className="block truncate text-[9px] font-bold uppercase tracking-wide text-gold sm:text-[10px]">
                Real estate marketplace
              </span>
            </span>
          </Link>

          <form action="/properties" className="relative order-3 col-span-2 min-w-0 sm:order-none sm:col-span-1">
            <input
              name="q"
              aria-label="Search listings"
              placeholder="Search properties, cars, locations..."
              className="h-10 w-full rounded-full border-0 bg-white px-4 pr-10 text-sm font-medium text-[#111827] outline-none ring-2 ring-transparent transition focus:ring-gold sm:px-5 sm:pr-12 sm:font-semibold"
            />
            <button
              type="submit"
              aria-label="Search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gold sm:right-4"
            >
              <Search aria-hidden size={21} />
            </button>
          </form>

          <div className="flex shrink-0 items-center gap-2 sm:hidden">
            <a href={`tel:${phoneTel}`} aria-label="Call Ipopo Rwanda" className="grid size-10 place-items-center rounded-full bg-brand-soft text-brand">
              <Phone aria-hidden size={22} />
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Ipopo Rwanda" className="grid size-10 place-items-center rounded-full bg-[#16a34a]">
              <MessageCircle aria-hidden size={23} />
            </a>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-brand/15 px-4 text-sm font-bold text-brand hover:bg-brand-soft"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <Link
              href="/admin"
              className="inline-flex h-10 items-center gap-2 rounded-full bg-ipopo-blue px-4 text-sm font-black text-white"
            >
              <PlusCircle size={16} /> List
            </Link>
          </div>
        </div>
      </div>

      <MainNav />
    </header>
  );
}
