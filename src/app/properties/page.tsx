import type { Metadata } from "next";
import { PropertyFilters } from "@/components/property-filters";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { getListings } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Properties for Rent and Sale in Kigali",
  description:
    "Browse verified houses, apartments, villas, land, offices, and retail spaces in Kigali.",
};

export default async function PropertiesPage() {
  const listings = (await getListings()).filter(
    (listing) => listing.group === "properties",
  );

  return (
    <>
      <SmoothScroll />
      <SiteHeader />
      <main>
        {/* Page header */}
        <div className="relative overflow-hidden border-b border-line bg-surface-soft">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,107,79,0.07),transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
              Kigali listings
            </p>
            <h1 className="mt-2.5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              Properties for rent and sale
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
              Search verified homes, apartments, villas, land, offices, and commercial spaces with direct owner or agent contact.
            </p>
          </div>
        </div>

        <PropertyFilters listings={listings} />
      </main>
    </>
  );
}
