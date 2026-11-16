'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { Sun, Moon, Laptop } from 'lucide-react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle theme mode"
        className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded border border-white/30 bg-black/20 text-white hover:bg-black/40 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        {resolvedTheme === 'dark' ? (
          <Moon className="w-3.5 h-3.5 text-yellow-300" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-yellow-300" />
        )}
        <span className="capitalize hidden sm:inline">{theme}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-32 origin-top-right rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black/10 dark:ring-white/10 z-50 py-1 text-xs text-slate-800 dark:text-slate-100">
          <button
            type="button"
            onClick={() => {
              setTheme('light');
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-slate-100 dark:hover:bg-slate-700 ${
              theme === 'light' ? 'font-bold text-red-700 dark:text-yellow-400' : ''
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            Light
          </button>
          <button
            type="button"
            onClick={() => {
              setTheme('dark');
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-slate-100 dark:hover:bg-slate-700 ${
              theme === 'dark' ? 'font-bold text-red-700 dark:text-yellow-400' : ''
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-blue-400" />
            Dark
          </button>
          <button
            type="button"
            onClick={() => {
              setTheme('system');
              setIsOpen(false);
            }}
            className={`w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-slate-100 dark:hover:bg-slate-700 ${
              theme === 'system' ? 'font-bold text-red-700 dark:text-yellow-400' : ''
            }`}
          >
            <Laptop className="w-3.5 h-3.5 text-slate-500" />
            System
          </button>
        </div>
      )}
    </div>
  );
}
