"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export function CardImageCarousel({
  images,
  alt,
  priority = false,
}: {
  images: string[];
  alt: string;
  priority?: boolean;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % images.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <>
      {images.map((image, index) => (
        <Image
          key={image}
          src={image}
          alt={alt}
          fill
          priority={priority && index === 0}
          sizes="(min-width: 1280px) 28vw, (min-width: 768px) 42vw, 88vw"
          className={`object-cover transition duration-700 group-hover:scale-105 ${
            active === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {images.length > 1 ? (
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Show image ${index + 1}`}
              onClick={(event) => {
                event.preventDefault();
                setActive(index);
              }}
              className={`size-1.5 rounded-full transition ${
                active === index ? "w-5 bg-white" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
