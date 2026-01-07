
export const BIRTHDAYS = [
  { name: "LUTZ", day: 17, month: 3 },
  { name: "HANS WURST", day: 3, month: 1 },
];
export function getBirthdayName(date) {
  const d = date.getDate();
  const m = date.getMonth() + 1;
  for (const entry of BIRTHDAYS) if (entry.day === d && entry.month === m) return entry.name;
  return null;
}
