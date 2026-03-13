const supportedBanks = [
  "Maybank",
  "CIMB",
  "RHB",
  "Public Bank",
  "Hong Leong",
  "AmBank",
  "Bank Islam",
  "Bank Rakyat",
];

const supportedEwallets = [
  "Touch 'n Go",
  "Boost",
  "GrabPay",
  "ShopeePay",
  "BigPay",
  "MAE",
];

const paymentMethods = [
  {
    icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
    name: "Cash",
    note: "Pay at check-in",
  },
  {
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    name: "Credit / Debit Card",
    note: "Visa, Mastercard accepted",
  },
  {
    icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z",
    name: "DuitNow QR",
    note: "All Malaysian banks & e-wallets",
  },
];

/**
 * DuitNow QR payment section for /book and /contact pages.
 * Compact variant shows just the QR + short description (for /contact).
 */
export default function DuitNowPayment({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <section
        aria-labelledby="duitnow-compact-heading"
        className="py-10 container-custom"
      >
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-100 dark:border-stone-700 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* QR Code */}
              <div className="shrink-0">
                <div className="w-32 h-32 bg-stone-100 dark:bg-stone-800 rounded-xl flex items-center justify-center border-2 border-dashed border-stone-300 dark:border-stone-600">
                  <div className="text-center">
                    <svg className="w-10 h-10 text-stone-400 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <span className="text-xs text-stone-400">DuitNow QR</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div>
                <h3 id="duitnow-compact-heading" className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
                  Pay via DuitNow QR
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">
                  Scan with any Malaysian banking app or e-wallet. Works with Maybank, CIMB, Touch &apos;n Go, Boost, GrabPay, and 40+ others.
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-500">
                  DuitNow QR is Malaysia&apos;s national interoperable QR payment standard by PayNet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="payment-methods-heading"
      className="py-16 bg-white dark:bg-stone-900"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-medium tracking-[0.3em] uppercase text-amber-700 dark:text-amber-400 mb-3">
              Payment Methods
            </p>
            <h2
              id="payment-methods-heading"
              className="font-display text-3xl md:text-4xl font-medium text-stone-900 dark:text-stone-100"
            >
              How to Pay
            </h2>
            <p className="text-stone-500 dark:text-stone-400 mt-3 max-w-lg mx-auto">
              We accept multiple payment methods for your convenience — pay the way that suits you best.
            </p>
          </div>

          {/* Payment method cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {paymentMethods.map((method) => (
              <div
                key={method.name}
                className="bg-stone-50 dark:bg-stone-800 rounded-2xl p-6 text-center border border-stone-100 dark:border-stone-700"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-amber-700 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={method.icon} />
                  </svg>
                </div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">{method.name}</h3>
                <p className="text-sm text-stone-500 dark:text-stone-400">{method.note}</p>
              </div>
            ))}
          </div>

          {/* DuitNow QR Feature Section */}
          <div className="bg-linear-to-r from-purple-50 to-blue-50 dark:from-stone-800 dark:to-stone-800 rounded-3xl p-8 border border-purple-200 dark:border-purple-800">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* QR Code Display */}
              <div className="shrink-0 text-center">
                {/* Placeholder QR — replace /images/duitnow-qr.png with actual merchant QR */}
                <div
                  className="w-48 h-48 bg-white rounded-2xl shadow-md flex items-center justify-center border border-stone-200 dark:border-stone-600 mx-auto"
                  role="img"
                  aria-label="DuitNow QR code for Pelangi Capsule Hostel — scan with any Malaysian banking app or e-wallet to pay"
                >
                  <div className="text-center p-4">
                    <svg className="w-16 h-16 text-purple-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                    <span className="text-xs text-stone-400 block">DuitNow QR</span>
                    <span className="text-xs text-stone-300 block">Coming Soon</span>
                  </div>
                </div>
                <p className="text-xs text-purple-700 dark:text-purple-300 font-medium mt-3">
                  Scan to Pay
                </p>
              </div>

              {/* DuitNow Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="font-display text-xl font-medium text-stone-900 dark:text-stone-100">
                    DuitNow QR
                  </h3>
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2 py-0.5 rounded-full font-medium">
                    Malaysia
                  </span>
                </div>

                <p className="text-stone-600 dark:text-stone-400 text-sm mb-4 leading-relaxed">
                  DuitNow QR is Malaysia&apos;s national interoperable QR payment standard, operated by
                  PayNet. Scan with <strong>any Malaysian banking app or e-wallet</strong> to pay
                  instantly — no extra apps needed.
                </p>

                {/* Text fallback for accessibility — payment info not solely reliant on QR image */}
                <div className="text-sm text-stone-600 dark:text-stone-400 mb-4">
                  <p className="font-medium text-stone-700 dark:text-stone-300 mb-1">
                    Can&apos;t scan? Pay via bank transfer:
                  </p>
                  <p>Account: Pelangi Capsule Hostel</p>
                  <p>WhatsApp us at <a href="https://wa.me/60127088789" className="text-amber-700 dark:text-amber-400 hover:underline">+60 12-708 8789</a> for transfer details.</p>
                </div>

                {/* Supported banks */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                    Supported Banks
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {supportedBanks.map((bank) => (
                      <span
                        key={bank}
                        className="text-xs bg-white dark:bg-stone-700 text-stone-600 dark:text-stone-300 px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-600"
                      >
                        {bank}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Supported e-wallets */}
                <div>
                  <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                    E-Wallets
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {supportedEwallets.map((wallet) => (
                      <span
                        key={wallet}
                        className="text-xs bg-white dark:bg-stone-700 text-stone-600 dark:text-stone-300 px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-600"
                      >
                        {wallet}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
