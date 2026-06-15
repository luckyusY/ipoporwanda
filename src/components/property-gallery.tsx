"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Images } from "@phosphor-icons/react/dist/ssr/Images";
import { X } from "@phosphor-icons/react/dist/ssr/X";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr/CaretLeft";
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight";
import "swiper/css";
import "swiper/css/pagination";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [modal, setModal] = useState<number | null>(null);
  const lightboxSwiper = useRef<SwiperType | null>(null);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = modal !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  // Keyboard nav
  useEffect(() => {
    if (modal === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModal(null);
      if (e.key === "ArrowRight") lightboxSwiper.current?.slideNext();
      if (e.key === "ArrowLeft") lightboxSwiper.current?.slidePrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  const main = images[0];
  const sides = images.slice(1, 3);

  return (
    <>
      {/* ── Desktop mosaic ─────────────────────────────── */}
      <div
        className="relative hidden overflow-hidden rounded-2xl sm:block"
        style={{ height: 520 }}
      >
        <div
          className={`h-full ${sides.length > 0 ? "grid grid-cols-[1.6fr_1fr] gap-[3px]" : ""}`}
        >
          {/* Main image */}
          <button
            type="button"
            onClick={() => setModal(0)}
            className="group relative h-full w-full overflow-hidden"
          >
            <Image
              src={main}
              alt={title}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 65vw"
              className="object-cover transition duration-700 group-hover:scale-[1.05]"
            />
          </button>

          {/* Side images — grid-rows-2 + h-full so each cell has a real height */}
          {sides.length > 0 && (
            <div className="grid h-full grid-rows-2 gap-[3px]">
              {sides.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setModal(i + 1)}
                  className="group relative h-full w-full overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`${title} — photo ${i + 2}`}
                    fill
                    sizes="25vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/8" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View all button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={() => setModal(0)}
            className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-4 py-2.5 text-[11px] font-bold text-foreground shadow-lg backdrop-blur-sm transition hover:bg-white hover:shadow-xl"
          >
            <Images size={13} weight="fill" />
            View all {images.length} photos
          </button>
        )}
      </div>

      {/* ── Mobile carousel ────────────────────────────── */}
      <div className="relative sm:hidden">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          loop={images.length > 1}
          className="gallery-mobile-swiper aspect-[4/3] overflow-hidden rounded-2xl"
        >
          {images.map((img, i) => (
            <SwiperSlide key={img} style={{ position: "relative" }}>
              <button
                type="button"
                onClick={() => setModal(i)}
                className="block h-full w-full"
              >
                <Image
                  src={img}
                  alt={`${title} — photo ${i + 1}`}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
        <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          {images.length} photos
        </span>
      </div>

      {/* ── Lightbox ───────────────────────────────────── */}
      {modal !== null && (
        <div className="fixed inset-0 z-[200] bg-black">

          {/* Backdrop click-to-close */}
          <div
            className="absolute inset-0"
            onClick={() => setModal(null)}
            aria-label="Close lightbox"
          />

          {/* Top bar */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent px-5 py-4">
            <span className="pointer-events-auto rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
              {modal + 1} / {images.length}
            </span>
            <button
              type="button"
              onClick={() => setModal(null)}
              className="pointer-events-auto grid size-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25"
              aria-label="Close"
            >
              <X size={18} weight="bold" />
            </button>
          </div>

          {/* Caption bar */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/60 to-transparent px-5 py-6">
            <p className="text-sm font-semibold text-white/80 line-clamp-1">
              {title}
            </p>
          </div>

          {/* Swiper — direct child of fixed container so h-full = 100vh */}
          <Swiper
            onSwiper={(s) => { lightboxSwiper.current = s; }}
            initialSlide={modal}
            onSlideChange={(s) => setModal(s.activeIndex)}
            loop={false}
            speed={320}
            className="h-full w-full"
          >
            {images.map((img, i) => (
              <SwiperSlide key={img}>
                {/* Wrap in relative+h-full div so next/image fill has an anchor */}
                <div className="relative h-full w-full">
                  <Image
                    src={img}
                    alt={`${title} — photo ${i + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Nav — prev */}
          {modal > 0 && (
            <button
              type="button"
              onClick={() => lightboxSwiper.current?.slidePrev()}
              className="absolute left-4 top-1/2 z-20 -translate-y-1/2 grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 hover:scale-105"
              aria-label="Previous photo"
            >
              <CaretLeft size={20} weight="bold" />
            </button>
          )}
          {/* Nav — next */}
          {modal < images.length - 1 && (
            <button
              type="button"
              onClick={() => lightboxSwiper.current?.slideNext()}
              className="absolute right-4 top-1/2 z-20 -translate-y-1/2 grid size-11 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 hover:scale-105"
              aria-label="Next photo"
            >
              <CaretRight size={20} weight="bold" />
            </button>
          )}

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div className="pointer-events-none absolute inset-x-0 bottom-14 z-20 flex justify-center gap-1.5 px-4">
              {images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => { lightboxSwiper.current?.slideTo(i); setModal(i); }}
                  className={`pointer-events-auto relative size-12 shrink-0 overflow-hidden rounded-md transition ${
                    i === modal
                      ? "ring-2 ring-white ring-offset-1 ring-offset-black"
                      : "opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
