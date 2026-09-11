// Shared helpers used by both index.html and manage.html.

// Small set of fixed "chrome" icons (nav, controls) that never come from
// the searchable icon library (see icons.json). These are Material Design
// Icons (MDI, viewBox "0 0 24 24") - kept separate from icons.json so the
// app shell never depends on that (larger) file being loaded first.
const CHROME_ICONS = {
  dns: { p: "M7,9A2,2 0 0,1 5,7A2,2 0 0,1 7,5A2,2 0 0,1 9,7A2,2 0 0,1 7,9M20,3H4A1,1 0 0,0 3,4V10A1,1 0 0,0 4,11H20A1,1 0 0,0 21,10V4A1,1 0 0,0 20,3M7,19A2,2 0 0,1 5,17A2,2 0 0,1 7,15A2,2 0 0,1 9,17A2,2 0 0,1 7,19M20,13H4A1,1 0 0,0 3,14V20A1,1 0 0,0 4,21H20A1,1 0 0,0 21,20V14A1,1 0 0,0 20,13Z", vb: "0 0 24 24" },
  hard_drive: { p: "M6,2H18A2,2 0 0,1 20,4V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V4A2,2 0 0,1 6,2M12,4A6,6 0 0,0 6,10C6,13.31 8.69,16 12.1,16L11.22,13.77C10.95,13.29 11.11,12.68 11.59,12.4L12.45,11.9C12.93,11.63 13.54,11.79 13.82,12.27L15.74,14.69C17.12,13.59 18,11.9 18,10A6,6 0 0,0 12,4M12,9A1,1 0 0,1 13,10A1,1 0 0,1 12,11A1,1 0 0,1 11,10A1,1 0 0,1 12,9M7,18A1,1 0 0,0 6,19A1,1 0 0,0 7,20A1,1 0 0,0 8,19A1,1 0 0,0 7,18M12.09,13.27L14.58,19.58L17.17,18.08L12.95,12.77L12.09,13.27Z", vb: "0 0 24 24" },
  settings: { p: "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z", vb: "0 0 24 24" },
  light_mode: { p: "M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z", vb: "0 0 24 24" },
  dark_mode: { p: "M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95M17.33,17.97C14.5,17.81 11.7,16.64 9.53,14.5C7.36,12.31 6.2,9.5 6.04,6.68C3.23,9.82 3.34,14.64 6.35,17.66C9.37,20.67 14.19,20.78 17.33,17.97Z", vb: "0 0 24 24" },
  stars: { p: "M12,1L9,9L1,12L9,15L12,23L15,15L23,12L15,9L12,1Z", vb: "0 0 24 24" },
  arrow_back: { p: "M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z", vb: "0 0 24 24" },
  add: { p: "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z", vb: "0 0 24 24" },
  edit: { p: "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z", vb: "0 0 24 24" },
  delete: { p: "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M9,8H11V17H9V8M13,8H15V17H13V8Z", vb: "0 0 24 24" },
  drag_indicator: { p: "M9,3H11V5H9V3M13,3H15V5H13V3M9,7H11V9H9V7M13,7H15V9H13V7M9,11H11V13H9V11M13,11H15V13H13V11M9,15H11V17H9V15M13,15H15V17H13V15M9,19H11V21H9V19M13,19H15V21H13V19Z", vb: "0 0 24 24" },
  close: { p: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z", vb: "0 0 24 24" },
  search: { p: "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z", vb: "0 0 24 24" },
  chevron_down: { p: "M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z", vb: "0 0 24 24" },
  public: { p: "M17.9,17.39C17.64,16.59 16.89,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A2,2 0 0,0 11,18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z", vb: "0 0 24 24" },
  lan: { p: "M10,2C8.89,2 8,2.89 8,4V7C8,8.11 8.89,9 10,9H11V11H2V13H6V15H5C3.89,15 3,15.89 3,17V20C3,21.11 3.89,22 5,22H9C10.11,22 11,21.11 11,20V17C11,15.89 10.11,15 9,15H8V13H16V15H15C13.89,15 13,15.89 13,17V20C13,21.11 13.89,22 15,22H19C20.11,22 21,21.11 21,20V17C21,15.89 20.11,15 19,15H18V13H22V11H13V9H14C15.11,9 16,8.11 16,7V4C16,2.89 15.11,2 14,2H10M10,4H14V7H10V4M5,17H9V20H5V17M15,17H19V20H15V17Z", vb: "0 0 24 24" },
  arrow_upward: { p: "M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z", vb: "0 0 24 24" },
  arrow_downward: { p: "M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z", vb: "0 0 24 24" },
  apps: { p: "M16,20H20V16H16M16,14H20V10H16M10,8H14V4H10M16,8H20V4H16M10,14H14V10H10M4,14H8V10H4M4,20H8V16H4M10,20H14V16H10M4,8H8V4H4V8Z", vb: "0 0 24 24" },
};

function svgIcon(pathData, size, viewBox, extraAttrs) {
  return '<svg width="' + size + '" height="' + size + '" viewBox="' + (viewBox || "0 0 24 24") + '" fill="currentColor"' +
    (extraAttrs ? " " + extraAttrs : "") + '><path d="' + pathData + '"/></svg>';
}

function chromeIcon(name, size) {
  const e = CHROME_ICONS[name] || CHROME_ICONS.apps;
  return svgIcon(e.p, size, e.vb);
}

// ---------------------------------------------------------------------
// Full icon library (icons.json), loaded once and cached. Each entry is
// {p: <path data>, vb: <viewBox>} - the pack is Material Design Icons
// (MDI) with a small set of legacy icons kept as a fallback for any name
// MDI doesn't have, so icon choices made before this pack switch keep
// rendering as something sensible instead of going blank.

let _iconLibPromise = null;
function loadIconLib() {
  if (!_iconLibPromise) {
    _iconLibPromise = fetch("/icons.json", { cache: "force-cache" }).then(function (r) { return r.json(); });
  }
  return _iconLibPromise;
}

function iconEntry(lib, name) {
  if (lib && lib[name]) return lib[name];
  if (lib && lib.apps) return lib.apps;
  return CHROME_ICONS.apps;
}

function renderIcon(lib, name, size) {
  const e = iconEntry(lib, name);
  return svgIcon(e.p, size, e.vb);
}

// ---------------------------------------------------------------------
// Deterministic color palette for service/section icon badges - picked
// from an id so the color is stable across reloads without needing to
// store it separately. A service can override this with its own "color"
// (a hex string) - see colorVariantsFromHex below.

const PALETTE = [
  { bg: "#EAF3EC", color: "#3F8A5C", darkBg: "#1E2B22", darkColor: "#6FCB93" },
  { bg: "#EAF0FB", color: "#3A5FC4", darkBg: "#1B2333", darkColor: "#7EA0F2" },
  { bg: "#FBF1E4", color: "#B4791F", darkBg: "#2B2416", darkColor: "#E0A94A" },
  { bg: "#EFEAFB", color: "#6B4FC4", darkBg: "#241C33", darkColor: "#A78BFA" },
  { bg: "#FBEAEA", color: "#C4503A", darkBg: "#2E1C1A", darkColor: "#E27B62" },
  { bg: "#E9F1F3", color: "#33808F", darkBg: "#16262A", darkColor: "#4FB8C9" },
  { bg: "#FBEAF3", color: "#B23E82", darkBg: "#2E1A26", darkColor: "#E38AB8" },
  { bg: "#F1F3E4", color: "#6B8F1F", darkBg: "#232B16", darkColor: "#A8CC5A" },
];

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function colorsForId(id) {
  return PALETTE[hashStr(String(id)) % PALETTE.length];
}

function hexToRgb(hex) {
  hex = String(hex).replace("#", "");
  if (hex.length === 3) hex = hex.split("").map(function (c) { return c + c; }).join("");
  const num = parseInt(hex, 16) || 0;
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}
function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map(function (v) {
    v = Math.max(0, Math.min(255, Math.round(v)));
    const s = v.toString(16);
    return s.length < 2 ? "0" + s : s;
  }).join("");
}
function mixHex(hex, target, ratio) {
  const c = hexToRgb(hex);
  return rgbToHex(
    c.r + (target.r - c.r) * ratio,
    c.g + (target.g - c.g) * ratio,
    c.b + (target.b - c.b) * ratio
  );
}
// Derives a light-mode/dark-mode bg+icon color pair from one user-picked
// base color, so picking a "highlight color" only requires one swatch.
function colorVariantsFromHex(hex) {
  const white = { r: 255, g: 255, b: 255 };
  const black = { r: 0, g: 0, b: 0 };
  return {
    bg: mixHex(hex, white, 0.88),
    color: mixHex(hex, black, 0.12),
    darkBg: mixHex(hex, black, 0.78),
    darkColor: mixHex(hex, white, 0.35),
  };
}

