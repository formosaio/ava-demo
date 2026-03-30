import type { ActionItemData } from "@/types";

const priorityStyles: Record<ActionItemData["priority"], { bg: string; text: string }> = {
  urgent:    { bg: "bg-red-50",   text: "text-red-700" },
  important: { bg: "bg-amber-50", text: "text-amber-700" },
  suggested: { bg: "bg-teal-50",  text: "text-teal-700" },
};

const effortStyles: Record<ActionItemData["effort"], { bg: string; text: string; label: string }> = {
  low:    { bg: "bg-green-50",  text: "text-green-700", label: "Low effort" },
  medium: { bg: "bg-amber-50",  text: "text-amber-700", label: "Medium effort" },
  high:   { bg: "bg-red-50",    text: "text-red-700",   label: "High effort" },
};

export function ActionItemCard({ data }: { data: ActionItemData }) {
  const priority = priorityStyles[data.priority] ?? priorityStyles.suggested;
  const effort = effortStyles[data.effort] ?? effortStyles.medium;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3">
      {/* Priority + store row */}
      <div className="flex items-center gap-1.5">
        <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${priority.bg} ${priority.text}`}>
          {data.priority}
        </span>
        <span className="text-[11px] text-gray-400">{data.store}</span>
        <span className={`ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-medium ${effort.bg} ${effort.text}`}>
          {effort.label}
        </span>
      </div>

      {/* Action */}
      <p className="mt-2 text-[13px] font-medium leading-snug text-gray-900">{data.action}</p>

      {/* Expected outcome */}
      {data.expected_outcome && (
        <p className="mt-1.5 text-[11px] leading-snug text-gray-500">{data.expected_outcome}</p>
      )}
    </div>
  );
}
