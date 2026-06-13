import Link from "next/link";
import {
  Bath,
  BedDouble,
  Car,
  Eye,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  ShieldCheck,
} from "lucide-react";
import { CardImageCarousel } from "@/components/card-image-carousel";
import { formatMoney, toWhatsappUrl } from "@/lib/format";
import type { PropertyListing } from "@/lib/types";

export function PropertyCard({ listing, priority = false }: { listing: PropertyListing; priority?: boolean }) {
  const href = listing.group === "properties" ? `/properties/${listing.slug}` : "#contact";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-soft">
        <CardImageCarousel images={listing.images} alt={listing.title} priority={priority} />

        {/* Bottom image gradient for smooth transition */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />

        <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-brand-dark shadow-sm">
            For {listing.purpose}
          </span>
          {listing.featured ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
              <ShieldCheck size={11} strokeWidth={2.5} /> Verified
            </span>
          ) : null}
        </div>

        {/* Price badge pinned to bottom of image */}
        <div className="absolute bottom-3 left-3 z-20">
          <p className="text-lg font-black text-white drop-shadow-md">
            {formatMoney(listing.price, listing.currency)}
          </p>
        </div>

        <Link
          href={href}
          className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-brand-dark opacity-0 shadow-lg transition group-hover:opacity-100"
        >
          <Eye size={13} /> View
        </Link>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
            <MapPin size={13} className="text-brand" strokeWidth={2.5} />
            {listing.location}, {listing.district}
          </p>
          <h3 className="mt-1 line-clamp-2 min-h-[3rem] text-[17px] font-bold tracking-tight leading-snug">
            <Link href={href} className="hover:text-brand transition-colors">
              {listing.title}
            </Link>
          </h3>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-muted">
          {listing.group === "cars" ? (
            <span className="inline-flex items-center gap-1.5"><Car size={14} />Premium car</span>
          ) : null}
          {listing.bedrooms ? (
            <span className="inline-flex items-center gap-1.5"><BedDouble size={14} />{listing.bedrooms} beds</span>
          ) : null}
          {listing.bathrooms ? (
            <span className="inline-flex items-center gap-1.5"><Bath size={14} />{listing.bathrooms} baths</span>
          ) : null}
          {listing.areaSqm ? (
            <span className="inline-flex items-center gap-1.5"><Ruler size={14} />{listing.areaSqm} m²</span>
          ) : null}
        </div>

        {listing.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {listing.features.slice(0, 3).map((feature) => (
              <span key={feature} className="rounded-full border border-brand/15 bg-brand-soft px-2.5 py-0.5 text-[11px] font-bold text-brand-dark">
                {feature}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto grid grid-cols-2 gap-2 pt-1">
          <a
            href={toWhatsappUrl(listing.whatsapp, listing.title)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#16a34a] px-3 py-2.5 text-xs font-bold text-white transition hover:bg-[#15803d]"
          >
            <MessageCircle size={14} strokeWidth={2.5} aria-hidden />
            WhatsApp
          </a>
          <a
            href={`tel:${listing.phone}`}
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-brand/25 bg-brand-soft px-3 py-2.5 text-xs font-bold text-brand-dark transition hover:border-brand hover:bg-brand hover:text-white"
          >
            <Phone size={14} strokeWidth={2.5} aria-hidden />
            Call
          </a>
        </div>
      </div>
    </article>
  );
}
