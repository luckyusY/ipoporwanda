"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { useState } from "react";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [thumbs, setThumbs] = useState<SwiperType | null>(null);

  return (
    <div className="grid gap-4">
      <div className="relative overflow-hidden rounded-lg bg-surface-soft shadow-xl">
        <Swiper
          modules={[Navigation, Thumbs]}
          navigation={{ prevEl: ".gallery-prev", nextEl: ".gallery-next" }}
          thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
          loop={images.length > 1}
          className="aspect-[16/10] w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={image}>
              <Image
                src={image}
                alt={`${title} image ${index + 1}`}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 66vw, 100vw"
                className="object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {images.length > 1 ? (
          <div className="absolute bottom-4 right-4 z-20 flex gap-2">
            <button type="button" className="gallery-prev grid size-11 place-items-center rounded-full bg-white/90 text-brand-dark shadow-lg backdrop-blur hover:bg-white" aria-label="Previous image">
              <ChevronLeft size={20} />
            </button>
            <button type="button" className="gallery-next grid size-11 place-items-center rounded-full bg-white/90 text-brand-dark shadow-lg backdrop-blur hover:bg-white" aria-label="Next image">
              <ChevronRight size={20} />
            </button>
          </div>
        ) : null}
      </div>

      {images.length > 1 ? (
        <Swiper
          modules={[Thumbs]}
          onSwiper={setThumbs}
          watchSlidesProgress
          spaceBetween={12}
          slidesPerView={3.4}
          breakpoints={{
            640: { slidesPerView: 4.4 },
            1024: { slidesPerView: 5.4 },
          }}
          className="property-thumbs"
        >
          {images.map((image, index) => (
            <SwiperSlide key={image} className="cursor-pointer">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-line bg-surface-soft">
                <Image
                  src={image}
                  alt={`${title} thumbnail ${index + 1}`}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </div>
  );
}
