"use client";

import { MessageCircle } from "lucide-react";

const PHONE = "250788334207";
const MESSAGE = encodeURIComponent("Hello Ipopo Rwanda, I need help with a listing.");

export function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-sm font-black text-white shadow-lg shadow-black/25 transition-all duration-200 hover:scale-105 hover:bg-[#1ebe5d] hover:shadow-xl sm:py-3.5"
    >
      <MessageCircle size={20} strokeWidth={2.5} aria-hidden />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
