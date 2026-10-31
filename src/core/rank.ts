export interface Rank {
  key: string;
  name: string;
  icon: string;
  minKcal: number;
}

export const RANKS: Rank[] = [
  { key: 'dong', name: 'Đồng', icon: '🥉', minKcal: 0 },
  { key: 'bac', name: 'Bạc', icon: '🥈', minKcal: 5000 },
  { key: 'vang', name: 'Vàng', icon: '🥇', minKcal: 13000 },
  { key: 'bachkim', name: 'Bạch Kim', icon: '💠', minKcal: 26000 },
  { key: 'kimcuong', name: 'Kim Cương', icon: '💎', minKcal: 45000 },
  { key: 'tinhanh', name: 'Tinh Anh', icon: '🔮', minKcal: 70000 },
  { key: 'caothu', name: 'Cao Thủ', icon: '👑', minKcal: 100000 },
  { key: 'chientuong', name: 'Chiến Tướng', icon: '🏆', minKcal: 140000 },
];

export interface RankState {
  current: Rank;
  next: Rank | null;
  progress: number; // 0..1 tiến độ đến rank kế
}

export function rankFor(totalKcal: number): RankState {
  let current = RANKS[0];
  for (const r of RANKS) {
    if (totalKcal >= r.minKcal) current = r;
  }
  const idx = RANKS.indexOf(current);
  const next = RANKS[idx + 1] ?? null;
  const progress = next ? (totalKcal - current.minKcal) / (next.minKcal - current.minKcal) : 1;
  return { current, next, progress };
}
