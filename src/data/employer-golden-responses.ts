import type { EmployerParsedResponse } from "@/lib/employer-response-parser";

// ── Golden path responses for the employer demo ────────────────
// All data consistent with james-world.ts.

export const GOLDEN_BRIEFING: EmployerParsedResponse = {
  text: "Morning, James. Two things need your attention today: Bolton has a rest-period risk — one more occurrence triggers a formal breach. And Stockport's turnover is still running at 24%, nearly double the network average. On the bright side, Trafford and Deansgate are both outperforming the network on revenue per labour hour.",
  cards: [
    {
      type: "compliance_alert",
      data: {
        severity: "high",
        store: "Bolton",
        title: "Rest period risk",
        detail: "2 employees (Craig M., Aisha B.) had less than 11 hours between closing and opening shifts this week. One more occurrence triggers a formal breach.",
        recommendation: "Review Bolton's closing-opening rota pattern. Suggest moving Craig to mid-shifts next week.",
      },
    },
    {
      type: "network_insight",
      data: {
        insight: "Stores giving 7+ days schedule notice have 41% lower turnover",
        confidence: "high",
        sample_size: 823,
        your_stores_affected: ["Stockport", "Bolton", "Piccadilly Station"],
        potential_impact: "Stockport gives just 3.1 days notice vs 8.1 at Trafford — this is likely a major driver of their turnover gap.",
      },
    },
  ],
  suggestions: [
    "Tell me more about Bolton",
    "Why is Stockport struggling?",
    "What would fixing turnover save?",
  ],
  dashboardHighlight: "bolton",
};

export const GOLDEN_STOCKPORT: EmployerParsedResponse = {
  text: "Stockport is underperforming on three correlated metrics: schedule notice (3.1 days vs Trafford's 8.1), preference matching (34% vs 72%), and training completion (61% vs 94%). Across 823 similar locations, each of these individually correlates with higher turnover — Stockport has all three working against it.",
  cards: [
    {
      type: "store_comparison",
      data: {
        stores: [
          { name: "Trafford Centre", metric: "schedule_notice", value: "8.1 days", benchmark: "5.8 days" },
          { name: "Stockport", metric: "schedule_notice", value: "3.1 days", benchmark: "5.8 days" },
        ],
        metric_label: "Schedule notice (days)",
        insight: "Trafford gives 2.6x more notice than Stockport. Network data shows 7+ days correlates with 41% lower turnover.",
      },
    },
    {
      type: "store_comparison",
      data: {
        stores: [
          { name: "Trafford Centre", metric: "preference_match", value: "72%", benchmark: "52%" },
          { name: "Stockport", metric: "preference_match", value: "34%", benchmark: "52%" },
        ],
        metric_label: "Shift preference match rate",
        insight: "Only 34% of Stockport staff get their preferred shifts. Across 641 locations, 60%+ match rate reduces no-shows by 28%.",
      },
    },
    {
      type: "cost_analysis",
      data: {
        scenario: "Reduce Stockport turnover from 24.1% to network avg (14.1%)",
        current_cost: "~£13,800/yr",
        projected_saving: "~£5,760/yr",
        timeframe: "6–9 months to see full effect",
        assumptions: "Based on 18 staff, ~4.3 leavers/yr at current rate, £3,200 avg cost per leaver (Quinyx network data).",
      },
    },
  ],
  suggestions: [
    "What would it take to fix this?",
    "Show me Trafford's approach",
    "How does Bolton compare?",
  ],
  dashboardHighlight: "stockport",
};

