"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  Trash2,
  RefreshCw,
  LogOut,
  PlusCircle,
  LayoutDashboard,
  CheckCircle2,
  Clock,
  Car,
} from "lucide-react";
import { formatMoney } from "@/lib/format";
import { ListingForm } from "@/components/listing-form";
import type { PropertyListing } from "@/lib/types";

type AdminListing = PropertyListing & { _id?: string };
type Tab = "listings" | "new";

/* ── helpers ─────────────────────────────────────────────────────────── */
const STATUS_COLOURS: Record<string, string> = {
  published: "bg-emerald-50 text-emerald-700 border-emerald-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
};

function StatCard({
  label,
  value,
  icon,
  colour = "text-foreground",
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  colour?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line bg-surface p-4 shadow-sm">
      <span className={`grid size-10 shrink-0 place-items-center rounded-full bg-surface-soft ${colour}`}>
        {icon}
      </span>
      <div>
        <p className="text-xs font-bold text-muted">{label}</p>
        <p className={`text-2xl font-black ${colour}`}>{value}</p>
      </div>
    </div>
  );
}

/* ── main component ───────────────────────────────────────────────────── */
export function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("listings");
  const [listings, setListings] = useState<AdminListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState<string | null>(null);

  /* fetch */
  async function fetchListings() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/listings");
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to load listings.");
      }
      const data = await res.json();
      setListings(data.listings ?? []);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Could not load listings.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListings();
  }, []);

  /* stats */
  const stats = useMemo(() => ({
    total: listings.length,
    published: listings.filter((l) => l.status === "published").length,
    drafts: listings.filter((l) => l.status === "draft").length,
    cars: listings.filter((l) => l.group === "cars").length,
  }), [listings]);

  /* logout */
  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  /* toggle status */
  async function toggleStatus(listing: AdminListing) {
    setActionId(listing.id);
    const newStatus = listing.status === "published" ? "draft" : "published";
    await fetch(`/api/admin/listings/${listing.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setActionId(null);
    fetchListings();
  }

  /* delete */
  async function deleteListing(listing: AdminListing) {
    if (!confirm(`Delete "${listing.title}"?\n\nThis removes the listing and its Cloudinary images. Cannot be undone.`)) return;
    setActionId(listing.id);
    await fetch(`/api/admin/listings/${listing.id}`, { method: "DELETE" });
    setActionId(null);
    fetchListings();
  }

  return (
    <div>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-dark p-1.5">
            <Image src="/logo.png" alt="Ipopo Rwanda" width={48} height={48} className="size-full object-contain" />
          </Link>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">Owner studio</p>
            <h1 className="text-xl font-black tracking-tight sm:text-2xl">Ipopo Rwanda</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-4 text-xs font-bold transition hover:bg-surface-soft"
          >
            ← View site
          </Link>
          <button
            onClick={logout}
            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line bg-surface px-4 text-xs font-bold text-muted transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut size={13} /> Logout
          </button>
        </div>
      </div>

      {/* ── Tabs ────────────────────────────────────────────────────── */}
      <div className="mb-6 flex gap-1 rounded-xl border border-line bg-surface p-1">
        {([["listings", LayoutDashboard, "All listings"], ["new", PlusCircle, "Add listing"]] as const).map(
          ([key, Icon, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition ${
                tab === key
                  ? "bg-brand text-white shadow-sm"
                  : "text-muted hover:bg-surface-soft hover:text-foreground"
              }`}
            >
              <Icon size={15} />
              {label}
            </button>
          ),
        )}
      </div>

      {/* ── Listings tab ────────────────────────────────────────────── */}
      {tab === "listings" && (
        <div>
          {/* Stats */}
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label="Total" value={stats.total} icon={<LayoutDashboard size={18} />} />
            <StatCard label="Published" value={stats.published} icon={<CheckCircle2 size={18} />} colour="text-emerald-600" />
            <StatCard label="Drafts" value={stats.drafts} icon={<Clock size={18} />} colour="text-amber-600" />
            <StatCard label="Cars" value={stats.cars} icon={<Car size={18} />} colour="text-brand" />
          </div>

          {/* Listings table */}
          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
            <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
              <h2 className="font-black">All listings</h2>
              <button
                onClick={fetchListings}
                disabled={loading}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line px-3 text-xs font-bold text-muted transition hover:bg-surface-soft disabled:opacity-50"
              >
                <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
                Refresh
              </button>
            </div>

            {error && (
              <div className="border-b border-red-100 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            {loading && !listings.length ? (
              <div className="py-20 text-center text-sm text-muted">Loading listings…</div>
            ) : listings.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-4xl">📋</p>
                <p className="mt-4 font-bold">No listings in the database yet.</p>
                <p className="mt-1 text-sm text-muted">Use the Add listing tab to create one.</p>
              </div>
            ) : (
              <div className="divide-y divide-line">
                {listings.map((listing) => (
                  <div
                    key={listing.id}
                    className={`flex items-start gap-3 px-4 py-3.5 transition hover:bg-surface-soft/40 sm:gap-4 ${
                      actionId === listing.id ? "opacity-50" : ""
                    }`}
                  >
                    {/* Thumb */}
                    <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-surface-soft sm:size-16">
                      {listing.images[0] && (
                        <Image
                          src={listing.images[0]}
                          alt={listing.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                          unoptimized={listing.images[0].startsWith("/")}
                        />
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="line-clamp-1 flex-1 text-sm font-bold">{listing.title}</p>
                        <span
                          className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                            STATUS_COLOURS[listing.status] ?? "border-line text-muted"
                          }`}
                        >
                          {listing.status}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-muted">
                        {listing.location}, {listing.district} ·{" "}
                        <span className="capitalize">{listing.group}</span> ·{" "}
                        {formatMoney(listing.price, listing.currency)}
                        {listing.purpose === "rent" ? (listing.group === "cars" ? "/day" : "/mo") : ""}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted/70">
                        {new Date(listing.createdAt).toLocaleDateString("en-RW", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        onClick={() => toggleStatus(listing)}
                        disabled={actionId === listing.id}
                        title={listing.status === "published" ? "Set to draft" : "Publish"}
                        className={`grid size-8 place-items-center rounded-full border transition disabled:cursor-not-allowed ${
                          listing.status === "published"
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-700 hover:text-white"
                            : "border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-700 hover:text-white"
                        }`}
                      >
                        {listing.status === "published" ? <EyeOff size={13} /> : <Eye size={13} />}
                      </button>
                      <button
                        onClick={() => deleteListing(listing)}
                        disabled={actionId === listing.id}
                        title="Delete listing"
                        className="grid size-8 place-items-center rounded-full border border-line text-muted transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── New listing tab ──────────────────────────────────────────── */}
      {tab === "new" && (
        <div>
          <p className="mb-5 text-sm text-muted">
            Fill in the details below. Images are uploaded to Cloudinary and the listing is saved as a
            draft in MongoDB. Publish it from the Listings tab when ready.
          </p>
          <ListingForm onSuccess={() => { setTab("listings"); fetchListings(); }} />
        </div>
      )}
    </div>
  );
}
