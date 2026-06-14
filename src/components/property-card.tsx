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
import { formatMoney, toWhatsappUrl } from "@/lib/format";
import type { PropertyListing } from "@/lib/types";
import { CardImageSlider } from "@/components/card-image-slider";

export function PropertyCard({
  listing,
  priority = false,
}: {
  listing: PropertyListing;
  priority?: boolean;
}) {
  const href =
    listing.group === "properties" ? `/properties/${listing.slug}` : "#contact";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-xl">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-soft">
        <CardImageSlider
          images={listing.images}
          title={listing.title}
          priority={priority}
        />

        {/* Bottom scrim so price text is always legible */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Badges — top left */}
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

        {/* Price — bottom left, always visible */}
        <p className="absolute bottom-3 left-3 z-20 text-[17px] font-black text-white drop-shadow">
          {formatMoney(listing.price, listing.currency)}
        </p>

        {/* View link */}
        <Link
          href={href}
          className="absolute bottom-3 right-3 z-20 inline-flex min-h-[36px] items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 text-xs font-bold text-brand-dark shadow-lg transition md:opacity-0 md:group-hover:opacity-100"
        >
          <Eye size={13} /> View
        </Link>
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
            <MapPin size={13} className="text-brand" strokeWidth={2.5} />
            {listing.location}, {listing.district}
          </p>
          <h3 className="mt-1 line-clamp-2 min-h-[3rem] text-[17px] font-bold leading-snug tracking-tight">
            <Link href={href} className="transition-colors hover:text-brand">
              {listing.title}
            </Link>
          </h3>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-muted">
          {listing.group === "cars" ? (
            <span className="inline-flex items-center gap-1.5">
              <Car size={14} />
              Premium car
            </span>
          ) : null}
          {listing.bedrooms ? (
            <span className="inline-flex items-center gap-1.5">
              <BedDouble size={14} />
              {listing.bedrooms} beds
            </span>
          ) : null}
          {listing.bathrooms ? (
            <span className="inline-flex items-center gap-1.5">
              <Bath size={14} />
              {listing.bathrooms} baths
            </span>
          ) : null}
          {listing.areaSqm ? (
            <span className="inline-flex items-center gap-1.5">
              <Ruler size={14} />
              {listing.areaSqm} m²
            </span>
          ) : null}
        </div>

        {/* Feature chips */}
        {listing.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {listing.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-brand/15 bg-brand-soft px-2.5 py-0.5 text-[11px] font-bold text-brand-dark"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* CTA buttons — min-h-[48px] for WCAG touch target compliance */}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-1">
          <a
            href={toWhatsappUrl(listing.whatsapp, listing.title)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-full bg-[#16a34a] px-3 text-xs font-bold text-white transition hover:bg-[#15803d]"
          >
            <MessageCircle size={14} strokeWidth={2.5} aria-hidden />
            WhatsApp
          </a>
          <a
            href={`tel:${listing.phone}`}
            className="inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-full border border-brand/25 bg-brand-soft px-3 text-xs font-bold text-brand-dark transition hover:border-brand hover:bg-brand hover:text-white"
          >
            <Phone size={14} strokeWidth={2.5} aria-hidden />
            Call
          </a>
        </div>
      </div>
    </article>
  );
}
