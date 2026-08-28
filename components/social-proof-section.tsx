'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { X, Star, Quote, Play } from 'lucide-react';

const METRICS = [
  { value: '10,000+', label: 'Students examined', color: 'text-cyan-600' },
  { value: '500+', label: 'Exams conducted', color: 'text-violet-600' },
  { value: '40%', label: 'Faster dispatch', color: 'text-emerald-600' },
  { value: '0', label: 'Data breaches ever', color: 'text-teal-600' },
  { value: '100%', label: 'Paperless success', color: 'text-blue-600' },
  { value: '12s', label: 'Average grade time', color: 'text-amber-600' }
];

const TESTIMONIALS = [
  {
    name: 'Dr. Rajesh Kulkarni',
    role: 'Principal',
    institution: 'Pune Institute of Technology',
    quote:
      'The anti-cheating measures are rock-solid. We have run paperless practical exams for two semesters and the results have been fair, transparent, and instant.',
    videoId: 'dQw4w9WgXcQ', // placeholder
    rating: 5,
    highlight: 'Rock-solid integrity'
  },
  {
    name: 'Ms. Priya Desai',
    role: 'Academic Coordinator',
    institution: 'Symbiosis College',
    quote:
      'The real-time dashboard is a game-changer. We can check every student score within seconds, while automated attendance saves hours each week.',
    videoId: null,
    rating: 5,
    highlight: 'Hours saved weekly'
  },
  {
    name: 'Prof. Vikram Naik',
    role: 'Lab Examiner',
    institution: 'DY Patil University',
    quote:
      'Students love typing their code directly instead of handwriting it. The environment is clean, fair, and completely distraction-free.',
    videoId: 'dQw4w9WgXcQ',
    rating: 5,
    highlight: 'Student-loved UX'
  },
  {
    name: 'Dr. Sunita Joshi',
    role: 'Exam Controller',
    institution: 'SPPU Affiliated College',
    quote:
      'Question slip randomization is brilliant — each student gets a unique set. Our confidence in exam integrity has never been higher.',
    videoId: null,
    rating: 5,
    highlight: 'Bulletproof fairness'
  }
];

function VideoModal({
  videoId,
  name,
  onClose
}: {
  videoId: string;
  name: string;
  onClose: () => void;
}) {
  return (
    <Dialog open={true} onClose={onClose} className="relative z-[90]">
      <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" />
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl rounded-[24px] overflow-hidden bg-slate-950 shadow-modal"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <p className="text-sm font-semibold text-white">{name} — Testimonial Video</p>
            <button
              onClick={onClose}
              aria-label="Close video"
              className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-slate-400 hover:text-white transition"
            >
              <X size={15} />
            </button>
          </div>
          <div className="relative aspect-video bg-slate-900">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              allow="autoplay; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
              title={`${name} video testimonial`}
            />
          </div>
        </motion.div>
      </div>
    </Dialog>
  );
}

export function SocialProofSection() {
  const [activeVideo, setActiveVideo] = useState<{ id: string; name: string } | null>(null);

  return (
    <section className="relative overflow-hidden border-y border-slate-100 bg-slate-50/70 px-5 py-24 sm:px-8 sm:py-32">
      {/* Ambient bg */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_5%_75%,rgba(204,251,241,0.55),transparent_24%),radial-gradient(circle_at_94%_12%,rgba(224,242,254,0.72),transparent_24%)]" />

      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="text-center mb-14">
          <p className="eyebrow">Social Proof</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Trusted by{' '}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              forward-thinking educators
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-500">
            Institutions across India are already running paperless, peaceful, and fair examination systems with PWS.
          </p>
        </div>

        {/* Masonry metric grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 mb-12">
          {METRICS.map(({ value, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className={`rounded-3xl border border-slate-200 bg-white/85 px-5 py-6 text-center shadow-sm backdrop-blur-sm ${i === 0 || i === 5 ? 'sm:col-span-1' : ''}`}
            >
              <p className={`text-3xl font-bold tracking-tight ${color}`}>{value}</p>
              <p className="mt-2 text-sm font-medium text-slate-500">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonial cards grid */}
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-8">
          {TESTIMONIALS.map(({ name, role, institution, quote, videoId, rating, highlight }, i) => (
            <motion.figure
              key={name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="flex min-h-[280px] flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-card transition-shadow"
            >
              {/* Rating stars */}
              <div className="flex gap-0.5 text-amber-400">
                {Array.from({ length: rating }).map((_, j) => (
                  <Star key={j} size={13} fill="currentColor" />
                ))}
              </div>

              {/* Highlight badge */}
              <span className="mt-3 inline-block rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-700 border border-teal-100">
                {highlight}
              </span>

              <Quote size={22} className="mt-4 text-slate-100" />
              <blockquote className="mt-1 flex-1 text-sm leading-6 text-slate-600">
                "{quote}"
              </blockquote>

              <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-gradient text-xs font-bold text-white">
                  {name.charAt(3)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-slate-800 truncate">{name}</p>
                  <p className="mt-0.5 text-[10px] leading-4 text-slate-400 truncate">
                    {role} · {institution}
                  </p>
                </div>
                {/* Video trigger */}
                {videoId && (
                  <button
                    onClick={() => setActiveVideo({ id: videoId, name })}
                    aria-label={`Watch ${name}'s video`}
                    className="shrink-0 grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-teal-50 hover:text-teal-600"
                  >
                    <Play size={12} fill="currentColor" />
                  </button>
                )}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Compliance badges */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {[
            '100% Paperless',
            'Tamper-proof audit logs',
            'GDPR compliant',
            'AES-256 encrypted',
            'Zero downtime SLA'
          ].map((item) => (
            <span
              key={item}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Video modal */}
      {activeVideo && (
        <VideoModal
          videoId={activeVideo.id}
          name={activeVideo.name}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </section>
  );
}
