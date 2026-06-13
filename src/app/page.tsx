import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock3, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { PropertyCard } from "@/components/property-card";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { categoryConfigs } from "@/lib/sample-data";
import { getListings } from "@/lib/listings";

export default async function Home() {
  const listings = await getListings();
  const featured = listings.filter((listing) => listing.featured).slice(0, 3);
  const visibleCategories = categoryConfigs.filter((category) => category.visible);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Ipopo Rwanda",
    areaServed: "Kigali, Rwanda",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ipoporwa.vercel.app",
    telephone: "+250788000000",
  };

  return (
    <>
      <SmoothScroll />
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main>
        <section className="grain border-b border-line">
          <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <Reveal className="max-w-3xl">
              <p className="mb-5 inline-flex rounded-full border border-brand/20 bg-brand-soft px-4 py-2 text-sm font-bold text-brand-dark">
                Verified premium listings in Kigali
              </p>
              <h1 className="text-balance text-5xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Find a Kigali home that feels right before you visit.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
                Ipopo Rwanda brings together curated houses, villas, apartments, offices, land, and investment properties with instant WhatsApp and call enquiries.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/properties" className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-4 text-sm font-bold text-white transition hover:bg-brand-dark">
                  Browse properties <ArrowRight size={17} />
                </Link>
                <Link href="/admin" className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/25 bg-white px-6 py-4 text-sm font-bold text-brand-dark transition hover:border-brand">
                  Submit a listing
                </Link>
              </div>
            </Reveal>

            <Reveal className="grid gap-4">
              <div className="rounded-lg border border-line bg-white p-4 shadow-xl">
                {featured[0] ? <PropertyCard listing={featured[0]} priority /> : null}
              </div>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  ["236+", "Listings ready"],
                  ["24h", "Fast response"],
                  ["SEO", "Built to rank"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-lg border border-line bg-white p-4">
                    <strong className="block text-2xl text-brand-dark">{value}</strong>
                    <span className="text-xs font-medium text-muted">{label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">Live categories</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight">Properties first, expansion ready</h2>
            </div>
            <p className="max-w-xl text-muted">
              Cars for sale and rent are already modeled for later, but hidden from the public navigation so the launch stays focused.
            </p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2">
            {visibleCategories.map((category) => (
              <Reveal key={category.label} className="rounded-lg border border-line bg-surface p-6 shadow-sm">
                <div className="mb-8 flex size-12 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <Sparkles size={22} />
                </div>
                <h3 className="text-2xl font-bold">{category.label}</h3>
                <p className="mt-3 text-muted">
                  Curated {category.purpose} opportunities across houses, apartments, villas, land, offices, and retail spaces.
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="border-y border-line bg-surface-soft">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <Reveal className="mb-10 flex items-end justify-between gap-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">Featured</p>
                <h2 className="mt-3 text-4xl font-black tracking-tight">Premium properties</h2>
              </div>
              <Link href="/properties" className="hidden text-sm font-bold text-brand hover:text-brand-dark sm:inline-flex">
                View all
              </Link>
            </Reveal>
            <div className="grid gap-6 md:grid-cols-3">
              {featured.map((listing, index) => (
                <Reveal key={listing.id}>
                  <PropertyCard listing={listing} priority={index === 0} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="locations" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">Prime Kigali locations</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight">Location pages can become SEO landing pages.</h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {["Kibagabaga", "Kacyiru", "Nyarutarama", "Rebero", "Gacuriro", "Kimironko"].map((location) => (
                <div key={location} className="flex items-center gap-3 rounded-lg border border-line bg-surface p-4">
                  <MapPin className="text-brand" size={20} />
                  <span className="font-semibold">{location}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="contact" className="bg-brand-dark text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            {[
              [ShieldCheck, "Verified listings", "Every listing can be reviewed before publishing."],
              [Clock3, "Fast enquiries", "WhatsApp and call buttons are always visible on cards."],
              [BadgeCheck, "Built for Vercel", "Optimized images, server components, SEO metadata, and small client islands."],
            ].map(([Icon, title, text]) => (
              <div key={String(title)} className="rounded-lg border border-white/10 bg-white/5 p-5">
                <Icon className="mb-5 text-gold" size={28} />
                <h3 className="text-xl font-bold">{String(title)}</h3>
                <p className="mt-2 text-sm leading-6 text-white/72">{String(text)}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
