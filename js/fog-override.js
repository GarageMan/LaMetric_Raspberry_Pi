
import { weatherInfo } from "./weather/display.js";
const FOG_ICON = "assets/bilder/day_fog.gif";
function hasFogText(str) {
  if (!str) return false;
  const t = String(str).toLowerCase();
  return t.includes("nebel") || t.includes("fog") || t.includes("mist") || t.includes("haze");
}
function hasFogByGlobals() {
  try {
    if (typeof weatherInfo !== "undefined" && (weatherInfo === 45 || weatherInfo === 48)) return true;
    if (typeof visibilityMeters !== "undefined" && visibilityMeters <= 1000) return true;
  } catch (e) {}
  return false;
}
function applyFogOverride() {
  const weatherEl = document.getElementById("weatherIcon");
  if (!weatherEl) return false;
  const textEl = document.getElementById("weatherText");
  const byText = hasFogText(textEl?.textContent);
  const byGlobals = hasFogByGlobals();
  if (byText || byGlobals) { weatherEl.src = FOG_ICON; return true; }
  return false;
}
export function initFogOverride() {
  applyFogOverride();
  const textEl = document.getElementById("weatherText");
  if (textEl) {
    const mo = new MutationObserver(() => applyFogOverride());
    mo.observe(textEl, { childList: true, subtree: true, characterData: true });
  }
  const iconEl = document.getElementById("weatherIcon");
  if (iconEl) {
    const moIcon = new MutationObserver(() => applyFogOverride());
    moIcon.observe(iconEl, { attributes: true, attributeFilter: ["src"] });
  }
}
