# NOTES: ktm-ets-train-kuala-lumpur-johor-bahru-tourists (checked 2026-10-01)

Images (3, all Wikimedia Commons, licence confirmed via the Commons API extmetadata): Gemas station (Slleong, CC0), KL Sentral ETS platform (Hiroki.loh.st, CC BY-SA 4.0), ETS Class 93 interior (Cmglee, CC BY-SA 4.0). Resized to 1200 px wide, webp.
The post already has one Commons image (jb-sentral-station-commons.jpg); not touched.
Rejected: "Class 94 ETS 306 at KL Sentral platform (260705)" (download failed, not retried; the platform photo used instead).

Placement: each insert goes after the exact paragraph line in patch.json. Official section: insert before the final CTA line `<p><a href="/book">Book your pod at Pelangi Capsule Hostel</a>...`, after the "Staying in Taman Pelangi" paragraphs.

Official-page limits: the KTMB ets.html page has no KL-JB fare/time; /ets-from-kl-to-singapore.html errored and /ets-routes-map.html was empty. JB Sentral times come from the KTMB timetable PDF (eff. 18 Apr 2026), text extracted with pypdf. I did not map arrival times to specific KL Sentral departures because the extracted columns are ambiguous.
Fare RM90-RM115: could NOT be verified from any official page. Left unchanged, flagged in discrepancies.
WiFi and food-trolley claims differ from KTMB's onboard page (see patch.json discrepancies).
