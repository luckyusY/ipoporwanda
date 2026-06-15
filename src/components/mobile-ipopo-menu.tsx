"use client";

import {
  ArrowLeft,
  Building2,
  CarFront,
  ChevronRight,
  Home,
  KeyRound,
  MapPin,
  Menu,
  Phone,
  PlusCircle,
  Search,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type MenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  image: string;
  children?: MenuItem[];
};

const tabs = ["Properties", "Locations", "Cars", "Owners"] as const;

const propertyRows: MenuItem[] = [
  {
    label: "Properties for rent",
    href: "/properties?purpose=rent",
    icon: KeyRound,
    image: "/images/properties/prop-04.jpg",
    children: [
      { label: "Apartments", href: "/properties?purpose=rent&category=apartment", icon: Building2, image: "/images/properties/prop-02.jpg" },
      { label: "Villas", href: "/properties?purpose=rent&category=villa", icon: Home, image: "/images/properties/prop-04.jpg" },
      { label: "Family houses", href: "/properties?purpose=rent&category=house", icon: Home, image: "/images/properties/prop-06.jpg" },
      { label: "Offices", href: "/properties?purpose=rent&category=office", icon: Building2, image: "/images/properties/prop-08.jpg" },
    ],
  },
  {
    label: "Properties for sale",
    href: "/properties?purpose=sale",
    icon: Building2,
    image: "/images/properties/prop-12.jpg",
    children: [
      { label: "Land and plots", href: "/properties?purpose=sale&category=land", icon: MapPin, image: "/images/properties/prop-12.jpg" },
      { label: "Investment homes", href: "/properties?purpose=sale", icon: Sparkles, image: "/images/properties/prop-15.jpg" },
      { label: "Commercial spaces", href: "/properties?purpose=sale&category=commercial", icon: Building2, image: "/images/properties/prop-08.jpg" },
    ],
  },
  { label: "Verified listings", href: "/properties", icon: Sparkles, image: "/images/properties/prop-13.jpg" },
  { label: "Call Ipopo", href: "tel:+250788334207", icon: Phone, image: "/images/locations/kacyiru.jpg" },
];

const locationRows: MenuItem[] = [
  { label: "Kacyiru", href: "/properties?q=Kacyiru", icon: MapPin, image: "/images/locations/kacyiru.jpg" },
  { label: "Nyarutarama", href: "/properties?q=Nyarutarama", icon: MapPin, image: "/images/locations/nyarutarama.jpg" },
  { label: "Kibagabaga", href: "/properties?q=Kibagabaga", icon: MapPin, image: "/images/locations/kibagabaga.jpg" },
  { label: "Gacuriro", href: "/properties?q=Gacuriro", icon: MapPin, image: "/images/locations/gacuriro.jpg" },
  { label: "Kimihurura", href: "/properties?q=Kimihurura", icon: MapPin, image: "/images/locations/kimihurura.jpg" },
  { label: "Rebero", href: "/properties?q=Rebero", icon: MapPin, image: "/images/locations/rebero.jpg" },
];

