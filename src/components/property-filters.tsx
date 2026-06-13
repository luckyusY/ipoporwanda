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
    () => Array.from(new Set(listings.map((l) => l.category))),
    [listings],
  );

  const topLocations = useMemo(() => {
    const priority = [
      "Kibagabaga",
      "Kacyiru",
      "Nyarutarama",
      "Gacuriro",
      "Rebero",
      "Kimihurura",
      "Kiyovu",
      "Remera",
    ];
    const available = new Set(listings.map((l) => l.location));
    return priority.filter((loc) => available.has(loc)).slice(0, 8);
  }, [listings]);

  const filtered = listings.filter((listing) => {
    const text =
      `${listing.title} ${listing.location} ${listing.district} ${listing.category}`.toLowerCase();
    return (
      text.includes(query.toLowerCase()) &&
      (purpose === "all" || listing.purpose === purpose) &&
      (category === "all" || listing.category === category)
    );
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {/* ── Search + filter bar ─────────────────────────────────── */}
      <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-line bg-surface p-3 shadow-sm sm:flex-row">
        {/* Search input */}
        <label className="relative min-w-0 flex-1">
          <Search
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            size={17}
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by location, type, or title…"
            className="h-12 w-full rounded-xl border border-line bg-background pl-10 pr-4 text-sm font-medium outline-none ring-brand/15 transition focus:border-brand focus:ring-4"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 grid size-6 place-items-center rounded-full bg-surface-soft text-muted transition hover:text-foreground"
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          ) : null}
        </label>

        {/* Dropdowns — stacked on mobile, side-by-side on sm */}
        <div className="flex gap-3">
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value as ListingPurpose | "all")}
            className="h-12 flex-1 rounded-xl border border-line bg-background px-3.5 text-sm font-semibold outline-none ring-brand/15 transition focus:border-brand focus:ring-4 sm:flex-none sm:w-36"
            aria-label="Filter by purpose"
          >
            <option value="all">Rent &amp; sale</option>
            <option value="rent">For rent</option>
            <option value="sale">For sale</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-12 flex-1 rounded-xl border border-line bg-background px-3.5 text-sm font-semibold capitalize outline-none ring-brand/15 transition focus:border-brand focus:ring-4 sm:flex-none sm:w-44"
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
      </div>

      {/* ── Location quick-filters ──────────────────────────────── */}
      {topLocations.length > 0 && (
        <div className="mb-7 rounded-2xl border border-line bg-surface p-4 shadow-sm">
          <p className="mb-3 inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.18em] text-brand">
            <MapPin size={13} strokeWidth={2.5} /> Top locations
          </p>
          {/* Horizontally scrollable on mobile — no wrap needed */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {topLocations.map((location) => (
              <button
                key={location}
                type="button"
                onClick={() =>
                  setQuery(
                    query.toLowerCase() === location.toLowerCase()
                      ? ""
                      : location,
                  )
                }
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
                  query.toLowerCase() === location.toLowerCase()
                    ? "border-brand bg-brand text-white"
                    : "border-line bg-background text-brand-dark hover:border-brand/40 hover:bg-brand-soft"
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Results header ──────────────────────────────────────── */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-black tracking-tight sm:text-2xl">
          Verified properties
        </h2>
        <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-bold text-muted">
          {filtered.length} listing{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Grid ────────────────────────────────────────────────── */}
      {filtered.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing, index) => (
            <PropertyCard key={listing.id} listing={listing} priority={index < 3} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-line bg-surface py-16 text-center">
          <p className="text-4xl" aria-hidden>🏡</p>
          <h3 className="mt-4 text-xl font-bold">No matching properties</h3>
          <p className="mt-2 text-sm text-muted">
            Try a different location, status, or property type.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setPurpose("all");
              setCategory("all");
            }}
            className="mt-5 inline-flex min-h-[44px] items-center rounded-full border border-brand/25 bg-brand-soft px-5 text-sm font-bold text-brand transition hover:bg-brand hover:text-white"
          >
            Clear all filters
          </button>
        </div>
      )}
    </section>
  );
}
