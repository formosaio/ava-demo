import type { StoreData, NetworkBenchmarks } from "@/types";
import { getStoreTrend, COSTA_AVG_TREND, NETWORK_AVG_TREND } from "@/data/store-detail-data";
import { TrendChart } from "./TrendChart";

interface PerformanceTabProps {
  store: StoreData;
  benchmarks: NetworkBenchmarks;
}

export function PerformanceTab({ store, benchmarks }: PerformanceTabProps) {
  const trend = getStoreTrend(store.slug);
  if (!trend) return <p className="text-gray-400 text-[13px] p-4">No trend data available for this store.</p>;

  return (
    <div className="flex flex-col gap-6">
      {/* Revenue per labour hour */}
      <TrendChart
        storeData={trend.weeks}
        costaAvg={COSTA_AVG_TREND}
        networkAvg={NETWORK_AVG_TREND}
        metric="revenuePerHour"
        label="Revenue per labour hour (£)"
        format={(v) => `£${Math.round(v)}`}
      />

      {/* Labour cost % */}
      <TrendChart
        storeData={trend.weeks}
        costaAvg={COSTA_AVG_TREND}
        networkAvg={NETWORK_AVG_TREND}
        metric="labourCostPct"
        label="Labour cost % revenue"
        format={(v) => `${v.toFixed(1)}%`}
      />

      {/* Ava "Why" insight */}
      <div className="rounded-xl border border-quinyx/20 bg-quinyx/[0.03] p-4">
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-quinyx text-[10px] font-semibold text-white">A</div>
          <span className="text-[12px] font-semibold text-quinyx">Why this matters</span>
        </div>
        <p className="text-[13px] leading-relaxed text-gray-700">
          {store.slug === "manchester-arndale"
            ? "Arndale's revenue per labour hour dipped in W8 when schedule notice dropped to 2.1 days due to manager absence. It recovered once Rachel resumed planning. Across 823 locations, this pattern — notice drop → performance drop — has a 0.87 correlation. The good news: Rachel's now at 5.3 days and the trend is up."
            : store.revenuePerLabourHour >= benchmarks.avgRevenuePerLabourHour
              ? `${store.name} is outperforming the network average of £${benchmarks.avgRevenuePerLabourHour}/hr. The upward trend over 12 weeks suggests ${store.manager}'s scheduling practices are effective — particularly the ${store.scheduleNoticeDays}-day schedule notice, which is ${store.scheduleNoticeDays >= 7 ? "above" : "approaching"} the 7-day threshold linked to 41% lower turnover.`
              : `${store.name}'s revenue per labour hour is below the network average. The primary driver is likely schedule notice at ${store.scheduleNoticeDays} days (vs 5.8 network avg) and preference matching at ${store.preferenceMatchRate}% (vs 52% network avg). Across 823 similar locations, improving these two metrics has the highest correlation with revenue improvement.`
          }
        </p>
      </div>

      {/* Key metrics comparison */}
      <div>
        <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">Current vs benchmarks</p>
        <div className="mt-2 grid grid-cols-3 gap-3">
          {[
            { label: "Schedule notice", value: `${store.scheduleNoticeDays} days`, bench: `${benchmarks.avgScheduleNoticeDays} days`, good: store.scheduleNoticeDays >= benchmarks.avgScheduleNoticeDays },
            { label: "Preference match", value: `${store.preferenceMatchRate}%`, bench: `${benchmarks.avgPreferenceMatchRate}%`, good: store.preferenceMatchRate >= benchmarks.avgPreferenceMatchRate },
            { label: "Training completion", value: `${store.trainingCompletion}%`, bench: `${benchmarks.avgTrainingCompletion}%`, good: store.trainingCompletion >= benchmarks.avgTrainingCompletion },
          ].map((m) => (
            <div key={m.label} className="rounded-lg border border-gray-100 p-3">
              <p className="text-[10px] text-gray-400">{m.label}</p>
              <p className={`text-[18px] font-bold ${m.good ? "text-green-600" : "text-amber-600"}`}>{m.value}</p>
              <p className="text-[10px] text-gray-400">Network: {m.bench}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