const carRows: MenuItem[] = [
  { label: "Cars for rent", href: "/#cars", icon: CarFront, image: "/images/hero/kigali-car-hero.png" },
  { label: "Cars for sale", href: "/#cars", icon: CarFront, image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=220&q=75" },
  { label: "VIP transfer", href: "/#cars", icon: Sparkles, image: "/images/hero/kigali-car-hero.png" },
];

const ownerRows: MenuItem[] = [
  { label: "List a property", href: "/admin", icon: PlusCircle, image: "/images/properties/prop-04.jpg" },
  { label: "Upload images", href: "/admin", icon: Sparkles, image: "/images/properties/prop-02.jpg" },
  { label: "Preview listing cards", href: "/admin", icon: Search, image: "/images/properties/prop-13.jpg" },
];

const rowsByTab = {
  Properties: propertyRows,
  Locations: locationRows,
  Cars: carRows,
  Owners: ownerRows,
};

export function MobileIpopoMenu() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Properties");
  const [activeDepartment, setActiveDepartment] = useState<MenuItem | null>(null);

  const close = () => {
    setOpen(false);
    setActiveDepartment(null);
  };

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("no-scroll");
    return () => document.body.classList.remove("no-scroll");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-[100] border-t border-gold/45 bg-brand-dark text-white shadow-[0_-4px_20px_rgba(0,0,0,0.28)] md:hidden">
        <div className="grid grid-cols-5 text-[10px] font-bold">
          <Link href="/" className="grid place-items-center gap-0.5 py-1.5">
            <Home size={22} />
            Home
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(true);
              setActiveDepartment(null);
            }}
            className="grid place-items-center gap-0.5 border-t-4 border-gold py-1 text-gold"
          >
            <Menu size={25} />
            Browse
          </button>
          <Link href="/properties" className="grid place-items-center gap-0.5 py-1.5">
            <Building2 size={22} />
            Listings
          </Link>
          <Link href="/#locations" className="grid place-items-center gap-0.5 py-1.5">
            <MapPin size={22} />
            Areas
          </Link>
          <Link href="/admin" className="grid place-items-center gap-0.5 py-1.5">
            <PlusCircle size={22} />
            List
          </Link>
        </div>
      </div>

      {open ? (
        <div className="sheet-backdrop fixed inset-0 z-[90] bg-black/55 md:hidden" onClick={close}>
          <div
            className="sheet-panel absolute inset-x-2 bottom-16 top-14 overflow-hidden rounded-t-xl bg-[#f4f5f0] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-1.5 z-10 mx-auto h-1 w-10 rounded-full bg-white/55" />
            <button
              type="button"
              aria-label="Close menu"
              onClick={close}
              className="absolute right-2 top-2 z-20 grid size-8 place-items-center rounded-full bg-brand-dark text-gold ring-1 ring-gold/35"
            >
              <X size={20} />
            </button>
            <div className="flex overflow-x-auto bg-brand-dark px-2 pt-3">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab);
                    setActiveDepartment(null);
                  }}
                  className={`shrink-0 rounded-t px-4 py-3 text-base font-black ${
                    activeTab === tab ? "bg-white text-brand-dark" : "bg-[#00557b] text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="h-[calc(100%-56px)] overflow-y-auto p-3 text-foreground">
              {activeDepartment ? (
                <DepartmentPanel
                  department={activeDepartment}
                  onBack={() => setActiveDepartment(null)}
                  onNavigate={close}
                />
              ) : (
                <>
                  <ShortcutPills onNavigate={close} />
                  {rowsByTab[activeTab].map((item) => (
                    <MenuRow
                      key={item.label}
                      item={item}
                      onNavigate={close}
                      onOpenChildren={setActiveDepartment}
                    />
                  ))}
                  <div className="mt-6 rounded-lg bg-white p-4 shadow-sm ring-1 ring-black/5">
                    <p className="text-lg font-black text-brand-dark">Ipopo Rwanda</p>
                    <p className="mt-1 text-sm font-medium leading-6 text-muted">
                      Premium homes, cars, locations, and direct owner enquiries in Kigali.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function ShortcutPills({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="relative mb-3 -mr-3 overflow-hidden">
      <div className="flex gap-2 overflow-x-auto pb-1 pr-8">
        {[
          { label: "For rent", href: "/properties?purpose=rent", icon: KeyRound },
          { label: "For sale", href: "/properties?purpose=sale", icon: Building2 },
          { label: "Top areas", href: "/#locations", icon: MapPin },
          { label: "WhatsApp", href: "https://wa.me/250788334207", icon: Phone },
        ].map((pill) => {
          const Icon = pill.icon;
          return (
            <Link
              key={pill.label}
              href={pill.href}
              onClick={onNavigate}
              className="inline-flex min-h-9 shrink-0 items-center gap-1 rounded-full border border-line bg-white px-3 py-1 text-sm font-bold text-brand-dark shadow-sm"
            >
              <Icon size={15} />
              {pill.label}
            </Link>
          );
        })}
      </div>
      <span className="pointer-events-none absolute bottom-1 right-0 top-0 w-10 bg-gradient-to-l from-[#f4f5f0] to-transparent" />
    </div>
  );
}

function DepartmentPanel({
  department,
  onBack,
  onNavigate,
}: {
  department: MenuItem;
  onBack: () => void;
  onNavigate?: () => void;
}) {
  return (
    <div className="panel-slide-in">
      <button
        type="button"
        onClick={onBack}
        className="mb-7 inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wide text-muted"
      >
        <ArrowLeft size={13} /> Back
      </button>
      <h2 className="ipopo-title mb-5 text-[28px] font-black leading-none">
        {department.label}
      </h2>
      {(department.children ?? []).map((item) => (
        <MenuRow key={item.label} item={item} onNavigate={onNavigate} />
      ))}
    </div>
  );
}

function MenuRow({
  item,
  onNavigate,
  onOpenChildren,
}: {
  item: MenuItem;
  onNavigate?: () => void;
  onOpenChildren?: (item: MenuItem) => void;
}) {
  const Icon = item.icon;
  const content = (
    <>
      <span className="relative grid h-14 w-16 shrink-0 place-items-center overflow-hidden rounded border border-gold/35 bg-white text-brand">
        <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
        <span className="absolute left-0 top-0 grid size-5 place-items-center rounded-br bg-white/95 text-brand-dark">
          <Icon size={13} strokeWidth={2.3} />
        </span>
      </span>
      <span className="flex-1">{item.label}</span>
      <ChevronRight size={25} className="text-brand-dark" />
    </>
  );

  if (item.children?.length && onOpenChildren) {
    return (
      <button
        type="button"
        onClick={() => onOpenChildren(item)}
        className="mb-1.5 flex min-h-[72px] w-full items-center gap-4 rounded bg-white px-3 text-left text-lg font-semibold text-foreground shadow-sm ring-1 ring-black/5"
      >
        {content}
      </button>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className="mb-1.5 flex min-h-[72px] items-center gap-4 rounded bg-white px-3 text-lg font-semibold text-foreground shadow-sm ring-1 ring-black/5"
    >
      {content}
    </Link>
  );
}