export const GOLDEN_ROI: EmployerParsedResponse = {
  text: "If you brought Stockport and Bolton's turnover down to the network average of 14.1%, you'd save roughly £12,160 per year in recruitment and training costs alone — and that's before factoring in productivity gains and reduced overtime from better staffing stability.",
  cards: [
    {
      type: "cost_analysis",
      data: {
        scenario: "Reduce turnover at Stockport + Bolton to network average (14.1%)",
        current_cost: "~£24,000/yr combined",
        projected_saving: "~£12,160/yr",
        timeframe: "6–12 months with consistent action",
        assumptions: "Stockport: 18 staff, 24.1% → 14.1% = ~1.8 fewer leavers/yr (£5,760). Bolton: 16 staff, 22.8% → 14.1% = ~1.4 fewer leavers/yr (£6,400). £3,200/leaver.",
      },
    },
    {
      type: "action_item",
      data: {
        priority: "urgent",
        action: "Fix Bolton's closing-opening rota to prevent rest period breach",
        store: "Bolton",
        expected_outcome: "Avoid formal breach, reduce sick leave (network data: 3x higher with short turnarounds)",
        effort: "low",
      },
    },
    {
      type: "action_item",
      data: {
        priority: "important",
        action: "Increase schedule notice at Stockport from 3.1 to 7+ days",
        store: "Stockport",
        expected_outcome: "Network data predicts 41% lower turnover — could save ~£5,760/yr",
        effort: "medium",
      },
    },
    {
      type: "action_item",
      data: {
        priority: "suggested",
        action: "Improve shift preference matching at both stores to 60%+",
        store: "Stockport & Bolton",
        expected_outcome: "28% fewer no-shows based on 641-location study",
        effort: "medium",
      },
    },
  ],
  suggestions: [
    "Prioritise actions for me",
    "What's the quickest win?",
    "Show compliance risks",
  ],
  dashboardHighlight: null,
};

export const GOLDEN_COMPLIANCE: EmployerParsedResponse = {
  text: "You have three active alerts. The most urgent is Bolton's rest-period issue — Craig and Aisha both had under 11 hours between shifts, and one more occurrence triggers a formal breach. Piccadilly's overtime is also creeping up, and there's a scheduling margin issue with a young worker at Arndale. The pattern at Bolton is a rota design problem, not a one-off.",
  cards: [
    {
      type: "compliance_alert",
      data: {
        severity: "high",
        store: "Bolton",
        title: "Rest period risk",
        detail: "2 employees (Craig M., Aisha B.) had less than 11 hours between closing and opening shifts this week. One more occurrence triggers a formal breach.",
        recommendation: "Review Bolton's closing-opening rota pattern. Suggest moving Craig to mid-shifts next week.",
      },
    },
    {
      type: "compliance_alert",
      data: {
        severity: "medium",
        store: "Piccadilly Station",
        title: "Overtime threshold approaching",
        detail: "3 employees averaging 45+ hours over the last 4 weeks. UK limit is 48 hours averaged over 17 weeks.",
        recommendation: "Redistribute overtime from Piccadilly to Stockport and Bolton where capacity exists.",
      },
    },
    {
      type: "compliance_alert",
      data: {
        severity: "low",
        store: "Manchester Arndale",
        title: "Young worker schedule check",
        detail: "Callum Reid (17) is scheduled for a shift ending at 21:45 on Friday. UK young worker rules prohibit work after 22:00 — compliant but within 15 minutes of the limit.",
        recommendation: "Consider ending Callum's Friday shifts at 21:00 to build in a margin.",
      },
    },
    {
      type: "action_item",
      data: {
        priority: "urgent",
        action: "Review and restructure Bolton's closing-opening rota immediately",
        store: "Bolton",
        expected_outcome: "Prevent formal WTR breach and reduce associated sick leave risk (3x higher with short turnarounds per network data)",
        effort: "low",
      },
    },
  ],
  suggestions: [
    "Fix Bolton's rota problem",
    "How does this compare to network?",
    "What's the cost of a breach?",
  ],
  dashboardHighlight: "bolton",
};

export const GOLDEN_BENCHMARK: EmployerParsedResponse = {
  text: "Overall, your region is running at 28.4% labour cost — 2.1 points below the network average of 30.5%, which is strong. Trafford and Deansgate are your stars, both well above network on revenue per labour hour. The gap is at the bottom: Stockport (£104) and Bolton (£98) are pulling your average down, and both are below the £118 network benchmark.",
  cards: [
    {
      type: "store_comparison",
      data: {
        stores: [
          { name: "Trafford Centre", metric: "revenue_per_labour_hour", value: "£142", benchmark: "£118" },
          { name: "Deansgate", metric: "revenue_per_labour_hour", value: "£138", benchmark: "£118" },
          { name: "Manchester Arndale", metric: "revenue_per_labour_hour", value: "£127", benchmark: "£118" },
          { name: "Piccadilly Station", metric: "revenue_per_labour_hour", value: "£119", benchmark: "£118" },
          { name: "Stockport", metric: "revenue_per_labour_hour", value: "£104", benchmark: "£118" },
          { name: "Bolton", metric: "revenue_per_labour_hour", value: "£98", benchmark: "£118" },
        ],
        metric_label: "Revenue per labour hour (£)",
        insight: "4 of 6 stores are at or above network average. Closing the gap at Stockport and Bolton would lift your regional average by ~£8/hr.",
      },
    },
    {
      type: "network_insight",
      data: {
        insight: "Stores with 90%+ training completion generate £14 more revenue per labour hour on average",
        confidence: "medium",
        sample_size: 512,
        your_stores_affected: ["Stockport", "Bolton", "Piccadilly Station", "Manchester Arndale"],
        potential_impact: "Your bottom 4 stores are all below 90% training completion — this is likely suppressing their revenue performance.",
      },
    },
  ],
  suggestions: [
    "Why is Trafford so good?",
    "What can we learn from the network?",
    "Focus on worst performers",
  ],
  dashboardHighlight: null,
};

