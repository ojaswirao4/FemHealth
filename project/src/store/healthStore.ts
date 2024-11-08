import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HealthMetrics {
  sleep: number;
  stress: number;
  water: number;
  exercise: number;
  nutrition: number;
  mentalHealth: number;
}

export interface HealthData {
  name?: string;
  // General Health
  height?: number;
  weight?: number;
  age?: number;
  sleepHours?: number;
  waterIntake?: number;
  exercise?: {
    type: string;
    frequency: number;
    duration: number;
  };
  diet?: string;
  medicalHistory?: string[];
  allergies?: string[];

  // Reproductive Health
  menstrualCycle?: {
    lastPeriod: string;
    cycleLength: number;
    symptoms: string[];
  };
  contraceptionUse?: string;
  pregnancyHistory?: string;

  // Mental Health
  mood?: string;
  stressLevel?: 'low' | 'medium' | 'high';
  sleepQuality?: number;

  // Lifestyle
  alcohol?: string;
  caffeine?: number;
  smoking?: string;
  workLifeBalance?: number;

  // Daily Tracking
  dailyMetrics: {
    [date: string]: HealthMetrics;
  };
}

interface HealthStore {
  healthData: HealthData;
  setHealthData: (data: Partial<HealthData>) => void;
  updateField: (field: keyof HealthData, value: any) => void;
  addDailyMetrics: (date: string, metrics: HealthMetrics) => void;
  getWeeklyMetrics: () => { date: string; sleep: number; stress: number; water: number; exercise: number }[];
  calculateHealthScores: () => {
    category: string;
    score: number;
    ideal: number;
  }[];
}

const calculateScore = (value: number, ideal: number) => {
  return Math.min(100, (value / ideal) * 100);
};

export const useHealthStore = create<HealthStore>()(
  persist(
    (set, get) => ({
      healthData: {
        dailyMetrics: {},
      },
      setHealthData: (data) =>
        set((state) => ({ healthData: { ...state.healthData, ...data } })),
      updateField: (field, value) =>
        set((state) => ({
          healthData: { ...state.healthData, [field]: value },
        })),
      addDailyMetrics: (date, metrics) =>
        set((state) => ({
          healthData: {
            ...state.healthData,
            dailyMetrics: {
              ...state.healthData.dailyMetrics,
              [date]: metrics,
            },
          },
        })),
      getWeeklyMetrics: () => {
        const { dailyMetrics } = get().healthData;
        const today = new Date();
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          return date.toISOString().split('T')[0];
        }).reverse();

        return last7Days.map((date) => ({
          date,
          ...(dailyMetrics[date] || {
            sleep: 0,
            stress: 0,
            water: 0,
            exercise: 0,
          }),
        }));
      },
      calculateHealthScores: () => {
        const { dailyMetrics } = get().healthData;
        const dates = Object.keys(dailyMetrics);
        if (dates.length === 0) return [];

        const latestDate = dates[dates.length - 1];
        const latest = dailyMetrics[latestDate];

        return [
          { category: 'Sleep', score: calculateScore(latest.sleep, 8), ideal: 100 },
          { category: 'Exercise', score: calculateScore(latest.exercise, 60), ideal: 100 },
          { category: 'Nutrition', score: calculateScore(latest.nutrition, 100), ideal: 100 },
          { category: 'Mental Health', score: 100 - (latest.stress * 20), ideal: 100 },
        ];
      },
    }),
    {
      name: 'health-store',
    }
  )
);