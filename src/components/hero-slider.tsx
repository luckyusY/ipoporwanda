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
        speed={720}
        autoplay={{ delay: 5600, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={{ clickable: true, el: ".hero-pagination" }}
        navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
        className="hero-section absolute inset-0 w-full"
      >
        {slides.map((listing, index) => (
          <SwiperSlide key={listing.id}>
            <div className="hero-section relative flex flex-col items-start justify-end px-4 pb-28 pt-24 text-left sm:px-6 md:items-center md:justify-center md:px-10 md:pb-0 md:text-center">
              <Image
                src={listing.images[0]}
                alt={listing.title}
                fill
                priority={index === 0}
                fetchPriority={index === 0 ? "high" : "auto"}
                sizes="100vw"
                className="hero-image object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/38 to-black/18 md:bg-black/38" />

              <div className="relative z-10 w-full max-w-4xl md:px-0">
                <div className="mb-3 inline-flex min-h-8 items-center rounded-full border border-white/20 bg-white/14 px-3 text-[10px] font-black uppercase tracking-[0.2em] text-gold backdrop-blur-sm md:hidden">
                  Verified Kigali listing
                </div>
                <h1 className="hero-title max-w-3xl font-black tracking-normal text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.55)] md:mx-auto md:max-w-4xl">
                  {listing.title}
                </h1>
                <p className="mt-3 line-clamp-2 max-w-xl text-sm leading-6 text-white/86 drop-shadow sm:text-base md:mx-auto md:mt-4 md:line-clamp-none md:leading-7">
                  {listing.summary}
                </p>
                <div className="mt-6 grid w-full grid-cols-1 gap-2.5 sm:max-w-md sm:grid-cols-2 md:mx-auto md:mt-8 md:flex md:max-w-none md:flex-wrap md:justify-center md:gap-3">
                  <Link
                    href="/properties"
                    className="press inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-sm bg-white px-7 text-sm font-bold text-brand-dark shadow transition hover:bg-brand-soft"
                  >
                    <Search size={16} strokeWidth={2.5} />
                    Browse Properties
                  </Link>
                  <Link
                    href="#contact"
                    className="press inline-flex min-h-[52px] items-center justify-center gap-2 rounded-sm bg-brand-dark px-7 text-sm font-bold text-white shadow transition hover:bg-black"
                  >
                    Contact Us <span aria-hidden>-&gt;</span>
                  </Link>
                </div>
              </div>

              <div className="absolute bottom-16 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2.5 md:flex">
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

      <button
        type="button"
        className="hero-prev absolute left-4 top-1/2 z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/15 backdrop-blur-sm transition hover:bg-white hover:text-brand-dark md:grid"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        className="hero-next absolute right-4 top-1/2 z-20 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/15 backdrop-blur-sm transition hover:bg-white hover:text-brand-dark md:grid"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      <div className="hero-pagination pointer-events-auto absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 md:bottom-6" />
    </section>
  );
}
