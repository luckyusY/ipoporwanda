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
    <section className={dark ? "bg-brand-dark py-20 text-white" : "py-20"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between gap-5">
          <div>
            <p className={`text-xs font-black uppercase tracking-[0.22em] ${dark ? "text-gold" : "text-brand"}`}>
              {eyebrow}
            </p>
            <h2 className="mt-2.5 text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={viewAllHref}
              className={`hidden text-sm font-bold transition sm:block ${
                dark ? "text-white/60 hover:text-white" : "text-muted hover:text-brand"
              }`}
            >
              View all →
            </Link>
            <div className="flex gap-2">
              <button
                type="button"
                className={`${sliderKey}-prev grid size-10 place-items-center rounded-full border transition ${
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
                className={`${sliderKey}-next grid size-10 place-items-center rounded-full border transition ${
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

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: `.${sliderKey}-prev`,
            nextEl: `.${sliderKey}-next`,
          }}
          spaceBetween={20}
          slidesPerView={1.08}
          breakpoints={{
            640: { slidesPerView: 2.05 },
            1024: { slidesPerView: 3.05 },
          }}
          className="listing-swiper !overflow-visible"
        >
          {listings.map((listing, index) => (
            <SwiperSlide key={listing.id} className="h-auto">
              <PropertyCard listing={listing} priority={index < 2} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
