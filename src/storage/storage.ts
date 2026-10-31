import { DEFAULTS } from '../config';
import type { Settings, Store } from '../core/types';

export const STORAGE_KEY = 'fitplan.store';
export const SCHEMA_VERSION = 1;

export function defaultSettings(): Settings {
  return {
    base: DEFAULTS.base,
    def: DEFAULTS.def,
    goal: DEFAULTS.goal,
    sug: DEFAULTS.sug,
    protMin: DEFAULTS.protMin,
    alarm: DEFAULTS.alarm,
  };
}

export function emptyStore(): Store {
  return {
    schemaVersion: SCHEMA_VERSION,
    days: {},
    weights: {},
    settings: defaultSettings(),
  };
}

export function migrate(raw: unknown): Store {
  const obj = (raw && typeof raw === 'object' ? raw : {}) as Partial<Store>;
  const base = emptyStore();
  return {
    schemaVersion: SCHEMA_VERSION,
    days: obj.days && typeof obj.days === 'object' ? obj.days : {},
    weights: obj.weights && typeof obj.weights === 'object' ? obj.weights : {},
    settings: {
      ...base.settings,
      ...(obj.settings && typeof obj.settings === 'object' ? obj.settings : {}),
    },
  };
}

export function loadStore(): Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStore();
    return migrate(JSON.parse(raw));
  } catch {
    return emptyStore();
  }
}

export function saveStore(store: Store): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function clearStore(): void {
  localStorage.removeItem(STORAGE_KEY);
}
