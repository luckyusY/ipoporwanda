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

export const revalidate = 300;

const categoryTiles = [
  { label: "Apartments", href: "/properties", image: "/images/properties/prop-02.jpg" },
  { label: "Luxury villas", href: "/properties", image: "/images/properties/prop-04.jpg" },
  { label: "Land & plots", href: "/properties", image: "/images/properties/prop-12.jpg" },
  { label: "Commercial", href: "/properties", image: "/images/properties/prop-08.jpg" },
  { label: "Cars for rent", href: "/#cars", image: "/images/hero/kigali-car-hero.png" },
  { label: "Cars for sale", href: "/#cars", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=75" },
  { label: "Kacyiru", href: "/properties", image: "/images/properties/prop-13.jpg" },
  { label: "Nyarutarama", href: "/properties", image: "/images/properties/prop-15.jpg" },
];

const topLocationCards = [
  { label: "Kacyiru", href: "/properties?q=Kacyiru", image: "/images/locations/kacyiru.jpg" },
  { label: "Nyarutarama", href: "/properties?q=Nyarutarama", image: "/images/locations/nyarutarama.jpg" },
  { label: "Kibagabaga", href: "/properties?q=Kibagabaga", image: "/images/locations/kibagabaga.jpg" },
  { label: "Rebero", href: "/properties?q=Rebero", image: "/images/locations/rebero.jpg" },
  { label: "Gacuriro", href: "/properties?q=Gacuriro", image: "/images/locations/gacuriro.jpg" },
  { label: "Kimihurura", href: "/properties?q=Kimihurura", image: "/images/locations/kimihurura.jpg" },
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

        <section className="bg-[#050505] px-3 pb-4 pt-2 md:hidden">
          <h2 className="mb-3 text-center text-sm font-black uppercase tracking-wide text-white">
            Browse by category
          </h2>
          <div className="grid grid-cols-3 gap-1">
            {categoryTiles.map((tile) => (
              <Link
                key={`mobile-${tile.label}`}
                href={tile.href}
                className="grid min-h-[122px] place-items-center rounded bg-white p-2 text-center text-[13px] font-bold leading-4 text-foreground"
              >
                <span className="relative block h-16 w-full overflow-hidden rounded">
                  <Image
                    src={tile.image}
                    alt={tile.label}
                    fill
                    sizes="33vw"
                    className="object-cover"
                  />
                </span>
                <span>{tile.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-foreground py-10 sm:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="hidden md:block">
            {/* Section header */}
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">
                  Browse by category
                </p>
                <h2 className="ipopo-title ipopo-title-on-dark mt-2 text-2xl font-black tracking-normal sm:text-3xl">
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
                  className="group relative block h-36 overflow-hidden rounded-xl bg-foreground sm:h-44"
                >
                  <Image
                    src={tile.image}
                    alt={tile.label}
                    fill
                    sizes="(min-width: 1024px) 180px, (min-width: 640px) 25vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-foreground px-3 py-3.5">
                    <p className="text-xs font-black text-white sm:text-sm">{tile.label}</p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide text-gold sm:text-[11px]">
                      Explore now
                    </p>
                  </div>
                </Link>
              ))}
            </SwiperSection>
            </div>

            <div id="locations" className="border-t border-white/10 pt-9 md:mt-10 md:pt-10">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">
                    Kigali neighborhoods
                  </p>
                  <h2 className="ipopo-title ipopo-title-on-dark mt-2 text-2xl font-black tracking-normal sm:text-3xl">
                    Where do you want to live?
                  </h2>
                </div>
                <Link
                  href="/properties"
                  className="hidden shrink-0 text-sm font-bold text-white/55 transition hover:text-white sm:inline-flex"
                >
                  View all locations
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
                {topLocationCards.map((location, index) => (
                  <Link
                    key={location.label}
                    href={location.href}
                    className="group relative block aspect-[16/10] overflow-hidden rounded-2xl border border-white/12 bg-foreground shadow-2xl shadow-black/15"
                  >
                    <Image
                      src={location.image}
                      alt={`${location.label} top location design`}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.035]"
                    />
                    <div className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-gold backdrop-blur-sm transition group-hover:bg-brand-dark">
                      View listings
                    </div>
                  </Link>
                ))}
              </div>
            </div>
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
        />

        <section className="content-auto border-y border-line bg-surface">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-20 lg:px-8">
            <Reveal className="mb-8 flex flex-col justify-between gap-4 sm:mb-10 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">
                  Owner spotlight
                </p>
                <h2 className="ipopo-title mt-2.5 text-2xl font-black tracking-normal sm:text-3xl lg:text-4xl">
                  More properties ready for enquiries.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
                  A denser homepage section for visitors who want more verified options without digging.
                </p>
              </div>
              <Link
                href="/properties"
                className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-brand px-6 text-sm font-bold text-white shadow-sm shadow-brand/20 transition hover:bg-brand-dark sm:w-fit"
              >
                View all properties
              </Link>
            </Reveal>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {properties.map((listing, index) => (
                <PropertyCard key={`spotlight-${listing.id}`} listing={listing} priority={index < 2} />
              ))}
            </div>
          </div>
        </section>


      </main>
    </>
  );
}
