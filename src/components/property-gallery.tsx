"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Images } from "@phosphor-icons/react/dist/ssr/Images";
import { X } from "@phosphor-icons/react/dist/ssr/X";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr/CaretLeft";
import { CaretRight } from "@phosphor-icons/react/dist/ssr/CaretRight";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [modal, setModal] = useState<number | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modal !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modal]);

  const main = images[0];
  const sides = images.slice(1, 3);
  const showSides = sides.length > 0;

  return (
    <>
      {/* ── Desktop mosaic ─────────────────────────────── */}
      <div className="relative hidden overflow-hidden rounded-2xl sm:block" style={{ height: "520px" }}>
        <div className={`h-full ${showSides ? "grid grid-cols-[1.6fr_1fr] gap-[3px]" : ""}`}>
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
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
          </button>

          {showSides && (
            <div className="grid gap-[3px]">
              {sides.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setModal(i + 1)}
                  className="group relative overflow-hidden"
                >
                  <Image
                    src={img}
                    alt={`${title} — photo ${i + 2}`}
                    fill
                    sizes="25vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  {/* dim overlay so hover scale feels intentional */}
                  <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/10" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* View all photos */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={() => setModal(0)}
            className="absolute bottom-4 right-4 z-10 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-[11px] font-bold text-foreground shadow-lg backdrop-blur-sm transition hover:bg-white"
          >
            <Images size={14} weight="fill" />
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

      {/* ── Fullscreen lightbox ─────────────────────────── */}
      {modal !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/96"
          onClick={() => setModal(null)}
        >
          <div
            className="relative flex h-full w-full max-w-6xl flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header bar */}
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-4">
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                {modal + 1} / {images.length}
              </span>
              <button
                type="button"
                onClick={() => setModal(null)}
                className="grid size-10 place-items-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            <Swiper
              modules={[Navigation]}
              initialSlide={modal}
              navigation={{ prevEl: ".modal-prev", nextEl: ".modal-next" }}
              onSlideChange={(s) => setModal(s.activeIndex)}
              loop={false}
              className="h-full w-full"
            >
              {images.map((img, i) => (
                <SwiperSlide key={img} style={{ position: "relative" }}>
                  <Image
                    src={img}
                    alt={`${title} — photo ${i + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              type="button"
              className="modal-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 grid size-11 place-items-center rounded-full bg-white/12 text-white backdrop-blur-sm transition hover:bg-white/25"
              aria-label="Previous photo"
            >
              <CaretLeft size={22} weight="bold" />
            </button>
            <button
              type="button"
              className="modal-next absolute right-4 top-1/2 z-10 -translate-y-1/2 grid size-11 place-items-center rounded-full bg-white/12 text-white backdrop-blur-sm transition hover:bg-white/25"
              aria-label="Next photo"
            >
              <CaretRight size={22} weight="bold" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
