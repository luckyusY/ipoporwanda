"use client";

import { useMemo, useState } from "react";
import { MapPin, Search, X } from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import type { ListingPurpose, PropertyListing } from "@/lib/types";

export function PropertyFilters({ listings }: { listings: PropertyListing[] }) {
  const [query, setQuery] = useState("");
  const [purpose, setPurpose] = useState<ListingPurpose | "all">("all");
  const [category, setCategory] = useState("all");

  const categories = useMemo(
    () => Array.from(new Set(listings.map((listing) => listing.category))),
    [listings],
  );
  const topLocations = useMemo(() => {
    const priority = ["Kibagabaga", "Kacyiru", "Nyarutarama", "Gacuriro", "Rebero", "Kimihurura", "Kiyovu", "Remera"];
    const available = new Set(listings.map((listing) => listing.location));
    return priority.filter((location) => available.has(location)).slice(0, 8);
  }, [listings]);

  const filtered = listings.filter((listing) => {
    const text = `${listing.title} ${listing.location} ${listing.district} ${listing.category}`.toLowerCase();
    return (
      text.includes(query.toLowerCase()) &&
      (purpose === "all" || listing.purpose === purpose) &&
      (category === "all" || listing.category === category)
    );
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 grid gap-3 rounded-lg border border-line bg-surface p-3 shadow-sm md:grid-cols-[1fr_auto_auto]">
        <label className="relative block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by location, category, or title"
            className="h-12 w-full rounded-md border border-line bg-background pl-11 pr-4 text-sm outline-none ring-brand/20 transition focus:border-brand focus:ring-4"
          />
        </label>
        <select
          value={purpose}
          onChange={(event) => setPurpose(event.target.value as ListingPurpose | "all")}
          className="h-12 rounded-md border border-line bg-background px-4 text-sm font-medium outline-none ring-brand/20 transition focus:border-brand focus:ring-4"
          aria-label="Filter by purpose"
        >
          <option value="all">Rent and sale</option>
          <option value="rent">For rent</option>
          <option value="sale">For sale</option>
        </select>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="h-12 rounded-md border border-line bg-background px-4 text-sm font-medium capitalize outline-none ring-brand/20 transition focus:border-brand focus:ring-4"
          aria-label="Filter by category"
        >
          <option value="all">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-8 rounded-lg border border-line bg-surface p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between gap-4">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-brand">
            <MapPin size={16} /> Top locations
          </p>
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="inline-flex items-center gap-1 rounded-full bg-surface-soft px-3 py-1 text-xs font-bold text-muted transition hover:text-foreground"
            >
              <X size={13} /> Clear
            </button>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {topLocations.map((location) => (
            <button
              key={location}
              type="button"
              onClick={() => setQuery(location)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                query.toLowerCase() === location.toLowerCase()
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-background text-brand-dark hover:border-brand"
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Verified properties</h1>
        <p className="text-sm font-medium text-muted">{filtered.length} listings</p>
      </div>

      {filtered.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing, index) => (
            <PropertyCard key={listing.id} listing={listing} priority={index < 3} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-line bg-surface p-10 text-center">
          <h2 className="text-xl font-semibold">No matching properties yet</h2>
          <p className="mt-2 text-muted">Try a different location, status, or property type.</p>
        </div>
      )}
    </section>
  );
}
