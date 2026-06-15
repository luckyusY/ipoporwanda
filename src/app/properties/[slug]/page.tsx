import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin } from "@phosphor-icons/react/dist/ssr/MapPin";
import { Bed } from "@phosphor-icons/react/dist/ssr/Bed";
import { Bathtub } from "@phosphor-icons/react/dist/ssr/Bathtub";
import { Ruler } from "@phosphor-icons/react/dist/ssr/Ruler";
import { SealCheck } from "@phosphor-icons/react/dist/ssr/SealCheck";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr/WhatsappLogo";
import { PhoneCall } from "@phosphor-icons/react/dist/ssr/PhoneCall";
import { CheckCircle } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { Lightning } from "@phosphor-icons/react/dist/ssr/Lightning";
import { Medal } from "@phosphor-icons/react/dist/ssr/Medal";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { PropertyCard } from "@/components/property-card";
import { PropertyGallery } from "@/components/property-gallery";
import { GSAPStagger } from "@/components/gsap-stagger";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { formatMoney, toWhatsappUrl } from "@/lib/format";
import { getListings } from "@/lib/listings";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listings = await getListings();
  const listing = listings.find((l) => l.slug === slug);
  if (!listing) return {};
  return {
    title: `${listing.title} | Ipopo Rwanda`,
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
  const listing = listings.find((l) => l.slug === slug && l.group === "properties");
  if (!listing) notFound();

  const similar = listings
    .filter((l) => l.group === "properties" && l.slug !== listing.slug)
    .filter((l) => l.purpose === listing.purpose || l.location === listing.location)
    .slice(0, 3);

  const isRent = listing.purpose === "rent";
  const whatsappUrl = toWhatsappUrl(listing.whatsapp, listing.title);

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

      <main className="pb-24 lg:pb-0">

        {/* ── Gallery ──────────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
          <Link
            href="/properties"
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-bold text-muted transition hover:text-brand"
          >
            <ArrowLeft size={15} weight="bold" /> All properties
          </Link>
          <PropertyGallery images={listing.images} title={listing.title} />
        </div>

        {/* ── Main grid ────────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:grid lg:grid-cols-[1fr_380px] lg:gap-12 lg:px-8 lg:py-10">

          {/* ══ Left column ════════════════════════════════════════ */}
          <div className="min-w-0">

            {/* ── Header: badges + title + location ─────────────── */}
            <div className="space-y-4">
              <div className="page-enter flex flex-wrap items-center gap-2">
                <span className={`rounded-md px-3 py-1.5 text-[11px] font-black uppercase tracking-wider ${isRent ? "bg-brand text-white" : "bg-gold text-foreground"}`}>
                  For {listing.purpose}
                </span>
                <span className="rounded-md bg-surface-soft px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-brand-dark">
                  {listing.category}
                </span>
                {listing.featured && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-brand-soft px-3 py-1.5 text-[11px] font-black uppercase tracking-wider text-brand-dark">
                    <SealCheck size={13} weight="fill" /> Verified
                  </span>
                )}
              </div>

              <h1 className="page-enter page-enter-d1 ipopo-title max-w-3xl text-3xl font-black leading-tight tracking-normal sm:text-4xl lg:text-5xl">
                {listing.title}
              </h1>

              <p className="page-enter page-enter-d2 inline-flex items-center gap-1.5 text-sm font-semibold text-muted">
                <MapPin size={16} weight="fill" className="text-brand" />
                {listing.location}, {listing.district}, Kigali, Rwanda
              </p>

              {/* Mobile price (hidden on desktop — lives in sidebar) */}
              <div className="page-enter page-enter-d3 rounded-xl border border-line bg-surface p-4 lg:hidden">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted">Asking price</p>
                <p className="mt-1 text-3xl font-black text-brand-dark">
                  {formatMoney(listing.price, listing.currency)}
                  {isRent && <span className="ml-2 text-base font-bold text-muted">/month</span>}
                </p>
              </div>
            </div>

            {/* ── Stats bar ─────────────────────────────────────── */}
            {(listing.bedrooms || listing.bathrooms || listing.areaSqm) && (
              <div className="page-enter page-enter-d4 mt-8 grid grid-cols-3 divide-x divide-line overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
                {listing.bedrooms !== undefined && (
                  <div className="flex flex-col items-center gap-2 px-4 py-5 text-center">
                    <Bed size={26} weight="duotone" className="text-brand" />
                    <strong className="text-2xl font-black leading-none">{listing.bedrooms}</strong>
                    <span className="text-[11px] font-bold uppercase tracking-wide text-muted">Bedrooms</span>
                  </div>
                )}
                {listing.bathrooms !== undefined && (
                  <div className="flex flex-col items-center gap-2 px-4 py-5 text-center">
                    <Bathtub size={26} weight="duotone" className="text-brand" />
                    <strong className="text-2xl font-black leading-none">{listing.bathrooms}</strong>
                    <span className="text-[11px] font-bold uppercase tracking-wide text-muted">Bathrooms</span>
                  </div>
                )}
                {listing.areaSqm !== undefined && (
                  <div className="flex flex-col items-center gap-2 px-4 py-5 text-center">
                    <Ruler size={26} weight="duotone" className="text-brand" />
                    <strong className="text-2xl font-black leading-none">{listing.areaSqm}</strong>
                    <span className="text-[11px] font-bold uppercase tracking-wide text-muted">m² area</span>
                  </div>
                )}
              </div>
            )}

            {/* ── Description ───────────────────────────────────── */}
            <Reveal className="mt-10 border-t border-line pt-10">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">About this property</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight">Property story</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{listing.summary}</p>
            </Reveal>

            {/* ── Features ──────────────────────────────────────── */}
            {listing.features.length > 0 && (
              <div className="mt-10 border-t border-line pt-10">
                <Reveal>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">Included features</p>
                  <h2 className="mt-3 text-2xl font-black tracking-tight">What&apos;s inside</h2>
                </Reveal>
                <GSAPStagger className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {listing.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3.5 shadow-sm"
                    >
                      <CheckCircle size={18} weight="fill" className="shrink-0 text-brand" />
                      <span className="text-sm font-semibold">{feature}</span>
                    </div>
                  ))}
                </GSAPStagger>
              </div>
            )}

            {/* ── Location detail ───────────────────────────────── */}
            <Reveal className="mt-10 border-t border-line pt-10">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">Location</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight">Where it is</h2>
              <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
                {/* Map placeholder — styled area */}
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-brand-soft">
                  <div className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: "linear-gradient(rgba(0,153,214,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,153,214,0.15) 1px, transparent 1px)",
                      backgroundSize: "32px 32px"
                    }}
                  />
                  <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                    <MapPin size={36} weight="fill" className="text-brand" />
                    <p className="font-black text-brand-dark">{listing.location}</p>
                    <p className="text-sm font-semibold text-muted">{listing.district} · Kigali, Rwanda</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 border-t border-line px-5 py-4">
                  <MapPin size={16} weight="fill" className="shrink-0 text-brand" />
                  <p className="text-sm font-semibold">
                    {listing.location}, {listing.district}, Kigali, Rwanda
                  </p>
                </div>
              </div>
            </Reveal>

            {/* ── Trust signals ─────────────────────────────────── */}
            <Reveal className="mt-10 border-t border-line pt-10">
              <div className="overflow-hidden rounded-2xl bg-foreground p-6 text-white shadow-xl">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">
                  Why book through Ipopo Rwanda
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  {(
                    [
                      [ShieldCheck, "Verified listing", "Each property is reviewed with direct contact details confirmed."],
                      [Medal, "Premium media", "High-quality photos for confident viewing decisions."],
                      [Lightning, "Fast response", "WhatsApp or call the agent directly — no delays."],
                    ] as const
                  ).map(([Icon, headline, body]) => (
                    <div key={headline} className="rounded-xl border border-white/10 bg-white/6 p-5">
                      <Icon size={24} weight="duotone" className="mb-4 text-gold" />
                      <h3 className="font-black">{headline}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/65">{body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

          </div>

          {/* ══ Right sidebar ══════════════════════════════════════ */}
          <aside className="mt-10 lg:mt-0">
            <div className="lg:sticky lg:top-24 lg:space-y-4">

              {/* Price card */}
              <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-xl">
                {/* Top color strip */}
                <div className="bg-brand-dark px-6 py-5">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/55">Asking price</p>
                  <p className="mt-1.5 text-4xl font-black text-white">
                    {formatMoney(listing.price, listing.currency)}
                  </p>
                  {isRent && (
                    <p className="mt-1 text-sm font-semibold text-white/60">per month</p>
                  )}
                </div>

                {/* Agent section */}
                <div className="px-6 pt-5 pb-1">
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-soft">
                      <Image src="/logo.png" alt="Ipopo Rwanda" width={28} height={28} className="object-contain" />
                    </div>
                    <div>
                      <p className="font-black text-foreground">{listing.agentName}</p>
                      <p className="text-xs font-semibold text-muted">Ipopo Rwanda Agent</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted">
                    Contact the agent to confirm availability, arrange a viewing, and discuss payment terms.
                  </p>
                </div>

                {/* CTA buttons */}
                <div className="grid gap-3 px-6 pb-6 pt-4">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#16a34a] font-bold text-white shadow-sm transition hover:bg-[#15803d]"
                  >
                    <WhatsappLogo size={20} weight="fill" aria-hidden />
                    WhatsApp agent
                  </a>
                  <a
                    href={`tel:${listing.phone}`}
                    className="flex min-h-[52px] items-center justify-center gap-2.5 rounded-full border border-brand/25 bg-brand-soft font-bold text-brand-dark transition hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <PhoneCall size={18} weight="duotone" aria-hidden />
                    Call now
                  </a>
                </div>

                {/* Viewing checklist */}
                <div className="border-t border-line bg-surface-soft px-6 py-5">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-brand">Viewing tips</p>
                  <ul className="mt-3 space-y-2.5">
                    {[
                      "Confirm time and exact location before visiting.",
                      "Ask about utilities, security, and paperwork.",
                      "Discuss final price and payment options.",
                    ].map((tip) => (
                      <li key={tip} className="flex items-start gap-2 text-sm leading-5 text-muted">
                        <CheckCircle size={14} weight="fill" className="mt-0.5 shrink-0 text-brand" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick listing info card */}
              <div className="hidden rounded-2xl border border-line bg-surface p-5 shadow-sm lg:block">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-muted">Listing details</p>
                <dl className="mt-4 space-y-3">
                  {[
                    ["Type", listing.category.charAt(0).toUpperCase() + listing.category.slice(1)],
                    ["Purpose", isRent ? "For rent" : "For sale"],
                    ["Location", `${listing.location}, ${listing.district}`],
                    ...(listing.bedrooms !== undefined ? [["Bedrooms", String(listing.bedrooms)]] : []),
                    ...(listing.bathrooms !== undefined ? [["Bathrooms", String(listing.bathrooms)]] : []),
                    ...(listing.areaSqm !== undefined ? [["Area", `${listing.areaSqm} m²`]] : []),
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-4">
                      <dt className="text-sm font-semibold text-muted">{label}</dt>
                      <dd className="text-sm font-bold text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

            </div>
          </aside>
        </div>

        {/* ── Similar listings ─────────────────────────────────────── */}
        {similar.length > 0 && (
          <section className="mt-6 border-t border-line bg-surface-soft">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
              <Reveal className="mb-10 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">Similar listings</p>
                  <h2 className="ipopo-title mt-3 text-3xl font-black tracking-normal">
                    You may also like
                  </h2>
                </div>
                <Link href="/properties" className="shrink-0 text-sm font-bold text-brand hover:text-brand-dark">
                  View all →
                </Link>
              </Reveal>
              <GSAPStagger className="grid gap-5 md:grid-cols-3">
                {similar.map((item, i) => (
                  <PropertyCard key={item.id} listing={item} priority={i === 0} />
                ))}
              </GSAPStagger>
            </div>
          </section>
        )}

      </main>

      {/* ── Mobile sticky CTA bar ────────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-lg gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#16a34a] text-sm font-bold text-white shadow-sm transition active:scale-95"
          >
            <WhatsappLogo size={18} weight="fill" aria-hidden />
            WhatsApp
          </a>
          <a
            href={`tel:${listing.phone}`}
            className="flex w-[38%] min-h-[48px] items-center justify-center gap-2 rounded-full border border-brand bg-brand-soft text-sm font-bold text-brand-dark transition active:scale-95"
          >
            <PhoneCall size={16} weight="duotone" aria-hidden />
            Call
          </a>
        </div>
      </div>
    </>
  );
}
