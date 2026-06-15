import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useInterviewStore } from "../store/useInterviewStore";
import { generateQuestions } from "../services/openai";
import type { InterviewType, Difficulty } from "../types";
import UserButton from "../components/UserButton";

const interviewTypes: { label: string; value: InterviewType }[] = [
  { label: "Technical", value: "technical" },
  { label: "Behavioural", value: "behavioural" },
  { label: "System Design", value: "system-design" },
  { label: "Mixed", value: "mixed" },
];

const difficulties: { label: string; value: Difficulty }[] = [
  { label: "Junior", value: "junior" },
  { label: "Mid", value: "mid" },
  { label: "Senior", value: "senior" },
];

const questionCounts = [5, 6, 7];

const features = [
  "AI-generated questions tailored to any job description",
  "Technical, behavioural, and system design rounds",
  "Instant scoring with actionable improvement tips",
];

export default function Home() {
  const navigate = useNavigate();
  const { setConfig, setQuestions, setLoading, setError, isLoading, error } =
    useInterviewStore();

  const [jd, setJd] = useState("");
  const [type, setType] = useState<InterviewType>("technical");
  const [difficulty, setDifficulty] = useState<Difficulty>("mid");
  const [count, setCount] = useState(6);

  const handleGenerate = async () => {
    if (!jd.trim()) {
      setError("Please paste a job description first");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setConfig(jd, type, difficulty, count);
      const questions = await generateQuestions(jd, type, difficulty, count);
      setQuestions(questions);
      navigate("/interview");
    } catch (err) {
      setError(
        "Failed to generate questions. Check your API key and try again.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Left Panel — Hero (desktop only) */}
      <div className="hidden lg:flex flex-col justify-center px-14 xl:px-20 w-[46%] relative overflow-hidden border-r border-gray-800/50">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-16 left-4 w-72 h-72 bg-purple-600/8 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 animate-slide-in-left">
          <h1 className="text-6xl font-bold tracking-tight mb-5">
            Mock<span className="text-indigo-400">AI</span>
          </h1>
          <p className="text-gray-300 text-xl leading-relaxed">
            Paste a job description.
            <br />
            Get tailored interview questions.
            <br />
            Ace your next interview.
          </p>

          <div className="mt-10 space-y-3">
            {features.map((feat, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                <p className="text-gray-400 text-sm leading-relaxed">{feat}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-800/60">
            <p className="text-xs text-gray-600">
              Powered by AI · No answers stored
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-10 lg:px-14 xl:px-20">
        {/* Mobile logo */}
        {/* Mobile header with nav */}
        <div className="lg:hidden mb-8 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold">
                Mock<span className="text-indigo-400">AI</span>
              </h1>
              <p className="text-gray-400 mt-1 text-sm">
                Paste a JD. Get tailored questions. Ace your interview.
              </p>
            </div>
            <nav className="flex items-center gap-1.5">
              <Link
                to="/history"
                className="p-2 text-gray-400 hover:text-indigo-400 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500/50 hover:bg-indigo-600/5 active:scale-95 transition-all shadow-sm"
                title="History"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </Link>
              <Link
                to="/settings"
                className="p-2 text-gray-400 hover:text-indigo-400 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500/50 hover:bg-indigo-600/5 active:scale-95 transition-all shadow-sm"
                title="Settings"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </Link>
              <UserButton />
            </nav>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto lg:mx-0 animate-slide-in-right">
          <div className="mb-7 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">
                Set up your session
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Configure the interview to match your target role
              </p>
            </div>
            {/* Desktop nav — only visible when the hero panel is shown */}
            <nav className="hidden lg:flex items-center gap-1.5 shrink-0 mt-1">
              <Link
                to="/history"
                className="p-2 text-gray-400 hover:text-indigo-400 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500/50 hover:bg-indigo-600/5 active:scale-95 transition-all shadow-sm"
                title="History"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </Link>
              <Link
                to="/settings"
                className="p-2 text-gray-400 hover:text-indigo-400 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500/50 hover:bg-indigo-600/5 active:scale-95 transition-all shadow-sm"
                title="Settings"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </Link>
              <UserButton />
            </nav>
          </div>

          <div className="space-y-5">
            {/* JD Input */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Job description
              </label>
              <textarea
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                rows={7}
                placeholder="We are looking for a Senior Frontend Engineer with 3+ years of React experience..."
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 resize-none focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
              />
            </div>

            {/* Interview Type */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Interview type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {interviewTypes.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setType(t.value)}
                    className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all ${
                      type === t.value
                        ? "bg-indigo-600/20 border-indigo-500 text-indigo-300"
                        : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-300"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty + Count side-by-side */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Difficulty
                </label>
                <div className="flex gap-1.5">
                  {difficulties.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setDifficulty(d.value)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                        difficulty === d.value
                          ? "bg-indigo-600/20 border-indigo-500 text-indigo-300"
                          : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Questions
                </label>
                <div className="flex gap-1.5">
                  {questionCounts.map((n) => (
                    <button
                      key={n}
                      onClick={() => setCount(n)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                        count === n
                          ? "bg-indigo-600/20 border-indigo-500 text-indigo-300"
                          : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Error */}
            {error && <p className="text-red-400 text-sm">{error}</p>}

            {/* Submit */}
            <button
              onClick={handleGenerate}
              disabled={isLoading || !jd.trim()}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] disabled:bg-gray-800 disabled:text-gray-500 disabled:opacity-100 disabled:cursor-not-allowed text-white-keep font-medium rounded-xl transition-all text-sm mt-1"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating questions...
                </span>
              ) : (
                "Generate questions →"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
