export const DEFAULTS = {
  base: 2130,
  def: 450,
  goal: 70,
  pw: 78,
  sug: 40,
  protMin: 150,
  eatUp: 200,
  eatDown: 400,
  kcalPerKg: 7700,
  alarm: '22:20',
} as const;

export interface Activity {
  id: number;
  name: string;
  met: number; // MET ròng (đã trừ 1)
  icon: string;
}

export const ACTIVITIES: Activity[] = [
  { id: 0, name: 'Nghỉ ngơi', met: 0, icon: '🛌' },
  { id: 1, name: 'Ngực + Tay sau', met: 4.5, icon: '🏋️' },
  { id: 2, name: 'Lưng + Tay trước', met: 4.5, icon: '🏋️' },
  { id: 3, name: 'Chân + Vai', met: 5, icon: '🦵' },
  { id: 4, name: 'Bụng + Core', met: 3.5, icon: '🧘' },
  { id: 5, name: 'Chạy bộ', met: 8.8, icon: '🏃' },
  { id: 6, name: 'Đạp xe', met: 6.5, icon: '🚴' },
  { id: 7, name: 'Nhảy dây', met: 10, icon: '🪢' },
  { id: 8, name: 'Cầu lông', met: 5, icon: '🏸' },
  { id: 9, name: 'Bơi', met: 6, icon: '🏊' },
  { id: 10, name: 'Đi bộ nhanh', met: 3.3, icon: '🚶' },
  { id: 11, name: 'HIIT', met: 8, icon: '🔥' },
];

export interface IntensityOption {
  lv: 0 | 1 | 2;
  name: string;
  factor: number;
}

export const INTENSITIES: IntensityOption[] = [
  { lv: 0, name: 'Nhẹ', factor: 0.8 },
  { lv: 1, name: 'Vừa', factor: 1.0 },
  { lv: 2, name: 'Mạnh', factor: 1.2 },
];

export const DURATION_MIN = 10;
export const DURATION_MAX = 150;
export const DURATION_STEP = 5;

export function activityById(id: number): Activity | undefined {
  return ACTIVITIES.find((a) => a.id === id);
}

export function intensityByLv(lv: number): IntensityOption | undefined {
  return INTENSITIES.find((i) => i.lv === lv);
}
