/**
 * Skeleton fallback for the Rooms section, used inside a Suspense boundary.
 * Matches the exact layout (heights, columns, spacing) of <Rooms /> to prevent CLS.
 */
export default function RoomCardSkeleton() {
  return (
    <section className="section-padding bg-white dark:bg-stone-900" aria-busy="true" aria-label="Loading room information">
      <div className="container-custom animate-pulse">
        {/* Header skeleton */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="h-4 w-32 bg-stone-200 dark:bg-stone-700 rounded mx-auto mb-4" />
          <div className="h-9 w-80 bg-stone-200 dark:bg-stone-700 rounded mx-auto mb-6" />
          <div className="space-y-2">
            <div className="h-5 bg-stone-200 dark:bg-stone-700 rounded w-full" />
            <div className="h-5 bg-stone-200 dark:bg-stone-700 rounded w-3/4 mx-auto" />
          </div>
        </div>

        {/* Main showcase skeleton: image gallery + pricing card */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Image gallery skeleton */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            <div className="h-64 md:h-72 rounded-2xl bg-stone-200 dark:bg-stone-700 sm:col-span-2" />
            <div className="h-48 md:h-56 rounded-2xl bg-stone-200 dark:bg-stone-700" />
            <div className="h-48 md:h-56 rounded-2xl bg-stone-200 dark:bg-stone-700" />
          </div>

          {/* Pricing card skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-stone-50 dark:bg-stone-800 rounded-3xl p-8 lg:p-10 h-full flex flex-col">
              {/* Price skeleton */}
              <div className="mb-8">
                <div className="h-3 w-20 bg-stone-200 dark:bg-stone-700 rounded mb-2" />
                <div className="h-12 w-36 bg-stone-200 dark:bg-stone-700 rounded mb-2" />
                <div className="h-4 w-48 bg-stone-200 dark:bg-stone-700 rounded" />
              </div>

              {/* Features skeleton */}
              <div className="space-y-4 grow">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-stone-200 dark:bg-stone-700" />
                    <div className="h-4 w-40 bg-stone-200 dark:bg-stone-700 rounded" />
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t border-stone-200 dark:border-stone-700 my-8" />

              {/* Rates skeleton */}
              <div className="space-y-3 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex justify-between">
                    <div className="h-4 w-24 bg-stone-200 dark:bg-stone-700 rounded" />
                    <div className="h-4 w-20 bg-stone-200 dark:bg-stone-700 rounded" />
                  </div>
                ))}
              </div>

              {/* CTA skeleton */}
              <div className="h-12 bg-stone-200 dark:bg-stone-700 rounded-xl w-full" />
            </div>
          </div>
        </div>

        {/* Hostel highlights skeleton */}
        <div className="mb-16">
          <div className="h-8 w-80 bg-stone-200 dark:bg-stone-700 rounded mx-auto mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-stone-50 dark:bg-stone-800 rounded-2xl p-6">
                <div className="w-12 h-12 rounded-xl bg-stone-200 dark:bg-stone-700 mb-4" />
                <div className="h-5 w-32 bg-stone-200 dark:bg-stone-700 rounded mb-2" />
                <div className="h-4 w-full bg-stone-200 dark:bg-stone-700 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Night market feature skeleton */}
        <div className="bg-stone-100 dark:bg-stone-800 rounded-3xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="h-6 w-36 bg-stone-200 dark:bg-stone-700 rounded-full" />
              <div className="h-10 w-72 bg-stone-200 dark:bg-stone-700 rounded" />
              <div className="h-5 w-full bg-stone-200 dark:bg-stone-700 rounded" />
              <div className="space-y-3">
                <div className="h-4 w-64 bg-stone-200 dark:bg-stone-700 rounded" />
                <div className="h-4 w-56 bg-stone-200 dark:bg-stone-700 rounded" />
                <div className="h-4 w-48 bg-stone-200 dark:bg-stone-700 rounded" />
              </div>
            </div>
            <div className="h-64 md:h-80 rounded-2xl bg-stone-200 dark:bg-stone-700" />
          </div>
        </div>

        {/* Why choose capsule skeleton */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <div className="h-8 w-64 bg-stone-200 dark:bg-stone-700 rounded mx-auto mb-6" />
          <div className="grid sm:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-700 shrink-0" />
                <div className="space-y-2 flex-1">
                  <div className="h-5 w-40 bg-stone-200 dark:bg-stone-700 rounded" />
                  <div className="h-4 w-full bg-stone-200 dark:bg-stone-700 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
