import { ACTIVITIES } from '../config';
import { addDays, mondayOf, parseDateKey } from '../core/dates';
import { dayStatus } from '../core/status';
import { kgForDay } from '../core/summary';
import type { Store } from '../core/types';
import { createDay } from '../storage/seed';
import { STR } from '../strings';
import { statusText } from './statusText';

interface Props {
  store: Store;
  selectedDate: string;
  today: string;
  onSelect: (dateKey: string) => void;
}

export default function DayBar({ store, selectedDate, today, onSelect }: Props) {
  const monday = mondayOf(selectedDate);
  const days = Array.from({ length: 7 }, (_, i) => addDays(monday, i));

  return (
    <nav className="daybar" aria-label="7 ngày">
      {days.map((k) => {
        const day = store.days[k] ?? createDay(k);
        const st = dayStatus(day, kgForDay(store, k), k > today);
        const main = ACTIVITIES.find((a) => a.id === day.ss[0]?.a);
        return (
          <button
            key={k}
            type="button"
            className={`daycell st-${st}${k === selectedDate ? ' selected' : ''}`}
            onClick={() => onSelect(k)}
            aria-pressed={k === selectedDate}
          >
            <span className="daycell-icon" aria-hidden="true">
              {main?.icon ?? '·'}
            </span>
            <span className="daycell-label">
              {STR.weekdayShort[parseDateKey(k).getDay()]} {parseDateKey(k).getDate()}
            </span>
            <span className="daycell-status">{statusText(st)}</span>
          </button>
        );
      })}
    </nav>
  );
}
