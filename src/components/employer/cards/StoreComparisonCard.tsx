import type { StoreComparisonData } from "@/types";

export function StoreComparisonCard({ data }: { data: StoreComparisonData }) {
  const values = data.stores.map((s) => Number(s.value) || 0);
  const benchmarkVal = Number(data.stores[0]?.benchmark) || 0;
  const maxVal = Math.max(...values, benchmarkVal) * 1.1;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3">
      {/* Header */}
      <div className="flex items-center gap-1.5">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="M7 16l4-8 4 4 4-6" />
        </svg>
        <span className="text-[13px] font-semibold text-gray-900">{data.metric_label}</span>
      </div>

      {/* Bars */}
      <div className="mt-2.5 flex flex-col gap-2">
        {data.stores.map((store, i) => {
          const val = Number(store.value) || 0;
          const pct = maxVal > 0 ? (val / maxVal) * 100 : 0;
          const benchPct = maxVal > 0 ? (benchmarkVal / maxVal) * 100 : 0;
          const isBelowBench = val < benchmarkVal;

          return (
            <div key={i}>
              <div className="flex items-baseline justify-between">
                <span className="text-[12px] text-gray-600">{store.name}</span>
                <span className={`text-[13px] font-semibold ${isBelowBench ? "text-amber-600" : "text-gray-900"}`}>
                  {String(store.value)}
                </span>
              </div>
              <div className="relative mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full transition-all ${isBelowBench ? "bg-amber-400" : "bg-quinyx"}`}
                  style={{ width: `${pct}%` }}
                />
                {/* Benchmark marker */}
                <div
                  className="absolute top-0 h-full w-px border-l border-dashed border-gray-400"
                  style={{ left: `${benchPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Benchmark legend */}
      <div className="mt-2 flex items-center gap-1">
        <span className="h-px w-3 border-t border-dashed border-gray-400" />
        <span className="text-[10px] text-gray-400">Network avg: {String(data.stores[0]?.benchmark ?? "")}</span>
      </div>

      {/* Insight */}
      {data.insight && (
        <p className="mt-2 text-[11px] leading-snug text-quinyx">{data.insight}</p>
      )}
    </div>
  );
}
