import raw from './meals.json';

export interface MealItem {
  name: string;
  kcal: number;
  price?: number | null;
}

export interface Meal {
  name: string; // Sáng / Trưa / Tối / Phụ
  items: MealItem[];
}

export type MealSetId = 'rest' | 'weights' | 'cardio';

export interface MealSet {
  id: MealSetId;
  label: string;
  meals: Meal[];
}

export const MEAL_SETS: MealSet[] = raw.sets as MealSet[];

export function mealSetFor(activityId: number): MealSet {
  if (activityId === 0) return MEAL_SETS[0];
  if (activityId >= 1 && activityId <= 4) return MEAL_SETS[1];
  return MEAL_SETS[2];
}
