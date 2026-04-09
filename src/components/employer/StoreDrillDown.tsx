"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { StoreData } from "@/types";
import { COMPLIANCE_ALERTS, NETWORK_BENCHMARKS } from "@/data/james-world";
import { getStoreActions } from "@/data/store-detail-data";
import { TeamTab } from "./store-detail/TeamTab";
import type { TeamEmployee } from "./store-detail/TeamTab";
import { PerformanceTab } from "./store-detail/PerformanceTab";
import { ActionsTab } from "./store-detail/ActionsTab";

interface StoreDrillDownProps {
  store: StoreData;
  onClose: () => void;
}

// ── Employee data ─────────────────────────────────────────────

const ARNDALE_EMPLOYEES: TeamEmployee[] = [
  {
    name: "Sarah Mitchell",
    role: "Barista",
    contractType: "Part-time",
    hoursThisPeriod: 96,
    totalHours: 130,
    complianceOk: true,
    highlight: "Latte art training (60% complete)",
    skills: ["Espresso (Advanced)", "Till (Intermediate)", "Opening procedures (Competent)"],
  },
  { name: "Jamie Lewis", role: "Barista", contractType: "Full-time", hoursThisPeriod: 148, totalHours: 160, complianceOk: true },
  { name: "Priya Kaur", role: "Barista", contractType: "Part-time", hoursThisPeriod: 88, totalHours: 104, complianceOk: true },
  { name: "Marcus Chen", role: "Shift Supervisor", contractType: "Full-time", hoursThisPeriod: 156, totalHours: 160, complianceOk: true },
  { name: "Aisha Okonkwo", role: "Barista", contractType: "Part-time", hoursThisPeriod: 72, totalHours: 80, complianceOk: true },
  { name: "Tom Bradley", role: "Barista", contractType: "Full-time", hoursThisPeriod: 152, totalHours: 160, complianceOk: true },
  { name: "Callum Reid", role: "Team Member", contractType: "Part-time", hoursThisPeriod: 32, totalHours: 40, complianceOk: false, highlight: "Young worker (17) — shift ending 21:45 Fri near 22:00 limit" },
  { name: "Lily Nguyen", role: "Barista", contractType: "Part-time", hoursThisPeriod: 24, totalHours: 32, complianceOk: true },
  { name: "Zara Hussain", role: "Barista", contractType: "Full-time", hoursThisPeriod: 120, totalHours: 160, complianceOk: true, highlight: "On annual leave this week" },
];

function generateEmployees(store: StoreData): TeamEmployee[] {
  if (store.slug === "manchester-arndale") return ARNDALE_EMPLOYEES;
  const names = [
    "Alex Turner", "Beth Collins", "Chris Patel", "Dani Osei", "Emma Wright",
    "Faisal Khan", "Grace Liu", "Harry Moore", "Isla Scott", "Jake Brown",
    "Katie Shah", "Leo Davis", "Mia Evans", "Noah Clark", "Olivia Hall",
    "Pete Walsh", "Quinn Adams", "Ruby Singh", "Sam Green", "Tara Hill",
  ];
  const roles = ["Barista", "Barista", "Barista", "Shift Supervisor", "Team Member"];
  const contracts = ["Full-time", "Part-time", "Part-time", "Full-time", "Part-time"];
  return Array.from({ length: Math.min(store.headcount, 8) }, (_, i) => ({
    name: names[i % names.length],
    role: roles[i % roles.length],
    contractType: contracts[i % contracts.length],
    hoursThisPeriod: Math.round(80 + Math.random() * 80),
    totalHours: 160,
    complianceOk: Math.random() > 0.15,
  }));
}

function performanceBadge(store: StoreData) {
  const score =
    (store.revenuePerLabourHour >= NETWORK_BENCHMARKS.avgRevenuePerLabourHour ? 1 : 0) +
    (store.complianceScore >= NETWORK_BENCHMARKS.avgComplianceScore ? 1 : 0) +
    (store.turnover90d <= NETWORK_BENCHMARKS.avgTurnover90d ? 1 : 0) +
    (store.trainingCompletion >= NETWORK_BENCHMARKS.avgTrainingCompletion ? 1 : 0);
  if (score >= 3) return { label: "Top performer", bg: "bg-green-50", text: "text-green-700" };
  if (score >= 2) return { label: "Needs attention", bg: "bg-amber-50", text: "text-amber-700" };
  return { label: "At risk", bg: "bg-red-50", text: "text-red-700" };
}

type Tab = "team" | "performance" | "actions";

export function StoreDrillDown({ store, onClose }: StoreDrillDownProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("team");
  const badge = performanceBadge(store);
  const employees = generateEmployees(store);
  const storeAlerts = COMPLIANCE_ALERTS.filter((a) => a.store === store.name);
  const storeActions = getStoreActions(store.name);
  const isArndale = store.slug === "manchester-arndale";

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "team", label: "Team & Schedule" },
    { id: "performance", label: "Performance" },
    { id: "actions", label: "Actions", count: storeActions.filter((a) => a.status !== "completed" && a.status !== "dismissed").length },
  ];

  return (
    <div className="animate-page-enter absolute inset-0 z-20 flex flex-col overflow-hidden bg-white" style={{ borderRadius: "inherit" }}>
      {/* Header */}
      <div className="flex-shrink-0 border-b border-gray-100">
        <div className="flex items-center gap-3 px-5 pt-4 pb-3">
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2.5">
              <h2 className="text-[18px] font-semibold text-gray-900">{store.name}</h2>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${badge.bg} ${badge.text}`}>
                {badge.label}
              </span>
            </div>
            <p className="text-[13px] text-gray-400">{store.manager} · {store.headcount} staff · {storeAlerts.length} alert{storeAlerts.length !== 1 ? "s" : ""}</p>
          </div>
          {isArndale ? (
            <button
              type="button"
              onClick={() => router.push("/employee")}
              className="rounded-full bg-quinyx px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
            >
              View as employee →
            </button>
          ) : (
            <span className="rounded-full border border-gray-200 px-4 py-2 text-[12px] text-gray-400" title="Full product supports drill-down for any employee">
              Employee view not available in demo
            </span>
          )}
          <button type="button" onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 px-5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 pb-2.5 text-[13px] font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-quinyx"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab.label}
              {tab.count != null && tab.count > 0 && (
                <span className="ml-1.5 rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                  {tab.count}
                </span>
              )}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-quinyx" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === "team" && (
          <TeamTab store={store} employees={employees} />
        )}
        {activeTab === "performance" && (
          <PerformanceTab store={store} benchmarks={NETWORK_BENCHMARKS} />
        )}
        {activeTab === "actions" && (
          <ActionsTab actions={storeActions} storeName={store.name} />
        )}
      </div>
    </div>
  );
}
