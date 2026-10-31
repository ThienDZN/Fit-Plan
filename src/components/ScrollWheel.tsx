import { useCallback, useEffect, useRef } from 'react';

export interface WheelOption {
  value: number;
  label: string;
}

interface Props {
  label: string;
  value: number;
  options: WheelOption[];
  disabled?: boolean;
  onChange: (value: number) => void;
}

const ITEM_HEIGHT = 44;

export default function ScrollWheel({ label, value, options, disabled = false, onChange }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);
  const lastRef = useRef(value);

  const indexOf = options.findIndex((o) => o.value === value);

  useEffect(() => {
    lastRef.current = value;
    const el = scrollRef.current;
    if (el) el.scrollTop = Math.max(0, indexOf) * ITEM_HEIGHT;
  }, [value, indexOf, options]);

  const commit = useCallback(
    (next: number) => {
      if (next === lastRef.current) return;
      lastRef.current = next;
      if (timerRef.current != null) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => onChange(next), 150);
    },
    [onChange],
  );

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const index = Math.round(el.scrollTop / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(options.length - 1, index));
    const next = options[clamped]?.value;
    if (next !== undefined) commit(next);
  }, [options, commit]);

  const moveBy = useCallback(
    (delta: number) => {
      const current = indexOf >= 0 ? indexOf : 0;
      const next = Math.max(0, Math.min(options.length - 1, current + delta));
      const opt = options[next];
      if (opt) onChange(opt.value);
    },
    [indexOf, options, onChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        moveBy(e.key === 'ArrowUp' ? -1 : 1);
      }
    },
    [moveBy],
  );

  return (
    <div className={`wheel${disabled ? ' disabled' : ''}`}>
      <span className="wheel-label" id={`wheel-${label}`}>
        {label}
      </span>
      <div className="wheel-frame">
        <div className="wheel-band" aria-hidden="true" />
        <div
          ref={scrollRef}
          role="listbox"
          aria-labelledby={`wheel-${label}`}
          tabIndex={disabled ? -1 : 0}
          className="wheel-scroll"
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
        >
          <div className="wheel-pad" />
          {options.map((o) => (
            <div
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`wheel-item${o.value === value ? ' active' : ''}`}
            >
              {o.label}
            </div>
          ))}
          <div className="wheel-pad" />
        </div>
      </div>
      <select
        className="wheel-fallback"
        aria-label={label}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
