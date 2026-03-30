"use client";

import { useState } from "react";
import type { ComplianceAlertCardData } from "@/types";

const severityStyles: Record<ComplianceAlertCardData["severity"], { dot: string; border: string; bg: string; label: string }> = {
  high:   { dot: "bg-red-500",    border: "border-red-200",   bg: "bg-red-50/30",    label: "Critical" },
  medium: { dot: "bg-amber-500",  border: "border-amber-200", bg: "bg-amber-50/30",  label: "Warning" },
  low:    { dot: "bg-green-500",  border: "border-gray-200",  bg: "bg-white",        label: "Info" },
};

export function ComplianceAlertCard({ data }: { data: ComplianceAlertCardData }) {
  const [expanded, setExpanded] = useState(false);
  const style = severityStyles[data.severity] ?? severityStyles.low;
  const isLong = data.detail.length > 100;

  return (
    <div className={`rounded-lg border ${style.border} ${style.bg} p-3`}>
      {/* Header */}
      <div className="flex items-center gap-1.5">
        <span className={`h-2 w-2 flex-shrink-0 rounded-full ${style.dot}`} />
        <span className="text-[13px] font-semibold text-gray-900">{data.title}</span>
        <span className="ml-auto text-[10px] font-medium text-gray-400 uppercase">{data.store}</span>
      </div>

      {/* Detail */}
      <button
        type="button"
        onClick={() => isLong && setExpanded((e) => !e)}
        className={`mt-1.5 w-full text-left text-[12px] leading-relaxed text-gray-600 ${isLong ? "cursor-pointer" : ""}`}
      >
        {expanded || !isLong ? data.detail : data.detail.slice(0, 100) + "…"}
        {isLong && (
          <span className="ml-1 text-[11px] font-medium text-quinyx">
            {expanded ? "less" : "more"}
          </span>
        )}
      </button>

      {/* Recommendation */}
      {data.recommendation && (
        <div className="mt-2 rounded-md bg-teal-50/60 px-2.5 py-1.5">
          <p className="text-[11px] leading-snug text-quinyx">{data.recommendation}</p>
        </div>
      )}
    </div>
  );
}
