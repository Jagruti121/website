'use client';

export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* ── Orb 1 — teal/cyan, top-left ── */}
      <div className="orb orb-1" />
      {/* ── Orb 2 — violet, top-right ── */}
      <div className="orb orb-2" />
      {/* ── Orb 3 — sky-blue, bottom-center ── */}
      <div className="orb orb-3" />
      {/* ── Orb 4 — emerald, bottom-left ── */}
      <div className="orb orb-4" />
      {/* ── Orb 5 — indigo, mid-right ── */}
      <div className="orb orb-5" />

      {/* ── Top aurora shimmer bar ── */}
      <div className="aurora-bar" />
    </div>
  );
}
