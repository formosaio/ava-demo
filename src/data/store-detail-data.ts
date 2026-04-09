// ── 12-week trend data per store ───────────────────────────────
// Revenue per labour hour, weekly. Weeks 1–12 ending at demo date.

export interface WeeklyMetric {
  week: string; // e.g. "W1 (6 Jan)"
  revenuePerHour: number;
  labourCostPct: number;
  complianceScore: number;
}

export interface StoreTrend {
  slug: string;
  weeks: WeeklyMetric[];
}

const WEEK_LABELS = [
  "W1 (6 Jan)", "W2 (13 Jan)", "W3 (20 Jan)", "W4 (27 Jan)",
  "W5 (3 Feb)", "W6 (10 Feb)", "W7 (17 Feb)", "W8 (24 Feb)",
  "W9 (3 Mar)", "W10 (10 Mar)", "W11 (17 Mar)", "W12 (24 Mar)",
];

export const STORE_TRENDS: StoreTrend[] = [
  {
    slug: "trafford-centre",
    weeks: WEEK_LABELS.map((week, i) => ({
      week,
      revenuePerHour: 136 + Math.round((i * 0.5 + [0,1,2,0,-1,1,2,1,0,1,2,3][i]) * 10) / 10,
      labourCostPct: 27.2 - i * 0.09,
      complianceScore: 98 + (i > 6 ? 1 : 0),
    })),
  },
  {
    slug: "deansgate",
    weeks: WEEK_LABELS.map((week, i) => ({
      week,
      revenuePerHour: 132 + Math.round((i * 0.4 + [0,1,0,2,1,0,1,2,1,2,1,3][i]) * 10) / 10,
      labourCostPct: 28.1 - i * 0.06,
      complianceScore: 97 + (i > 8 ? 1 : 0),
    })),
  },
  {
    slug: "manchester-arndale",
    weeks: WEEK_LABELS.map((week, i) => ({
      week,
      // Dip in W8 when schedule notice dropped due to manager absence
      revenuePerHour: 122 + Math.round(([0,1,2,3,2,3,4,1,2,3,4,5][i] + i * 0.1) * 10) / 10,
      labourCostPct: 30.8 - i * 0.08,
      complianceScore: 95 + Math.min(Math.floor(i / 3), 2),
    })),
  },
  {
    slug: "piccadilly-station",
    weeks: WEEK_LABELS.map((week, i) => ({
      week,
      revenuePerHour: 114 + Math.round(([0,1,0,1,2,1,0,2,1,2,3,4][i] + i * 0.2) * 10) / 10,
      labourCostPct: 31.5 - i * 0.1,
      complianceScore: 89 + Math.min(Math.floor(i / 4), 2),
    })),
  },
  {
    slug: "stockport",
    weeks: WEEK_LABELS.map((week, i) => ({
      week,
      revenuePerHour: 100 + Math.round(([0,0,1,0,1,0,1,1,0,1,2,3][i] + i * 0.1) * 10) / 10,
      labourCostPct: 34.2 - i * 0.09,
      complianceScore: 96 + (i > 9 ? 2 : i > 5 ? 1 : 0),
    })),
  },
  {
    slug: "bolton",
    weeks: WEEK_LABELS.map((week, i) => ({
      week,
      revenuePerHour: 94 + Math.round(([0,1,0,-1,0,1,0,1,0,1,2,3][i] + i * 0.15) * 10) / 10,
      labourCostPct: 35.8 - i * 0.1,
      complianceScore: 91 + Math.min(Math.floor(i / 4), 2),
    })),
  },
];

// Costa regional average (derived from the 6 stores)
export const COSTA_AVG_TREND: WeeklyMetric[] = WEEK_LABELS.map((week, i) => {
  const allStores = STORE_TRENDS.map((s) => s.weeks[i]);
  return {
    week,
    revenuePerHour: Math.round(allStores.reduce((a, b) => a + b.revenuePerHour, 0) / 6 * 10) / 10,
    labourCostPct: Math.round(allStores.reduce((a, b) => a + b.labourCostPct, 0) / 6 * 100) / 100,
    complianceScore: Math.round(allStores.reduce((a, b) => a + b.complianceScore, 0) / 6),
  };
});

