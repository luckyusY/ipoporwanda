"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { formatMoney, toWhatsappUrl } from "@/lib/format";
import type { PropertyListing } from "@/lib/types";

export function HeroSlider({ listings }: { listings: PropertyListing[] }) {
  const slides = useMemo(() => listings.slice(0, 5), [listings]);
  const [active, setActive] = useState(0);
  const current = slides[active];

  useEffect(() => {
    if (slides.length < 2) return;

    const timer = window.setInterval(() => {
      setActive((index) => (index + 1) % slides.length);
    }, 5600);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  if (!current) return null;

  const detailHref = current.group === "properties" ? `/properties/${current.slug}` : "#contact";

  return (
    <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden border-b border-line bg-brand-dark text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={current.images[0]}
            alt={current.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,28,23,0.92),rgba(7,28,23,0.58),rgba(7,28,23,0.25))]" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.68fr] lg:px-8">
        <div className="max-w-3xl">
          <motion.p
            key={`${current.id}-tag`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 inline-flex rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-bold backdrop-blur"
          >
            {current.group === "cars" ? "Premium mobility" : "Verified Kigali property"} / For {current.purpose}
          </motion.p>
          <motion.h1
            key={`${current.id}-title`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.06 }}
            className="text-balance text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl"
          >
            {current.title}
          </motion.h1>
          <motion.p
            key={`${current.id}-summary`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-white/78"
          >
            {current.summary}
          </motion.p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={detailHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-bold text-brand-dark transition hover:bg-brand-soft"
            >
              View showcase <ArrowRight size={17} />
            </Link>
            <a
              href={toWhatsappUrl(current.whatsapp, current.title)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16a34a] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#12813c]"
            >
              <MessageCircle size={17} /> WhatsApp
            </a>
          </div>
        </div>

        <motion.aside
          key={`${current.id}-panel`}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-lg border border-white/15 bg-white/12 p-5 shadow-2xl backdrop-blur-xl"
        >
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Featured deal</p>
          <p className="mt-4 text-4xl font-black">{formatMoney(current.price, current.currency)}</p>
          <p className="mt-2 text-white/70">{current.location}, {current.district}</p>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {current.features.slice(0, 4).map((feature) => (
              <span key={feature} className="rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold">
                {feature}
              </span>
            ))}
          </div>
          <a
            href={`tel:${current.phone}`}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-4 text-sm font-bold transition hover:bg-white hover:text-brand-dark"
          >
            <Phone size={17} /> Call agent
          </a>
        </motion.aside>

        <div className="absolute bottom-6 left-4 right-4 z-20 mx-auto flex max-w-7xl gap-2 px-0 sm:left-6 sm:right-6 lg:px-8">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActive(index)}
              className={`h-1.5 rounded-full transition ${
                active === index ? "w-16 bg-white" : "w-8 bg-white/35 hover:bg-white/70"
              }`}
              aria-label={`Show ${slide.title}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
