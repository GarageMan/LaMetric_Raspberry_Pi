
export function getDayIcon(code) {
  if (code === 0) return "assets/bilder/day_sunny.gif";
  if (code === 1 || code === 2) return "assets/bilder/day_partly_cloudy.gif";
  if (code === 3) return "assets/bilder/day_cloudy.gif";
  if (code >= 45 && code <= 48) return "assets/bilder/day_fog.gif";
  if (code >= 51 && code <= 63) return "assets/bilder/day_light_rain.gif";
  if (code >= 65 && code <= 67) return "assets/bilder/day_heavy_rain.gif";
  if (code === 77) return "assets/bilder/day_hail.gif";
  if (code >= 85 && code <= 86) return "assets/bilder/day_snow.gif";
  if (code >= 95 && code <= 99) return "assets/bilder/day_thunder.gif";
  return "assets/bilder/day_cloudy.gif";
}
export function getNightIcon(code) {
  if (code === 0) return "assets/bilder/night_bright.gif";
  if (code === 1 || code === 2) return "assets/bilder/night_partly_cloudy.gif";
  if (code === 3) return "assets/bilder/night_cloudy.gif";
  if (code === 45 || code === 48) return "assets/bilder/night_fog.gif";
  if (code >= 51 && code <= 63) return "assets/bilder/night_light_rain.gif";
  if (code >= 65 && code <= 67) return "assets/bilder/night_heavy_rain.gif";
  if (code >= 85 && code <= 86) return "assets/bilder/night_snow.gif";
  if (code >= 95 && code <= 99) return "assets/bilder/night_thunder.gif";
  return "assets/bilder/night_cloudy.gif";
}
