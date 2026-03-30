"use client";

import { useEffect, useState } from "react";
import type { RegionSummary, NetworkBenchmarks } from "@/types";

interface MetricCardsProps {
  summary: RegionSummary;
  benchmarks: NetworkBenchmarks;
}

interface Metric {
  label: string;
  rawValue: number;
  suffix: string;
  comparison: string;
  status: "good" | "neutral" | "warn";
}

function AnimatedNumber({ target, suffix, delay }: { target: number; suffix: string; delay: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const duration = 600;
      const start = performance.now();
      function tick(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay]);

  const display = target % 1 === 0 ? Math.round(value) : value.toFixed(1);
  return <>{display}{suffix}</>;
}

export function MetricCards({ summary, benchmarks }: MetricCardsProps) {
  const metrics: Metric[] = [
    {
      label: "Labour cost % revenue",
      rawValue: summary.totalLabourCostPct,
      suffix: "%",
      comparison: `Network avg: ${benchmarks.avgLabourCostPct}%`,
      status: summary.totalLabourCostPct < benchmarks.avgLabourCostPct ? "good" : "warn",
    },
    {
      label: "Schedule fill rate",
      rawValue: summary.scheduleFillRate,
      suffix: "%",
      comparison: "Target: 95%",
      status: summary.scheduleFillRate >= 95 ? "good" : summary.scheduleFillRate >= 90 ? "neutral" : "warn",
    },
    {
      label: "Compliance score",
      rawValue: summary.overallComplianceScore,
      suffix: "",
      comparison: `Network avg: ${benchmarks.avgComplianceScore}`,
      status: summary.overallComplianceScore >= benchmarks.avgComplianceScore ? "good" : "warn",
    },
    {
      label: "Staff turnover (90d)",
      rawValue: summary.overallTurnover90d,
      suffix: "%",
      comparison: `Network avg: ${benchmarks.avgTurnover90d}%`,
      status: summary.overallTurnover90d <= benchmarks.avgTurnover90d ? "good" : summary.overallTurnover90d <= benchmarks.avgTurnover90d * 1.2 ? "neutral" : "warn",
    },
  ];

  const statusColor = {
    good: "text-green-600",
    neutral: "text-amber-600",
    warn: "text-red-500",
  };

  const statusDot = {
    good: "bg-green-500",
    neutral: "bg-amber-500",
    warn: "bg-red-500",
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      {metrics.map((m, i) => (
        <div
          key={m.label}
          className="animate-card-in rounded-xl border border-gray-100 bg-gray-50/50 p-4"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wide">
            {m.label}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-[28px] font-bold leading-none ${statusColor[m.status]}`}>
              <AnimatedNumber target={m.rawValue} suffix={m.suffix} delay={i * 100} />
            </span>
            <span className={`h-2.5 w-2.5 rounded-full ${statusDot[m.status]}`} />
          </div>
          <p className="mt-2 text-[13px] text-gray-400">{m.comparison}</p>
        </div>
      ))}
    </div>
  );
}
