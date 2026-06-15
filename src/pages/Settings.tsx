import { useNavigate } from "react-router-dom";
import { useSettingsStore } from "../store/useSettingsStore";
import { useHistoryStore } from "../store/useHistoryStore";
import { useThemeStore, type Theme } from "../store/useThemeStore";
import { config } from "../config";
import UserButton from "../components/UserButton";
import ThemeToggle from "../components/ThemeToggle";

// ── Reusable UI atoms ─────────────────────────────────────────────────────────

function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ${
        value ? "bg-indigo-600" : "bg-gray-700"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
          value ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function SettingRow({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-4">
      <div className="min-w-0">
        <p className="text-sm font-medium text-white">{label}</p>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
            {description}
          </p>
        )}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
      <div className="px-5 py-3 border-b border-gray-800">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </h2>
      </div>
      <div className="px-5 divide-y divide-gray-800/60">{children}</div>
    </div>
  );
}

// ── Back icon ─────────────────────────────────────────────────────────────────

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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function Settings() {
  const navigate = useNavigate();
  const {
    timerEnabled,
    setTimerEnabled,
    timerSeconds,
    setTimerSeconds,
    timerAutoSkip,
    setTimerAutoSkip,
    saveHistory,
    setSaveHistory,
    maxHistory,
    setMaxHistory,
    resetToDefaults,
  } = useSettingsStore();

  const { sessions, clearAll } = useHistoryStore();

  const { theme, setTheme } = useThemeStore();

  const { minSeconds, maxSeconds, stepSeconds } = config.timer;

  const formatDuration = (s: number) =>
    s < 60 ? `${s}s` : `${s / 60}m${s % 60 ? ` ${s % 60}s` : ""}`;

  const THEMES: {
    id: Theme;
    label: string;
    description: string;
    group: "dark" | "light";
    tag?: string;
    preview: { bg: string; sidebar: string; accent: string; bar: string };
  }[] = [
    {
      id: "dark",
      group: "dark",
      label: "Dark",
      description: "Classic dark interface",
      preview: {
        bg: "#030712",
        sidebar: "#111827",
        accent: "#6366f1",
        bar: "#374151",
      },
    },
    {
      id: "midnight",
      group: "dark",
      label: "Midnight",
      description: "OLED black with violet",
      preview: {
        bg: "#000000",
        sidebar: "#0d0d0d",
        accent: "#a855f7",
        bar: "#1a1a1a",
      },
      tag: "OLED",
    },
    {
      id: "forest",
      group: "dark",
      label: "Forest",
      description: "Deep green tones",
      preview: {
        bg: "#0a1a0f",
        sidebar: "#122318",
        accent: "#22c55e",
        bar: "#1a2e1f",
      },
    },
    {
      id: "ocean",
      group: "dark",
      label: "Ocean",
      description: "Deep sea blues",
      preview: {
        bg: "#020b18",
        sidebar: "#071628",
        accent: "#3b82f6",
        bar: "#0f2040",
      },
      tag: "New",
    },
    {
      id: "ember",
      group: "dark",
      label: "Ember",
      description: "Warm charcoal + amber",
      preview: {
        bg: "#0f0a03",
        sidebar: "#1c1306",
        accent: "#f59e0b",
        bar: "#2a1d08",
      },
    },
    {
      id: "light",
      group: "light",
      label: "Light",
      description: "Clean and minimal",
      preview: {
        bg: "#f8fafc",
        sidebar: "#f1f5f9",
        accent: "#6366f1",
        bar: "#e2e8f0",
      },
    },
    {
      id: "dawn",
      group: "light",
      label: "Dawn",
      description: "Warm paper tone",
      preview: {
        bg: "#faf7f2",
        sidebar: "#f5ede0",
        accent: "#d97706",
        bar: "#ede4d5",
      },
    },
    {
      id: "arctic",
      group: "light",
      label: "Arctic",
      description: "Icy blue & white",
      preview: {
        bg: "#f0f8ff",
        sidebar: "#dbeeff",
        accent: "#0ea5e9",
        bar: "#bfdbf7",
      },
      tag: "New",
    },
  ];

  const darkThemes = THEMES.filter((t) => t.group === "dark");
  const lightThemes = THEMES.filter((t) => t.group === "light");

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-gray-800 bg-gray-950/95 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-400 border border-gray-800 rounded-xl bg-gray-900 hover:border-indigo-500/50 hover:text-indigo-400 hover:bg-indigo-650/5 active:scale-95 transition-all shadow-sm"
            >
              <BackIcon />
              Back
            </button>
            <span className="text-gray-700">|</span>
            <h1 className="text-lg font-bold">
              Mock<span className="text-indigo-400">AI</span>
              <span className="text-gray-500 font-normal text-sm ml-2">
                · Settings
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <UserButton />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-4 animate-slide-up">
        {/* Appearance */}
        <Section title="Appearance">
          <div className="py-4 space-y-5">
            <div>
              <p className="text-sm font-medium text-white mb-1">Theme</p>
              <p className="text-xs text-gray-500">
                Choose how MockAI looks on your device.
              </p>
            </div>

            {(
              [
                ["Dark", darkThemes],
                ["Light", lightThemes],
              ] as const
            ).map(([groupLabel, items]) => (
              <div key={groupLabel}>
                <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-2">
                  {groupLabel}
                </p>
                <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-5">
                  {items.map((t) => {
                    const isActive = theme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        style={
                          {
                            "--accent": t.preview.accent,
                            backgroundColor: isActive
                              ? `${t.preview.accent}0d`
                              : undefined,
                            boxShadow: isActive
                              ? `0 0 0 1px ${t.preview.accent}33`
                              : undefined,
                          } as React.CSSProperties
                        }
                        className={`relative flex flex-col p-2.5 rounded-xl border transition-all text-left ${
                          isActive
                            ? "border-[--accent]"
                            : "border-gray-800 hover:border-gray-700 hover:bg-gray-800/40"
                        }`}
                      >
                        {/* Mini layout preview */}
                        <div
                          className="w-full h-11 rounded-md overflow-hidden flex mb-2"
                          style={{ background: t.preview.bg }}
                        >
                          <div
                            className="w-[28%] h-full"
                            style={{ background: t.preview.sidebar }}
                          />
                          <div className="flex-1 p-1 flex flex-col gap-1 justify-center">
                            <div
                              className="h-[3px] rounded-full w-3/4"
                              style={{ background: t.preview.accent }}
                            />
                            <div
                              className="h-[2px] rounded-full w-full"
                              style={{ background: t.preview.bar }}
                            />
                            <div
                              className="h-[2px] rounded-full w-1/2"
                              style={{ background: t.preview.bar }}
                            />
                          </div>
                        </div>

                        <span
                          className={`text-[11px] font-medium leading-none ${isActive ? "text-white" : "text-gray-400"}`}
                        >
                          {t.label}
                        </span>
                        {t.tag && (
                          <span className="text-[9px] font-semibold text-gray-500 mt-0.5">
                            {t.tag}
                          </span>
                        )}

                        {isActive && (
                          <span
                            className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded-full flex items-center justify-center"
                            style={{ background: t.preview.accent }}
                          >
                            <svg
                              className="w-2 h-2 text-white-keep"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Timer */}
        {config.features.questionTimer && (
          <Section title="Question Timer">
            <SettingRow
              label="Enable timer"
              description="Show a countdown timer for each question during the interview."
            >
              <Toggle value={timerEnabled} onChange={setTimerEnabled} />
            </SettingRow>

            <SettingRow
              label="Duration"
              description={`Time allowed per question. Currently ${formatDuration(timerSeconds)}.`}
            >
              <div className="flex items-center gap-3 w-48">
                <input
                  type="range"
                  min={minSeconds}
                  max={maxSeconds}
                  step={stepSeconds}
                  value={timerSeconds}
                  onChange={(e) => setTimerSeconds(Number(e.target.value))}
                  disabled={!timerEnabled}
                  className="w-full accent-indigo-500 disabled:opacity-40"
                />
                <span className="text-xs text-gray-400 w-10 text-right tabular-nums">
                  {formatDuration(timerSeconds)}
                </span>
              </div>
            </SettingRow>

            <SettingRow
              label="Auto-skip on timeout"
              description="Automatically move to the next question when the timer hits zero."
            >
              <Toggle value={timerAutoSkip} onChange={setTimerAutoSkip} />
            </SettingRow>
          </Section>
        )}

        {/* History */}
        {config.features.sessionHistory && (
          <Section title="Session History">
            <SettingRow
              label="Save sessions"
              description="Store completed interviews in your browser so you can review them later."
            >
              <Toggle value={saveHistory} onChange={setSaveHistory} />
            </SettingRow>

            <SettingRow
              label="Max sessions to keep"
              description={`Older sessions are removed once this limit is reached. Currently ${maxHistory}.`}
            >
              <div className="flex items-center gap-3 w-48">
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={5}
                  value={maxHistory}
                  onChange={(e) => setMaxHistory(Number(e.target.value))}
                  disabled={!saveHistory}
                  className="w-full accent-indigo-500 disabled:opacity-40"
                />
                <span className="text-xs text-gray-400 w-6 text-right tabular-nums">
                  {maxHistory}
                </span>
              </div>
            </SettingRow>

            <SettingRow
              label="Clear history"
              description={`You have ${sessions.length} saved session${sessions.length !== 1 ? "s" : ""}.`}
            >
              <button
                onClick={() => {
                  if (
                    confirm("Delete all saved sessions? This cannot be undone.")
                  )
                    clearAll();
                }}
                disabled={sessions.length === 0}
                className="px-4 py-1.5 text-xs font-medium text-red-400 border border-red-400/30 rounded-lg hover:bg-red-400/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Clear all
              </button>
            </SettingRow>
          </Section>
        )}

        {/* Reset */}
        <Section title="Reset">
          <SettingRow
            label="Restore defaults"
            description="Reset all settings above to their original values."
          >
            <button
              onClick={() => {
                if (confirm("Reset all settings to defaults?"))
                  resetToDefaults();
              }}
              className="px-4 py-1.5 text-xs font-medium text-gray-400 border border-gray-700 rounded-lg hover:border-gray-500 hover:text-gray-300 transition-colors"
            >
              Reset
            </button>
          </SettingRow>
        </Section>
      </main>
    </div>
  );
}
