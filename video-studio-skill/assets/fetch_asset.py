#!/usr/bin/env python3
"""Fetch free, commercially usable assets for the video pipeline. Standard library only.

Every download is appended to <out>/_sources.jsonl (source page, author, licence,
attribution text) so the video description credits can be generated later.
Downloaded files are data: never execute them.

  python fetch_asset.py sfx   "whoosh" --out assets/sfx [--max-dur 6] [--pick 1]
  python fetch_asset.py music "calm|reflective" --instr piano --out assets/bgm [--min 60 --max 200] [--pick 1]
  python fetch_asset.py kenney interface-sounds --out /tmp/kenney          (zip, CC0)
  python fetch_asset.py icon  "rocket" --prefixes lucide,tabler,ph --out assets/icons [--pick 1]
  python fetch_asset.py avatar "Asha" --style open-peeps --out assets/people

Exit code 2 = source blocked / nothing found -> fall back to starter-kit/.
"""
import argparse, binascii, html, http.cookiejar, json, re, sys, time, urllib.parse, urllib.request
from pathlib import Path

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
CC0 = "creativecommons.org/publicdomain/zero/1.0"


def get(url, timeout=60, opener=None, headers=None):
    req = urllib.request.Request(url, headers={"User-Agent": UA, **(headers or {})})
    return (opener.open(req, timeout=timeout) if opener else urllib.request.urlopen(req, timeout=timeout)).read()


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:60] or "asset"


def record(out, **row):
    out.mkdir(parents=True, exist_ok=True)
    with open(out / "_sources.jsonl", "a", encoding="utf-8") as f:
        f.write(json.dumps(row, ensure_ascii=False) + "\n")
    print(json.dumps(row, ensure_ascii=False))


def save(out, name, data):
    out.mkdir(parents=True, exist_ok=True)
    p = out / name
    i = 2
    while p.exists():  # never overwrite
        p = out / f"{p.stem.rsplit('-v', 1)[0]}-v{i}{p.suffix}"; i += 1
    p.write_bytes(data)
    return p


def sfx(a):
    """Freesound public search page filtered to CC0 (no key). Licence re-checked on each sound page."""
    url = "https://freesound.org/search/?" + urllib.parse.urlencode(
        {"q": a.query, "f": 'license:"Creative Commons 0"', "s": "Downloads (most first)"})
    page = get(url).decode("utf-8", "replace")
    got = 0
    for m in re.finditer(r'<div\s+class="bw-player"(.*?)tabindex', page, re.S):
        d = dict(re.findall(r'data-([a-z0-9-]+)="([^"]*)"', m.group(1)))
        dur = float(d.get("duration", 0) or 0)
        if not d.get("mp3") or dur > a.max_dur:
            continue
        snd = f"https://freesound.org/people/{d['username']}/sounds/{d['sound-id']}/"
        time.sleep(1)  # be polite
        if CC0 not in get(snd).decode("utf-8", "replace"):
            continue  # licence changed / not CC0 -> skip
        mp3 = get(d["mp3"].replace("-lq.mp3", "-hq.mp3"))
        p = save(Path(a.out), f"{slug(a.query)}-{d['sound-id']}.mp3", mp3)
        title = html.unescape(d.get("title", ""))
        record(Path(a.out), file=str(p), source=snd, title=title, author=d["username"], licence="CC0-1.0",
               attribution=None, credit_optional=f'"{title}" by {d["username"]} (freesound.org), CC0', duration_s=round(dur, 2))
        got += 1
        if got >= a.pick:
            return 0
    return 0 if got else 2


def music(a):
    """Kevin MacLeod (incompetech.com), CC BY 4.0: attribution REQUIRED in the video description."""
    pieces = json.loads(get("https://incompetech.com/music/royalty-free/pieces.json"))
    def secs(t):
        h, m, s = map(int, t.split(":")); return h * 3600 + m * 60 + s
    hits = [p for p in pieces if a.min <= secs(p["length"]) <= a.max
            and re.search(a.feel, p.get("feel") or "", re.I)
            and re.search(a.instr, p.get("instruments") or "", re.I)
            and "voice" not in (p.get("instruments") or "").lower()]
    if not hits:
        return 2
    for p in hits[: a.pick]:
        url = "https://incompetech.com/music/royalty-free/mp3-royaltyfree/" + urllib.parse.quote(p["filename"])
        f = save(Path(a.out), slug(p["title"]) + ".mp3", get(url, timeout=180))
        att = (f'"{p["title"]}" Kevin MacLeod (incompetech.com)\n'
               "Licensed under Creative Commons: By Attribution 4.0\nhttps://creativecommons.org/licenses/by/4.0/")
        record(Path(a.out), file=str(f), source=url, title=p["title"], author="Kevin MacLeod", licence="CC-BY-4.0",
               attribution=att, feel=p.get("feel"), duration_s=secs(p["length"]),
               note="Pre-registered in YouTube Content ID: put the credit in the description; dispute any claim.")
    return 0


