import type {
  UserProfile,
  Shift,
  Colleague,
  PayData,
  OvertimeOpportunity,
  TrainingRecord,
  HolidayData,
  ComplianceRules,
} from "@/types";

// ── Fixed demo date ────────────────────────────────────────────
// Everything is anchored to Monday 31 March 2025 so the demo is
// deterministic regardless of when it is actually presented.

export const DEMO_DATE = "2025-03-31";

export function getFormattedDate(): string {
  return "Monday 31 March 2025";
}

// ── 1. Sarah's profile ────────────────────────────────────────

export const SARAH_PROFILE: UserProfile = {
  name: "Sarah Mitchell",
  role: "Barista",
  employer: "Costa Coffee",
  location: "Manchester Arndale",
  contractType: "Part-time",
  hourlyRate: 11.44,
  contractedHours: 30,
  startDate: "2024-03-15",
  employeeId: "CM-4472",
  lineManager: "Rachel Torres",
  age: 22,
  notes:
    "Part-time student at Manchester Metropolitan University, studying Business Management. Classes on Wednesdays.",
};

// ── 2. Schedule (4 weeks from 31 Mar 2025) ────────────────────

export const SCHEDULE: Shift[] = [
  // ── Week 1: 31 Mar – 6 Apr ──────────────────────────────────
  {
    date: "Monday 31 March",
    dayOfWeek: "Monday",
    startTime: "06:00",
    endTime: "14:00",
    shiftType: "Opening",
    tasks: [
      { name: "Machine calibration" },
      { name: "Delivery check-in" },
      { name: "Morning display setup" },
    ],
  },
  {
    date: "Tuesday 1 April",
    dayOfWeek: "Tuesday",
    startTime: "06:00",
    endTime: "14:00",
    shiftType: "Opening",
    tasks: [
      { name: "Machine calibration" },
      { name: "Morning display setup" },
      { name: "Latte art training", isTraining: true },
    ],
  },
  // Wednesday 2 April — no shift (college day)
  {
    date: "Thursday 3 April",
    dayOfWeek: "Thursday",
    startTime: "10:00",
    endTime: "18:00",
    shiftType: "Mid",
    tasks: [
      { name: "Peak hour support" },
      { name: "Stock rotation" },
    ],
  },
  {
    date: "Friday 4 April",
    dayOfWeek: "Friday",
    startTime: "14:00",
    endTime: "22:00",
    shiftType: "Closing",
    tasks: [
      { name: "Deep clean" },
      { name: "Cash reconciliation" },
      { name: "Closing checklist" },
    ],
  },
  {
    date: "Saturday 5 April",
    dayOfWeek: "Saturday",
    startTime: "10:00",
    endTime: "18:00",
    shiftType: "Mid",
    tasks: [
      { name: "Peak hour support" },
      { name: "Customer training shadow" },
      { name: "Stock rotation" },
    ],
  },

  // ── Week 2: 7 Apr – 13 Apr ─────────────────────────────────
  {
    date: "Monday 7 April",
    dayOfWeek: "Monday",
    startTime: "06:00",
    endTime: "14:00",
    shiftType: "Opening",
    tasks: [
      { name: "Machine calibration" },
      { name: "Delivery check-in" },
      { name: "Morning display setup" },
    ],
  },
  {
    date: "Tuesday 8 April",
    dayOfWeek: "Tuesday",
    startTime: "10:00",
    endTime: "18:00",
    shiftType: "Mid",
    tasks: [
      { name: "Peak hour support" },
      { name: "Food hygiene refresher", isTraining: true },
    ],
  },
  // Wednesday 9 April — no shift (college day)
  {
    date: "Thursday 10 April",
    dayOfWeek: "Thursday",
    startTime: "14:00",
    endTime: "22:00",
    shiftType: "Closing",
    tasks: [
      { name: "Deep clean" },
      { name: "Closing checklist" },
    ],
  },
  {
    date: "Friday 11 April",
    dayOfWeek: "Friday",
    startTime: "06:00",
    endTime: "14:00",
    shiftType: "Opening",
    tasks: [
      { name: "Machine calibration" },
      { name: "Delivery check-in" },
    ],
  },
  {
    date: "Saturday 12 April",
    dayOfWeek: "Saturday",
    startTime: "10:00",
    endTime: "18:00",
    shiftType: "Mid",
    tasks: [
      { name: "Peak hour support" },
      { name: "Stock rotation" },
      { name: "Customer training shadow" },
    ],
  },

  // ── Week 3: 14 Apr – 20 Apr ─────────────────────────────────
  {
    date: "Monday 14 April",
    dayOfWeek: "Monday",
    startTime: "10:00",
    endTime: "18:00",
    shiftType: "Mid",
    tasks: [
      { name: "Peak hour support" },
      { name: "Stock rotation" },
    ],
  },
  {
    date: "Tuesday 15 April",
    dayOfWeek: "Tuesday",
    startTime: "06:00",
    endTime: "14:00",
    shiftType: "Opening",
    tasks: [
      { name: "Machine calibration" },
      { name: "Morning display setup" },
    ],
  },
  // Wednesday 16 April — no shift (college day)
  {
    date: "Thursday 17 April",
    dayOfWeek: "Thursday",
    startTime: "10:00",
    endTime: "18:00",
    shiftType: "Mid",
    tasks: [
      { name: "Peak hour support" },
      { name: "Stock rotation" },
      { name: "New menu items prep" },
    ],
  },
  {
    date: "Friday 18 April",
    dayOfWeek: "Friday",
    startTime: "14:00",
    endTime: "22:00",
    shiftType: "Closing",
    tasks: [
      { name: "Deep clean" },
      { name: "Cash reconciliation" },
      { name: "Closing checklist" },
    ],
  },
  {
    date: "Sunday 20 April",
    dayOfWeek: "Sunday",
    startTime: "10:00",
    endTime: "16:00",
    shiftType: "Mid",
    tasks: [
      { name: "Peak hour support" },
      { name: "Stock rotation" },
    ],
  },

  // ── Week 4: 21 Apr – 27 Apr ─────────────────────────────────
  {
    date: "Monday 21 April",
    dayOfWeek: "Monday",
    startTime: "06:00",
    endTime: "14:00",
    shiftType: "Opening",
    tasks: [
      { name: "Machine calibration" },
      { name: "Delivery check-in" },
      { name: "Morning display setup" },
    ],
  },
  {
    date: "Tuesday 22 April",
    dayOfWeek: "Tuesday",
    startTime: "14:00",
    endTime: "22:00",
    shiftType: "Closing",
    tasks: [
      { name: "Deep clean" },
      { name: "Cash reconciliation" },
      { name: "Closing checklist" },
    ],
  },
  // Wednesday 23 April — no shift (college day)
  {
    date: "Thursday 24 April",
    dayOfWeek: "Thursday",
    startTime: "06:00",
    endTime: "14:00",
    shiftType: "Opening",
    tasks: [
      { name: "Machine calibration" },
      { name: "Delivery check-in" },
    ],
  },
  {
    date: "Friday 25 April",
    dayOfWeek: "Friday",
    startTime: "10:00",
    endTime: "18:00",
    shiftType: "Mid",
    tasks: [
      { name: "Peak hour support" },
      { name: "Stock rotation" },
    ],
  },
  {
    date: "Saturday 26 April",
    dayOfWeek: "Saturday",
    startTime: "10:00",
    endTime: "18:00",
    shiftType: "Mid",
    tasks: [
      { name: "Peak hour support" },
      { name: "Customer training shadow" },
    ],
  },
];

