"use client";

import type { WeeklyMetric } from "@/data/store-detail-data";

interface TrendChartProps {
  storeData: WeeklyMetric[];
  costaAvg: WeeklyMetric[];
  networkAvg: WeeklyMetric[];
  metric: "revenuePerHour" | "labourCostPct" | "complianceScore";
  label: string;
  format: (v: number) => string;
  lowerIsBetter?: boolean;
}

// RAG: compare store value to network benchmark
function ragColour(value: number, benchmark: number, lowerIsBetter: boolean): string {
  const diff = lowerIsBetter ? benchmark - value : value - benchmark;
  const pct = diff / benchmark;
  if (pct > 0.03) return "#16a34a"; // green
  if (pct > -0.05) return "#d97706"; // amber
  return "#dc2626"; // red
}

const COSTA_BLUE = "#4b8bf5";

export function TrendChart({ storeData, costaAvg, networkAvg, metric, label, format, lowerIsBetter = false }: TrendChartProps) {
  const allValues = [
    ...storeData.map((d) => d[metric]),
    ...costaAvg.map((d) => d[metric]),
    ...networkAvg.map((d) => d[metric]),
  ];
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;
  const padding = range * 0.15;
  const chartMin = min - padding;
  const chartMax = max + padding;
  const chartRange = chartMax - chartMin;

  const chartH = 160;
  const chartW = 100;

  function toY(value: number): number {
    return chartH - ((value - chartMin) / chartRange) * chartH;
  }

  function toPoints(data: WeeklyMetric[]): string {
    return data
      .map((d, i) => {
        const x = (i / (data.length - 1)) * chartW;
        const y = toY(d[metric]);
        return `${x},${y}`;
      })
      .join(" ");
  }

  // Build RAG-coloured line segments for the store
  const storeSegments: { x1: number; y1: number; x2: number; y2: number; colour: string }[] = [];
  for (let i = 0; i < storeData.length - 1; i++) {
    const x1 = (i / (storeData.length - 1)) * chartW;
    const y1 = toY(storeData[i][metric]);
    const x2 = ((i + 1) / (storeData.length - 1)) * chartW;
    const y2 = toY(storeData[i + 1][metric]);
    // Use the midpoint value for colour
    const midVal = (storeData[i][metric] + storeData[i + 1][metric]) / 2;
    const benchVal = networkAvg[i][metric];
    storeSegments.push({
      x1, y1, x2, y2,
      colour: ragColour(midVal, benchVal, lowerIsBetter),
    });
  }

  return (
    <div>
      <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
      <div className="relative mt-2" style={{ height: chartH + 30 }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 flex h-[160px] flex-col justify-between text-[10px] text-gray-400 tabular-nums">
          <span>{format(chartMax)}</span>
          <span>{format((chartMax + chartMin) / 2)}</span>
          <span>{format(chartMin)}</span>
        </div>

        {/* Chart area */}
        <div className="ml-10 mr-2">
          <svg viewBox={`0 0 ${chartW} ${chartH}`} className="h-[160px] w-full" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
              <line
                key={pct}
                x1="0" y1={pct * chartH} x2={chartW} y2={pct * chartH}
                stroke="#f3f4f6" strokeWidth="0.5"
              />
            ))}

            {/* Network avg — dashed grey line */}
            <polyline
              points={toPoints(networkAvg)}
              fill="none"
              stroke="#9ca3af"
              strokeWidth="0.8"
              strokeDasharray="2 2"
              vectorEffect="non-scaling-stroke"
            />

            {/* Costa avg — mid blue */}
            <polyline
              points={toPoints(costaAvg)}
              fill="none"
              stroke={COSTA_BLUE}
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />

            {/* This store — RAG-coloured segments */}
            {storeSegments.map((seg, i) => (
              <line
                key={i}
                x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2}
                stroke={seg.colour}
                strokeWidth="2.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Dots on store line — RAG coloured */}
            {storeData.map((d, i) => {
              const x = (i / (storeData.length - 1)) * chartW;
              const y = toY(d[metric]);
              const colour = ragColour(d[metric], networkAvg[i][metric], lowerIsBetter);
              return (
                <circle key={i} cx={x} cy={y} r="1.8" fill={colour} vectorEffect="non-scaling-stroke" />
              );
            })}
          </svg>

          {/* X-axis labels */}
          <div className="mt-1 flex justify-between text-[9px] text-gray-400">
            {storeData.filter((_, i) => i % 3 === 0 || i === storeData.length - 1).map((d) => (
              <span key={d.week}>{d.week.split(" ")[0]}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center gap-4 text-[11px]">
        <span className="flex items-center gap-1.5">
          <span className="flex gap-0.5">
            <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
            <span className="h-2 w-2 rounded-full bg-[#d97706]" />
            <span className="h-2 w-2 rounded-full bg-[#dc2626]" />
          </span>
          <span className="text-gray-600">This store (RAG)</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded" style={{ backgroundColor: COSTA_BLUE }} />
          <span className="text-gray-400">Costa avg</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded border-t border-dashed border-gray-400" style={{ width: 16 }} />
          <span className="text-gray-400">Network avg (823)</span>
        </span>
      </div>
    </div>
  );
}
