import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme =
  | "dark"
  | "midnight"
  | "forest"
  | "ocean"
  | "ember"
  | "light"
  | "dawn"
  | "arctic";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
    }),
    {
      name: "mockai_theme",
      onRehydrateStorage: () => (state) => {
        applyTheme(state?.theme ?? "dark");
      },
    },
  ),
);
