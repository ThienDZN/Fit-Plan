import { monthSummary } from '../core/summary';
import type { Store } from '../core/types';
import { STR } from '../strings';

interface Props {
  store: Store;
  viewYear: number;
  viewMonth: number; // 0-based
  onViewMonth: (year: number, month: number) => void;
}

export default function MonthCard({ store, viewYear, viewMonth, onViewMonth }: Props) {
  const s = monthSummary(store, viewYear, viewMonth);

  const shiftMonth = (delta: number) => {
    const d = new Date(viewYear, viewMonth + delta, 1);
    onViewMonth(d.getFullYear(), d.getMonth());
  };

  return (
    <section className="card">
      <div className="card-head">
        <h2 className="card-title">{STR.cards.month}</h2>
        <div className="month-nav">
          <button type="button" onClick={() => shiftMonth(-1)} aria-label={STR.weight.prevMonth}>
            ‹
          </button>
          <span>
            {viewMonth + 1}/{viewYear}
          </span>
          <button type="button" onClick={() => shiftMonth(1)} aria-label={STR.weight.nextMonth}>
            ›
          </button>
        </div>
      </div>

      <div className="month-grid">
        <div className="month-cell">
          <span>{STR.month.burn}</span>
          <strong>{s.burn} kcal</strong>
        </div>
        <div className="month-cell">
          <span>{STR.month.sessions}</span>
          <strong>{s.workDays}</strong>
        </div>
        <div className="month-cell">
          <span>{STR.month.totalOut}</span>
          <strong>{s.totalOut} kcal</strong>
        </div>
        <div className="month-cell">
          <span>{STR.month.deficit}</span>
          <strong>{s.deficit} kcal</strong>
        </div>
        <div className="month-cell">
          <span>{STR.month.fatKg}</span>
          <strong>{s.fatKg.toFixed(2)}</strong>
        </div>
        <div className="month-cell">
          <span>{STR.month.passDays}</span>
          <strong>{s.passDays}</strong>
        </div>
      </div>
    </section>
  );
}
