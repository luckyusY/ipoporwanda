"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
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
  const railRef = useRef<HTMLDivElement>(null);

  function move(direction: "left" | "right") {
    const rail = railRef.current;
    if (!rail) return;

    rail.scrollBy({
      left: direction === "left" ? -rail.clientWidth * 0.82 : rail.clientWidth * 0.82,
      behavior: "smooth",
    });
  }

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
              onClick={() => move("left")}
              className={dark ? "grid size-11 place-items-center rounded-full border border-white/20 hover:bg-white hover:text-brand-dark" : "grid size-11 place-items-center rounded-full border border-line bg-surface hover:border-brand"}
              aria-label="Previous listings"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={() => move("right")}
              className={dark ? "grid size-11 place-items-center rounded-full border border-white/20 hover:bg-white hover:text-brand-dark" : "grid size-11 place-items-center rounded-full border border-line bg-surface hover:border-brand"}
              aria-label="Next listings"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div ref={railRef} className="no-scrollbar flex snap-x gap-5 overflow-x-auto scroll-smooth pb-3">
          {listings.map((listing, index) => (
            <div key={listing.id} className="w-[86%] flex-none snap-start sm:w-[48%] lg:w-[31.5%]">
              <PropertyCard listing={listing} priority={index < 2} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
