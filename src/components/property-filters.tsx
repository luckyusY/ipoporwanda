"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, Search, X } from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import type { ListingPurpose, PropertyListing } from "@/lib/types";

const LOCATIONS = [
  "Kigali", "Kibagabaga", "Kacyiru", "Nyarutarama", "Gacuriro",
  "Rebero", "Kimihurura", "Kiyovu", "Remera", "Kimironko", "Kicukiro",
];

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand-soft px-3 py-1.5 text-xs font-bold text-brand">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="grid size-4 place-items-center rounded-full bg-brand/10 transition hover:bg-brand hover:text-white"
      >
        <X size={10} />
      </button>
    </span>
  );
}

export function PropertyFilters({ listings }: { listings: PropertyListing[] }) {
  const router = useRouter();
  const params = useSearchParams();

  /* ── State initialised from URL ──────────────────────────────────── */
  const [inputValue, setInputValue] = useState(params.get("q") ?? "");
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [location, setLocation] = useState(params.get("location") ?? "");
  const [purpose, setPurpose] = useState<ListingPurpose | "all">(
    (params.get("purpose") as ListingPurpose | null) ?? "all",
  );
  const [category, setCategory] = useState(params.get("category") ?? "all");
  const [sort, setSort] = useState(params.get("sort") ?? "default");
  const [minPrice, setMinPrice] = useState(params.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(params.get("maxPrice") ?? "");

  /* ── Debounce text → query + URL ─────────────────────────────────── */
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleInput = (value: string) => {
    setInputValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setQuery(value), 280);
  };

  /* ── Sync filters → URL (replace, no scroll) ─────────────────────── */
  useEffect(() => {
    const p = new URLSearchParams();
    if (query) p.set("q", query);
    if (location) p.set("location", location);
    if (purpose !== "all") p.set("purpose", purpose);
    if (category !== "all") p.set("category", category);
    if (sort !== "default") p.set("sort", sort);
    if (minPrice) p.set("minPrice", minPrice);
    if (maxPrice) p.set("maxPrice", maxPrice);
    const qs = p.toString();
    router.replace(`/properties${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [query, location, purpose, category, sort, minPrice, maxPrice, router]);

  /* ── Derived values ──────────────────────────────────────────────── */
  const categories = useMemo(
    () => Array.from(new Set(listings.map((l) => l.category))),
    [listings],
  );

  const availableLocations = useMemo(() => {
    const available = new Set(listings.map((l) => l.location));
    return LOCATIONS.filter((loc) => available.has(loc));
  }, [listings]);

  const filtered = useMemo(() => {
    let result = listings.filter((listing) => {
      const text =
        `${listing.title} ${listing.location} ${listing.district} ${listing.category} ${listing.summary}`.toLowerCase();
      const matchQuery = !query || text.includes(query.toLowerCase());
      const matchLocation =
        !location ||
        listing.location.toLowerCase() === location.toLowerCase();
      const matchPurpose =
        purpose === "all" || listing.purpose === purpose;
      const matchCategory =
        category === "all" || listing.category === category;
      const matchMin = !minPrice || listing.price >= Number(minPrice);
      const matchMax = !maxPrice || listing.price <= Number(maxPrice);
      return matchQuery && matchLocation && matchPurpose && matchCategory && matchMin && matchMax;
    });

    if (sort === "price-asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "newest")
      result = [...result].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );

    return result;
  }, [listings, query, location, purpose, category, sort, minPrice, maxPrice]);

  const activeFilters = [
    query && { label: `"${query}"`, clear: () => { setInputValue(""); setQuery(""); } },
    location && { label: location, clear: () => setLocation("") },
    purpose !== "all" && { label: `For ${purpose}`, clear: () => setPurpose("all") },
    category !== "all" && { label: category, clear: () => setCategory("all") },
    minPrice && { label: `Min $${Number(minPrice).toLocaleString()}`, clear: () => setMinPrice("") },
    maxPrice && { label: `Max $${Number(maxPrice).toLocaleString()}`, clear: () => setMaxPrice("") },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  const clearAll = () => {
    setInputValue(""); setQuery(""); setLocation(""); setPurpose("all");
    setCategory("all"); setSort("default"); setMinPrice(""); setMaxPrice("");
  };

  /* ── UI ──────────────────────────────────────────────────────────── */
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">

      {/* ── Filter card ──────────────────────────────────────────────── */}
      <div className="mb-6 rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-5">

        {/* Row 1 — search + dropdowns */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Text search */}
          <label className="relative min-w-0 flex-1">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
              size={17}
            />
            <input
              value={inputValue}
              onChange={(e) => handleInput(e.target.value)}
              placeholder="Search by title, location, or type…"
              className="h-12 w-full rounded-xl border border-line bg-background pl-10 pr-10 text-sm font-medium outline-none ring-brand/15 transition focus:border-brand focus:ring-4"
            />
            {inputValue && (
              <button
                type="button"
                onClick={() => { setInputValue(""); setQuery(""); }}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 grid size-6 place-items-center rounded-full bg-surface-soft text-muted transition hover:text-foreground"
              >
                <X size={13} />
              </button>
            )}
          </label>

          {/* Location */}
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            aria-label="Filter by location"
            className="h-12 rounded-xl border border-line bg-background px-3.5 text-sm font-semibold outline-none ring-brand/15 transition focus:border-brand focus:ring-4 sm:w-38"
          >
            <option value="">All areas</option>
            {availableLocations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          {/* Purpose */}
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value as ListingPurpose | "all")}
            aria-label="Filter by purpose"
            className="h-12 rounded-xl border border-line bg-background px-3.5 text-sm font-semibold outline-none ring-brand/15 transition focus:border-brand focus:ring-4 sm:w-32"
          >
            <option value="all">Rent &amp; sale</option>
            <option value="rent">For rent</option>
            <option value="sale">For sale</option>
          </select>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Filter by category"
            className="h-12 rounded-xl border border-line bg-background px-3.5 text-sm font-semibold capitalize outline-none ring-brand/15 transition focus:border-brand focus:ring-4 sm:w-36"
          >
            <option value="all">All types</option>
            {categories.map((item) => (
              <option key={item} value={item} className="capitalize">{item}</option>
            ))}
          </select>
        </div>

        {/* Row 2 — price range + sort */}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="shrink-0 text-xs font-bold text-muted">Price (RWF)</span>
          <input
            type="number"
            min={0}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            className="h-9 w-24 rounded-xl border border-line bg-background px-3 text-sm font-medium outline-none ring-brand/15 transition focus:border-brand focus:ring-4"
          />
          <span className="text-muted text-sm">—</span>
          <input
            type="number"
            min={0}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            className="h-9 w-24 rounded-xl border border-line bg-background px-3 text-sm font-medium outline-none ring-brand/15 transition focus:border-brand focus:ring-4"
          />

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort listings"
            className="h-9 rounded-xl border border-line bg-background px-3 text-sm font-semibold outline-none ring-brand/15 transition focus:border-brand focus:ring-4"
          >
            <option value="default">Sort: featured</option>
            <option value="price-asc">Price: low → high</option>
            <option value="price-desc">Price: high → low</option>
            <option value="newest">Newest first</option>
          </select>

          {activeFilters.length > 0 && (
            <button
              type="button"
              onClick={clearAll}
              className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-4 text-xs font-bold text-muted transition hover:border-brand hover:bg-brand-soft hover:text-brand"
            >
              <X size={12} /> Clear all ({activeFilters.length})
            </button>
          )}
        </div>
      </div>

      {/* ── Location quick-chips ──────────────────────────────────────── */}
      <div className="mb-7 flex flex-wrap items-center gap-2">
        <MapPin size={13} className="shrink-0 text-brand" strokeWidth={2.5} />
        <button
          type="button"
          onClick={() => setLocation("")}
          className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
            !location
              ? "border-brand bg-brand text-white"
              : "border-line bg-surface text-brand-dark hover:border-brand/40 hover:bg-brand-soft"
          }`}
        >
          All areas
        </button>
        {availableLocations.map((loc) => (
          <button
            key={loc}
            type="button"
            onClick={() => setLocation(location === loc ? "" : loc)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold transition ${
              location === loc
                ? "border-brand bg-brand text-white"
                : "border-line bg-surface text-brand-dark hover:border-brand/40 hover:bg-brand-soft"
            }`}
          >
            {loc}
          </button>
        ))}
      </div>

      {/* ── Active filter chips ───────────────────────────────────────── */}
      {activeFilters.length > 0 && (
        <div className="mb-5 flex flex-wrap gap-2">
          {activeFilters.map((f) => (
            <Chip key={f.label} label={f.label} onRemove={f.clear} />
          ))}
        </div>
      )}

      {/* ── Results header ────────────────────────────────────────────── */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="ipopo-title text-xl font-black tracking-normal sm:text-2xl">
          {activeFilters.length > 0 ? "Search results" : "Verified properties"}
        </h2>
        <span className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-bold text-muted">
          {filtered.length} listing{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── Grid ─────────────────────────────────────────────────────── */}
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
            Try a different location, type, or price range.
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-5 inline-flex min-h-[44px] items-center rounded-full border border-brand/25 bg-brand-soft px-5 text-sm font-bold text-brand transition hover:bg-brand hover:text-white"
          >
            Clear all filters
          </button>
        </div>
      )}
    </section>
  );
}
