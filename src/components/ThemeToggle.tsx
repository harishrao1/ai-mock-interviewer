import { useState, useRef, useEffect } from "react";
import { useThemeStore, type Theme } from "../store/useThemeStore";

// ── Icons ─────────────────────────────────────────────────────────────────────

function PaletteIcon() {
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
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      <circle cx="7.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7" r="1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="10.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function CloseIcon() {
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
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ── Theme definitions ─────────────────────────────────────────────────────────

const THEMES: {
  id: Theme;
  label: string;
  description: string;
  group: "dark" | "light";
  tag?: { label: string; color: string };
  preview: {
    bg: string;
    sidebar: string;
    accent: string;
    bar: string;
    card: string;
  };
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
      card: "#1f2937",
    },
  },
  {
    id: "midnight",
    group: "dark",
    label: "Midnight",
    description: "OLED black with violet",
    tag: { label: "OLED", color: "text-purple-400 bg-purple-900/40" },
    preview: {
      bg: "#000000",
      sidebar: "#0d0d0d",
      accent: "#a855f7",
      bar: "#1a1a1a",
      card: "#111111",
    },
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
      card: "#16291b",
    },
  },
  {
    id: "ocean",
    group: "dark",
    label: "Ocean",
    description: "Deep sea blues",
    tag: { label: "New", color: "text-blue-400 bg-blue-900/40" },
    preview: {
      bg: "#020b18",
      sidebar: "#071628",
      accent: "#3b82f6",
      bar: "#0f2040",
      card: "#0d1f38",
    },
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
      card: "#1f1505",
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
      card: "#ffffff",
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
      card: "#fff9f0",
    },
  },
  {
    id: "arctic",
    group: "light",
    label: "Arctic",
    description: "Icy blue & white",
    tag: { label: "New", color: "text-sky-700 bg-sky-100" },
    preview: {
      bg: "#f0f8ff",
      sidebar: "#dbeeff",
      accent: "#0ea5e9",
      bar: "#bfdbf7",
      card: "#ffffff",
    },
  },
];

// ── Mini theme preview ────────────────────────────────────────────────────────

function ThemePreview({ preview }: { preview: (typeof THEMES)[0]["preview"] }) {
  return (
    <div
      className="w-full h-14 rounded-md overflow-hidden flex mb-2.5"
      style={{ background: preview.bg }}
    >
      <div className="w-[28%] h-full" style={{ background: preview.sidebar }} />
      <div className="flex-1 p-1.5 flex flex-col gap-1">
        <div
          className="h-[3px] rounded-full w-1/2"
          style={{ background: preview.accent }}
        />
        <div
          className="h-[3px] rounded-full w-4/5"
          style={{ background: preview.bar }}
        />
        <div
          className="rounded p-1 flex flex-col gap-1 mt-0.5"
          style={{ background: preview.sidebar }}
        >
          <div
            className="h-[2px] rounded-full w-2/5"
            style={{ background: preview.accent }}
          />
          <div
            className="h-[2px] rounded-full w-3/5"
            style={{ background: preview.bar }}
          />
        </div>
      </div>
    </div>
  );
}

// ── Theme card ────────────────────────────────────────────────────────────────

function ThemeCard({
  t,
  isActive,
  onSelect,
}: {
  t: (typeof THEMES)[0];
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={`relative w-full text-left p-3 rounded-xl border transition-all ${
        isActive
          ? "border-[--accent]"
          : "border-gray-800 hover:border-gray-600 hover:bg-gray-800/40"
      }`}
      style={
        {
          "--accent": t.preview.accent,
          backgroundColor: isActive ? `${t.preview.accent}0d` : undefined,
          boxShadow: isActive ? `0 0 0 1px ${t.preview.accent}4d` : undefined,
        } as React.CSSProperties
      }
    >
      <ThemePreview preview={t.preview} />

      {isActive && (
        <span
          className="absolute top-2 right-2 w-4.5 h-4.5 rounded-full flex items-center justify-center text-white-keep"
          style={{ background: t.preview.accent, width: 18, height: 18 }}
        >
          <svg
            className="w-2.5 h-2.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      )}

      <p className="text-sm font-medium text-gray-200 leading-none">
        {t.label}
      </p>
      <p className="text-[11px] text-gray-500 mt-1 leading-none">
        {t.description}
      </p>

      {t.tag && (
        <span
          className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded mt-2.5"
          style={{
            backgroundColor: `${t.preview.accent}20`,
            color: t.preview.accent,
          }}
        >
          {t.tag.label}
        </span>
      )}
    </button>
  );
}

// ── Group section ─────────────────────────────────────────────────────────────

function ThemeGroup({
  label,
  themes,
  activeTheme,
  onSelect,
}: {
  label: string;
  themes: typeof THEMES;
  activeTheme: Theme;
  onSelect: (id: Theme) => void;
}) {
  return (
    <div>
      <p className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest mb-2 px-1">
        {label}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {themes.map((t) => (
          <ThemeCard
            key={t.id}
            t={t}
            isActive={activeTheme === t.id}
            onSelect={() => onSelect(t.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function ThemeToggle() {
  const { theme, setTheme } = useThemeStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const active = THEMES.find((t) => t.id === theme) ?? THEMES[0];
  const darkThemes = THEMES.filter((t) => t.group === "dark");
  const lightThemes = THEMES.filter((t) => t.group === "light");

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="p-2 text-gray-400 hover:text-indigo-400 rounded-xl bg-gray-900 border border-gray-800 hover:border-indigo-500/50 hover:bg-indigo-650/5 active:scale-95 transition-all shadow-sm"
        title="Change theme"
      >
        <PaletteIcon />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-3.5 w-80 bg-gray-950/95 backdrop-blur-md border border-gray-800/80 rounded-2xl shadow-[0_12px_45px_rgba(0,0,0,0.6)] z-50 overflow-hidden border-indigo-500/10 animate-fade-in">
          <div className="px-4 py-3 border-b border-gray-850/80 flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Appearance
            </p>
            <button
              onClick={() => setOpen(false)}
              className="text-gray-600 hover:text-gray-400 transition-colors"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="p-3 space-y-4 max-h-[70vh] overflow-y-auto">
            <ThemeGroup
              label="Dark"
              themes={darkThemes}
              activeTheme={theme}
              onSelect={(id) => {
                setTheme(id);
                setOpen(false);
              }}
            />
            <ThemeGroup
              label="Light"
              themes={lightThemes}
              activeTheme={theme}
              onSelect={(id) => {
                setTheme(id);
                setOpen(false);
              }}
            />
          </div>

          <div className="px-4 py-3 border-t border-gray-850/80 flex items-center gap-2 bg-gray-950/20">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 animate-pulse"
              style={{ background: active.preview.accent }}
            />
            <p className="text-xs text-gray-500">
              Active theme:{" "}
              <span className="text-gray-300 font-semibold">
                {active.label}
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
