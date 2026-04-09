import type { StoreData } from "@/types";
import { ARNDALE_WEEK_SCHEDULE, ARNDALE_OPEN_SHIFTS } from "@/data/store-detail-data";
import { WeekCalendar } from "./WeekCalendar";

interface TeamTabProps {
  store: StoreData;
  employees: TeamEmployee[];
}

export interface TeamEmployee {
  name: string;
  role: string;
  contractType: string;
  hoursThisPeriod: number;
  totalHours: number;
  complianceOk: boolean;
  highlight?: string;
  skills?: string[];
}

export function TeamTab({ store, employees }: TeamTabProps) {
  const isArndale = store.slug === "manchester-arndale";

  return (
    <div className="flex flex-col gap-6">
      {/* Week calendar — only Arndale has real schedule data */}
      {isArndale ? (
        <WeekCalendar schedule={ARNDALE_WEEK_SCHEDULE} openShifts={ARNDALE_OPEN_SHIFTS} />
      ) : (
        <div className="rounded-lg border border-gray-100 bg-gray-50/30 p-6 text-center">
          <p className="text-[13px] text-gray-400">Weekly schedule view available in full product</p>
        </div>
      )}

      {/* Team roster */}
      <div>
        <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">
          Team ({employees.length} of {store.headcount})
        </p>
        <div className="mt-2 overflow-hidden rounded-lg border border-gray-100">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70">
                <th className="py-2.5 pl-4 pr-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Name</th>
                <th className="px-2 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Role</th>
                <th className="px-2 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Contract</th>
                <th className="px-2 py-2.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wide text-right">Hours</th>
                <th className="py-2.5 pl-2 pr-4 text-[11px] font-semibold text-gray-400 uppercase tracking-wide text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, i) => {
                const isSarah = emp.name === "Sarah Mitchell";
                return (
                  <tr
                    key={i}
                    className={`border-b border-gray-50 last:border-0 ${isSarah ? "bg-quinyx/[0.03]" : ""}`}
                  >
                    <td className="py-2.5 pl-4 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-medium text-gray-900">{emp.name}</span>
                        {isSarah && (
                          <span className="rounded bg-quinyx/10 px-1.5 py-0.5 text-[9px] font-medium text-quinyx">
                            Employee demo
                          </span>
                        )}
                      </div>
                      {emp.highlight ? (
                        <p className={`mt-0.5 text-[11px] ${emp.complianceOk ? "text-quinyx" : "text-amber-600"}`}>
                          {emp.highlight}
                        </p>
                      ) : null}
                      {emp.skills ? (
                        <div className="mt-0.5 flex flex-wrap gap-1">
                          {emp.skills.map((s) => (
                            <span key={s} className="rounded bg-gray-100 px-1.5 py-0.5 text-[9px] text-gray-500">{s}</span>
                          ))}
                        </div>
                      ) : null}
                    </td>
                    <td className="px-2 py-2.5 text-[12px] text-gray-600">{emp.role}</td>
                    <td className="px-2 py-2.5 text-[12px] text-gray-500">{emp.contractType}</td>
                    <td className="px-2 py-2.5 text-right text-[13px] font-medium tabular-nums text-gray-700">
                      {emp.hoursThisPeriod}/{emp.totalHours}
                    </td>
                    <td className="py-2.5 pl-2 pr-4 text-center">
                      <span className={`inline-block h-2.5 w-2.5 rounded-full ${emp.complianceOk ? "bg-green-500" : "bg-amber-500 animate-alert-pulse"}`} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
