'use client';

import React, { useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { Search, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { GlobalSearchModal } from '@/components/search/GlobalSearchModal';

interface NavbarProps {
  locale: string;
}

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const isHindi = locale === 'hi';

  const navLinks = [
    { label: isHindi ? 'होम' : 'HOME', href: '/' },
    { label: isHindi ? 'लेटेस्ट जॉब' : 'LATEST JOBS', href: '/latest-jobs' },
    { label: isHindi ? 'एडमिट कार्ड' : 'ADMIT CARD', href: '/admit-cards' },
    { label: isHindi ? 'रिजल्ट' : 'RESULTS', href: '/results' },
    { label: isHindi ? 'आंसर की' : 'ANSWER KEY', href: '/answer-keys' },
    { label: isHindi ? 'सिलेबस' : 'SYLLABUS', href: '/syllabus' },
    { label: isHindi ? 'एडमिशन' : 'ADMISSION', href: '/admissions' },
    { label: isHindi ? 'छात्रवृत्ति' : 'SCHOLARSHIP', href: '/scholarships' },
  ];

  const moreLinks = [
    { label: 'UPSC Recruitment', href: '/latest-jobs?org=UPSC' },
    { label: 'SSC Recruitment', href: '/latest-jobs?org=SSC' },
    { label: 'Railway RRB Jobs', href: '/latest-jobs?org=RRB' },
    { label: 'Banking IBPS Jobs', href: '/latest-jobs?org=IBPS' },
    { label: 'State Police Bharti', href: '/latest-jobs?category=Police' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className="w-full bg-[var(--nav-bg)] text-white border-b border-black/40 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-between h-12">
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-amber-400 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-0.5 lg:space-x-1 text-[13px] font-bold tracking-tight">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded transition-colors whitespace-nowrap ${
                    active
                      ? 'bg-red-800 text-yellow-300 shadow-inner'
                      : 'text-slate-100 hover:text-yellow-300 hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* More Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className="flex items-center gap-1 px-3 py-2 rounded text-slate-100 hover:text-yellow-300 hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                <span>{isHindi ? 'अन्य' : 'MORE'}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {moreDropdownOpen && (
                <div
                  className="absolute left-0 mt-1 w-48 rounded-md shadow-lg bg-slate-900 border border-slate-700 py-1.5 z-50 text-xs"
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                >
                  {moreLinks.map((sub) => (
                    <Link
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setMoreDropdownOpen(false)}
                      className="block px-4 py-2 text-slate-200 hover:bg-red-800 hover:text-yellow-300"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search Trigger Button */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-slate-100 px-3 py-1.5 rounded-full text-xs font-semibold transition-all hover:border-amber-400 group"
            >
              <Search className="w-3.5 h-3.5 text-yellow-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">
                {isHindi ? 'खोजें (Ctrl+K)' : 'Search Jobs, Exams (Ctrl+K)'}
              </span>
              <span className="sm:hidden">{isHindi ? 'खोजें' : 'Search'}</span>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-3 space-y-1 text-sm font-semibold">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded ${
                  isActive(link.href)
                    ? 'bg-red-800 text-yellow-300'
                    : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-slate-800 my-2 pt-2">
              <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider px-3 mb-1">
                Direct Categories
              </div>
              {moreLinks.map((sub) => (
                <Link
                  key={sub.label}
                  href={sub.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-1.5 text-slate-300 hover:text-yellow-300 text-xs"
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        locale={locale}
      />
    </>
  );
}
