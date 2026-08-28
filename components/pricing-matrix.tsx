'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, Sparkles, ArrowRight, Star } from 'lucide-react';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'For small colleges',
    monthlyPrice: 4999,
    color: 'border-slate-200',
    cta: 'Get Started',
    ctaStyle: 'border border-slate-200 bg-white text-slate-800 hover:bg-slate-50',
    popular: false
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'For growing institutions',
    monthlyPrice: 12999,
    color: 'border-teal-300',
    cta: 'Start Free Trial',
    ctaStyle: 'bg-brand-gradient text-white shadow-[0_8px_20px_rgba(17,183,162,0.25)]',
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'For universities & networks',
    monthlyPrice: null, // custom pricing
    color: 'border-slate-700',
    cta: 'Contact Sales',
    ctaStyle: 'border border-teal-500/50 bg-slate-800 text-teal-400 hover:bg-slate-700',
    popular: false
  }
] as const;

const FEATURES = [
  { label: 'Active Students', starter: 'Up to 500', professional: 'Up to 2,000', enterprise: 'Unlimited' },
  { label: 'Concurrent Exams', starter: '5', professional: '25', enterprise: 'Unlimited' },
  { label: 'MCQ Auto-Grading', starter: true, professional: true, enterprise: true },
  { label: 'Question Bank', starter: '100 questions', professional: '2,000 questions', enterprise: 'Unlimited' },
  { label: 'Live Dashboard', starter: true, professional: true, enterprise: true },
  { label: 'Random Slip Distribution', starter: true, professional: true, enterprise: true },
  { label: 'Audit Trail & Logs', starter: false, professional: true, enterprise: true },
  { label: 'Analytics & Exports', starter: false, professional: true, enterprise: true },
  { label: 'API Access', starter: false, professional: false, enterprise: true },
  { label: 'Custom Integrations', starter: false, professional: false, enterprise: true },
  { label: 'Dedicated CSM', starter: false, professional: false, enterprise: true },
  { label: 'SLA & Uptime Guarantee', starter: '99%', professional: '99.9%', enterprise: '99.99%' },
  { label: 'Data Residency', starter: false, professional: 'India', enterprise: 'Custom' },
  { label: 'Priority Support', starter: false, professional: 'Email', enterprise: '24/7 Phone + Email' }
];

type CellValue = boolean | string | null;

function Cell({ value }: { value: CellValue }) {
  if (value === true)
    return <Check size={16} className="text-teal-600 mx-auto" aria-label="Included" />;
  if (value === false)
    return <Minus size={14} className="text-slate-300 mx-auto" aria-label="Not included" />;
  return <span className="text-xs font-medium text-slate-700">{value}</span>;
}

export function PricingMatrix({ onBookDemo }: { onBookDemo: () => void }) {
  const [annual, setAnnual] = useState(false);

  const displayPrice = (monthly: number | null) => {
    if (monthly === null) return null;
    return annual ? Math.round(monthly * 0.8) : monthly;
  };

  return (
    <div className="relative">
      {/* Ambient orb */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-96 w-96 rounded-full bg-teal-300/10 blur-3xl -z-10" />

      {/* Billing toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
          <button
            onClick={() => setAnnual(false)}
            className={`rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-200 ${!annual ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`rounded-xl px-5 py-2 text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${annual ? 'bg-slate-950 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Annual
            <AnimatePresence>
              {annual ? null : (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700"
                >
                  Save 20%
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Plan cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {PLANS.map((plan) => {
          const price = displayPrice(plan.monthlyPrice);
          return (
            <motion.div
              key={plan.id}
              layout
              className={`relative rounded-3xl border-2 p-6 transition-all duration-300 ${
                plan.id === 'enterprise'
                  ? 'bg-slate-950 text-white ' + plan.color
                  : 'bg-white ' + plan.color
              } ${plan.popular ? 'shadow-[0_0_0_4px_rgba(17,183,162,0.15)]' : 'shadow-sm'}`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-gradient px-3.5 py-1.5 text-xs font-bold text-white shadow-sm">
                    <Star size={11} fill="currentColor" /> Most Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${plan.id === 'enterprise' ? 'text-teal-400' : 'text-slate-400'}`}>
                  {plan.name}
                </p>
                <p className={`text-sm ${plan.id === 'enterprise' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.tagline}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                {price !== null ? (
                  <div className="flex items-end gap-1">
                    <span className={`text-4xl font-bold tracking-tight ${plan.id === 'enterprise' ? 'text-white' : 'text-slate-950'}`}>
                      ₹
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={price + (annual ? 'a' : 'm')}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                        >
                          {price.toLocaleString('en-IN')}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span className={`mb-1 text-sm ${plan.id === 'enterprise' ? 'text-slate-400' : 'text-slate-400'}`}>
                      / month
                    </span>
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-teal-400">Custom</p>
                )}
                {annual && price !== null && (
                  <p className="mt-1 text-xs font-medium text-emerald-500">
                    Billed annually — save ₹{(plan.monthlyPrice! * 0.2 * 12).toLocaleString('en-IN')}/yr
                  </p>
                )}
              </div>

              <button
                onClick={plan.id === 'enterprise' ? onBookDemo : undefined}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold transition-all duration-200 hover:-translate-y-0.5 ${plan.ctaStyle}`}
              >
                {plan.cta} <ArrowRight size={14} />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Feature comparison table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[600px]">
          <thead className="sticky top-0 z-10 bg-white border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-400 w-[40%]">
                Feature
              </th>
              {PLANS.map((p) => (
                <th
                  key={p.id}
                  className={`px-4 py-4 text-center text-sm font-bold ${
                    p.id === 'enterprise' ? 'text-slate-950' : p.popular ? 'text-teal-700' : 'text-slate-700'
                  }`}
                >
                  {p.name}
                  {p.popular && <Sparkles size={12} className="inline ml-1 text-teal-500" />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {FEATURES.map((f, i) => (
              <tr key={f.label} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                <td className="px-6 py-3.5 text-sm text-slate-600">{f.label}</td>
                <td className="px-4 py-3.5 text-center">
                  <Cell value={f.starter as CellValue} />
                </td>
                <td className="px-4 py-3.5 text-center bg-teal-50/40">
                  <Cell value={f.professional as CellValue} />
                </td>
                <td className="px-4 py-3.5 text-center">
                  <Cell value={f.enterprise as CellValue} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer note */}
      <p className="mt-6 text-center text-xs text-slate-400">
        All plans include onboarding, documentation, and data migration support.
        Prices in INR, exclusive of GST.
      </p>
    </div>
  );
}
