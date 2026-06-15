import { useState, useRef, useEffect, useCallback } from "react";

interface Props {
  onSubmit: (text: string) => void;
  onSkip: () => void;
  isLoading: boolean;
  isLast: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getSpeechRecognitionCtor(): (new () => any) | null {
  if (typeof window === "undefined") return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

const isSpeechSupported = !!getSpeechRecognitionCtor();

const MIC_ERRORS: Record<string, string> = {
  "not-allowed":
    "Microphone access denied. Allow it in your browser settings and try again.",
  "audio-capture": "No microphone found. Please connect one and try again.",
  network: "Network error during speech recognition. Check your connection.",
};

// ── Icons ─────────────────────────────────────────────────────────────────────

function MicIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  );
}

function StopIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="6" width="12" height="12" rx="2" />
    </svg>
  );
}

// ── Waveform ──────────────────────────────────────────────────────────────────

function WaveformBars() {
  return (
    <div className="flex items-center gap-[3px] h-4">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-[3px] h-full bg-red-400 rounded-full origin-bottom"
          style={{
            animation: `waveBar 0.7s ease-in-out ${i * 0.12}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatTime = (s: number) =>
  `${Math.floor(s / 60)
    .toString()
    .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

const wordCount = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

// ── Component ─────────────────────────────────────────────────────────────────

export default function AnswerInput({
  onSubmit,
  onSkip,
  isLoading,
  isLast,
}: Props) {
  const [text, setText] = useState("");
  const [interimText, setInterimText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const baseTextRef = useRef("");
  const finalTranscriptRef = useRef("");

  // Keep a ref to the toggle fn so the global key listener never goes stale
  const toggleRecordingRef = useRef<() => void>(() => {});

  // ── Timer ──────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!isRecording) return;
    const id = setInterval(() => setRecordingSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [isRecording]);

  // ── Cleanup ────────────────────────────────────────────────────────────────

  const stopRecording = useCallback(() => {
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setIsRecording(false);
    setInterimText("");
  }, []);

  useEffect(() => {
    if (isLoading) recognitionRef.current?.stop();
  }, [isLoading]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  // ── Recording ──────────────────────────────────────────────────────────────

  const startRecording = useCallback(() => {
    const Ctor = getSpeechRecognitionCtor();
    if (!Ctor) return;

    setMicError(null);
    setRecordingSeconds(0);
    baseTextRef.current = text;
    finalTranscriptRef.current = "";

    const recognition = new Ctor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let finalChunk = "";
      let interimChunk = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalChunk += t;
        else interimChunk += t;
      }

      finalTranscriptRef.current += finalChunk;

      const base = baseTextRef.current.trimEnd();
      const spoken = finalTranscriptRef.current.trimStart();
      setText(base ? `${base} ${spoken}` : spoken);
      setInterimText(interimChunk);
    };

    recognition.onerror = (event: { error: string }) => {
      if (event.error !== "no-speech") {
        setMicError(
          MIC_ERRORS[event.error] ??
            "Recording stopped unexpectedly. Please try again.",
        );
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
      setInterimText("");
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsRecording(true);
  }, [text]);

  // Keep toggle ref fresh after each state change so the key listener never goes stale
  useEffect(() => {
    toggleRecordingRef.current = () => {
      if (isRecording) stopRecording();
      else startRecording();
    };
  }, [isRecording, stopRecording, startRecording]);

  // ── Keyboard shortcuts ──────────────────────────────────────────────────────

  // Space → toggle mic (when focus is NOT in a text field)
  useEffect(() => {
    if (!isSpeechSupported) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" || e.ctrlKey || e.metaKey || e.shiftKey) return;
      const tag = (document.activeElement as HTMLElement)?.tagName ?? "";
      if (["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(tag)) return;
      e.preventDefault();
      toggleRecordingRef.current();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []); // mount/unmount only — uses ref for fresh values

  // ── Submit ─────────────────────────────────────────────────────────────────

  const handleSubmit = () => {
    if (!text.trim()) return;
    if (isRecording) stopRecording();
    onSubmit(text.trim());
    setText("");
    setInterimText("");
  };

  const handleManualEdit = (val: string) => {
    setText(val);
    if (micError) setMicError(null);
  };

  const words = wordCount(text);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-3">
      {/* Textarea */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => handleManualEdit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          rows={10}
          placeholder={
            isRecording
              ? "Listening… speak your answer"
              : isSpeechSupported
                ? "Type your answer or click the mic to speak…"
                : "Type your answer here…"
          }
          className={`w-full bg-gray-900 border rounded-xl px-4 py-3 pb-8 text-sm text-white placeholder-gray-600 resize-none focus:outline-none transition-all duration-300 min-h-[220px] ${
            isRecording
              ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 shadow-[0_0_0_3px_rgba(239,68,68,0.06)]"
              : "border-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20"
          }`}
        />

        {/* Recording badge */}
        {isRecording && (
          <div className="absolute top-3 right-3 flex items-center gap-2 bg-gray-950/90 backdrop-blur-sm border border-red-500/20 rounded-lg px-2.5 py-1.5 animate-fade-in">
            <WaveformBars />
            <span className="text-xs text-red-400 font-medium tabular-nums">
              {formatTime(recordingSeconds)}
            </span>
          </div>
        )}

        {/* Word count */}
        {words > 0 && (
          <div className="absolute bottom-2.5 right-3 text-xs text-gray-600 tabular-nums select-none animate-fade-in">
            {words} {words === 1 ? "word" : "words"}
          </div>
        )}
      </div>

      {/* Interim text preview */}
      {isRecording && interimText && (
        <div className="flex items-start gap-2 px-1 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse mt-1.5 shrink-0" />
          <p className="text-xs text-gray-500 italic leading-relaxed">
            {interimText}
          </p>
        </div>
      )}

      {/* Mic error */}
      {micError && (
        <div className="flex items-start gap-2 bg-red-500/5 border border-red-500/20 rounded-xl px-3 py-2.5 animate-slide-up">
          <span className="text-red-400 mt-0.5 shrink-0 text-xs">✕</span>
          <p className="text-xs text-red-400 leading-relaxed">{micError}</p>
        </div>
      )}

      {/* Action row */}
      <div className="flex gap-2">
        {isSpeechSupported && (
          <button
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isLoading}
            title={isRecording ? "Stop recording" : "Speak your answer"}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 disabled:opacity-50 shrink-0 active:scale-95 ${
              isRecording
                ? "bg-red-500/10 border-red-500/40 text-red-400 hover:bg-red-500/20 shadow-[0_0_12px_rgba(239,68,68,0.15)]"
                : "bg-gray-900 border-gray-800 text-gray-400 hover:border-indigo-500/50 hover:text-indigo-400"
            }`}
          >
            {isRecording ? (
              <>
                <StopIcon className="w-3 h-3" />
                Stop
              </>
            ) : (
              <>
                <MicIcon className="w-3.5 h-3.5" />
                Speak
              </>
            )}
          </button>
        )}

        <button
          onClick={onSkip}
          disabled={isLoading}
          className="flex-1 py-2.5 border border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-300 rounded-xl text-sm transition-all duration-200 disabled:opacity-50 active:scale-[0.98]"
        >
          Skip
        </button>

        <button
          onClick={handleSubmit}
          disabled={isLoading || !text.trim()}
          className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] disabled:bg-gray-800 disabled:text-gray-500 disabled:opacity-100 disabled:cursor-not-allowed text-white-keep font-medium rounded-xl text-sm transition-all duration-200"
        >
          {isLast ? "Submit & get feedback →" : "Next question →"}
        </button>
      </div>

      {/* Keyboard hint */}
      <p className="text-center text-xs text-gray-700 select-none">
        {isSpeechSupported && (
          <>
            <kbd className="px-1.5 py-0.5 rounded bg-gray-800 border border-gray-700 font-mono text-gray-500 text-[10px]">
              Space
            </kbd>{" "}
            toggle mic ·{" "}
          </>
        )}
        <kbd className="px-1.5 py-0.5 rounded bg-gray-800 border border-gray-700 font-mono text-gray-500 text-[10px]">
          ⌘ ↵
        </kbd>{" "}
        submit
      </p>
    </div>
  );
}
