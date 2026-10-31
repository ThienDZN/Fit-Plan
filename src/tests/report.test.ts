import { describe, expect, it } from 'vitest';
import { DEFAULTS } from '../config';
import { evaluate, isReported } from '../core/report';
import type { Day, Settings } from '../core/types';

const settings: Settings = {
  base: DEFAULTS.base,
  def: DEFAULTS.def,
  goal: DEFAULTS.goal,
  sug: DEFAULTS.sug,
  protMin: DEFAULTS.protMin,
  alarm: DEFAULTS.alarm,
};

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

describe('isReported', () => {
  it('ngày nghỉ cần lý do từ 3 ký tự', () => {
    const rest = makeDay({ ss: [{ a: 0, min: 60, lv: 1 }] });
    expect(isReported({ ...rest, res: 'ok', reason: '' }, 78)).toBe(false);
    expect(isReported({ ...rest, res: 'ok', reason: 'ab' }, 78)).toBe(false);
    expect(isReported({ ...rest, res: 'ok', reason: 'thi cử' }, 78)).toBe(true);
  });

  it('ngày tập không cần lý do', () => {
    expect(isReported({ ...makeDay(), res: 'ok' }, 78)).toBe(true);
    expect(isReported({ ...makeDay(), res: null }, 78)).toBe(false);
  });
});

describe('evaluate', () => {
  it('ngày đủ điều kiện -> ok, không lý do', () => {
    const day = makeDay({ work: true, eat: 2031, sugar: 20, oil: 'none', prot: 160 });
    const r = evaluate(day, 78, settings);
    expect(r.ok).toBe(true);
    expect(r.reasons).toHaveLength(0);
  });

  it('liệt kê đủ lý do không đạt', () => {
    const day = makeDay({ work: false, eat: 0, sugar: 60, oil: 'high', prot: 100 });
    const r = evaluate(day, 78, settings);
    expect(r.ok).toBe(false);
    expect(r.reasons).toContain('Chưa hoàn thành buổi tập');
    expect(r.reasons).toContain('Chưa nhập calo ăn vào');
    expect(r.reasons).toContain('Đường vượt mức cho phép');
    expect(r.reasons).toContain('Protein chưa đủ mức tối thiểu');
    expect(r.reasons).toContain('Ăn quá nhiều dầu mỡ');
  });
});
