import type { Metadata } from "next";
import { PropertyFilters } from "@/components/property-filters";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { getListings } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Properties for Rent and Sale in Kigali",
  description: "Browse verified houses, apartments, villas, land, offices, and retail spaces in Kigali.",
};

export default async function PropertiesPage() {
  const listings = (await getListings()).filter((listing) => listing.group === "properties");

  return (
    <>
      <SmoothScroll />
      <SiteHeader />
      <main>
        <div className="border-b border-line bg-surface-soft">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">Kigali listings</p>
            <h1 className="mt-3 max-w-3xl text-5xl font-black tracking-tight">Properties for rent and sale</h1>
            <p className="mt-4 max-w-2xl text-muted">
              Search verified homes, apartments, villas, land, offices, and commercial spaces with direct owner or agent contact.
            </p>
          </div>
        </div>
        <PropertyFilters listings={listings} />
      </main>
    </>
  );
}
