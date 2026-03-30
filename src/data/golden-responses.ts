import type { ParsedResponse } from "@/lib/response-parser";

// ── Golden path responses ──────────────────────────────────────
// Pre-built responses for the most likely demo questions.
// Used as fallback if the API is slow (>8s) or fails entirely.
// All data is consistent with sarah-world.ts.

export const GOLDEN_GREETING: ParsedResponse = {
  text: "Morning, Sarah! You're on the opening shift today — 06:00 to 14:00. Don't forget, you've got your latte art training session tomorrow. Also, there are a few overtime slots this week while Zara's away if you fancy the extra hours.",
  cards: [
    {
      type: "schedule",
      data: {
        date: "Monday 31 March",
        startTime: "06:00",
        endTime: "14:00",
        shiftType: "Opening",
        tasks: [
          { name: "Machine calibration" },
          { name: "Delivery check-in" },
          { name: "Morning display setup" },
        ],
      },
    },
    {
      type: "schedule",
      data: {
        date: "Tuesday 1 April",
        startTime: "06:00",
        endTime: "14:00",
        shiftType: "Opening",
        tasks: [
          { name: "Machine calibration" },
          { name: "Morning display setup" },
          { name: "Latte art training", isTraining: true },
        ],
      },
    },
  ],
  suggestions: [
    "Any overtime available?",
    "How much will I earn this month?",
    "Show my holiday balance",
  ],
};

export const GOLDEN_NEXT_SHIFT: ParsedResponse = {
  text: "Your next shift is tomorrow — an opening shift with your latte art training session. You're making great progress on that, by the way!",
  cards: [
    {
      type: "schedule",
      data: {
        date: "Tuesday 1 April",
        startTime: "06:00",
        endTime: "14:00",
        shiftType: "Opening",
        tasks: [
          { name: "Machine calibration" },
          { name: "Morning display setup" },
          { name: "Latte art training", isTraining: true },
        ],
      },
    },
  ],
  suggestions: [
    "Show the rest of this week",
    "Any overtime available?",
    "What training do I need?",
  ],
};

export const GOLDEN_SWAP: ParsedResponse = {
  text: "You don't have a Wednesday shift this week — that's your college day. But if you're looking to swap a different shift, here are a couple of colleagues who could cover. Both options are compliant with working time rules.",
  cards: [
    {
      type: "swap",
      data: {
        colleagueName: "Jamie Lewis",
        condition: "Available any day — happy to cover with no swap needed",
        isCompliant: true,
      },
    },
    {
      type: "swap",
      data: {
        colleagueName: "Marcus Chen",
        condition: "Shift supervisor — can cover any shift at short notice",
        isCompliant: true,
      },
    },
  ],
  suggestions: [
    "Can Jamie cover my Friday shift?",
    "Show my schedule this week",
    "How much will I earn this month?",
  ],
};

export const GOLDEN_PAY: ParsedResponse = {
  text: "Here's your pay estimate for April. You've worked 96 hours so far — on track for a decent month. There's also overtime available this week at 1.5x if you'd like to boost that.",
  cards: [
    {
      type: "pay",
      data: {
        estimatedPay: 1487.2,
        payDate: "28 April 2025",
        hoursWorked: 96,
        totalHours: 130,
        currency: "£",
      },
    },
    {
      type: "overtime",
      data: {
        date: "Wednesday 2 April",
        startTime: "10:00",
        endTime: "18:00",
        additionalPay: 137.28,
        rate: "1.5x",
        currency: "£",
      },
    },
  ],
  suggestions: [
    "Show all overtime this week",
    "When do I get paid?",
    "Show my holiday balance",
  ],
};

export const GOLDEN_TRAINING: ParsedResponse = {
  text: "You're doing well, Sarah! Your latte art is coming along nicely at 60% — next session is tomorrow. You've also got a food hygiene refresher due by mid-May. That one's required, so worth getting it booked in.",
  cards: [
    {
      type: "training",
      data: {
        name: "Latte art",
        type: "recommended",
        duration: "Ongoing — 60% complete",
        description:
          "Practical latte art skills. Next session: Tuesday 1 April during your opening shift.",
      },
    },
    {
      type: "training",
      data: {
        name: "Food hygiene refresher",
        type: "required",
        dueDate: "15 May 2025",
        duration: "45 minutes",
        description:
          "Annual refresher on food safety and hygiene standards. Can be completed online or during a shift.",
      },
    },
  ],
  suggestions: [
    "Book the food hygiene course",
    "What skills have I completed?",
    "When's my next shift?",
  ],
};

export const GOLDEN_HOLIDAY: ParsedResponse = {
  text: "You've got 14 days of holiday remaining this year, with a week already booked in July. No pending requests at the moment. Fancy booking some more time off?",
  cards: [
    {
      type: "holiday",
      data: {
        remaining: 14,
        total: 28,
        nextBooked: { date: "14–20 July 2025", days: 5 },
        pendingRequests: 0,
      },
    },
  ],
  suggestions: [
    "Request time off",
    "When's my next shift?",
    "How much will I earn this month?",
  ],
};

// ── Fuzzy matcher ──────────────────────────────────────────────

interface GoldenRoute {
  keywords: string[];
  response: ParsedResponse;
}

const GOLDEN_ROUTES: GoldenRoute[] = [
  {
    keywords: ["shift", "doing", "tomorrow", "next", "schedule", "rota", "work"],
    response: GOLDEN_NEXT_SHIFT,
  },
  {
    keywords: ["swap", "change", "cover", "college", "switch"],
    response: GOLDEN_SWAP,
  },
  {
    keywords: ["earn", "pay", "paid", "money", "salary", "wage"],
    response: GOLDEN_PAY,
  },
  {
    keywords: ["train", "learn", "course", "skill", "development"],
    response: GOLDEN_TRAINING,
  },
  {
    keywords: ["holiday", "time off", "annual leave", "book", "leave", "day off"],
    response: GOLDEN_HOLIDAY,
  },
];

export function matchGoldenResponse(userMessage: string): ParsedResponse | null {
  const lower = userMessage.toLowerCase();

  // Greeting / system welcome
  if (lower.includes("[system]")) {
    return GOLDEN_GREETING;
  }

  for (const route of GOLDEN_ROUTES) {
    if (route.keywords.some((kw) => lower.includes(kw))) {
      return route.response;
    }
  }

  return null;
}
