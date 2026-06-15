function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`skeleton-shimmer rounded-lg bg-surface-soft ${className}`} />;
}

export function PropertyCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
      <div className="relative h-56 bg-surface-soft sm:h-64 lg:h-60 xl:h-64">
        <SkeletonBlock className="absolute left-3 top-3 h-7 w-20 rounded-md" />
        <SkeletonBlock className="absolute right-3 top-3 h-7 w-24 rounded-md" />
        <SkeletonBlock className="absolute left-3 bottom-12 size-9 rounded-full" />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-brand-dark px-3.5 py-2.5">
          <SkeletonBlock className="h-5 w-28 bg-white/20" />
          <SkeletonBlock className="h-6 w-14 rounded-full bg-white/15" />
        </div>
      </div>

      <div className="grid gap-3 p-4">
        <SkeletonBlock className="h-4 w-36" />
        <SkeletonBlock className="h-5 w-full" />
        <SkeletonBlock className="h-5 w-4/5" />
        <div className="flex gap-3">
          <SkeletonBlock className="h-4 w-16" />
          <SkeletonBlock className="h-4 w-16" />
          <SkeletonBlock className="h-4 w-16" />
        </div>
        <div className="flex gap-2">
          <SkeletonBlock className="h-6 w-24 rounded-full" />
          <SkeletonBlock className="h-6 w-20 rounded-full" />
          <SkeletonBlock className="h-6 w-10 rounded-full" />
        </div>
        <div className="mt-1 flex gap-2">
          <SkeletonBlock className="h-11 flex-1 rounded-full" />
          <SkeletonBlock className="h-11 w-[40%] rounded-full" />
        </div>
      </div>
    </article>
  );
}

export function PropertyGridSkeleton({
  count = 8,
  withFilters = false,
}: {
  count?: number;
  withFilters?: boolean;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      {withFilters ? (
        <>
          <div className="mb-6 rounded-2xl border border-line bg-surface p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row">
              <SkeletonBlock className="h-12 flex-1 rounded-xl" />
              <SkeletonBlock className="h-12 w-full rounded-xl sm:w-38" />
              <SkeletonBlock className="h-12 w-full rounded-xl sm:w-32" />
              <SkeletonBlock className="h-12 w-full rounded-xl sm:w-36" />
            </div>
            <div className="mt-3 flex flex-wrap gap-3">
              <SkeletonBlock className="h-9 w-20 rounded-xl" />
              <SkeletonBlock className="h-9 w-24 rounded-xl" />
              <SkeletonBlock className="h-9 w-24 rounded-xl" />
              <SkeletonBlock className="h-9 w-32 rounded-xl" />
            </div>
          </div>
          <div className="mb-7 flex flex-wrap gap-2">
            {Array.from({ length: 7 }).map((_, index) => (
              <SkeletonBlock key={index} className="h-9 w-24 rounded-full" />
            ))}
          </div>
        </>
      ) : null}

      <div className="mb-5 flex items-center justify-between gap-4">
        <SkeletonBlock className="h-8 w-56" />
        <SkeletonBlock className="h-7 w-24 rounded-full" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: count }).map((_, index) => (
          <PropertyCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
}
