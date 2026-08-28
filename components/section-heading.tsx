'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  centered?: boolean;
};

export function SectionHeading({ eyebrow, title, description, centered = true }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-5 text-base leading-8 text-slate-500 sm:text-lg">{description}</p> : null}
    </motion.div>
  );
}
