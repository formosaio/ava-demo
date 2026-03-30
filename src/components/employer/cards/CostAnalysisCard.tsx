import type { CostAnalysisData } from "@/types";

export function CostAnalysisCard({ data }: { data: CostAnalysisData }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3">
      {/* Header */}
      <div className="flex items-center gap-1.5">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">Cost analysis</span>
      </div>

      {/* Scenario */}
      <p className="mt-2 text-[12px] font-medium leading-snug text-gray-900">{data.scenario}</p>

      {/* Cost → Saving */}
      <div className="mt-2.5 flex items-center gap-2">
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-gray-400">Current cost</span>
          <span className="text-[16px] font-bold text-red-500">{data.current_cost}</span>
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-gray-400">Projected saving</span>
          <span className="text-[16px] font-bold text-green-600">{data.projected_saving}</span>
        </div>
      </div>

      {/* Timeframe */}
      <p className="mt-2 text-[11px] text-gray-500">{data.timeframe}</p>

      {/* Assumptions */}
      {data.assumptions && (
        <p className="mt-1.5 text-[10px] leading-snug text-gray-400">{data.assumptions}</p>
      )}
    </div>
  );
}
