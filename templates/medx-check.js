/* Shared by every template. Runs once fonts and photos are in:
   1. window.__fit shrinks a .fg block only when its text is wider than data-w (or taller than data-h). It never grows
      text past data-max, so the approved sizes stay as they are for text of the approved length.
   2. Checks: every face in <html data-faces> loaded with Croatian letters, the serif loaded (New York or the
      Newsreader fallback), every photo loaded, no text box leaves the canvas or overflows its box, no {{PLACEHOLDER}} left.
   The result goes to <html data-medx-status="OK|FAIL"> and data-medx-report. render.sh reads them.
   On FAIL a red banner is painted on the image, so a broken render can never pass for a good one. */
window.__fit = () => {
  for (const g of document.querySelectorAll('.fg')) {
    g.style.fontSize = '100px';
    const ws = [...g.querySelectorAll('.fit')].map(e => e.getBoundingClientRect().width).filter(w => w > 0);
    if (!ws.length) continue;
    const h = g.getBoundingClientRect().height;
    let fs = 100 * (+g.dataset.w) / Math.max(...ws);
    if (g.dataset.h) fs = Math.min(fs, 100 * (+g.dataset.h) / h);
    if (g.dataset.max) fs = Math.min(fs, +g.dataset.max);
    g.style.fontSize = fs.toFixed(2) + 'px';
  }
};

(async () => {
  const root = document.documentElement;
  try {
  const sample = 'Č Ć Š Ž Đ č ć š ž đ Aa 0123';
  const faces = (root.dataset.faces || '').split('|').map(s => s.trim()).filter(Boolean);
  const errs = [], notes = [];
  const fam = f => f.replace(/^.*?\d+px\s+/, '').replace(/["']/g, '').trim();
  const loaded = name => [...document.fonts].some(f => f.family.replace(/["']/g, '') === name && f.status === 'loaded');

  await Promise.all(faces.map(f => document.fonts.load(f, sample).catch(() => null)));
  if (root.dataset.serif === '1') {
    if (!root.classList.contains('serif-fallback')) await document.fonts.load("500 100px 'MedX Serif NY'", sample).catch(() => null);
    await document.fonts.load("500 100px 'MedX Serif Fallback'", sample).catch(() => null);
  }
  await document.fonts.ready;
  await Promise.all([...document.images].map(i => i.complete ? null : new Promise(r => { i.addEventListener('load', r); i.addEventListener('error', r); })));
  window.__fit();
  await new Promise(r => setTimeout(r, 50)); // a layout pass after the fit (requestAnimationFrame never fires in headless --dump-dom)

  for (const f of faces) {
    if (!loaded(fam(f)) || !document.fonts.check(f, sample)) errs.push('font not loaded: ' + f);
  }
  if (root.dataset.serif === '1') {
    if (loaded('MedX Serif NY') && !root.classList.contains('serif-fallback')) notes.push('serif: New York (system)');
    else if (loaded('MedX Serif Fallback')) notes.push('serif: Newsreader (OFL fallback, New York not found)');
    else errs.push('no serif face loaded');
  }
  for (const img of document.images) {
    if (!img.complete || !img.naturalWidth) errs.push('image missing: ' + (img.getAttribute('src') || '').split('/').pop());
  }
  for (const img of document.images) {
    if (/\/assets\/logo\//.test(img.src) || !img.naturalWidth) continue;
    const r = img.getBoundingClientRect();
    const s = Math.max(r.width / img.naturalWidth, r.height / img.naturalHeight) * (window.devicePixelRatio || 1);
    if (s > 1.2) notes.push('photo enlarged ' + s.toFixed(2) + 'x, it will look soft, use a larger file');
  }
  const [W, H] = (root.dataset.size || '0x0').split('x').map(Number); // the canvas, not the window
  const snip = e => e.textContent.trim().replace(/\s+/g, ' ').slice(0, 40);
  for (const e of document.querySelectorAll('[data-t]')) {
    const range = document.createRange(); range.selectNodeContents(e);
    for (const r of [e.getBoundingClientRect(), range.getBoundingClientRect()]) {  // the box and the text inside it
      if (!r.width && !r.height) continue;
      if (r.left < -1 || r.top < -1 || r.right > W + 1 || r.bottom > H + 1) { errs.push('text off canvas: ' + snip(e)); break; }
    }
  }
  if (H === 1920) for (const e of document.querySelectorAll('[data-t]')) {  // Instagram covers these bands on a story
    const r = e.getBoundingClientRect();
    if (r.height && (r.top < 250 || r.bottom > H - 340)) notes.push('in the story band Instagram covers: ' + snip(e));
  }
  for (const e of document.querySelectorAll('[data-box]')) {
    if (e.scrollWidth > e.clientWidth + 1 || e.scrollHeight > e.clientHeight + 1) errs.push('text overflows its box: ' + snip(e));
  }
  if (/\{\{[A-Z0-9_]+(\|[^}]*)?\}\}/.test(document.body.innerHTML)) errs.push('a {{PLACEHOLDER}} was not filled');

  root.dataset.medxStatus = errs.length ? 'FAIL' : 'OK';
  root.dataset.medxReport = errs.concat(notes).join(' / ');
  if (errs.length) {
    const b = document.createElement('div');
    b.textContent = 'RENDER FAILED: ' + errs.join(' / ');
    b.style.cssText = 'position:fixed;left:0;right:0;top:0;z-index:99;padding:24px;background:#d00;color:#fff;font:700 28px/1.3 system-ui,sans-serif';
    document.body.appendChild(b);
  }
  } catch (e) {
    root.dataset.medxStatus = 'FAIL';
    root.dataset.medxReport = 'check script error: ' + e;
  }
})();
