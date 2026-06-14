"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { PropertyListing } from "@/lib/types";

export function HeroSlider({ listings }: { listings: PropertyListing[] }) {
  const slides = listings.slice(0, 6);
  if (!slides.length) return null;

  return (
    <section className="hero-section relative isolate overflow-hidden text-white">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        loop={slides.length > 1}
        speed={900}
        autoplay={{ delay: 5200, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".hero-pagination" }}
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
        className="hero-section absolute inset-0 w-full"
      >
        {slides.map((listing, index) => (
          <SwiperSlide key={listing.id}>
            <div className="hero-section relative flex flex-col items-center justify-center text-center">
              <Image
                src={listing.images[0]}
                alt={listing.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
              {/* Light overlay — image stays clearly visible */}
              <div className="absolute inset-0 bg-black/38" />

              {/* Centred content */}
              <div className="relative z-10 px-6 sm:px-10">
                <h1 className="hero-title max-w-4xl font-black tracking-tight text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)]">
                  {listing.title}
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/88 drop-shadow sm:text-base">
                  {listing.summary}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/properties"
                    className="inline-flex min-h-[52px] items-center gap-2.5 rounded-sm bg-white px-7 text-sm font-bold text-brand-dark shadow transition hover:bg-brand-soft"
                  >
                    <Search size={16} strokeWidth={2.5} />
                    Browse Properties
                  </Link>
                  <Link
                    href="#contact"
                    className="inline-flex min-h-[52px] items-center gap-2 rounded-sm bg-brand-dark px-7 text-sm font-bold text-white shadow transition hover:bg-black"
                  >
                    Contact Us <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>

              {/* Explore / scroll-down indicator */}
              <div className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5">
                <span className="text-[10px] font-black uppercase tracking-[0.24em] text-white/75">
                  Explore Properties
                </span>
                <a
                  href="#listings"
                  aria-label="Scroll down to listings"
                  className="grid size-9 place-items-center rounded-full border border-white/30 bg-white/14 backdrop-blur-sm transition hover:bg-white hover:text-brand-dark"
                >
                  <ChevronDown size={18} />
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Side navigation arrows — centred vertically */}
      <button
        type="button"
        className="hero-prev absolute left-4 top-1/2 z-20 -translate-y-1/2 grid size-11 place-items-center rounded-full border border-white/30 bg-white/15 backdrop-blur-sm transition hover:bg-white hover:text-brand-dark"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        className="hero-next absolute right-4 top-1/2 z-20 -translate-y-1/2 grid size-11 place-items-center rounded-full border border-white/30 bg-white/15 backdrop-blur-sm transition hover:bg-white hover:text-brand-dark"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Pagination dots — bottom centre */}
      <div className="hero-pagination pointer-events-auto absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex gap-2" />
    </section>
  );
}
