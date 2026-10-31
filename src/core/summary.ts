import { DEFAULTS } from '../config';
import { addDays, monthKey, parseDateKey } from './dates';
import { burn, nearestWeight, out } from './formulas';
import type { Day, Store } from './types';
import { weightAdvice, type WeightAdvice } from './weight';

export function kgForDay(store: Store, dateKey: string): number {
  return nearestWeight(store.weights, dateKey, DEFAULTS.pw);
}

export function burnForDay(store: Store, dateKey: string, day: Day): number {
  return burn(day, kgForDay(store, dateKey));
}

export function totalBurn(store: Store): number {
  return Math.round(
    Object.entries(store.days).reduce((sum, [k, d]) => sum + burnForDay(store, k, d), 0),
  );
}

export interface WeekSummary {
  burn: number;
  passDays: number;
}

export function weekSummary(store: Store, mondayKey: string): WeekSummary {
  let burnSum = 0;
  let pass = 0;
  for (let i = 0; i < 7; i++) {
    const key = addDays(mondayKey, i);
    const day = store.days[key];
    if (!day) continue;
    burnSum += burnForDay(store, key, day);
    if (day.res === 'ok') pass++;
  }
  return { burn: Math.round(burnSum), passDays: pass };
}

export interface MonthSummary {
  burn: number;
  workDays: number;
  totalOut: number;
  deficit: number;
  fatKg: number;
  passDays: number;
}

export function monthSummary(store: Store, year: number, monthIndex: number): MonthSummary {
  const prefix = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
  let burnSum = 0;
  let workDays = 0;
  let totalOut = 0;
  let deficit = 0;
  let pass = 0;

  for (const [k, d] of Object.entries(store.days)) {
    if (monthKey(k) !== prefix) continue;
    if (d.work) workDays++;
    burnSum += burnForDay(store, k, d);
    if (d.eat > 0) {
      const o = out(d, kgForDay(store, k), store.settings);
      totalOut += o;
      deficit += o - d.eat;
    }
    if (d.res === 'ok') pass++;
  }

  return {
    burn: Math.round(burnSum),
    workDays,
    totalOut: Math.round(totalOut),
    deficit: Math.round(deficit),
    fatKg: deficit / DEFAULTS.kcalPerKg,
    passDays: pass,
  };
}

export function weeksBetween(a: string, b: string): number {
  const da = parseDateKey(a).getTime();
  const db = parseDateKey(b).getTime();
  return Math.round((db - da) / (7 * 24 * 60 * 60 * 1000));
}

export function trendAdvice(weights: Record<string, number>): WeightAdvice | null {
  const entries = Object.entries(weights).sort(([a], [b]) => a.localeCompare(b));
  if (entries.length < 2) return null;
  const [prevKey, prevKg] = entries[entries.length - 2];
  const [currKey, currKg] = entries[entries.length - 1];
  const weeks = weeksBetween(prevKey, currKey);
  if (weeks <= 0) return null;
  return weightAdvice(prevKg, currKg, weeks);
}

export function shortDate(dateKey: string): string {
  const d = parseDateKey(dateKey);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

export function weekRangeLabel(mondayKey: string): string {
  return `${shortDate(mondayKey)} – ${shortDate(addDays(mondayKey, 6))}`;
}
