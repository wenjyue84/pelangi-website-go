import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Accessibility Statement | Pelangi Capsule Hostel",
  description:
    "Pelangi Capsule Hostel's commitment to digital accessibility. Learn about our WCAG 2.2 Level AA conformance target, known limitations, and how to report accessibility barriers.",
  alternates: {
    canonical: "https://pelangicapsulehostel.com/accessibility",
  },
};

export default function AccessibilityPage() {
  const lastAssessed = "14 March 2026";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-stone-50 dark:bg-stone-950">
        <div className="pt-28 pb-16 container-custom">
          <div className="max-w-3xl mx-auto">
            {/* Page Header */}
            <div className="mb-10">
              <h1 className="font-display text-4xl font-semibold text-stone-900 dark:text-stone-100 mb-3">
                Accessibility Statement
              </h1>
              <p className="text-stone-500 dark:text-stone-400 text-sm">
                Last assessed: {lastAssessed}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-stone dark:prose-invert prose-lg max-w-none">
              {/* Commitment */}
              <section className="mb-8">
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  Pelangi Capsule Hostel is committed to ensuring digital
                  accessibility for all visitors, including people with
                  disabilities. We continually improve the user experience for
                  everyone and apply the relevant accessibility standards to our
                  website.
                </p>
              </section>

              {/* Conformance Status */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  Conformance Status
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
                  We aim to conform to the{" "}
                  <strong>
                    Web Content Accessibility Guidelines (WCAG) 2.2 Level AA
                  </strong>
                  . These guidelines explain how to make web content more
                  accessible to people with a wide range of disabilities,
                  including visual, auditory, physical, speech, cognitive,
                  language, learning, and neurological disabilities.
                </p>
                <div className="bg-stone-100 dark:bg-stone-800 rounded-lg p-5 mt-3 text-stone-700 dark:text-stone-300">
                  <p>
                    <strong>Target standard:</strong> WCAG 2.2 Level AA
                  </p>
                  <p>
                    <strong>Current status:</strong> Partially conformant
                  </p>
                  <p>
                    <strong>Last assessment date:</strong> {lastAssessed}
                  </p>
                </div>
                <p className="text-stone-600 dark:text-stone-400 text-sm mt-3">
                  &ldquo;Partially conformant&rdquo; means that some parts of
                  the content do not yet fully conform to the accessibility
                  standard. We are actively working to address these gaps.
                </p>
              </section>

              {/* Technical Specifications */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  Technical Specifications
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
                  Accessibility of this website relies on the following
                  technologies to work with the particular combination of web
                  browser and any assistive technologies or plugins installed on
                  your computer:
                </p>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>HTML</li>
                  <li>WAI-ARIA</li>
                  <li>CSS</li>
                  <li>JavaScript</li>
                </ul>
              </section>

              {/* What We Do */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  What We Do
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
                  We take the following measures to ensure accessibility of our
                  website:
                </p>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300">
                  <li>
                    Use semantic HTML elements to ensure proper document
                    structure
                  </li>
                  <li>
                    Provide text alternatives for non-text content such as images
                  </li>
                  <li>
                    Ensure sufficient colour contrast ratios across the site
                  </li>
                  <li>
                    Support keyboard navigation for all interactive elements
                  </li>
                  <li>
                    Use ARIA labels and roles where native HTML semantics are
                    insufficient
                  </li>
                  <li>
                    Support text resizing up to 200% without loss of content or
                    functionality
                  </li>
                  <li>Provide visible focus indicators for interactive elements</li>
                  <li>Ensure the site works with common screen readers</li>
                </ul>
              </section>

              {/* Known Limitations */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  Known Limitations
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
                  Despite our best efforts, some areas of the site may not yet
                  be fully accessible. The following known issues are being
                  addressed:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-lg">
                    <thead className="bg-stone-100 dark:bg-stone-800">
                      <tr>
                        <th className="text-left p-3 font-medium">Area</th>
                        <th className="text-left p-3 font-medium">
                          Limitation
                        </th>
                        <th className="text-left p-3 font-medium">
                          Planned Remediation
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 dark:divide-stone-700">
                      <tr>
                        <td className="p-3 font-medium">Gallery images</td>
                        <td className="p-3">
                          Some gallery images may lack detailed alt text
                          descriptions
                        </td>
                        <td className="p-3">Q2 2026</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">
                          Third-party embeds
                        </td>
                        <td className="p-3">
                          Embedded maps and booking widgets may not meet all
                          accessibility standards
                        </td>
                        <td className="p-3">
                          Dependent on third-party providers
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-medium">PDF documents</td>
                        <td className="p-3">
                          Some older PDF documents may not be fully accessible
                        </td>
                        <td className="p-3">Q3 2026</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Feedback */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  Report an Accessibility Barrier
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
                  We welcome your feedback on the accessibility of our website.
                  If you encounter accessibility barriers or have suggestions
                  for improvement, please contact us:
                </p>
                <div className="bg-stone-100 dark:bg-stone-800 rounded-lg p-5 mt-3 text-stone-700 dark:text-stone-300">
                  <p className="font-medium">Pelangi Capsule Hostel</p>
                  <p className="mt-2">
                    Email:{" "}
                    <a
                      href="mailto:pelangicapsule@gmail.com"
                      className="text-amber-700 dark:text-amber-400 underline hover:text-amber-800 dark:hover:text-amber-300"
                    >
                      pelangicapsule@gmail.com
                    </a>
                  </p>
                  <p>Phone: +60 12-708 8789</p>
                  <p>
                    WhatsApp:{" "}
                    <a
                      href="https://wa.me/60127088789"
                      className="text-amber-700 dark:text-amber-400 underline hover:text-amber-800 dark:hover:text-amber-300"
                    >
                      +60 12-708 8789
                    </a>
                  </p>
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mt-3">
                  We aim to respond to accessibility feedback within 5 business
                  days and to propose a solution within 10 business days.
                </p>
              </section>

              {/* Assessment Approach */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  Assessment Approach
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                  We assess the accessibility of our website through the
                  following methods:
                </p>
                <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300 mt-3">
                  <li>Self-evaluation using automated accessibility testing tools</li>
                  <li>Manual testing with keyboard-only navigation</li>
                  <li>Testing with screen reader software</li>
                  <li>Lighthouse accessibility audits</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
