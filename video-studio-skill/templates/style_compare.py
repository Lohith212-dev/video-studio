#!/usr/bin/env python3
"""Measure a render and its style's reference video the same way, and say where the render falls short.

Usage:
  python style_compare.py --ref <reference.mp4> [--ref-start S --ref-dur D]
                          --ours <render.mp4> [--ours-start S --ours-dur D]
                          [--voice <our voice-only wav>] --out <folder>
Needs ffmpeg/ffprobe on PATH, numpy, scipy and Pillow. Writes <out>/compare.json (all numbers plus
event times), <out>/compare.md (table with verdicts) and <out>/side-by-side.jpg (reference frames
on top, ours below, 1.5 fps, labelled). Both videos are scaled to 320x180 (picture) and 22.05 kHz
mono (sound) before measuring, so resolution and frame rate do not change the numbers.

Picture (time-based rates are per minute of the chosen window):
  moving_frames_pct      share of frames that change at all (motion_metrics.measure, > 0.02 mean change)
  holds_1s_per_min       still stretches of 1 s or more per minute (motion_metrics.measure)
  hard_cuts_per_min      ffmpeg scene score > 0.3 at 24 fps (events closer than 0.25 s merged): real cuts
  soft_changes_per_min   scene score 0.12-0.3 not next to a hard cut: wipes, slides, big reveals, white-to-white page changes
  camera_moves_per_min   stretches >= 0.33 s where the WHOLE frame pans/zooms together (tile phase correlation,
                         fitted translation + zoom, >= 60% of textured tiles agree) faster than 2% of frame width/s
  camera_drift_pct       share of time the whole frame drifts slowly (0.4-2% width/s): Ken Burns pushes, slow pans
  visual_changes_per_min distinct new things per minute: peaks of frame-to-frame change (>= 3/255 mean, and 1.8x
                         the local median) after removing the camera motion: an element appears, a panel swaps, a cut
  brightness, contrast   mean and spread (std) of luma 0-255
  edge_density_pct       share of pixels on a strong edge: how busy the picture is with text/graphics
  dominant_colours       six median-cut colours with their share of pixels (information only)
Sound:
  loudness_lufs, lra_lu  integrated loudness and loudness range (ffmpeg ebur128)
  sfx_hits_per_min       sharp full-range onsets (flux peak where >= 60% of 1-11 kHz bins rise >= 6 dB in 25 ms,
                         incl. 8-11 kHz): clicks, pops, impacts, whoosh heads, hard audio edits. Rough: a TTS voice
                         whose words start from digital silence adds ~20/min on its own, so information only
  hits_on_changes_per_min  hard cuts + soft changes with a sharp onset from 0.15 s before to 0.3 s after: SFX that
                         punctuate transitions. This is the SFX verdict (json also has the chance-level figure)
  bed_rel_db             level of the quietest 10% of 50 ms blocks relative to the median speech block: how loud the
                         music/ambience bed is between words (about -20 means a bed is there, below -40 means silence)
  tempo_bpm, tempo_conf  autocorrelation of the low-band (40-250 Hz) onset envelope, 70-180 BPM (rough; info only)
Voice (measured on --voice for ours when given, else on the mix):
  syllables_per_s        voice-band (300-3000 Hz) envelope peaks per second of window: speaking pace proxy
  pitch_std_st           standard deviation of the voice's pitch in semitones (YIN on voiced frames): melody/modulation
  pitch_range_st         5th-95th percentile pitch range in semitones
  voice_level_std_db     spread of syllable peak levels in dB: emphasis/loudness modulation

Verdict bands (ours against the reference):
  rates (cuts, soft changes, camera moves, visual changes, syllables): within +-25% (if the reference is 0: ours <= 1)
  moving_frames_pct: at least reference - 5 points; holds_1s_per_min: at most max(reference x 1.25, reference + 0.5)
  camera_drift_pct, edge_density_pct, contrast: within +-25%; brightness: within +-20
  pitch_std_st, pitch_range_st, voice_level_std_db: at least 75% of the reference
  hits_on_changes_per_min: at least 60% of the reference
  loudness_lufs: within +-2 LU; lra_lu: within +-3 LU; bed_rel_db: within +-6 dB
  tempo and colours: information only
"""
import argparse, json, math, os, re, shutil, subprocess, sys, tempfile

import numpy as np
from scipy import ndimage, signal

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import motion_metrics  # noqa: E402

