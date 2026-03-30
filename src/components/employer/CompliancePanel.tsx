"use client";

import { useState } from "react";
import type { ComplianceAlert } from "@/types";

interface CompliancePanelProps {
  alerts: ComplianceAlert[];
  onAlertClick: (alert: ComplianceAlert) => void;
}

const severityDot: Record<ComplianceAlert["severity"], string> = {
  high: "bg-red-500 animate-alert-pulse",
  medium: "bg-amber-500",
  low: "bg-green-500",
};

const severityBg: Record<ComplianceAlert["severity"], string> = {
  high: "hover:bg-red-50/50",
  medium: "hover:bg-amber-50/50",
  low: "hover:bg-green-50/50",
};

export function CompliancePanel({ alerts, onAlertClick }: CompliancePanelProps) {
  const [flashIdx, setFlashIdx] = useState<number | null>(null);

  function handleClick(alert: ComplianceAlert, i: number) {
    setFlashIdx(i);
    setTimeout(() => setFlashIdx(null), 400);
    onAlertClick(alert);
  }

  return (
    <div>
      <h3 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wide">
        Compliance alerts
      </h3>
      <div className="mt-3 flex flex-col gap-2">
        {alerts.map((alert, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleClick(alert, i)}
            className={`w-full rounded-lg border border-gray-100 p-3.5 text-left transition-all ${severityBg[alert.severity]} ${
              flashIdx === i ? "animate-click-flash" : ""
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${severityDot[alert.severity]}`} />
              <span className="text-[14px] font-semibold text-gray-900">{alert.title}</span>
              <span className="ml-auto text-[12px] text-gray-400">{alert.store}</span>
            </div>
            <p className="mt-1.5 pl-5 text-[13px] leading-relaxed text-gray-500">
              {alert.detail.length > 140 ? alert.detail.slice(0, 140) + "…" : alert.detail}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
