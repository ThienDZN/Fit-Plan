import { parseDateKey } from '../core/dates';
import { rankFor } from '../core/rank';
import { totalBurn } from '../core/summary';
import type { Store } from '../core/types';
import { STR } from '../strings';

interface Props {
  store: Store;
  todayKey: string;
}

export default function Hero({ store, todayKey }: Props) {
  const total = totalBurn(store);
  const { current, next, progress } = rankFor(total);
  const d = parseDateKey(todayKey);

  return (
    <header className="hero">
      <div className="hero-date">
        <strong>{STR.weekdayShort[d.getDay()]}</strong>
        <span>
          {d.getDate()}/{d.getMonth() + 1}/{d.getFullYear()}
        </span>
      </div>
      <div className="hero-rank">
        <span className="hero-icon" aria-hidden="true">
          {current.icon}
        </span>
        <div className="hero-rank-info">
          <div className="hero-rank-name">{current.name}</div>
          <div className="hero-rank-kcal">
            {total.toLocaleString('vi-VN')} {STR.hero.totalBurn}
          </div>
        </div>
      </div>
      {next ? (
        <div className="hero-progress">
          <div className="hero-progress-bar" style={{ width: `${Math.round(progress * 100)}%` }} />
          <span className="hero-progress-label">
            {next.icon} {next.name} · {Math.round((next.minKcal - total)).toLocaleString('vi-VN')} kcal
          </span>
        </div>
      ) : (
        <div className="hero-progress-label">Đã đạt rank cao nhất</div>
      )}
    </header>
  );
}
