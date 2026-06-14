"use client";

import { ChevronRight } from "lucide-react";
import { Children, useEffect, useMemo, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { A11y, FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export function CardSwiper({
  children,
  rows = 1,
}: {
  children: React.ReactNode;
  rows?: number;
}) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  useEffect(() => {
    if (!swiper || swiper.destroyed) return;
    const el = swiper.el;
    const handler = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
      const lo = Math.min(swiper.minTranslate(), swiper.maxTranslate());
      const hi = Math.max(swiper.minTranslate(), swiper.maxTranslate());
      const next = Math.min(hi, Math.max(lo, swiper.translate - event.deltaX));
      if (next === swiper.translate) return;
      event.preventDefault();
      swiper.translateTo(next, 0);
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [swiper]);

  const slides = useMemo(() => {
    const items = Children.toArray(children);
    if (rows <= 1) return items.map((item) => [item]);
    const chunks: React.ReactNode[][] = [];
    for (let i = 0; i < items.length; i += rows) chunks.push(items.slice(i, i + rows));
    return chunks;
  }, [children, rows]);

  return (
    <div className="relative" onDragStartCapture={(event) => event.preventDefault()}>
      <span className="swipe-hint pointer-events-none absolute right-2 top-1 z-20 flex items-center gap-0.5 rounded-full bg-[#15110a]/90 py-0.5 pl-2 pr-1 text-[10px] font-black uppercase tracking-wide text-gold shadow-sm ring-1 ring-gold/40 sm:hidden">
        Swipe
        <ChevronRight aria-hidden size={12} />
      </span>
      <Swiper
        modules={[Navigation, FreeMode, A11y]}
        onSwiper={setSwiper}
        slidesPerView="auto"
        spaceBetween={12}
        freeMode={{ enabled: true, momentumBounce: false }}
        grabCursor
        navigation
        watchOverflow
        className="card-swiper"
      >
        {slides.map((group, index) => (
          <SwiperSlide key={index} className="!w-auto">
            {rows > 1 ? <div className="flex flex-col gap-3">{group}</div> : group}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
