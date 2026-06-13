"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PropertyCard } from "@/components/property-card";
import type { PropertyListing } from "@/lib/types";

export function ListingSlider({
  title,
  eyebrow,
  listings,
  dark = false,
  viewAllHref = "/properties",
}: {
  title: string;
  eyebrow: string;
  listings: PropertyListing[];
  dark?: boolean;
  viewAllHref?: string;
}) {
  const sliderKey = title.replace(/[^a-z0-9]/gi, "-").toLowerCase();

  if (!listings.length) return null;

  return (
    <section className={dark ? "bg-brand-dark py-12 text-white sm:py-20" : "py-12 sm:py-20"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-8 flex items-start justify-between gap-4 sm:items-end">
          <div className="min-w-0">
            <p
              className={`text-xs font-black uppercase tracking-[0.22em] ${
                dark ? "text-gold" : "text-brand"
              }`}
            >
              {eyebrow}
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
              {title}
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {/* "View all" — desktop only; mobile gets it below the slider */}
            <Link
              href={viewAllHref}
              className={`hidden text-sm font-bold transition sm:block ${
                dark
                  ? "text-white/60 hover:text-white"
                  : "text-muted hover:text-brand"
              }`}
            >
              View all →
            </Link>

            {/*
             * Prev / Next — hidden on mobile because swipe is the UX there.
             * min-w/h 44px for accessible touch targets on tablet+.
             */}
            <div className="hidden gap-2 sm:flex">
              <button
                type="button"
                className={`${sliderKey}-prev grid size-11 place-items-center rounded-full border transition ${
                  dark
                    ? "border-white/20 text-white/70 hover:bg-white hover:text-brand-dark"
                    : "border-line bg-surface text-muted hover:border-brand hover:text-brand"
                }`}
                aria-label={`Previous ${title}`}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className={`${sliderKey}-next grid size-11 place-items-center rounded-full border transition ${
                  dark
                    ? "border-white/20 text-white/70 hover:bg-white hover:text-brand-dark"
                    : "border-line bg-surface text-muted hover:border-brand hover:text-brand"
                }`}
                aria-label={`Next ${title}`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: `.${sliderKey}-prev`,
            nextEl: `.${sliderKey}-next`,
          }}
          spaceBetween={16}
          slidesPerView={1.1}
          breakpoints={{
            480: { slidesPerView: 1.5, spaceBetween: 18 },
            640: { slidesPerView: 2.1, spaceBetween: 20 },
            1024: { slidesPerView: 3.05, spaceBetween: 20 },
          }}
          className="listing-swiper !overflow-visible"
        >
          {listings.map((listing, index) => (
            <SwiperSlide key={listing.id} className="h-auto">
              <PropertyCard listing={listing} priority={index < 2} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Mobile "View all" — shown below the slider on small screens */}
        <div className="mt-6 flex justify-center sm:hidden">
          <Link
            href={viewAllHref}
            className={`inline-flex min-h-[48px] items-center gap-2 rounded-full border px-6 text-sm font-bold transition ${
              dark
                ? "border-white/25 text-white hover:bg-white hover:text-brand-dark"
                : "border-brand/25 bg-brand-soft text-brand hover:bg-brand hover:text-white"
            }`}
          >
            View all listings →
          </Link>
        </div>
      </div>
    </section>
  );
}
