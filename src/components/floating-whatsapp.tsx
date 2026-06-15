"use client";

import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";

const PHONE = "250788334207";
const MESSAGE = encodeURIComponent("Hello Ipopo Rwanda, I need help with a listing.");

export function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-float group fixed bottom-20 right-5 z-50 inline-flex min-h-14 min-w-14 items-center justify-center gap-2 rounded-full bg-[#25D366] px-0 text-sm font-black text-white shadow-2xl shadow-[#25D366]/30 ring-1 ring-white/30 transition hover:bg-[#1ebe5d] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 sm:bottom-6 sm:right-6 sm:px-4 sm:py-3.5"
    >
      <span className="whatsapp-pulse absolute inset-0 -z-10 rounded-full bg-[#25D366]" aria-hidden />
      <WhatsappLogo size={27} weight="fill" aria-hidden />
      <span className="hidden pr-1 sm:inline">WhatsApp</span>
    </a>
  );
}
