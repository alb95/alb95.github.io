// The jump between dimensions, in the style of the game: a wall of tiles that builds up from a point
// ("cover") or comes down from one ("reveal"). Used by the home page (the hero's speech bubble), by the
// game on arrival and between levels. The styles (.tiles) are in assets/css/style.css and play/play.css.
window.tileWipe = function (mode, x, y, done) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) { if (done) done(null); return null; }
  const W = innerWidth, H = innerHeight;
  const S = Math.max(34, Math.round(Math.max(W, H) / 18));   // tile size
  const cols = Math.ceil(W / S), rows = Math.ceil(H / S);
  const far = Math.hypot(Math.max(x, W - x), Math.max(y, H - y));
  const SPREAD = 0.7, ONE = 0.3;                                 // seconds: across the screen, one tile
  const colors = ["#22374f", "#14243a", "#0b1626", "#14243a", "#22374f", "#0f4c81"];
  const el = document.createElement("div");
  el.className = `tiles ${mode}`;
  el.setAttribute("aria-hidden", "true");
  el.style.setProperty("--s", `${S}px`);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const t = document.createElement("i");
      const d = Math.hypot((c + 0.5) * S - x, (r + 0.5) * S - y) / far;
      t.style.left = `${c * S}px`;
      t.style.top = `${r * S}px`;
      t.style.background = Math.random() < 0.08 ? "#7db4e6" : colors[Math.floor(Math.random() * colors.length)];
      t.style.animationDelay = `${(d * SPREAD + Math.random() * 0.06).toFixed(3)}s`;
      el.appendChild(t);
    }
  }
  document.body.appendChild(el);
  setTimeout(() => {
    if (mode === "reveal") el.remove();
    if (done) done(el);
  }, (SPREAD + 0.06 + ONE) * 1000);
  return el;
};
