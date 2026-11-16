import React from 'react';
import { Flame, Bell } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface TickerProps {
  tickerText?: string;
  isHindi: boolean;
}

export function Ticker({ tickerText, isHindi }: TickerProps) {
  const defaultText = isHindi
    ? '🔥 यूपीएससी सिविल सेवा 2026 ऑनलाइन आवेदन सक्रिय | एसएससी सीजीएल 2026 भर्ती जारी | रेलवे आरआरबी एनटीपीसी 11,558 पद | यूपी पुलिस री-एग्जाम सूचना | एसएससी जीडी एडमिट कार्ड जारी'
    : '🔥 UPSC Civil Services 2026 Online Form Active | SSC CGL 2026 Notification Released | Railway RRB NTPC 11,558 Posts | UP Police Constable Updates | SSC GD Admit Cards Out';

  const text = tickerText || defaultText;

  return (
    <div className="w-full bg-slate-900 text-white border-b border-slate-700/80 shadow-xs flex items-center overflow-hidden">
      <div className="bg-red-700 text-white font-extrabold text-xs px-3 py-2 flex items-center gap-1.5 shrink-0 z-10 uppercase tracking-wider shadow-md">
        <Flame className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
        <span>{isHindi ? 'ताज़ा अपडेट' : 'TRENDING'}</span>
      </div>

      <div className="overflow-hidden py-1.5 text-xs font-semibold text-amber-300 flex-1 whitespace-nowrap relative">
        <div className="animate-marquee hover:[animation-play-state:paused] cursor-pointer inline-block pl-4">
          <span className="text-white font-normal mr-3">
            {isHindi
              ? 'आधिकारिक सूचना पोर्टल:'
              : 'Official Updates Portal:'}
          </span>
          <span className="mr-8">{text}</span>
          <span className="mr-8">{text}</span>
        </div>
      </div>
    </div>
  );
}
