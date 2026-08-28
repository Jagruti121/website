'use client';

import Image from 'next/image';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  FileCheck2,
  FileLock2,
  GraduationCap,
  LayoutDashboard,
  Leaf,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
  WandSparkles,
  Zap,
  X,
  AlertTriangle,
  FileText,
  Timer,
  UserX,
  Shuffle,
  BarChart3,
  Rocket,
  Lock,
  Globe
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import dynamic from 'next/dynamic';

import { Navigation } from '@/components/navigation';
import { SectionHeading } from '@/components/section-heading';
import { TrustStrip } from '@/components/trust-strip';

// Lazy-load heavy below-the-fold components
const DemoBookingModal = dynamic(
  () => import('@/components/demo-booking-modal').then(m => ({ default: m.DemoBookingModal })),
  { ssr: false, loading: () => null }
);
const BentoGrid = dynamic(
  () => import('@/components/bento-grid').then(m => ({ default: m.BentoGrid })),
  { ssr: false, loading: () => <div className="h-80 rounded-3xl bg-slate-100 animate-pulse" /> }
);
const StickyCtaBanner = dynamic(
  () => import('@/components/sticky-cta-banner').then(m => ({ default: m.StickyCtaBanner })),
  { ssr: false, loading: () => null }
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

const pillars = [
  {
    icon: Leaf,
    metric: '100%',
    metricLabel: 'Digital',
    title: 'Paperless',
    text: 'Move every physical exam workflow into one organized digital environment.',
    color: 'bg-cyan-50 text-cyan-700 ring-cyan-100',
    accent: 'from-cyan-400 to-sky-500'
  },
  {
    icon: BadgeCheck,
    metric: '99.9%',
    metricLabel: 'Uptime',
    title: 'Reliable',
    text: 'Keep critical campus operations moving smoothly when it matters most.',
    color: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
    accent: 'from-emerald-400 to-teal-500'
  },
  {
    icon: ShieldCheck,
    metric: 'AES-256',
    metricLabel: 'Encryption',
    title: 'Secure',
    text: 'Protect testing materials and academic data with strict access control.',
    color: 'bg-violet-50 text-violet-700 ring-violet-100',
    accent: 'from-violet-400 to-indigo-500'
  },
  {
    icon: Zap,
    metric: '10x',
    metricLabel: 'Faster',
    title: 'Efficient',
    text: 'Save valuable time, budget, and energy across the academic lifecycle.',
    color: 'bg-amber-50 text-amber-700 ring-amber-100',
    accent: 'from-amber-400 to-orange-500'
  }
];

const audiences = [
  {
    id: 'admins',
    icon: LayoutDashboard,
    role: 'For college admins',
    title: 'Ultimate control, at a glance.',
    text: 'Check every student score within seconds of an exam ending and automate attendance the instant a student logs in.',
    points: ['Real-time score visibility', 'Automatic attendance', 'One source of truth'],
    activity: ['Exam scores consolidated', 'Attendance auto-logged', 'Results ready to review'],
    iconColor: 'bg-cyan-600'
  },
  {
    id: 'faculty',
    icon: ClipboardCheck,
    role: 'For teachers',
    title: 'Grade less. Guide more.',
    text: 'View student code, approve outputs, and assign marks side-by-side. MCQs are evaluated automatically on submission.',
    points: ['Live exam dashboard', 'Instant MCQ evaluation', 'Flexible question slips'],
    activity: ['12 MCQs evaluated', '6 outputs awaiting approval', 'One question slip updated'],
    iconColor: 'bg-emerald-600'
  },
  {
    id: 'students',
    icon: GraduationCap,
    role: 'For students',
    title: 'A fairer way to show your skills.',
    text: 'Students type directly into a seamless practical exam environment—no repetitive writing, no lost paperwork.',
    points: ['Digital practical workspace', 'Clear, fair workflows', 'Less repetitive work'],
    activity: ['Question slip assigned', 'Code saved securely', 'Exam session in progress'],
    iconColor: 'bg-violet-600'
  }
];

// Before vs After comparison data
const comparisonRows = [
  {
    icon: FileText,
    label: 'Question Distribution',
    before: 'Physical slips printed & hand-distributed — risk of duplication or loss',
    after: 'Random digital slip assigned instantly to each student — tamper-proof'
  },
  {
    icon: Timer,
    label: 'Exam Setup Time',
    before: 'Hours of printing, sorting, and arranging papers the night before',
    after: 'Upload question bank once — exam launches in minutes'
  },
  {
    icon: UserX,
    label: 'Attendance',
    before: 'Manual roll call or paper sign-in — prone to errors and fraud',
    after: 'Auto-logged the instant a student logs in — 100% accurate'
  },
  {
    icon: Shuffle,
    label: 'Cheating Prevention',
    before: 'Same paper for all — easy to copy; invigilator must physically watch',
    after: 'Every student gets a unique slip; locked workspace restricts tools'
  },
  {
    icon: BarChart3,
    label: 'Grading & Results',
    before: 'Days of manual marking, score entry, and result compilation',
    after: 'MCQs auto-graded instantly; practicals reviewed live on-screen'
  },
  {
    icon: FileCheck2,
    label: 'Result Availability',
    before: 'Days or weeks after the exam — delayed feedback loop',
    after: 'Scores consolidated automatically; results in seconds of last submission'
  },
  {
    icon: Lock,
    label: 'Data Security',
    before: 'Paper records can be lost, altered, or damaged',
    after: 'AES-256 encrypted; tamper-proof audit trail for every action'
  },
  {
    icon: Globe,
    label: 'Remote Oversight',
    before: 'Faculty must be physically present to supervise and grade',
    after: 'Remote faculty oversight — monitor live sessions from anywhere'
  }
];

/* ── Hero Dashboard ───────────────────────────────────────── */
function HeroDashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 22 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.18, ease: 'easeOut' }}
      className="relative mx-auto w-full max-w-[660px]"
    >
      <div className="absolute -left-14 top-20 h-44 w-44 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-52 w-52 rounded-full bg-violet-300/25 blur-3xl" />
      <div className="relative overflow-hidden rounded-[28px] border border-slate-200/90 bg-white p-2 shadow-[0_28px_80px_rgba(16,47,97,0.15)] sm:p-3">
        <div className="overflow-hidden rounded-[21px] border border-slate-100 bg-slate-50">
          <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2.5">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-gradient text-white">
                <WandSparkles size={14} />
              </span>
              <span className="text-xs font-bold tracking-tight text-slate-800 sm:text-sm">
                PWS Exam Console
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 sm:text-xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> Live session
            </div>
          </div>
          <div className="grid grid-cols-[64px_1fr] sm:grid-cols-[88px_1fr]">
            <aside className="border-r border-slate-200 bg-white px-2 py-4 sm:px-3">
              <div className="space-y-4">
                {[LayoutDashboard, FileCheck2, UsersRound].map((Icon, index) => (
                  <div
                    key={index}
                    className={`mx-auto grid h-8 w-8 place-items-center rounded-lg ${index === 0 ? 'bg-cyan-50 text-cyan-700' : 'text-slate-300'}`}
                  >
                    <Icon size={15} />
                  </div>
                ))}
              </div>
            </aside>
            <div className="p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400 sm:text-xs">
                    Computer science · practical
                  </p>
                  <h3 className="mt-1 text-sm font-bold text-slate-900 sm:text-base">
                    Web Development Lab
                  </h3>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-right">
                  <p className="text-[9px] font-medium text-slate-400">Time remaining</p>
                  <p className="font-mono text-xs font-bold text-slate-800">01:18:42</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  ['42', 'Present', 'text-cyan-700', 'bg-cyan-50'],
                  ['36', 'Submitted', 'text-emerald-700', 'bg-emerald-50'],
                  ['06', 'In progress', 'text-violet-700', 'bg-violet-50']
                ].map(([value, label, textColor, background]) => (
                  <div key={label} className={`rounded-xl ${background} px-3 py-3`}>
                    <p className={`text-xl font-bold ${textColor}`}>{value}</p>
                    <p className="mt-0.5 text-[10px] font-medium text-slate-500">{label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                    <span className="text-xs font-bold text-slate-700">Student activity</span>
                  </div>
                  <span className="text-[10px] font-medium text-slate-400">Live updates</span>
                </div>
                <div className="mt-4 flex h-12 items-end gap-1.5">
                  {[32, 55, 42, 72, 51, 82, 64, 90, 67, 78, 94, 72].map((height, index) => (
                    <span
                      key={index}
                      style={{ height: `${height}%` }}
                      className={`flex-1 rounded-t-sm ${index > 8 ? 'bg-teal-500' : 'bg-cyan-100'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-2 -top-7 hidden rounded-2xl border border-white bg-white/95 px-4 py-3 shadow-card sm:block"
      >
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-50 text-emerald-600">
            <Check size={16} />
          </span>
          <div>
            <p className="text-[10px] font-medium text-slate-400">Grading complete</p>
            <p className="text-xs font-bold text-slate-800">Marks updated instantly</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Role Workspace card ──────────────────────────────────── */
function RoleWorkspace({ audience }: { audience: (typeof audiences)[number] }) {
  const Icon = audience.icon;
  const workspace = {
    admins: {
      title: 'College Admin Console',
      accent: 'bg-cyan-600',
      softAccent: 'bg-cyan-50 text-cyan-700',
      metrics: [['72', 'Results ready'], ['48/48', 'Attendance'], ['3', 'Live exams']]
    },
    faculty: {
      title: 'Faculty Review Desk',
      accent: 'bg-emerald-600',
      softAccent: 'bg-emerald-50 text-emerald-700',
      metrics: [['36', 'Submitted'], ['6', 'To review'], ['12', 'MCQs graded']]
    },
    students: {
      title: 'Student Workspace',
      accent: 'bg-violet-600',
      softAccent: 'bg-violet-50 text-violet-700',
      metrics: [['01:24', 'Time remaining'], ['Slip #7', 'Question'], ['Active', 'Status']]
    }
  }[audience.id as 'admins' | 'faculty' | 'students'];

  return (
    <motion.div
      key={audience.id}
      initial={{ opacity: 0, x: 16, scale: 0.985 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -16, scale: 0.985 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_36px_rgba(15,23,42,0.12)]"
    >
      <div className={`flex items-center justify-between px-5 py-4 text-white ${workspace.accent}`}>
        <div className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/15">
            <Icon size={16} />
          </span>
          <span className="text-sm font-bold">{workspace.title}</span>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-white/75">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> Live
        </span>
      </div>
      <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
        {workspace.metrics.map(([value, label]) => (
          <div key={label} className="px-3 py-4 text-center">
            <p className={`text-base font-bold tracking-tight sm:text-lg ${workspace.softAccent.split(' ')[1]}`}>
              {value}
            </p>
            <p className="mt-0.5 text-[10px] font-medium text-slate-400 sm:text-xs">{label}</p>
          </div>
        ))}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">Recent activity</p>
          <span className={`rounded-full px-2 py-1 text-[10px] font-bold ${workspace.softAccent}`}>PWS secure</span>
        </div>
        <div className="mt-3 divide-y divide-slate-100">
          {audience.activity.map((activity) => (
            <div key={activity} className="flex items-center gap-3 py-3">
              <span className={`h-1.5 w-1.5 rounded-full ${workspace.accent}`} />
              <span className="flex-1 text-xs font-medium text-slate-600 sm:text-sm">{activity}</span>
              <span className="text-[10px] text-slate-300">now</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Before vs After Section ──────────────────────────────── */
function BeforeAfterSection() {
  return (
    <section id="why-pws" className="relative overflow-hidden border-y border-slate-100 bg-white px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_8%_50%,rgba(17,183,162,0.28),transparent_32%),radial-gradient(circle_at_92%_50%,rgba(124,58,237,0.20),transparent_32%)]" />

      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Compare the difference</p>
          <h2 className="mt-4 text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">
            Why you should implement{' '}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              PWS in your college
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            See the dramatic difference between running exams the old way versus the PWS way — across every stage of the examination lifecycle.
          </p>
        </div>

        {/* Column headers */}
        <div className="mt-14 grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="flex items-center gap-4 rounded-2xl border border-red-200 bg-red-50 px-6 py-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-red-100 text-red-500">
              <X size={22} />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-400">Before PWS</p>
              <p className="mt-0.5 text-base font-bold text-red-700">Traditional Paper-Based Exams</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-teal-200 bg-teal-50 px-6 py-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-100 text-teal-600">
              <Rocket size={22} />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-500">After PWS</p>
              <p className="mt-0.5 text-base font-bold text-teal-800">Digital, Automated &amp; Secure</p>
            </div>
          </div>
        </div>

        {/* Comparison rows */}
        <div className="mt-3 space-y-3">
          {comparisonRows.map((row, index) => {
            const RowIcon = row.icon;
            return (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
                className="grid grid-cols-1 gap-3 lg:grid-cols-2"
              >
                {/* Before cell */}
                <div className="flex items-start gap-4 rounded-2xl border border-red-100 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-red-50 text-red-400">
                    <AlertTriangle size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{row.label}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{row.before}</p>
                  </div>
                </div>

                {/* After cell */}
                <div className="flex items-start gap-4 rounded-2xl border border-teal-100 bg-white px-5 py-4 shadow-sm transition-shadow hover:shadow-md">
                  <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-600">
                    <RowIcon size={16} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{row.label}</p>
                    <p className="mt-1 text-sm font-medium leading-6 text-slate-800">{row.after}</p>
                  </div>
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal-500 text-white">
                    <Check size={12} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Summary stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 grid grid-cols-2 gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-4"
        >
          {[
            { val: '10x', label: 'Faster results', color: 'text-teal-600' },
            { val: '100%', label: 'Paperless', color: 'text-cyan-600' },
            { val: '0', label: 'Data breaches', color: 'text-emerald-600' },
            { val: 'AES-256', label: 'Encryption', color: 'text-violet-600' }
          ].map(({ val, label, color }) => (
            <div key={label} className="text-center">
              <p className={`text-2xl font-bold tracking-tight sm:text-3xl ${color}`}>{val}</p>
              <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Main page ────────────────────────────────────────────── */
export default function Home() {
  const [activeRole, setActiveRole] = useState('students');
  const [modalOpen, setModalOpen] = useState(false);

  const activeAudience = audiences.find((a) => a.id === activeRole) ?? audiences[0];
  const ActiveRoleIcon = activeAudience.icon;

  return (
    <main id="top" className="relative">
      {/* Global mesh gradient orbs — vivid so colors clearly show */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="mesh-orb absolute -left-60 top-1/4 h-[500px] w-[500px] bg-cyan-300/55 animate-float-slow" />
        <div className="mesh-orb absolute -right-60 top-1/3 h-[400px] w-[400px] bg-violet-300/45 animate-float" />
        <div className="mesh-orb absolute left-1/2 bottom-1/4 h-[350px] w-[350px] -translate-x-1/2 bg-teal-300/40 animate-float-slow" />
      </div>

      <Navigation onBookDemo={() => setModalOpen(true)} />

      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden px-5 pb-24 pt-36 sm:px-8 sm:pb-32 sm:pt-44">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* Strong teal centre glow */}
          <div className="absolute left-1/2 top-0 h-[580px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(17,183,162,0.55),_rgba(6,182,212,0.25)_42%,_transparent_70%)]" />
          {/* Cyan left burst */}
          <div className="absolute -left-40 top-32 h-96 w-96 rounded-full bg-cyan-300/60 blur-3xl" />
          {/* Violet right burst */}
          <div className="absolute -right-40 top-28 h-96 w-96 rounded-full bg-violet-300/45 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.12 }}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white/80 px-3.5 py-2 text-xs font-bold text-teal-800 shadow-sm backdrop-blur"
            >
              <Sparkles size={14} className="text-teal-500" />
              Campus operations, beautifully simplified
            </motion.div>
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mt-7 text-4xl font-bold tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl lg:leading-[1.02]"
            >
              The Operating System for the{' '}
              <span className="bg-brand-gradient bg-clip-text text-transparent">Future Campus.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-xl sm:leading-8"
            >
              From Question Papers to Practical Exams — We Automate Everything.
            </motion.p>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.65, ease: 'easeOut' }}
              className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
            >
              <button
                onClick={() => setModalOpen(true)}
                id="hero-book-demo"
                className="btn-primary justify-center px-7 py-3.5 text-sm"
              >
                Book a PWS Demo <ArrowRight size={17} />
              </button>
              <a
                href="#why-pws"
                className="btn-secondary justify-center px-7 py-3.5 text-sm"
              >
                See why it matters <ChevronRight size={17} />
              </a>
            </motion.div>
          </motion.div>

          <div className="mt-16 lg:mt-20">
            <HeroDashboard />
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-semibold text-slate-500 sm:gap-x-9 sm:text-sm"
          >
            {['Paperless by design', 'Built for exam integrity', 'Made for every campus role'].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <Check size={14} className="text-teal-600" /> {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Trust Strip ───────────────────────────────────── */}
      <TrustStrip />

      {/* ─── PWS Intro ─────────────────────────────────────── */}
      <section id="pws" className="border-y border-slate-100 bg-white px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <div className="relative mx-auto aspect-[1.52/1] max-w-xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">
              <Image
                src="/pws-logo.png"
                alt="PWS Practical Works"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/40 to-transparent" />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <p className="eyebrow">Meet the Practical Workflow System</p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.045em] text-slate-950 sm:text-5xl">
              Practical exams, without the paper chase.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-500 sm:text-lg">
              PWS transforms a chaotic traditional examination process into a calm, paperless, and fair digital experience for everyone involved.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                'Launch exams in minutes',
                'Random digital slip distribution',
                'Built-in live assessment',
                'Tamper-proof audit trail'
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-teal-50 text-teal-600">
                    <Check size={12} />
                  </span>
                  {point}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary px-6 py-3 text-sm"
              >
                Book a Demo <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Features (Bento Grid) ─────────────────────────── */}
      <section id="features" className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="One connected ecosystem"
            title="Transforming the academic lifecycle."
            description="Four foundational pillars and a complete feature set that remove manual, paper-based work from your campus."
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            transition={{ staggerChildren: 0.08 }}
            className="mt-14 grid gap-4 lg:grid-cols-4"
          >
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <motion.article
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                  key={pillar.title}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-card"
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${pillar.accent}`} />
                  <span className={`grid h-12 w-12 place-items-center rounded-2xl ring-1 ${pillar.color}`}>
                    <Icon size={21} />
                  </span>
                  <p className="mt-5 text-xl font-bold tracking-tight text-slate-900">{pillar.metric}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-slate-400">{pillar.metricLabel}</p>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">{pillar.text}</p>
                </motion.article>
              );
            })}
          </motion.div>
          <div className="mt-4">
            <BentoGrid />
          </div>
        </div>
      </section>

      {/* ─── Before vs After ───────────────────────────────── */}
      <BeforeAfterSection />

      {/* Security section removed */}

      {/* ─── Audiences ─────────────────────────────────────── */}
      <section id="audiences" className="relative overflow-hidden border-y border-slate-100 bg-slate-50/70 px-5 py-24 sm:px-8 sm:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_15%,rgba(6,182,212,0.30),transparent_30%),radial-gradient(circle_at_88%_85%,rgba(167,139,250,0.25),transparent_30%)]" />
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="By role"
            title="Built for everyone on campus."
            description="Whether you manage, teach, or learn — PWS is designed from the ground up around your specific needs."
          />
          <div className="mt-10 flex justify-center">
            <div
              className="inline-flex max-w-full gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm"
              role="tablist"
              aria-label="PWS experiences by role"
            >
              {audiences.map((audience) => {
                const Icon = audience.icon;
                const isActive = audience.id === activeRole;
                return (
                  <button
                    key={audience.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveRole(audience.id)}
                    className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold transition sm:px-4 sm:text-sm ${
                      isActive
                        ? `${audience.iconColor} text-white shadow-sm`
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                    }`}
                  >
                    <Icon size={16} />
                    {audience.role.replace('For ', '')}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mx-auto mt-10 grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAudience.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <span className={`grid h-12 w-12 place-items-center rounded-2xl text-white shadow-sm ${activeAudience.iconColor}`}>
                  <ActiveRoleIcon size={22} />
                </span>
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                  {activeAudience.role}
                </p>
                <h3 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-slate-900 sm:text-4xl">
                  {activeAudience.title}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-8 text-slate-600">{activeAudience.text}</p>
                <ul className="mt-7 space-y-3">
                  {activeAudience.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-teal-600 shadow-sm ring-1 ring-slate-200">
                        <Check size={12} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <div className="relative mx-auto w-full max-w-xl">
              <div
                className={`absolute -inset-8 -z-10 rounded-full blur-3xl ${
                  activeAudience.id === 'students'
                    ? 'bg-violet-100/70'
                    : activeAudience.id === 'faculty'
                    ? 'bg-emerald-100/70'
                    : 'bg-cyan-100/70'
                }`}
              />
              <AnimatePresence mode="wait">
                <RoleWorkspace audience={activeAudience} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Social proof ──────────────────────────────────── */}
      <section className="relative overflow-hidden border-y border-slate-100 bg-white px-5 py-24 sm:px-8 sm:py-32">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_5%_75%,rgba(16,185,129,0.28),transparent_28%),radial-gradient(circle_at_94%_12%,rgba(14,165,233,0.32),transparent_28%)]" />
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Social proof"
            title={<>Trusted by <span className="bg-brand-gradient bg-clip-text text-transparent">forward-thinking educators.</span></>}
            description="Institutions across India are already running paperless, peaceful, and fair examination systems with PWS."
          />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
            {[
              ['2,500+', 'Students examined'],
              ['400+', 'Sessions generated'],
              ['10,000+', 'Slips generated'],
              ['100%', 'Paperless success rate']
            ].map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className="rounded-2xl border border-slate-200 bg-white/90 px-4 py-5 text-center shadow-sm sm:px-5 sm:py-6"
              >
                <p className="text-2xl font-bold tracking-tight text-cyan-600 sm:text-3xl">{value}</p>
                <p className="mt-1.5 text-xs font-medium text-slate-600 sm:text-sm">{label}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ['Dr. Rajesh Kulkarni', 'Principal · Pune Institute of Technology', 'The anti-cheating measures are rock-solid. We have run paperless practical exams for two semesters and the results have been fair, transparent, and instant.'],
              ['Ms. Priya Desai', 'Academic Coordinator · Symbiosis College', 'The real-time dashboard is a game-changer. We can check every student score within seconds, while automated attendance saves hours each week.'],
              ['Prof. Vikram Naik', 'Lab Examiner · DY Patil University', 'Students love typing their code directly instead of handwriting it. The environment is clean, fair, and completely distraction-free.'],
              ['Dr. Sunita Joshi', 'Exam Controller · SPPU Affiliated College', 'Question slip randomization is brilliant — each student gets a unique set. Our confidence in exam integrity has never been higher.']
            ].map(([name, role, quote], index) => (
              <motion.figure
                key={name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="flex min-h-[270px] flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, star) => <Star key={star} size={14} fill="currentColor" />)}
                </div>
                <Quote size={24} className="mt-4 text-slate-100" />
                <blockquote className="mt-1 flex-1 text-sm leading-6 text-slate-600">&ldquo;{quote}&rdquo;</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                    {(name as string).charAt(3)}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-slate-800">{name}</p>
                    <p className="mt-0.5 text-[10px] leading-4 text-slate-400">{role}</p>
                  </div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {['100% Paperless', 'Tamper-proof audit logs', 'GDPR compliant', 'AES-256 encrypted', 'Zero downtime SLA'].map(
              (item) => (
                <span key={item} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ─── CTA section ───────────────────────────────────── */}
      <section id="demo" className="px-5 py-24 sm:px-8 sm:py-32">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-slate-950 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">Bring clarity to campus</p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.055em] text-white sm:text-5xl">
              Ready to upgrade your campus?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              See how Nextsolves and PWS can make your next exam cycle more organized, fair, and effortless.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary px-7 py-3.5 text-sm"
                id="footer-book-demo"
              >
                Book a PWS Demo <ChevronRight size={17} />
              </button>
              <a
                href="#why-pws"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                See the difference <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Footer ────────────────────────────────────────── */}
      <footer className="border-t border-slate-200 bg-slate-50 px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-7 sm:flex-row">
          <div className="flex items-center gap-4">
            <Image src="/nextsolves-logo.png" alt="Nextsolves" width={130} height={70} className="h-10 w-auto object-contain" />
            <span className="h-5 w-px bg-slate-300" />
            <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} Nextsolves</p>
          </div>
          <div className="flex items-center gap-6 text-xs font-medium text-slate-500">
            <a href="#" className="transition hover:text-slate-900">Privacy</a>
            <a href="#" className="transition hover:text-slate-900">Terms</a>
            <a href="#why-pws" className="transition hover:text-slate-900">Why PWS</a>
            <a href="mailto:hello@nextsolves.com" className="transition hover:text-slate-900">Contact</a>
          </div>
        </div>
      </footer>

      {/* ─── Global overlays ───────────────────────────────── */}
      <DemoBookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <StickyCtaBanner onBookDemo={() => setModalOpen(true)} />
    </main>
  );
}
