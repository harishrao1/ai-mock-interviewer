export type InterviewType =
  | "technical"
  | "behavioural"
  | "system-design"
  | "mixed";

export type Difficulty = "junior" | "mid" | "senior";

export interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface Answer {
  questionId: string;
  text: string;
  skipped: boolean;
}

export interface Feedback {
  questionId: string;
  score: number;
  good: string;
  improve: string;
  idealHint: string;
}

// A completed interview session saved to history
export interface Session {
  id: string; // sessionId from the store
  date: string; // ISO timestamp
  jd: string;
  type: InterviewType;
  difficulty: Difficulty;
  questionCount: number;
  questions: Question[];
  answers: Answer[];
  feedback: Feedback[]; // always populated when saved
  overallScore: number; // pre-computed average
}
