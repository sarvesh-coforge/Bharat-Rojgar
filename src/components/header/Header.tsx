'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { LanguageSwitcher } from '@/components/navigation/LanguageSwitcher';
import { ShieldCheck, PhoneCall, HelpCircle } from 'lucide-react';

export function Header({ locale }: { locale: string }) {
  const isHindi = locale === 'hi';

  return (
    <header className="w-full bg-[var(--header-bg)] text-white shadow-md border-b-2 border-amber-500">
      {/* Top micro bar for accessibility, theme, and language */}
      <div className="bg-black/30 border-b border-white/10 text-xs py-1 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-white/90">
            <span className="inline-flex items-center gap-1 font-medium bg-red-950/60 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded text-[11px]">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              {isHindi ? 'प्रमाणित आधिकारिक सूचना पोर्टल' : 'Verified Official Updates Portal'}
            </span>
            <span className="hidden md:inline text-white/60">•</span>
            <span className="hidden md:inline text-white/80">
              {isHindi ? 'अभ्यर्थी सीधे आधिकारिक वेबसाइट पर ही आवेदन करें' : 'Aspirants must apply only on official government portals'}
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <LanguageSwitcher currentLocale={locale} />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main Branding Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 text-center md:text-left group">
          {/* Emblem Logo */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-amber-400 via-orange-500 to-amber-300 p-0.5 shadow-lg flex-shrink-0 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-[var(--header-bg)] flex flex-col items-center justify-center text-center p-1 border border-white/20">
              <span className="text-[8px] font-black tracking-widest text-amber-300 leading-none">SARKARI</span>
              <span className="text-[12px] font-black text-white leading-tight">SS</span>
              <span className="text-[7px] font-bold text-orange-300 leading-none">SELECT</span>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight uppercase drop-shadow-sm font-sans flex items-center gap-2 justify-center md:justify-start">
              <span>{isHindi ? 'सरकारी सिलेक्शन' : 'SARKARI SELECTION'}</span>
              <span className="text-xs bg-amber-400 text-slate-900 font-bold px-1.5 py-0.5 rounded shadow-xs uppercase tracking-normal">
                .COM
              </span>
            </h1>
            <p className="text-xs sm:text-sm font-medium text-amber-200 tracking-wide mt-0.5">
              {isHindi
                ? 'सरकारी नौकरी, परीक्षा परिणाम, एडमिट कार्ड एवं भर्ती सूचना 2026'
                : 'Official Government Jobs, Results, Admit Cards & Recruitment Portal 2026'}
            </p>
          </div>
        </Link>

        {/* Header Badges / Helpline info */}
        <div className="hidden lg:flex items-center gap-4 text-xs">
          <div className="bg-black/25 border border-white/20 rounded-md p-2 text-right">
            <div className="text-[11px] text-white/70">Toll-Free Aspirant Helpline</div>
            <div className="text-amber-300 font-bold flex items-center justify-end gap-1 text-sm">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              1800-111-2026
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
