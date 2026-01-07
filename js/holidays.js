
export function getHolidayName(date) {
	const y = date.getFullYear();
	const f = Math.floor,
	  G = y % 19,
	  C = f(y / 100),
	  H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
	  I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
	  J = (y + f(y / 4) + I + 2 - C + f(C / 4)) % 7,
	  L = I - J,
	  month = 3 + f((L + 40) / 44),
	  day = L + 28 - 31 * f(month / 4);

	const easter = new Date(y, month - 1, day);

	const holidays = {
	  "Neujahr": new Date(y, 0, 1),
	  "Tag der Arbeit": new Date(y, 4, 1),
	  "Tag der deutschen Einheit": new Date(y, 9, 3),
	  "Allerheiligen": new Date(y, 10, 1),
	  "1. Weihnachtstag": new Date(y, 11, 25),
	  "2. Weihnachtstag": new Date(y, 11, 26),

	  "Weiberfastnacht": new Date(easter.getTime() - 52 * 86400000),
	  "Rosenmontag": new Date(easter.getTime() - 48 * 86400000),
	  "Veilchendienstag": new Date(easter.getTime() - 47 * 86400000),
	  "Aschermittwoch": new Date(easter.getTime() - 46 * 86400000),

	  "Karfreitag": new Date(easter.getTime() - 2 * 86400000),
	  "Ostersonntag": new Date(easter.getTime()),
	  "Ostermontag": new Date(easter.getTime() + 1 * 86400000),
	  "Christi Himmelfahrt": new Date(easter.getTime() + 39 * 86400000),
	  "Pfingstsonntag": new Date(easter.getTime() + 50 * 86400000),
	  "Fronleichnam": new Date(easter.getTime() + 60 * 86400000),
	};

	for (const name in holidays) {
	  const h = holidays[name];
	  if (h.getDate() === date.getDate() && h.getMonth() === date.getMonth()) {
		return name;
	  }
	}
	return null;
}
