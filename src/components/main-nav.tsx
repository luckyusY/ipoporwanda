"use client";

import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const departments = [
  {
    label: "Properties",
    href: "/properties",
    columns: [
      ["For rent", "Apartments", "Villas", "Family houses"],
      ["For sale", "Land", "Commercial", "Investment homes"],
      ["Locations", "Kacyiru", "Kibagabaga", "Nyarutarama"],
    ],
    promo: "Verified homes, apartments, villas, land, offices, and retail spaces across Kigali.",
  },
  {
    label: "Cars",
    href: "/#cars",
    columns: [
      ["For rent", "Executive SUVs", "Airport pickup", "VIP transfer"],
      ["For sale", "4x4 vehicles", "Family cars", "Inspected stock"],
      ["Services", "Chauffeur", "Event fleets", "Viewing by appointment"],
    ],
    promo: "Premium mobility listings with direct WhatsApp and call contact.",
  },
  {
    label: "Locations",
    href: "/#locations",
    columns: [
      ["Hot areas", "Kibagabaga", "Kacyiru", "Gacuriro"],
      ["Luxury areas", "Nyarutarama", "Kiyovu", "Kimihurura"],
      ["Growth areas", "Rebero", "Kanombe", "Remera"],
    ],
    promo: "Turn every major Kigali neighborhood into a high-intent SEO landing page.",
  },
  {
    label: "Owners",
    href: "/admin",
    columns: [
      ["List property", "Upload images", "Preview cards", "Save drafts"],
      ["Marketing", "SEO metadata", "WhatsApp leads", "Verified badges"],
      ["Admin", "MongoDB", "Cloudinary", "Vercel"],
    ],
    promo: "A listing studio for serious owners and agents who want premium presentation.",
  },
];

export function MainNav() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const active = departments.find((item) => item.label === openMenu);

  return (
    <nav
      onMouseLeave={() => setOpenMenu(null)}
      className="relative hidden border-y border-gold/35 bg-brand-dark text-white md:block"
    >
      <div className="mx-auto flex max-w-[1440px] items-center gap-2 px-4 2xl:px-6">
        <Link
          href="/properties"
          onMouseEnter={() => setOpenMenu("Properties")}
          className="flex shrink-0 items-center gap-2 px-3 py-2 text-sm font-bold"
        >
          <Menu aria-hidden size={18} />
          Departments
        </Link>
        {departments.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            onMouseEnter={() => setOpenMenu(item.label)}
            onFocus={() => setOpenMenu(item.label)}
            className={`flex shrink-0 items-center gap-1 px-4 py-2 text-sm font-semibold ${
              openMenu === item.label ? "bg-ipopo-blue text-white" : "hover:bg-[#0f5138]"
            }`}
          >
            {item.label}
            <ChevronDown aria-hidden size={15} />
          </Link>
        ))}
        <div className="ml-auto hidden items-center gap-5 text-sm font-semibold lg:flex">
          <Link href="/properties">Top listings</Link>
          <Link href="/#locations">Kigali areas</Link>
          <Link href="/admin">List now</Link>
        </div>
      </div>

      {active ? (
        <div className="absolute left-1/2 top-full z-[90] w-[min(980px,calc(100vw-32px))] -translate-x-1/2 bg-white p-5 text-[#111827] shadow-2xl ring-1 ring-black/10">
          <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-black">{active.label}</h3>
                <Link href={active.href} className="text-sm font-bold text-gold">
                  See all
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {active.columns.map((column) => (
                  <div key={column[0]}>
                    <p className="mb-2 text-sm font-black text-[#15110a]">{column[0]}</p>
                    <div className="grid gap-2">
                      {column.slice(1).map((label) => (
                        <Link
                          key={label}
                          href={active.href}
                          className="rounded border border-[#e7ddc7] bg-[#f8fafc] p-3 text-sm font-bold hover:border-gold"
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-brand-dark p-5 text-white">
              <p className="text-xs font-black uppercase tracking-wider text-gold">Ipopo advantage</p>
              <h4 className="mt-2 text-2xl font-black">Marketplace with real estate depth.</h4>
              <p className="mt-3 text-sm leading-6 text-white/75">{active.promo}</p>
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
}
