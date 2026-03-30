import type {
  ManagerProfile,
  StoreData,
  NetworkBenchmarks,
  NetworkInsight,
  ComplianceAlert,
  RegionSummary,
  CostOfTurnover,
} from "@/types";

// ── 1. James's profile ────────────────────────────────────────

export const JAMES_PROFILE: ManagerProfile = {
  name: "James Whitfield",
  role: "Regional Manager",
  employer: "Costa Coffee",
  region: "North West",
  stores: 6,
  totalEmployees: 127,
  directReports: 6,
};

// ── 2. Stores ─────────────────────────────────────────────────

export const STORES: StoreData[] = [
  {
    name: "Trafford Centre",
    slug: "trafford-centre",
    manager: "Sophie Barnes",
    headcount: 28,
    revenuePerLabourHour: 142,
    labourCostPct: 26.1,
    complianceScore: 99,
    turnover90d: 11.2,
    scheduleNoticeDays: 8.1,
    preferenceMatchRate: 72,
    trainingCompletion: 94,
    avgWeeklyHoursPerEmployee: 31.4,
    openShiftsThisWeek: 1,
    overtimeHoursThisWeek: 12,
  },
  {
    name: "Deansgate",
    slug: "deansgate",
    manager: "David Park",
    headcount: 24,
    revenuePerLabourHour: 138,
    labourCostPct: 27.4,
    complianceScore: 98,
    turnover90d: 13.8,
    scheduleNoticeDays: 7.2,
    preferenceMatchRate: 65,
    trainingCompletion: 88,
    avgWeeklyHoursPerEmployee: 33.1,
    openShiftsThisWeek: 2,
    overtimeHoursThisWeek: 18,
  },
  {
    name: "Manchester Arndale",
    slug: "manchester-arndale",
    manager: "Rachel Torres",
    headcount: 22,
    revenuePerLabourHour: 127,
    labourCostPct: 29.8,
    complianceScore: 97,
    turnover90d: 19.4,
    scheduleNoticeDays: 5.3,
    preferenceMatchRate: 51,
    trainingCompletion: 79,
    avgWeeklyHoursPerEmployee: 29.8,
    openShiftsThisWeek: 3,
    overtimeHoursThisWeek: 24,
  },
  {
    name: "Piccadilly Station",
    slug: "piccadilly-station",
    manager: "Ali Rashid",
    headcount: 19,
    revenuePerLabourHour: 119,
    labourCostPct: 30.2,
    complianceScore: 91,
    turnover90d: 16.7,
    scheduleNoticeDays: 4.8,
    preferenceMatchRate: 48,
    trainingCompletion: 73,
    avgWeeklyHoursPerEmployee: 34.7,
    openShiftsThisWeek: 4,
    overtimeHoursThisWeek: 31,
  },
  {
    name: "Stockport",
    slug: "stockport",
    manager: "Karen Lloyd",
    headcount: 18,
    revenuePerLabourHour: 104,
    labourCostPct: 33.1,
    complianceScore: 98,
    turnover90d: 24.1,
    scheduleNoticeDays: 3.1,
    preferenceMatchRate: 34,
    trainingCompletion: 61,
    avgWeeklyHoursPerEmployee: 28.2,
    openShiftsThisWeek: 5,
    overtimeHoursThisWeek: 8,
  },
  {
    name: "Bolton",
    slug: "bolton",
    manager: "Craig Melling",
    headcount: 16,
    revenuePerLabourHour: 98,
    labourCostPct: 34.6,
    complianceScore: 93,
    turnover90d: 22.8,
    scheduleNoticeDays: 3.8,
    preferenceMatchRate: 41,
    trainingCompletion: 67,
    avgWeeklyHoursPerEmployee: 32.9,
    openShiftsThisWeek: 4,
    overtimeHoursThisWeek: 28,
  },
];

// ── 3. Network benchmarks ─────────────────────────────────────

export const NETWORK_BENCHMARKS: NetworkBenchmarks = {
  avgLabourCostPct: 30.5,
  avgComplianceScore: 94,
  avgTurnover90d: 14.1,
  avgScheduleNoticeDays: 5.8,
  avgPreferenceMatchRate: 52,
  avgTrainingCompletion: 76,
  avgRevenuePerLabourHour: 118,
};

// ── 4. Network insights ───────────────────────────────────────

export const NETWORK_INSIGHTS: NetworkInsight[] = [
  {
    insight:
      "Stores giving 7+ days schedule notice have 41% lower turnover",
    confidence: "high",
    sampleSize: 823,
    appliesTo: ["Stockport", "Bolton", "Piccadilly Station"],
  },
  {
    insight:
      "Matching 60%+ of shift preferences reduces no-shows by 28%",
    confidence: "high",
    sampleSize: 641,
    appliesTo: [
      "Stockport",
      "Bolton",
      "Piccadilly Station",
      "Manchester Arndale",
    ],
  },
  {
    insight:
      "Stores with 90%+ training completion generate £14 more revenue per labour hour on average",
    confidence: "medium",
    sampleSize: 512,
    appliesTo: [
      "Stockport",
      "Bolton",
      "Piccadilly Station",
      "Manchester Arndale",
    ],
  },
  {
    insight:
      "Closing-to-opening turnarounds under 12 hours correlate with 3x higher sick leave rates",
    confidence: "high",
    sampleSize: 1104,
    appliesTo: ["Bolton"],
  },
  {
    insight:
      "Stores that use Ava for employee self-service reduce manager admin time by 6.2 hours per week",
    confidence: "medium",
    sampleSize: 287,
    appliesTo: [],
  },
];

// ── 5. Compliance alerts ──────────────────────────────────────

export const COMPLIANCE_ALERTS: ComplianceAlert[] = [
  {
    severity: "high",
    store: "Bolton",
    title: "Rest period risk",
    detail:
      "2 employees (Craig M., Aisha B.) had less than 11 hours between closing and opening shifts this week. One more occurrence triggers a formal breach.",
    recommendation:
      "Review Bolton's closing-opening rota pattern. Suggest moving Craig to mid-shifts next week.",
  },
  {
    severity: "medium",
    store: "Piccadilly Station",
    title: "Overtime threshold approaching",
    detail:
      "3 employees averaging 45+ hours over the last 4 weeks. UK limit is 48 hours averaged over 17 weeks.",
    recommendation:
      "Redistribute overtime from Piccadilly to Stockport and Bolton where capacity exists.",
  },
  {
    severity: "low",
    store: "Manchester Arndale",
    title: "Young worker schedule check",
    detail:
      "Callum Reid (17) is scheduled for a shift ending at 21:45 on Friday. UK young worker rules prohibit work after 22:00 — this is compliant but within 15 minutes of the limit.",
    recommendation:
      "Consider ending Callum's Friday shifts at 21:00 to build in a margin.",
  },
];

// ── 6. Region summary ─────────────────────────────────────────

export const REGION_SUMMARY: RegionSummary = {
  totalEmployees: 127,
  totalLabourCostPct: 28.4,
  overallComplianceScore: 97,
  overallTurnover90d: 18.3,
  scheduleFillRate: 94.2,
  totalOpenShifts: 19,
  totalOvertimeHours: 121,
  period: "Last 30 days",
};

// ── 7. Cost of turnover ───────────────────────────────────────

export const COST_OF_TURNOVER: CostOfTurnover = {
  avgRecruitmentCost: 1500,
  avgTrainingCost: 800,
  avgProductivityLossWeeks: 4,
  avgCostPerLeaver: 3200,
  note: "Based on Quinyx network average for coffee shop / QSR sector",
};
