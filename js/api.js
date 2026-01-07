
import { LAT, LON, TZ } from "../config.js";
export async function fetchSunTimes() {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&daily=sunrise,sunset&timezone=${encodeURIComponent(TZ)}`;
  const r = await fetch(url); const d = await r.json();
  return { sunrise: new Date(d.daily.sunrise[0]), sunset: new Date(d.daily.sunset[0]) };
}
export async function fetchWeatherCode() {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=weathercode&timezone=${encodeURIComponent(TZ)}`;
  const r = await fetch(url); const d = await r.json();
  return d.current.weathercode;
}
export async function fetchWeather() {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,pressure_msl,wind_speed_10m,wind_direction_10m&timezone=${encodeURIComponent(TZ)}`;
  const r = await fetch(url); const d = await r.json();
  return { temp: d.current.temperature_2m, pressure: d.current.pressure_msl, wind: d.current.wind_speed_10m, winddir: d.current.wind_direction_10m };
}
