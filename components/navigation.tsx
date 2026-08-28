'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const links = [
  { label: 'Features', href: '#features' },
  { label: 'Why PWS', href: '#why-pws' },
  { label: 'For Faculty', href: '#audiences' }
];

export function Navigation({ onBookDemo }: { onBookDemo?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleBookDemo() {
    setIsOpen(false);
    onBookDemo?.();
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/85 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2" aria-label="Nextsolves home">
          <Image
            src="/nextsolves-logo.png"
            alt="Nextsolves"
            width={150}
            height={82}
            priority
            className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-5 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-slate-950 ${
                link.label === 'Why PWS'
                  ? 'rounded-full border border-teal-200 bg-teal-50 px-3.5 py-1.5 text-teal-700 hover:bg-teal-100'
                  : 'text-slate-600'
              }`}
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={handleBookDemo}
            className="btn-primary px-5 py-2.5 text-sm"
            id="nav-book-demo"
          >
            Book a demo
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-800 md:hidden"
        >
          {isOpen ? <X size={19} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="overflow-hidden border-t border-slate-100 bg-white md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4 sm:px-8">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  {link.label}
                </a>
              ))}

              <button
                onClick={handleBookDemo}
                className="btn-primary mt-3 justify-center px-5 py-3 text-sm"
              >
                Book a demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
