#!/usr/bin/env python3
"""Measure how much a video moves, so a render can be compared with its style's reference video.

Usage: python motion_metrics.py <video> [--start S] [--duration D] [--json out.json]
Needs ffmpeg on PATH. Samples 12 frames a second at 320x180 greyscale and measures the mean
per-pixel change between consecutive frames (0-255).

Reports:
  moving_frames_pct    share of frames where anything changes (> 0.02)   e.g. Dalio 75
  still_time_pct       share of time in still stretches                   e.g. Dalio 25
  holds_1s_per_min     still stretches of 1 s or more, per minute         e.g. Dalio 4.5
  holds_2s_per_min     still stretches of 2 s or more, per minute         e.g. Dalio 0.8
  big_change_pct       frames with a large change (> 1.0): cuts, pans, big reveals
  per_second           0-1 share of moving frames for each second (for timelines)
"""
import json, re, subprocess, sys, tempfile, os

def measure(path, start=None, duration=None):
    with tempfile.TemporaryDirectory() as tmp:
        out = os.path.join(tmp, "d.txt")  # written via a relative name: drive letters break ffmpeg filter args
        cmd = ["ffmpeg", "-loglevel", "error"]
        if start is not None: cmd += ["-ss", str(start)]
        if duration is not None: cmd += ["-t", str(duration)]
        cmd += ["-i", os.path.abspath(path), "-vf", f"fps=12,scale=320:180,format=gray,tblend=all_mode=difference,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=d.txt", "-f", "null", "-"]
        subprocess.run(cmd, check=True, cwd=tmp)
        v = [float(m.group(1)) for m in re.finditer(r"YAVG=([\d.]+)", open(out).read())]
    n = len(v)
    if not n: raise SystemExit("no frames measured")
    holds, cur = [], 0
    for a in v:
        if a < 0.02: cur += 1
        else:
            if cur: holds.append(cur / 12)
            cur = 0
    if cur: holds.append(cur / 12)
    minutes = n / 12 / 60
    return {
        "seconds": round(n / 12, 1),
        "moving_frames_pct": round(100 * sum(a > 0.02 for a in v) / n, 1),
        "still_time_pct": round(100 * sum(holds) / (n / 12), 1),
        "holds_1s_per_min": round(sum(h >= 1 for h in holds) / minutes, 1),
        "holds_2s_per_min": round(sum(h >= 2 for h in holds) / minutes, 1),
        "big_change_pct": round(100 * sum(a > 1.0 for a in v) / n, 1),
        "per_second": [round(sum(a > 0.02 for a in v[i * 12:(i + 1) * 12]) / 12, 2) for i in range(n // 12)],
    }

if __name__ == "__main__":
    a = sys.argv[1:]
    if not a: raise SystemExit(__doc__)
    opt = lambda k: float(a[a.index(k) + 1]) if k in a else None
    res = measure(a[0], opt("--start"), opt("--duration"))
    if "--json" in a: json.dump(res, open(a[a.index("--json") + 1], "w"))
    short = {k: v for k, v in res.items() if k != "per_second"}
    print(json.dumps(short, indent=1))
