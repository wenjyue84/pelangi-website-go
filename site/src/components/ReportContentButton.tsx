'use client';

import { useState } from 'react';

export default function ReportContentButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleReport = () => {
    // Open email client
    window.location.href = 'mailto:safety@pelangicapsulehostel.com?subject=Report%20Harmful%20Content&body=Please%20describe%20the%20harmful%20content%20and%20provide%20any%20relevant%20details.';
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
        aria-label="Report harmful content"
        title="Report this content if it violates our community guidelines"
      >
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4v2m0 4v2M4 7a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V7z"
          />
        </svg>
        <span>Report</span>
      </button>

      {/* Report Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-stone-800 rounded-lg max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-3">
              Report Harmful Content
            </h3>
            <p className="text-stone-600 dark:text-stone-400 mb-4 text-sm">
              If you believe this content violates our community guidelines, please report it.
              We take safety seriously and will review all reports.
            </p>
            <p className="text-stone-600 dark:text-stone-400 mb-6 text-sm">
              For more information on what constitutes harmful content, please visit our{' '}
              <a
                href="/safety-guidelines"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Safety Guidelines
              </a>
              .
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-700 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReport}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
