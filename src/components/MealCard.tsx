import { target } from '../core/formulas';
import type { Day, Settings } from '../core/types';
import { mealSetFor } from '../data/meals';
import { STR } from '../strings';

interface Props {
  day: Day;
  kg: number;
  settings: Settings;
}

export default function MealCard({ day, kg, settings }: Props) {
  const set = mealSetFor(day.ss[0]?.a ?? 0);
  const targetKcal = target(day, kg, settings);

  return (
    <section className="card">
      <h2 className="card-title">
        {STR.cards.meal} · {set.label}
      </h2>
      <p className="muted">
        {STR.meal.target}: {targetKcal} {STR.kcalUnit}
      </p>
      <div className="meal-list">
        {set.meals.map((m) => (
          <div className="meal" key={m.name}>
            <div className="meal-name">{m.name}</div>
            <ul>
              {m.items.map((it) => (
                <li key={it.name}>
                  <span>{it.name}</span>
                  <span>{it.kcal}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
