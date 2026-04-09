"use client";

import type { WeeklyMetric } from "@/data/store-detail-data";

interface TrendChartProps {
  storeData: WeeklyMetric[];
  costaAvg: WeeklyMetric[];
  networkAvg: WeeklyMetric[];
  metric: "revenuePerHour" | "labourCostPct" | "complianceScore";
  label: string;
  format: (v: number) => string;
}

export function TrendChart({ storeData, costaAvg, networkAvg, metric, label, format }: TrendChartProps) {
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
  const chartW = 100; // percentage-based

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

            {/* Network avg — dashed line */}
            <polyline
              points={toPoints(networkAvg)}
              fill="none"
              stroke="#9ca3af"
              strokeWidth="0.8"
              strokeDasharray="2 2"
              vectorEffect="non-scaling-stroke"
            />

            {/* Costa regional avg */}
            <polyline
              points={toPoints(costaAvg)}
              fill="none"
              stroke="#d1d5db"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />

            {/* This store — primary line */}
            <polyline
              points={toPoints(storeData)}
              fill="none"
              stroke="#004851"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />

            {/* Dots on store line */}
            {storeData.map((d, i) => {
              const x = (i / (storeData.length - 1)) * chartW;
              const y = toY(d[metric]);
              return (
                <circle key={i} cx={x} cy={y} r="1.5" fill="#004851" vectorEffect="non-scaling-stroke" />
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
          <span className="h-0.5 w-4 rounded bg-[#004851]" />
          <span className="text-gray-600">This store</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded bg-gray-300" />
          <span className="text-gray-400">Costa NW avg</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 rounded border-t border-dashed border-gray-400" style={{ width: 16 }} />
          <span className="text-gray-400">Network avg (823)</span>
        </span>
      </div>
    </div>
  );
}
