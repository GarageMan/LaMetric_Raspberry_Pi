
import { CLOCK_REFRESH_MS, ROTATION_MS, ICON_REFRESH_MS, MOON_REFRESH_MS } from "./config.js";
import { updateClock } from "./time.js";
import { updateMoonphase } from "./moon.js";
import { updateWeatherIcon, updateWeatherText } from "./weather/display.js";
import { initFogOverride } from "./fog-override.js";

function init() {
  updateClock();
  setInterval(updateClock, CLOCK_REFRESH_MS);

  updateWeatherIcon();
  setInterval(updateWeatherIcon, ICON_REFRESH_MS);

  updateWeatherText();
  setInterval(updateWeatherText, ROTATION_MS);

  updateMoonphase();
  setInterval(updateMoonphase, MOON_REFRESH_MS);

  initFogOverride();
}

document.addEventListener("DOMContentLoaded", init);
console.log('main.js geladen');
