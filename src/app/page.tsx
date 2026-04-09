"use client";

import { useRouter } from "next/navigation";

export default function LauncherPage() {
  const router = useRouter();

  return (
    <div className="animate-page-enter flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A]">
      {/* Header */}
      <div className="mb-12 text-center">
        <p
          className="text-[13px] tracking-widest text-white"
          style={{ fontWeight: 300, opacity: 0.4 }}
        >
          Quinyx
        </p>
        <h1 className="mt-2 text-[28px] font-semibold text-white">Ava Demo</h1>
      </div>

      {/* Cards */}
      <div className="flex gap-6">
        {/* Employee card */}
        <button
          type="button"
          onClick={() => router.push("/employee")}
          className="group flex w-[280px] flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all hover:border-quinyx/50 hover:bg-white/[0.06]"
        >
          {/* Phone icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-quinyx/10">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#004851" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="2" width="14" height="20" rx="3" />
              <path d="M12 18h.01" />
            </svg>
          </div>
          <h2 className="mt-5 text-[17px] font-medium text-white">Employee experience</h2>
          <p className="mt-1.5 text-[13px] text-white/40">
            Sarah Mitchell — Barista, Manchester Arndale
          </p>
          <span className="mt-4 rounded-full border border-white/10 px-3 py-1 text-[12px] text-white/30 transition-colors group-hover:border-quinyx/30 group-hover:text-quinyx/60">
            Press 1
          </span>
        </button>

        {/* Employer card */}
        <button
          type="button"
          onClick={() => router.push("/employer")}
          className="group flex w-[280px] flex-col items-center rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-all hover:border-quinyx/50 hover:bg-white/[0.06]"
        >
          {/* Chart icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-quinyx/10">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#004851" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="M7 16l4-8 4 4 4-6" />
            </svg>
          </div>
          <h2 className="mt-5 text-[17px] font-medium text-white">Employer dashboard</h2>
          <p className="mt-1.5 text-[13px] text-white/40">
            James Whitfield — Regional Manager, North West
          </p>
          <span className="mt-4 rounded-full border border-white/10 px-3 py-1 text-[12px] text-white/30 transition-colors group-hover:border-quinyx/30 group-hover:text-quinyx/60">
            Press 2
          </span>
        </button>
      </div>
    </div>
  );
}
