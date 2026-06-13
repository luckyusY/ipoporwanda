import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, MessageCircle, Phone, Ruler } from "lucide-react";
import { formatMoney, toWhatsappUrl } from "@/lib/format";
import type { PropertyListing } from "@/lib/types";

export function PropertyCard({ listing, priority = false }: { listing: PropertyListing; priority?: boolean }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-line bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/properties/${listing.slug}`} className="block" aria-label={listing.title}>
        <div className="relative aspect-[4/3] overflow-hidden bg-surface-soft">
          <Image
            src={listing.images[0]}
            alt={listing.title}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-dark">
              For {listing.purpose}
            </span>
            {listing.featured ? (
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Verified
              </span>
            ) : null}
          </div>
        </div>
      </Link>

      <div className="space-y-4 p-4">
        <div>
          <p className="text-sm font-medium text-muted">{listing.location}, {listing.district}</p>
          <h3 className="mt-1 line-clamp-2 min-h-14 text-xl font-semibold tracking-tight">
            <Link href={`/properties/${listing.slug}`} className="hover:text-brand">
              {listing.title}
            </Link>
          </h3>
          <p className="mt-2 text-2xl font-bold text-brand-dark">
            {formatMoney(listing.price, listing.currency)}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-muted">
          {listing.bedrooms ? <span className="inline-flex items-center gap-1"><BedDouble size={16} />{listing.bedrooms} beds</span> : null}
          {listing.bathrooms ? <span className="inline-flex items-center gap-1"><Bath size={16} />{listing.bathrooms} baths</span> : null}
          {listing.areaSqm ? <span className="inline-flex items-center gap-1"><Ruler size={16} />{listing.areaSqm} sqm</span> : null}
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
