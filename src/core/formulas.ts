import { DEFAULTS, intensityByLv, activityById } from '../config';
import type { Day, Session, Settings } from './types';

export function intensityFactor(lv: number): number {
  return intensityByLv(lv)?.factor ?? 1;
}

export function sessionKcal(s: Session, kg: number): number {
  const a = activityById(s.a);
  if (!a) return 0;
  return a.met * kg * (s.min / 60) * intensityFactor(s.lv);
}

export function plan(day: Day, kg: number): number {
  return Math.round(day.ss.reduce((sum, s) => sum + sessionKcal(s, kg), 0));
}

export function burn(day: Day, kg: number): number {
  return day.work ? plan(day, kg) : 0;
}

export function target(day: Day, kg: number, settings: Settings): number {
  return settings.base + plan(day, kg) - settings.def;
}

export function out(day: Day, kg: number, settings: Settings): number {
  return settings.base + burn(day, kg);
}

export function diff(day: Day, kg: number, settings: Settings): number {
  return day.eat - out(day, kg, settings);
}

// Cân nặng gần nhất: tìm khóa tuần (thứ Hai) lớn nhất <= todayKey, nếu không có thì PW.
export function nearestWeight(
  weights: Record<string, number>,
  todayKey: string,
  fallback: number = DEFAULTS.pw,
): number {
  const keys = Object.keys(weights)
    .filter((k) => k <= todayKey)
    .sort();
  const latest = keys[keys.length - 1];
  if (latest == null) return fallback;
  const v = weights[latest];
  return typeof v === 'number' && Number.isFinite(v) ? v : fallback;
}
