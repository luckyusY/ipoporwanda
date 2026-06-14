"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const total = images.length;

  const go = (step: 1 | -1, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDir(step);
    setIdx((p) => (p + step + total) % total);
  };

  const goTo = (i: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDir(i > idx ? 1 : -1);
    setIdx(i);
  };

  if (total === 1) {
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
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.div
          key={idx}
          custom={dir}
          variants={{
            enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%" }),
            center: { x: 0 },
            exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%" }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.28, ease: [0.32, 0, 0.67, 0] }}
          className="absolute inset-0"
        >
          <Image
            src={images[idx]}
            alt={`${title} — photo ${idx + 1}`}
            fill
            sizes={SIZES}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Prev */}
      <button
        type="button"
        onClick={(e) => go(-1, e)}
        aria-label="Previous photo"
        className="absolute left-2 top-1/2 z-30 -translate-y-1/2 grid size-8 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/65 md:opacity-0 md:group-hover:opacity-100"
      >
        <ChevronLeft size={15} strokeWidth={2.5} />
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={(e) => go(1, e)}
        aria-label="Next photo"
        className="absolute right-2 top-1/2 z-30 -translate-y-1/2 grid size-8 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/65 md:opacity-0 md:group-hover:opacity-100"
      >
        <ChevronRight size={15} strokeWidth={2.5} />
      </button>

      {/* Dot strip */}
      <div className="absolute bottom-12 left-1/2 z-30 flex -translate-x-1/2 gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => goTo(i, e)}
            aria-label={`Photo ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-200 ${
              i === idx ? "w-5 bg-white" : "w-1.5 bg-white/55 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </>
  );
}
