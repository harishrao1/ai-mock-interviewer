import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useInterviewStore } from "../store/useInterviewStore";
import { useSettingsStore } from "../store/useSettingsStore";
import { useHistoryStore } from "../store/useHistoryStore";
import {
  evaluateAnswers,
  USE_DUMMY_DATA,
  DUMMY_QUESTIONS,
  DUMMY_ANSWERS,
  DUMMY_FEEDBACK,
} from "../services/openai";
import { config } from "../config";
import AnswerInput from "../components/AnswerInput";
import QuestionCard from "../components/QuestionCard";
import QuestionTimer from "../components/QuestionTimer";
import UserButton from "../components/UserButton";

const tips = [
  "Use the STAR method — Situation, Task, Action, Result",
  "Be specific: name tools, metrics, and outcomes",
  "Keep answers focused — quality over length",
];

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

export default function Interview() {
  const navigate = useNavigate();

  const {
    sessionId,
    jd,
    type,
    difficulty,
    questions,
    answers,
    currentQuestionIndex,
    isLoading,
    submitAnswer,
    skipQuestion,
    nextQuestion,
    setFeedback,
    setLoading,
    setError,
    seedSession,
  } = useInterviewStore();

  const {
    timerEnabled,
    timerSeconds,
    timerAutoSkip,
    saveHistory: historySaveEnabled,
    maxHistory,
  } = useSettingsStore();
  const { addSession } = useHistoryStore();

  useEffect(() => {
    if (questions.length === 0) {
      if (USE_DUMMY_DATA) {
        seedSession(DUMMY_QUESTIONS, DUMMY_ANSWERS, DUMMY_FEEDBACK);
      } else {
        navigate("/");
      }
    }
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = (currentQuestionIndex / questions.length) * 100;

  const handleSubmit = async (text: string) => {
    submitAnswer(currentQuestion.id, text);
    if (isLastQuestion) await handleFinish(currentQuestion.id, text);
    else nextQuestion();
  };

  const handleSkip = async () => {
    skipQuestion(currentQuestion.id);
    if (isLastQuestion) await handleFinish(currentQuestion.id, "");
    else nextQuestion();
  };

  const handleFinish = async (lastQuestionId: string, lastText: string) => {
    try {
      setLoading(true);
      const allAnswers = [
        ...answers.filter((a) => a.questionId !== lastQuestionId),
        { questionId: lastQuestionId, text: lastText, skipped: !lastText },
      ];
      const feedback = await evaluateAnswers(questions, allAnswers);
      setFeedback(feedback);

      // Save to history if both feature flag and user setting are on
      if (config.features.sessionHistory && historySaveEnabled) {
        const overallScore =
          Math.round(
            (feedback.reduce((sum, f) => sum + f.score, 0) / feedback.length) *
              10,
          ) / 10;
        addSession(
          {
            id: sessionId ?? crypto.randomUUID().slice(0, 8),
            date: new Date().toISOString(),
            jd,
            type,
            difficulty,
            questionCount: questions.length,
            questions,
            answers: allAnswers,
            feedback,
            overallScore,
          },
          maxHistory,
        );
      }

      navigate("/feedback");
    } catch (err) {
      setError("Failed to evaluate answers. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!currentQuestion) return null;

  const showTimer = config.features.questionTimer && timerEnabled;

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Sticky header */}
      <header className="sticky top-0 z-10 border-b border-gray-800 bg-gray-950/95 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-4">
          <h1 className="text-lg font-bold shrink-0">
            Mock<span className="text-indigo-400">AI</span>
          </h1>

          {/* Progress */}
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-500 mb-1.5">
              <span>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Timer */}
          {showTimer && (
            <QuestionTimer
              key={currentQuestion.id}
              totalSeconds={timerSeconds}
              warningAt={config.timer.warningAt}
              autoSkip={timerAutoSkip}
              onExpire={handleSkip}
            />
          )}

          {/* Session ID */}
          {sessionId && (
            <span className="hidden sm:inline-flex shrink-0 items-center gap-1.5 text-xs text-gray-600 bg-gray-900 border border-gray-800 rounded-lg px-2.5 py-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
              {sessionId}
            </span>
          )}

          {/* Nav icons */}
          <nav className="flex items-center gap-1 shrink-0">
            <Link
              to="/history"
              className="p-2 text-gray-500 hover:text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              title="History"
            >
              <HistoryIcon />
            </Link>
            <Link
              to="/settings"
              className="p-2 text-gray-500 hover:text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
              title="Settings"
            >
              <GearIcon />
            </Link>
            <UserButton />
          </nav>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Left: Question + Tips */}
          <div
            key={`q-${currentQuestionIndex}`}
            className="space-y-4 animate-slide-in-left"
          >
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Question {currentQuestionIndex + 1}
            </p>
            <QuestionCard question={currentQuestion} />
            <div className="bg-gray-900/60 border border-gray-800/80 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Tips for a strong answer
              </p>
              <ul className="space-y-2">
                {tips.map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-gray-500 animate-slide-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <span className="text-indigo-500 mt-0.5 shrink-0">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Answer */}
          <div
            key={`a-${currentQuestionIndex}`}
            className="animate-slide-in-right"
          >
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-4">
              Your answer
            </p>
            <AnswerInput
              key={currentQuestion.id}
              onSubmit={handleSubmit}
              onSkip={handleSkip}
              isLoading={isLoading}
              isLast={isLastQuestion}
            />
          </div>
        </div>
      </main>

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-gray-950/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center animate-fade-in">
            <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-300 text-sm font-medium">
              Evaluating your answers…
            </p>
            <p className="text-gray-600 text-xs mt-1">This may take a moment</p>
          </div>
        </div>
      )}
    </div>
  );
}
