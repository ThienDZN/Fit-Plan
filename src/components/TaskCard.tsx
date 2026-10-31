import { useState } from 'react';
import { plan } from '../core/formulas';
import { evaluate } from '../core/report';
import type { Day, Oil, Settings } from '../core/types';
import { STR } from '../strings';

interface Props {
  day: Day;
  kg: number;
  settings: Settings;
  onChange: (day: Day) => void;
}

const OILS: Oil[] = ['none', 'low', 'high'];

export default function TaskCard({ day, kg, settings, onChange }: Props) {
  const [error, setError] = useState<string | null>(null);
  const p = plan(day, kg);
  const evaluation = day.res != null ? evaluate(day, kg, settings) : null;
  const sugarPct = Math.min(100, (day.sugar / settings.sug) * 100);

  const summarize = () => {
    if (p === 0 && day.reason.trim().length < 3) {
      setError(STR.report.restReasonTooShort);
      return;
    }
    setError(null);
    const r = evaluate(day, kg, settings);
    onChange({ ...day, res: r.ok ? 'ok' : 'fail' });
  };

  return (
    <section className="card">
      <h2 className="card-title">{STR.cards.task}</h2>

      <label className="field">
        <span>
          {STR.task.sugar} ({day.sugar}/{settings.sug} g)
        </span>
        <input
          type="number"
          min={0}
          value={day.sugar || ''}
          onChange={(e) => onChange({ ...day, sugar: Number(e.target.value) })}
        />
      </label>
      <div className="sugar-bar" aria-hidden="true">
        <div className="sugar-fill" style={{ width: `${sugarPct}%` }} />
      </div>

      <fieldset className="oil-seg">
        <legend>{STR.task.oil}</legend>
        {OILS.map((o) => (
          <label key={o} className={day.oil === o ? 'active' : ''}>
            <input
              type="radio"
              name="oil"
              value={o}
              checked={day.oil === o}
              onChange={() => onChange({ ...day, oil: o })}
            />
            <span>
              {o === 'none' ? STR.task.oilNone : o === 'low' ? STR.task.oilLow : STR.task.oilHigh}
            </span>
          </label>
        ))}
      </fieldset>

      <div className="grid2">
        <label className="field">
          <span>{STR.task.eat}</span>
          <input
            type="number"
            min={0}
            value={day.eat || ''}
            onChange={(e) => onChange({ ...day, eat: Number(e.target.value) })}
          />
        </label>
        <label className="field">
          <span>{STR.task.prot}</span>
          <input
            type="number"
            min={0}
            value={day.prot || ''}
            onChange={(e) => onChange({ ...day, prot: Number(e.target.value) })}
          />
        </label>
      </div>

      {error && <p className="error">{error}</p>}

      <button type="button" className="btn btn-primary" onClick={summarize}>
        {STR.task.summarize}
      </button>

      {evaluation && (
        <div className={`result ${evaluation.ok ? 'ok' : 'fail'}`}>
          <div className="result-title">
            {STR.task.resultTitle} — {evaluation.ok ? STR.task.ok : STR.task.fail}
          </div>
          <div>
            {STR.task.eatLabel}: {evaluation.eat} {STR.kcalUnit}
          </div>
          <div>
            {STR.task.outLabel}: {evaluation.outKcal} {STR.kcalUnit}
          </div>
          <div className={evaluation.diffKcal > 0 ? 'diff-pos' : 'diff-neg'}>
            {STR.task.diffLabel}: {evaluation.diffKcal > 0 ? '+' : ''}
            {evaluation.diffKcal} {STR.kcalUnit}
          </div>
          {evaluation.reasons.length > 0 && (
            <ul className="reasons">
              {evaluation.reasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
