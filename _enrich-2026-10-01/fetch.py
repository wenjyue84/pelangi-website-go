import json, urllib.request, urllib.parse, io, re, sys
from PIL import Image
R = r"C:\Users\Jyue\Documents\2-areas\Software Projects\pelangi-website\_enrich-2026-10-01"
UA = {"User-Agent": "PelangiBlogBot/1.0 (wenjyue@gmail.com)"}
J = [
 ("Bishan_HDB_apartment_block_501.jpg", "how-malaysians-find-jobs-singapore-2026", "how-malaysians-find-jobs-singapore-2026-1"),
 ("Johor_Causeway.jpg", "how-malaysians-find-jobs-singapore-2026", "how-malaysians-find-jobs-singapore-2026-2"),
 ("Ministry_of_Manpower_(5742929694).jpg", "singapore-work-pass-guide-malaysians", "singapore-work-pass-guide-malaysians-1"),
 ("Singapore_Skyline_Raffles_Place.jpg", "singapore-work-pass-guide-malaysians", "singapore-work-pass-guide-malaysians-2"),
]
out = {}
for t, slug, name in J:
    q = urllib.parse.urlencode({"action":"query","titles":"File:"+t,"prop":"imageinfo","iiprop":"url|extmetadata|size","format":"json"})
    d = json.load(urllib.request.urlopen(urllib.request.Request("https://commons.wikimedia.org/w/api.php?"+q, headers=UA)))
    p = list(d["query"]["pages"].values())[0]; i = p["imageinfo"][0]; m = i["extmetadata"]
    art = re.sub("<[^>]+>", "", m["Artist"]["value"]).strip()
    print(t, i["width"], i["height"], "|", m["LicenseShortName"]["value"], "|", art, "|", m.get("Restrictions",{}).get("value"), "|", i["descriptionurl"])
    data = urllib.request.urlopen(urllib.request.Request(i["url"], headers=UA)).read()
    im = Image.open(io.BytesIO(data)).convert("RGB")
    if im.width > 1200:
        im = im.resize((1200, round(im.height*1200/im.width)), Image.LANCZOS)
    f = f"{R}\\{slug}\\images\\{name}.webp"
    im.save(f, "WEBP", quality=80)
    print("  saved", name+".webp", im.width, im.height, "orig", i["url"])
