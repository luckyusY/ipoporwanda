import Image from "next/image";
import { notFound } from "next/navigation";
import { Bath, BedDouble, MessageCircle, Phone, Ruler } from "lucide-react";
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
  const listing = listings.find((item) => item.slug === slug);

  if (!listing) notFound();

  return (
    <>
      <SmoothScroll />
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="grid gap-4">
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-surface-soft">
              <Image src={listing.images[0]} alt={listing.title} fill priority sizes="(min-width: 1024px) 65vw, 100vw" className="object-cover" />
            </div>
            {listing.images.length > 1 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {listing.images.slice(1).map((image) => (
                  <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-surface-soft">
                    <Image src={image} alt={listing.title} fill sizes="25vw" className="object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <aside className="h-fit rounded-lg border border-line bg-surface p-5 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand">For {listing.purpose}</p>
            <h1 className="mt-3 text-3xl font-black tracking-tight">{listing.title}</h1>
            <p className="mt-2 text-muted">{listing.location}, {listing.district}</p>
            <p className="mt-5 text-3xl font-black text-brand-dark">{formatMoney(listing.price, listing.currency)}</p>
            <div className="my-6 grid grid-cols-3 gap-2 text-center text-sm">
              <span className="rounded-md bg-surface-soft p-3"><BedDouble className="mx-auto mb-1" size={18} />{listing.bedrooms ?? "-"} beds</span>
              <span className="rounded-md bg-surface-soft p-3"><Bath className="mx-auto mb-1" size={18} />{listing.bathrooms ?? "-"} baths</span>
              <span className="rounded-md bg-surface-soft p-3"><Ruler className="mx-auto mb-1" size={18} />{listing.areaSqm ?? "-"} sqm</span>
            </div>
            <p className="leading-7 text-muted">{listing.summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {listing.features.map((feature) => (
                <span key={feature} className="rounded-full bg-brand-soft px-3 py-1 text-sm font-semibold text-brand-dark">{feature}</span>
              ))}
            </div>
            <div className="mt-7 grid gap-3">
              <a href={toWhatsappUrl(listing.whatsapp, listing.title)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#16a34a] px-5 py-4 font-bold text-white">
                <MessageCircle size={18} /> WhatsApp agent
              </a>
              <a href={`tel:${listing.phone}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/30 bg-brand-soft px-5 py-4 font-bold text-brand-dark">
                <Phone size={18} /> Call now
              </a>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
