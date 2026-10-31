export type Intensity = 0 | 1 | 2; // 0 = Nhẹ, 1 = Vừa, 2 = Mạnh

export interface Session {
  a: number; // chỉ số trong bảng hoạt động
  min: number; // thời lượng phút
  lv: Intensity;
}

export type Oil = 'none' | 'low' | 'high';
export type Result = 'ok' | 'fail' | null;

export interface Day {
  work: boolean; // đã tập xong các buổi
  eat: number; // kcal đã ăn, 0 = chưa nhập
  sugar: number; // g
  oil: Oil;
  prot: number; // g
  res: Result; // null = chưa báo cáo
  reason: string; // lý do nghỉ
  ss: Session[]; // ss[0] là buổi chính, còn lại là buổi thêm
}

export interface Settings {
  base: number;
  def: number;
  goal: number;
  sug: number;
  protMin: number;
  heightCm?: number;
  age?: number;
  alarm: string; // "HH:mm"
}

export interface Store {
  schemaVersion: number;
  days: Record<string, Day>; // khóa 'YYYY-MM-DD' theo giờ máy
  weights: Record<string, number>; // khóa = ngày thứ Hai của tuần
  settings: Settings;
}
