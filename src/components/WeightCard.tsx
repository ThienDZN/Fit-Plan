import { useState } from 'react';
import { ACTIVITIES } from '../config';
import { addDays, mondaysInMonth, weekdayOf } from '../core/dates';
import { dayStatus } from '../core/status';
import { burnForDay, kgForDay, trendAdvice, weekRangeLabel, weekSummary } from '../core/summary';
import type { Store } from '../core/types';
import { createDay } from '../storage/seed';
import { STR } from '../strings';
import { statusText } from './statusText';

interface Props {
  store: Store;
  viewYear: number;
  viewMonth: number; // 0-based
  today: string;
  onSelectDate: (dateKey: string) => void;
  onViewMonth: (year: number, month: number) => void;
  onWeight: (weekKey: string, kg: number | null) => void;
}

export default function WeightCard({
  store,
  viewYear,
  viewMonth,
  today,
  onSelectDate,
  onViewMonth,
  onWeight,
}: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const mondays = mondaysInMonth(viewYear, viewMonth);
  const advice = trendAdvice(store.weights);

  const shiftMonth = (delta: number) => {
    const d = new Date(viewYear, viewMonth + delta, 1);
    onViewMonth(d.getFullYear(), d.getMonth());
  };

  return (
    <section className="card">
      <div className="card-head">
        <h2 className="card-title">{STR.cards.weight}</h2>
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

      {advice ? (
        <p className="advice">
          {STR.weight.adviceTitle}: {advice.message}
        </p>
      ) : (
        <p className="muted">{STR.weight.remind}</p>
      )}

      {mondays.map((monday, idx) => {
        const prev = addDays(monday, -7);
        const currW = store.weights[monday];
        const prevW = store.weights[prev];
        const ws = weekSummary(store, monday);
        const diff = currW != null && prevW != null ? currW - prevW : null;
        const isOpen = expanded === monday;

        return (
          <div className="week" key={monday}>
            <div
              className="week-row"
              role="button"
              tabIndex={0}
              onClick={() => setExpanded(isOpen ? null : monday)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setExpanded(isOpen ? null : monday);
                }
              }}
              aria-expanded={isOpen}
            >
              <span className="week-label">
                {STR.weight.week} {idx + 1}
              </span>
              <span className="week-range">{weekRangeLabel(monday)}</span>
              <span className="week-stat">
                {ws.burn} {STR.kcalUnit} · {ws.passDays} {STR.weight.passDays}
              </span>
              <span className="week-weight" onClick={(e) => e.stopPropagation()}>
                <input
                  type="number"
                  step="0.1"
                  inputMode="decimal"
                  placeholder="kg"
                  aria-label={`${STR.weight.week} ${idx + 1} ${STR.weight.enterWeight}`}
                  value={currW ?? ''}
                  onChange={(e) =>
                    onWeight(monday, e.target.value === '' ? null : Number(e.target.value))
                  }
                />
              </span>
              <span className="week-diff">
                {diff != null ? `${diff > 0 ? '+' : ''}${diff.toFixed(1)} kg` : ''}
              </span>
            </div>

            {isOpen && (
              <div className="week-days">
                {Array.from({ length: 7 }, (_, i) => addDays(monday, i)).map((k) => {
                  const day = store.days[k] ?? createDay(k);
                  const st = dayStatus(day, kgForDay(store, k), k > today);
                  const activity = ACTIVITIES.find((a) => a.id === day.ss[0]?.a);
                  const label =
                    day.ss[0]?.a === 0
                      ? `${STR.status.rest}: ${day.reason || '—'}`
                      : `${activity?.name ?? ''} ${day.ss[0]?.min ?? 0}p`;

                  return (
                    <button
                      key={k}
                      type="button"
                      className={`day-mini st-${st}`}
                      onClick={() => onSelectDate(k)}
                    >
                      <span className="day-mini-top">
                        {STR.weekdayShort[weekdayOf(k)]} · {statusText(st)}
                      </span>
                      <span className="day-mini-label">{label}</span>
                      <span className="day-mini-stats">
                        Ăn {day.eat} · P {day.prot} · Đ {day.sugar} · Đốt{' '}
                        {Math.round(burnForDay(store, k, day))}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
