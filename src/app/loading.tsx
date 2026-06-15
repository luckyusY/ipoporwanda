import { PropertyGridSkeleton } from "@/components/property-card-skeleton";
import { SiteHeader } from "@/components/site-header";

export default function Loading() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-foreground">
          <div className="mx-auto grid min-h-[70svh] max-w-7xl items-end px-4 pb-10 pt-24 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="skeleton-shimmer h-4 w-36 rounded-full bg-white/15" />
              <div className="skeleton-shimmer mt-5 h-14 w-full rounded-xl bg-white/15 sm:h-20" />
              <div className="skeleton-shimmer mt-3 h-14 w-4/5 rounded-xl bg-white/15 sm:h-20" />
              <div className="skeleton-shimmer mt-6 h-12 w-full max-w-2xl rounded-full bg-white/15" />
            </div>
          </div>
        </section>
        <PropertyGridSkeleton count={8} />
      </main>
    </>
  );
}
