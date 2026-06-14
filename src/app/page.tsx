import Link from "next/link";
import {
  ArrowRight,
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
import Image from "next/image";
import { PropertyCard } from "@/components/property-card";
import { HeroSlider } from "@/components/hero-slider";
import { ListingGridSection } from "@/components/listing-grid-section";
import { SwiperSection } from "@/components/swiper-section";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { categoryConfigs } from "@/lib/sample-data";
import { getListings } from "@/lib/listings";

const categoryTiles = [
  { label: "Apartments", href: "/properties", image: "/images/properties/prop-02.jpg" },
  { label: "Luxury villas", href: "/properties", image: "/images/properties/prop-04.jpg" },
  { label: "Land & plots", href: "/properties", image: "/images/properties/prop-12.jpg" },
  { label: "Commercial", href: "/properties", image: "/images/properties/prop-08.jpg" },
  { label: "Cars for rent", href: "/#cars", image: "/images/hero/kigali-car-hero.png" },
  { label: "Cars for sale", href: "/#cars", image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=75" },
  { label: "Kacyiru", href: "/properties", image: "/images/properties/prop-13.jpg" },
  { label: "Nyarutarama", href: "/properties", image: "/images/properties/prop-15.jpg" },
];

function PromoBanner({
  href,
  image,
  className,
  priority,
  children,
}: {
  href: string;
  image: string;
  className?: string;
  priority?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`group relative flex min-h-[250px] overflow-hidden bg-brand-dark sm:min-h-[300px] md:min-h-[340px] ${className ?? ""}`}
    >
      {/* Mobile: image fills behind text at reduced opacity */}
      <div className="absolute inset-0 sm:hidden">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-brand-dark/60" />
      </div>

      {/* Text side — solid background, always readable */}
      <div className="relative z-10 flex flex-col justify-center px-6 py-8 text-white sm:w-[44%] sm:shrink-0 sm:bg-brand-dark sm:px-10">
        {children}
      </div>

      {/* Image side — clean, no overlay, desktop only */}
      <div className="relative hidden flex-1 sm:block">
        <Image
          src={image}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 768px) 35vw, 0vw"
          className="object-cover transition duration-500 group-hover:scale-[1.025]"
        />
      </div>
    </Link>
  );
}

