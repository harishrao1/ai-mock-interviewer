import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHistoryStore } from "../store/useHistoryStore";
import { config } from "../config";
import ScoreTrendChart from "../components/ScoreTrendChart";
import UserButton from "../components/UserButton";
import ThemeToggle from "../components/ThemeToggle";
import type { Session } from "../types";

// ── Icons ─────────────────────────────────────────────────────────────────────

function BackIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      className="w-3.5 h-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function scoreColor(score: number) {
  if (score >= 8) return "text-green-400";
  if (score >= 6) return "text-yellow-400";
  return "text-red-400";
}

function scoreBg(score: number) {
  if (score >= 8) return "bg-green-400/10 border-green-400/20 text-green-400";
  if (score >= 6)
    return "bg-yellow-400/10 border-yellow-400/20 text-yellow-400";
  return "bg-red-400/10 border-red-400/20 text-red-400";
}

const TYPE_LABELS: Record<string, string> = {
  technical: "Technical",
  behavioural: "Behavioural",
  "system-design": "System Design",
  mixed: "Mixed",
};

// ── Session card ──────────────────────────────────────────────────────────────

function SessionCard({
  session,
  onDelete,
}: {
  session: Session;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden animate-slide-up">
      {/* Summary row */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-800/40 transition-colors text-left"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div
            className={`text-xl font-bold tabular-nums ${scoreColor(session.overallScore)}`}
          >
            {session.overallScore}
            <span className="text-xs text-gray-600 font-normal">/10</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {TYPE_LABELS[session.type]} · {session.difficulty}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {formatDate(session.date)}
            </p>
          </div>
          <span
            className={`hidden sm:inline text-xs px-2 py-0.5 rounded-full border font-medium ${scoreBg(session.overallScore)}`}
          >
            {session.overallScore >= 8
              ? "Strong"
              : session.overallScore >= 6
                ? "Average"
                : "Needs work"}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs text-gray-600">
            {session.questionCount}Q
          </span>
          <ChevronIcon open={open} />
        </div>
      </button>

      {/* Expanded feedback */}
      {open && (
        <div className="border-t border-gray-800 px-5 py-4 space-y-4 animate-fade-in">
          {session.feedback.map((f, i) => {
            const q = session.questions.find((q) => q.id === f.questionId);
            return (
              <div key={f.questionId} className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs text-gray-400 leading-relaxed">
                    <span className="text-gray-600 mr-1">Q{i + 1}</span>
                    {q?.question}
                  </p>
                  <span
                    className={`text-sm font-bold shrink-0 ${scoreColor(f.score)}`}
                  >
                    {f.score}/10
                  </span>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {f.improve}
                </p>
              </div>
            );
          })}

          {/* Delete */}
          <div className="pt-2 flex justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="flex items-center gap-1.5 text-xs text-red-400/70 hover:text-red-400 transition-colors"
            >
              <TrashIcon />
              Delete session
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function History() {
  const navigate = useNavigate();
  const { sessions, removeSession, clearAll } = useHistoryStore();

  const isEmpty = sessions.length === 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-800 bg-gray-950/95 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-400 border border-gray-800 rounded-xl bg-gray-900 hover:border-indigo-500/50 hover:text-indigo-400 hover:bg-indigo-600/5 active:scale-95 transition-all shadow-sm"
            >
              <BackIcon />
              Home
            </button>
            <span className="text-gray-700">|</span>
            <h1 className="text-lg font-bold">
              Mock<span className="text-indigo-400">AI</span>
              <span className="text-gray-500 font-normal text-sm ml-2">
                · History
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            {sessions.length > 0 && (
              <button
                onClick={() => {
                  if (confirm("Clear all session history?")) clearAll();
                }}
                className="text-xs text-red-400/60 hover:text-red-400 transition-colors"
              >
                Clear all
              </button>
            )}
            <UserButton />
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-8 space-y-6">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <p className="text-gray-400 font-medium">No sessions yet</p>
            <p className="text-gray-600 text-sm mt-1">
              Complete an interview to see your history here.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white-keep text-sm font-medium rounded-xl transition-colors"
            >
              Start an interview →
            </button>
          </div>
        ) : (
          <>
            {/* Score trend chart */}
            {config.features.scoreChart && sessions.length >= 2 && (
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 animate-slide-up">
                <h2 className="text-sm font-semibold text-white mb-4">
                  Score trend
                </h2>
                <ScoreTrendChart sessions={sessions} />
              </div>
            )}

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 animate-slide-up">
              {[
                {
                  label: "Sessions",
                  value: sessions.length,
                  color: "text-indigo-400",
                },
                {
                  label: "Best score",
                  value: Math.max(...sessions.map((s) => s.overallScore)),
                  color: "text-green-400",
                },
                {
                  label: "Average",
                  value:
                    Math.round(
                      (sessions.reduce((sum, s) => sum + s.overallScore, 0) /
                        sessions.length) *
                        10,
                    ) / 10,
                  color: scoreColor(
                    sessions.reduce((sum, s) => sum + s.overallScore, 0) /
                      sessions.length,
                  ),
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center"
                >
                  <div className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Session list */}
            <div className="space-y-3">
              <h2 className="text-sm font-semibold text-gray-400">
                Past sessions{" "}
                <span className="text-gray-600 font-normal">
                  ({sessions.length})
                </span>
              </h2>
              {sessions.map((s, i) => (
                <div key={s.id} style={{ animationDelay: `${i * 40}ms` }}>
                  <SessionCard
                    session={s}
                    onDelete={() => removeSession(s.id)}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
