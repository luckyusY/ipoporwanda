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
    <section className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden border-b border-line bg-brand-dark text-white">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        loop={slides.length > 1}
        speed={900}
        autoplay={{ delay: 5200, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".hero-pagination" }}
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
        className="absolute inset-0 h-full w-full hero-swiper"
      >
        {slides.map((listing, index) => {
          const detailHref = listing.group === "properties" ? `/properties/${listing.slug}` : "#contact";

          return (
            <SwiperSlide key={listing.id}>
              <div className="relative min-h-[calc(100vh-4rem)]">
                <Image
                  src={listing.images[0]}
                  alt={listing.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,28,23,0.94),rgba(7,28,23,0.64),rgba(7,28,23,0.2))]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(199,147,62,0.22),transparent_30rem)]" />

                <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_0.68fr] lg:px-8">
                  <div className="max-w-3xl">
                    <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/12 px-4 py-2 text-sm font-bold backdrop-blur">
                      {listing.group === "cars" ? "Premium mobility" : "Verified Kigali property"} / For {listing.purpose}
                    </p>
                    <h1 className="text-balance text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl">
                      {listing.title}
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">
                      {listing.summary}
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href={detailHref}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-bold text-brand-dark transition hover:bg-brand-soft"
                      >
                        View showcase <ArrowRight size={17} />
                      </Link>
                      <a
                        href={toWhatsappUrl(listing.whatsapp, listing.title)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16a34a] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#12813c]"
                      >
                        <MessageCircle size={17} /> WhatsApp
                      </a>
                    </div>
                  </div>

                  <aside className="rounded-lg border border-white/15 bg-white/12 p-5 shadow-2xl backdrop-blur-xl">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Featured deal</p>
                    <p className="mt-4 text-4xl font-black">{formatMoney(listing.price, listing.currency)}</p>
                    <p className="mt-2 text-white/70">{listing.location}, {listing.district}</p>
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {listing.features.slice(0, 4).map((feature) => (
                        <span key={feature} className="rounded-md border border-white/10 bg-white/10 px-3 py-2 text-sm font-semibold">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <a
                      href={`tel:${listing.phone}`}
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-4 text-sm font-bold transition hover:bg-white hover:text-brand-dark"
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

      <div className="pointer-events-none absolute bottom-6 left-4 right-4 z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 sm:left-6 sm:right-6 lg:px-8">
        <div className="hero-pagination pointer-events-auto flex gap-2" />
        <div className="pointer-events-auto flex gap-2">
          <button type="button" className="hero-prev grid size-11 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur transition hover:bg-white hover:text-brand-dark" aria-label="Previous hero slide">
            <ChevronLeft size={20} />
          </button>
          <button type="button" className="hero-next grid size-11 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur transition hover:bg-white hover:text-brand-dark" aria-label="Next hero slide">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
