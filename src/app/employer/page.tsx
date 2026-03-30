import { DashboardLayout } from "@/components/employer/DashboardLayout";

export default function EmployerPage() {
  return (
    <div className="animate-page-enter relative flex min-h-screen flex-col items-center justify-center bg-[#0A0A0A] p-6">
      <div
        className="h-[calc(100vh-48px)] w-full max-w-[1400px]"
        style={{
          transform: "scale(var(--demo-scale))",
          transformOrigin: "center center",
          transition: "transform 300ms ease-out",
        }}
      >
        <DashboardLayout />
      </div>

      {/* Quinyx watermark */}
      <p
        className="mt-4 select-none text-sm tracking-widest text-white"
        style={{ fontWeight: 300, opacity: 0.3 }}
      >
        Quinyx
      </p>
    </div>
  );
}
