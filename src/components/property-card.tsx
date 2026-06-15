import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { Bathtub } from "@phosphor-icons/react/dist/ssr/Bathtub";
import { Bed } from "@phosphor-icons/react/dist/ssr/Bed";
import { CarProfile } from "@phosphor-icons/react/dist/ssr/CarProfile";
import { MapPin } from "@phosphor-icons/react/dist/ssr/MapPin";
import { PhoneCall } from "@phosphor-icons/react/dist/ssr/PhoneCall";
import { Ruler } from "@phosphor-icons/react/dist/ssr/Ruler";
import { SealCheck } from "@phosphor-icons/react/dist/ssr/SealCheck";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
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
      <div className="relative h-56 overflow-hidden bg-surface-soft sm:h-64 lg:h-60 xl:h-64">
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
            <SealCheck size={13} weight="fill" className="text-brand" />
            Verified
          </span>
        )}

        {/* Price strip — bottom of image */}
        <span className="absolute left-3 bottom-12 z-20 grid size-9 place-items-center rounded-full bg-white/95 p-1 shadow-lg ring-1 ring-white/70" aria-label="Ipopo Rwanda listing">
          <Image
            src="/logo.png"
            alt=""
            width={28}
            height={28}
            className="h-full w-full object-contain"
          />
        </span>

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
            className="inline-flex items-center gap-1 rounded-full bg-white/12 px-2.5 py-1 text-[10px] font-bold text-white/70 transition hover:bg-white/20 hover:text-white"
          >
            View <ArrowRight size={11} weight="bold" />
          </Link>
        </div>
      </div>

      {/* ── Card body ─────────────────────── */}
      <div className="flex flex-1 flex-col gap-3 p-4">

        {/* Location */}
        <p className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-muted">
          <MapPin size={14} weight="duotone" className="text-brand" />
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
              <CarProfile size={15} weight="duotone" />
              Premium vehicle
            </span>
          ) : (
            <>
              {listing.bedrooms && (
                <>
                  <span className="inline-flex items-center gap-1.5">
                    <Bed size={15} weight="duotone" />
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
                    <Bathtub size={15} weight="duotone" />
                    {listing.bathrooms} bath
                  </span>
                  {listing.areaSqm && <span className="mx-2.5 text-line">·</span>}
                </>
              )}
              {listing.areaSqm && (
                <span className="inline-flex items-center gap-1.5">
                  <Ruler size={15} weight="duotone" />
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
            <WhatsappLogo size={17} weight="fill" aria-hidden />
            WhatsApp
          </a>
          <a
            href={`tel:${listing.phone}`}
            className="flex min-h-[44px] w-[40%] items-center justify-center gap-1.5 rounded-full border border-line text-xs font-bold text-foreground transition hover:border-brand hover:text-brand"
          >
            <PhoneCall size={16} weight="duotone" aria-hidden />
            Call
          </a>
        </div>
      </div>
    </article>
  );
}
