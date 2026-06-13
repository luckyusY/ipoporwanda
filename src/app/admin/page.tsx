import type { Metadata } from "next";
import { ListingForm } from "@/components/listing-form";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Owner Listing Studio",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const cards = [
    ["Drafts", "Save listings privately before publishing."],
    ["Cloudinary", "Uploaded images are optimized from Cloudinary."],
    ["MongoDB", "Listings are stored in the Vercel server route."],
    ["SEO", "Published listings get detail pages and metadata."],
  ];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">Admin</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight">Owner listing studio</h1>
          <p className="mt-3 max-w-2xl text-muted">
            Add property details, preview images instantly, and save a draft. Public publishing can be controlled from the database or a fuller auth dashboard later.
          </p>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(([title, text]) => (
            <div key={title} className="rounded-lg border border-line bg-surface p-4 shadow-sm">
              <h2 className="font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
            </div>
          ))}
        </div>

        <ListingForm />
      </main>
    </>
  );
}
