import { describe, expect, it } from 'vitest';
import { DEFAULTS } from '../config';
import { burn, diff, nearestWeight, out, plan, sessionKcal, target } from '../core/formulas';
import type { Day, Settings } from '../core/types';

const settings: Settings = {
  base: DEFAULTS.base,
  def: DEFAULTS.def,
  goal: DEFAULTS.goal,
  sug: DEFAULTS.sug,
  protMin: DEFAULTS.protMin,
  alarm: DEFAULTS.alarm,
};

function makeDay(ss: Day['ss'], work = false, eat = 0): Day {
  return { work, eat, sugar: 0, oil: 'none', prot: 0, res: null, reason: '', ss };
}

describe('sessionKcal', () => {
  it('Ngực + Tay sau 60 phút Vừa = 351 kcal', () => {
    expect(sessionKcal({ a: 1, min: 60, lv: 1 }, 78)).toBe(351);
  });

  it('Bơi 45 phút Vừa = 351 kcal', () => {
    expect(sessionKcal({ a: 9, min: 45, lv: 1 }, 78)).toBe(351);
  });

  it('Cầu lông 90 phút Mạnh = 702 kcal', () => {
    expect(sessionKcal({ a: 8, min: 90, lv: 2 }, 78)).toBe(702);
  });
});

describe('plan / target / out / diff', () => {
  it('Ngực + Tay sau 60p Vừa -> plan 351, target 2031', () => {
    const day = makeDay([{ a: 1, min: 60, lv: 1 }]);
    expect(plan(day, 78)).toBe(351);
    expect(target(day, 78, settings)).toBe(2031);
  });

  it('Ngày nghỉ -> plan 0, target 1680', () => {
    const day = makeDay([{ a: 0, min: 60, lv: 1 }]);
    expect(plan(day, 78)).toBe(0);
    expect(target(day, 78, settings)).toBe(1680);
  });

  it('burn chỉ tính khi work = true', () => {
    const day = makeDay([{ a: 1, min: 60, lv: 1 }]);
    expect(burn(day, 78)).toBe(0);
    const done = { ...day, work: true };
    expect(burn(done, 78)).toBe(351);
    expect(out(done, 78, settings)).toBe(2130 + 351);
  });

  it('diff = eat - out', () => {
    const day = makeDay([{ a: 1, min: 60, lv: 1 }], true, 2500);
    expect(diff(day, 78, settings)).toBe(2500 - (2130 + 351));
  });
});

describe('nearestWeight', () => {
  it('dùng cân tuần gần nhất <= hôm nay, nếu không có thì PW', () => {
    const weights = { '2026-10-19': 78.5, '2026-10-26': 77.9 };
    expect(nearestWeight(weights, '2026-10-31')).toBe(77.9);
    expect(nearestWeight({}, '2026-10-31')).toBe(DEFAULTS.pw);
    expect(nearestWeight(weights, '2026-10-20')).toBe(78.5);
  });
});
