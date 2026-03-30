"use client";

import { useRouter } from "next/navigation";
import type { StoreData, NetworkBenchmarks, ComplianceAlert } from "@/types";
import { COMPLIANCE_ALERTS, NETWORK_BENCHMARKS } from "@/data/james-world";

interface StoreDrillDownProps {
  store: StoreData;
  onClose: () => void;
}

// ── Mock employee data per store ──────────────────────────────
// Arndale uses real data from sarah-world.ts for consistency.

interface StoreEmployee {
  name: string;
  role: string;
  contractType: string;
  hoursThisPeriod: number;
  totalHours: number;
  complianceOk: boolean;
  highlight?: string;
  skills?: string[];
}

const ARNDALE_EMPLOYEES: StoreEmployee[] = [
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

function generateEmployees(store: StoreData): StoreEmployee[] {
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

function performanceBadge(store: StoreData, benchmarks: NetworkBenchmarks) {
  const score =
    (store.revenuePerLabourHour >= benchmarks.avgRevenuePerLabourHour ? 1 : 0) +
    (store.complianceScore >= benchmarks.avgComplianceScore ? 1 : 0) +
    (store.turnover90d <= benchmarks.avgTurnover90d ? 1 : 0) +
    (store.trainingCompletion >= benchmarks.avgTrainingCompletion ? 1 : 0);

  if (score >= 3) return { label: "Top performer", bg: "bg-green-50", text: "text-green-700" };
  if (score >= 2) return { label: "Needs attention", bg: "bg-amber-50", text: "text-amber-700" };
  return { label: "At risk", bg: "bg-red-50", text: "text-red-700" };
}

function metricIndicator(value: number, benchmark: number, lowerIsBetter: boolean) {
  const better = lowerIsBetter ? value < benchmark : value > benchmark;
  const close = Math.abs(value - benchmark) / benchmark < 0.05;
  if (close) return { arrow: "→", color: "text-gray-400" };
  if (better) return { arrow: "↑", color: "text-green-600" };
  return { arrow: "↓", color: "text-red-500" };
}

export function StoreDrillDown({ store, onClose }: StoreDrillDownProps) {
  const router = useRouter();
  const badge = performanceBadge(store, NETWORK_BENCHMARKS);
  const employees = generateEmployees(store);
  const storeAlerts = COMPLIANCE_ALERTS.filter((a) => a.store === store.name);
  const isArndale = store.slug === "manchester-arndale";

  const metrics = [
    { label: "Revenue/hr", value: `£${store.revenuePerLabourHour}`, ...metricIndicator(store.revenuePerLabourHour, NETWORK_BENCHMARKS.avgRevenuePerLabourHour, false), benchmark: `£${NETWORK_BENCHMARKS.avgRevenuePerLabourHour}` },
    { label: "Labour cost", value: `${store.labourCostPct}%`, ...metricIndicator(store.labourCostPct, NETWORK_BENCHMARKS.avgLabourCostPct, true), benchmark: `${NETWORK_BENCHMARKS.avgLabourCostPct}%` },
    { label: "Compliance", value: `${store.complianceScore}%`, ...metricIndicator(store.complianceScore, NETWORK_BENCHMARKS.avgComplianceScore, false), benchmark: `${NETWORK_BENCHMARKS.avgComplianceScore}%` },
    { label: "Turnover (90d)", value: `${store.turnover90d}%`, ...metricIndicator(store.turnover90d, NETWORK_BENCHMARKS.avgTurnover90d, true), benchmark: `${NETWORK_BENCHMARKS.avgTurnover90d}%` },
  ];

  function handleViewEmployee() {
    router.push("/employee");
  }

  return (
    <div className="animate-page-enter absolute inset-0 z-20 flex flex-col overflow-hidden bg-white" style={{ borderRadius: "inherit" }}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
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
          <p className="text-[13px] text-gray-400">{store.manager} · {store.headcount} staff</p>
        </div>
        <div className="flex items-center gap-2">
          {isArndale ? (
            <button
              type="button"
              onClick={handleViewEmployee}
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
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto p-5">
        {/* Mini metrics */}
        <div className="grid grid-cols-4 gap-3">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-lg border border-gray-100 bg-gray-50/50 p-3">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">{m.label}</p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-[20px] font-bold text-gray-900">{m.value}</span>
                <span className={`text-[14px] font-medium ${m.color}`}>{m.arrow}</span>
              </div>
              <p className="mt-0.5 text-[11px] text-gray-400">vs {m.benchmark} network</p>
            </div>
          ))}
        </div>

        {/* Team overview */}
        <div className="mt-5">
          <h3 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wide">Team ({employees.length} of {store.headcount})</h3>
          <div className="mt-2 overflow-hidden rounded-lg border border-gray-100">
            {employees.map((emp, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-4 py-2.5 ${i > 0 ? "border-t border-gray-50" : ""} ${emp.name === "Sarah Mitchell" ? "bg-quinyx/[0.03]" : ""}`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-medium text-gray-900">{emp.name}</span>
                    {emp.name === "Sarah Mitchell" && (
                      <span className="rounded bg-quinyx/10 px-1.5 py-0.5 text-[10px] font-medium text-quinyx">Employee demo</span>
                    )}
                  </div>
                  <p className="text-[12px] text-gray-400">{emp.role} · {emp.contractType}</p>
                  {emp.highlight ? (
                    <p className={`mt-0.5 text-[11px] ${emp.complianceOk ? "text-quinyx" : "text-amber-600"}`}>
                      {emp.highlight}
                    </p>
                  ) : null}
                  {emp.skills ? (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {emp.skills.map((s) => (
                        <span key={s} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-500">{s}</span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[13px] font-medium tabular-nums text-gray-700">{emp.hoursThisPeriod}/{emp.totalHours}h</p>
                  <span className={`inline-block h-2 w-2 rounded-full ${emp.complianceOk ? "bg-green-500" : "bg-amber-500"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduling health */}
        <div className="mt-5">
          <h3 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wide">Scheduling health</h3>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-gray-100 p-3">
              <p className="text-[11px] text-gray-400">Schedule notice</p>
              <p className="text-[16px] font-semibold text-gray-900">{store.scheduleNoticeDays} days</p>
              <p className="text-[11px] text-gray-400">Network avg: {NETWORK_BENCHMARKS.avgScheduleNoticeDays} days</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-3">
              <p className="text-[11px] text-gray-400">Preference match</p>
              <p className="text-[16px] font-semibold text-gray-900">{store.preferenceMatchRate}%</p>
              <p className="text-[11px] text-gray-400">Network avg: {NETWORK_BENCHMARKS.avgPreferenceMatchRate}%</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-3">
              <p className="text-[11px] text-gray-400">Open shifts this week</p>
              <p className={`text-[16px] font-semibold ${store.openShiftsThisWeek >= 4 ? "text-amber-600" : "text-gray-900"}`}>{store.openShiftsThisWeek}</p>
            </div>
            <div className="rounded-lg border border-gray-100 p-3">
              <p className="text-[11px] text-gray-400">Overtime this week</p>
              <p className={`text-[16px] font-semibold ${store.overtimeHoursThisWeek >= 25 ? "text-amber-600" : "text-gray-900"}`}>{store.overtimeHoursThisWeek}h</p>
            </div>
          </div>
        </div>

        {/* Compliance */}
        {storeAlerts.length > 0 && (
          <div className="mt-5">
            <h3 className="text-[13px] font-semibold text-gray-400 uppercase tracking-wide">Compliance</h3>
            <div className="mt-2 flex flex-col gap-2">
              {storeAlerts.map((alert, i) => (
                <AlertRow key={i} alert={alert} />
              ))}
            </div>
          </div>
        )}

        {/* Ava insight */}
        <div className="mt-5 rounded-xl border border-quinyx/20 bg-quinyx/[0.03] p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-quinyx text-[10px] font-semibold text-white">A</div>
            <span className="text-[12px] font-semibold text-quinyx">Ava insight</span>
          </div>
          <p className="text-[13px] leading-relaxed text-gray-700">
            {isArndale
              ? "This store's turnover is 5.3 percentage points above the network average. The biggest factor is schedule notice — averaging 5.3 days vs 8.1 at your best-performing store. Improving this alone could reduce turnover by up to 30%, based on patterns across 823 similar locations."
              : `${store.name}'s revenue per labour hour is ${store.revenuePerLabourHour >= NETWORK_BENCHMARKS.avgRevenuePerLabourHour ? "above" : "below"} the network average of £${NETWORK_BENCHMARKS.avgRevenuePerLabourHour}. ${store.turnover90d > NETWORK_BENCHMARKS.avgTurnover90d ? `Turnover at ${store.turnover90d}% is a concern — reducing to network average could save approximately £${Math.round(((store.turnover90d - NETWORK_BENCHMARKS.avgTurnover90d) / 100) * store.headcount * 3200).toLocaleString()}/year.` : "Turnover is in line with the network, which is a positive indicator."}`
            }
          </p>
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}

function AlertRow({ alert }: { alert: ComplianceAlert }) {
  const dots: Record<string, string> = { high: "bg-red-500 animate-alert-pulse", medium: "bg-amber-500", low: "bg-green-500" };
  return (
    <div className="rounded-lg border border-gray-100 p-3">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 flex-shrink-0 rounded-full ${dots[alert.severity] ?? "bg-gray-400"}`} />
        <span className="text-[14px] font-semibold text-gray-900">{alert.title}</span>
      </div>
      <p className="mt-1 pl-4.5 text-[13px] text-gray-500">{alert.detail}</p>
      <p className="mt-1.5 pl-4.5 text-[12px] text-quinyx">{alert.recommendation}</p>
    </div>
  );
}
