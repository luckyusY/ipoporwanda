import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bath,
  BedDouble,
  CheckCircle2,
  Clock3,
  MapPin,
  MessageCircle,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import { PropertyGallery } from "@/components/property-gallery";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { formatMoney, toWhatsappUrl } from "@/lib/format";
import { getListings } from "@/lib/listings";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listings = await getListings();
  const listing = listings.find((item) => item.slug === slug);

  if (!listing) return {};

  return {
    title: listing.title,
    description: listing.summary,
    openGraph: {
      title: listing.title,
      description: listing.summary,
      images: listing.images.slice(0, 1),
    },
  };
}

export default async function PropertyDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listings = await getListings();
  const listing = listings.find((item) => item.slug === slug && item.group === "properties");

  if (!listing) notFound();

  const similar = listings
    .filter((item) => item.group === "properties" && item.slug !== listing.slug)
    .filter((item) => item.purpose === listing.purpose || item.location === listing.location)
    .slice(0, 3);

  const stats: Array<[LucideIcon, number | string, string]> = [
    [BedDouble, listing.bedrooms ?? "-", "Bedrooms"],
    [Bath, listing.bathrooms ?? "-", "Bathrooms"],
    [Ruler, listing.areaSqm ?? "-", "Square meters"],
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Accommodation",
    name: listing.title,
    description: listing.summary,
    address: `${listing.location}, ${listing.district}, Kigali, Rwanda`,
    image: listing.images,
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: listing.currency,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <SmoothScroll />
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <section className="border-b border-line bg-surface-soft">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <Link href="/properties" className="text-sm font-bold text-brand hover:text-brand-dark">
              Back to properties
            </Link>
            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-brand px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
                    For {listing.purpose}
                  </span>
                  <span className="rounded-full bg-gold px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
                    Verified
                  </span>
                  <span className="rounded-full bg-surface px-3 py-1 text-xs font-black uppercase tracking-wide text-brand-dark">
                    {listing.category}
                  </span>
                </div>
                <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl">
                  {listing.title}
                </h1>
                <p className="mt-3 inline-flex items-center gap-2 text-muted">
                  <MapPin size={18} className="text-brand" />
                  {listing.location}, {listing.district}, Kigali
                </p>
              </div>
              <div className="rounded-lg border border-line bg-surface p-5 shadow-sm lg:min-w-80">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-muted">Asking price</p>
                <p className="mt-2 text-4xl font-black text-brand-dark">
                  {formatMoney(listing.price, listing.currency)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1.36fr_0.64fr] lg:px-8">
          <div className="grid gap-6">
            <PropertyGallery images={listing.images} title={listing.title} />

            <div className="grid gap-4 sm:grid-cols-3">
              {stats.map(([Icon, value, label]) => (
                <div key={String(label)} className="rounded-lg border border-line bg-surface p-5 shadow-sm">
                  <Icon className="mb-4 text-brand" size={24} />
                  <strong className="block text-2xl">{String(value)}</strong>
                  <span className="text-sm font-medium text-muted">{String(label)}</span>
                </div>
              ))}
            </div>

            <section className="rounded-lg border border-line bg-surface p-6 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Overview</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight">Property story</h2>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-muted">{listing.summary}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {listing.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 rounded-md bg-surface-soft p-3">
                    <CheckCircle2 size={18} className="text-brand" />
                    <span className="font-semibold">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-line bg-brand-dark p-6 text-white shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-gold">Why this listing stands out</p>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {([
                  [ShieldCheck, "Verified", "Reviewed listing data and direct contact paths."],
                  [Sparkles, "Premium media", "Gallery-first presentation for confident decisions."],
                  [Clock3, "Fast action", "Call or WhatsApp the agent from every key point."],
                ] as Array<[LucideIcon, string, string]>).map(([Icon, title, text]) => (
                  <div key={String(title)} className="rounded-lg border border-white/10 bg-white/5 p-4">
                    <Icon className="mb-5 text-gold" size={24} />
                    <h3 className="font-bold">{String(title)}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/70">{String(text)}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="h-fit lg:sticky lg:top-24">
            <div className="rounded-lg border border-line bg-surface p-5 shadow-xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Contact agent</p>
              <h2 className="mt-3 text-2xl font-black">{listing.agentName}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Ask for availability, exact address, viewing time, paperwork, and negotiation options.
              </p>
              <div className="mt-6 grid gap-3">
                <a
                  href={toWhatsappUrl(listing.whatsapp, listing.title)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16a34a] px-5 py-4 font-bold text-white transition hover:bg-[#12813c]"
                >
                  <MessageCircle size={18} /> WhatsApp agent
                </a>
                <a
                  href={`tel:${listing.phone}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-5 py-4 font-bold text-brand-dark transition hover:border-brand"
                >
                  <Phone size={18} /> Call now
                </a>
              </div>
              <div className="mt-6 rounded-lg bg-surface-soft p-4">
                <p className="text-sm font-bold text-brand-dark">Viewing checklist</p>
                <ul className="mt-3 space-y-2 text-sm text-muted">
                  <li>Confirm viewing time and access road.</li>
                  <li>Ask about utilities, security, and paperwork.</li>
                  <li>Request final price and payment terms.</li>
                </ul>
              </div>
            </div>
          </aside>
        </section>

        {similar.length ? (
          <section className="border-t border-line bg-surface-soft">
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="mb-8 flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">Similar listings</p>
                  <h2 className="mt-3 text-3xl font-black tracking-tight">You may also like</h2>
                </div>
                <Link href="/properties" className="text-sm font-bold text-brand hover:text-brand-dark">
                  View all
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {similar.map((item, index) => (
                  <PropertyCard key={item.id} listing={item} priority={index === 0} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
