// ─── Feature Registry ─────────────────────────────────────────────────────────
// Developer-controlled. Set a feature to false to remove it from the UI entirely.
// User preferences (timer duration, etc.) live in useSettingsStore.

export const config = {
  features: {
    questionTimer: true, // per-question countdown timer
    sessionHistory: true, // persist completed sessions to localStorage
    scoreChart: true, // score trend chart on History page
    exportPDF: true, // print/export feedback report as PDF
  },

  timer: {
    defaultSeconds: 120, // 2 minutes
    warningAt: 30, // ring turns red at 30 s remaining
    minSeconds: 30,
    maxSeconds: 300,
    stepSeconds: 30,
  },

  history: {
    maxSessions: 20,
    storageKey: "mockai_history",
  },

  settings: {
    storageKey: "mockai_settings",
  },
} as const;
