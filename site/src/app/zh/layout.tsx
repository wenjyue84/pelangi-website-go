/**
 * Chinese-section layout.
 *
 * The root layout renders <html lang="en"> for the whole site, and in the App
 * Router only the root layout may render <html>. Making the root layout read
 * the request path to vary the lang attribute would force dynamic rendering and
 * break `use cache` / ISR everywhere. Instead, this nested layout wraps the
 * Chinese subtree in a `lang="zh-Hans"` element so screen readers and search
 * engines treat /zh/* content as Simplified Chinese. The wrapper uses
 * `display: contents` so it generates no box and does not affect layout.
 */
export default function ZhLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div lang="zh-Hans" style={{ display: "contents" }}>
      {children}
    </div>
  );
}
