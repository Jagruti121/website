import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AnimatedBackground } from '@/components/animated-background';

// Self-hosted via next/font — no external network request, font-display:swap auto-applied
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});


export const metadata: Metadata = {
  metadataBase: new URL('https://nextsolves.com'),
  title: {
    default: 'NextSolves | PWS — Enterprise Campus Examination Platform',
    template: '%s | NextSolves'
  },
  description:
    'NextSolves PWS (Practical Workflow System) digitizes and automates the complete academic examination lifecycle — from question paper distribution to instant grading — for colleges and universities.',
  keywords: [
    'PWS',
    'Practical Workflow System',
    'campus exam automation',
    'paperless exams',
    'NextSolves',
    'college exam platform',
    'digital practical exams',
    'exam management software'
  ],
  authors: [{ name: 'NextSolves', url: 'https://nextsolves.com' }],
  creator: 'NextSolves',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://nextsolves.com',
    siteName: 'NextSolves',
    title: 'NextSolves PWS — The Enterprise Campus Examination OS',
    description:
      'Automate practical exams end-to-end. Real-time grading, randomized question slips, live faculty dashboards, and tamper-proof audit trails.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'NextSolves PWS Dashboard' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextSolves PWS — Campus Examination Platform',
    description: 'Paperless, fair, and automated practical exams for forward-thinking institutions.',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' }
  }
};

// JSON-LD structured data
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NextSolves',
  url: 'https://nextsolves.com',
  logo: 'https://nextsolves.com/nextsolves-logo.png',
  description: 'NextSolves digitizes and automates the complete academic lifecycle for colleges and universities.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@nextsolves.com',
    contactType: 'sales'
  },
  sameAs: ['https://linkedin.com/company/nextsolves']
};

const softwareApplicationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'PWS — Practical Workflow System',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'INR',
    description: 'Contact for enterprise pricing'
  },
  description:
    'PWS (Practical Workflow System) by NextSolves transforms practical examination management with real-time grading, paperless workflows, and tamper-proof audit trails for educational institutions.',
  featureList: [
    'Automated exam distribution',
    'Randomized question slip assignment',
    'Real-time MCQ auto-grading',
    'Live faculty oversight dashboard',
    'AES-256 encrypted data storage',
    'Tamper-proof audit trail'
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '87',
    bestRating: '5'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Preconnect tags removed — next/font self-hosts the font, no external requests */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
        />
      </head>
      <body className="relative">
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
