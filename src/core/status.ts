import { plan } from './formulas';
import type { Day } from './types';

export type DayStatus = 'f' | 't' | 'r' | 'm' | 'n';

// f = tương lai, t = tập xong, r = nghỉ đã báo cáo, m = bỏ buổi, n = chưa báo cáo.
export function dayStatus(day: Day, kg: number, isFuture: boolean): DayStatus {
  if (isFuture) return 'f';
  const p = plan(day, kg);
  if (p > 0 && day.work) return 't';
  if (p === 0 && day.res != null) return 'r';
  if (day.res != null && p > 0 && !day.work) return 'm';
  return 'n';
}
