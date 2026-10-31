export function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function parseDateKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function todayKey(now: Date = new Date()): string {
  return toDateKey(now);
}

// Thứ Hai của tuần chứa dateKey (JS getDay: 0 = CN ... 6 = T7).
export function mondayOf(dateKey: string): string {
  const d = parseDateKey(dateKey);
  const daysSinceMonday = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - daysSinceMonday);
  return toDateKey(d);
}

export function addDays(dateKey: string, n: number): string {
  const d = parseDateKey(dateKey);
  d.setDate(d.getDate() + n);
  return toDateKey(d);
}

export function weekdayOf(dateKey: string): number {
  return parseDateKey(dateKey).getDay();
}

export function monthKey(dateKey: string): string {
  return dateKey.slice(0, 7); // 'YYYY-MM'
}

// Danh sách các thứ Hai nằm trong tháng (4 hoặc 5 tuần).
export function mondaysInMonth(year: number, monthIndex: number): string[] {
  const monthStr = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
  const result: string[] = [];
  const first = new Date(year, monthIndex, 1);
  let cursor = mondayOf(toDateKey(first));
  if (monthKey(cursor) < monthStr) cursor = addDays(cursor, 7);
  while (monthKey(cursor) === monthStr) {
    result.push(cursor);
    cursor = addDays(cursor, 7);
  }
  return result;
}
