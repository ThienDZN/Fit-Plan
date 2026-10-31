import { DEFAULTS } from '../config';
import { STR } from '../strings';
import { diff, out, plan } from './formulas';
import type { Day, Settings } from './types';

export interface ReportResult {
  ok: boolean;
  reasons: string[];
  eat: number;
  outKcal: number;
  diffKcal: number;
}

export function isReported(day: Day, kg: number): boolean {
  return day.res != null && (plan(day, kg) > 0 || day.reason.trim().length >= 3);
}

export function evaluate(day: Day, kg: number, settings: Settings): ReportResult {
  const p = plan(day, kg);
  const t = settings.base + p - settings.def;
  const o = out(day, kg, settings);
  const d = diff(day, kg, settings);
  const reasons: string[] = [];

  if (p > 0 && !day.work) reasons.push(STR.report.notTrained);
  if (day.eat === 0) reasons.push(STR.report.noEat);
  if (day.eat > t + DEFAULTS.eatUp) {
    reasons.push(STR.report.overEat(Math.round(day.eat - (t + DEFAULTS.eatUp))));
  }
  if (day.eat < t - DEFAULTS.eatDown) {
    reasons.push(STR.report.underEat(Math.round(t - DEFAULTS.eatDown - day.eat)));
  }
  if (day.sugar > settings.sug) reasons.push(STR.report.tooMuchSugar);
  if (day.prot < settings.protMin) reasons.push(STR.report.lowProt);
  if (day.oil === 'high') reasons.push(STR.report.tooMuchOil);

  return { ok: reasons.length === 0, reasons, eat: day.eat, outKcal: o, diffKcal: d };
}
