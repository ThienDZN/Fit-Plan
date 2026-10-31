export type WeightAdviceCode = 'slow' | 'fast' | 'keep';

export interface WeightAdvice {
  code: WeightAdviceCode;
  message: string;
  speed: number; // kg/tuần
}

export function weightAdvice(prevKg: number, currKg: number, weeksBetween: number): WeightAdvice {
  const speed = (prevKg - currKg) / weeksBetween;
  if (speed < 0.25) {
    return {
      code: 'slow',
      speed,
      message: 'Giảm chậm — nên cắt thêm 100–150 kcal/ngày',
    };
  }
  if (speed > 0.8) {
    return {
      code: 'fast',
      speed,
      message: 'Giảm quá nhanh — nên tăng thêm khoảng 150 kcal/ngày để giữ cơ',
    };
  }
  return { code: 'keep', speed, message: 'Giữ nguyên mức hiện tại' };
}
