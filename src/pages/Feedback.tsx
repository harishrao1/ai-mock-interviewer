import { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useInterviewStore } from "../store/useInterviewStore";
import { useHistoryStore } from "../store/useHistoryStore";
import {
  USE_DUMMY_DATA,
  DUMMY_QUESTIONS,
  DUMMY_ANSWERS,
  DUMMY_FEEDBACK,
} from "../services/openai";
import { config } from "../config";
import UserButton from "../components/UserButton";
import ThemeToggle from "../components/ThemeToggle";
import { exportFeedbackPDF } from "../utils/exportPDF";
import { buildShareUrl, decodeShare } from "../utils/shareSession";
import type { Question } from "../types";

// ── Icons ─────────────────────────────────────────────────────────────────────

function HistoryIcon() {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function GearIcon() {
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
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function PrintIcon() {
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
      <polyline points="6 9 6 2 18 2 18 9" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  );
}

function ShareIcon() {
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
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const getScoreColor = (score: number) => {
  if (score >= 8) return "text-green-400";
  if (score >= 6) return "text-yellow-400";
  return "text-red-400";
};

const getTag = (score: number) => {
  if (score >= 7)
    return { label: "Strong", cls: "bg-green-400/10 text-green-400" };
  if (score === 0)
    return { label: "Skipped", cls: "bg-gray-400/10 text-gray-400" };
  return { label: "Needs work", cls: "bg-yellow-400/10 text-yellow-400" };
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Feedback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    sessionId,
    type,
    difficulty,
    questions,
    answers,
    feedback,
    resetSession,
    seedSession,
  } = useInterviewStore();
  const { sessions } = useHistoryStore();

  const [copied, setCopied] = useState(false);
  const [isExporting, setExporting] = useState(false);

  useEffect(() => {
    const shareParam = searchParams.get("share");

    if (shareParam) {
      const payload = decodeShare(shareParam);
      if (payload) {
        const fullQuestions: Question[] = payload.questions.map((q) => ({
          ...q,
          difficulty: "medium" as const,
        }));
        const dummyAnswers = fullQuestions.map((q) => ({
          questionId: q.id,
          text: "",
          skipped: true,
        }));
        seedSession(fullQuestions, dummyAnswers, payload.feedback);
        return;
      }
    }

    if (!feedback || feedback.length === 0) {
      if (USE_DUMMY_DATA)
        seedSession(DUMMY_QUESTIONS, DUMMY_ANSWERS, DUMMY_FEEDBACK);
      else navigate("/");
    }
  }, []);

  if (!feedback || feedback.length === 0) return null;

  const overallScore =
    Math.round(
      (feedback.reduce((sum, f) => sum + f.score, 0) / feedback.length) * 10,
    ) / 10;
  const answered = answers.filter((a) => !a.skipped).length;
  const needsWork = feedback.filter((f) => f.score < 7).length;

  const historySessions = sessions.filter((s) => s.id !== sessionId);
  const historyAvg = historySessions.length
    ? Math.round(
        (historySessions.reduce((sum, s) => sum + s.overallScore, 0) /
          historySessions.length) *
          10,
      ) / 10
    : null;
  const delta =
    historyAvg !== null
      ? Math.round((overallScore - historyAvg) * 10) / 10
      : null;

  const handleShare = async () => {
    const url = buildShareUrl({
      type,
      difficulty,
      date: new Date().toISOString(),
      overallScore,
      questions: questions.map((q) => ({
        id: q.id,
        question: q.question,
        category: q.category,
      })),
      feedback,
    });
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportPDF = async () => {
    setExporting(true);
    try {
      await exportFeedbackPDF(
        "print-report",
        `mockai-${sessionId ?? "feedback"}.pdf`,
      );
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 border-b border-gray-800 bg-gray-950/95 backdrop-blur-sm print:hidden">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold">
              Mock<span className="text-indigo-400">AI</span>
            </h1>
            {sessionId && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-600 bg-gray-900 border border-gray-800 rounded-lg px-2.5 py-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
                {sessionId}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:flex text-sm text-green-400 font-medium items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              Session complete
            </span>
            <nav className="flex items-center gap-1.5">
              <Link
                to="/history"
                className="p-2 text-gray-400 hover:text-indigo-400 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500/50 hover:bg-indigo-600/5 active:scale-95 transition-all shadow-sm"
                title="History"
              >
                <HistoryIcon />
              </Link>
              <Link
                to="/settings"
                className="p-2 text-gray-400 hover:text-indigo-400 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500/50 hover:bg-indigo-600/5 active:scale-95 transition-all shadow-sm"
                title="Settings"
              >
                <GearIcon />
              </Link>
              <UserButton />
            </nav>
          </div>
        </div>
      </header>

      {/* Print header */}
      <div className="hidden print:block px-8 py-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">
          MockAI — Interview Feedback Report
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Session {sessionId} · {new Date().toLocaleDateString()}
        </p>
      </div>

      <main id="print-report" className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Score summary */}
        <div className="grid grid-cols-3 gap-4 animate-slide-up print:gap-2">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center print:bg-white print:border-gray-200 print:text-gray-900">
            <div
              className={`text-4xl font-bold mb-1 ${getScoreColor(overallScore)} print:text-gray-900`}
            >
              {overallScore}
            </div>
            <div className="text-sm text-gray-400 print:text-gray-500">
              Overall score
            </div>
            <div className="text-xs text-gray-600 mt-0.5">out of 10</div>
            {delta !== null && (
              <div
                className={`text-xs mt-2 font-medium ${delta >= 0 ? "text-green-400" : "text-red-400"} print:hidden`}
              >
                {delta >= 0 ? "+" : ""}
                {delta} vs your avg
              </div>
            )}
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center print:bg-white print:border-gray-200">
            <div className="text-4xl font-bold text-indigo-400 mb-1 print:text-gray-900">
              {answered}/{questions.length}
            </div>
            <div className="text-sm text-gray-400 print:text-gray-500">
              Answered
            </div>
            <div className="text-xs text-gray-600 mt-0.5">questions</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center print:bg-white print:border-gray-200">
            <div className="text-4xl font-bold text-yellow-400 mb-1 print:text-gray-900">
              {needsWork}
            </div>
            <div className="text-sm text-gray-400 print:text-gray-500">
              To improve
            </div>
            <div className="text-xs text-gray-600 mt-0.5">areas</div>
          </div>
        </div>

        {/* Section heading + actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white print:text-gray-900">
              Per-question feedback
            </h2>
            <p className="text-gray-500 text-sm mt-0.5">
              Detailed breakdown of each answer
            </p>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            {/* Share button */}
            <button
              onClick={handleShare}
              className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-xl transition-all ${
                copied
                  ? "text-green-400 border-green-400/40 bg-green-400/5"
                  : "text-gray-400 border-gray-800 hover:border-gray-600 hover:text-gray-300"
              }`}
            >
              <ShareIcon />
              {copied ? "Copied!" : "Share"}
            </button>

            {/* PDF export */}
            {config.features.exportPDF && (
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 border border-gray-800 rounded-xl hover:border-gray-600 hover:text-gray-300 transition-all disabled:opacity-50"
              >
                {isExporting ? (
                  <span className="w-4 h-4 border-2 border-gray-500 border-t-gray-300 rounded-full animate-spin" />
                ) : (
                  <PrintIcon />
                )}
                {isExporting ? "Exporting…" : "Export PDF"}
              </button>
            )}
          </div>
        </div>

        {/* Feedback grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 print:grid-cols-1 print:gap-3">
          {feedback.map((f, index) => {
            const question = questions.find((q) => q.id === f.questionId);
            const tag = getTag(f.score);

            return (
              <div
                key={f.questionId}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4 animate-slide-up print:bg-white print:border-gray-200 print:rounded-lg print:break-inside-avoid"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1 flex-1 min-w-0">
                    <p className="text-xs text-gray-500 font-medium uppercase tracking-wide print:text-gray-400">
                      Q{index + 1} · {question?.category}
                    </p>
                    <p className="text-sm font-medium text-white leading-relaxed print:text-gray-900">
                      {question?.question}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span
                      className={`text-2xl font-bold ${getScoreColor(f.score)} print:text-gray-900`}
                    >
                      {f.score}
                      <span className="text-sm text-gray-600">/10</span>
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${tag.cls}`}
                    >
                      {tag.label}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="bg-green-400/5 border border-green-400/10 rounded-lg px-3 py-2.5 print:bg-green-50 print:border-green-200">
                    <p className="text-xs font-semibold text-green-400 mb-1 print:text-green-700">
                      What was good
                    </p>
                    <p className="text-xs text-gray-300 leading-relaxed print:text-gray-700">
                      {f.good}
                    </p>
                  </div>
                  <div className="bg-yellow-400/5 border border-yellow-400/10 rounded-lg px-3 py-2.5 print:bg-yellow-50 print:border-yellow-200">
                    <p className="text-xs font-semibold text-yellow-400 mb-1 print:text-yellow-700">
                      What to improve
                    </p>
                    <p className="text-xs text-gray-300 leading-relaxed print:text-gray-700">
                      {f.improve}
                    </p>
                  </div>
                  <div className="bg-indigo-400/5 border border-indigo-400/10 rounded-lg px-3 py-2.5 print:bg-indigo-50 print:border-indigo-200">
                    <p className="text-xs font-semibold text-indigo-400 mb-1 print:text-indigo-700">
                      Ideal answer hint
                    </p>
                    <p className="text-xs text-gray-300 leading-relaxed print:text-gray-700">
                      {f.idealHint}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom actions */}
        <div className="flex flex-col sm:flex-row gap-3 print:hidden">
          <Link
            to="/history"
            className="flex-1 py-3.5 border border-gray-800 hover:border-gray-600 text-gray-400 hover:text-gray-300 font-medium rounded-xl text-sm transition-all text-center"
          >
            View history →
          </Link>
          <button
            onClick={() => {
              resetSession();
              navigate("/");
            }}
            className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.99] text-white-keep font-medium rounded-xl text-sm transition-all"
          >
            Start new session →
          </button>
        </div>
      </main>
    </div>
  );
}
