
import { fetchWeather, fetchSunTimes, fetchWeatherCode } from "./api.js";
import { getDayIcon, getNightIcon } from "./icons.js";
import { getHolidayName } from "../holidays.js";
import { getBirthdayName } from "../birthdays.js";

let sunTimes = null;
let displayIndex = 0;
export let weatherInfo; // für Fog-Override

export async function updateWeatherIcon() {
  try {
    if (!sunTimes) sunTimes = await fetchSunTimes();
    const now = new Date();
    const isDay = now >= sunTimes.sunrise && now < sunTimes.sunset;
    const img = document.getElementById("weatherIcon");
    if (!img) return;
    const code = await fetchWeatherCode();
    weatherInfo = code;
    img.src = isDay ? getDayIcon(code) : getNightIcon(code);
  } catch (e) {
    const img = document.getElementById("weatherIcon");
    if (img) img.src = "assets/bilder/day_cloudy.gif";
    console.error("updateWeatherIcon failed:", e);
  }
}

function degToDir(deg) {
  const dirs = ["N","NO","O","SO","S","SW","W","NW"];
  return dirs[Math.round(deg / 45) % 8];
}

export async function updateWeatherText() {
  try {
    const weather = await fetchWeather();
    const today = new Date();
    const holiday = getHolidayName(today);
    const birthday = getBirthdayName(today);

    // Geburtstag Icon sichtbar?
    const bIcon = document.getElementById("birthdayIcon");
    if (bIcon) {
      if (birthday) { bIcon.style.display = "block"; bIcon.title = `Geburtstag: ${birthday}`; }
      else          { bIcon.style.display = "none";  bIcon.title = ""; }
    }

    let text = "";
    switch (displayIndex) {
      case 0: {
        const t = weather.temp;
        const tStr = Number.isFinite(t) ? t.toFixed(1) : t;
        if (t > 0 && t <= 1.5) {
          text = `<span class="blink-orange">${tStr} °C</span>`;
        } else {
          const color = t > 25 ? "#FF3B30" : t <= 0 ? "#4DA3FF" : "#FFFFFF";
          text = `<span style="color:${color}">${tStr} °C</span>`;
        }
        break;
      }
      case 1: text = `${weather.pressure} mbar`; break;
      case 2: text = `${weather.wind} KM/H - ${degToDir(weather.winddir)}`; break;
      case 3:
        if (holiday) text = `<span style="color:#32CD32">${holiday}</span>`;
        else { displayIndex = (displayIndex + 1) % 5; return; }
        break;
      case 4:
        if (birthday) text = `<span style="color:#4CFF00">${birthday}</span>`;
        else { displayIndex = (displayIndex + 1) % 5; return; }
        break;
    }

    const el = document.getElementById("weatherText");
    if (el) el.innerHTML = text;
    displayIndex = (displayIndex + 1) % 5;
  } catch (e) {
    console.error("updateWeatherText failed:", e);
  }
}
