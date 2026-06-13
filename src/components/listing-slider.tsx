"use client";

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
}: {
  title: string;
  eyebrow: string;
  listings: PropertyListing[];
  dark?: boolean;
}) {
  const sliderKey = title.replace(/[^a-z0-9]/gi, "-").toLowerCase();

  if (!listings.length) return null;

  return (
    <section className={dark ? "bg-brand-dark py-20 text-white" : "py-20"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <p className={dark ? "text-sm font-bold uppercase tracking-[0.22em] text-gold" : "text-sm font-bold uppercase tracking-[0.22em] text-brand"}>
              {eyebrow}
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">{title}</h2>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className={`${sliderKey}-prev grid size-11 place-items-center rounded-full border transition ${
                dark ? "border-white/20 hover:bg-white hover:text-brand-dark" : "border-line bg-surface hover:border-brand"
              }`}
              aria-label={`Previous ${title}`}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className={`${sliderKey}-next grid size-11 place-items-center rounded-full border transition ${
                dark ? "border-white/20 hover:bg-white hover:text-brand-dark" : "border-line bg-surface hover:border-brand"
              }`}
              aria-label={`Next ${title}`}
            >
              <ChevronRight size={20} />
            </button>
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