// ── 3. Colleagues ─────────────────────────────────────────────

export const COLLEAGUES: Colleague[] = [
  {
    name: "Jamie Lewis",
    contractType: "Full-time",
    skills: ["Espresso", "Latte art", "Till", "Opening procedures", "Closing procedures"],
    availability: "Flexible — available all days, any shift pattern",
  },
  {
    name: "Priya Kaur",
    contractType: "Part-time",
    skills: ["Espresso", "Till", "Customer service"],
    availability: "Mon, Tue, Thu, Fri — mornings and mid shifts only. University on Wed and weekends.",
    restrictions: "Cannot work Wednesdays or weekends (university schedule)",
  },
  {
    name: "Marcus Chen",
    contractType: "Full-time",
    skills: ["Espresso", "Latte art", "Till", "Opening procedures", "Closing procedures", "Stock management", "Team training"],
    availability: "Shift supervisor — can cover any shift on any day",
  },
  {
    name: "Aisha Okonkwo",
    contractType: "Part-time",
    skills: ["Espresso", "Till", "Morning display setup"],
    availability: "Mon–Fri mornings only (06:00–14:00)",
    restrictions: "Mornings only due to childcare commitments. Cannot work past 14:00 or weekends.",
  },
  {
    name: "Tom Bradley",
    contractType: "Full-time",
    skills: ["Espresso", "Till", "Deep clean", "Closing procedures", "Cash reconciliation"],
    availability: "Prefers closing shifts (14:00–22:00). Available all days.",
  },
  {
    name: "Lily Nguyen",
    contractType: "Part-time",
    skills: ["Espresso", "Till", "Customer service"],
    availability: "Weekends only — Saturday and Sunday, any shift",
    restrictions: "Not available Mon–Fri (other employment)",
  },
  {
    name: "Callum Reid",
    contractType: "Part-time",
    skills: ["Till", "Customer service", "Stock rotation"],
    availability: "Available after school hours and weekends",
    restrictions:
      "Age 17 — UK young worker rules apply: max 8 hours/day, max 40 hours/week, no shifts after 22:00 or before 06:00, minimum 12 hours rest between shifts.",
  },
  {
    name: "Zara Hussain",
    contractType: "Full-time",
    skills: ["Espresso", "Latte art", "Till", "Opening procedures", "Closing procedures", "Stock management"],
    availability: "Normally flexible — available all days, any shift",
    restrictions: "On annual leave 31 March – 6 April 2025",
  },
];

