// Pure sequence logic for the hero cat. Inputs are page-space pixels; no DOM access.
// Anchor = the cat's nose at ground level. Frame paths are in "native" units (video px).
const K = 0.0023;        // em per native unit (cat is about 0.6em tall)
const R = 3;             // jump/sleep video playback speed
const VFPS = 24;
const CFG = { walk1: 0.9, walk2: 1.35, cycle: 0.2, sink: 0.012, breath: 0.9 };
const BPP = [0, 1, 2, 3, 2, 1];
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
function lastLE(arr, v) { let k = 0; for (let i = 0; i < arr.length; i++) if (arr[i] <= v) k = i; return k; }
// Two neighbouring silhouettes and how far we are between them (0..1), so the shape can be cross-faded every display frame.
function blend(c, v) {
  const k = lastLE(c.t, v), k2 = Math.min(k + 1, c.t.length - 1), span = c.t[k2] - c.t[k];
  return { d: c.d[k], d2: c.d[k2], f: span > 0 ? clamp((v - c.t[k]) / span, 0, 1) : 0 };
}
function breathe(S, t) {
  const u = t / CFG.breath, i = Math.floor(u), x = u - i;
  return { d: S.b[BPP[i % BPP.length]], d2: S.b[BPP[(i + 1) % BPP.length]], f: x * x * (3 - 2 * x) };
}

function makeCat(cat, G) {
  const s = K * G.F, J = cat.jump, S = cat.sleep, sink = CFG.sink * G.F;
  const takeoff = G.xD - 0.13 * G.F;
  const landNose = takeoff + J.endNose * s;
  const sleepNose = G.xL - S.finalCx * s;
  const yG = G.yB + sink;
  const d1 = Math.max(0, (takeoff - G.xStart) / (CFG.walk1 * G.F));
  const dj = (J.t[J.t.length - 1] - J.t[0]) / (VFPS * R);
  const d2 = Math.max(0, (sleepNose - landNose) / (CFG.walk2 * G.F));
  const ds = (S.t[S.t.length - 1] - S.t[0]) / (VFPS * R);
  const walk = (t) => {
    const n = cat.walk.d.length, u = ((t % CFG.cycle) / CFG.cycle) * n, k = Math.floor(u) % n;
    return { d: cat.walk.d[k], d2: cat.walk.d[(k + 1) % n], f: u - Math.floor(u) };
  };
  const rest = () => ({ x: sleepNose, y: yG - G.capH, d: S.b[3] });
  function poseAt(tau) {
    if (tau < 0) return null;
    let t = tau;
    if (t < d1) return { x: G.xStart + (takeoff - G.xStart) * (d1 ? t / d1 : 1), y: yG, ...walk(t) };
    t -= d1;
    if (t < dj) {
      const vf = J.t[0] + t * VFPS * R, p = clamp((vf - J.takeoff) / (J.land - J.takeoff), 0, 1);
      return { x: takeoff, y: yG - G.capH * (1 - (1 - p) * (1 - p)), ...blend(J, vf) };
    }
    t -= dj;
    if (t < d2) return { x: landNose + (sleepNose - landNose) * (d2 ? t / d2 : 1), y: yG - G.capH, ...walk(t) };
    t -= d2;
    if (t < ds) return { x: sleepNose, y: yG - G.capH, ...blend(S, S.t[0] + t * VFPS * R) };
    t -= ds;
    return { x: sleepNose, y: yG - G.capH, ...breathe(S, t) };
  }
  return { poseAt, rest, s, total: d1 + dj + d2 + ds, seg: { d1, dj, d2, ds }, takeoff, landNose, sleepNose };
}
export { makeCat, CFG, K };