if not shutil.which("ffmpeg") and os.path.isdir("C:/ffmpeg/bin"):
    os.environ["PATH"] = "C:/ffmpeg/bin" + os.pathsep + os.environ["PATH"]

W, H, FPS = 320, 180, 12          # analysis frame size and rate
SR, NFFT, HOP = 22050, 1024, 256  # analysis audio
STEP = 3                          # camera motion compares frames 0.25 s apart


# ---------------------------------------------------------------- ffmpeg helpers
def _win(start, dur):
    a = []
    if start: a += ["-ss", f"{start:.3f}"]
    if dur: a += ["-t", f"{dur:.3f}"]
    return a


def duration_of(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0",
                          os.path.abspath(path)], capture_output=True, text=True, check=True).stdout
    return float(out.strip())


def read_frames(path, start, dur, fps, w, h, rgb=False):
    pix = "rgb24" if rgb else "gray"
    cmd = ["ffmpeg", "-v", "error"] + _win(start, dur) + ["-i", os.path.abspath(path), "-an", "-vf",
           f"fps={fps},scale={w}:{h}:flags=area", "-pix_fmt", pix, "-f", "rawvideo", "-"]
    raw = subprocess.run(cmd, capture_output=True, check=True).stdout
    shape = (-1, h, w, 3) if rgb else (-1, h, w)
    return np.frombuffer(raw, np.uint8).reshape(shape)


def read_audio(path, start=None, dur=None):
    cmd = ["ffmpeg", "-v", "error"] + _win(start, dur) + ["-i", os.path.abspath(path), "-vn", "-ac", "1",
           "-ar", str(SR), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, np.float32).copy()


def scene_scores(path, start, dur):
    with tempfile.TemporaryDirectory() as tmp:  # relative output name: drive letters break filter args
        cmd = ["ffmpeg", "-v", "error"] + _win(start, dur) + ["-i", os.path.abspath(path), "-an", "-vf",
               "fps=24,scale=320:180,select='gte(scene,0)',metadata=print:key=lavfi.scene_score:file=s.txt",
               "-f", "null", "-"]
        subprocess.run(cmd, check=True, cwd=tmp)
        txt = open(os.path.join(tmp, "s.txt")).read()
    t = [float(x) for x in re.findall(r"pts_time:([\d.]+)", txt)]
    s = [float(x) for x in re.findall(r"scene_score=([\d.]+)", txt)]
    return np.array(t[:len(s)]), np.array(s[:len(t)])


def ebur128(path, start, dur):
    cmd = ["ffmpeg", "-nostats", "-hide_banner"] + _win(start, dur) + ["-i", os.path.abspath(path), "-vn",
           "-af", "ebur128", "-f", "null", "-"]
    err = subprocess.run(cmd, capture_output=True, text=True).stderr
    summ = err[err.rfind("Summary:"):]
    i = re.search(r"I:\s+(-?[\d.]+) LUFS", summ)
    lra = re.search(r"LRA:\s+([\d.]+) LU", summ)
    return (float(i.group(1)) if i else None), (float(lra.group(1)) if lra else None)


# ---------------------------------------------------------------- picture
def merge_events(times, gap):
    out = []
    for t in sorted(times):
        if not out or t - out[-1] > gap: out.append(t)
    return out


def cuts(path, start, dur):
    t, s = scene_scores(path, start, dur)
    hard = merge_events(t[s > 0.3], 0.25)
    soft_raw = [x for x in t[(s > 0.12) & (s <= 0.3)] if all(abs(x - h) > 0.25 for h in hard)]
    return hard, merge_events(soft_raw, 0.25)


_TR, _TC = 3, 5                      # tile grid
_TH, _TW = H // _TR, W // _TC        # 60 x 64 tiles
_HANN = np.outer(np.hanning(_TH), np.hanning(_TW)).astype(np.float32)
_TX = np.tile((np.arange(_TC) + 0.5) * _TW - W / 2, _TR)
_TY = np.repeat((np.arange(_TR) + 0.5) * _TH - H / 2, _TC)


def _tiles(img):
    return img.reshape(_TR, _TH, _TC, _TW).transpose(0, 2, 1, 3).reshape(-1, _TH, _TW).astype(np.float32)


