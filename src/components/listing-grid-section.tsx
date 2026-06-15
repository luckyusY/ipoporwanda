import Link from "next/link";
import { PropertyCard } from "@/components/property-card";
import type { PropertyListing } from "@/lib/types";

export function ListingGridSection({
  eyebrow,
  title,
  listings,
  dark = false,
  id,
  limit,
}: {
  eyebrow: string;
  title: string;
  listings: PropertyListing[];
  dark?: boolean;
  id?: string;
  limit?: number;
}) {
  if (!listings.length) return null;

  const sectionListings = limit ? listings.slice(0, limit) : listings;
  const shown = sectionListings.length;

  return (
    <section id={id} className={dark ? "bg-foreground py-12 text-white sm:py-20" : "py-12 sm:py-20"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">
              {eyebrow}
            </p>
            <h2 className="mt-2.5 text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
              {title}
            </h2>
            <p className={`mt-1.5 text-sm font-semibold ${dark ? "text-white/40" : "text-muted"}`}>
              {shown} listing{shown !== 1 ? "s" : ""} available
            </p>
          </div>
          <Link
            href="/properties"
            className={dark ? "shrink-0 text-sm font-bold text-white/70 hover:text-white" : "shrink-0 text-sm font-bold text-brand hover:text-brand-dark"}
          >
            View all
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {sectionListings.map((listing, index) => (
            <PropertyCard key={listing.id} listing={listing} priority={index < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
