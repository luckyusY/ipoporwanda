"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BedDouble,
  Building2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { formatMoney, toWhatsappUrl } from "@/lib/format";
import type { PropertyListing } from "@/lib/types";

const quickLocations = ["Kigali", "Kacyiru", "Nyarutarama", "Kibagabaga"];

function formatCategory(category: PropertyListing["category"]) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function HeroSlider({ listings }: { listings: PropertyListing[] }) {
  const slides = listings.slice(0, 6);
  if (!slides.length) return null;

  return (
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
              <div className="hero-section relative flex flex-col justify-end pb-24 sm:justify-center sm:pb-0">
                <Image
                  src={listing.images[0]}
                  alt={listing.title}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/88 via-brand-dark/32 to-transparent sm:bg-[linear-gradient(90deg,rgba(0,63,37,0.9),rgba(0,63,37,0.45),rgba(0,63,37,0.08))]" />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-brand-dark to-transparent" />

                <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 sm:py-14 lg:grid-cols-[minmax(0,0.9fr)_420px] lg:items-end lg:px-8 lg:py-16">
                  <div className="max-w-3xl">
                    <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] backdrop-blur-md">
                      <ShieldCheck size={14} /> Verified Rwanda marketplace
                    </p>

                    <h1 className="hero-title max-w-2xl font-black tracking-tight text-balance">
                      Find your next place in Kigali.
                    </h1>

                    <form
                      action="/properties"
                      className="mt-6 flex flex-col overflow-hidden rounded-2xl border border-white/18 bg-white p-2 shadow-2xl shadow-brand-dark/25 sm:flex-row sm:items-center"
                    >
                      <label className="flex min-h-[52px] flex-1 items-center gap-3 px-4 text-brand-dark">
                        <Search size={20} className="text-brand" />
                        <span className="sr-only">Search listings</span>
                        <input
                          name="q"
                          placeholder="Search location, house, apartment..."
                          className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-muted sm:text-base"
                        />
                      </label>
                      <button
                        type="submit"
                        className="min-h-[52px] rounded-xl bg-brand px-6 text-sm font-black text-white transition hover:bg-brand-dark"
                      >
                        Search
                      </button>
                    </form>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {quickLocations.map((location) => (
                        <Link
                          key={location}
                          href={`/properties?q=${encodeURIComponent(location)}`}
                          className="rounded-full border border-white/18 bg-white/12 px-3 py-1.5 text-[11px] font-bold backdrop-blur-md transition hover:bg-white hover:text-brand-dark"
                        >
                          {location}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <aside className="rounded-2xl border border-white/16 bg-white/92 p-4 text-brand-dark shadow-2xl shadow-brand-dark/20 backdrop-blur-md sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-brand">
                          Featured now
                        </p>
                        <h2 className="mt-1 line-clamp-2 text-lg font-black leading-tight">
                          {listing.title}
                        </h2>
                      </div>
                      <p className="shrink-0 rounded-full bg-gold px-3 py-1 text-[11px] font-black uppercase text-white">
                        {listing.purpose}
                      </p>
                    </div>

                    <p className="mt-4 text-2xl font-black text-brand">
                      {formatMoney(listing.price, listing.currency)}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-muted">
                      <MapPin size={15} /> {listing.location}, {listing.district}
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-sm font-bold">
                      <span className="flex items-center gap-2 rounded-xl bg-brand-soft px-3 py-2">
                        <BedDouble size={16} className="text-brand" />
                        {listing.bedrooms ?? "Flexible"} beds
                      </span>
                      <span className="flex items-center gap-2 rounded-xl bg-brand-soft px-3 py-2">
                        <Building2 size={16} className="text-brand" />
                        {formatCategory(listing.category)}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Link
                        href={detailHref}
                        className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-brand px-4 text-sm font-black text-white transition hover:bg-brand-dark"
                      >
                        View <ArrowRight size={16} />
                      </Link>
                      <a
                        href={toWhatsappUrl(listing.whatsapp, listing.title)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-[#16a34a] px-4 text-sm font-black text-white transition hover:bg-[#12813c]"
                      >
                        <MessageCircle size={16} /> Chat
                      </a>
                    </div>
                  </aside>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 hidden px-4 sm:block">
                  <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-xs font-bold text-white/78 sm:px-6 lg:px-8">
                    <span>{listing.location}</span>
                    <span>
                      {listing.group === "cars" ? "Mobility" : "Property"} for {listing.purpose}
                    </span>
                    <span>{slides.length} featured slides</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="pointer-events-none absolute bottom-5 left-4 right-4 z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 sm:left-6 sm:right-6 lg:px-8">
        <div className="hero-pagination pointer-events-auto flex gap-2" />
        <div className="pointer-events-auto flex gap-2">
          <button
            type="button"
            className="hero-prev grid size-11 place-items-center rounded-full border border-white/25 bg-brand-dark/45 backdrop-blur transition hover:bg-white hover:text-brand-dark"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="hero-next grid size-11 place-items-center rounded-full border border-white/25 bg-brand-dark/45 backdrop-blur transition hover:bg-white hover:text-brand-dark"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
