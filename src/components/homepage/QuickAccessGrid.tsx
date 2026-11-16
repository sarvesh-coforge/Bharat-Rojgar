import React from 'react';
import { Link } from '@/i18n/routing';
import { Shield, Sparkles, Train, Briefcase, GraduationCap, Award, Landmark, BookOpen } from 'lucide-react';

interface QuickAccessGridProps {
  isHindi: boolean;
}

export function QuickAccessGrid({ isHindi }: QuickAccessGridProps) {
  const quickItems = [
    {
      title: isHindi ? 'यूपी पुलिस री-एग्जाम 2026' : 'UP Police Re-Exam 2026',
      sub: isHindi ? '60,244 पद विवरण' : '60,244 Posts Notice',
      href: '/notification/up-police-constable-recruitment-2026-updates',
      bgClass: 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white',
      badge: 'HOT',
    },
    {
      title: isHindi ? 'एसएससी सीजीएल 2026' : 'SSC CGL 2026 Online',
      sub: isHindi ? '14,582 पद आवेदन' : '14,582 Vacancies',
      href: '/notification/ssc-cgl-2026-combined-graduate-level-recruitment',
      bgClass: 'bg-gradient-to-r from-teal-700 to-cyan-700 hover:from-teal-800 hover:to-cyan-800 text-white',
      badge: 'NEW',
    },
    {
      title: isHindi ? 'रेलवे एनटीपीसी भर्ती 2026' : 'Railway RRB NTPC 2026',
      sub: isHindi ? '11,558 पद 12वीं/ग्रेजुएट' : '11,558 Posts Apply',
      href: '/notification/railway-rrb-ntpc-recruitment-2026',
      bgClass: 'bg-gradient-to-r from-emerald-700 to-green-700 hover:from-emerald-800 hover:to-green-800 text-white',
      badge: '11.5K',
    },
    {
      title: isHindi ? 'यूपीएससी सिविल सेवा 2026' : 'UPSC Civil Services 2026',
      sub: isHindi ? 'आईएएस / आईएफएस फॉर्म' : 'IAS / IFS Online Form',
      href: '/notification/upsc-civil-services-ias-ifs-2026-online-form',
      bgClass: 'bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white',
      badge: 'ACTIVE',
    },
    {
      title: isHindi ? 'एसएससी जीडी एडमिट कार्ड' : 'SSC GD Admit Card 2026',
      sub: isHindi ? 'परीक्षा शहर व स्टेटस' : 'Exam City & Status',
      href: '/notification/ssc-gd-constable-2026-admit-card-exam-city',
      bgClass: 'bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-800 hover:to-red-800 text-white',
      badge: 'OUT',
    },
    {
      title: isHindi ? 'आईबीपीएस बैंक पीओ 2026' : 'IBPS PO / MT 2026',
      sub: isHindi ? '4,455 बैंक अधिकारी' : '4,455 Bank Officers',
      href: '/notification/ibps-po-mt-xvi-recruitment-2026',
      bgClass: 'bg-gradient-to-r from-purple-700 to-violet-700 hover:from-purple-800 hover:to-violet-800 text-white',
      badge: 'BANK',
    },
    {
      title: isHindi ? 'नीट यूजी 2026 आवेदन' : 'NTA NEET UG 2026 Form',
      sub: isHindi ? 'एमबीबीएस / बीडीएस प्रवेश' : 'MBBS / BDS Admission',
      href: '/notification/nta-neet-ug-2026-online-application-form',
      bgClass: 'bg-gradient-to-r from-cyan-800 to-blue-800 hover:from-cyan-900 hover:to-blue-900 text-white',
      badge: 'EXAM',
    },
    {
      title: isHindi ? 'एसएससी सीजीएल रिजल्ट' : 'SSC CGL Final Result',
      sub: isHindi ? 'कटऑफ एवं मेरिट सूची' : 'Cutoff & Merit List',
      href: '/notification/ssc-cgl-2025-final-result-cutoff-marks',
      bgClass: 'bg-gradient-to-r from-amber-700 to-yellow-600 hover:from-amber-800 hover:to-yellow-700 text-white',
      badge: 'RESULT',
    },
  ];

  return (
    <div className="w-full my-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
        {quickItems.map((item, idx) => (
          <Link
            key={idx}
            href={item.href}
            className={`flex flex-col justify-between p-2.5 rounded-lg shadow-xs hover:shadow-md transition-all transform hover:-translate-y-0.5 border border-white/20 text-center relative overflow-hidden group ${item.bgClass}`}
          >
            <div className="flex items-center justify-between gap-1 w-full mb-1">
              <span className="text-[10px] font-black uppercase bg-black/30 px-1.5 py-0.5 rounded tracking-wider border border-white/20">
                {item.badge}
              </span>
              <Sparkles className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="font-extrabold text-xs sm:text-[13px] leading-snug line-clamp-1 group-hover:underline">
              {item.title}
            </div>
            <div className="text-[11px] font-medium opacity-90 mt-0.5 line-clamp-1">
              {item.sub}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
