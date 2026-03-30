"use client";

import { useState } from "react";
import type { SwapCardData } from "@/types";

export function SwapCard({ data }: { data: SwapCardData }) {
  const [selected, setSelected] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setSelected((s) => !s)}
      className={`w-full rounded-xl border p-3.5 text-left transition-all duration-200 ${
        selected
          ? "border-quinyx bg-teal-50/50 shadow-sm"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 3l4 4-4 4" />
            <path d="M20 7H4" />
            <path d="M8 21l-4-4 4-4" />
            <path d="M4 17h16" />
          </svg>
          <span className="text-[16px] font-semibold text-gray-900">{data.colleagueName}</span>
        </div>

        {/* Selected checkmark */}
        <div
          className={`flex h-5 w-5 items-center justify-center rounded-full transition-all duration-200 ${
            selected ? "bg-quinyx" : "border border-gray-300 bg-white"
          }`}
        >
          {selected && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
      </div>

      {/* Condition */}
      <p className="mt-1.5 text-[14px] text-gray-500">{data.condition}</p>

      {/* Compliance badge */}
      {data.isCompliant && (
        <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="text-[13px] font-medium text-green-700">Compliant with working time rules</span>
        </div>
      )}
    </button>
  );
}
