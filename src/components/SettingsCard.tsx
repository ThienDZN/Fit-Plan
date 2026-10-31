import { useRef, useState } from 'react';
import type { Settings } from '../core/types';
import { STR } from '../strings';

interface Props {
  settings: Settings;
  currentKg: number;
  onUpdate: (patch: Partial<Settings>) => void;
  onExport: () => void;
  onImport: (raw: unknown) => void;
  onClear: () => void;
}

export default function SettingsCard({
  settings,
  currentKg,
  onUpdate,
  onExport,
  onImport,
  onClear,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [height, setHeight] = useState<string>(
    settings.heightCm != null ? String(settings.heightCm) : '',
  );
  const [age, setAge] = useState<string>(settings.age != null ? String(settings.age) : '');

  const calcBase = () => {
    const h = Number(height);
    const a = Number(age);
    if (!h || !a) return;
    const bmr = 10 * currentKg + 6.25 * h - 5 * a + 5;
    onUpdate({ base: Math.round(bmr * 1.2), heightCm: h, age: a });
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        onImport(JSON.parse(String(reader.result)));
      } catch {
        // bỏ qua file JSON không hợp lệ
      }
    };
    reader.readAsText(file);
  };

  return (
    <section className="card">
      <h2 className="card-title">{STR.cards.settings}</h2>
      <p className="muted">{STR.settings.estimate}</p>

      <div className="grid2">
        <label className="field">
          <span>{STR.settings.base}</span>
          <input
            type="number"
            value={settings.base}
            onChange={(e) => onUpdate({ base: Number(e.target.value) })}
          />
        </label>
        <label className="field">
          <span>{STR.settings.height}</span>
          <input
            type="number"
            inputMode="numeric"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>
        <label className="field">
          <span>{STR.settings.age}</span>
          <input
            type="number"
            inputMode="numeric"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <button type="button" className="btn" onClick={calcBase}>
          {STR.settings.baseHint}
        </button>
      </div>

      <div className="grid2">
        <label className="field">
          <span>{STR.settings.def}</span>
          <input
            type="number"
            value={settings.def}
            onChange={(e) => onUpdate({ def: Number(e.target.value) })}
          />
        </label>
        <label className="field">
          <span>{STR.settings.goal}</span>
          <input
            type="number"
            step="0.1"
            value={settings.goal}
            onChange={(e) => onUpdate({ goal: Number(e.target.value) })}
          />
        </label>
        <label className="field">
          <span>{STR.settings.sug}</span>
          <input
            type="number"
            value={settings.sug}
            onChange={(e) => onUpdate({ sug: Number(e.target.value) })}
          />
        </label>
        <label className="field">
          <span>{STR.settings.protMin}</span>
          <input
            type="number"
            value={settings.protMin}
            onChange={(e) => onUpdate({ protMin: Number(e.target.value) })}
          />
        </label>
        <label className="field">
          <span>{STR.settings.alarm}</span>
          <input
            type="time"
            value={settings.alarm}
            onChange={(e) => onUpdate({ alarm: e.target.value })}
          />
        </label>
      </div>

      <div className="btn-row">
        <button type="button" className="btn" onClick={onExport}>
          {STR.settings.export}
        </button>
        <button type="button" className="btn" onClick={() => fileRef.current?.click()}>
          {STR.settings.import}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleImport(f);
            e.target.value = '';
          }}
        />
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            if (window.confirm(STR.settings.clearConfirm)) onClear();
          }}
        >
          {STR.settings.clear}
        </button>
      </div>
    </section>
  );
}
