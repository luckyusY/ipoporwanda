"use client";

import { Children, useRef, type ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperRef } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";

export function SwiperSection({
  children,
  initialView = 1.15,
  sm,
  lg,
  gap = 20,
  nav = true,
  dark = false,
  className,
}: {
  children: ReactNode;
  initialView?: number;
  sm?: number;
  lg?: number;
  gap?: number;
  nav?: boolean;
  dark?: boolean;
  className?: string;
}) {
  const ref = useRef<SwiperRef>(null);
  const items = Children.toArray(children);

  const breakpoints: Record<number, { slidesPerView: number }> = {};
  if (sm !== undefined) breakpoints[640] = { slidesPerView: sm };
  if (lg !== undefined) breakpoints[1024] = { slidesPerView: lg };

  const btnBase =
    "grid size-10 place-items-center rounded-full border shadow-sm transition";
  const btnColor = dark
    ? "border-white/25 bg-white/10 text-white hover:bg-white hover:text-brand-dark"
    : "border-line bg-surface text-foreground hover:border-brand hover:bg-brand hover:text-white";

  return (
    <div className={`relative ${className ?? ""}`}>
      <Swiper
        ref={ref}
        modules={[]}
        slidesPerView={initialView}
        spaceBetween={gap}
        breakpoints={breakpoints}
        className="w-full"
      >
        {items.map((child, i) => (
          <SwiperSlide key={i} className="h-auto">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>

      {nav && (
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => ref.current?.swiper.slidePrev()}
            aria-label="Previous"
            className={`${btnBase} ${btnColor}`}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => ref.current?.swiper.slideNext()}
            aria-label="Next"
            className={`${btnBase} ${btnColor}`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
