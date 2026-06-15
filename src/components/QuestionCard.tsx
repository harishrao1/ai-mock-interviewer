import type { Question } from "../types";

interface Props {
  question: Question;
}

const difficultyColors = {
  easy: "text-green-400 bg-green-400/10",
  medium: "text-yellow-400 bg-yellow-400/10",
  hard: "text-red-400 bg-red-400/10",
};

export default function QuestionCard({ question }: Props) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wide">
          {question.category}
        </span>
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${difficultyColors[question.difficulty]}`}
        >
          {question.difficulty}
        </span>
      </div>
      <p className="text-white text-base leading-relaxed font-medium">
        {question.question}
      </p>
    </div>
  );
}
