import Link from "next/link";
import { Home, PlusCircle } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-background/86 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Ipopo Rwanda home">
          <span className="grid size-10 place-items-center rounded-full bg-brand text-white">
            <Home size={18} aria-hidden />
          </span>
          <span>
            <span className="block text-base font-semibold tracking-tight">Ipopo Rwanda</span>
            <span className="block text-xs text-muted">Premium Kigali properties</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-muted md:flex">
          <Link className="transition hover:text-foreground" href="/properties">
            Properties
          </Link>
          <Link className="transition hover:text-foreground" href="/#locations">
            Locations
          </Link>
          <Link className="transition hover:text-foreground" href="/#contact">
            Contact
          </Link>
        </nav>

        <Link
          href="/admin"
          className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark"
        >
          <PlusCircle size={16} aria-hidden />
          List property
        </Link>
      </div>
    </header>
  );
}
