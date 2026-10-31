import { describe, expect, it } from 'vitest';
import { dayStatus } from '../core/status';
import type { Day } from '../core/types';

function makeDay(partial: Partial<Day> = {}): Day {
  return {
    work: false,
    eat: 0,
    sugar: 0,
    oil: 'none',
    prot: 0,
    res: null,
    reason: '',
    ss: [{ a: 1, min: 60, lv: 1 }],
    ...partial,
  };
}

describe('dayStatus', () => {
  it('ngày tương lai -> f', () => {
    expect(dayStatus(makeDay(), 78, true)).toBe('f');
  });

  it('tập xong -> t', () => {
    expect(dayStatus(makeDay({ work: true }), 78, false)).toBe('t');
  });

  it('nghỉ đã báo cáo -> r', () => {
    const rest = makeDay({ ss: [{ a: 0, min: 60, lv: 1 }], res: 'ok', reason: 'nghỉ' });
    expect(dayStatus(rest, 78, false)).toBe('r');
  });

  it('bỏ buổi (res != null, plan > 0, work = false) -> m', () => {
    expect(dayStatus(makeDay({ res: 'fail' }), 78, false)).toBe('m');
  });

  it('chưa báo cáo -> n', () => {
    expect(dayStatus(makeDay({ res: null }), 78, false)).toBe('n');
  });
});
