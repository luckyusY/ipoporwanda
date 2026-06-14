import { ChevronDown, MapPin, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const columns = [
  {
    title: "Find Property",
    links: [
      ["Properties for rent", "/properties"],
      ["Properties for sale", "/properties"],
      ["Apartments", "/properties"],
      ["Villas", "/properties"],
      ["Land", "/properties"],
      ["Commercial", "/properties"],
    ],
  },
  {
    title: "Prime Locations",
    links: [
      ["Kibagabaga", "/properties"],
      ["Kacyiru", "/properties"],
      ["Nyarutarama", "/properties"],
      ["Gacuriro", "/properties"],
      ["Kiyovu", "/properties"],
      ["Rebero", "/properties"],
    ],
  },
  {
    title: "Marketplace",
    links: [
      ["Cars for rent", "/#cars"],
      ["Cars for sale", "/#cars"],
      ["Owner listing studio", "/admin"],
      ["Verified listings", "/properties"],
      ["WhatsApp enquiries", "/#contact"],
      ["Vercel deployment", "/#contact"],
    ],
  },
  {
    title: "Ipopo Rwanda",
    links: [
      ["About marketplace", "/#contact"],
      ["List with us", "/admin"],
      ["Contact agent", "/#contact"],
      ["Admin", "/admin"],
      ["SEO areas", "/#locations"],
      ["GitHub project", "https://github.com/luckyusY/ipoporwanda"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#050505] text-white">
      <div className="border-b border-gold/25 bg-[#15110a]">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-xl font-black">Premium Kigali marketplace</p>
            <p className="mt-1 max-w-xl text-sm leading-6 text-white/70">
              Verified properties, direct enquiries, owner listing tools, and a scalable foundation for cars and real estate services.
            </p>
          </div>
          <Link
            href="/admin"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-gold px-6 text-sm font-black text-white"
          >
            List your property
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="grid gap-x-8 md:grid-cols-4">
          {columns.map((column) => (
            <details key={column.title} className="footer-acc border-b border-white/10 py-1 md:border-0 md:py-0" open>
              <summary className="flex items-center justify-between py-3 md:py-0 md:pb-4">
                <span className="text-[15px] font-black md:text-sm md:uppercase md:tracking-wide md:text-gold">
                  {column.title}
                </span>
                <ChevronDown size={18} className="footer-acc-chevron text-white/60 md:hidden" />
              </summary>
              <ul className="footer-acc-body space-y-2.5 pb-3 text-sm text-white/75 md:pb-0">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-white hover:underline">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-7 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.jfif" alt="Ipopo Rwanda" width={80} height={80} className="size-12 rounded-full object-cover" />
            <div>
              <p className="font-black">Ipopo Rwanda</p>
              <p className="text-xs text-white/55">Real estate marketplace</p>
            </div>
          </Link>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 rounded border border-white/20 bg-white/5 px-3 py-2">
              <ShieldCheck size={24} className="text-gold" />
              <span className="text-xs font-bold leading-4">
                Verified listings
                <br />
                <span className="text-white/60">Direct WhatsApp and call leads</span>
              </span>
            </div>
            <div className="flex items-center gap-2 rounded border border-white/20 bg-white/5 px-3 py-2">
              <MapPin size={24} className="text-gold" />
              <span className="text-xs font-bold leading-4">
                Kigali, Rwanda
                <br />
                <span className="text-white/60">Properties and mobility</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#15110a]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Ipopo Rwanda. All rights reserved.</p>
          <p>Built for Vercel, MongoDB, Cloudinary, SEO, and fast enquiries.</p>
        </div>
      </div>
    </footer>
  );
}
