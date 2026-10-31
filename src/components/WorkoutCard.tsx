import { ACTIVITIES, DURATION_MAX, DURATION_MIN, DURATION_STEP, INTENSITIES } from '../config';
import { plan, sessionKcal } from '../core/formulas';
import type { Day, Intensity, Session } from '../core/types';
import { STR } from '../strings';
import ScrollWheel from './ScrollWheel';

interface Props {
  day: Day;
  kg: number;
  onChange: (day: Day) => void;
}

const ACTIVITY_OPTIONS = ACTIVITIES.map((a) => ({ value: a.id, label: a.name }));
const INTENSITY_OPTIONS = INTENSITIES.map((i) => ({ value: i.lv, label: i.name }));
const DURATION_OPTIONS = Array.from(
  { length: (DURATION_MAX - DURATION_MIN) / DURATION_STEP + 1 },
  (_, i) => {
    const v = DURATION_MIN + i * DURATION_STEP;
    return { value: v, label: `${v}` };
  },
);

export default function WorkoutCard({ day, kg, onChange }: Props) {
  const isRest = plan(day, kg) === 0;

  const updateSession = (index: number, patch: Partial<Session>) => {
    onChange({ ...day, ss: day.ss.map((s, i) => (i === index ? { ...s, ...patch } : s)) });
  };

  const addSession = () => {
    onChange({ ...day, ss: [...day.ss, { a: 5, min: 30, lv: 1 }] });
  };

  const removeSession = (index: number) => {
    if (index === 0) return;
    onChange({ ...day, ss: day.ss.filter((_, i) => i !== index) });
  };

  return (
    <section className="card" id="day-detail">
      <h2 className="card-title">{STR.cards.workout}</h2>

      {day.ss.map((s, i) => (
        <div className="session" key={i}>
          <div className="session-head">
            <span className="session-name">
              {i === 0 ? STR.workout.mainSession : `${STR.workout.extraSession} ${i}`}
            </span>
            <span className="session-kcal">
              {Math.round(sessionKcal(s, kg))} {STR.workout.estKcal}
            </span>
            {i > 0 && (
              <button
                type="button"
                className="btn btn-icon"
                onClick={() => removeSession(i)}
                aria-label={STR.workout.deleteSession}
              >
                ×
              </button>
            )}
          </div>
          <div className="wheels">
            <ScrollWheel
              label={STR.workout.activity}
              value={s.a}
              options={ACTIVITY_OPTIONS}
              onChange={(v) => updateSession(i, { a: v })}
            />
            <ScrollWheel
              label={STR.workout.duration}
              value={s.min}
              options={DURATION_OPTIONS}
              disabled={s.a === 0}
              onChange={(v) => updateSession(i, { min: v })}
            />
            <ScrollWheel
              label={STR.workout.intensity}
              value={s.lv}
              options={INTENSITY_OPTIONS}
              disabled={s.a === 0}
              onChange={(v) => updateSession(i, { lv: v as Intensity })}
            />
          </div>
        </div>
      ))}

      <button type="button" className="btn" onClick={addSession}>
        {STR.workout.addSession}
      </button>

      {isRest ? (
        <label className="field">
          <span>{STR.workout.reasonLabel}</span>
          <input
            type="text"
            value={day.reason}
            placeholder={STR.workout.reasonPlaceholder}
            onChange={(e) => onChange({ ...day, reason: e.target.value })}
          />
        </label>
      ) : (
        <label className="check">
          <input
            type="checkbox"
            checked={day.work}
            onChange={(e) => onChange({ ...day, work: e.target.checked })}
          />
          <span>{STR.workout.done}</span>
        </label>
      )}
    </section>
  );
}
