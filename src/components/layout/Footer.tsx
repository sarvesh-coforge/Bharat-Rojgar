import React from 'react';
import { Link } from '@/i18n/routing';
import { ShieldCheck, ExternalLink, Mail, Lock } from 'lucide-react';

export function Footer({ isHindi }: { isHindi: boolean }) {
  const officialPortals = [
    { name: 'UPSC Portal', url: 'https://upsc.gov.in' },
    { name: 'SSC Portal', url: 'https://ssc.gov.in' },
    { name: 'Indian Railways', url: 'https://indianrailways.gov.in' },
    { name: 'IBPS Banking', url: 'https://www.ibps.in' },
    { name: 'NTA Exams', url: 'https://nta.ac.in' },
    { name: 'UPSSSC Lucknow', url: 'https://upsssc.gov.in' },
    { name: 'UPPSC Prayagraj', url: 'https://uppsc.up.nic.in' },
  ];

  return (
    <footer className="w-full bg-[#111827] text-slate-300 border-t-4 border-[#8b0000] mt-10">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-xs">
          {/* Col 1: About */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-red-700 flex items-center justify-center text-white font-extrabold text-xs">
                SS
              </div>
              <span className="font-extrabold text-white text-sm tracking-wide">
                SARKARI SELECTION
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {isHindi
                ? 'सरकारी सिलेक्शन भारत का सबसे विश्वसनीय सरकारी नौकरी, परीक्षा परिणाम एवं प्रवेश पत्र सूचना मंच है। यहाँ सभी सूचनाएं आधिकारिक सरकारी स्रोतों से सत्यापित की जाती हैं।'
                : 'Sarkari Selection is India\'s trusted government recruitment and examination result aggregation portal, delivering verified alerts across Central and State services.'}
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-amber-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{isHindi ? '100% आधिकारिक स्रोत आधारित' : '100% Official Source Verified'}</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-2.5 pb-1 border-b border-slate-700">
              {isHindi ? 'त्वरित लिंक' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link href="/latest-jobs" className="hover:text-yellow-400">
                  • {isHindi ? 'नवीनतम नौकरियां' : 'Latest Jobs'}
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-yellow-400">
                  • {isHindi ? 'परीक्षा परिणाम' : 'Exam Results'}
                </Link>
              </li>
              <li>
                <Link href="/admit-cards" className="hover:text-yellow-400">
                  • {isHindi ? 'प्रवेश पत्र (Admit Card)' : 'Admit Cards'}
                </Link>
              </li>
              <li>
                <Link href="/answer-keys" className="hover:text-yellow-400">
                  • {isHindi ? 'उत्तर कुंजी (Answer Key)' : 'Answer Keys'}
                </Link>
              </li>
              <li>
                <Link href="/syllabus" className="hover:text-yellow-400">
                  • {isHindi ? 'पाठ्यक्रम (Syllabus)' : 'Exam Syllabus'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Portals */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-2.5 pb-1 border-b border-slate-700">
              {isHindi ? 'आधिकारिक सरकारी पोर्टल' : 'Official Portals'}
            </h4>
            <ul className="space-y-1.5">
              {officialPortals.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-yellow-400 flex items-center gap-1"
                  >
                    • {item.name}
                    <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Legal & Support */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-2.5 pb-1 border-b border-slate-700">
              {isHindi ? 'सूचना एवं सुरक्षा' : 'Security & Policy'}
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed mb-3">
              {isHindi
                ? 'यह पोर्टल किसी भी अभ्यर्थी से कोई शुल्क नहीं लेता। कृपया किसी भी अनाधिकृत कॉल अथवा संदेश पर विश्वास न करें।'
                : 'This portal never collects candidate fees or private credentials. Aspirants must apply strictly via the respective department website.'}
            </p>
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-1.5 text-[11px]">
              <span className="flex items-center gap-1 text-slate-400">
                <Mail className="w-3 h-3 text-amber-400" />
                contact@sarkariselection.com
              </span>
              <a
                href="/admin/login"
                className="inline-flex items-center gap-1 text-slate-400 hover:text-yellow-400 mt-1"
              >
                <Lock className="w-3 h-3 text-red-400" />
                <span>Admin Login</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2 text-center sm:text-left">
          <div>
            © 2026 Sarkari Selection. {isHindi ? 'सर्वाधिकार सुरक्षित।' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-3">
            <span>Official Recruitment Aggregator</span>
            <span>•</span>
            <span>Made for Indian Aspirants</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
