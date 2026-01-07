
function getMoonPhase(date) {
  const lp = 2551443; // Sekunden pro synodischem Monat
  const now = date.getTime() / 1000;
  const new_moon = new Date(1970,0,7,20,35,0).getTime() / 1000;
  const phase = ((now - new_moon) % lp) / lp;
  return phase < 0 ? phase + 1 : phase;
}
function getMoonPhaseFile(phase) {
  if (phase < 0.03 || phase > 0.97) return "assets/bilder/moon_new.gif";
  if (phase < 0.16) return "assets/bilder/moon_waxing_crescent.gif";
  if (phase < 0.34) return "assets/bilder/moon_first_quarter.gif";
  if (phase < 0.47) return "assets/bilder/moon_waxing_gibbous.gif";
  if (phase < 0.53) return "assets/bilder/moon_full.gif";
  if (phase < 0.66) return "assets/bilder/moon_waning_gibbous.gif";
  if (phase < 0.84) return "assets/bilder/moon_last_quarter.gif";
  return "assets/bilder/moon_waning_crescent.gif";
}
export function updateMoonphase() {
  const el = document.getElementById("moonphase");
  if (!el) return;
  const phase = getMoonPhase(new Date());
  el.src = getMoonPhaseFile(phase);
}