// ── 4. Pay data ───────────────────────────────────────────────

export const PAY_DATA: PayData = {
  currentPeriod: {
    startDate: "1 April 2025",
    endDate: "30 April 2025",
    hoursWorked: 96,
    totalHours: 130,
    grossPay: 1098.24,
  },
  estimatedMonthEnd: 1487.20,
  payDate: "28 April 2025",
  overtimeRate: { weekday: 1.5, sunday: 2.0 },
  holidayPayRate: "Normal rate",
  deductions: {
    tax: 89.4,
    nationalInsurance: 62.15,
    pension: 37.42,
    studentLoan: 0,
  },
  yearToDate: {
    grossPay: 8421.6,
    tax: 536.4,
    nationalInsurance: 372.9,
  },
};

// ── 5. Overtime opportunities ─────────────────────────────────

export const OVERTIME_OPPORTUNITIES: OvertimeOpportunity[] = [
  {
    date: "Wednesday 2 April",
    dayOfWeek: "Wednesday",
    startTime: "10:00",
    endTime: "18:00",
    rate: "1.5x",
    estimatedPay: 137.28,
    reason: "Zara on annual leave — extra cover needed",
  },
  {
    date: "Saturday 5 April",
    dayOfWeek: "Saturday",
    startTime: "14:00",
    endTime: "22:00",
    rate: "1.5x",
    estimatedPay: 137.28,
    reason: "Zara on annual leave — closing cover needed",
  },
  {
    date: "Sunday 6 April",
    dayOfWeek: "Sunday",
    startTime: "10:00",
    endTime: "16:00",
    rate: "2x",
    estimatedPay: 137.28,
    reason: "Bank holiday weekend — premium rate available",
  },
];

// ── 6. Training record ────────────────────────────────────────

export const TRAINING_RECORD: TrainingRecord = {
  completed: [
    "Barista basics",
    "Till operation",
    "Health & safety induction",
    "Allergen awareness",
  ],
  inProgress: [
    {
      name: "Latte art",
      progress: 60,
      nextSession: "Tuesday 1 April",
    },
  ],
  upcoming: [
    {
      name: "Food hygiene refresher",
      dueDate: "15 May 2025",
      required: true,
    },
  ],
  skills: [
    { name: "Espresso", level: "Advanced" },
    { name: "Till", level: "Intermediate" },
    { name: "Opening procedures", level: "Competent" },
    { name: "Latte art", level: "Learning" },
  ],
};

// ── 7. Holiday data ───────────────────────────────────────────

export const HOLIDAY_DATA: HolidayData = {
  totalAllowance: 28,
  used: 8,
  booked: 6,
  remaining: 14,
  pendingRequests: 0,
  bankHolidaysRemaining: 3,
  nextBookedHoliday: {
    startDate: "14 July 2025",
    endDate: "20 July 2025",
    days: 5,
  },
};

// ── 8. Compliance rules ───────────────────────────────────────

export const COMPLIANCE_RULES: ComplianceRules = {
  maxWeeklyHours: 48,
  minRestBetweenShifts: 11,
  minWeeklyRest: 24,
  maxShiftLength: 13,
  breakRules: "20 minute break if shift is longer than 6 hours",
  youngWorkerRules: {
    maxDailyHours: 8,
    maxWeeklyHours: 40,
    noNightWork: true,
    minRestBetweenShifts: 12,
    description:
      "Callum (age 17) has enhanced protections under UK young worker regulations. No work between 22:00 and 06:00, maximum 8-hour shifts, 12 hours minimum rest between shifts.",
  },
  sundayWorking:
    "Voluntary, with 1 month opt-out notice. Premium rate at employer discretion.",
};

// ── Suggestion chips ──────────────────────────────────────────

export const SUGGESTION_CHIPS: string[] = [
  "When's my next shift?",
  "How much will I earn this month?",
  "Any overtime available?",
  "Show my holiday balance",
];
