"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import type { ComplianceAlert, NetworkInsight, StoreData } from "@/types";
import {
  STORES,
  NETWORK_BENCHMARKS,
  COMPLIANCE_ALERTS,
  NETWORK_INSIGHTS,
  REGION_SUMMARY,
} from "@/data/james-world";
import { getFormattedDate } from "@/data/sarah-world";
import { QuinyxLogo } from "./QuinyxLogo";
import { MetricCards } from "./MetricCards";
import { StoreTable } from "./StoreTable";
import { CompliancePanel } from "./CompliancePanel";
import { InsightsPanel } from "./InsightsPanel";
import { StoreDrillDown } from "./StoreDrillDown";
import { EmployerChatSidebar } from "./EmployerChatSidebar";
import type { EmployerChatHandle } from "./EmployerChatSidebar";

export function DashboardLayout() {
  const chatRef = useRef<EmployerChatHandle>(null);
  const [highlightSlug, setHighlightSlug] = useState<string | null>(null);
  const [drillDownStore, setDrillDownStore] = useState<StoreData | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleHighlight = useCallback((slug: string | null) => {
    setHighlightSlug(slug);
  }, []);

  function handleAlertClick(alert: ComplianceAlert) {
    chatRef.current?.sendFromDashboard(
      `Tell me more about the ${alert.title} at ${alert.store}`
    );
  }

  function handleInsightClick(insight: NetworkInsight) {
    chatRef.current?.sendFromDashboard(
      `How does this insight apply to my stores? "${insight.insight}"`
    );
  }

  function handleStoreClick(store: StoreData) {
    setDrillDownStore(store);
  }

  // Track scroll for sticky header shrink
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    function onScroll() {
      setScrolled((el?.scrollTop ?? 0) > 20);
    }
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // 'S' shortcut to jump to Arndale drill-down
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "s" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const arndale = STORES.find((s) => s.slug === "manchester-arndale");
        if (arndale) setDrillDownStore(arndale);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const alertCount = COMPLIANCE_ALERTS.length;
  const hasHighAlert = COMPLIANCE_ALERTS.some((a) => a.severity === "high");
  const today = getFormattedDate();

  return (
    <div className="relative flex h-full w-full overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm font-[family-name:var(--font-poppins)]">
      {/* LEFT — Dashboard */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* Sticky header */}
        <div
          className={`sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white/95 backdrop-blur-sm transition-all duration-300 ease-out ${
            scrolled ? "px-6 py-2.5" : "px-6 py-4"
          }`}
        >
          {/* Left: logo + region */}
          <div className="flex items-center gap-4">
            <QuinyxLogo
              fill="#004851"
              height={scrolled ? 22 : 28}
              className="transition-all duration-300 ease-out"
            />
            <div className="h-5 w-px bg-gray-200" />
            <span className="text-[13px] font-medium text-gray-400">
              North West region
            </span>
          </div>

          {/* Right: compact KPIs + badges + date */}
          <div className="flex items-center gap-4">
            {/* Compact KPIs — always visible */}
            <div className="flex items-center gap-4">
              <KpiChip
                label="Labour"
                value={`${REGION_SUMMARY.totalLabourCostPct}%`}
                good={REGION_SUMMARY.totalLabourCostPct < NETWORK_BENCHMARKS.avgLabourCostPct}
              />
              <KpiChip
                label="Fill rate"
                value={`${REGION_SUMMARY.scheduleFillRate}%`}
                good={REGION_SUMMARY.scheduleFillRate >= 95}
              />
              <KpiChip
                label="Compliance"
                value={`${REGION_SUMMARY.overallComplianceScore}`}
                good={REGION_SUMMARY.overallComplianceScore >= NETWORK_BENCHMARKS.avgComplianceScore}
              />
              <KpiChip
                label="Turnover"
                value={`${REGION_SUMMARY.overallTurnover90d}%`}
                good={REGION_SUMMARY.overallTurnover90d <= NETWORK_BENCHMARKS.avgTurnover90d}
              />
            </div>

            <div className="h-5 w-px bg-gray-200" />

            {/* Badges */}
            <span className="rounded-full bg-quinyx/10 px-2.5 py-1 text-[11px] font-medium text-quinyx">
              6 stores
            </span>
            <span className={`rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-medium text-amber-700 ${
              hasHighAlert ? "animate-alert-pulse" : ""
            }`}>
              {alertCount} alert{alertCount !== 1 ? "s" : ""}
            </span>

            <span className="text-[11px] text-gray-400">
              {today}
            </span>
          </div>
        </div>

        {/* Scrollable content */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">North West region</p>
              <h1 className="mt-1 text-[22px] font-semibold text-gray-900">Good morning, James</h1>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="rounded-full bg-quinyx/10 px-3.5 py-1.5 text-[13px] font-medium text-quinyx">
                6 stores
              </span>
              <span className={`rounded-full bg-amber-50 px-3.5 py-1.5 text-[13px] font-medium text-amber-700 ${
                hasHighAlert ? "animate-alert-pulse" : ""
              }`}>
                {alertCount} alert{alertCount !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Metrics */}
          <div className="mt-5">
            <MetricCards summary={REGION_SUMMARY} benchmarks={NETWORK_BENCHMARKS} />
          </div>

          {/* Store table */}
          <div className="mt-6">
            <h2 className="mb-3 text-[13px] font-semibold text-gray-400 uppercase tracking-wide">
              Store performance
            </h2>
            <StoreTable
              stores={STORES}
              benchmarks={NETWORK_BENCHMARKS}
              highlightSlug={highlightSlug}
              onStoreClick={handleStoreClick}
            />
          </div>

          {/* Bottom two-column section */}
          <div className="mt-6 grid grid-cols-2 gap-6 pb-4">
            <CompliancePanel alerts={COMPLIANCE_ALERTS} onAlertClick={handleAlertClick} />
            <InsightsPanel insights={NETWORK_INSIGHTS} onInsightClick={handleInsightClick} />
          </div>
        </div>

        {/* Store drill-down overlay */}
        {drillDownStore && (
          <StoreDrillDown
            store={drillDownStore}
            onClose={() => setDrillDownStore(null)}
          />
        )}
      </div>

      {/* RIGHT — Ava sidebar */}
      <div className="w-[340px] flex-shrink-0 border-l border-gray-100">
        <EmployerChatSidebar ref={chatRef} onHighlight={handleHighlight} />
      </div>
    </div>
  );
}

function KpiChip({ label, value, good }: { label: string; value: string; good: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[11px] text-gray-400">{label}</span>
      <span className={`text-[13px] font-semibold tabular-nums ${good ? "text-green-600" : "text-amber-600"}`}>
        {value}
      </span>
    </div>
  );
}
