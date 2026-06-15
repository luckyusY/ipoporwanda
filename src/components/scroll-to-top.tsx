"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-40 right-5 z-50 grid size-11 place-items-center rounded-sm bg-white text-brand-dark shadow-lg transition hover:bg-brand-soft sm:bottom-[5.25rem] sm:right-6"
    >
      <ChevronUp size={20} strokeWidth={2.5} />
    </button>
  );
}
