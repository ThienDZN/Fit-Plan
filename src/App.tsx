import { useEffect, useState } from 'react';
import './styles.css';
import DayBar from './components/DayBar';
import Hero from './components/Hero';
import MealCard from './components/MealCard';
import MonthCard from './components/MonthCard';
import SettingsCard from './components/SettingsCard';
import TaskCard from './components/TaskCard';
import WeightCard from './components/WeightCard';
import WorkoutCard from './components/WorkoutCard';
import { todayKey } from './core/dates';
import { kgForDay } from './core/summary';
import { useStore } from './hooks/useStore';
import { createDay } from './storage/seed';
import { STR } from './strings';

const initialNow = new Date();

export default function App() {
  const { store, ensureDay, updateDay, updateSettings, setWeight, clearAll, importJson } =
    useStore();
  const [selectedDate, setSelectedDate] = useState<string>(() => todayKey(initialNow));
  const [viewYear, setViewYear] = useState(() => initialNow.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => initialNow.getMonth());
  const today = todayKey(initialNow);

  useEffect(() => {
    ensureDay(selectedDate);
  }, [selectedDate, ensureDay]);

  const day = store.days[selectedDate] ?? createDay(selectedDate);
  const kg = kgForDay(store, selectedDate);

  const selectDate = (dateKey: string) => {
    setSelectedDate(dateKey);
    ensureDay(dateKey);
    requestAnimationFrame(() => {
      document.getElementById('day-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(store, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fitplan-${todayKey()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="app">
      <Hero store={store} todayKey={today} />
      <DayBar store={store} selectedDate={selectedDate} today={today} onSelect={selectDate} />
      <WeightCard
        store={store}
        viewYear={viewYear}
        viewMonth={viewMonth}
        today={today}
        onSelectDate={selectDate}
        onViewMonth={(y, m) => {
          setViewYear(y);
          setViewMonth(m);
        }}
        onWeight={setWeight}
      />
      <WorkoutCard day={day} kg={kg} onChange={(d) => updateDay(selectedDate, () => d)} />
      <MealCard day={day} kg={kg} settings={store.settings} />
      <TaskCard
        day={day}
        kg={kg}
        settings={store.settings}
        onChange={(d) => updateDay(selectedDate, () => d)}
      />
      <MonthCard
        store={store}
        viewYear={viewYear}
        viewMonth={viewMonth}
        onViewMonth={(y, m) => {
          setViewYear(y);
          setViewMonth(m);
        }}
      />
      <SettingsCard
        settings={store.settings}
        currentKg={kg}
        onUpdate={updateSettings}
        onExport={exportJson}
        onImport={importJson}
        onClear={clearAll}
      />
      <footer className="footer">{STR.estimateNote}</footer>
    </div>
  );
}
