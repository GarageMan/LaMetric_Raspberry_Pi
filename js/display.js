
import { fetchWeather, fetchSunTimes, fetchWeatherCode } from "./api.js";
import { getDayIcon, getNightIcon } from "./icons.js";
import { getHolidayName } from "../holidays.js";
import { getBirthdayName } from "../birthdays.js";

let sunTimes = null;
let displayIndex = 0;

// Zentraler State, statt magischer Globals:
export const weatherState = { code: null, temp: null, pressure: null, wind: null, winddir: null, visibility: null };

export async function updateWeatherIcon() {
  try {
    if (!sunTimes) sunTimes = await fetchSunTimes();
    const now = new Date();
    const isDay = now >= sunTimes.sunrise && now < sunTimes.sunset;

    const img = document.getElementById("weatherIcon");
    if (!img) return;

    const code = await fetchWeatherCode();
    weatherState.code = code;

    // Fog-Override respektieren
    if (img.dataset.fogOverride === "true") return;

    img.src = isDay ? getDayIcon(code) : getNightIcon(code);
  } catch (e) {
    const img = document.getElementById("weatherIcon");
    if (img && img.dataset.fogOverride !== "true") {
      img.src = "assets/bilder/day_cloudy.gif";
    }
    console.error("updateWeatherIcon failed:", e);
  }
}

function degToDir(deg) {
  const dirs = ["N","NO","O","SO","S","SW","W","NW"];
  return dirs[Math.round(deg / 45) % 8];
}

export async function updateWeatherText() {
  try {
    const w = await fetchWeather();
    // State für andere Module
    weatherState.temp = w.temp;
    weatherState.pressure = w.pressure;
    weatherState.wind = w.wind;
    weatherState.winddir = w.winddir;

    const today = new Date();
    const holiday = getHolidayName(today);
    const birthday = getBirthdayName(today);

    // Geburtstag-Icon toggeln
    const bIcon = document.getElementById("birthdayIcon");
    if (bIcon) {
      if (birthday) { bIcon.style.display = "block"; bIcon.title = `Geburtstag: ${birthday}`; }
      else { bIcon.style.display = "none"; bIcon.title = ""; }
    }

    let text = "";
    // Blink-Zustände
    let applyBlueBlink   = false; // T <= 0
    let applyOrangeBlink = false; // 0 < T <= 1.5

    switch (displayIndex) {
      case 0: { // Temperatur-Slot
        const t = w.temp;
        const tStr = Number.isFinite(t) ? t.toFixed(1) : t;
        text = `${tStr} °C`;
        if (Number.isFinite(t)) {
          if (t <= 0)         applyBlueBlink   = true;
          else if (t <= 1.5)  applyOrangeBlink = true;  // <= 1.5 und > 0
        }
        break;
      }
      case 1:
        text = `${w.pressure} hPa`;
        break;
      case 2:
        text = `${w.wind} km/h - ${degToDir(w.winddir)}`;
        break;
      case 3:
        if (holiday) text = `${holiday}`; else { displayIndex = (displayIndex + 1) % 5; return; }
        break;
      case 4:
        if (birthday) text = `${birthday}`; else { displayIndex = (displayIndex + 1) % 5; return; }
        break;
    }

    const el = document.getElementById("weatherText");
    if (el) {
      // Text nur aktualisieren, wenn er sich ändert
      if (el.textContent !== text) el.textContent = text;

      // Blink-Klassen gegenseitig exklusiv setzen
      el.classList.toggle("blink-blue",   applyBlueBlink);
      el.classList.toggle("blink-orange", applyOrangeBlink);
      // Safety: nie beide gleichzeitig
      if (applyBlueBlink && applyOrangeBlink) {
        el.classList.remove("blink-orange");
      }
      if (!applyBlueBlink && !applyOrangeBlink) {
        el.classList.remove("blink-blue", "blink-orange");
      }
    }

    displayIndex = (displayIndex + 1) % 5;
  } catch (e) {
    console.error("updateWeatherText failed:", e);
  }
}
