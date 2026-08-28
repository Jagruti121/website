'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Clock, IndianRupee, Leaf, TrendingUp } from 'lucide-react';

/* ─── Animated counter ──────────────────────────────────── */
function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const spring = useSpring(value, { stiffness: 120, damping: 20 });
  const display = useTransform(spring, (v) =>
    decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString('en-IN')
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return <motion.span>{display}</motion.span>;
}

/* ─── Slider component ──────────────────────────────────── */
function RoiSlider({
  label,
  min,
  max,
  value,
  onChange,
  unit,
  step = 1
}: {
  label: string;
  min: number;
  max: number;
  value: number;
  onChange: (v: number) => void;
  unit: string;
  step?: number;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.setProperty('--val', `${pct}%`);
    }
  }, [pct]);

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-300">{label}</label>
        <span className="rounded-lg bg-white/10 px-3 py-1 text-sm font-bold text-white tabular-nums">
          {value.toLocaleString('en-IN')} {unit}
        </span>
      </div>
      <input
        ref={ref}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        aria-label={label}
      />
      <div className="flex justify-between text-[10px] font-medium text-slate-500">
        <span>{min.toLocaleString('en-IN')}</span>
        <span>{max.toLocaleString('en-IN')}</span>
      </div>
    </div>
  );
}

/* ─── Result metric card ────────────────────────────────── */
function ResultCard({
  icon: Icon,
  label,
  value,
  unit,
  accent
}: {
  icon: typeof Clock;
  label: string;
  value: number;
  unit: string;
  accent: string;
}) {
  return (
    <div className={`rounded-2xl p-4 ${accent}`}>
      <span className="mb-3 grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white">
        <Icon size={17} />
      </span>
      <p className="text-2xl font-bold text-white tabular-nums">
        <AnimatedNumber value={value} />
        <span className="ml-1 text-sm font-medium text-white/70">{unit}</span>
      </p>
      <p className="mt-1 text-xs font-medium text-white/60">{label}</p>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────── */
export function ROICalculator() {
  const [dailyVolume, setDailyVolume] = useState(120);
  const [teamSize, setTeamSize] = useState(8);

  // ROI formulas (realistic estimates)
  const hoursSaved = Math.round(dailyVolume * 0.12 * 22 * (teamSize / 5));
  const capitalSaved = Math.round(hoursSaved * 350); // ₹350/hr average faculty time cost
  const papersSaved = dailyVolume * 22 * 4; // 4 sheets per exam on average

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-7 sm:p-10">
      {/* Ambient orbs */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-teal-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Header */}
      <div className="relative mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-3.5 py-1.5 text-xs font-bold text-teal-400 mb-4">
          <TrendingUp size={12} /> ROI Calculator
        </span>
        <h3 className="text-2xl font-bold tracking-tight text-white">
          See your savings with PWS
        </h3>
        <p className="mt-2 text-sm text-slate-400">
          Drag the sliders to match your institution's scale
        </p>
      </div>

      {/* Sliders */}
      <div className="relative space-y-7 mb-9">
        <RoiSlider
          label="Daily Exam Submissions"
          min={10}
          max={500}
          step={5}
          value={dailyVolume}
          onChange={setDailyVolume}
          unit="submissions"
        />
        <RoiSlider
          label="Faculty / Staff Members"
          min={2}
          max={50}
          value={teamSize}
          onChange={setTeamSize}
          unit="people"
        />
      </div>

      {/* Divider */}
      <div className="relative mb-7 border-t border-white/10" />

      {/* Results grid */}
      <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-3">
        <ResultCard
          icon={Clock}
          label="Hours saved per month"
          value={hoursSaved}
          unit="hrs"
          accent="bg-teal-500/20 ring-1 ring-teal-500/30"
        />
        <ResultCard
          icon={IndianRupee}
          label="Cost savings per year"
          value={capitalSaved}
          unit="₹"
          accent="bg-emerald-500/20 ring-1 ring-emerald-500/30"
        />
        <ResultCard
          icon={Leaf}
          label="Paper sheets eliminated / month"
          value={papersSaved}
          unit="sheets"
          accent="bg-cyan-500/20 ring-1 ring-cyan-500/30"
        />
      </div>

      {/* Disclaimer */}
      <p className="relative mt-5 text-center text-[10px] text-slate-600">
        Estimates based on average institution benchmarks. Actual savings may vary.
      </p>
    </div>
  );
}
