import { describe, expect, it } from 'vitest';
import { rankFor } from '../core/rank';

describe('rankFor', () => {
  it('12.999 kcal -> Bạc; 13.000 kcal -> Vàng', () => {
    expect(rankFor(12999).current.name).toBe('Bạc');
    expect(rankFor(13000).current.name).toBe('Vàng');
  });

  it('0 kcal -> Đồng; đủ mốc cuối -> Chiến Tướng không có rank kế', () => {
    expect(rankFor(0).current.name).toBe('Đồng');
    const top = rankFor(140000);
    expect(top.current.name).toBe('Chiến Tướng');
    expect(top.next).toBeNull();
  });
});
