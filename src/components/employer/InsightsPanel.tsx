"use client";

import { useState } from "react";
import type { NetworkInsight } from "@/types";

interface InsightsPanelProps {
  insights: NetworkInsight[];
  onInsightClick: (insight: NetworkInsight) => void;
}

const confidenceBadge: Record<NetworkInsight["confidence"], { bg: string; text: string }> = {
  high: { bg: "bg-green-50", text: "text-green-700" },
  medium: { bg: "bg-amber-50", text: "text-amber-700" },
  low: { bg: "bg-gray-100", text: "text-gray-500" },
};

export function InsightsPanel({ insights, onInsightClick }: InsightsPanelProps) {
  const displayed = insights.slice(0, 3);
  const [flashIdx, setFlashIdx] = useState<number | null>(null);

  function handleClick(insight: NetworkInsight, i: number) {
    setFlashIdx(i);
    setTimeout(() => setFlashIdx(null), 400);
    onInsightClick(insight);
  }

  return (
    <div>
      <h3 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wide">
        Network intelligence
      </h3>
      <div className="mt-3 flex flex-col gap-2">
        {displayed.map((insight, i) => {
          const badge = confidenceBadge[insight.confidence];
          return (
            <button
              key={i}
              type="button"
              onClick={() => handleClick(insight, i)}
              className={`w-full rounded-lg border border-gray-100 p-3.5 text-left transition-all hover:border-quinyx/30 hover:bg-teal-50/30 ${
                flashIdx === i ? "animate-click-flash" : ""
              }`}
            >
              <p className="text-[14px] font-medium leading-snug text-gray-900">
                &ldquo;{insight.insight}&rdquo;
              </p>
              <div className="mt-2 flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${badge.bg} ${badge.text}`}>
                  {insight.confidence}
                </span>
                <span className="text-[12px] text-gray-400">
                  {insight.sampleSize.toLocaleString()} locations
                </span>
                {insight.appliesTo.length > 0 && (
                  <span className="text-[12px] text-quinyx">
                    → {insight.appliesTo.length} of your stores
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
