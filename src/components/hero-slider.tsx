"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle, Phone } from "lucide-react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatMoney, toWhatsappUrl } from "@/lib/format";
import type { PropertyListing } from "@/lib/types";

export function HeroSlider({ listings }: { listings: PropertyListing[] }) {
  const slides = listings.slice(0, 6);
  if (!slides.length) return null;

  return (
    /*
     * hero-section uses 100svh (small viewport height) — this accounts for
     * the browser chrome bar on iOS Safari / Android Chrome, preventing the
     * common "content hidden behind address bar" bug.
     */
    <section className="hero-section relative isolate overflow-hidden border-b border-line bg-brand-dark text-white">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        loop={slides.length > 1}
        speed={900}
        autoplay={{ delay: 5200, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".hero-pagination" }}
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
        className="hero-section absolute inset-0 w-full hero-swiper"
      >
        {slides.map((listing, index) => {
          const detailHref =
            listing.group === "properties"
              ? `/properties/${listing.slug}`
              : "#contact";

          return (
            <SwiperSlide key={listing.id}>
              {/*
               * On mobile the aside card is hidden — price is shown inline.
               * On desktop the aside card floats beside the text.
               * Using items-end on mobile so content sits above the
               * pagination dots at the bottom; items-center on desktop.
               */}
              <div className="hero-section relative flex flex-col justify-end pb-20 sm:justify-center sm:pb-0">
                {/* Background image */}
                <Image
                  src={listing.images[0]}
                  alt={listing.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />

                {/* Gradient — bottom-heavy on mobile, side-heavy on desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#071c17]/95 via-[#071c17]/55 to-[#071c17]/20 sm:bg-[linear-gradient(90deg,rgba(7,28,23,0.94),rgba(7,28,23,0.64),rgba(7,28,23,0.2))]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(199,147,62,0.22),transparent_30rem)]" />

                {/* Content grid */}
                <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16 lg:grid lg:grid-cols-[1fr_0.64fr] lg:items-center lg:gap-10 lg:px-8 lg:py-20">
                  {/* ── Left / main ── */}
                  <div className="max-w-2xl">
                    {/* Category badge */}
                    <p className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] backdrop-blur-sm">
                      {listing.group === "cars"
                        ? "Premium mobility"
                        : "Verified Kigali property"}{" "}
                      / For {listing.purpose}
                    </p>

                    {/* Heading — fluid clamp so it never overflows */}
                    <h1 className="hero-title font-black tracking-tight text-balance">
                      {listing.title}
                    </h1>

                    {/* Price — mobile only; desktop shows in aside */}
                    <p className="mt-3 text-[1.4rem] font-black text-gold lg:hidden">
                      {formatMoney(listing.price, listing.currency)}
                    </p>

                    {/* Summary — clamped on small screens */}
                    <p className="mt-3 line-clamp-2 text-[15px] leading-7 text-white/75 sm:line-clamp-3 sm:text-base">
                      {listing.summary}
                    </p>

                    {/* CTAs — stack on mobile, row on sm+ */}
                    <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <Link
                        href={detailHref}
                        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-bold text-brand-dark transition hover:bg-brand-soft"
                      >
                        View showcase <ArrowRight size={17} />
                      </Link>
                      <a
                        href={toWhatsappUrl(listing.whatsapp, listing.title)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[#16a34a] px-6 text-[15px] font-bold text-white transition hover:bg-[#12813c]"
                      >
                        <MessageCircle size={17} /> WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* ── Right / aside — desktop only ── */}
                  <aside className="hidden lg:block rounded-2xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                    <p className="text-xs font-black uppercase tracking-[0.18em] text-gold">
                      Featured deal
                    </p>
                    <p className="mt-4 text-4xl font-black">
                      {formatMoney(listing.price, listing.currency)}
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      {listing.location}, {listing.district}
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      {listing.features.slice(0, 4).map((feature) => (
                        <span
                          key={feature}
                          className="rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-sm font-semibold"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`tel:${listing.phone}`}
                      className="mt-5 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full border border-white/25 text-[15px] font-bold transition hover:bg-white hover:text-brand-dark"
                    >
                      <Phone size={17} /> Call agent
                    </a>
                  </aside>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Pagination + nav — positioned above safe-area on mobile */}
      <div className="pointer-events-none absolute bottom-5 left-4 right-4 z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 sm:left-6 sm:right-6 lg:px-8">
        <div className="hero-pagination pointer-events-auto flex gap-2" />
        <div className="pointer-events-auto flex gap-2">
          <button
            type="button"
            className="hero-prev grid size-11 place-items-center rounded-full border border-white/25 bg-black/25 backdrop-blur transition hover:bg-white hover:text-brand-dark"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="hero-next grid size-11 place-items-center rounded-full border border-white/25 bg-black/25 backdrop-blur transition hover:bg-white hover:text-brand-dark"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
