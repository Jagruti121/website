'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  User,
  Building2,
  Phone,
  ShieldCheck,
  RefreshCw,
  Send
} from 'lucide-react';
import { submitLeadCapture } from '@/app/actions';

/* ── Schema: single-step form ────────────────────────────── */
const schema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Enter a valid 10-digit phone number')
    .max(13, 'Phone number too long')
    .regex(/^[+]?[\d\s\-().]{10,13}$/, 'Enter a valid phone number'),
  institution: z.string().min(3, 'Institution name is required')
});

type FormData = z.infer<typeof schema>;

/* ── OTP input: 6 boxes ──────────────────────────────────── */
function OtpBoxes({
  value,
  onChange,
  disabled
}: {
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const digits = value.split('').concat(Array(6).fill('')).slice(0, 6);

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>, idx: number) {
    const input = e.currentTarget;
    if (e.key === 'Backspace' && !input.value && idx > 0) {
      const prev = document.getElementById(`otp-${idx - 1}`) as HTMLInputElement | null;
      prev?.focus();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, idx: number) {
    const char = e.target.value.replace(/\D/g, '').slice(-1);
    const next = digits.map((d, i) => (i === idx ? char : d)).join('');
    onChange(next);
    if (char && idx < 5) {
      const nextEl = document.getElementById(`otp-${idx + 1}`) as HTMLInputElement | null;
      nextEl?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    onChange(pasted);
    const focusIdx = Math.min(pasted.length, 5);
    (document.getElementById(`otp-${focusIdx}`) as HTMLInputElement | null)?.focus();
  }

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {digits.map((d, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d}
          disabled={disabled}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKey(e, i)}
          className={`h-12 w-10 rounded-xl border-2 text-center text-lg font-bold transition-all outline-none
            ${d ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-slate-200 bg-slate-50 text-slate-900'}
            focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-100
            disabled:opacity-50`}
        />
      ))}
    </div>
  );
}

