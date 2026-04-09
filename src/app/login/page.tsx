"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      if (res.ok) {
        router.push(from);
        router.refresh();
      } else {
        setError("Incorrect passcode");
        setPasscode("");
      }
    } catch {
      setError("Something went wrong — try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="animate-page-enter flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A]">
      <div className="w-full max-w-[340px] px-6">
        {/* Branding */}
        <div className="mb-10 text-center">
          <p
            className="text-[14px] tracking-widest text-white"
            style={{ fontWeight: 300, opacity: 0.4 }}
          >
            Quinyx
          </p>
          <h1 className="mt-2 text-[22px] font-semibold text-white">
            Ava Demo
          </h1>
          <p className="mt-1 text-[13px] text-white/30">
            Enter the event passcode to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Passcode"
            autoFocus
            className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-center text-[16px] tracking-widest text-white placeholder:text-white/20 focus:border-quinyx/50 focus:outline-none"
          />

          {error && (
            <p className="mt-3 text-center text-[13px] text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !passcode}
            className="mt-4 w-full rounded-xl bg-quinyx py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-30"
          >
            {loading ? "Checking..." : "Enter"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
