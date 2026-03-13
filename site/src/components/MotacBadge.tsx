const MOTAC_REG_NUMBER = process.env.NEXT_PUBLIC_MOTAC_REG_NUMBER || "";

export default function MotacBadge() {
  if (!MOTAC_REG_NUMBER) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 py-6 px-6 bg-stone-800/50 rounded-2xl border border-stone-700/50">
      {/* MOTAC Shield Icon */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-amber-900/30 flex items-center justify-center shrink-0">
          <svg
            className="w-6 h-6 text-amber-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase text-stone-500">
            MOTAC Registered Accommodation
          </p>
          <p className="text-sm font-medium text-stone-300">
            Registration No. {MOTAC_REG_NUMBER}
          </p>
        </div>
      </div>
      <a
        href="https://www.motac.gov.my/en/check/registered-hotel"
        target="_blank"
        rel="noopener noreferrer"
        className="min-h-6 inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
      >
        Verify Registration
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </div>
  );
}
