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
import { HeroSlider } from "@/components/hero-slider";
import { ListingSlider } from "@/components/listing-slider";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { CardSwiper } from "@/components/card-swiper";
import { categoryConfigs } from "@/lib/sample-data";
import { getListings } from "@/lib/listings";

const categoryTiles = [
  { label: "Apartments", href: "/properties", image: "/images/hero/kigali-apartment-hero.png" },
  { label: "Luxury villas", href: "/properties", image: "/images/hero/kigali-villa-hero.png" },
  { label: "Land & plots", href: "/properties", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=75" },
  { label: "Commercial", href: "/properties", image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=75" },
  { label: "Cars for rent", href: "/#cars", image: "/images/hero/kigali-car-hero.png" },
  { label: "Cars for sale", href: "/#cars", image: "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=900&q=75" },
  { label: "Kacyiru", href: "/properties", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=75" },
  { label: "Nyarutarama", href: "/properties", image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=900&q=75" },
];

function PromoBanner({
  href,
  image,
  className,
  children,
}: {
  href: string;
  image: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`group relative min-h-[260px] overflow-hidden bg-black md:min-h-[320px] ${className ?? ""}`}>
      <Image
        src={image}
        alt=""
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover opacity-90 transition duration-500 group-hover:scale-[1.025]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.86),rgba(21,17,10,0.55),transparent_78%)]" />
      <div className="absolute inset-y-0 left-0 flex w-[76%] max-w-[520px] flex-col justify-center px-6 text-white sm:px-10">
        {children}
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

        <section className="bg-[linear-gradient(90deg,#050505,#15110a,#050505)] py-5">
          <div className="mx-auto max-w-7xl px-4">
            <CardSwiper>
              {categoryTiles.map((tile) => (
                <Link
                  key={tile.label}
                  href={tile.href}
                  className="group relative block h-44 w-48 overflow-hidden bg-black"
                >
                  <Image
                    src={tile.image}
                    alt={tile.label}
                    fill
                    sizes="192px"
                    className="object-cover opacity-80 transition group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-black/72 px-3 py-3">
                    <p className="text-sm font-black text-white">{tile.label}</p>
                    <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wide text-gold">
                      Explore now
                    </p>
                  </div>
                </Link>
              ))}
            </CardSwiper>
          </div>
        </section>

        <section className="border-y-[3px] border-gold bg-white">
          <Reveal>
            <div className="mx-auto grid max-w-[1368px] gap-[3px] bg-gold md:grid-cols-2">
              <PromoBanner href="/properties" image="/images/hero/kigali-villa-hero.png">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">
                  Ipopo exclusive
                </p>
                <h2 className="mt-3 text-4xl font-black leading-none sm:text-5xl">
                  Kigali luxury homes
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/78">
                  Villas, apartments, land, and investment-ready homes with verified direct enquiries.
                </p>
                <span className="press mt-5 inline-flex w-fit rounded-md bg-gold px-7 py-3 text-xs font-black uppercase tracking-wide text-white shadow-[0_3px_0_rgba(0,0,0,0.16)]">
                  Browse properties
                </span>
              </PromoBanner>

              <PromoBanner href="/#cars" image="/images/hero/kigali-car-hero.png">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">
                  Premium mobility
                </p>
                <h2 className="mt-3 text-4xl font-black leading-none sm:text-5xl">
                  Cars for rent & sale
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/78">
                  Executive SUVs, airport pickups, VIP transfers, and inspected vehicles for sale.
                </p>
                <span className="press mt-5 inline-flex w-fit rounded-md bg-gold px-7 py-3 text-xs font-black uppercase tracking-wide text-white shadow-[0_3px_0_rgba(0,0,0,0.16)]">
                  View cars
                </span>
              </PromoBanner>

              <PromoBanner href="/admin" image="/images/hero/kigali-apartment-hero.png" className="md:col-span-2">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-gold">
                  For owners and agents
                </p>
                <h2 className="mt-3 max-w-2xl text-4xl font-black leading-none sm:text-6xl">
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
        <section className="border-b border-line bg-surface">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/*
             * gap-px + bg-line creates 1-pixel dividers between cells.
             * Single column on mobile, 2-col on sm, 4-col on lg.
             */}
            <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
              {[
                [ShieldCheck, "Verified listings", "Every property is human-reviewed before going live."],
                [Clock3,      "Instant contact",   "WhatsApp and call CTAs on every listing card."],
                [TrendingUp,  "Built to scale",    "Properties, cars, SEO pages, and admin workflows."],
                [Gem,         "Premium UX",        "Motion, optimised media, and a refined design system."],
              ].map(([Icon, title, text], i) => (
                <div key={String(title)} className="flex gap-3.5 bg-surface px-4 py-5 sm:px-6 sm:py-7">
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
            </div>
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

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visibleCategories.map((category, i) => {
              const Icon = category.group === "cars" ? Car : HomeIcon;
              const isPrimary = i % 2 === 0;
              return (
                <Reveal
                  key={category.label}
                  className={`group rounded-2xl border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6 ${
                    isPrimary
                      ? "border-brand/15 bg-gradient-to-br from-brand-soft via-surface to-surface"
                      : "border-gold/15 bg-gradient-to-br from-gold/8 via-surface to-surface"
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
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── Listing sliders ─────────────────────────────────────────── */}
        <ListingSlider
          eyebrow="Homes, villas, apartments"
          title="Properties for rent"
          listings={rentListings}
        />
        <ListingSlider
          eyebrow="Investment and ownership"
          title="Properties for sale"
          listings={saleListings}
          dark
        />
        <ListingSlider
          eyebrow="Mobility marketplace"
          title="Cars for rent and sale"
          listings={cars}
          id="cars"
        />

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

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                [Building2, "Real estate CRM-ready", "Draft listings, Cloudinary image upload, MongoDB storage, and schema room for future owner accounts."],
                [Sparkles,  "Premium storytelling",  "Hero slides, image carousels, trust panels, location blocks, and conversion-focused CTAs."],
                [MapPin,    "SEO location strategy", "Kigali neighborhood surfaces can grow into location-specific search pages."],
                [BadgeCheck,"Vercel performance",    "Static shells, ISR cache, next/image, Geist fonts, and compact client components."],
              ].map(([Icon, title, text]) => (
                <Reveal
                  key={String(title)}
                  className="rounded-2xl border border-line bg-surface p-5 shadow-sm"
                >
                  <Icon className="mb-4 text-brand" size={24} />
                  <h3 className="font-bold">{String(title)}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{String(text)}</p>
                </Reveal>
              ))}
            </div>
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

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
              <Reveal
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
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────── */}
        <section id="contact" className="relative overflow-hidden bg-brand-dark text-white">
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-60" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,147,62,0.18),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(15,107,79,0.35),transparent_45%)]" />

          <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
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