// Quinyx network average (stable baseline)
export const NETWORK_AVG_TREND: WeeklyMetric[] = WEEK_LABELS.map((week) => ({
  week,
  revenuePerHour: 118,
  labourCostPct: 30.5,
  complianceScore: 94,
}));

// ── Weekly shift schedule (Mon–Sun) ───────────────────────────
// For Manchester Arndale — matches sarah-world.ts

export interface ShiftSlot {
  employee: string;
  role: string;
  startTime: string;
  endTime: string;
  shiftType: "Opening" | "Mid" | "Closing";
  tags?: string[];
}

export interface DaySchedule {
  day: string;
  date: string;
  shifts: ShiftSlot[];
}

export const ARNDALE_WEEK_SCHEDULE: DaySchedule[] = [
  {
    day: "Mon",
    date: "31 Mar",
    shifts: [
      { employee: "Sarah Mitchell", role: "Barista", startTime: "06:00", endTime: "14:00", shiftType: "Opening" },
      { employee: "Marcus Chen", role: "Supervisor", startTime: "06:00", endTime: "14:00", shiftType: "Opening" },
      { employee: "Jamie Lewis", role: "Barista", startTime: "10:00", endTime: "18:00", shiftType: "Mid" },
      { employee: "Tom Bradley", role: "Barista", startTime: "14:00", endTime: "22:00", shiftType: "Closing" },
      { employee: "Aisha Okonkwo", role: "Barista", startTime: "06:00", endTime: "14:00", shiftType: "Opening" },
    ],
  },
  {
    day: "Tue",
    date: "1 Apr",
    shifts: [
      { employee: "Sarah Mitchell", role: "Barista", startTime: "06:00", endTime: "14:00", shiftType: "Opening", tags: ["Latte art training"] },
      { employee: "Marcus Chen", role: "Supervisor", startTime: "10:00", endTime: "18:00", shiftType: "Mid" },
      { employee: "Priya Kaur", role: "Barista", startTime: "06:00", endTime: "14:00", shiftType: "Opening" },
      { employee: "Tom Bradley", role: "Barista", startTime: "14:00", endTime: "22:00", shiftType: "Closing" },
      { employee: "Callum Reid", role: "Team Member", startTime: "16:00", endTime: "21:45", shiftType: "Closing", tags: ["Young worker"] },
    ],
  },
  {
    day: "Wed",
    date: "2 Apr",
    shifts: [
      // Sarah off — college day. Zara on leave. Gap visible.
      { employee: "Marcus Chen", role: "Supervisor", startTime: "06:00", endTime: "14:00", shiftType: "Opening" },
      { employee: "Jamie Lewis", role: "Barista", startTime: "06:00", endTime: "14:00", shiftType: "Opening" },
      { employee: "Aisha Okonkwo", role: "Barista", startTime: "06:00", endTime: "14:00", shiftType: "Opening" },
      { employee: "Tom Bradley", role: "Barista", startTime: "14:00", endTime: "22:00", shiftType: "Closing" },
      // Open shift — gap
    ],
  },
  {
    day: "Thu",
    date: "3 Apr",
    shifts: [
      { employee: "Sarah Mitchell", role: "Barista", startTime: "10:00", endTime: "18:00", shiftType: "Mid" },
      { employee: "Marcus Chen", role: "Supervisor", startTime: "06:00", endTime: "14:00", shiftType: "Opening" },
      { employee: "Priya Kaur", role: "Barista", startTime: "10:00", endTime: "18:00", shiftType: "Mid" },
      { employee: "Jamie Lewis", role: "Barista", startTime: "14:00", endTime: "22:00", shiftType: "Closing" },
      { employee: "Callum Reid", role: "Team Member", startTime: "14:00", endTime: "21:00", shiftType: "Closing", tags: ["Young worker"] },
    ],
  },
  {
    day: "Fri",
    date: "4 Apr",
    shifts: [
      { employee: "Sarah Mitchell", role: "Barista", startTime: "14:00", endTime: "22:00", shiftType: "Closing" },
      { employee: "Marcus Chen", role: "Supervisor", startTime: "06:00", endTime: "14:00", shiftType: "Opening" },
      { employee: "Aisha Okonkwo", role: "Barista", startTime: "06:00", endTime: "14:00", shiftType: "Opening" },
      { employee: "Jamie Lewis", role: "Barista", startTime: "10:00", endTime: "18:00", shiftType: "Mid" },
      { employee: "Callum Reid", role: "Team Member", startTime: "15:00", endTime: "21:45", shiftType: "Closing", tags: ["Young worker", "Near 22:00 limit"] },
    ],
  },
  {
    day: "Sat",
    date: "5 Apr",
    shifts: [
      { employee: "Sarah Mitchell", role: "Barista", startTime: "10:00", endTime: "18:00", shiftType: "Mid" },
      { employee: "Marcus Chen", role: "Supervisor", startTime: "06:00", endTime: "14:00", shiftType: "Opening" },
      { employee: "Lily Nguyen", role: "Barista", startTime: "10:00", endTime: "18:00", shiftType: "Mid" },
      { employee: "Tom Bradley", role: "Barista", startTime: "14:00", endTime: "22:00", shiftType: "Closing" },
      { employee: "Jamie Lewis", role: "Barista", startTime: "06:00", endTime: "14:00", shiftType: "Opening" },
    ],
  },
  {
    day: "Sun",
    date: "6 Apr",
    shifts: [
      { employee: "Marcus Chen", role: "Supervisor", startTime: "10:00", endTime: "16:00", shiftType: "Mid" },
      { employee: "Lily Nguyen", role: "Barista", startTime: "10:00", endTime: "16:00", shiftType: "Mid" },
      { employee: "Tom Bradley", role: "Barista", startTime: "10:00", endTime: "16:00", shiftType: "Mid" },
    ],
  },
];

