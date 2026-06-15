import { create } from "zustand";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { auth, googleProvider } from "../services/firebase";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  signInWithMock: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Subscribe immediately — resolves loading once Firebase checks session
  onAuthStateChanged(auth, (user) => {
    set((state) => {
      if (state.user?.uid === "mock-user-123") return { loading: false };
      return { user, loading: false };
    });
  });

  return {
    user: null,
    loading: true,
    error: null,

    signInWithGoogle: async () => {
      try {
        set({ error: null });
        await signInWithPopup(auth, googleProvider);
      } catch (err: any) {
        // Ignore user closing the popup
        if (err.code !== "auth/popup-closed-by-user") {
          set({ error: "Sign-in failed. Please try again." });
        }
      }
    },

    signInWithMock: () => {
      set({
        user: {
          uid: "mock-user-123",
          displayName: "Mock Candidate",
          email: "candidate@example.com",
          photoURL: "",
        } as any,
        loading: false,
        error: null,
      });
    },

    signOut: async () => {
      set({ user: null });
      try {
        await firebaseSignOut(auth);
      } catch (err) {
        // Ignore if firebase auth is not initialized or fails
      }
    },
  };
});
