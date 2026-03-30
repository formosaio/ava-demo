import type { TrainingCardData } from "@/types";

const typeBadge: Record<TrainingCardData["type"], { bg: string; text: string; label: string }> = {
  required:    { bg: "bg-red-50",   text: "text-red-700",   label: "Required" },
  recommended: { bg: "bg-amber-50", text: "text-amber-700", label: "Recommended" },
  optional:    { bg: "bg-gray-100", text: "text-gray-500",  label: "Optional" },
};

export function TrainingCard({ data }: { data: TrainingCardData }) {
  const badge = typeBadge[data.type];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3.5">
      {/* Header */}
      <div className="flex items-center gap-2">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
        <span className="text-[16px] font-semibold text-gray-900">{data.name}</span>
        <span className={`rounded-full px-2 py-0.5 text-[12px] font-medium ${badge.bg} ${badge.text}`}>
          {badge.label}
        </span>
      </div>

      {/* Description */}
      <p className="mt-2 text-[14px] leading-snug text-gray-500">{data.description}</p>

      {/* Meta row */}
      <div className="mt-2.5 flex items-center gap-3 text-[13px] text-gray-400">
        <span>{data.duration}</span>
        {data.dueDate && (
          <>
            <span>·</span>
            <span className={data.type === "required" ? "font-medium text-amber-600" : ""}>
              Due {data.dueDate}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
