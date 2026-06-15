import Link from "next/link";
import {
  Bath,
  BedDouble,
  Car,
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
  const isRent = listing.purpose === "rent";
  const isCar = listing.group === "cars";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">

      {/* ── Image ─────────────────────────── */}
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-soft">
        <CardImageSlider
          images={listing.images}
          title={listing.title}
          priority={priority}
        />

        {/* Purpose badge — top left */}
        <span
          className={`absolute left-3 top-3 z-20 rounded-md px-2.5 py-1 text-[10px] font-black uppercase tracking-wider shadow-sm ${
            isRent ? "bg-brand text-white" : "bg-gold text-foreground"
          }`}
        >
          {isRent ? "For Rent" : "For Sale"}
        </span>

        {/* Verified — top right */}
        {listing.featured && (
          <span className="absolute right-3 top-3 z-20 inline-flex items-center gap-1 rounded-md bg-white/95 px-2.5 py-1 text-[10px] font-black text-foreground shadow-sm">
            <ShieldCheck size={11} strokeWidth={2.5} className="text-brand" />
            Verified
          </span>
        )}

        {/* Price strip — bottom of image */}
        <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between bg-brand-dark px-3.5 py-2.5">
          <p className="text-sm font-black text-white">
            {formatMoney(listing.price, listing.currency)}
            {isRent && (
              <span className="ml-1.5 text-[11px] font-bold text-white/55">
                {isCar ? "/day" : "/mo"}
              </span>
            )}
          </p>
          <Link
            href={href}
            className="rounded-full bg-white/12 px-2.5 py-1 text-[10px] font-bold text-white/70 transition hover:bg-white/20 hover:text-white"
          >
            View →
          </Link>
        </div>
      </div>

      {/* ── Card body ─────────────────────── */}
      <div className="flex flex-1 flex-col gap-3 p-4">

        {/* Location */}
        <p className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted">
          <MapPin size={12} className="text-brand" strokeWidth={2.5} />
          {listing.location}, {listing.district}
        </p>

        {/* Title */}
        <h3 className="-mt-1 line-clamp-2 min-h-[2.75rem] text-base font-bold leading-snug tracking-tight">
          <Link href={href} className="transition-colors hover:text-brand">
            {listing.title}
          </Link>
        </h3>

        {/* Stats */}
        <div className="flex items-center text-xs font-semibold text-muted">
          {isCar && !listing.bedrooms ? (
            <span className="inline-flex items-center gap-1.5">
              <Car size={13} />
              Premium vehicle
            </span>
          ) : (
            <>
              {listing.bedrooms && (
                <>
                  <span className="inline-flex items-center gap-1.5">
                    <BedDouble size={13} />
                    {listing.bedrooms} bed
                  </span>
                  {(listing.bathrooms || listing.areaSqm) && (
                    <span className="mx-2.5 text-line">·</span>
                  )}
                </>
              )}
              {listing.bathrooms && (
                <>
                  <span className="inline-flex items-center gap-1.5">
                    <Bath size={13} />
                    {listing.bathrooms} bath
                  </span>
                  {listing.areaSqm && <span className="mx-2.5 text-line">·</span>}
                </>
              )}
              {listing.areaSqm && (
                <span className="inline-flex items-center gap-1.5">
                  <Ruler size={13} />
                  {listing.areaSqm} m²
                </span>
              )}
            </>
          )}
        </div>

        {/* Feature chips */}
        {listing.features.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {listing.features.slice(0, 2).map((feature) => (
              <span
                key={feature}
                className="rounded-full bg-surface-soft px-2.5 py-0.5 text-[11px] font-semibold text-foreground"
              >
                {feature}
              </span>
            ))}
            {listing.features.length > 2 && (
              <span className="rounded-full bg-surface-soft px-2.5 py-0.5 text-[11px] font-semibold text-muted">
                +{listing.features.length - 2}
              </span>
            )}
          </div>
        )}

        {/* CTA buttons */}
        <div className="mt-auto flex gap-2 pt-1">
          <a
            href={toWhatsappUrl(listing.whatsapp, listing.title)}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-full bg-[#16a34a] px-3 text-xs font-bold text-white transition hover:bg-[#15803d]"
          >
            <MessageCircle size={14} strokeWidth={2.5} aria-hidden />
            WhatsApp
          </a>
          <a
            href={`tel:${listing.phone}`}
            className="flex min-h-[44px] w-[40%] items-center justify-center gap-1.5 rounded-full border border-line text-xs font-bold text-foreground transition hover:border-brand hover:text-brand"
          >
            <Phone size={14} strokeWidth={2.5} aria-hidden />
            Call
          </a>
        </div>
      </div>
    </article>
  );
}
