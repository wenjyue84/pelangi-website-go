import json, re
R = r"C:\Users\Jyue\Documents\2-areas\Software Projects\pelangi-website\_enrich-2026-10-01"
src = open(r"C:\Users\Jyue\Documents\2-areas\Software Projects\pelangi-website\go-site\internal\data\blog.go", encoding="utf-8").read()
lines = src.split("\n")
def post(start, end): return "\n".join(lines[start-1:end])
P1 = post(807, 859); P2 = post(872, 968)
def line(block, prefix):
    m = [l for l in block.split("\n") if l.startswith(prefix)]
    assert len(m) == 1, (prefix, len(m))
    assert block.count(m[0]) == 1
    return m[0]

def a(name, href, label=None):
    return f'<a href="{href}" target="_blank" rel="noopener noreferrer">{label or name}</a>'
EP_E = "https://www.mom.gov.sg/passes-and-permits/employment-pass/eligibility"
EP_K = "https://www.mom.gov.sg/passes-and-permits/employment-pass/key-facts"
EP_F = "https://www.mom.gov.sg/passes-and-permits/employment-pass/passes-for-family"
SP_E = "https://www.mom.gov.sg/passes-and-permits/s-pass/eligibility"
SP_K = "https://www.mom.gov.sg/passes-and-permits/s-pass/key-facts"
SP = "https://www.mom.gov.sg/passes-and-permits/s-pass"
WP_K = "https://www.mom.gov.sg/passes-and-permits/work-permit-for-foreign-worker/key-facts"

official = ("<h2>Official Information</h2>\n<p>Figures below were checked against Singapore's Ministry of Manpower (MOM) pages on 1 October 2026. Rules change, so confirm on MOM before you apply.</p>\n<ul>\n"
 f"<li><strong>Employment Pass salary:</strong> MOM lists the minimum qualifying salary as $5,600 a month for general sectors ($6,200 for financial services), rising with age from 23. From 1 January 2027 it becomes $6,000 ($6,600 for financial services). {a('', EP_E, 'MOM: EP eligibility')}</li>\n"
 f"<li><strong>COMPASS:</strong> EP applicants must earn 40 points on COMPASS, unless they earn a fixed monthly salary of at least $22,500 or fall under another listed exemption. {a('', EP_E, 'MOM: EP eligibility')}</li>\n"
 f"<li><strong>EP validity:</strong> first-time candidates up to 2 years, renewals up to 3 years. {a('', EP_K, 'MOM: EP key facts')}</li>\n"
 f"<li><strong>S Pass salary and validity:</strong> new candidates need at least $3,300 a month (rising with age; $3,600 from 1 January 2027). First-time passes run up to 2 years, renewals up to 3, and employers are subject to a quota and levy. {a('', SP_E, 'MOM: S Pass eligibility')} / {a('', SP_K, 'MOM: S Pass key facts')}</li>\n"
 f"<li><strong>Work Permit:</strong> for semi-skilled workers from approved source countries or regions in the construction, manufacturing, marine shipyard, process or services sectors. Valid up to 2 years; family passes are not available. {a('', WP_K, 'MOM: Work Permit key facts')}</li>\n"
 f"<li><strong>Bringing family on an EP:</strong> spouse and children need the EP holder to earn at least $6,000 a month; parents need at least $12,000. {a('', EP_F, 'MOM: EP passes for family')}</li>\n"
 "</ul>")
