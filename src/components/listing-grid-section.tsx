import Link from "next/link";
import { PropertyCard } from "@/components/property-card";
import { GSAPStagger } from "@/components/gsap-stagger";
import { GSAPSectionHeader } from "@/components/gsap-section-header";
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
    <section id={id} className={dark ? "content-auto bg-foreground py-12 text-white sm:py-20" : "content-auto py-12 sm:py-20"}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <GSAPSectionHeader>
          {/* eyebrow */}
          <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">
            {eyebrow}
          </p>
          {/* title */}
          <h2 className={`ipopo-title mt-2.5 text-2xl font-black tracking-normal sm:text-3xl lg:text-4xl ${dark ? "ipopo-title-on-dark" : ""}`}>
            {title}
          </h2>
          {/* meta row */}
          <div className="mt-3 flex items-center justify-between gap-4">
            <p className={`text-sm font-semibold ${dark ? "text-white/40" : "text-muted"}`}>
              {shown} listing{shown !== 1 ? "s" : ""} available
            </p>
            <Link
              href="/properties"
              className={dark ? "shrink-0 text-sm font-bold text-white/70 hover:text-white" : "shrink-0 text-sm font-bold text-brand hover:text-brand-dark"}
            >
              View all
            </Link>
          </div>
        </GSAPSectionHeader>

        <GSAPStagger className="mt-8 grid gap-5 sm:grid-cols-2 sm:mt-10 lg:grid-cols-4">
          {sectionListings.map((listing, index) => (
            <PropertyCard key={listing.id} listing={listing} priority={index < 2} />
          ))}
        </GSAPStagger>

      </div>
    </section>
  );
}
