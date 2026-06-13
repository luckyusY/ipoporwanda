"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function CardImageCarousel({
  images,
  alt,
  priority = false,
}: {
  images: string[];
  alt: string;
  priority?: boolean;
}) {
  const navigationClass = `card-nav-${alt.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`;

  return (
    <div className="absolute inset-0">
      <Swiper
        modules={[Navigation, Pagination]}
        loop={images.length > 1}
        pagination={{ clickable: true, dynamicBullets: true }}
        navigation={{
          prevEl: `.${navigationClass}-prev`,
          nextEl: `.${navigationClass}-next`,
        }}
        className="h-full w-full property-card-swiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={image}>
            <Image
              src={image}
              alt={alt}
              fill
              priority={priority && index === 0}
              sizes="(min-width: 1280px) 28vw, (min-width: 768px) 42vw, 88vw"
              className="object-cover transition duration-700 group-hover:scale-105"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            className={`${navigationClass}-prev absolute left-3 top-1/2 z-20 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/88 text-brand-dark opacity-0 shadow-lg backdrop-blur transition hover:bg-white group-hover:opacity-100`}
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            className={`${navigationClass}-next absolute right-3 top-1/2 z-20 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white/88 text-brand-dark opacity-0 shadow-lg backdrop-blur transition hover:bg-white group-hover:opacity-100`}
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
        </>
      ) : null}
    </div>
  );
}