/* ── Main component ───────────────────────────────────────── */
export function DemoBookingModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  // UI state
  const [phase, setPhase] = useState<'form' | 'otp' | 'success'>('form');
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [devOtp, setDevOtp] = useState<string | null>(null); // shown in dev mode only
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [submitting, startSubmit] = useTransition();
  const [successMsg, setSuccessMsg] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  });

  const emailValue = watch('email');

  /* ── Send OTP ── */
  async function handleSendOtp() {
    const emailOk = await trigger('email');
    if (!emailOk) return;

    setSendingOtp(true);
    setOtpError('');
    setOtp('');
    setDevOtp(null);

    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: getValues('email') })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? 'Failed to send OTP');
      setOtpSent(true);
      setPhase('otp');
      if (data.devOtp) setDevOtp(data.devOtp); // visible only in dev
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : 'Could not send OTP. Try again.');
    } finally {
      setSendingOtp(false);
    }
  }

  /* ── Verify OTP ── */
  async function handleVerifyOtp() {
    if (otp.length !== 6) {
      setOtpError('Please enter all 6 digits');
      return;
    }
    setVerifyingOtp(true);
    setOtpError('');
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: getValues('email'), otp })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? 'Verification failed');
      setEmailVerified(true);
      setPhase('form'); // return to form with email verified
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : 'Verification failed. Try again.');
    } finally {
      setVerifyingOtp(false);
    }
  }

  /* ── Final submit ── */
  async function onSubmit(data: FormData) {
    if (!emailVerified) {
      setOtpError('Please verify your email before submitting.');
      return;
    }
    startSubmit(async () => {
      const result = await submitLeadCapture({
        ...data,
        teamSize: '1-10',
        useCases: ['PWS Demo Request'],
        timeline: 'immediately'
      });
      setSuccessMsg(
        result.success
          ? result.message
          : "We've noted your interest! Our team will be in touch within 24 hours."
      );
      setPhase('success');
    });
  }

  /* ── Reset on close ── */
  function handleClose() {
    setPhase('form');
    setOtp('');
    setOtpError('');
    setOtpSent(false);
    setEmailVerified(false);
    setDevOtp(null);
    setSuccessMsg('');
    onClose();
  }

  const inputClass =
    'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-100 transition';

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-[90]">
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/65 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <Dialog.Panel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...{ transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } } as any}
          className="relative w-full max-w-md rounded-[28px] bg-white shadow-modal overflow-hidden"
        >
          {/* Brand accent bar */}
          <div className="h-1 w-full bg-brand-gradient" />

          {/* Header */}
          <div className="flex items-start justify-between px-7 pt-6 pb-5">
            <div>
              <Dialog.Title className="text-xl font-bold tracking-tight text-slate-900">
                {phase === 'success' ? '🎉 Request Submitted!' : 'Book your PWS Demo'}
              </Dialog.Title>
              {phase === 'form' && (
                <p className="mt-1 text-sm text-slate-500">
                  Fill in your details — we'll reach out within 24 hours
                </p>
              )}
              {phase === 'otp' && (
                <p className="mt-1 text-sm text-slate-500">
                  Enter the 6-digit code sent to{' '}
                  <span className="font-semibold text-teal-700 truncate">{emailValue}</span>
                </p>
              )}
            </div>
            <button
              onClick={handleClose}
              aria-label="Close"
              className="ml-4 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-400 transition hover:bg-slate-50 hover:text-slate-700"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="px-7 pb-7 max-h-[70vh] overflow-y-auto">
            <AnimatePresence mode="wait">

              {/* ── Phase: FORM ── */}
              {phase === 'form' && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        <User size={11} className="inline mr-1" />First Name
                      </label>
                      <input {...register('firstName')} placeholder="Priya" className={inputClass} />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Last Name</label>
                      <input {...register('lastName')} placeholder="Desai" className={inputClass} />
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email + OTP trigger */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      <Mail size={11} className="inline mr-1" />Work Email
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          {...register('email')}
                          type="email"
                          placeholder="priya@university.edu.in"
                          disabled={emailVerified}
                          className={`${inputClass} pr-8 ${emailVerified ? 'border-teal-400 bg-teal-50/50 text-teal-800' : ''}`}
                        />
                        {emailVerified && (
                          <CheckCircle2 size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-teal-500" />
                        )}
                      </div>
                      {!emailVerified && (
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          disabled={sendingOtp || !emailValue}
                          className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-teal-600 px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-teal-700 disabled:opacity-50"
                        >
                          {sendingOtp ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : otpSent ? (
                            <RefreshCw size={13} />
                          ) : (
                            <Send size={13} />
                          )}
                          {otpSent ? 'Resend' : 'Send OTP'}
                        </button>
                      )}
                    </div>
                    {emailVerified && (
                      <p className="mt-1 flex items-center gap-1 text-xs font-medium text-teal-600">
                        <CheckCircle2 size={11} /> Email verified
                      </p>
                    )}
                    {errors.email && !emailVerified && (
                      <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                    )}
                    {otpError && phase === 'form' && (
                      <p className="mt-1 text-xs text-red-500">{otpError}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      <Phone size={11} className="inline mr-1" />Phone Number
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      placeholder="+91 98765 43210"
                      className={inputClass}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Institution */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      <Building2 size={11} className="inline mr-1" />Institution Name
                    </label>
                    <input
                      {...register('institution')}
                      placeholder="Symbiosis College, Pune"
                      className={inputClass}
                    />
                    {errors.institution && (
                      <p className="mt-1 text-xs text-red-500">{errors.institution.message}</p>
                    )}
                  </div>

                  {/* OTP required notice */}
                  {!emailVerified && (
                    <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-3">
                      <ShieldCheck size={15} className="mt-0.5 shrink-0 text-amber-600" />
                      <p className="text-xs text-amber-700 font-medium">
                        Please verify your email with an OTP before submitting.
                      </p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!emailVerified || submitting}
                    className="w-full btn-primary justify-center py-3.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed mt-1"
                  >
                    {submitting ? (
                      <><Loader2 size={15} className="animate-spin" /> Submitting…</>
                    ) : (
                      <>Submit Request <ArrowRight size={15} /></>
                    )}
                  </button>
                </motion.form>
              )}

              {/* ── Phase: OTP ── */}
              {phase === 'otp' && (
                <motion.div
                  key="otp"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.22 }}
                  className="text-center space-y-5"
                >
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 mb-1">
                    <Mail size={28} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-700">Check your inbox</p>
                    <p className="mt-1 text-xs text-slate-500">
                      We sent a 6-digit code to{' '}
                      <span className="font-bold text-slate-800">{emailValue}</span>
                    </p>
                  </div>

                  {/* Dev mode helper */}
                  {devOtp && (
                    <div className="rounded-xl border border-violet-200 bg-violet-50 px-4 py-2.5 text-xs font-mono font-bold text-violet-700">
                      DEV MODE — Your OTP: {devOtp}
                    </div>
                  )}

                  <OtpBoxes value={otp} onChange={setOtp} disabled={verifyingOtp} />

                  {otpError && (
                    <p className="text-xs text-red-500 font-medium">{otpError}</p>
                  )}

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={verifyingOtp || otp.length < 6}
                    className="w-full btn-primary justify-center py-3.5 text-sm disabled:opacity-50"
                  >
                    {verifyingOtp ? (
                      <><Loader2 size={15} className="animate-spin" /> Verifying…</>
                    ) : (
                      <><ShieldCheck size={15} /> Verify OTP</>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => setPhase('form')}
                      className="text-xs text-slate-400 hover:text-slate-700 transition"
                    >
                      ← Back to form
                    </button>
                    <span className="text-slate-200">|</span>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={sendingOtp}
                      className="text-xs text-teal-600 font-semibold hover:text-teal-800 transition disabled:opacity-50"
                    >
                      {sendingOtp ? 'Sending…' : 'Resend OTP'}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── Phase: SUCCESS ── */}
              {phase === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.88 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, type: 'spring', bounce: 0.35 }}
                  className="py-4 text-center space-y-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', bounce: 0.5 }}
                    className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 ring-8 ring-emerald-50/80"
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>

                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">You're all set! 🎉</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-500 max-w-xs mx-auto">
                      {successMsg || "We've received your request. Our team will reach out within 24 hours to confirm your PWS demo slot."}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-left space-y-1.5">
                    <p className="text-xs font-bold text-emerald-800">What happens next?</p>
                    {[
                      'Our team reviews your request',
                      'We schedule a 30-minute personalised demo',
                      'You get a live walkthrough of PWS'
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-emerald-700">
                        <CheckCircle2 size={11} className="shrink-0" />
                        {step}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-2 pt-1">
                    <button
                      onClick={handleClose}
                      className="btn-primary justify-center px-6 py-3 text-sm"
                    >
                      Back to NextSolves
                    </button>
                    <a
                      href="mailto:hello@nextsolves.com"
                      className="text-xs font-medium text-slate-400 hover:text-teal-700 transition"
                    >
                      Questions? Email us →
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