// ── Open shifts (unfilled gaps) ───────────────────────────────

export interface OpenShift {
  day: string;
  date: string;
  startTime: string;
  endTime: string;
  shiftType: "Opening" | "Mid" | "Closing";
  reason: string;
}

export const ARNDALE_OPEN_SHIFTS: OpenShift[] = [
  { day: "Wed", date: "2 Apr", startTime: "10:00", endTime: "18:00", shiftType: "Mid", reason: "Zara on leave, no cover found" },
  { day: "Wed", date: "2 Apr", startTime: "14:00", endTime: "22:00", shiftType: "Closing", reason: "Zara on leave, no cover found" },
  { day: "Sun", date: "6 Apr", startTime: "14:00", endTime: "18:00", shiftType: "Mid", reason: "Below minimum staffing" },
];

// ── Action items / recommendations with status ────────────────

export type ActionStatus = "pending" | "accepted" | "in_progress" | "completed" | "dismissed";

export interface StoreAction {
  id: string;
  store: string;
  priority: "urgent" | "important" | "suggested";
  action: string;
  detail: string;
  source: string; // What insight/alert generated this
  status: ActionStatus;
  assignee?: string;
  createdDate: string;
  dueDate?: string;
  completedDate?: string;
  impact: string;
  effort: "low" | "medium" | "high";
}

