'use client';

import React from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { Globe } from 'lucide-react';

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (newLocale: 'en' | 'hi') => {
    if (newLocale === currentLocale) return;
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 bg-black/20 border border-white/30 rounded px-2 py-0.5 text-xs text-white">
      <Globe className="w-3.5 h-3.5 text-yellow-300 mr-0.5" />
      <button
        type="button"
        onClick={() => handleLanguageChange('en')}
        className={`px-1.5 py-0.5 rounded transition-all font-medium ${
          currentLocale === 'en'
            ? 'bg-white text-red-900 font-bold shadow-xs'
            : 'hover:text-yellow-300'
        }`}
      >
        English
      </button>
      <span className="text-white/40">|</span>
      <button
        type="button"
        onClick={() => handleLanguageChange('hi')}
        className={`px-1.5 py-0.5 rounded transition-all font-medium ${
          currentLocale === 'hi'
            ? 'bg-white text-red-900 font-bold shadow-xs'
            : 'hover:text-yellow-300'
        }`}
      >
        हिंदी
      </button>
    </div>
  );
}