def _phase(a, b):
    """Per-tile shift (dx, dy) that moves tile a onto tile b, plus peak height."""
    a = (a - a.mean((1, 2), keepdims=True)) * _HANN
    b = (b - b.mean((1, 2), keepdims=True)) * _HANN
    R = np.fft.fft2(b) * np.conj(np.fft.fft2(a))
    r = np.fft.ifft2(R / (np.abs(R) + 1e-6)).real
    n = r.shape[0]
    flat = r.reshape(n, -1).argmax(1)
    py, px = np.unravel_index(flat, (_TH, _TW))
    i = np.arange(n)
    peak = r[i, py, px]

    def sub(c, cm, cp):
        d = c * 2 - cm - cp
        return np.where(np.abs(d) > 1e-9, 0.5 * (cp - cm) / np.where(d == 0, 1, d), 0)
    dy = py + sub(peak, r[i, (py - 1) % _TH, px], r[i, (py + 1) % _TH, px])
    dx = px + sub(peak, r[i, py, (px - 1) % _TW], r[i, py, (px + 1) % _TW])
    dy = np.where(dy > _TH / 2, dy - _TH, dy)
    dx = np.where(dx > _TW / 2, dx - _TW, dx)
    return dx, dy, peak


def global_motion(G, cut_times):
    """For each frame i: (speed in % of frame width per second, consistent?) between frame i and i+STEP."""
    n = len(G) - STEP
    speed = np.zeros(max(n, 0)); ok = np.zeros(max(n, 0), bool); model = np.zeros((max(n, 0), 3))
    ct = np.array(cut_times)
    for i in range(n):
        t0, t1 = i / FPS, (i + STEP) / FPS
        if len(ct) and np.any((ct >= t0 - 0.05) & (ct <= t1 + 0.05)): continue
        a, b = _tiles(G[i]), _tiles(G[i + STEP])
        tex = (a.std((1, 2)) > 4) & (b.std((1, 2)) > 4)
        dx, dy, pk = _phase(a, b)
        good = tex & (pk > 0.12)
        if good.sum() < 6: continue
        idx = np.where(good)[0]
        for _ in range(2):  # fit, drop outliers, refit
            A = np.zeros((2 * len(idx), 3)); y = np.zeros(2 * len(idx))
            A[0::2, 0] = 1; A[0::2, 2] = _TX[idx]; y[0::2] = dx[idx]
            A[1::2, 1] = 1; A[1::2, 2] = _TY[idx]; y[1::2] = dy[idx]
            tx, ty, s = np.linalg.lstsq(A, y, rcond=None)[0]
            res = np.hypot(dx - (tx + s * _TX), dy - (ty + s * _TY))
            mag = np.hypot(tx + s * _TX, ty + s * _TY)
            agree = good & (res <= np.maximum(0.6, 0.3 * mag))
            if agree.sum() >= 4: idx = np.where(agree)[0]
        frac = agree.sum() / good.sum()
        edge = math.hypot(tx, ty) + abs(s) * W / 2       # displacement at the frame's side edge, px
        speed[i] = edge / W * 100 / (STEP / FPS)
        ok[i] = frac >= 0.6
        model[i] = (tx, ty, s)
    return speed, ok, model


def segments(mask, min_len, gap=1):
    segs, start, last = [], None, None
    for i, m in enumerate(mask):
        if m:
            if start is None: start = i
            last = i
        elif start is not None and i - last > gap:
            segs.append((start, last)); start = None
    if start is not None: segs.append((start, last))
    return [(a, b) for a, b in segs if (b - a + 1) >= min_len]


def visual_changes(G, model):
    """Peaks of camera-compensated frame difference (frame i vs i+1)."""
    n = len(G) - 1
    d = np.zeros(n)
    for i in range(n):
        a = G[i].astype(np.float32); b = G[i + 1].astype(np.float32)
        j = min(i, len(model) - 1)
        tx, ty, s = model[j] / STEP if len(model) else (0, 0, 0)
        if abs(tx) + abs(ty) + abs(s) * W > 0.3:  # undo the camera move before differencing
            m = 1 + s
            off = np.array([H / 2, W / 2]) - m * np.array([H / 2, W / 2]) + np.array([ty, tx])
            # b(x) = a((x - off)/m)  ->  sample a at (x - off)/m
            a = ndimage.affine_transform(a, [1 / m, 1 / m], offset=-off / m, order=1, mode="nearest")
        d[i] = np.abs(b[4:-4, 4:-4] - a[4:-4, 4:-4]).mean()
    if n < 3: return [], d
    base = ndimage.median_filter(d, size=FPS * 2 + 1, mode="nearest")
    # >= 3/255 mean change: a noticeable element (not a ticking digit); 1.8x the local median: a burst, not a steady move
    pk, _ = signal.find_peaks(d, height=np.maximum(3.0, base * 1.8 + 0.25), distance=int(FPS * 0.33))
    return [round((p + 1) / FPS, 2) for p in pk], d


