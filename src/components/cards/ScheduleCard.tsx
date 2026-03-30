import type { ScheduleCardData } from "@/types";

export function ScheduleCard({ data }: { data: ScheduleCardData }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3.5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        <span className="text-[16px] font-semibold text-gray-900">{data.date}</span>
      </div>

      {/* Time + shift type */}
      <div className="mt-2 flex items-center gap-3">
        <span className="text-[14px] font-medium text-gray-700">
          {data.startTime} – {data.endTime}
        </span>
        <span className="text-[13px] text-gray-400">·</span>
        <span className="text-[13px] text-gray-500">{data.shiftType}</span>
      </div>

      {/* Task pills */}
      {data.tasks.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {data.tasks.map((task) => (
            <span
              key={task.name}
              className={`rounded-full px-2.5 py-1 text-[13px] font-medium ${
                task.isTraining
                  ? "bg-amber-50 text-amber-700"
                  : "bg-teal-50 text-teal-700"
              }`}
            >
              {task.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
