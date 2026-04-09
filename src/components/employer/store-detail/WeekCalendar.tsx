import type { DaySchedule, OpenShift } from "@/data/store-detail-data";

interface WeekCalendarProps {
  schedule: DaySchedule[];
  openShifts: OpenShift[];
}

const shiftColour: Record<string, string> = {
  Opening: "bg-blue-100 border-blue-200 text-blue-800",
  Mid: "bg-quinyx/10 border-quinyx/20 text-quinyx",
  Closing: "bg-purple-100 border-purple-200 text-purple-800",
};

export function WeekCalendar({ schedule, openShifts }: WeekCalendarProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">This week&apos;s schedule</p>
        <div className="flex items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-blue-100 border border-blue-200" /> Opening</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-quinyx/10 border border-quinyx/20" /> Mid</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-purple-100 border border-purple-200" /> Closing</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-red-50 border border-red-200 border-dashed" /> Open</span>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-7 gap-1.5">
        {schedule.map((day) => {
          const dayOpen = openShifts.filter((o) => o.day === day.day);
          return (
            <div key={day.day} className="rounded-lg border border-gray-100 bg-gray-50/30 p-2">
              {/* Day header */}
              <div className="mb-1.5 text-center">
                <p className="text-[11px] font-semibold text-gray-700">{day.day}</p>
                <p className="text-[10px] text-gray-400">{day.date}</p>
              </div>

              {/* Shifts */}
              <div className="flex flex-col gap-1">
                {day.shifts.map((shift, i) => (
                  <div
                    key={i}
                    className={`rounded border px-1.5 py-1 ${shiftColour[shift.shiftType] ?? "bg-gray-100 text-gray-700"}`}
                  >
                    <p className="text-[10px] font-medium leading-tight truncate">
                      {shift.employee.split(" ")[0]}
                    </p>
                    <p className="text-[9px] opacity-70">{shift.startTime}–{shift.endTime}</p>
                    {shift.tags?.map((tag) => (
                      <span
                        key={tag}
                        className={`mt-0.5 inline-block rounded px-1 text-[8px] font-medium ${
                          tag.includes("Young worker") || tag.includes("limit")
                            ? "bg-amber-100 text-amber-700"
                            : "bg-quinyx/10 text-quinyx"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ))}

                {/* Open shifts */}
                {dayOpen.map((open, i) => (
                  <div
                    key={`open-${i}`}
                    className="rounded border border-dashed border-red-300 bg-red-50/50 px-1.5 py-1"
                  >
                    <p className="text-[10px] font-medium text-red-600">OPEN</p>
                    <p className="text-[9px] text-red-400">{open.startTime}–{open.endTime}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
