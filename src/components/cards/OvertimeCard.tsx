import type { OvertimeCardData } from "@/types";

export function OvertimeCard({ data }: { data: OvertimeCardData }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3.5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="text-[14px] font-medium text-gray-500">Overtime available</span>
      </div>

      {/* Date + time */}
      <div className="mt-2">
        <span className="text-[16px] font-semibold text-gray-900">{data.date}</span>
        <span className="ml-2 text-[14px] text-gray-500">{data.startTime} – {data.endTime}</span>
      </div>

      {/* Pay + rate */}
      <div className="mt-2 flex items-center gap-3">
        <span className="text-[16px] font-bold text-quinyx">
          +£{data.additionalPay.toFixed(2)}
        </span>
        <span className="rounded-full bg-teal-50 px-2 py-0.5 text-[13px] font-medium text-teal-700">
          {data.rate} rate
        </span>
      </div>
    </div>
  );
}
