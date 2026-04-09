import type { StaffingOverviewData } from "@/types";

export function StaffingOverviewCard({ data }: { data: StaffingOverviewData }) {
  const fillPct = Math.min(Math.round(data.fill_rate), 100);

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3">
      {/* Header */}
      <div className="flex items-center gap-1.5">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#004851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
        <span className="text-[13px] font-semibold text-gray-900">{data.store}</span>
      </div>

      {/* Metrics grid */}
      <div className="mt-2.5 grid grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <p className="text-[10px] text-gray-400">Open shifts</p>
          <p className={`text-[14px] font-semibold ${data.open_shifts >= 4 ? "text-amber-600" : "text-gray-900"}`}>
            {data.open_shifts}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400">Overtime hours</p>
          <p className={`text-[14px] font-semibold ${data.overtime_hours >= 25 ? "text-amber-600" : "text-gray-900"}`}>
            {data.overtime_hours}h
          </p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400">Headcount</p>
          <p className="text-[14px] font-semibold text-gray-900">{data.headcount}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-400">Fill rate</p>
          <p className={`text-[14px] font-semibold ${fillPct >= 95 ? "text-green-600" : fillPct >= 85 ? "text-amber-600" : "text-red-500"}`}>
            {data.fill_rate}%
          </p>
        </div>
      </div>

      {/* Fill rate bar */}
      <div className="mt-2">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full transition-all ${fillPct >= 95 ? "bg-green-500" : fillPct >= 85 ? "bg-amber-400" : "bg-red-400"}`}
            style={{ width: `${fillPct}%` }}
          />
        </div>
      </div>

      {/* Recommendation */}
      {data.recommendation && (
        <p className="mt-2 text-[11px] leading-snug text-quinyx">{data.recommendation}</p>
      )}
    </div>
  );
}
