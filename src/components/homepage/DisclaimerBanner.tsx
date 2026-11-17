import React from 'react';
import { ShieldAlert, ExternalLink, CheckCircle2 } from 'lucide-react';

export function DisclaimerBanner({ isHindi }: { isHindi: boolean }) {
  return (
    <div className="w-full my-6 bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700/60 rounded-lg p-4 sm:p-5 shadow-xs">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300 shrink-0">
          <ShieldAlert className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <div className="flex-1">
          <h4 className="text-sm sm:text-base font-extrabold text-amber-950 dark:text-amber-200 uppercase tracking-wide">
            {isHindi
              ? 'महत्वपूर्ण आधिकारिक सूचना एवं अभ्यर्थी सुरक्षा परामर्श'
              : 'Important Official Notice & Aspirant Advisory'}
          </h4>
          <p className="text-xs sm:text-[13px] text-amber-900/90 dark:text-amber-300/90 mt-1 leading-relaxed">
            {isHindi
              ? 'सरकारी सिलेक्शन (Sarkari Selection) केवल एक स्वतंत्र सूचनात्मक मंच है। यह पोर्टल किसी भी सरकारी नौकरी का आवेदन पत्र, व्यक्तिगत दस्तावेज अथवा परीक्षा शुल्क स्वीकार नहीं करता है। सभी अभ्यर्थी आवेदन करने, एडमिट कार्ड डाउनलोड करने एवं परिणाम देखने हेतु केवल इस पृष्ठ पर दिए गए आधिकारिक सरकारी लिंक (जैसे: upsc.gov.in, ssc.gov.in, indianrailways.gov.in) पर ही जाएं।'
              : 'Sarkari Selection is strictly an informational and recruitment notification aggregator. This website NEVER collects candidate applications, examination fees, or confidential documents. Aspirants are advised to complete form submissions, fee payments, and hall ticket downloads solely on the verified official government portals linked on our pages.'}
          </p>

          <div className="mt-2.5 flex flex-wrap items-center gap-3 text-[11px] font-semibold text-amber-950 dark:text-amber-200">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              {isHindi ? '100% आधिकारिक पोर्टल लिंक' : '100% Verified Official Links'}
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              {isHindi ? 'कोई शुल्क या डेटा संग्रह नहीं' : 'Zero Candidate Fees Collected'}
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              {isHindi ? 'प्रामाणिक पीडीएफ अधिसूचना' : 'Original Government PDFs'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
