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
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr/ArrowLeft";
import { Check } from "@phosphor-icons/react/dist/ssr/Check";
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
  const hasStats = listing.bedrooms !== undefined || listing.bathrooms !== undefined || listing.areaSqm !== undefined;

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
            className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-foreground"
          >
            <ArrowLeft size={14} weight="bold" />
            Properties
          </Link>
          <PropertyGallery images={listing.images} title={listing.title} />
        </div>

        {/* ── Main grid ────────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:grid lg:grid-cols-[1fr_360px] lg:gap-14 lg:px-8 lg:pt-10">

          {/* ══ Left column ════════════════════════════════════════ */}
          <div className="min-w-0">

            {/* Badges */}
            <div className="page-enter flex flex-wrap items-center gap-2">
              <span className={`rounded-md px-2.5 py-1 text-[11px] font-black uppercase tracking-wider shadow-sm ${isRent ? "bg-brand text-white" : "bg-gold text-foreground"}`}>
                For {listing.purpose}
              </span>
              <span className="rounded-md bg-surface-soft px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-foreground">
                {listing.category}
              </span>
              {listing.featured && (
                <span className="inline-flex items-center gap-1 rounded-md bg-brand-soft px-2.5 py-1 text-[11px] font-black uppercase tracking-wider text-brand-dark">
                  <SealCheck size={12} weight="fill" /> Verified
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="page-enter page-enter-d1 mt-4 max-w-3xl text-3xl font-black leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.65rem]">
              {listing.title}
            </h1>

            {/* Location + inline stats */}
            <div className="page-enter page-enter-d2 mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={14} weight="fill" className="text-brand" />
                {listing.location}, {listing.district}
              </span>
              {hasStats && (
                <>
                  <span className="text-line">·</span>
                  {listing.bedrooms !== undefined && (
                    <span className="inline-flex items-center gap-1.5">
                      <Bed size={14} weight="duotone" />
                      {listing.bedrooms} bed
                    </span>
                  )}
                  {listing.bathrooms !== undefined && (
                    <span className="inline-flex items-center gap-1.5">
                      <Bathtub size={14} weight="duotone" />
                      {listing.bathrooms} bath
                    </span>
                  )}
                  {listing.areaSqm !== undefined && (
                    <span className="inline-flex items-center gap-1.5">
                      <Ruler size={14} weight="duotone" />
                      {listing.areaSqm} m²
                    </span>
                  )}
                </>
              )}
            </div>

            {/* Mobile price — shown only below lg */}
            <div className="page-enter page-enter-d3 mt-5 lg:hidden">
              <p className="text-[11px] font-bold uppercase tracking-widest text-muted">
                {isRent ? "Monthly rent" : "Sale price"}
              </p>
              <p className="mt-1 text-3xl font-black text-foreground">
                {formatMoney(listing.price, listing.currency)}
                {isRent && <span className="ml-2 text-lg font-semibold text-muted">/mo</span>}
              </p>
            </div>

            {/* ── Description ─────────────────────────────────────── */}
            <Reveal className="mt-9 border-t border-line pt-9">
              <p className="text-base leading-8 text-muted max-w-2xl">
                {listing.summary}
              </p>
            </Reveal>

            {/* ── Features ─────────────────────────────────────────── */}
            {listing.features.length > 0 && (
              <Reveal className="mt-9 border-t border-line pt-9">
                <h2 className="text-xl font-black">Features &amp; amenities</h2>
                <ul className="mt-5 grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-8">
                  {listing.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm font-medium text-foreground">
                      <Check size={14} weight="bold" className="shrink-0 text-brand" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {/* ── Property details table ───────────────────────────── */}
            <Reveal className="mt-9 border-t border-line pt-9">
              <h2 className="text-xl font-black">Property details</h2>
              <dl className="mt-5 grid grid-cols-2 gap-x-8 gap-y-0 divide-y divide-line sm:grid-cols-3">
                {[
                  ["Type", listing.category.charAt(0).toUpperCase() + listing.category.slice(1)],
                  ["Purpose", isRent ? "For rent" : "For sale"],
                  ["District", listing.district],
                  ["Location", listing.location],
                  ...(listing.bedrooms !== undefined ? [["Bedrooms", String(listing.bedrooms)]] : []),
                  ...(listing.bathrooms !== undefined ? [["Bathrooms", String(listing.bathrooms)]] : []),
                  ...(listing.areaSqm !== undefined ? [["Floor area", `${listing.areaSqm} m²`]] : []),
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-0.5 py-3.5">
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-muted">{label}</dt>
                    <dd className="text-sm font-bold text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

          </div>

          {/* ══ Right sidebar ══════════════════════════════════════ */}
          <aside className="mt-10 lg:mt-0">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-line bg-surface shadow-xl overflow-hidden">

                {/* Price */}
                <div className="px-6 pt-6 pb-5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted">
                    {isRent ? "Monthly rent" : "Sale price"}
                  </p>
                  <p className="mt-2 text-4xl font-black leading-none text-foreground">
                    {formatMoney(listing.price, listing.currency)}
                  </p>
                  {isRent && (
                    <p className="mt-1.5 text-sm font-semibold text-muted">per month</p>
                  )}
                </div>

                {/* CTAs */}
                <div className="grid gap-3 border-t border-line px-6 py-5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-[#16a34a] text-sm font-bold text-white shadow-sm transition hover:bg-[#15803d] active:scale-[.98]"
                  >
                    <WhatsappLogo size={19} weight="fill" aria-hidden />
                    WhatsApp agent
                  </a>
                  <a
                    href={`tel:${listing.phone}`}
                    className="flex min-h-[52px] items-center justify-center gap-2.5 rounded-full border border-line bg-surface-soft text-sm font-bold text-foreground transition hover:border-brand hover:text-brand active:scale-[.98]"
                  >
                    <PhoneCall size={17} weight="duotone" aria-hidden />
                    Call now
                  </a>
                </div>

                {/* Agent */}
                <div className="flex items-center gap-3 border-t border-line px-6 py-4">
                  <div className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full border border-line bg-brand-soft">
                    <Image src="/logo.png" alt="Ipopo Rwanda" width={24} height={24} className="object-contain" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{listing.agentName}</p>
                    <p className="text-xs text-muted">Ipopo Rwanda</p>
                  </div>
                </div>

                {/* Minimal tips */}
                <div className="border-t border-line bg-surface-soft px-6 py-5">
                  <ul className="space-y-2">
                    {[
                      "Confirm the viewing time before visiting.",
                      "Ask about utilities, docs, and access road.",
                      "Discuss final price and payment terms.",
                    ].map((tip) => (
                      <li key={tip} className="flex gap-2 text-[12px] leading-[1.5] text-muted">
                        <span className="mt-1 size-1 shrink-0 rounded-full bg-brand" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </aside>
        </div>

        {/* ── Similar listings ─────────────────────────────────────── */}
        {similar.length > 0 && (
          <section className="border-t border-line">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
              <Reveal className="mb-10 flex items-end justify-between gap-4">
                <h2 className="text-2xl font-black sm:text-3xl">
                  More in {listing.location}
                </h2>
                <Link href="/properties" className="shrink-0 text-sm font-semibold text-muted transition hover:text-foreground">
                  View all →
                </Link>
              </Reveal>
              <GSAPStagger className="grid gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3">
                {similar.map((item, i) => (
                  <PropertyCard key={item.id} listing={item} priority={i === 0} />
                ))}
              </GSAPStagger>
            </div>
          </section>
        )}

      </main>

      {/* ── Mobile sticky CTA ────────────────────────────────────── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-lg gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#16a34a] text-sm font-bold text-white transition active:scale-[.98]"
          >
            <WhatsappLogo size={17} weight="fill" aria-hidden />
            WhatsApp
          </a>
          <a
            href={`tel:${listing.phone}`}
            className="flex w-[38%] min-h-[48px] items-center justify-center gap-2 rounded-full border border-line bg-surface-soft text-sm font-bold text-foreground transition hover:border-brand hover:text-brand active:scale-[.98]"
          >
            <PhoneCall size={15} weight="duotone" aria-hidden />
            Call
          </a>
        </div>
      </div>
    </>
  );
}
