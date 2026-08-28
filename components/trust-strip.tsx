'use client';

import { ShieldCheck, Zap, Lock, Globe } from 'lucide-react';

const LOGOS = [
  'Pune University',
  'Symbiosis',
  'DY Patil',
  'SPPU',
  'MIT College',
  'VIT Pune',
  'COEP',
  'Cummins College'
];

const BADGES = [
  { icon: ShieldCheck, label: 'AES-256 Encrypted', sub: 'Military-grade security' },
  { icon: Zap, label: '99.9% Uptime SLA', sub: 'Always available' },
  { icon: Lock, label: 'GDPR Compliant', sub: 'Privacy first' },
  { icon: Globe, label: 'ISO 27001 Ready', sub: 'Enterprise standards' }
];

export function TrustStrip() {
  // Duplicate for seamless loop
  const allLogos = [...LOGOS, ...LOGOS];

  return (
    <section className="relative border-y border-slate-200/70 bg-white/60 backdrop-blur-sm py-8 overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white/80 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white/80 to-transparent" />

      {/* Top row: logo marquee */}
      <div className="overflow-hidden mb-7">
        <div className="marquee-inner">
          {allLogos.map((logo, i) => (
            <span
              key={i}
              className="mx-8 inline-flex items-center text-sm font-bold tracking-tight text-slate-300 grayscale transition-all duration-300 hover:text-slate-500 hover:grayscale-0 select-none shrink-0"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom row: security badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 px-5">
        {BADGES.map(({ icon: Icon, label, sub }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm transition hover:border-teal-200 hover:shadow-md"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-teal-50 text-teal-600">
              <Icon size={14} />
            </span>
            <div>
              <p className="text-xs font-bold text-slate-700 leading-none">{label}</p>
              <p className="mt-0.5 text-[10px] text-slate-400">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
