export async function GET() {
  const content = `Contact: mailto:pelangicapsule@gmail.com
Contact: https://wa.me/60127088789
Expires: 2027-03-13T00:00:00.000Z
Preferred-Languages: en, ms
Canonical: https://pelangicapsulehostel.com/.well-known/security.txt
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
