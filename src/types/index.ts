// ── Message types ──────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "ava" | "user";
  content: string;
  cards?: CardData[];
  timestamp: Date;
}

// ── Card types ─────────────────────────────────────────────────

export type CardType =
  | "schedule"
  | "pay"
  | "overtime"
  | "swap"
  | "training"
  | "holiday";

export interface CardData {
  type: CardType;
  data: Record<string, unknown>;
}

export interface ScheduleCardData {
  date: string;
  startTime: string;
  endTime: string;
  shiftType: string;
  tasks: { name: string; isTraining?: boolean }[];
}

export interface PayCardData {
  estimatedPay: number;
  payDate: string;
  hoursWorked: number;
  totalHours: number;
  currency: string;
}

export interface OvertimeCardData {
  date: string;
  startTime: string;
  endTime: string;
  additionalPay: number;
  rate: string;
  currency: string;
}

export interface SwapCardData {
  colleagueName: string;
  condition: string;
  isCompliant: boolean;
}

export interface TrainingCardData {
  name: string;
  type: "required" | "recommended" | "optional";
  dueDate?: string;
  duration: string;
  description: string;
}

export interface HolidayCardData {
  remaining: number;
  total: number;
  nextBooked?: { date: string; days: number };
  pendingRequests: number;
}

// ── Domain types ───────────────────────────────────────────────

export interface UserProfile {
  name: string;
  role: string;
  employer: string;
  location: string;
  contractType: string;
  hourlyRate: number;
  contractedHours: number;
  startDate: string;
  employeeId: string;
  lineManager: string;
  age: number;
  notes: string;
}

export interface Shift {
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  shiftType: "Opening" | "Mid" | "Closing";
  tasks: { name: string; isTraining?: boolean }[];
}

export interface Colleague {
  name: string;
  contractType: string;
  skills: string[];
  availability: string;
  restrictions?: string;
}

export interface PayData {
  currentPeriod: {
    startDate: string;
    endDate: string;
    hoursWorked: number;
    totalHours: number;
    grossPay: number;
  };
  estimatedMonthEnd: number;
  payDate: string;
  overtimeRate: { weekday: number; sunday: number };
  holidayPayRate: string;
  deductions: {
    tax: number;
    nationalInsurance: number;
    pension: number;
    studentLoan: number;
  };
  yearToDate: {
    grossPay: number;
    tax: number;
    nationalInsurance: number;
  };
}

export interface OvertimeOpportunity {
  date: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  rate: string;
  estimatedPay: number;
  reason: string;
}

export interface TrainingRecord {
  completed: string[];
  inProgress: { name: string; progress: number; nextSession: string }[];
  upcoming: { name: string; dueDate: string; required: boolean }[];
  skills: { name: string; level: "Advanced" | "Intermediate" | "Competent" | "Learning" }[];
}

export interface HolidayData {
  totalAllowance: number;
  used: number;
  booked: number;
  remaining: number;
  pendingRequests: number;
  bankHolidaysRemaining: number;
  nextBookedHoliday: {
    startDate: string;
    endDate: string;
    days: number;
  };
}

export interface ComplianceRules {
  maxWeeklyHours: number;
  minRestBetweenShifts: number;
  minWeeklyRest: number;
  maxShiftLength: number;
  breakRules: string;
  youngWorkerRules: {
    maxDailyHours: number;
    maxWeeklyHours: number;
    noNightWork: boolean;
    minRestBetweenShifts: number;
    description: string;
  };
  sundayWorking: string;
}

// ── Employer domain types ──────────────────────────────────────

export interface ManagerProfile {
  name: string;
  role: string;
  employer: string;
  region: string;
  stores: number;
  totalEmployees: number;
  directReports: number;
}

export interface StoreData {
  name: string;
  slug: string;
  manager: string;
  headcount: number;
  revenuePerLabourHour: number;
  labourCostPct: number;
  complianceScore: number;
  turnover90d: number;
  scheduleNoticeDays: number;
  preferenceMatchRate: number;
  trainingCompletion: number;
  avgWeeklyHoursPerEmployee: number;
  openShiftsThisWeek: number;
  overtimeHoursThisWeek: number;
}

export interface NetworkBenchmarks {
  avgLabourCostPct: number;
  avgComplianceScore: number;
  avgTurnover90d: number;
  avgScheduleNoticeDays: number;
  avgPreferenceMatchRate: number;
  avgTrainingCompletion: number;
  avgRevenuePerLabourHour: number;
}

export interface NetworkInsight {
  insight: string;
  confidence: "high" | "medium" | "low";
  sampleSize: number;
  appliesTo: string[];
}

export type AlertSeverity = "high" | "medium" | "low";

export interface ComplianceAlert {
  severity: AlertSeverity;
  store: string;
  title: string;
  detail: string;
  recommendation: string;
}

export interface RegionSummary {
  totalEmployees: number;
  totalLabourCostPct: number;
  overallComplianceScore: number;
  overallTurnover90d: number;
  scheduleFillRate: number;
  totalOpenShifts: number;
  totalOvertimeHours: number;
  period: string;
}

export interface CostOfTurnover {
  avgRecruitmentCost: number;
  avgTrainingCost: number;
  avgProductivityLossWeeks: number;
  avgCostPerLeaver: number;
  note: string;
}

// ── Employer card types ────────────────────────────────────────

export type EmployerCardType =
  | "store_comparison"
  | "compliance_alert"
  | "network_insight"
  | "cost_analysis"
  | "staffing_overview"
  | "action_item";

export interface EmployerCardData {
  type: EmployerCardType;
  data: Record<string, unknown>;
}

export interface StoreComparisonData {
  stores: {
    name: string;
    metric: string;
    value: number | string;
    benchmark: number | string;
  }[];
  metric_label: string;
  insight: string;
}

export interface ComplianceAlertCardData {
  severity: "high" | "medium" | "low";
  store: string;
  title: string;
  detail: string;
  recommendation: string;
}

export interface NetworkInsightCardData {
  insight: string;
  confidence: "high" | "medium" | "low";
  sample_size: number;
  your_stores_affected: string[];
  potential_impact: string;
}

export interface CostAnalysisData {
  scenario: string;
  current_cost: string;
  projected_saving: string;
  timeframe: string;
  assumptions: string;
}

export interface StaffingOverviewData {
  store: string;
  open_shifts: number;
  overtime_hours: number;
  headcount: number;
  fill_rate: number;
  recommendation: string;
}

export interface ActionItemData {
  priority: "urgent" | "important" | "suggested";
  action: string;
  store: string;
  expected_outcome: string;
  effort: "low" | "medium" | "high";
}

// ── API types ──────────────────────────────────────────────────

export interface ChatRequest {
  messages: { role: "ava" | "user"; content: string }[];
}

export interface ChatResponse {
  content: string;
  cards?: CardData[];
}

// ── Component props ────────────────────────────────────────────

export interface PhoneFrameProps {
  children: React.ReactNode;
}

export interface ChatMessageProps {
  message: ChatMessage;
}

export interface ChatInputProps {
  onSend: (message: string) => void;
  suggestions: string[];
  disabled?: boolean;
}
