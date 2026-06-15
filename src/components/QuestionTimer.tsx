import { useState, useEffect, useRef } from "react";
import { config } from "../config";

interface Props {
  totalSeconds: number;
  warningAt: number;
  autoSkip: boolean;
  onExpire: () => void;
}

const RADIUS = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 125.7

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${pad(m)}:${pad(s)}`;
}

export default function QuestionTimer({
  totalSeconds,
  warningAt,
  autoSkip,
  onExpire,
}: Props) {
  const [remaining, setRemaining] = useState(totalSeconds);
  const expiredRef = useRef(false);

  // Reset when totalSeconds prop changes (new question)
  useEffect(() => {
    setRemaining(totalSeconds);
    expiredRef.current = false;
  }, [totalSeconds]);

  useEffect(() => {
    if (remaining <= 0) {
      if (!expiredRef.current) {
        expiredRef.current = true;
        if (autoSkip) onExpire();
      }
      return;
    }
    const id = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(id);
  }, [remaining, autoSkip, onExpire]);

  const isWarning = remaining <= warningAt && remaining > 0;
  const isExpired = remaining <= 0;
  const isCritical = remaining <= 10 && remaining > 0;

  const progress = remaining / totalSeconds;
  const dashOffset = CIRCUMFERENCE * (1 - progress);

  const ringColor = isExpired
    ? "#6b7280"
    : isCritical
      ? "#ef4444"
      : isWarning
        ? "#f59e0b"
        : "#6366f1";

  const textColor = isExpired
    ? "text-gray-500"
    : isCritical
      ? "text-red-400"
      : isWarning
        ? "text-yellow-400"
        : "text-gray-300";

  return (
    <div
      className="relative inline-flex items-center justify-center"
      title={`${remaining}s remaining`}
    >
      {/* SVG ring — rotated so progress starts at top */}
      <svg width="52" height="52" viewBox="0 0 52 52" className="-rotate-90">
        {/* Track */}
        <circle
          cx="26"
          cy="26"
          r={RADIUS}
          fill="none"
          stroke="#1f2937"
          strokeWidth="3"
        />
        {/* Progress arc */}
        <circle
          cx="26"
          cy="26"
          r={RADIUS}
          fill="none"
          stroke={ringColor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          style={{
            transition: "stroke-dashoffset 1s linear, stroke 0.3s ease",
          }}
        />
      </svg>

      {/* Time label centered over the ring */}
      <span
        className={`absolute text-[10px] font-mono font-semibold tabular-nums ${textColor}`}
      >
        {isExpired ? "00:00" : formatTime(remaining)}
      </span>

      {/* Pulse ring when critical */}
      {isCritical && (
        <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-red-500" />
      )}
    </div>
  );
}

// Re-export config values as defaults so callers don't need to import config
QuestionTimer.defaultWarningAt = config.timer.warningAt;
