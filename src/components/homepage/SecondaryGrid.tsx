import React from 'react';
import { Link } from '@/i18n/routing';
import { Key, BookOpen, GraduationCap, Banknote, ArrowRight } from 'lucide-react';

interface NotificationSummary {
  id: string;
  title: string;
  titleHi?: string | null;
  slug: string;
}

interface SecondaryGridProps {
  answerKeys: NotificationSummary[];
  syllabus: NotificationSummary[];
  admissions: NotificationSummary[];
  scholarships: NotificationSummary[];
  isHindi: boolean;
}

export function SecondaryGrid({
  answerKeys,
  syllabus,
  admissions,
  scholarships,
  isHindi,
}: SecondaryGridProps) {
  const sections = [
    {
      title: isHindi ? 'उत्तर कुंजी (ANSWER KEY)' : 'ANSWER KEY',
      icon: Key,
      items: answerKeys,
      viewMoreHref: '/answer-keys',
      badge: 'KEYS',
    },
    {
      title: isHindi ? 'पाठ्यक्रम (SYLLABUS)' : 'SYLLABUS',
      icon: BookOpen,
      items: syllabus,
      viewMoreHref: '/syllabus',
      badge: 'PATTERN',
    },
    {
      title: isHindi ? 'प्रवेश परीक्षा (ADMISSION)' : 'ADMISSION',
      icon: GraduationCap,
      items: admissions,
      viewMoreHref: '/admissions',
      badge: 'ENTRANCE',
    },
    {
      title: isHindi ? 'छात्रवृत्ति (SCHOLARSHIP)' : 'SCHOLARSHIP',
      icon: Banknote,
      items: scholarships,
      viewMoreHref: '/scholarships',
      badge: 'SCHEMES',
    },
  ];

  return (
    <div className="w-full my-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {sections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <div
              key={idx}
              className="bg-[var(--card)] border border-slate-300 dark:border-slate-800 rounded-md shadow-xs overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="bg-[#1e293b] dark:bg-slate-900 text-white px-3 py-2 flex items-center justify-between border-b border-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-amber-400" />
                    <h3 className="font-bold text-xs tracking-wide uppercase">
                      {sec.title}
                    </h3>
                  </div>
                  <span className="text-[9px] bg-slate-800 text-amber-300 px-1 py-0.5 rounded font-mono">
                    {sec.badge}
                  </span>
                </div>

                <ul className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
                  {sec.items.length === 0 ? (
                    <li className="p-3 text-center text-slate-400 text-[11px]">
                      {isHindi ? 'कोई सूचना नहीं है।' : 'No updates currently.'}
                    </li>
                  ) : (
                    sec.items.slice(0, 5).map((item) => {
                      const displayTitle = isHindi && item.titleHi ? item.titleHi : item.title;
                      return (
                        <li key={item.id} className="p-2 hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <Link
                            href={`/notification/${item.slug}`}
                            className="sr-link text-xs leading-snug block line-clamp-2"
                          >
                            • {displayTitle}
                          </Link>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>

              <div className="p-1.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 text-center">
                <Link
                  href={sec.viewMoreHref}
                  className="text-[11px] font-bold text-red-700 dark:text-yellow-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>{isHindi ? 'और देखें »' : 'View More »'}</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
