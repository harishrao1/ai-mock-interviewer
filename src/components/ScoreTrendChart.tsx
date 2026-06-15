import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";
import type { Session } from "../types";

interface Props {
  sessions: Session[]; // chronological order (oldest first)
}

interface ChartPoint {
  label: string;
  score: number;
  type: string;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload as ChartPoint;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-gray-400 mb-1">
        {d.label} · {d.type}
      </p>
      <p className="text-white font-semibold">{d.score} / 10</p>
    </div>
  );
}

export default function ScoreTrendChart({ sessions }: Props) {
  if (sessions.length < 2) {
    return (
      <div className="flex items-center justify-center h-40 text-sm text-gray-600">
        Complete at least 2 sessions to see your trend.
      </div>
    );
  }

  const data: ChartPoint[] = [...sessions].reverse().map((s, i) => ({
    label: sessions.length > 10 ? formatDate(s.date) : `Session ${i + 1}`,
    score: s.overallScore,
    type: s.type,
  }));

  const avg =
    Math.round((data.reduce((sum, d) => sum + d.score, 0) / data.length) * 10) /
    10;

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-500">
          Score trend across {sessions.length} sessions
        </p>
        <p className="text-xs text-gray-500">
          Avg <span className="text-indigo-400 font-semibold">{avg}</span>
        </p>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart
          data={data}
          margin={{ top: 4, right: 8, bottom: 0, left: -24 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis
            dataKey="label"
            tick={{ fill: "#6b7280", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 10]}
            ticks={[0, 2, 4, 6, 8, 10]}
            tick={{ fill: "#6b7280", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#374151" }} />
          <ReferenceLine
            y={avg}
            stroke="#6366f1"
            strokeDasharray="4 4"
            strokeOpacity={0.5}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#6366f1"
            strokeWidth={2}
            dot={{ fill: "#6366f1", r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#818cf8" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
