import { PropertyGridSkeleton } from "@/components/property-card-skeleton";
import { SiteHeader } from "@/components/site-header";

export default function PropertiesLoading() {
  return (
    <>
      <SiteHeader />
      <main>
        <div className="border-b border-line bg-surface-soft">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="skeleton-shimmer h-4 w-36 rounded-full bg-brand/15" />
            <div className="skeleton-shimmer mt-4 h-12 w-full max-w-xl rounded-xl bg-surface" />
            <div className="skeleton-shimmer mt-3 h-5 w-full max-w-lg rounded-full bg-surface" />
          </div>
        </div>
        <PropertyGridSkeleton count={9} withFilters />
      </main>
    </>
  );
}
