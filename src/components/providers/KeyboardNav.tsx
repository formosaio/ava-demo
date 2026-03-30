"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function KeyboardNav() {
  const router = useRouter();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      // Navigation shortcuts
      if (e.key === "1" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        router.push("/employee");
        return;
      }
      if (e.key === "2" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        router.push("/employer");
        return;
      }
      if (e.key === "0" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        router.push("/");
        return;
      }

      // Fullscreen
      if (e.key === "f" && !e.metaKey && !e.ctrlKey && !e.altKey) {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          document.documentElement.requestFullscreen();
        }
        return;
      }
      if (e.key === "Escape" && document.fullscreenElement) {
        document.exitFullscreen();
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
  }, [router]);

  return (
    <>
      {/* Persistent nav hint — bottom-left of every page */}
      {!isFullscreen && (
        <div
          className="fixed bottom-3 left-4 z-50 select-none text-white"
          style={{ fontSize: 11, opacity: 0.2 }}
        >
          1 Employee · 2 Employer · 0 Menu · F Fullscreen
        </div>
      )}
    </>
  );
}
