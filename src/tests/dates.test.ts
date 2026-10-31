import { describe, expect, it } from 'vitest';
import { addDays, mondayOf, mondaysInMonth, toDateKey, weekdayOf } from '../core/dates';

describe('mondayOf', () => {
  it('31/10/2026 (thứ Bảy) -> 2026-10-26', () => {
    expect(mondayOf('2026-10-31')).toBe('2026-10-26');
  });

  it('thứ Hai giữ nguyên chính nó', () => {
    expect(mondayOf('2026-10-26')).toBe('2026-10-26');
  });
});

describe('toDateKey theo giờ địa phương', () => {
  it('23:50 và 00:10 phải rơi đúng ngày địa phương (không dùng UTC)', () => {
    expect(toDateKey(new Date(2026, 9, 31, 23, 50))).toBe('2026-10-31');
    expect(toDateKey(new Date(2026, 10, 1, 0, 10))).toBe('2026-11-01');
  });
});

describe('addDays / weekdayOf / mondaysInMonth', () => {
  it('addDays', () => {
    expect(addDays('2026-10-31', 1)).toBe('2026-11-01');
  });

  it('weekdayOf 31/10/2026 = 6 (thứ Bảy)', () => {
    expect(weekdayOf('2026-10-31')).toBe(6);
  });

  it('mondaysInMonth tháng 10/2026 gồm 26/10', () => {
    const list = mondaysInMonth(2026, 9);
    expect(list).toContain('2026-10-26');
    expect(list.length).toBeGreaterThanOrEqual(4);
  });
});
