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

              {/* WCAG 2.2 AA Compliance */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  WCAG 2.2 AA Compliance
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-4">
                  The following WCAG 2.2 success criteria have been verified as
                  implemented on this website:
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-lg">
                    <thead className="bg-stone-100 dark:bg-stone-800">
                      <tr>
                        <th className="text-left p-3 font-medium">SC</th>
                        <th className="text-left p-3 font-medium">Criterion</th>
                        <th className="text-left p-3 font-medium">Level</th>
                        <th className="text-left p-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200 dark:divide-stone-700">
                      <tr>
                        <td className="p-3 font-mono text-xs">1.4.2</td>
                        <td className="p-3">Audio Control</td>
                        <td className="p-3">A</td>
                        <td className="p-3 text-green-700 dark:text-green-400 font-medium">Compliant</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-xs">1.4.3</td>
                        <td className="p-3">Contrast (Minimum)</td>
                        <td className="p-3">AA</td>
                        <td className="p-3 text-green-700 dark:text-green-400 font-medium">Compliant</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-xs">1.4.5</td>
                        <td className="p-3">Images of Text</td>
                        <td className="p-3">AA</td>
                        <td className="p-3 text-green-700 dark:text-green-400 font-medium">Compliant</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-xs">2.1.1</td>
                        <td className="p-3">Keyboard</td>
                        <td className="p-3">A</td>
                        <td className="p-3 text-green-700 dark:text-green-400 font-medium">Compliant</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-xs">2.4.7</td>
                        <td className="p-3">Focus Visible</td>
                        <td className="p-3">AA</td>
                        <td className="p-3 text-green-700 dark:text-green-400 font-medium">Compliant</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-xs">3.3.1</td>
                        <td className="p-3">Error Identification</td>
                        <td className="p-3">A</td>
                        <td className="p-3 text-green-700 dark:text-green-400 font-medium">Compliant</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono text-xs">4.1.2</td>
                        <td className="p-3">Name, Role, Value</td>
                        <td className="p-3">A</td>
                        <td className="p-3 text-green-700 dark:text-green-400 font-medium">Compliant</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* SC 1.4.2 Audio Control Policy */}
              <section className="mb-8">
                <h2 className="font-display text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-4">
                  Audio Control Policy (SC 1.4.2)
                </h2>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed mb-3">
                  WCAG 2.2 SC 1.4.2 (Level A) requires that any audio playing
                  automatically for more than 3 seconds must be pausable,
                  stoppable, or have its volume controllable independently of
                  the system volume.
                </p>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-5 mb-4">
                  <p className="font-medium text-green-800 dark:text-green-300 mb-2">
                    Audit result: Fully compliant
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-stone-700 dark:text-stone-300 text-sm">
                    <li>
                      No audio or video plays automatically on any page.
                    </li>
                    <li>
                      The YouTube check-in guide on the{" "}
                      <strong>/check-in</strong> page uses a click-to-play
                      facade: the iframe is not loaded until the user explicitly
                      clicks the play button. No audio plays without user
                      initiation.
                    </li>
                    <li>
                      The embedded YouTube video on the{" "}
                      <strong>/gallery</strong> page does not include{" "}
                      <code className="bg-stone-200 dark:bg-stone-700 px-1 rounded text-xs">
                        autoplay=1
                      </code>{" "}
                      in its source URL. Audio only plays after the user
                      presses the play control within the iframe.
                    </li>
                    <li>
                      Google Maps embeds on the <strong>/location</strong> and{" "}
                      <strong>/getting-here</strong> pages do not produce any
                      audio.
                    </li>
                  </ul>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-5">
                  <p className="font-medium text-amber-800 dark:text-amber-300 mb-2">
                    Policy: Future audio content
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 text-sm">
                    Any future addition of auto-playing audio or video — such as
                    lobby ambience, promotional clips, or virtual tours — must
                    provide a visible pause or stop control within 3 seconds of
                    page load, or must be muted by default with the user able to
                    unmute. Auto-playing audio that cannot be controlled by the
                    user is prohibited. All video or audio content must be
                    reviewed against SC 1.4.2 before deployment.
                  </p>
                </div>
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
