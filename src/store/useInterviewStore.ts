import { create } from "zustand";
import type {
  Answer,
  Difficulty,
  Feedback,
  InterviewType,
  Question,
} from "../types";

const newSessionId = () => crypto.randomUUID().slice(0, 8).toUpperCase();

interface InterviewStore {
  // Session identity
  sessionId: string | null;

  // Config
  jd: string;
  type: InterviewType;
  difficulty: Difficulty;
  questionCount: number;

  // Session state
  questions: Question[];
  answers: Answer[];
  currentQuestionIndex: number;
  feedback: Feedback[] | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setConfig: (
    jd: string,
    type: InterviewType,
    difficulty: Difficulty,
    count: number,
  ) => void;
  setQuestions: (questions: Question[]) => void;
  seedSession: (
    questions: Question[],
    answers: Answer[],
    feedback: Feedback[],
  ) => void;
  submitAnswer: (questionId: string, text: string) => void;
  skipQuestion: (questionId: string) => void;
  nextQuestion: () => void;
  setFeedback: (feedback: Feedback[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetSession: () => void;
}

export const useInterviewStore = create<InterviewStore>((set) => ({
  sessionId: null,
  jd: "",
  type: "technical",
  difficulty: "mid",
  questionCount: 6,
  questions: [],
  answers: [],
  currentQuestionIndex: 0,
  feedback: null,
  isLoading: false,
  error: null,

  setConfig: (jd, type, difficulty, count) =>
    set({ jd, type, difficulty, questionCount: count }),

  // Generates a fresh session ID whenever real questions are loaded
  setQuestions: (questions) =>
    set({
      sessionId: newSessionId(),
      questions,
      answers: [],
      currentQuestionIndex: 0,
      feedback: null,
    }),

  // Generates a fresh session ID when seeding dummy data for direct-URL testing
  seedSession: (questions, answers, feedback) =>
    set((state) => ({
      sessionId: state.sessionId ?? newSessionId(),
      questions,
      answers,
      currentQuestionIndex: 0,
      feedback,
    })),

  submitAnswer: (questionId, text) =>
    set((state) => ({
      answers: [
        ...state.answers.filter((a) => a.questionId !== questionId),
        { questionId, text, skipped: false },
      ],
    })),

  skipQuestion: (questionId) =>
    set((state) => ({
      answers: [
        ...state.answers.filter((a) => a.questionId !== questionId),
        { questionId, text: "", skipped: true },
      ],
    })),

  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
    })),

  setFeedback: (feedback) => set({ feedback }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  resetSession: () =>
    set({
      sessionId: null,
      jd: "",
      questions: [],
      answers: [],
      currentQuestionIndex: 0,
      feedback: null,
      isLoading: false,
      error: null,
    }),
}));
