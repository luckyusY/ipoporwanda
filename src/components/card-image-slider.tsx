"use client";

import { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const SIZES = "(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw";

export function CardImageSlider({
  images,
  title,
  priority = false,
}: {
  images: string[];
  title: string;
  priority?: boolean;
}) {
  const ref = useRef<SwiperRef>(null);

  if (images.length === 1) {
    return (
      <Image
        src={images[0]}
        alt={title}
        fill
        priority={priority}
        sizes={SIZES}
        className="object-cover transition duration-500 group-hover:scale-[1.035]"
      />
    );
  }

  return (
    <>
      <Swiper
        ref={ref}
        modules={[Pagination]}
        loop
        pagination={{ clickable: true }}
        className="property-card-swiper h-full w-full"
      >
        {images.map((src, i) => (
          <SwiperSlide key={src}>
            <Image
              src={src}
              alt={`${title} — photo ${i + 1}`}
              fill
              sizes={SIZES}
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom prev/next — centred on image, show on mobile, hover-reveal on desktop */}
      <button
        type="button"
        onClick={() => ref.current?.swiper.slidePrev()}
        aria-label="Previous photo"
        className="absolute left-2 top-1/2 z-30 -translate-y-1/2 grid size-8 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/65 md:opacity-0 md:group-hover:opacity-100"
      >
        <ChevronLeft size={15} strokeWidth={2.5} />
      </button>
      <button
        type="button"
        onClick={() => ref.current?.swiper.slideNext()}
        aria-label="Next photo"
        className="absolute right-2 top-1/2 z-30 -translate-y-1/2 grid size-8 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/65 md:opacity-0 md:group-hover:opacity-100"
      >
        <ChevronRight size={15} strokeWidth={2.5} />
      </button>
    </>
  );
}
