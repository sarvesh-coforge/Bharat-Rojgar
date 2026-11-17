import React from 'react';
import { getHomepageData } from '@/services/notification.service';
import { Ticker } from '@/components/homepage/Ticker';
import { QuickAccessGrid } from '@/components/homepage/QuickAccessGrid';
import { ThreeColumnSection } from '@/components/homepage/ThreeColumnSection';
import { SecondaryGrid } from '@/components/homepage/SecondaryGrid';
import { DisclaimerBanner } from '@/components/homepage/DisclaimerBanner';
import { ShieldCheck, Bell, Award, Sparkles, Building2 } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const isHindi = locale === 'hi';
  const data = await getHomepageData();

  return (
    <div className="w-full pb-8">
      {/* 1. Live Breaking Updates Marquee Ticker */}
      <Ticker tickerText={data.tickerText} isHindi={isHindi} />

      {/* 2. Portal Welcome & Verification Tagline */}
      <div className="my-3 p-3 bg-red-50 dark:bg-slate-900 border-l-4 border-[#8b0000] rounded-r-md text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="font-semibold">
            {isHindi
              ? 'स्वागत है! सरकारी सिलेक्शन: 100% प्रमाणित आधिकारिक सरकारी नौकरी, रिजल्ट एवं एडमिट कार्ड पोर्टल 2026'
              : 'Welcome to Sarkari Selection: 100% Verified Official Government Jobs, Results & Admit Card Portal 2026'}
          </span>
        </div>
        <div className="text-[11px] font-bold text-red-800 dark:text-yellow-400 uppercase tracking-wider self-start sm:self-center shrink-0">
          UPSC • SSC • RRB • IBPS • NTA • UPSSSC
        </div>
      </div>

      {/* 3. Colorful Quick Access Grid */}
      <QuickAccessGrid isHindi={isHindi} />

      {/* 4. Three-Column Main Content (Results, Admit Card, Latest Job) */}
      <ThreeColumnSection
        results={data.results}
        admitCards={data.admitCards}
        latestJobs={data.latestJobs}
        isHindi={isHindi}
      />

      {/* 5. Secondary Grid (Answer Key, Syllabus, Admission, Scholarship) */}
      <SecondaryGrid
        answerKeys={data.answerKeys}
        syllabus={data.syllabus}
        admissions={data.admissions}
        scholarships={data.scholarships}
        isHindi={isHindi}
      />

      {/* 6. Important Official Notice & Safety Advisory Banner */}
      <DisclaimerBanner isHindi={isHindi} />
    </div>
  );
}
