import type { HolidayCardData } from "@/types";

export function HolidayCard({ data }: { data: HolidayCardData }) {
  const pct = Math.round((data.remaining / data.total) * 100);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3.5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#004851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
        <span className="text-[14px] font-medium text-gray-500">Holiday balance</span>
      </div>

      {/* Remaining figure */}
      <div className="mt-2">
        <span className="text-[22px] font-bold text-gray-900">{data.remaining}</span>
        <span className="text-[14px] text-gray-400"> of {data.total} days remaining</span>
      </div>

      {/* Progress bar */}
      <div className="mt-2">
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-quinyx transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Next booked + pending */}
      <div className="mt-2.5 flex flex-col gap-1">
        {data.nextBooked && (
          <p className="text-[13px] text-gray-500">
            Next: <span className="font-medium text-gray-700">{data.nextBooked.date}</span>
            <span className="text-gray-400"> ({data.nextBooked.days} day{data.nextBooked.days !== 1 ? "s" : ""})</span>
          </p>
        )}
        {data.pendingRequests > 0 && (
          <p className="text-[13px] font-medium text-amber-600">
            {data.pendingRequests} pending request{data.pendingRequests !== 1 ? "s" : ""}
          </p>
        )}
      </div>
    </div>
  );
}
