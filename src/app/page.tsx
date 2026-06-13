import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  Car,
  Clock3,
  Gem,
  Home as HomeIcon,
  MapPin,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { HeroSlider } from "@/components/hero-slider";
import { ListingSlider } from "@/components/listing-slider";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { categoryConfigs } from "@/lib/sample-data";
import { getListings } from "@/lib/listings";

export default async function Home() {
  const listings = await getListings();
  const properties = listings.filter((listing) => listing.group === "properties");
  const cars = listings.filter((listing) => listing.group === "cars");
  const heroListings = listings.filter((listing) => listing.featured);
  const rentListings = properties.filter((listing) => listing.purpose === "rent");
  const saleListings = properties.filter((listing) => listing.purpose === "sale");
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
        <HeroSlider listings={heroListings.length ? heroListings : listings} />

        <section className="border-b border-line bg-surface">
          <div className="mx-auto grid max-w-7xl gap-3 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
            {[
              [ShieldCheck, "Verified marketplace", "Human-reviewed listings before publishing."],
              [Clock3, "Instant enquiry", "WhatsApp and call CTAs on every card."],
              [TrendingUp, "Built to scale", "Properties, cars, SEO pages, and admin workflows."],
              [Gem, "Premium experience", "Motion, smooth scroll, optimized media, sharp UI."],
            ].map(([Icon, title, text]) => (
              <div key={String(title)} className="flex gap-4 rounded-lg border border-line bg-background p-4">
                <span className="grid size-11 flex-none place-items-center rounded-full bg-brand-soft text-brand">
                  <Icon size={20} />
                </span>
                <div>
                  <h2 className="font-bold">{String(title)}</h2>
                  <p className="mt-1 text-sm leading-6 text-muted">{String(text)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">Marketplace categories</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight">Everything valuable, beautifully organized.</h2>
            </div>
            <p className="max-w-xl text-muted">
              The platform now supports properties and cars, with focused sections that can become full landing pages as inventory grows.
            </p>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {visibleCategories.map((category) => {
              const Icon = category.group === "cars" ? Car : HomeIcon;
              return (
                <Reveal key={category.label} className="rounded-lg border border-line bg-surface p-5 shadow-sm">
                  <div className="mb-8 flex size-12 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-2xl font-bold">{category.label}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    Curated {category.purpose} opportunities with fast direct enquiries and premium media.
                  </p>
                </Reveal>
              );
            })}
          </div>
        </section>

        <ListingSlider eyebrow="Homes, villas, apartments" title="Properties for rent" listings={rentListings} />
        <ListingSlider eyebrow="Investment and ownership" title="Properties for sale" listings={saleListings} dark />
        <ListingSlider eyebrow="Mobility marketplace" title="Cars for rent and sale" listings={cars} />

        <section className="border-y border-line bg-surface-soft">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">Luxury operating system</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight">Designed like a serious business, not a template.</h2>
              <p className="mt-5 leading-8 text-muted">
                The homepage gives buyers, renters, owners, and vehicle clients a clear path. The build stays fast with server-rendered pages, optimized images, cached listing data, and small interactive islands only where motion matters.
              </p>
              <Link
                href="/admin"
                className="mt-7 inline-flex rounded-full bg-brand px-6 py-4 text-sm font-bold text-white transition hover:bg-brand-dark"
              >
                Add premium listing
              </Link>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [Building2, "Real estate CRM-ready", "Draft listings, Cloudinary image upload, MongoDB storage, and schema room for future owner accounts."],
                [Sparkles, "Premium storytelling", "Hero slides, image carousels, trust panels, location blocks, and conversion-focused CTAs."],
                [MapPin, "SEO location strategy", "Kigali neighborhood surfaces can grow into location-specific search pages."],
                [BadgeCheck, "Vercel performance", "Static shells, ISR cache, next/image, Geist fonts, and compact client components."],
              ].map(([Icon, title, text]) => (
                <Reveal key={String(title)} className="rounded-lg border border-line bg-surface p-5">
                  <Icon className="mb-8 text-brand" size={30} />
                  <h3 className="text-xl font-bold">{String(title)}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{String(text)}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="locations" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Reveal className="mb-9">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">Prime Kigali locations</p>
            <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight">Neighborhood intelligence for serious buyers and renters.</h2>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {["Kibagabaga", "Kacyiru", "Nyarutarama", "Rebero", "Gacuriro", "Kimironko", "Kimihurura", "Kiyovu", "Remera"].map((location) => (
              <Reveal key={location} className="flex items-center justify-between rounded-lg border border-line bg-surface p-4">
                <span className="flex items-center gap-3 font-semibold">
                  <MapPin className="text-brand" size={20} />
                  {location}
                </span>
                <span className="rounded-full bg-brand-soft px-3 py-1 text-xs font-bold text-brand-dark">Hot area</span>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="contact" className="bg-brand-dark text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-gold">Ready for launch</p>
                <h2 className="mt-3 max-w-3xl text-4xl font-black tracking-tight">A high-end marketplace foundation for Rwanda property and mobility.</h2>
                <p className="mt-4 max-w-2xl text-white/72">
                  Add real listings, connect the Vercel environment variables, and this becomes a polished public marketplace with admin-ready data flow.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/properties" className="rounded-full bg-white px-6 py-4 text-center text-sm font-bold text-brand-dark transition hover:bg-brand-soft">
                  Browse marketplace
                </Link>
                <Link href="/admin" className="rounded-full border border-white/25 px-6 py-4 text-center text-sm font-bold transition hover:bg-white hover:text-brand-dark">
                  List now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
