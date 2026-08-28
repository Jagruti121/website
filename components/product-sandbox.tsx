'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  LayoutDashboard,
  ClipboardCheck,
  BarChart3,
  Users,
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Activity,
  BookOpen
} from 'lucide-react';

const TABS = [
  { id: 'console', label: 'Exam Console', icon: LayoutDashboard, color: 'cyan' },
  { id: 'faculty', label: 'Faculty Desk', icon: ClipboardCheck, color: 'emerald' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'violet' }
] as const;

type TabId = (typeof TABS)[number]['id'];

/* ── Exam Console Tab ─────────────────────────────────────── */
function ExamConsoleTab() {
  const students = [
    { name: 'Aarav Kulkarni', slip: 'Slip #04', status: 'submitted', time: '12m ago' },
    { name: 'Priya Deshmukh', slip: 'Slip #11', status: 'in-progress', time: 'Active now' },
    { name: 'Rohan Pawar', slip: 'Slip #07', status: 'submitted', time: '4m ago' },
    { name: 'Sneha Joshi', slip: 'Slip #02', status: 'reviewing', time: '2m ago' },
    { name: 'Dev Naik', slip: 'Slip #15', status: 'in-progress', time: 'Active now' }
  ];

  const statusStyles: Record<string, string> = {
    submitted: 'bg-emerald-50 text-emerald-700',
    'in-progress': 'bg-cyan-50 text-cyan-700',
    reviewing: 'bg-amber-50 text-amber-700'
  };

  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          ['42', 'Present', 'text-cyan-600', 'bg-cyan-50'],
          ['36', 'Submitted', 'text-emerald-600', 'bg-emerald-50'],
          ['06', 'In Progress', 'text-violet-600', 'bg-violet-50']
        ].map(([val, label, tc, bg]) => (
          <div key={label} className={`rounded-2xl ${bg} p-3.5 text-center`}>
            <p className={`text-2xl font-bold ${tc}`}>{val}</p>
            <p className="mt-0.5 text-xs font-medium text-slate-500">{label}</p>
          </div>
        ))}
      </div>
      {/* Student list */}
      <div className="rounded-2xl border border-slate-100 bg-white overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Live Activity</span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
          </span>
        </div>
        <div className="divide-y divide-slate-50">
          {students.map((s) => (
            <div key={s.name} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-full bg-slate-100 grid place-items-center text-xs font-bold text-slate-600">
                  {s.name[0]}
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">{s.name}</p>
                  <p className="text-[10px] text-slate-400">{s.slip}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold capitalize ${statusStyles[s.status]}`}>
                  {s.status.replace('-', ' ')}
                </span>
                <span className="text-[10px] text-slate-400">{s.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Faculty Desk Tab ─────────────────────────────────────── */
function FacultyDeskTab() {
  const [selectedQ, setSelectedQ] = useState<number | null>(0);
  const questions = [
    { title: 'Web Server Setup', type: 'Practical', pending: 3 },
    { title: 'Database Design MCQ', type: 'MCQ', pending: 0, autoGraded: true },
    { title: 'Algorithm Trace', type: 'Practical', pending: 6 },
    { title: 'Network Config', type: 'Practical', pending: 2 }
  ];

  return (
    <div className="grid grid-cols-[140px_1fr] gap-3 h-56">
      {/* Question list sidebar */}
      <div className="rounded-2xl border border-slate-100 bg-slate-50 overflow-hidden flex flex-col">
        <p className="px-3 py-2.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-200">Questions</p>
        <div className="flex-1 overflow-auto divide-y divide-slate-100">
          {questions.map((q, i) => (
            <button
              key={i}
              onClick={() => setSelectedQ(i)}
              className={`w-full px-3 py-3 text-left transition-all ${selectedQ === i ? 'bg-white' : 'hover:bg-white/60'}`}
            >
              <p className={`text-xs font-semibold truncate ${selectedQ === i ? 'text-cyan-700' : 'text-slate-700'}`}>{q.title}</p>
              <div className="mt-0.5 flex items-center gap-1">
                <span className="text-[9px] text-slate-400">{q.type}</span>
                {q.autoGraded && <CheckCircle2 size={9} className="text-emerald-500" />}
                {q.pending > 0 && (
                  <span className="ml-auto h-4 w-4 rounded-full bg-amber-100 text-[9px] font-bold text-amber-700 grid place-items-center">
                    {q.pending}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Review panel */}
      {selectedQ !== null && (
        <div className="rounded-2xl border border-slate-100 bg-white flex flex-col overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">{questions[selectedQ].title}</span>
            {questions[selectedQ].autoGraded ? (
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <CheckCircle2 size={12} /> Auto-graded
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                <AlertCircle size={12} /> {questions[selectedQ].pending} to review
              </span>
            )}
          </div>
          <div className="flex-1 p-4 bg-slate-950 rounded-b-xl font-mono text-xs text-emerald-400 overflow-auto">
            <p className="text-slate-500"># Student submission</p>
            <p className="mt-2 text-slate-300">from flask import Flask, jsonify</p>
            <p className="text-slate-300">app = Flask(__name__)</p>
            <p className="mt-2">@app.route(<span className="text-amber-400">'/api/data'</span>)</p>
            <p className="text-green-400">def get_data():</p>
            <p className="ml-4 text-slate-300">return jsonify(<span className="text-cyan-300">{'{'}status: "ok"{'}'}</span>)</p>
            <p className="mt-2 text-slate-500"># Output verified ✓</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Analytics Tab ────────────────────────────────────────── */
function AnalyticsTab() {
  const bars = [72, 85, 61, 90, 78, 94, 68, 88, 75, 92, 83, 97];
  const scoreRanges = [
    { label: '90–100', count: 14, color: 'bg-emerald-500' },
    { label: '70–89', count: 21, color: 'bg-cyan-500' },
    { label: '50–69', count: 8, color: 'bg-amber-500' },
    { label: '<50', count: 2, color: 'bg-red-400' }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {(
          [
            { val: '87.4%', label: 'Avg Score', Icon: Activity },
            { val: '12min', label: 'Avg Grading Time', Icon: Clock },
            { val: '45/45', label: 'Papers Graded', Icon: FileCheck2 },
            { val: '0', label: 'Integrity Flags', Icon: Users }
          ] as { val: string; label: string; Icon: typeof Activity }[]
        ).map(({ val, label, Icon: I }) => (
          <div key={label} className="rounded-2xl border border-slate-100 bg-white p-3 flex items-center gap-3">
            <span className="h-9 w-9 rounded-xl bg-slate-50 grid place-items-center text-slate-500">
              <I size={16} />
            </span>
            <div>
              <p className="text-base font-bold text-slate-900">{val}</p>
              <p className="text-[10px] font-medium text-slate-400">{label}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Score distribution chart */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4">
        <p className="text-xs font-bold text-slate-500 mb-3">Score Distribution</p>
        <div className="flex items-end gap-1 h-16">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: 'easeOut' }}
              className={`flex-1 rounded-t-sm ${i > 9 ? 'bg-teal-500' : 'bg-cyan-100'}`}
            />
          ))}
        </div>
        <div className="mt-3 flex gap-3">
          {scoreRanges.map((r) => (
            <div key={r.label} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${r.color}`} />
              <span className="text-[10px] text-slate-500">{r.label}</span>
              <span className="text-[10px] font-bold text-slate-700">{r.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main export ──────────────────────────────────────────── */
export function ProductSandbox() {
  const [activeTab, setActiveTab] = useState<TabId>('console');

  const tabColorMap: Record<TabId, { active: string; dot: string }> = {
    console: { active: 'border-cyan-500 text-cyan-700 bg-cyan-50', dot: 'bg-cyan-500' },
    faculty: { active: 'border-emerald-500 text-emerald-700 bg-emerald-50', dot: 'bg-emerald-500' },
    analytics: { active: 'border-violet-500 text-violet-700 bg-violet-50', dot: 'bg-violet-500' }
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-card-lg">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-5 py-3.5">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
        <div className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-400 font-mono">
          pws.nextsolves.com/dashboard
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Secure
        </span>
      </div>

      {/* Tab bar */}
      <div className="flex items-center gap-1 border-b border-slate-100 bg-white px-5 pt-3">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-2 rounded-t-xl px-4 py-2.5 text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? tabColorMap[tab.id].active + ' border-b-2'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Icon size={13} />
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="tab-indicator"
                  className={`absolute bottom-0 left-0 right-0 h-0.5 ${tabColorMap[tab.id].dot} rounded-full`}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content area */}
      <div className="p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {activeTab === 'console' && <ExamConsoleTab />}
            {activeTab === 'faculty' && <FacultyDeskTab />}
            {activeTab === 'analytics' && <AnalyticsTab />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sandbox label */}
      <div className="absolute top-3.5 right-16 hidden sm:block">
        <span className="rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-[10px] font-bold text-violet-600">
          <BookOpen size={9} className="inline mr-1" />Interactive Demo
        </span>
      </div>
    </div>
  );
}