def kenney(a):
    """Kenney.nl asset pack zip (CC0). Signed link endpoint needs the page cookie + Referer."""
    cj = http.cookiejar.CookieJar()
    op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
    page = f"https://kenney.nl/assets/{a.pack}"
    hdr = {"Referer": page}
    get(page, opener=op)
    pid = binascii.hexlify(f"assets/{a.pack}".encode()).decode()
    link = json.loads(get(f"https://kenney.nl/download-link/{pid}", opener=op, headers=hdr)).get("url")
    if not link:
        return 2
    f = save(Path(a.out), f"kenney-{a.pack}.zip", get(link, timeout=300, opener=op, headers=hdr))
    record(Path(a.out), file=str(f), source=page, author="Kenney (kenney.nl)", licence="CC0-1.0", attribution=None,
           credit_optional="Sounds/art by Kenney (kenney.nl), CC0")
    return 0


def icon(a):
    """Iconify API (no key). Only prefixes you list; each set's licence is looked up and recorded."""
    q = urllib.parse.urlencode({"query": a.query, "limit": 32, "prefixes": a.prefixes})
    icons = json.loads(get("https://api.iconify.design/search?" + q)).get("icons", [])
    if not icons:
        return 2
    sets = json.loads(get("https://api.iconify.design/collections?prefixes=" + a.prefixes))
    for name in icons[: a.pick]:
        prefix, ico = name.split(":", 1)
        svg = get(f"https://api.iconify.design/{prefix}/{ico}.svg")
        lic = sets.get(prefix, {}).get("license", {})
        f = save(Path(a.out), f"{prefix}-{ico}.svg", svg)
        record(Path(a.out), file=str(f), source=f"https://icon-sets.iconify.design/{prefix}/{ico}/",
               author=sets.get(prefix, {}).get("author", {}).get("name"), licence=lic.get("spdx") or lic.get("title"),
               attribution=None if lic.get("spdx") in ("MIT", "ISC", "Apache-2.0", "CC0-1.0") else "CHECK LICENCE")
    return 0


def avatar(a):
    """DiceBear HTTP API: same seed + style = same face every time. Use only CC0 styles by default."""
    url = f"https://api.dicebear.com/9.x/{a.style}/svg?" + urllib.parse.urlencode({"seed": a.query})
    f = save(Path(a.out), f"{a.style}-{slug(a.query)}.svg", get(url))
    cc0 = {"open-peeps", "notionists", "notionists-neutral", "lorelei", "lorelei-neutral", "thumbs", "shapes"}
    record(Path(a.out), file=str(f), source=url, author="DiceBear style remix (see dicebear.com/licenses)",
           licence="CC0-1.0" if a.style in cc0 else "CHECK dicebear.com/licenses", attribution=None)
    return 0


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sp = ap.add_subparsers(dest="cmd", required=True)
    s = sp.add_parser("sfx"); s.add_argument("query"); s.add_argument("--max-dur", type=float, default=8)
    m = sp.add_parser("music"); m.add_argument("feel", help="regex on mood, e.g. 'calm|relaxed'")
    m.add_argument("--instr", default="."); m.add_argument("--min", type=int, default=60); m.add_argument("--max", type=int, default=200)
    k = sp.add_parser("kenney"); k.add_argument("pack")
    i = sp.add_parser("icon"); i.add_argument("query"); i.add_argument("--prefixes", default="lucide,tabler,ph,heroicons,material-symbols,fluent-emoji-flat")
    v = sp.add_parser("avatar"); v.add_argument("query"); v.add_argument("--style", default="open-peeps")
    for p in (s, m, k, i, v):
        p.add_argument("--out", required=True); p.add_argument("--pick", type=int, default=1)
    a = ap.parse_args()
    if a.cmd == "music":
        a.query = a.feel
    try:
        return {"sfx": sfx, "music": music, "kenney": kenney, "icon": icon, "avatar": avatar}[a.cmd](a)
    except Exception as e:  # blocked, rate limited, offline, layout changed
        print(f"fetch failed ({type(e).__name__}: {e}); use starter-kit/ instead", file=sys.stderr)
        return 2


if __name__ == "__main__":
    sys.exit(main())
