import Link from "next/link";
import Image from "next/image";
import { PropertyCard } from "@/components/property-card";
import { HeroSlider } from "@/components/hero-slider";
import { ListingGridSection } from "@/components/listing-grid-section";
import { SwiperSection } from "@/components/swiper-section";
import { Reveal } from "@/components/reveal";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
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

export default async function Home() {
  const listings = await getListings();
  const properties = listings.filter((l) => l.group === "properties");
  const cars = listings.filter((l) => l.group === "cars");
  const heroListings = listings.filter((l) => l.featured);
  const rentListings = properties.filter((l) => l.purpose === "rent");
  const saleListings = properties.filter((l) => l.purpose === "sale");

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

      </main>
    </>
  );
}