// item is a {id, color?} object (a service or section) - a custom "color"
// wins; otherwise the color is derived deterministically from the id.
function badgeStyle(item) {
  const custom = item && typeof item === "object" ? item.color : null;
  const id = item && typeof item === "object" ? item.id : item;
  const c = custom ? colorVariantsFromHex(custom) : colorsForId(id);
  return "--tbg-light:" + c.bg + ";--tcolor-light:" + c.color + ";--tbg-dark:" + c.darkBg + ";--tcolor-dark:" + c.darkColor + ";";
}

// ---------------------------------------------------------------------
// Theme toggle wiring (the initial flash-free resolution happens in an
// inline <script> in each page's <head> - this just wires up the click
// handler and keeps things in sync if the OS theme changes).

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem("theme", theme); } catch (e) {}
}

function wireThemeToggle(elId) {
  const el = document.getElementById(elId || "theme-toggle");
  if (!el) return;
  el.addEventListener("click", function () {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "light" : "dark");
  });
  try {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
      if (!localStorage.getItem("theme")) {
        document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
      }
    });
  } catch (e) {}
}

// ---------------------------------------------------------------------
// Small fetch helpers

async function apiGet(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(url + " -> HTTP " + res.status);
  return res.json();
}

async function apiSend(method, url, body) {
  const res = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body || {}),
  });
  if (!res.ok) {
    let msg = "HTTP " + res.status;
    try { const data = await res.json(); if (data.error) msg = data.error; } catch (e) {}
    throw new Error(msg);
  }
  return res.json();
}