export const GOLDEN_ARNDALE: EmployerParsedResponse = {
  text: "Manchester Arndale is your mid-table store — decent compliance but the highest turnover in the region after Stockport. Rachel Torres manages a team of 22, with a mix of full-time, part-time, and student workers like Sarah Mitchell. The schedule notice is improving but still below where Trafford operates. Want me to show you what's driving the gap, or would you like to see what Sarah's experience actually looks like?",
  cards: [
    {
      type: "staffing_overview",
      data: {
        store: "Manchester Arndale",
        open_shifts: 3,
        overtime_hours: 24,
        headcount: 22,
        fill_rate: 94.2,
        recommendation: "Schedule notice at 5.3 days is improving but still 2.8 days behind Trafford. Preference match rate of 51% is below the 60% threshold linked to lower no-shows.",
      },
    },
  ],
  suggestions: [
    "What's driving Arndale's turnover?",
    "Show me Sarah's experience",
    "Compare Arndale to Trafford",
  ],
  dashboardHighlight: "manchester-arndale",
};

// ── Fuzzy matcher ──────────────────────────────────────────────

interface GoldenRoute {
  keywords: string[];
  response: EmployerParsedResponse;
}

const GOLDEN_ROUTES: GoldenRoute[] = [
  {
    keywords: ["arndale", "sarah", "drill into arndale", "tell me about arndale", "rachel torres"],
    response: GOLDEN_ARNDALE,
  },
  {
    keywords: ["stockport", "struggling", "underperform", "why is", "compared to trafford"],
    response: GOLDEN_STOCKPORT,
  },
  {
    keywords: ["save", "cost", "roi", "worth", "invest", "fixing turnover", "fixing this"],
    response: GOLDEN_ROI,
  },
  {
    keywords: ["compliance", "risk", "alert", "breach", "violation", "rest period"],
    response: GOLDEN_COMPLIANCE,
  },
  {
    keywords: ["network", "benchmark", "compare", "average", "how are we doing"],
    response: GOLDEN_BENCHMARK,
  },
];

export function matchEmployerGoldenResponse(
  userMessage: string
): EmployerParsedResponse | null {
  const lower = userMessage.toLowerCase();

  if (lower.includes("[system]")) {
    return GOLDEN_BRIEFING;
  }

  for (const route of GOLDEN_ROUTES) {
    if (route.keywords.some((kw) => lower.includes(kw))) {
      return route.response;
    }
  }

  return null;
}

// ── Guided demo flow ───────────────────────────────────────────

export const GUIDED_STEPS: string[][] = [
  // Step 0 — after welcome
  [
    "Why is Stockport struggling compared to Trafford?",
    "Tell me about Bolton's compliance risk",
    "How are we doing vs the network?",
  ],
  // Step 1 — after Stockport deep-dive
  [
    "What would fixing this save me?",
    "Show me Trafford's approach",
    "Show compliance risks",
  ],
  // Step 2 — after ROI
  [
    "Show me the compliance risks",
    "How are we doing vs the network?",
    "Prioritise actions for me",
  ],
  // Step 3 — after compliance
  [
    "How are we doing compared to the network?",
    "What's the quickest win?",
    "What would fixing turnover save?",
  ],
  // Step 4 — after benchmark
  [
    "Why is Trafford so good?",
    "Focus on worst performers",
    "What should I do first?",
  ],
];
