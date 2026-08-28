'use client';

import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CalendarCheck, X } from 'lucide-react';

export function StickyCtaBanner({ onBookDemo }: { onBookDemo: () => void }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (v > 0.3 && !dismissed) setVisible(true);
      else if (v <= 0.3) setVisible(false);
    });
    return () => unsub();
  }, [scrollYProgress, dismissed]);

  function handleDismiss() {
    setDismissed(true);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-cta"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 w-[calc(100%-2.5rem)] max-w-lg"
        >
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/20 bg-slate-950/95 backdrop-blur-xl px-5 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            {/* Left content */}
            <div className="flex items-center gap-3 min-w-0">
              <span className="shrink-0 grid h-10 w-10 place-items-center rounded-xl bg-teal-500/15 text-teal-400">
                <CalendarCheck size={20} />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white leading-tight truncate">
                  Ready to see PWS in action?
                </p>
                <p className="text-xs text-slate-400 mt-0.5 hidden sm:block">
                  Get a personalized demo — 30 minutes, zero commitment
                </p>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onBookDemo}
                className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-4 py-2 text-xs font-bold text-white shadow-[0_6px_20px_rgba(17,183,162,0.3)] transition hover:opacity-90 hover:-translate-y-0.5"
              >
                <CalendarCheck size={13} />
                <span className="hidden sm:inline">Book PWS Demo</span>
                <span className="sm:hidden">Book Demo</span>
              </button>
              <button
                onClick={handleDismiss}
                aria-label="Dismiss"
                className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
