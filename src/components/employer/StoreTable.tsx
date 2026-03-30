"use client";

import { useEffect, useRef } from "react";
import type { StoreData, NetworkBenchmarks } from "@/types";

interface StoreTableProps {
  stores: StoreData[];
  benchmarks: NetworkBenchmarks;
  highlightSlug: string | null;
  onStoreClick?: (store: StoreData) => void;
}

function cellColor(value: number, benchmark: number, lowerIsBetter: boolean): string {
  const diff = lowerIsBetter ? benchmark - value : value - benchmark;
  const pct = diff / benchmark;
  if (pct > 0.05) return "text-green-600";
  if (pct > -0.05) return "text-gray-700";
  if (pct > -0.15) return "text-amber-600";
  return "text-red-500";
}

export function StoreTable({ stores, benchmarks, highlightSlug, onStoreClick }: StoreTableProps) {
  const sorted = [...stores].sort((a, b) => b.revenuePerLabourHour - a.revenuePerLabourHour);
  const prevHighlightRef = useRef<string | null>(null);
  const rowRefs = useRef<Map<string, HTMLTableRowElement>>(new Map());

  // Trigger pulse animation via DOM when highlight changes
  useEffect(() => {
    if (highlightSlug && highlightSlug !== prevHighlightRef.current) {
      const row = rowRefs.current.get(highlightSlug);
      if (row) {
        row.classList.remove("animate-highlight-pulse");
        // Force reflow to restart animation
        void row.offsetWidth;
        row.classList.add("animate-highlight-pulse");
      }
    }
    prevHighlightRef.current = highlightSlug;
  }, [highlightSlug]);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/70">
            <th className="py-3.5 pl-5 pr-3 text-[12px] font-semibold text-gray-400 uppercase tracking-wide">Store</th>
            <th className="px-3 py-3.5 text-[12px] font-semibold text-gray-400 uppercase tracking-wide text-right">Revenue/hr</th>
            <th className="px-3 py-3.5 text-[12px] font-semibold text-gray-400 uppercase tracking-wide text-right">Labour %</th>
            <th className="px-3 py-3.5 text-[12px] font-semibold text-gray-400 uppercase tracking-wide text-right">Compliance</th>
            <th className="px-3 py-3.5 text-[12px] font-semibold text-gray-400 uppercase tracking-wide text-right">Turnover</th>
            <th className="px-3 py-3.5 text-[12px] font-semibold text-gray-400 uppercase tracking-wide text-right">Open shifts</th>
            <th className="py-3.5 pl-3 pr-5 text-[12px] font-semibold text-gray-400 uppercase tracking-wide text-right">OT hours</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((store, i) => {
            const isHighlighted = highlightSlug === store.slug;
            return (
              <tr
                key={store.slug}
                ref={(el) => { if (el) rowRefs.current.set(store.slug, el); }}
                className={`animate-row-in border-b border-gray-50 transition-colors last:border-0 ${
                  isHighlighted ? "bg-teal-50/40" : "hover:bg-gray-50/50"
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <td className="py-3.5 pl-5 pr-3">
                  <div className={`flex items-center gap-2 ${isHighlighted ? "border-l-2 border-quinyx pl-2.5 -ml-2.5" : ""}`}>
                    <div>
                      <button
                        type="button"
                        onClick={() => onStoreClick?.(store)}
                        className="text-[14px] font-medium text-quinyx transition-colors hover:underline"
                      >
                        {store.name}
                      </button>
                      <p className="text-[12px] text-gray-400">{store.manager} · {store.headcount} staff</p>
                    </div>
                  </div>
                </td>
                <td className={`px-3 py-3.5 text-right text-[15px] font-semibold tabular-nums ${cellColor(store.revenuePerLabourHour, benchmarks.avgRevenuePerLabourHour, false)}`}>
                  £{store.revenuePerLabourHour}
                </td>
                <td className={`px-3 py-3.5 text-right text-[15px] font-medium tabular-nums ${cellColor(store.labourCostPct, benchmarks.avgLabourCostPct, true)}`}>
                  {store.labourCostPct}%
                </td>
                <td className={`px-3 py-3.5 text-right text-[15px] font-medium tabular-nums ${cellColor(store.complianceScore, benchmarks.avgComplianceScore, false)}`}>
                  {store.complianceScore}%
                </td>
                <td className={`px-3 py-3.5 text-right text-[15px] font-medium tabular-nums ${cellColor(store.turnover90d, benchmarks.avgTurnover90d, true)}`}>
                  {store.turnover90d}%
                </td>
                <td className={`px-3 py-3.5 text-right text-[15px] font-medium tabular-nums ${store.openShiftsThisWeek >= 4 ? "text-amber-600" : "text-gray-700"}`}>
                  {store.openShiftsThisWeek}
                </td>
                <td className={`py-3.5 pl-3 pr-5 text-right text-[15px] font-medium tabular-nums ${store.overtimeHoursThisWeek >= 25 ? "text-amber-600" : "text-gray-700"}`}>
                  {store.overtimeHoursThisWeek}
                </td>
              </tr>
            );
          })}
          {/* Network benchmark row */}
          <tr className="border-t border-gray-200 bg-gray-50/50">
            <td className="py-3 pl-5 pr-3 text-[13px] font-medium text-gray-400 italic">
              Network avg (823 locations)
            </td>
            <td className="px-3 py-3 text-right text-[13px] tabular-nums text-gray-400">£{benchmarks.avgRevenuePerLabourHour}</td>
            <td className="px-3 py-3 text-right text-[13px] tabular-nums text-gray-400">{benchmarks.avgLabourCostPct}%</td>
            <td className="px-3 py-3 text-right text-[13px] tabular-nums text-gray-400">{benchmarks.avgComplianceScore}%</td>
            <td className="px-3 py-3 text-right text-[13px] tabular-nums text-gray-400">{benchmarks.avgTurnover90d}%</td>
            <td className="px-3 py-3 text-right text-[13px] tabular-nums text-gray-400">—</td>
            <td className="py-3 pl-3 pr-5 text-right text-[13px] tabular-nums text-gray-400">—</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
