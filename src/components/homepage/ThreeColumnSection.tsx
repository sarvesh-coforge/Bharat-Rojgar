import React from 'react';
import { Link } from '@/i18n/routing';
import { Award, CreditCard, Briefcase, ArrowRight, Calendar, Sparkles } from 'lucide-react';

interface NotificationSummary {
  id: string;
  title: string;
  titleHi?: string | null;
  slug: string;
  applicationEndDate?: Date | null;
  examDate?: string | null;
  resultDate?: string | null;
  publishedAt?: Date | null;
  createdAt: Date;
  isFeatured?: boolean;
  isTrending?: boolean;
}

interface ThreeColumnSectionProps {
  results: NotificationSummary[];
  admitCards: NotificationSummary[];
  latestJobs: NotificationSummary[];
  isHindi: boolean;
}

export function ThreeColumnSection({
  results,
  admitCards,
  latestJobs,
  isHindi,
}: ThreeColumnSectionProps) {
  const formatDate = (date?: Date | null) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString(isHindi ? 'hi-IN' : 'en-IN', {
      day: '2-digit',
      month: 'short',
    });
  };

  return (
    <div className="w-full my-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        {/* ================= COLUMN 1: RESULTS ================= */}
        <div className="bg-[var(--card)] border-2 border-[#8b0000] dark:border-red-900 rounded-md shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="bg-[#8b0000] text-white px-3.5 py-2.5 flex items-center justify-between border-b-2 border-red-950">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-300" />
                <h2 className="font-extrabold text-sm sm:text-base tracking-wide uppercase">
                  {isHindi ? 'परिणाम (RESULTS)' : 'RESULTS'}
                </h2>
              </div>
              <span className="text-[10px] bg-red-950/70 text-yellow-300 font-bold px-1.5 py-0.5 rounded border border-yellow-400/30">
                SCORE / MERIT
              </span>
            </div>

            <ul className="divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-[13px]">
              {results.length === 0 ? (
                <li className="p-4 text-center text-slate-500">
                  {isHindi ? 'कोई सूचना उपलब्ध नहीं है।' : 'No results currently available.'}
                </li>
              ) : (
                results.map((item) => {
                  const displayTitle = isHindi && item.titleHi ? item.titleHi : item.title;
                  return (
                    <li key={item.id} className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                      <div className="flex items-start gap-1.5">
                        <span className="text-red-700 dark:text-red-400 font-bold leading-relaxed shrink-0">
                          •
                        </span>
                        <div className="flex-1">
                          <Link
                            href={`/notification/${item.slug}`}
                            className="sr-link font-medium leading-snug block"
                          >
                            {displayTitle}
                          </Link>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                            {item.resultDate && (
                              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                                {isHindi ? 'जारी: ' : 'Declared: '} {item.resultDate}
                              </span>
                            )}
                            {item.isTrending && (
                              <span className="text-[10px] bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 px-1 rounded font-bold">
                                Hot
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>

          <div className="p-2 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center">
            <Link
              href="/results"
              className="inline-flex items-center justify-center gap-1 w-full py-1.5 text-xs font-bold text-red-700 dark:text-yellow-400 hover:text-red-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors"
            >
              <span>{isHindi ? 'सभी परिणाम देखें (View More)' : 'View More Results'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ================= COLUMN 2: ADMIT CARD ================= */}
        <div className="bg-[var(--card)] border-2 border-[#8b0000] dark:border-red-900 rounded-md shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="bg-[#8b0000] text-white px-3.5 py-2.5 flex items-center justify-between border-b-2 border-red-950">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-yellow-300" />
                <h2 className="font-extrabold text-sm sm:text-base tracking-wide uppercase">
                  {isHindi ? 'प्रवेश पत्र (ADMIT CARD)' : 'ADMIT CARD'}
                </h2>
              </div>
              <span className="text-[10px] bg-red-950/70 text-yellow-300 font-bold px-1.5 py-0.5 rounded border border-yellow-400/30">
                HALL TICKET
              </span>
            </div>

            <ul className="divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-[13px]">
              {admitCards.length === 0 ? (
                <li className="p-4 text-center text-slate-500">
                  {isHindi ? 'कोई प्रवेश पत्र उपलब्ध नहीं है।' : 'No admit cards currently available.'}
                </li>
              ) : (
                admitCards.map((item) => {
                  const displayTitle = isHindi && item.titleHi ? item.titleHi : item.title;
                  return (
                    <li key={item.id} className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                      <div className="flex items-start gap-1.5">
                        <span className="text-red-700 dark:text-red-400 font-bold leading-relaxed shrink-0">
                          •
                        </span>
                        <div className="flex-1">
                          <Link
                            href={`/notification/${item.slug}`}
                            className="sr-link font-medium leading-snug block"
                          >
                            {displayTitle}
                          </Link>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                            {item.examDate && (
                              <span className="text-blue-700 dark:text-blue-400 font-semibold">
                                {isHindi ? 'परीक्षा: ' : 'Exam: '} {item.examDate}
                              </span>
                            )}
                            {item.isFeatured && (
                              <span className="text-[10px] bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 px-1 rounded font-bold">
                                Important
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>

          <div className="p-2 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center">
            <Link
              href="/admit-cards"
              className="inline-flex items-center justify-center gap-1 w-full py-1.5 text-xs font-bold text-red-700 dark:text-yellow-400 hover:text-red-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors"
            >
              <span>{isHindi ? 'सभी प्रवेश पत्र देखें (View More)' : 'View More Admit Cards'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* ================= COLUMN 3: LATEST JOB ================= */}
        <div className="bg-[var(--card)] border-2 border-[#8b0000] dark:border-red-900 rounded-md shadow-sm overflow-hidden flex flex-col justify-between">
          <div>
            <div className="bg-[#8b0000] text-white px-3.5 py-2.5 flex items-center justify-between border-b-2 border-red-950">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-yellow-300" />
                <h2 className="font-extrabold text-sm sm:text-base tracking-wide uppercase">
                  {isHindi ? 'सरकारी नौकरी (LATEST JOB)' : 'LATEST JOB'}
                </h2>
              </div>
              <span className="text-[10px] bg-red-950/70 text-yellow-300 font-bold px-1.5 py-0.5 rounded border border-yellow-400/30">
                APPLY ONLINE
              </span>
            </div>

            <ul className="divide-y divide-slate-200 dark:divide-slate-800 text-xs sm:text-[13px]">
              {latestJobs.length === 0 ? (
                <li className="p-4 text-center text-slate-500">
                  {isHindi ? 'कोई नौकरी उपलब्ध नहीं है।' : 'No job vacancies currently active.'}
                </li>
              ) : (
                latestJobs.map((item) => {
                  const displayTitle = isHindi && item.titleHi ? item.titleHi : item.title;
                  return (
                    <li key={item.id} className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                      <div className="flex items-start gap-1.5">
                        <span className="text-red-700 dark:text-red-400 font-bold leading-relaxed shrink-0">
                          •
                        </span>
                        <div className="flex-1">
                          <Link
                            href={`/notification/${item.slug}`}
                            className="sr-link font-medium leading-snug block"
                          >
                            {displayTitle}
                          </Link>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                            {item.applicationEndDate && (
                              <span className="text-red-600 dark:text-red-400 font-semibold flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {isHindi ? 'अंतिम तिथि: ' : 'Last Date: '}
                                {formatDate(item.applicationEndDate)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })
              )}
            </ul>
          </div>

          <div className="p-2 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-center">
            <Link
              href="/latest-jobs"
              className="inline-flex items-center justify-center gap-1 w-full py-1.5 text-xs font-bold text-red-700 dark:text-yellow-400 hover:text-red-900 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors"
            >
              <span>{isHindi ? 'सभी नौकरियां देखें (View More)' : 'View More Latest Jobs'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
