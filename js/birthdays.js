
export const BIRTHDAYS = [
  { name: "STEFFI", day: 3, month: 5 },
  { name: "JORK + BEN", day: 7, month: 10 },
  { name: "LUTZ", day: 17, month: 3 },
  { name: "WERNER", day: 26, month: 11 },
  { name: "ENA", day: 29, month: 6 },
  { name: "KAI", day: 25, month: 2 },
  { name: "JANA", day: 2, month: 10 },
  { name: "JARON", day: 15, month: 9 },
  { name: "NELE", day: 13, month: 4 },
  { name: "DORO", day: 7, month: 2 },
  { name: "MANO", day: 16, month: 1 },
  { name: "FINE", day: 8, month: 12 },
  { name: "PHILIPP", day: 12, month: 9 },
  { name: "MINA", day: 23, month: 7 },
  { name: "INGI", day: 16, month: 12 },
  { name: "RIEKE", day: 10, month: 8 },
  { name: "HEIKE", day: 4, month: 6 },
  { name: "FELIX", day: 12, month: 6 },
  { name: "ANNE", day: 9, month: 11 },
  { name: "RUTH", day: 16, month: 8 },
  { name: "HANS WURST", day: 3, month: 1 },
];
export function getBirthdayName(date) {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  for (const entry of BIRTHDAYS) if (entry.day === d && entry.month === m) return entry.name;
  return null;
}
