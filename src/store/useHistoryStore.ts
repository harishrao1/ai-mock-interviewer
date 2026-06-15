import { create } from "zustand";
import { persist } from "zustand/middleware";
import { config } from "../config";
import type { Session } from "../types";

interface HistoryStore {
  sessions: Session[];
  addSession: (session: Session, maxToKeep: number) => void;
  removeSession: (id: string) => void;
  clearAll: () => void;
}

export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set, get) => ({
      sessions: [],

      addSession: (session, maxToKeep) => {
        const updated = [
          session,
          ...get().sessions.filter((s) => s.id !== session.id),
        ];
        set({ sessions: updated.slice(0, maxToKeep) });
      },

      removeSession: (id) =>
        set({ sessions: get().sessions.filter((s) => s.id !== id) }),

      clearAll: () => set({ sessions: [] }),
    }),
    { name: config.history.storageKey },
  ),
);