export const STORE_ACTIONS: StoreAction[] = [
  // Bolton
  {
    id: "act-1",
    store: "Bolton",
    priority: "urgent",
    action: "Restructure closing-opening rota to prevent rest period breach",
    detail: "Move Craig M. to mid-shifts next week. Review Aisha B.'s rotation pattern. Ensure minimum 11-hour gap between all closing and opening shifts.",
    source: "Compliance alert: Rest period risk",
    status: "accepted",
    assignee: "Craig Melling",
    createdDate: "28 March 2025",
    dueDate: "4 April 2025",
    impact: "Avoid formal WTR breach. Network data: 3x higher sick leave with short turnarounds.",
    effort: "low",
  },
  {
    id: "act-2",
    store: "Bolton",
    priority: "important",
    action: "Increase schedule notice from 3.8 to 7+ days",
    detail: "Publish next week's rota by Wednesday at latest. Set up automated schedule generation to maintain consistency.",
    source: "Network insight: 7+ days notice → 41% lower turnover (823 locations)",
    status: "in_progress",
    assignee: "Craig Melling",
    createdDate: "24 March 2025",
    dueDate: "14 April 2025",
    impact: "Projected 41% reduction in turnover, saving ~£6,400/year.",
    effort: "medium",
  },
  // Stockport
  {
    id: "act-3",
    store: "Stockport",
    priority: "important",
    action: "Increase schedule notice from 3.1 to 7+ days",
    detail: "Current average is 3.1 days — worst in the region. Aim for 7+ days within 4 weeks.",
    source: "Network insight: 7+ days notice → 41% lower turnover (823 locations)",
    status: "pending",
    assignee: "Karen Lloyd",
    createdDate: "25 March 2025",
    dueDate: "21 April 2025",
    impact: "Projected 41% turnover reduction, saving ~£5,760/year.",
    effort: "medium",
  },
  {
    id: "act-4",
    store: "Stockport",
    priority: "suggested",
    action: "Improve shift preference matching to 60%+",
    detail: "Currently at 34% — lowest in region. Review employee availability preferences and adjust scheduling algorithm weights.",
    source: "Network insight: 60%+ match → 28% fewer no-shows (641 locations)",
    status: "pending",
    assignee: "Karen Lloyd",
    createdDate: "25 March 2025",
    impact: "28% fewer no-shows, reduced overtime costs.",
    effort: "medium",
  },
  // Piccadilly
  {
    id: "act-5",
    store: "Piccadilly Station",
    priority: "important",
    action: "Redistribute overtime to stores with capacity",
    detail: "3 employees averaging 45+ hours. Shift 12+ overtime hours per week to Stockport and Bolton where capacity exists.",
    source: "Compliance alert: Overtime threshold approaching",
    status: "in_progress",
    assignee: "Ali Rashid",
    createdDate: "26 March 2025",
    dueDate: "7 April 2025",
    impact: "Avoid 48-hour breach. Reduces fatigue-related errors.",
    effort: "low",
  },
  // Manchester Arndale
  {
    id: "act-6",
    store: "Manchester Arndale",
    priority: "suggested",
    action: "End Callum Reid's Friday shifts at 21:00 instead of 21:45",
    detail: "Currently compliant but within 15 minutes of the 22:00 young worker limit. Build in a safety margin.",
    source: "Compliance alert: Young worker schedule check",
    status: "completed",
    assignee: "Rachel Torres",
    createdDate: "20 March 2025",
    completedDate: "27 March 2025",
    impact: "Eliminates risk of young worker violation.",
    effort: "low",
  },
  {
    id: "act-7",
    store: "Manchester Arndale",
    priority: "important",
    action: "Increase schedule notice from 5.3 to 7+ days",
    detail: "Rachel is improving — was 4.1 days two months ago, now 5.3. Target 7+ days to match Trafford's pattern.",
    source: "Network insight: 7+ days notice → 41% lower turnover (823 locations)",
    status: "in_progress",
    assignee: "Rachel Torres",
    createdDate: "15 March 2025",
    dueDate: "15 April 2025",
    impact: "Could reduce turnover from 19.4% towards network average of 14.1%.",
    effort: "medium",
  },
  // Trafford — positive example
  {
    id: "act-8",
    store: "Trafford Centre",
    priority: "suggested",
    action: "Share schedule planning playbook with other stores",
    detail: "Sophie's 8.1-day average notice is the region's best. Document her process for Karen (Stockport) and Craig (Bolton).",
    source: "Network insight: best practice sharing",
    status: "accepted",
    assignee: "Sophie Barnes",
    createdDate: "22 March 2025",
    dueDate: "11 April 2025",
    impact: "Could lift other stores towards Trafford's turnover rate of 11.2%.",
    effort: "low",
  },
];

// ── Helpers ───────────────────────────────────────────────────

export function getStoreTrend(slug: string): StoreTrend | undefined {
  return STORE_TRENDS.find((s) => s.slug === slug);
}

export function getStoreActions(storeName: string): StoreAction[] {
  return STORE_ACTIONS.filter((a) => a.store === storeName);
}

export function getRegionActionsSummary() {
  const all = STORE_ACTIONS;
  return {
    total: all.length,
    pending: all.filter((a) => a.status === "pending").length,
    accepted: all.filter((a) => a.status === "accepted").length,
    inProgress: all.filter((a) => a.status === "in_progress").length,
    completed: all.filter((a) => a.status === "completed").length,
    dismissed: all.filter((a) => a.status === "dismissed").length,
  };
}