# post 1 drops the work permit family/validity detail? keep all six; post 2 same
imgs = {
 "how-malaysians-find-jobs-singapore-2026": [
  dict(file="how-malaysians-find-jobs-singapore-2026-1.webp", alt="A block of HDB public housing flats in Bishan, Singapore", width=1200, height=944, author="MapStaringEnthusiast", licence="CC0", sourceUrl="https://commons.wikimedia.org/wiki/File:Bishan_HDB_apartment_block_501.jpg", fileUrl="https://upload.wikimedia.org/wikipedia/commons/3/31/Bishan_HDB_apartment_block_501.jpg", cap="Photo: MapStaringEnthusiast, Wikimedia Commons, CC0.", after=line(P1, "<p>HDB flats (Housing")),
  dict(file="how-malaysians-find-jobs-singapore-2026-2.webp", alt="The Johor-Singapore Causeway seen across the Straits of Johor", width=1200, height=800, author="Johan Jönsson (Julle)", licence="CC BY-SA 4.0", sourceUrl="https://commons.wikimedia.org/wiki/File:Johor_Causeway.jpg", fileUrl="https://upload.wikimedia.org/wikipedia/commons/c/c0/Johor_Causeway.jpg", cap="Photo: Johan Jönsson (Julle), Wikimedia Commons, CC BY-SA 4.0.", after=line(P1, "<p>If job-hunting while based")),
 ],
 "singapore-work-pass-guide-malaysians": [
  dict(file="singapore-work-pass-guide-malaysians-1.webp", alt="Ministry of Manpower signage on its building in Singapore", width=1024, height=768, author="Michael Coghlan from Adelaide, Australia", licence="CC BY-SA 2.0", sourceUrl="https://commons.wikimedia.org/wiki/File:Ministry_of_Manpower_(5742929694).jpg", fileUrl="https://upload.wikimedia.org/wikipedia/commons/c/c3/Ministry_of_Manpower_%285742929694%29.jpg", cap="Photo: Michael Coghlan, Wikimedia Commons, CC BY-SA 2.0.", after=line(P2, "<p>Malaysia is Singapore's top source")),
  dict(file="singapore-work-pass-guide-malaysians-2.webp", alt="Raffles Place financial district skyline in Singapore", width=1200, height=750, author="Calvin Teo (User:Advanced)", licence="CC BY-SA 3.0", sourceUrl="https://commons.wikimedia.org/wiki/File:Singapore_Skyline_Raffles_Place.jpg", fileUrl="https://upload.wikimedia.org/wikipedia/commons/1/1e/Singapore_Skyline_Raffles_Place.jpg", cap="Photo: Calvin Teo, Wikimedia Commons, CC BY-SA 3.0.", after=line(P2, "<p><strong>Best for:</strong> Fresh graduates")),
 ]}
