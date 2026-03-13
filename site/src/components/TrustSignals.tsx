export default function TrustSignals() {
  return (
    <div className="mt-10 max-w-4xl mx-auto">
      <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 md:p-8 border border-stone-200 dark:border-stone-700 shadow-sm">
        <div className="grid sm:grid-cols-3 gap-6">
          {/* SSL Secured Badge */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-green-700 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                SSL Secured
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                256-bit encrypted connection. Your data is protected.
              </p>
            </div>
          </div>

          {/* No Hidden Fees */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-amber-700 dark:text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                No Hidden Fees
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                Room rate + TTx (RM10/room/night) only. No booking fees, no service charges, no surprises.
              </p>
            </div>
          </div>

          {/* Best Price Guarantee */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <svg
                className="w-5 h-5 text-blue-700 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                Best Price Guarantee
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                Found it cheaper on an OTA? We&apos;ll match it — no questions asked.
              </p>
            </div>
          </div>
        </div>

        {/* Fee Transparency Summary */}
        <div className="mt-6 pt-5 border-t border-stone-100 dark:border-stone-800">
          <p className="text-xs text-center text-stone-500 dark:text-stone-400">
            <span className="font-medium text-stone-700 dark:text-stone-300">
              Total cost = Room rate + Tourism Tax (TTx) RM10/room/night.
            </span>
            {" "}No booking fees. No cleaning fees. No service charges.{" "}
            <a
              href="https://www.myttx.customs.gov.my/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-600 dark:text-amber-400 hover:underline"
            >
              Learn about TTx
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
