import type {
  EmployerCardData,
  StoreComparisonData,
  ComplianceAlertCardData,
  NetworkInsightCardData,
  CostAnalysisData,
  StaffingOverviewData,
  ActionItemData,
} from "@/types";
import { StoreComparisonCard } from "./StoreComparisonCard";
import { ComplianceAlertCard } from "./ComplianceAlertCard";
import { NetworkInsightCard } from "./NetworkInsightCard";
import { CostAnalysisCard } from "./CostAnalysisCard";
import { StaffingOverviewCard } from "./StaffingOverviewCard";
import { ActionItemCard } from "./ActionItemCard";

export function EmployerCardRenderer({ card }: { card: EmployerCardData }) {
  switch (card.type) {
    case "store_comparison":
      return <StoreComparisonCard data={card.data as unknown as StoreComparisonData} />;
    case "compliance_alert":
      return <ComplianceAlertCard data={card.data as unknown as ComplianceAlertCardData} />;
    case "network_insight":
      return <NetworkInsightCard data={card.data as unknown as NetworkInsightCardData} />;
    case "cost_analysis":
      return <CostAnalysisCard data={card.data as unknown as CostAnalysisData} />;
    case "staffing_overview":
      return <StaffingOverviewCard data={card.data as unknown as StaffingOverviewData} />;
    case "action_item":
      return <ActionItemCard data={card.data as unknown as ActionItemData} />;
    default:
      return null;
  }
}
