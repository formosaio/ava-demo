import type { NetworkInsightCardData } from "@/types";

const confidenceColor: Record<NetworkInsightCardData["confidence"], { bg: string; text: string }> = {
  high:   { bg: "bg-green-50",  text: "text-green-700" },
  medium: { bg: "bg-amber-50",  text: "text-amber-700" },
  low:    { bg: "bg-gray-100",  text: "text-gray-500" },
};

export function NetworkInsightCard({ data }: { data: NetworkInsightCardData }) {
  const badge = confidenceColor[data.confidence] ?? confidenceColor.medium;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3">
      {/* Icon + badge row */}
      <div className="flex items-center gap-1.5">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#004851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">Network intelligence</span>
      </div>

      {/* Insight text */}
      <p className="mt-2 text-[13px] font-medium leading-snug text-gray-900">
        &ldquo;{data.insight}&rdquo;
      </p>

      {/* Meta row */}
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${badge.bg} ${badge.text}`}>
          {data.confidence}
        </span>
        <span className="text-[10px] text-gray-400">
          {data.sample_size.toLocaleString()} locations
        </span>
      </div>

      {/* Affected stores */}
      {data.your_stores_affected.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {data.your_stores_affected.map((store) => (
            <span
              key={store}
              className="rounded bg-quinyx/8 px-1.5 py-0.5 text-[10px] font-medium text-quinyx"
            >
              {store}
            </span>
          ))}
        </div>
      )}

      {/* Impact */}
      {data.potential_impact && (
        <p className="mt-2 text-[11px] leading-snug text-quinyx">{data.potential_impact}</p>
      )}
    </div>
  );
}
