import { weekdayOf } from '../core/dates';
import type { Day, Session } from '../core/types';

// Theo JS getDay: 0 = CN, 1 = T2, ... 6 = T7.
export const DEFAULT_PLAN_BY_WEEKDAY: Record<number, number> = {
  0: 0, // CN: nghỉ
  1: 1, // T2: Ngực + Tay sau
  2: 2, // T3: Lưng + Tay trước
  3: 0, // T4: nghỉ
  4: 3, // T5: Chân + Vai
  5: 9, // T6: Bơi
  6: 8, // T7: Cầu lông
};

export function defaultSessions(dateKey: string): Session[] {
  const wd = weekdayOf(dateKey);
  const main: Session = { a: DEFAULT_PLAN_BY_WEEKDAY[wd] ?? 0, min: 60, lv: 1 };
  const sessions = [main];
  if (wd === 6) sessions.push({ a: 9, min: 45, lv: 1 }); // T7 thêm bơi 45p Vừa
  return sessions;
}

export function createDay(dateKey: string): Day {
  return {
    work: false,
    eat: 0,
    sugar: 0,
    oil: 'none',
    prot: 0,
    res: null,
    reason: '',
    ss: defaultSessions(dateKey),
  };
}
