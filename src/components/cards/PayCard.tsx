import type { PayCardData } from "@/types";

export function PayCard({ data }: { data: PayCardData }) {
  const pct = Math.round((data.hoursWorked / data.totalHours) * 100);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3.5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#004851" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
        <span className="text-[14px] font-medium text-gray-500">This month&apos;s pay estimate</span>
      </div>

      {/* Big pay figure */}
      <div className="mt-2">
        <span className="text-[28px] font-bold leading-none text-gray-900">
          £{data.estimatedPay.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>

      {/* Pay date */}
      <p className="mt-1 text-[13px] text-gray-400">Paid on {data.payDate}</p>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-quinyx transition-all duration-500"
            style={{ width: `${Math.min(pct, 100)}%` }}
          />
        </div>
        <p className="mt-1 text-[13px] text-gray-400">
          {data.hoursWorked} of {data.totalHours} hrs ({pct}%)
        </p>
      </div>
    </div>
  );
}