def look(G, thumbs):
    sub = G[::max(1, FPS // 2)].astype(np.float32)
    gx = np.abs(np.diff(sub, axis=2))[:, :-1, :]
    gy = np.abs(np.diff(sub, axis=1))[:, :, :-1]
    edges = (gx + gy) > 48
    from PIL import Image
    mosaic = Image.fromarray(thumbs.reshape(-1, thumbs.shape[2], 3)).resize((64, 36 * len(thumbs)))
    q = mosaic.quantize(colors=6, method=Image.Quantize.MEDIANCUT)
    pal = q.getpalette()[:18]; counts = sorted(q.getcolors(), reverse=True)
    tot = sum(c for c, _ in counts)
    cols = [{"hex": "#%02X%02X%02X" % tuple(pal[3 * k:3 * k + 3]), "pct": round(100 * c / tot, 1)} for c, k in counts]
    return {"brightness": round(float(sub.mean()), 1), "contrast": round(float(sub.std((1, 2)).mean()), 1),
            "edge_density_pct": round(100 * float(edges.mean()), 2), "dominant_colours": cols}


# ---------------------------------------------------------------- sound
def stft_power(x):
    if len(x) < NFFT: x = np.pad(x, (0, NFFT - len(x)))
    n = 1 + (len(x) - NFFT) // HOP
    fr = np.lib.stride_tricks.as_strided(x, (n, NFFT), (x.strides[0] * HOP, x.strides[0]))
    P = np.abs(np.fft.rfft(fr * np.hanning(NFFT).astype(np.float32), axis=1)) ** 2
    return P.astype(np.float32), np.fft.rfftfreq(NFFT, 1 / SR)


def band_db(P, f, lo, hi):
    return 10 * np.log10(P[:, (f >= lo) & (f < hi)].sum(1) + 1e-10)


def sfx_hits(P, f):
    """Sharp full-range onsets: spectral-flux peak (1-11 kHz) where >= 60% of bins rise >= 6 dB within 25 ms,
    the 8-11 kHz band rises >= 6 dB and 0.3-2 kHz >= 3 dB, and the level is not below the last 0.4 s by > 3 dB.
    Tuned 2026-10-30: on the Vaibhav reference 5 of 6 hits in 0:00-1:00 land within 0.2 s of a cut/transition.
    Caveat: TTS voices whose words start from digital silence trigger it too (about 20/min on Kokoro alone)."""
    fps = SR / HOP
    L = 10 * np.log10(P + 1e-10)
    prev = np.maximum(np.roll(L, 1, 0), np.roll(L, 2, 0)); prev[:2] = L[:2]
    rise = L - prev
    m = (f >= 1000) & (f < 11000)
    broad = (rise[:, m] > 6).mean(1)
    rt = rise[:, (f >= 8000) & (f < 11000)].mean(1)
    rl = rise[:, (f >= 300) & (f < 2000)].mean(1)
    flux = np.maximum(rise[:, m], 0).mean(1)
    tot = band_db(P, f, 300, 11000)
    w = int(0.4 * fps)
    past = np.roll(ndimage.maximum_filter1d(tot, w, origin=w // 2 - 1), 3)
    nov = np.roll(tot, -1) - past
    pk, _ = signal.find_peaks(flux, distance=int(0.12 * fps))
    keep = [p for p in pk if broad[p] >= 0.6 and rt[p] >= 6 and rl[p] >= 3 and nov[p] >= -3]
    return [round(p * HOP / SR, 2) for p in keep], flux


def synced(hits, changes, before=0.15, after=0.3):
    """Visual changes that have an audio hit from `before` s earlier to `after` s later."""
    h = np.array(hits)
    return [c for c in changes if len(h) and np.any((h - c >= -before) & (h - c <= after))]


def tempo(P, f):
    low = band_db(P, f, 40, 250)
    env = np.maximum(np.diff(low, prepend=low[0]), 0)
    env = env - env.mean()
    fps = SR / HOP
    if len(env) < fps * 8: return None, 0.0
    ac = np.correlate(env, env, "full")[len(env) - 1:]
    ac /= ac[0] + 1e-9
    lags = np.arange(len(ac))
    lo, hi = int(fps * 60 / 180), int(fps * 60 / 70)
    k = lo + int(np.argmax(ac[lo:hi]))
    return round(60 * fps / k, 1), round(float(ac[k]), 3)


def voice_features(x):
    P, f = stft_power(x)
    fps = SR / HOP
    v = band_db(P, f, 300, 3000)
    top = np.percentile(v, 95)
    env = ndimage.uniform_filter1d(v, max(1, int(0.04 * fps)))
    pk, pr = signal.find_peaks(env, prominence=4, distance=int(0.1 * fps), height=top - 22)
    dur = len(x) / SR
    active = env > top - 25
    out = {"syllables_per_s": round(len(pk) / dur, 2), "speech_active_pct": round(100 * float(active.mean()), 1),
           "voice_level_std_db": round(float(np.std(env[pk])), 2) if len(pk) > 3 else None}
    out.update(pitch(x, v, top))
    return out


def pitch(x, vdb, top):
    """YIN f0 on frames of 1024 at hop 256; voiced if CMNDF dip < 0.15 and voice band is loud."""
    if len(x) < NFFT * 4: return {"pitch_std_st": None, "pitch_range_st": None, "median_f0_hz": None}
    n = 1 + (len(x) - NFFT) // HOP
    fr = np.lib.stride_tricks.as_strided(x, (n, NFFT), (x.strides[0] * HOP, x.strides[0])).astype(np.float64)
    fr = fr - fr.mean(1, keepdims=True)
    tmin, tmax = int(SR / 400), int(SR / 65)
    F = np.fft.rfft(fr, 2 * NFFT, axis=1)
    acf = np.fft.irfft(np.abs(F) ** 2, axis=1)[:, :tmax + 2]
    cs = np.concatenate([np.zeros((n, 1)), np.cumsum(fr ** 2, axis=1)], 1)
    tau = np.arange(tmax + 2)
    e1 = cs[:, NFFT - tau]              # sum x_j^2, j < W - tau
    e2 = cs[:, NFFT:NFFT + 1] - cs[:, tau]  # sum x_j^2, j >= tau
    d = e1 + e2 - 2 * acf
    d[:, 0] = 0
    cm = np.ones_like(d)
    cm[:, 1:] = d[:, 1:] * tau[1:] / (np.cumsum(d[:, 1:], axis=1) + 1e-12)
    f0 = np.full(n, np.nan)
    loud = vdb[:n] > top - 15  # strong speech only, so a music bed between words is not tracked
    for i in np.where(loud)[0]:
        c = cm[i]
        below = np.where(c[tmin:tmax] < 0.15)[0]
        if not len(below): continue
        k = tmin + below[0]
        while k + 1 < tmax and c[k + 1] < c[k]: k += 1
        a, b, cc = c[k - 1], c[k], c[k + 1]
        den = a - 2 * b + cc
        kk = k + (0.5 * (a - cc) / den if abs(den) > 1e-12 else 0)
        f0[i] = SR / kk
    v = np.where(~np.isnan(f0))[0]
    if len(v) < 50: return {"pitch_std_st": None, "pitch_range_st": None, "median_f0_hz": None}
    med = np.median(f0[v])
    st = 12 * np.log2(f0[v] / med)
    loc = ndimage.median_filter(st, 9, mode="nearest")
    st = st[np.abs(st - loc) < 4]  # drop octave jumps and stray frames
    return {"pitch_std_st": round(float(st.std()), 2),
            "pitch_range_st": round(float(np.percentile(st, 95) - np.percentile(st, 5)), 2),
            "median_f0_hz": round(float(med), 1), "voiced_pct": round(100 * len(v) / n, 1)}


def bed_level(P, f, voice_P=None):
    fps = SR / HOP
    blk = max(1, int(0.05 * fps))
    tot = 10 * np.log10(ndimage.uniform_filter1d(P.sum(1), blk) + 1e-10)[::blk]
    vb = band_db(P, f, 300, 3000)
    vb = ndimage.uniform_filter1d(vb, blk)[::blk]
    speech = np.median(tot[vb > np.percentile(vb, 50)])
    out = {"bed_rel_db": round(float(np.percentile(tot, 10) - speech), 1)}
    if voice_P is not None:  # exact: mix level where the voice track is silent
        vv = 10 * np.log10(ndimage.uniform_filter1d(voice_P.sum(1), blk) + 1e-10)[::blk]
        m = min(len(vv), len(tot))
        gaps = vv[:m] < np.percentile(vv[:m], 95) - 45
        if gaps.sum() > 10: out["bed_in_voice_gaps_rel_db"] = round(float(np.median(tot[:m][gaps]) - speech), 1)
    return out


def align_voice(mix, voice, start):
    """Offset (s) of the voice file relative to the render timeline, from envelope cross-correlation."""
    def env(x):
        P, f = stft_power(x)
        e = band_db(P, f, 300, 3000)
        return (e - e.mean()) / (e.std() + 1e-9)
    a = env(mix); b = env(voice)
    fps = SR / HOP
    s0 = int(start * fps); best, lag = -1e9, 0
    for L in range(-int(5 * fps), int(5 * fps) + 1, 2):
        j = s0 + L
        if j < 0 or j + len(a) > len(b) + len(a) // 2: continue
        bb = b[max(j, 0):j + len(a)]
        m = min(len(bb), len(a))
        if m < len(a) // 2: continue
        c = float(np.dot(a[:m], bb[:m]) / m)
        if c > best: best, lag = c, L
    return lag / fps


# ---------------------------------------------------------------- one video
def measure(path, start, dur, voice=None):
    if dur is None: dur = duration_of(path) - (start or 0)
    print(f"  measuring {os.path.basename(path)} {start or 0:.1f}+{dur:.1f}s", flush=True)
    r = {"file": os.path.abspath(path), "start": start or 0, "dur": round(dur, 2)}
    mins = dur / 60
    mm = motion_metrics.measure(path, start, dur)
    r["moving_frames_pct"] = mm["moving_frames_pct"]; r["holds_1s_per_min"] = mm["holds_1s_per_min"]
    hard, soft = cuts(path, start, dur)
    r["hard_cuts_per_min"] = round(len(hard) / mins, 1); r["soft_changes_per_min"] = round(len(soft) / mins, 1)
    G = read_frames(path, start, dur, FPS, W, H)
    speed, ok, model = global_motion(G, hard)
    fast = segments(ok & (speed >= 2.0), min_len=4, gap=3)  # gaps <= 0.25 s join one move
    drift = ok & (speed >= 0.4) & (speed < 2.0)
    r["camera_moves_per_min"] = round(len(fast) / mins, 1)
    r["camera_drift_pct"] = round(100 * float(drift.mean()), 1) if len(drift) else 0.0
    r["camera_moving_pct"] = round(100 * float((ok & (speed >= 0.4)).mean()), 1) if len(ok) else 0.0
    vc, _ = visual_changes(G, model)
    r["visual_changes_per_min"] = round(len(vc) / mins, 1)
    thumbs = read_frames(path, start, dur, 2, 192, 108, rgb=True)
    r.update(look(G, thumbs))
    del G
    r["loudness_lufs"], r["lra_lu"] = ebur128(path, start, dur)
    x = read_audio(path, start, dur)
    P, f = stft_power(x)
    hits, _ = sfx_hits(P, f)
    r["sfx_hits_per_min"] = round(len(hits) / mins, 1)
    changes = sorted(hard + soft)
    sync = synced(hits, changes)
    r["hits_on_changes_per_min"] = round(len(sync) / mins, 1)
    r["hits_on_changes_pct"] = round(100 * len(sync) / len(changes), 1) if changes else None
    # how many would line up by chance, given the hit rate (0.45 s window per change)
    r["hits_on_changes_chance_per_min"] = round(len(changes) * min(1, len(hits) / dur * 0.45) / mins, 1)
    r["tempo_bpm"], r["tempo_conf"] = tempo(P, f)
    vP = None
    vo = None
    if voice:
        vx_all = read_audio(voice)
        off = align_voice(x, vx_all, start or 0)
        a = int(max(0, (start or 0) + off) * SR)
        vo = vx_all[a:a + len(x)]
        vP, _ = stft_power(vo)
        r["voice_offset_s"] = round(off, 2)
        r["voice_only_sfx_hits_per_min"] = round(len(sfx_hits(vP, f)[0]) / mins, 1)  # detector false alarms on clean speech
    r.update(bed_level(P, f, vP))
    del P
    r["voice_mix"] = voice_features(x)
    if vo is not None: r["voice_track"] = voice_features(vo)
    r["events"] = {"hard_cuts": [round(t, 2) for t in hard], "soft_changes": [round(t, 2) for t in soft],
                   "camera_moves": [[round(a / FPS, 2), round((b + STEP) / FPS, 2)] for a, b in fast],
                   "visual_changes": vc, "sfx_hits": hits, "hits_on_changes": [round(t, 2) for t in sync]}
    return r, thumbs


# ---------------------------------------------------------------- verdicts and outputs
def verdicts(ref, ours):
    vk = "voice_track" if "voice_track" in ours else "voice_mix"
    rows = []

    def rate(name, a, b, tol=0.25):
        if a is None or b is None: return "n/a", "missing"
        if a == 0: return ("PASS" if b <= 1 else "FAIL"), "ref 0: ours <= 1"
        return ("PASS" if abs(b - a) <= tol * abs(a) else "FAIL"), f"+-{int(tol * 100)}%"

    def atleast(a, b, frac):
        if a is None or b is None: return "n/a", "missing"
        return ("PASS" if b >= frac * a else "FAIL"), f">= {int(frac * 100)}% of ref"

    def absband(a, b, tol, unit):
        if a is None or b is None: return "n/a", "missing"
        return ("PASS" if abs(b - a) <= tol else "FAIL"), f"+-{tol} {unit}"

    def add(label, key, fn, a=None, b=None):
        a = ref.get(key) if a is None else a; b = ours.get(key) if b is None else b
        v, band = fn(a, b)
        rows.append({"measure": label, "key": key, "ref": a, "ours": b, "band": band, "verdict": v})

    add("Moving frames %", "moving_frames_pct", lambda a, b: (("PASS" if b >= a - 5 else "FAIL"), ">= ref - 5"))
    add("Holds >= 1 s / min", "holds_1s_per_min",
        lambda a, b: (("PASS" if b <= max(a * 1.25, a + 0.5) else "FAIL"), "<= max(ref x1.25, ref+0.5)"))
    for label, key in [("Hard cuts / min", "hard_cuts_per_min"), ("Soft scene changes / min", "soft_changes_per_min"),
                       ("Camera moves / min", "camera_moves_per_min"), ("Visual changes / min", "visual_changes_per_min")]:
        add(label, key, lambda a, b: rate(None, a, b))
    add("Slow camera drift % of time", "camera_drift_pct", lambda a, b: rate(None, a, b))
    add("Edge density % (graphics busyness)", "edge_density_pct", lambda a, b: rate(None, a, b))
    add("Brightness 0-255", "brightness", lambda a, b: absband(a, b, 20, ""))
    add("Contrast (luma std)", "contrast", lambda a, b: rate(None, a, b))
    add("Loudness LUFS", "loudness_lufs", lambda a, b: absband(a, b, 2, "LU"))
    add("Loudness range LU", "lra_lu", lambda a, b: absband(a, b, 3, "LU"))
    add("SFX hits on visual changes / min", "hits_on_changes_per_min", lambda a, b: atleast(a, b, 0.6))
    rows.append({"measure": "Sharp transients / min (mix, rough)", "key": "sfx_hits_per_min", "ref": ref.get("sfx_hits_per_min"),
                 "ours": ours.get("sfx_hits_per_min"), "band": "info (TTS word starts count)", "verdict": "info"})
    add("Bed level between words dB", "bed_rel_db", lambda a, b: absband(a, b, 6, "dB"))
    rows.append({"measure": "Music tempo BPM (conf)", "key": "tempo_bpm",
                 "ref": f"{ref.get('tempo_bpm')} ({ref.get('tempo_conf')})",
                 "ours": f"{ours.get('tempo_bpm')} ({ours.get('tempo_conf')})", "band": "info", "verdict": "info"})
    rv, ov = ref["voice_mix"], ours[vk]
    add("Syllables / s (pace)", "syllables_per_s", lambda a, b: rate(None, a, b), rv["syllables_per_s"], ov["syllables_per_s"])
    add("Pitch variability st (std)", "pitch_std_st", lambda a, b: atleast(a, b, 0.75), rv["pitch_std_st"], ov["pitch_std_st"])
    add("Pitch range st (p5-p95)", "pitch_range_st", lambda a, b: atleast(a, b, 0.75), rv["pitch_range_st"], ov["pitch_range_st"])
    add("Voice loudness modulation dB", "voice_level_std_db", lambda a, b: atleast(a, b, 0.75),
        rv["voice_level_std_db"], ov["voice_level_std_db"])
    return rows, vk


def side_by_side(ref, rt, ours, ot, path):
    from PIL import Image, ImageDraw, ImageFont
    n = int(round(1.5 * min(ref["dur"], ours["dur"])))
    def pick(th, r):
        idx = np.clip(((np.arange(n) + 0.5) * len(th) / n).astype(int), 0, len(th) - 1)
        return th[idx], r["start"] + (np.arange(n) + 0.5) * r["dur"] / n
    (ra, rtimes), (oa, otimes) = pick(rt, ref), pick(ot, ours)
    try: font = ImageFont.truetype("arial.ttf", 14); big = ImageFont.truetype("arialbd.ttf", 20)
    except OSError: font = big = ImageFont.load_default()
    cols, tw, th, lab, gap = 15, 192, 108, 70, 14
    lines = math.ceil(n / cols)
    img = Image.new("RGB", (lab + cols * tw, 60 + lines * (2 * th + gap)), (24, 24, 24))
    d = ImageDraw.Draw(img)
    d.text((8, 8), f"TOP = REFERENCE  {os.path.basename(ref['file'])}  {ref['start']:.0f}s +{ref['dur']:.0f}s", fill=(230, 230, 120), font=big)
    d.text((8, 32), f"BOTTOM = OURS  {os.path.basename(ours['file'])}  {ours['start']:.0f}s +{ours['dur']:.0f}s   ({n} frames each, evenly spaced)", fill=(140, 220, 255), font=big)
    for k in range(n):
        line, c = divmod(k, cols)
        y0 = 60 + line * (2 * th + gap); x0 = lab + c * tw
        for row, (arr, tms, colr) in enumerate([(ra, rtimes, (230, 230, 120)), (oa, otimes, (140, 220, 255))]):
            y = y0 + row * th
            img.paste(Image.fromarray(np.ascontiguousarray(arr[k])), (x0, y))
            m, s = divmod(tms[k], 60)
            d.rectangle([x0, y + th - 17, x0 + 52, y + th], fill=(0, 0, 0))
            d.text((x0 + 3, y + th - 17), f"{int(m)}:{s:04.1f}", fill=colr, font=font)
        if c == 0:
            d.text((6, y0 + th / 2 - 8), "REF", fill=(230, 230, 120), font=big)
            d.text((6, y0 + th + th / 2 - 8), "OURS", fill=(140, 220, 255), font=big)
    img.save(path, quality=85)


def fmt(v):
    if isinstance(v, float): return f"{v:g}"
    return "-" if v is None else str(v)


def main():
    ap = argparse.ArgumentParser(description="Compare a render with its style reference using the same measurements.")
    ap.add_argument("--ref", required=True); ap.add_argument("--ref-start", type=float); ap.add_argument("--ref-dur", type=float)
    ap.add_argument("--ours", required=True); ap.add_argument("--ours-start", type=float); ap.add_argument("--ours-dur", type=float)
    ap.add_argument("--voice"); ap.add_argument("--out", required=True)
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    ref, rt = measure(a.ref, a.ref_start, a.ref_dur)
    ours, ot = measure(a.ours, a.ours_start, a.ours_dur, a.voice)
    rows, vk = verdicts(ref, ours)
    json.dump({"reference": ref, "ours": ours, "verdicts": rows}, open(os.path.join(a.out, "compare.json"), "w"), indent=1)
    side_by_side(ref, rt, ours, ot, os.path.join(a.out, "side-by-side.jpg"))
    md = [f"# Style compare\n", f"- Reference: `{os.path.basename(a.ref)}` {ref['start']:g}s + {ref['dur']:g}s",
          f"- Ours: `{os.path.basename(a.ours)}` {ours['start']:g}s + {ours['dur']:g}s"
          + (f" (voice measures from `{os.path.basename(a.voice)}`)" if vk == "voice_track" else ""), "",
          "| Measure | Reference | Ours | Band | Verdict |", "|---|---|---|---|---|"]
    md += [f"| {r['measure']} | {fmt(r['ref'])} | {fmt(r['ours'])} | {r['band']} | {r['verdict']} |" for r in rows]
    fails = [r["measure"] for r in rows if r["verdict"] == "FAIL"]
    md += ["", f"**{len(fails)} FAIL**: " + ", ".join(fails) if fails else "**All PASS**", "",
           "Colours (ref): " + " ".join(f"{c['hex']} {c['pct']}%" for c in ref["dominant_colours"]),
           "Colours (ours): " + " ".join(f"{c['hex']} {c['pct']}%" for c in ours["dominant_colours"]), "",
           "See side-by-side.jpg (reference top, ours below) and compare.json for event times."]
    open(os.path.join(a.out, "compare.md"), "w", encoding="utf-8").write("\n".join(md) + "\n")
    print("\n".join(md))


if __name__ == "__main__":
    main()
