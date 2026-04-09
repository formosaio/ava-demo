"use client";

import { useState } from "react";
import type { StoreAction, ActionStatus } from "@/data/store-detail-data";

interface ActionsTabProps {
  actions: StoreAction[];
  storeName: string;
}

const statusConfig: Record<ActionStatus, { label: string; bg: string; text: string; dot: string }> = {
  pending:     { label: "Pending",     bg: "bg-gray-100",   text: "text-gray-600",  dot: "bg-gray-400" },
  accepted:    { label: "Accepted",    bg: "bg-blue-50",    text: "text-blue-700",  dot: "bg-blue-500" },
  in_progress: { label: "In progress", bg: "bg-quinyx/10",  text: "text-quinyx",    dot: "bg-quinyx" },
  completed:   { label: "Completed",   bg: "bg-green-50",   text: "text-green-700", dot: "bg-green-500" },
  dismissed:   { label: "Dismissed",   bg: "bg-gray-50",    text: "text-gray-400",  dot: "bg-gray-300" },
};

const priorityConfig: Record<string, { bg: string; text: string }> = {
  urgent:    { bg: "bg-red-50",   text: "text-red-700" },
  important: { bg: "bg-amber-50", text: "text-amber-700" },
  suggested: { bg: "bg-gray-100", text: "text-gray-600" },
};

const effortConfig: Record<string, { bg: string; text: string }> = {
  low:    { bg: "bg-green-50",  text: "text-green-700" },
  medium: { bg: "bg-amber-50",  text: "text-amber-700" },
  high:   { bg: "bg-red-50",    text: "text-red-700" },
};

export function ActionsTab({ actions, storeName }: ActionsTabProps) {
  const [actionStates, setActionStates] = useState<Record<string, ActionStatus>>(
    Object.fromEntries(actions.map((a) => [a.id, a.status]))
  );

  function advanceStatus(id: string) {
    setActionStates((prev) => {
      const current = prev[id];
      const next: Record<ActionStatus, ActionStatus> = {
        pending: "accepted",
        accepted: "in_progress",
        in_progress: "completed",
        completed: "completed",
        dismissed: "dismissed",
      };
      return { ...prev, [id]: next[current] ?? current };
    });
  }

  const statuses = Object.values(actionStates);
  const completed = statuses.filter((s) => s === "completed").length;
  const total = statuses.length;
  const progressPct = total > 0 ? Math.round((completed / total) * 100) : 0;

  // Sort: urgent first, completed last
  const sortOrder: Record<ActionStatus, number> = {
    pending: 1, accepted: 2, in_progress: 3, completed: 5, dismissed: 6,
  };
  const priorityOrder: Record<string, number> = { urgent: 0, important: 1, suggested: 2 };
  const sorted = [...actions].sort((a, b) => {
    const sa = sortOrder[actionStates[a.id]] ?? 4;
    const sb = sortOrder[actionStates[b.id]] ?? 4;
    if (sa !== sb) return sa - sb;
    return (priorityOrder[a.priority] ?? 3) - (priorityOrder[b.priority] ?? 3);
  });

  return (
    <div>
      {/* Progress summary */}
      <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] font-semibold text-gray-400 uppercase tracking-wide">Action progress — {storeName}</p>
            <p className="mt-1 text-[20px] font-bold text-gray-900">
              {completed} <span className="text-[14px] font-normal text-gray-400">of {total} completed</span>
            </p>
          </div>
          <div className="text-right">
            <span className={`text-[22px] font-bold ${progressPct === 100 ? "text-green-600" : progressPct >= 50 ? "text-quinyx" : "text-amber-600"}`}>
              {progressPct}%
            </span>
          </div>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full transition-all duration-500 ${progressPct === 100 ? "bg-green-500" : "bg-quinyx"}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Action items */}
      <div className="mt-4 flex flex-col gap-2">
        {sorted.map((action) => {
          const status = actionStates[action.id];
          const sc = statusConfig[status];
          const pc = priorityConfig[action.priority] ?? priorityConfig.suggested;
          const ec = effortConfig[action.effort] ?? effortConfig.medium;
          const isCompleted = status === "completed";

          return (
            <div
              key={action.id}
              className={`rounded-xl border border-gray-100 p-4 transition-opacity ${isCompleted ? "opacity-60" : ""}`}
            >
              {/* Top row: priority + status + effort */}
              <div className="flex items-center gap-2">
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${pc.bg} ${pc.text}`}>
                  {action.priority}
                </span>
                <span className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ${sc.bg} ${sc.text}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                  {sc.label}
                </span>
                <span className={`ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium ${ec.bg} ${ec.text}`}>
                  {action.effort} effort
                </span>
              </div>

              {/* Action text */}
              <p className={`mt-2 text-[14px] font-medium ${isCompleted ? "text-gray-400 line-through" : "text-gray-900"}`}>
                {action.action}
              </p>
              <p className="mt-1 text-[12px] text-gray-500">{action.detail}</p>

              {/* Source */}
              <p className="mt-1.5 text-[11px] text-quinyx">{action.source}</p>

              {/* Impact */}
              <p className="mt-1 text-[11px] text-gray-400">{action.impact}</p>

              {/* Footer: assignee + dates + action button */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[11px] text-gray-400">
                  {action.assignee ? <span>Assigned: {action.assignee}</span> : null}
                  {action.dueDate ? <span>Due: {action.dueDate}</span> : null}
                  {action.completedDate ? <span className="text-green-600">Completed: {action.completedDate}</span> : null}
                </div>
                {!isCompleted && status !== "dismissed" && (
                  <button
                    type="button"
                    onClick={() => advanceStatus(action.id)}
                    className="rounded-full bg-quinyx px-3 py-1 text-[11px] font-medium text-white transition-opacity hover:opacity-90"
                  >
                    {status === "pending" ? "Accept" : status === "accepted" ? "Start" : "Complete"}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
