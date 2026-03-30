"use client";

import { useEffect, useState, useCallback } from "react";

interface PhoneFrameProps {
  children: React.ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [scale, setScale] = useState(1);

  const adjustScale = useCallback((delta: number) => {
    setScale((s) => {
      const next = Math.round((s + delta) * 10) / 10;
      return Math.max(0.5, Math.min(1.5, next));
    });
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Scale shortcuts (phone-frame specific)
      if ((e.key === "=" || e.key === "+") && !e.metaKey && !e.ctrlKey) {
        adjustScale(0.1);
        return;
      }
      if (e.key === "-" && !e.metaKey && !e.ctrlKey) {
        adjustScale(-0.1);
        return;
      }
    }

    function handleFullscreenChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [adjustScale]);

  // Sync CSS custom property
  useEffect(() => {
    document.documentElement.style.setProperty("--demo-scale", String(scale));
  }, [scale]);

  return (
    <div
      className={`animate-page-enter relative flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] ${
        isFullscreen ? "vignette" : ""
      }`}
    >
      {/* Phone device — scales via transform */}
      <div
        className="relative z-10 flex-shrink-0 transition-transform duration-300 ease-out"
        style={{
          width: 390,
          height: 844,
          borderRadius: 60,
          background: "#1A1A1A",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.04), 0 40px 80px rgba(0,0,0,0.6), 0 0 120px rgba(0,0,0,0.4)",
          padding: 4,
          transform: `scale(${scale})`,
          borderTop: "1px solid rgba(255,255,255,0.12)",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          borderRight: "1px solid #333",
          borderBottom: "1px solid #2a2a2a",
        }}
      >
        {/* Screen */}
        <div
          className="relative flex h-full w-full flex-col overflow-hidden bg-white"
          style={{ borderRadius: 56 }}
        >
          {/* Dynamic Island */}
          <div className="absolute left-1/2 top-3 z-10 -translate-x-1/2">
            <div
              className="relative bg-black"
              style={{ width: 126, height: 37, borderRadius: 19 }}
            >
              {/* DEMO badge */}
              <span
                className="absolute right-[-36px] top-1/2 -translate-y-1/2 select-none font-medium tracking-wider text-white"
                style={{ fontSize: 10, opacity: 0.3 }}
              >
                DEMO
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex h-full w-full flex-col overflow-hidden">
            {children}
          </div>
        </div>
      </div>

      {/* Quinyx wordmark */}
      <p
        className="z-10 mt-8 select-none text-sm tracking-widest text-white transition-transform duration-300"
        style={{ fontWeight: 300, opacity: 0.3, transform: `scale(${scale})` }}
      >
        Quinyx
      </p>
    </div>
  );
}
