
export function updateClock() {
  const now = new Date();
  const pad = n => String(n).padStart(2, "0");
  const h = pad(now.getHours()), m = pad(now.getMinutes()), s = pad(now.getSeconds());
  const clockEl = document.getElementById("clock");
  if (clockEl) clockEl.textContent = `${h}:${m}:${s}`;

  const w = ["SONNTAG","MONTAG","DIENSTAG","MITTWOCH","DONNERSTAG","FREITAG","SAMSTAG"];
  const mo = ["JANUAR","FEBRUAR","MÄRZ","APRIL","MAI","JUNI","JULI","AUGUST","SEPTEMBER","OKTOBER","NOVEMBER","DEZEMBER"];
  const dateEl = document.getElementById("date");
  if (dateEl) dateEl.textContent = `${w[now.getDay()]}, ${now.getDate()}. ${mo[now.getMonth()]}`;
}
