'use client';

import React, { useState } from 'react';
import { Link, useRouter } from '@/i18n/routing';
import {
  Calendar,
  Building2,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface CategoryListingProps {
  categoryName: string;
  categoryNameHi?: string;
  categorySlug: string;
  description?: string;
  items: any[];
  total: number;
  currentPage: number;
  totalPages: number;
  selectedOrg?: string;
  searchQuery?: string;
  locale: string;
}

export function CategoryListingView({
  categoryName,
  categoryNameHi,
  categorySlug,
  description,
  items,
  total,
  currentPage,
  totalPages,
  selectedOrg = '',
  searchQuery = '',
  locale,
}: CategoryListingProps) {
  const router = useRouter();
  const isHindi = locale === 'hi';
  const [searchInput, setSearchInput] = useState(searchQuery);

  const orgList = ['UPSC', 'SSC', 'RRB', 'IBPS', 'NTA', 'UPSSSC', 'UPPSC'];

  const handleOrgFilter = (org: string) => {
    const params = new URLSearchParams();
    if (org) params.set('org', org);
    if (searchInput) params.set('search', searchInput);
    router.push(`/${categorySlug}?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedOrg) params.set('org', selectedOrg);
    if (searchInput) params.set('search', searchInput);
    router.push(`/${categorySlug}?${params.toString()}`);
  };

  const formatDate = (d?: Date | string | null) => {
    if (!d) return null;
    return new Date(d).toLocaleDateString(isHindi ? 'hi-IN' : 'en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-6xl mx-auto my-4 px-2 sm:px-4">
      {/* Category Banner Header */}
      <div className="bg-[#8b0000] text-white p-4 sm:p-5 rounded-t-lg shadow-sm border-b-2 border-amber-500 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wide">
            {isHindi && categoryNameHi ? categoryNameHi : categoryName}
          </h1>
          <p className="text-xs text-amber-200 mt-0.5">
            {description || (isHindi ? 'सभी अद्यतन सरकारी भर्ती एवं अधिसूचनाएं' : 'All updated official government notifications and recruitment updates')}
          </p>
        </div>
        <div className="text-xs bg-black/30 border border-white/20 px-3 py-1.5 rounded self-start sm:self-center font-bold text-yellow-300">
          {total} {isHindi ? 'कुल अधिसूचनाएं' : 'Total Notifications'}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-100 dark:bg-slate-900 border-x border-b border-slate-300 dark:border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Organization quick pill buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-bold text-slate-600 dark:text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            {isHindi ? 'आयोग:' : 'Board:'}
          </span>
          <button
            type="button"
            onClick={() => handleOrgFilter('')}
            className={`px-2 py-1 rounded font-semibold transition-colors ${
              !selectedOrg
                ? 'bg-[#8b0000] text-white'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {isHindi ? 'सभी' : 'All'}
          </button>
          {orgList.map((org) => (
            <button
              key={org}
              type="button"
              onClick={() => handleOrgFilter(org === selectedOrg ? '' : org)}
              className={`px-2 py-1 rounded font-semibold transition-colors ${
                selectedOrg === org
                  ? 'bg-[#8b0000] text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {org}
            </button>
          ))}
        </div>

        {/* Search input form */}
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5 w-full sm:w-auto">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder={isHindi ? 'इस श्रेणी में खोजें...' : 'Filter this category...'}
            className="px-2.5 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-red-600 w-full sm:w-48"
          />
          <button
            type="submit"
            className="bg-[#8b0000] hover:bg-red-800 text-white font-bold px-3 py-1 rounded transition-colors"
          >
            {isHindi ? 'खोजें' : 'Search'}
          </button>
        </form>
      </div>

      {/* Notification Listing Table / List */}
      <div className="bg-[var(--card)] border-x border-b border-slate-300 dark:border-slate-800 rounded-b-lg shadow-xs overflow-hidden">
        {items.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            {isHindi ? 'इस फ़िल्टर में कोई सूचना उपलब्ध नहीं है।' : 'No notifications found matching your selection.'}
          </div>
        ) : (
          <ul className="divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-[13px]">
            {items.map((item) => {
              const title = isHindi && item.titleHi ? item.titleHi : item.title;
              return (
                <li
                  key={item.id}
                  className="p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-red-700 dark:text-red-400 font-bold leading-relaxed shrink-0">
                      •
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-red-100 text-red-900 dark:bg-red-950 dark:text-red-300">
                          {item.organization.shortName}
                        </span>
                        {item.vacancyCount ? (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                            {item.vacancyCount.toLocaleString('en-IN')} Posts
                          </span>
                        ) : null}
                      </div>

                      <Link
                        href={`/notification/${item.slug}`}
                        className="sr-link font-semibold text-sm leading-snug block"
                      >
                        {title}
                      </Link>

                      <div className="flex flex-wrap items-center gap-3 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                        {item.applicationEndDate && (
                          <span className="text-red-600 dark:text-red-400 font-semibold flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {isHindi ? 'अंतिम तिथि: ' : 'Last Date: '}
                            {formatDate(item.applicationEndDate)}
                          </span>
                        )}
                        {item.examDate && (
                          <span className="text-blue-700 dark:text-blue-400 font-semibold">
                            {isHindi ? 'परीक्षा: ' : 'Exam: '} {item.examDate}
                          </span>
                        )}
                        {item.resultDate && (
                          <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                            {isHindi ? 'रिजल्ट तिथि: ' : 'Result: '} {item.resultDate}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="self-end sm:self-center shrink-0">
                    <Link
                      href={`/notification/${item.slug}`}
                      className="inline-flex items-center gap-1 bg-red-800 hover:bg-red-900 text-white font-bold text-xs px-3 py-1.5 rounded transition-colors shadow-xs"
                    >
                      <span>{isHindi ? 'विवरण देखें' : 'View Details'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-3 bg-slate-100 dark:bg-slate-900 border-t border-slate-300 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex items-center gap-2">
              {currentPage > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const params = new URLSearchParams();
                    if (selectedOrg) params.set('org', selectedOrg);
                    if (searchInput) params.set('search', searchInput);
                    params.set('page', String(currentPage - 1));
                    router.push(`/${categorySlug}?${params.toString()}`);
                  }}
                  className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Prev
                </button>
              )}
              {currentPage < totalPages && (
                <button
                  type="button"
                  onClick={() => {
                    const params = new URLSearchParams();
                    if (selectedOrg) params.set('org', selectedOrg);
                    if (searchInput) params.set('search', searchInput);
                    params.set('page', String(currentPage + 1));
                    router.push(`/${categorySlug}?${params.toString()}`);
                  }}
                  className="px-2.5 py-1 rounded bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
