'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '@/i18n/routing';
import { Search, X, Briefcase, Award, CreditCard, ArrowRight, Loader2 } from 'lucide-react';

interface SearchResultItem {
  id: string;
  title: string;
  titleHi?: string | null;
  slug: string;
  category: {
    slug: string;
    name: string;
    nameHi?: string | null;
  };
  organization: {
    shortName: string;
  };
  applicationEndDate?: string | null;
  examDate?: string | null;
}

export function GlobalSearchModal({
  isOpen,
  onClose,
  locale,
}: {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isHindi = locale === 'hi';

  const quickTags = [
    'UPSC',
    'SSC CGL',
    'RRB NTPC',
    'UP Police',
    'IBPS PO',
    'NEET 2026',
    'Admit Card',
    '10+2 Pass',
  ];

  // Hotkey listener: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled by parent or toggle
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data.items || []);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (slug: string) => {
    onClose();
    router.push(`/notification/${slug}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800 gap-3 bg-slate-50 dark:bg-slate-800/50">
          <Search className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isHindi
                ? 'भर्ती, परीक्षा, एडमिट कार्ड या परिणाम खोजें... (उदा. UPSC, SSC, RRB)'
                : 'Search Jobs, Exams, Results, Admit Cards... (e.g. UPSC, SSC, RRB)'
            }
            className="w-full bg-transparent text-sm sm:text-base text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
          />
          {isLoading ? (
            <Loader2 className="w-5 h-5 text-slate-400 animate-spin shrink-0" />
          ) : query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="text-xs bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded hover:bg-slate-300 shrink-0 font-medium"
          >
            ESC
          </button>
        </div>

        {/* Quick Search Suggestions */}
        {!query && (
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 text-xs">
            <span className="font-semibold text-slate-500 dark:text-slate-400 block mb-2 uppercase tracking-wider text-[11px]">
              {isHindi ? 'त्वरित खोज:' : 'Popular Searches:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-red-50 hover:text-red-700 dark:hover:bg-slate-700 dark:hover:text-amber-400 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
          {query && !isLoading && results.length === 0 && (
            <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
              {isHindi ? 'कोई परिणाम नहीं मिला।' : 'No notifications found matching your search.'}
            </div>
          )}

          {results.map((item) => {
            const displayTitle = isHindi && item.titleHi ? item.titleHi : item.title;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.slug)}
                className="w-full text-left p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors flex items-center justify-between group"
              >
                <div className="pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300">
                      {item.organization.shortName}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                      {isHindi && item.category.nameHi ? item.category.nameHi : item.category.name}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-red-700 dark:group-hover:text-yellow-400 transition-colors line-clamp-1">
                    {displayTitle}
                  </h4>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all shrink-0" />
              </button>
            );
          })}
        </div>

        {/* Search Footer */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/40 text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 flex justify-between">
          <span>{isHindi ? 'आधिकारिक सूचना पोर्टल' : 'Official Portal Verified Information'}</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
}