def S(url, use): return dict(url=url, fetched="2026-10-01", usedFor=use)
src_f = [S(EP_E,"EP salary, COMPASS"), S("https://www.mom.gov.sg/passes-and-permits/employment-pass","EP overview ($5,600)"), S(EP_K,"EP validity"), S(EP_F,"EP family salary thresholds"), S(SP_E,"S Pass salary"), S(SP,"S Pass overview, MyCareersFuture advert rule"), S(SP_K,"S Pass validity, quota"), S(WP_K,"Work Permit validity, sectors, family"), S("https://www.mom.gov.sg/passes-and-permits/work-permit-for-foreign-worker","Work Permit overview")]
D = {
 "how-malaysians-find-jobs-singapore-2026": [
  dict(existing="<strong>Employment Pass (EP)</strong> is for professionals and managers earning SGD5,000+ monthly with recognised qualifications.", official="MOM: minimum qualifying salary is $5,600 a month (general sectors), $6,200 for financial services; $6,000 / $6,600 from 1 Jan 2027.", url=EP_E, fetched="2026-10-01", suggestedReplacement="<strong>Employment Pass (EP)</strong> is for professionals and managers earning at least SGD5,600 monthly (SGD6,000 from 1 January 2027); the minimum rises with age and is higher in financial services."),
  dict(existing="<strong>S Pass</strong> targets skilled workers earning SGD3,150–4,999 with technical expertise or credentials or certifications.", official="MOM: new S Pass candidates need at least $3,300 a month ($3,600 from 1 Jan 2027). Declaring qualifications is optional. Upper bound 4,999 is not an MOM figure (EP minimum is 5,600).", url=SP_E, fetched="2026-10-01", suggestedReplacement="<strong>S Pass</strong> targets skilled workers earning at least SGD3,300 monthly (SGD3,600 from 1 January 2027) who may not meet EP criteria, subject to a quota."),
  dict(existing="Processing takes 2–4 weeks.", official="UNVERIFIED: the MOM pages fetched (EP/S Pass eligibility, key facts) do not state processing times. Not a proven error; consider softening to 'processing time varies'.", url=EP_K, fetched="2026-10-01", suggestedReplacement="Processing time varies by case; ask your employer or check MOM."),
 ],
 "singapore-work-pass-guide-malaysians": [
  dict(existing="<td>SGD 5,000/month</td>  (EP minimum salary, table) and 'Minimum salary SGD5,000/month' / 'EP minimum is SGD5,000'", official="MOM: EP minimum $5,600 a month (general), $6,200 financial services; $6,000 / $6,600 from 1 Jan 2027.", url=EP_E, fetched="2026-10-01", suggestedReplacement="SGD 5,600/month (SGD 6,000 from 1 Jan 2027); update every 'SGD5,000' EP mention, including the FAQ 'EP minimum is SGD5,000' answer and the Red Flags 'SGD3,500 for EP' example."),
  dict(existing="<td>SGD 3,150/month</td>  (S Pass minimum, table) and 'Minimum salary SGD3,150/month' / 'S Pass starts at SGD3,150'", official="MOM: new S Pass candidates need at least $3,300 a month; $3,600 from 1 Jan 2027.", url=SP_E, fetched="2026-10-01", suggestedReplacement="SGD 3,300/month (SGD 3,600 from 1 Jan 2027); update all SGD3,150 mentions."),
  dict(existing="<td>Up to 3 years</td> (EP validity)", official="MOM: first-time EP up to 2 years; renewals up to 3 years.", url=EP_K, fetched="2026-10-01", suggestedReplacement="Up to 2 years first time, up to 3 on renewal"),
  dict(existing="<td>Up to 2 years</td> (S Pass validity)", official="MOM: first-time S Pass up to 2 years; renewals up to 3 years.", url=SP_K, fetched="2026-10-01", suggestedReplacement="Up to 2 years first time, up to 3 on renewal"),
  dict(existing="<td>Yes (spouse + kids)</td> (EP family)", official="MOM: family passes require the EP holder to earn at least $6,000 a month; parents at least $12,000.", url=EP_F, fetched="2026-10-01", suggestedReplacement="Yes, if you earn at least SGD6,000/month (spouse and children)"),
  dict(existing="<strong>Who qualifies:</strong> Diploma holders or those with 5+ years relevant work experience.", official="MOM: S Pass eligibility page is salary-based; 'declaring qualifications is optional'. No diploma/5-year rule appears on the page fetched.", url=SP_E, fetched="2026-10-01", suggestedReplacement="Skilled workers (associate professionals and technicians) earning at least SGD3,300/month who may not meet EP criteria; an employer self-assessment tool is available on MOM."),
  dict(existing="No quota limits; approved applications are processed first-in-first-out.", official="MOM: EP requires 40 COMPASS points unless exempt (e.g. fixed salary of at least $22,500); employers must show fair consideration of all jobseekers. S Pass employers are subject to quota and levy.", url=EP_E, fetched="2026-10-01", suggestedReplacement="EP applications are assessed under COMPASS (40 points needed, unless exempt), not simple first-in-first-out."),
  dict(existing="Semi-skilled and unskilled workers in approved sectors: construction, marine, food, healthcare, domestic work.", official="MOM: semi-skilled migrant workers from approved source countries/regions in the construction, manufacturing, marine shipyard, process or services sector. Malaysia's eligibility as a source country was NOT confirmed from the page fetched.", url=WP_K, fetched="2026-10-01", suggestedReplacement="Semi-skilled workers from approved source countries or regions in the construction, manufacturing, marine shipyard, process or services sectors."),
  dict(existing="Processing time rows (EP 1-4 weeks, S Pass 2-8 weeks, Work Permit 1-2 weeks) and 'Malaysia ... accounting for 30% of foreign labour'", official="UNVERIFIED: neither figure appears on the MOM pages fetched. Not proven wrong.", url=EP_K, fetched="2026-10-01", suggestedReplacement="Hold for a separate source check or soften."),
 ]}
for slug, blk in (("how-malaysians-find-jobs-singapore-2026", P1), ("singapore-work-pass-guide-malaysians", P2)):
    inserts = []
    for im in imgs[slug]:
        h = f'<figure class="blog-figure"><img src="/images/blog/{im["file"]}" alt="{im["alt"]}" loading="lazy" width="{im["width"]}" height="{im["height"]}"><figcaption>{im["cap"]}</figcaption></figure>'
        inserts.append(dict(afterExact=im["after"], html=h))
    pj = dict(slug=slug, images=[{k: v for k, v in im.items() if k not in ("cap", "after")} for im in imgs[slug]], inserts=inserts, officialSection=official, discrepancies=D[slug], sourcesFetched=src_f)
    json.dump(pj, open(f"{R}\\{slug}\\patch.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(slug, [blk.count(i["afterExact"]) for i in inserts], len(blk))
