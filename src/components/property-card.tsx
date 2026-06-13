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
    <article className="group overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-2xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-soft">
        <CardImageCarousel images={listing.images} alt={listing.title} priority={priority} />
        <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-black uppercase tracking-wide text-brand-dark shadow-sm">
            For {listing.purpose}
          </span>
          {listing.featured ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-black uppercase tracking-wide text-white shadow-sm">
              <ShieldCheck size={13} /> Verified
            </span>
          ) : null}
        </div>
        <Link
          href={href}
          className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-2 rounded-full bg-brand-dark/90 px-3 py-2 text-xs font-bold text-white opacity-0 shadow-lg backdrop-blur transition hover:bg-brand group-hover:opacity-100"
        >
          <Eye size={14} /> View
        </Link>
      </div>

      <div className="space-y-4 p-4">
        <div>
          <p className="inline-flex items-center gap-1 text-sm font-semibold text-muted">
            <MapPin size={15} className="text-brand" />
            {listing.location}, {listing.district}
          </p>
          <h3 className="mt-1 line-clamp-2 min-h-14 text-xl font-semibold tracking-tight">
            <Link href={href} className="hover:text-brand">
              {listing.title}
            </Link>
          </h3>
          <p className="mt-2 text-2xl font-bold text-brand-dark">
            {formatMoney(listing.price, listing.currency)}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-muted">
          {listing.group === "cars" ? <span className="inline-flex items-center gap-1"><Car size={16} />Premium car</span> : null}
          {listing.bedrooms ? <span className="inline-flex items-center gap-1"><BedDouble size={16} />{listing.bedrooms} beds</span> : null}
          {listing.bathrooms ? <span className="inline-flex items-center gap-1"><Bath size={16} />{listing.bathrooms} baths</span> : null}
          {listing.areaSqm ? <span className="inline-flex items-center gap-1"><Ruler size={16} />{listing.areaSqm} sqm</span> : null}
        </div>

        <div className="flex flex-wrap gap-2">
          {listing.features.slice(0, 3).map((feature) => (
            <span key={feature} className="rounded-full bg-surface-soft px-3 py-1 text-xs font-bold text-brand-dark">
              {feature}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <a
            href={toWhatsappUrl(listing.whatsapp, listing.title)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16a34a] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#12813c]"
          >
            <MessageCircle size={17} aria-hidden />
            WhatsApp
          </a>
          <a
            href={`tel:${listing.phone}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-4 py-3 text-sm font-bold text-brand-dark transition hover:border-brand"
          >
            <Phone size={17} aria-hidden />
            Call
          </a>
        </div>
      </div>
    </article>
  );
}
