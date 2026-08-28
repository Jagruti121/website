'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import {
  WandSparkles,
  LockKeyhole,
  BarChart3,
  FileCheck2,
  Radio,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useRef } from 'react';

interface BentoItem {
  id: string;
  icon: typeof WandSparkles;
  title: string;
  description: string;
  accent: string;
  iconBg: string;
  badge?: string;
  stat?: { value: string; label: string };
}

const items: BentoItem[] = [
  {
    id: 'automation',
    icon: WandSparkles,
    title: 'Instant Exam Automation',
    description:
      'Upload question banks and launch exams in minutes. PWS distributes unique digital slips to every student automatically — no manual intervention.',
    accent: 'from-cyan-400/20 via-sky-400/10 to-transparent',
    iconBg: 'bg-cyan-50 text-cyan-700',
    badge: 'Core Feature',
    stat: { value: '10×', label: 'Faster setup' }
  },
  {
    id: 'security',
    icon: LockKeyhole,
    title: 'Locked & Fair Environment',
    description:
      'Restrict tab switching, external tools, and browsing. Every session event is logged to an immutable audit trail.',
    accent: 'from-violet-400/20 to-transparent',
    iconBg: 'bg-violet-50 text-violet-700',
    stat: { value: '0', label: 'Integrity flags' }
  },
  {
    id: 'grading',
    icon: FileCheck2,
    title: 'Auto-Grading',
    description:
      'MCQs are evaluated the instant a student submits. Faculty review practical outputs side-by-side in one live panel.',
    accent: 'from-emerald-400/20 to-transparent',
    iconBg: 'bg-emerald-50 text-emerald-700',
    stat: { value: '12s', label: 'Avg grade time' }
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description:
      'Institution-wide score visibility the moment exams close. Compare cohorts, spot trends, and export reports instantly.',
    accent: 'from-amber-400/20 to-transparent',
    iconBg: 'bg-amber-50 text-amber-700',
    stat: { value: '100%', label: 'Score visibility' }
  },
  {
    id: 'faculty',
    icon: Radio,
    title: 'Live Faculty Oversight',
    description:
      'Monitor all sessions remotely, broadcast messages, and update question slips mid-exam without disruption.',
    accent: 'from-blue-400/20 to-transparent',
    iconBg: 'bg-blue-50 text-blue-700',
    stat: { value: '24/7', label: 'Monitoring' }
  },
  {
    id: 'compliance',
    icon: ShieldCheck,
    title: 'Enterprise Compliance',
    description:
      'AES-256 encryption, GDPR-ready data handling, and tamper-proof logs. Built for institutions that cannot afford risk.',
    accent: 'from-teal-400/20 to-transparent',
    iconBg: 'bg-teal-50 text-teal-700',
    badge: 'Security',
    stat: { value: 'AES-256', label: 'Encrypted' }
  }
];

/* ── Cursor-tracking tilt card ────────────────────────────── */
function BentoCard({ item, delay }: { item: BentoItem; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      /* Equal height cards via flex column + min-height */
      className="bento-card group flex flex-col min-h-[260px]"
    >
      {/* Gradient accent overlay on hover */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br ${item.accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
      />

      {/* Content */}
      <div className="relative flex h-full flex-col">
        {/* Icon + badge row */}
        <div className="flex items-start justify-between mb-5">
          <span className={`grid h-12 w-12 place-items-center rounded-2xl ${item.iconBg} shrink-0`}>
            <Icon size={21} strokeWidth={2.1} />
          </span>
          {item.badge && (
            <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-bold text-slate-500">
              {item.badge}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold tracking-tight text-slate-900 sm:text-[17px] leading-snug">
          {item.title}
        </h3>

        {/* Description — flex-1 pushes footer to bottom */}
        <p className="mt-2.5 flex-1 text-sm leading-6 text-slate-500">{item.description}</p>

        {/* Stat + arrow footer */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          {item.stat ? (
            <div className="rounded-xl bg-slate-50 px-3 py-2">
              <p className="text-base font-bold text-slate-900">{item.stat.value}</p>
              <p className="text-[10px] font-medium text-slate-400">{item.stat.label}</p>
            </div>
          ) : (
            <span />
          )}
          <ArrowRight
            size={16}
            className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-teal-600"
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main export ──────────────────────────────────────────── */
export function BentoGrid() {
  return (
    <div
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 [perspective:1200px]"
    >
      {items.map((item, i) => (
        <BentoCard key={item.id} item={item} delay={i * 0.07} />
      ))}
    </div>
  );
}
