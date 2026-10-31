import { describe, expect, it } from 'vitest';
import { weightAdvice } from '../core/weight';

describe('weightAdvice', () => {
  it('0.5 kg/tuần -> giữ nguyên', () => {
    expect(weightAdvice(78, 77.5, 1).code).toBe('keep');
  });

  it('0.1 kg/tuần -> giảm chậm', () => {
    expect(weightAdvice(78, 77.9, 1).code).toBe('slow');
  });

  it('1.0 kg/tuần -> giảm quá nhanh', () => {
    expect(weightAdvice(78, 77.0, 1).code).toBe('fast');
  });
});
