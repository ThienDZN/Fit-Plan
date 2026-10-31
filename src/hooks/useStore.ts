import { useCallback, useEffect, useState } from 'react';
import type { Day, Settings, Store } from '../core/types';
import { createDay } from '../storage/seed';
import { clearStore, emptyStore, loadStore, migrate, saveStore } from '../storage/storage';

export interface StoreApi {
  store: Store;
  ensureDay: (dateKey: string) => void;
  updateDay: (dateKey: string, updater: (d: Day) => Day) => void;
  updateSettings: (patch: Partial<Settings>) => void;
  setWeight: (weekKey: string, kg: number | null) => void;
  clearAll: () => void;
  importJson: (raw: unknown) => void;
}

export function useStore(): StoreApi {
  const [store, setStore] = useState<Store>(() => loadStore());

  useEffect(() => {
    saveStore(store);
  }, [store]);

  const ensureDay = useCallback((dateKey: string) => {
    setStore((s) => {
      if (s.days[dateKey]) return s;
      return { ...s, days: { ...s.days, [dateKey]: createDay(dateKey) } };
    });
  }, []);

  const updateDay = useCallback((dateKey: string, updater: (d: Day) => Day) => {
    setStore((s) => {
      const current = s.days[dateKey] ?? createDay(dateKey);
      return { ...s, days: { ...s.days, [dateKey]: updater(current) } };
    });
  }, []);

  const updateSettings = useCallback((patch: Partial<Settings>) => {
    setStore((s) => ({ ...s, settings: { ...s.settings, ...patch } }));
  }, []);

  const setWeight = useCallback((weekKey: string, kg: number | null) => {
    setStore((s) => {
      const weights = { ...s.weights };
      if (kg == null || Number.isNaN(kg)) delete weights[weekKey];
      else weights[weekKey] = kg;
      return { ...s, weights };
    });
  }, []);

  const clearAll = useCallback(() => {
    clearStore();
    setStore(emptyStore());
  }, []);

  const importJson = useCallback((raw: unknown) => {
    setStore(migrate(raw));
  }, []);

  return { store, ensureDay, updateDay, updateSettings, setWeight, clearAll, importJson };
}