export default async function Home() {
  const listings = await getListings();
  const properties = listings.filter((l) => l.group === "properties");
  const cars = listings.filter((l) => l.group === "cars");
  const heroListings = listings.filter((l) => l.featured);
  const rentListings = properties.filter((l) => l.purpose === "rent");
  const saleListings = properties.filter((l) => l.purpose === "sale");
  const visibleCategories = categoryConfigs.filter((c) => c.visible);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <HeroSlider listings={heroListings.length ? heroListings : listings} />

        <section className="bg-brand-dark py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section header */}
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">
                  Browse by category
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  Find exactly what you&apos;re looking for.
                </h2>
              </div>
              <Link
                href="/properties"
                className="shrink-0 text-sm font-bold text-white/55 transition hover:text-white"
              >
                View all →
              </Link>
            </div>

            <SwiperSection initialView={2.2} sm={4} lg={8} gap={12} nav={false} dark>
              {categoryTiles.map((tile) => (
                <Link
                  key={tile.label}
                  href={tile.href}
                  className="group relative block h-36 overflow-hidden rounded-xl bg-brand sm:h-44"
                >
                  <Image
                    src={tile.image}
                    alt={tile.label}
                    fill
                    sizes="(min-width: 1024px) 180px, (min-width: 640px) 25vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-brand-dark px-3 py-3.5">
                    <p className="text-xs font-black text-white sm:text-sm">{tile.label}</p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-gold sm:text-[11px]">
                      Explore now
                    </p>
                  </div>
                </Link>
              ))}
            </SwiperSection>
          </div>
        </section>

        <section className="border-y-[3px] border-gold bg-white">
          <Reveal>
            <div className="mx-auto grid max-w-[1368px] gap-[3px] bg-gold md:grid-cols-2">
              <PromoBanner href="/properties" image="/images/properties/prop-03.jpg" priority>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">
                  Ipopo exclusive
                </p>
                <h2 className="mt-3 text-3xl font-black leading-none sm:text-5xl">
                  Kigali luxury homes
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/78">
                  Villas, apartments, land, and investment-ready homes with verified direct enquiries.
                </p>
                <span className="press mt-5 inline-flex w-fit rounded-md bg-gold px-7 py-3 text-xs font-black uppercase tracking-wide text-white shadow-[0_3px_0_rgba(0,0,0,0.16)]">
                  Browse properties
                </span>
              </PromoBanner>

              <PromoBanner href="/#cars" image="/images/hero/kigali-car-hero.png" priority>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">
                  Premium mobility
                </p>
                <h2 className="mt-3 text-3xl font-black leading-none sm:text-5xl">
                  Cars for rent & sale
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/78">
                  Executive SUVs, airport pickups, VIP transfers, and inspected vehicles for sale.
                </p>
                <span className="press mt-5 inline-flex w-fit rounded-md bg-gold px-7 py-3 text-xs font-black uppercase tracking-wide text-white shadow-[0_3px_0_rgba(0,0,0,0.16)]">
                  View cars
                </span>
              </PromoBanner>

              <PromoBanner href="/admin" image="/images/properties/prop-07.jpg" className="md:col-span-2">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">
                  For owners and agents
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-black leading-none sm:text-6xl">
                  Turn your listing into a premium digital showroom.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-6 text-white/78 sm:text-base">
                  Upload images, preview cards, save drafts, and prepare property pages built for SEO and fast WhatsApp leads.
                </p>
                <span className="press mt-5 inline-flex w-fit rounded-md bg-gold px-7 py-3 text-xs font-black uppercase tracking-wide text-white shadow-[0_3px_0_rgba(0,0,0,0.16)]">
                  List with Ipopo
                </span>
              </PromoBanner>
            </div>
          </Reveal>
        </section>

        {/* ── Trust strip ─────────────────────────────────────────────── */}
        <section className="border-b border-line bg-surface py-4 sm:py-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SwiperSection initialView={1.1} sm={2} lg={4} gap={0} nav={false}>
              {[
                [ShieldCheck, "Verified listings", "Every property is human-reviewed before going live."],
                [Clock3,      "Instant contact",   "WhatsApp and call CTAs on every listing card."],
                [TrendingUp,  "Built to scale",    "Properties, cars, SEO pages, and admin workflows."],
                [Gem,         "Premium UX",        "Motion, optimised media, and a refined design system."],
              ].map(([Icon, title, text], i) => (
                <div key={String(title)} className="flex gap-3.5 border-r border-line px-4 py-5 last:border-r-0 sm:px-6 sm:py-7">
                  <span className="mt-0.5 grid size-10 flex-none place-items-center rounded-2xl bg-brand-soft text-brand sm:size-11">
                    <Icon size={19} />
                  </span>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand/50">
                      0{i + 1}
                    </p>
                    <h3 className="mt-0.5 text-[15px] font-bold leading-snug">{String(title)}</h3>
                    <p className="mt-1 text-xs leading-[1.6] text-muted sm:text-sm">{String(text)}</p>
                  </div>
                </div>
              ))}
            </SwiperSection>
          </div>
        </section>

        {/* ── Categories ──────────────────────────────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
          <Reveal className="mb-8 sm:mb-10">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
              Marketplace categories
            </p>
            <h2 className="mt-2.5 text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
              Everything valuable, beautifully organized.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-7 text-muted">
              Properties and cars in one focused platform — with direct-to-agent contact built in at every step.
            </p>
          </Reveal>

          <SwiperSection initialView={1.1} sm={2} lg={4} gap={16}>
            {visibleCategories.map((category, i) => {
              const Icon = category.group === "cars" ? Car : HomeIcon;
              const isPrimary = i % 2 === 0;
              return (
                <div
                  key={category.label}
                  className={`group rounded-2xl border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6 ${
                    isPrimary
                      ? "border-brand/15 bg-brand-soft"
                      : "border-gold/15 bg-surface"
                  }`}
                >
                  <div
                    className={`mb-5 flex size-11 items-center justify-center rounded-2xl shadow-sm sm:size-12 ${
                      isPrimary ? "bg-brand text-white" : "bg-gold text-white"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="text-lg font-black tracking-tight sm:text-xl">
                    {category.label}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Curated {category.purpose} opportunities with fast direct enquiries.
                  </p>
                  <p
                    className={`mt-4 text-sm font-bold transition group-hover:translate-x-0.5 ${
                      isPrimary ? "text-brand" : "text-gold"
                    }`}
                  >
                    Explore listings →
                  </p>
                </div>
              );
            })}
          </SwiperSection>
        </section>

        {/* ── Listing sliders ─────────────────────────────────────────── */}
        <ListingGridSection
          id="listings"
          eyebrow="Homes, villas, apartments"
          title="Properties for rent"
          listings={rentListings}
        />
        <ListingGridSection
          eyebrow="Investment and ownership"
          title="Properties for sale"
          listings={saleListings}
          dark
        />
        <ListingGridSection
          eyebrow="Mobility marketplace"
          title="Cars for rent and sale"
          listings={cars}
          id="cars"
          limit={4}
        />

        <section className="border-y border-line bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
            <Reveal className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
                  Owner spotlight
                </p>
                <h2 className="mt-2.5 text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
                  More properties ready for enquiries.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                  A denser homepage section for owners and agents who want their listings visible fast.
                </p>
              </div>
              <Link
                href="/admin"
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-brand px-6 text-sm font-bold text-white shadow-sm shadow-brand/20 transition hover:bg-brand-dark sm:w-fit"
              >
                Add your property
              </Link>
            </Reveal>
            <SwiperSection initialView={1.1} sm={2} lg={4} gap={20}>
              {properties.slice(0, 8).map((listing, index) => (
                <PropertyCard key={`spotlight-${listing.id}`} listing={listing} priority={index < 2} />
              ))}
            </SwiperSection>
          </div>
        </section>

        {/* ── Platform features ───────────────────────────────────────── */}
        <section className="border-y border-line bg-surface-soft">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-[0.78fr_1.22fr] lg:px-8">
            <Reveal>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
                Luxury operating system
              </p>
              <h2 className="mt-2.5 text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
                Designed like a serious business, not a template.
              </h2>
              <p className="mt-4 text-sm leading-8 text-muted">
                Server-rendered pages, optimized images, cached listing data, and small interactive islands where motion matters.
              </p>
              <Link
                href="/admin"
                className="mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-white shadow-sm shadow-brand/25 transition hover:bg-brand-dark"
              >
                Add premium listing <ArrowRight size={16} />
              </Link>
            </Reveal>

            <SwiperSection initialView={1.1} sm={2} gap={16}>
              {[
                [Building2, "Real estate CRM-ready", "Draft listings, Cloudinary image upload, MongoDB storage, and schema room for future owner accounts."],
                [Sparkles,  "Premium storytelling",  "Hero slides, image carousels, trust panels, location blocks, and conversion-focused CTAs."],
                [MapPin,    "SEO location strategy", "Kigali neighborhood surfaces can grow into location-specific search pages."],
                [BadgeCheck,"Vercel performance",    "Static shells, ISR cache, next/image, Geist fonts, and compact client components."],
              ].map(([Icon, title, text]) => (
                <div
                  key={String(title)}
                  className="rounded-2xl border border-line bg-surface p-5 shadow-sm"
                >
                  <Icon className="mb-4 text-brand" size={24} />
                  <h3 className="font-bold">{String(title)}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{String(text)}</p>
                </div>
              ))}
            </SwiperSection>
          </div>
        </section>

        {/* ── Locations ───────────────────────────────────────────────── */}
        <section id="locations" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
          <Reveal className="mb-8 sm:mb-10">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-brand">
              Prime Kigali locations
            </p>
            <h2 className="mt-2.5 text-2xl font-black tracking-tight sm:text-3xl lg:text-4xl">
              Neighborhood intelligence for serious buyers and renters.
            </h2>
          </Reveal>

          <SwiperSection initialView={1.2} sm={2} lg={3} gap={12}>
            {[
              "Kibagabaga",
              "Kacyiru",
              "Nyarutarama",
              "Rebero",
              "Gacuriro",
              "Kimironko",
              "Kimihurura",
              "Kiyovu",
              "Remera",
            ].map((location, i) => (
              <div
                key={location}
                className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-lg sm:p-5"
              >
                <span className="grid size-10 flex-none place-items-center rounded-xl bg-brand-soft text-xs font-black text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold">{location}</p>
                  <p className="mt-0.5 text-xs text-muted">Kigali, Rwanda</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-brand">
                    Hot
                  </span>
                  <span className="text-muted/40 transition duration-200 group-hover:translate-x-0.5 group-hover:text-brand">
                    →
                  </span>
                </div>
              </div>
            ))}
          </SwiperSection>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <section id="contact" className="bg-brand-dark text-white">

          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-14">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">
                  Ready for launch
                </p>
                <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                  A high-end marketplace foundation for Rwanda property and mobility.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base sm:leading-8">
                  Add real listings, connect the Vercel environment variables, and this becomes a polished public marketplace with admin-ready data flow.
                </p>
              </div>

              {/* Buttons — full-width column on mobile, auto on desktop */}
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="/properties"
                  className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-brand-dark transition hover:bg-brand-soft"
                >
                  Browse marketplace <ArrowRight size={16} />
                </Link>
                <Link
                  href="/admin"
                  className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-white/20 px-7 text-sm font-bold transition hover:bg-white hover:text-brand-dark"
                >
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
