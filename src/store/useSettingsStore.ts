import { create } from "zustand";
import { persist } from "zustand/middleware";
import { config } from "../config";

interface SettingsStore {
  // Timer
  timerEnabled: boolean;
  timerSeconds: number;
  timerAutoSkip: boolean;

  // History
  saveHistory: boolean;
  maxHistory: number;

  // Actions
  setTimerEnabled: (v: boolean) => void;
  setTimerSeconds: (v: number) => void;
  setTimerAutoSkip: (v: boolean) => void;
  setSaveHistory: (v: boolean) => void;
  setMaxHistory: (v: number) => void;
  resetToDefaults: () => void;
}

const defaults = {
  timerEnabled: true,
  timerSeconds: config.timer.defaultSeconds,
  timerAutoSkip: false,
  saveHistory: true,
  maxHistory: config.history.maxSessions,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaults,
      setTimerEnabled: (timerEnabled) => set({ timerEnabled }),
      setTimerSeconds: (timerSeconds) => set({ timerSeconds }),
      setTimerAutoSkip: (timerAutoSkip) => set({ timerAutoSkip }),
      setSaveHistory: (saveHistory) => set({ saveHistory }),
      setMaxHistory: (maxHistory) => set({ maxHistory }),
      resetToDefaults: () => set(defaults),
    }),
    { name: config.settings.storageKey },
  ),
);
