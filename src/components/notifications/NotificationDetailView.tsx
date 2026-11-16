import React from 'react';
import { Link } from '@/i18n/routing';
import {
  Calendar,
  CreditCard,
  UserCheck,
  Building2,
  FileText,
  ExternalLink,
  ShieldAlert,
  Clock,
  Award,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react';

interface NotificationDetailProps {
  notification: any;
  related: any[];
  locale: string;
}

export function NotificationDetailView({
  notification,
  related,
  locale,
}: NotificationDetailProps) {
  const isHindi = locale === 'hi';
  const displayTitle = isHindi && notification.titleHi ? notification.titleHi : notification.title;
  const displayPostName = notification.postName || notification.title;
  const displayQual = isHindi && notification.qualificationHi ? notification.qualificationHi : notification.qualification;
  const displaySalary = isHindi && notification.salaryHi ? notification.salaryHi : notification.salary;
  const displayAge = isHindi && notification.ageLimitHi ? notification.ageLimitHi : notification.ageLimit;
  const displaySelection = isHindi && notification.selectionProcessHi ? notification.selectionProcessHi : notification.selectionProcess;

  // Parse fee details JSON if present
  let feeParsed: Record<string, any> = {};
  try {
    if (notification.feeDetails) {
      feeParsed = JSON.parse(notification.feeDetails);
    }
  } catch {}

  // Parse vacancy breakdown if present
  let breakdownParsed: Record<string, any> = {};
  try {
    if (notification.vacancyBreakdown) {
      breakdownParsed = JSON.parse(notification.vacancyBreakdown);
    }
  } catch {}

  const formatDate = (d?: Date | string | null) => {
    if (!d) return isHindi ? 'शीघ्र घोषित होगा' : 'To be notified';
    const dateObj = new Date(d);
    if (isNaN(dateObj.getTime())) return String(d);
    return dateObj.toLocaleDateString(isHindi ? 'hi-IN' : 'en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="max-w-5xl mx-auto my-4 px-2 sm:px-4">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3 overflow-x-auto whitespace-nowrap pb-1">
        <Link href="/" className="hover:text-red-700 dark:hover:text-yellow-400">
          {isHindi ? 'होम' : 'Home'}
        </Link>
        <span>/</span>
        <Link
          href={`/${notification.category.slug}`}
          className="hover:text-red-700 dark:hover:text-yellow-400 capitalize"
        >
          {isHindi && notification.category.nameHi ? notification.category.nameHi : notification.category.name}
        </Link>
        <span>/</span>
        <span className="text-slate-800 dark:text-slate-200 font-semibold truncate max-w-xs">
          {notification.organization.shortName}
        </span>
      </nav>

      {/* Main Post Card Container */}
      <div className="bg-[var(--card)] border-2 border-red-800 dark:border-red-950 rounded-lg shadow-sm overflow-hidden">
        {/* Main Post Heading Banner */}
        <div className="bg-[#8b0000] text-white p-4 text-center border-b-2 border-amber-500">
          <div className="inline-block bg-black/30 border border-white/20 text-yellow-300 text-[11px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2">
            {notification.organization.name} ({notification.organization.shortName})
          </div>
          <h1 className="text-xl sm:text-2xl font-black leading-snug">
            {displayTitle}
          </h1>
          <p className="text-xs text-amber-200 font-medium mt-1">
            {isHindi
              ? `संक्षिप्त विवरण: ${displayPostName}`
              : `Short Information: Recruitment for ${displayPostName}`}
          </p>
        </div>

        {/* Post Quick Meta Bar */}
        <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {isHindi ? 'संगठन:' : 'Recruitment Board:'}
            </span>
            <span className="font-extrabold text-red-800 dark:text-yellow-400">
              {notification.organization.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {notification.vacancyCount ? (
              <span className="bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 px-2 py-0.5 rounded font-extrabold border border-emerald-300 dark:border-emerald-800">
                {isHindi ? `कुल पद: ${notification.vacancyCount.toLocaleString('en-IN')}` : `Total Vacancies: ${notification.vacancyCount.toLocaleString('en-IN')}`}
              </span>
            ) : null}

            <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {isHindi ? 'अपडेट:' : 'Updated:'} {formatDate(notification.updatedAt)}
            </span>
          </div>
        </div>

        {/* Important Dates & Application Fee 2-Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-300 dark:divide-slate-800 border-b border-slate-300 dark:border-slate-800 text-xs sm:text-sm">
          {/* Important Dates */}
          <div className="p-4 bg-white dark:bg-slate-900">
            <div className="font-extrabold text-red-800 dark:text-yellow-400 uppercase tracking-wide flex items-center gap-1.5 pb-2 border-b border-red-200 dark:border-slate-700 mb-3">
              <Calendar className="w-4 h-4 text-red-700 dark:text-yellow-400" />
              <span>{isHindi ? 'महत्वपूर्ण तिथियां' : 'Important Dates'}</span>
            </div>
            <ul className="space-y-2">
              <li className="flex justify-between items-center py-0.5">
                <span className="text-slate-600 dark:text-slate-400">
                  {isHindi ? 'आवेदन शुरू होने की तिथि:' : 'Application Begin:'}
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {formatDate(notification.applicationStartDate)}
                </span>
              </li>
              <li className="flex justify-between items-center py-0.5 bg-red-50/50 dark:bg-red-950/20 px-1 rounded">
                <span className="text-red-700 dark:text-red-300 font-semibold">
                  {isHindi ? 'ऑनलाइन आवेदन की अंतिम तिथि:' : 'Last Date for Apply Online:'}
                </span>
                <span className="font-black text-red-700 dark:text-red-300">
                  {formatDate(notification.applicationEndDate)}
                </span>
              </li>
              <li className="flex justify-between items-center py-0.5">
                <span className="text-slate-600 dark:text-slate-400">
                  {isHindi ? 'परीक्षा शुल्क अंतिम तिथि:' : 'Last Date Pay Exam Fee:'}
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {formatDate(notification.feeLastDate || notification.applicationEndDate)}
                </span>
              </li>
              <li className="flex justify-between items-center py-0.5">
                <span className="text-slate-600 dark:text-slate-400">
                  {isHindi ? 'परीक्षा तिथि:' : 'Exam Date:'}
                </span>
                <span className="font-bold text-blue-700 dark:text-blue-400">
                  {notification.examDate || (isHindi ? 'शीघ्र जारी होगी' : 'As per Schedule')}
                </span>
              </li>
              <li className="flex justify-between items-center py-0.5">
                <span className="text-slate-600 dark:text-slate-400">
                  {isHindi ? 'एडमिट कार्ड उपलब्ध:' : 'Admit Card Available:'}
                </span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  {notification.admitCardDate || (isHindi ? 'परीक्षा से पूर्व' : 'Before Exam')}
                </span>
              </li>
            </ul>
          </div>

          {/* Application Fee */}
          <div className="p-4 bg-white dark:bg-slate-900">
            <div className="font-extrabold text-red-800 dark:text-yellow-400 uppercase tracking-wide flex items-center gap-1.5 pb-2 border-b border-red-200 dark:border-slate-700 mb-3">
              <CreditCard className="w-4 h-4 text-red-700 dark:text-yellow-400" />
              <span>{isHindi ? 'आवेदन शुल्क' : 'Application Fee'}</span>
            </div>
            <ul className="space-y-2">
              <li className="flex justify-between items-center py-0.5">
                <span className="text-slate-600 dark:text-slate-400">
                  General / OBC / EWS:
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {feeParsed.General_OBC_EWS ? `₹${feeParsed.General_OBC_EWS}/-` : feeParsed.All_Candidates ? `₹${feeParsed.All_Candidates}/-` : '₹100/-'}
                </span>
              </li>
              <li className="flex justify-between items-center py-0.5">
                <span className="text-slate-600 dark:text-slate-400">
                  SC / ST / Divyang (PH):
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {feeParsed.SC_ST_PH !== undefined ? `₹${feeParsed.SC_ST_PH}/- (Exempted)` : '₹0/- (Exempted)'}
                </span>
              </li>
              <li className="flex justify-between items-center py-0.5">
                <span className="text-slate-600 dark:text-slate-400">
                  All Category Female:
                </span>
                <span className="font-bold text-slate-900 dark:text-slate-100">
                  {feeParsed.Female_All_Category !== undefined ? `₹${feeParsed.Female_All_Category}/-` : '₹0/-'}
                </span>
              </li>
              <li className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                <span className="font-semibold">{isHindi ? 'भुगतान का प्रकार:' : 'Payment Mode:'} </span>
                {feeParsed.PaymentMode || 'Online via Net Banking, Debit / Credit Card, UPI, or State Bank E-Challan'}
              </li>
            </ul>
          </div>
        </div>

        {/* Age Limit & Qualification Box */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-300 dark:border-slate-800 text-xs sm:text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="font-extrabold text-red-800 dark:text-yellow-400 uppercase tracking-wide flex items-center gap-1.5 pb-1 mb-2">
                <UserCheck className="w-4 h-4 text-red-700 dark:text-yellow-400" />
                <span>{isHindi ? 'आयु सीमा विवरण' : 'Age Limit Criteria'}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {displayAge || 'Minimum 18-21 Years & Maximum 30-32 Years. Age relaxation extra as per rules.'}
              </p>
            </div>

            <div>
              <div className="font-extrabold text-red-800 dark:text-yellow-400 uppercase tracking-wide flex items-center gap-1.5 pb-1 mb-2">
                <Award className="w-4 h-4 text-red-700 dark:text-yellow-400" />
                <span>{isHindi ? 'वेतनमान (Pay Scale)' : 'Salary / Pay Scale'}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {displaySalary || 'As per 7th Central Pay Commission rules with applicable allowances.'}
              </p>
            </div>
          </div>
        </div>

        {/* Vacancy Details Table */}
        <div className="p-4 border-b border-slate-300 dark:border-slate-800">
          <h3 className="font-extrabold text-sm sm:text-base text-red-800 dark:text-yellow-400 uppercase tracking-wide mb-3 flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span>{isHindi ? 'रिक्ति विवरण एवं पात्रता' : 'Vacancy Details & Eligibility'}</span>
          </h3>

          <div className="overflow-x-auto border border-slate-300 dark:border-slate-700 rounded-md">
            <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-300 dark:divide-slate-700">
              <thead className="bg-[#8b0000] text-white text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-2.5 sm:p-3">{isHindi ? 'पद का नाम' : 'Post Name'}</th>
                  <th className="p-2.5 sm:p-3 text-center">{isHindi ? 'कुल पद' : 'Total Post'}</th>
                  <th className="p-2.5 sm:p-3">{isHindi ? 'शैक्षणिक योग्यता एवं पात्रता' : 'Eligibility Criteria'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                <tr>
                  <td className="p-2.5 sm:p-3 font-bold text-slate-900 dark:text-slate-100 align-top">
                    {displayPostName}
                  </td>
                  <td className="p-2.5 sm:p-3 font-extrabold text-red-700 dark:text-yellow-400 text-center align-top whitespace-nowrap">
                    {notification.vacancyCount ? notification.vacancyCount.toLocaleString('en-IN') : 'Various'}
                  </td>
                  <td className="p-2.5 sm:p-3 text-slate-700 dark:text-slate-300 align-top leading-relaxed">
                    {displayQual || 'Please refer to the official notification PDF for detailed qualifications.'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Category Breakdown Table if present */}
          {Object.keys(breakdownParsed).length > 0 && (
            <div className="mt-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                {isHindi ? 'श्रेणीवार पद विवरण:' : 'Category-Wise Vacancy Breakdown:'}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
                {Object.entries(breakdownParsed).map(([cat, count]) => (
                  <div
                    key={cat}
                    className="p-2 rounded bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
                  >
                    <div className="font-semibold text-slate-500 dark:text-slate-400 text-[11px]">{cat}</div>
                    <div className="font-extrabold text-red-800 dark:text-yellow-400 text-sm">{String(count)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Selection Process & How to Fill */}
        <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-300 dark:border-slate-800 text-xs sm:text-[13px]">
          <h4 className="font-extrabold text-red-800 dark:text-yellow-400 uppercase tracking-wide mb-2">
            {isHindi ? 'ऑनलाइन आवेदन कैसे करें (How to Apply)' : 'How to Fill Online Application Form'}
          </h4>
          <ol className="list-decimal list-inside space-y-1.5 text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
            <li>
              {isHindi
                ? 'अभ्यर्थी 01/02/2026 से अंतिम तिथि के बीच आधिकारिक वेबसाइट पर जाकर आवेदन कर सकते हैं।'
                : 'Candidates can apply online by visiting the official recruitment website before the last date.'}
            </li>
            <li>
              {isHindi
                ? 'आवेदन करने से पूर्व कृपया आधिकारिक अधिसूचना PDF को ध्यानपूर्वक पढ़ें।'
                : 'Kindly read the complete official notification PDF carefully before submitting the online form.'}
            </li>
            <li>
              {isHindi
                ? 'कृपया अपने सभी आवश्यक दस्तावेज जैसे: पात्रता प्रमाणपत्र, पहचान पत्र, पता विवरण, मूल विवरण की जांच करें और एकत्र करें।'
                : 'Check and collect all required documents: Eligibility, ID Proof, Address Details, Basic Details.'}
            </li>
            <li>
              {isHindi
                ? 'कृपया भर्ती फॉर्म से संबंधित स्कैन दस्तावेज जैसे: फोटो, हस्ताक्षर, आईडी प्रूफ आदि तैयार रखें।'
                : 'Kindly ready scan document related to recruitment form: Photo, Sign, ID Proof, etc.'}
            </li>
            <li>
              {isHindi
                ? 'आवेदन पत्र जमा करने से पूर्व सभी कॉलम एवं पूर्वावलोकन (Preview) को सावधानीपूर्वक अवश्य जांचें।'
                : 'Before submitting the application form, must check the preview and all column carefully.'}
            </li>
            <li>
              {isHindi
                ? 'अंतिम रूप से सबमिट किए गए आवेदन फॉर्म का प्रिंट आउट भविष्य के संदर्भ के लिए अवश्य निकाल लें।'
                : 'Take a print out of final submitted form for future reference.'}
            </li>
          </ol>
        </div>

        {/* ================= IMPORTANT OFFICIAL LINKS TABLE ================= */}
        <div className="p-4 bg-amber-50/50 dark:bg-slate-800/60">
          <div className="bg-[#8b0000] text-white px-3 py-2 rounded-t-md font-extrabold text-sm sm:text-base tracking-wide uppercase flex items-center justify-between">
            <span>{isHindi ? 'महत्वपूर्ण उपयोगी आधिकारिक लिंक्स' : 'Useful Important Official Links'}</span>
            <span className="text-[10px] bg-amber-400 text-slate-900 font-bold px-1.5 py-0.5 rounded">
              DIRECT PORTALS
            </span>
          </div>

          <div className="border-x border-b border-red-800 dark:border-slate-700 rounded-b-md overflow-hidden bg-white dark:bg-slate-900">
            <table className="w-full text-left text-xs sm:text-sm divide-y divide-slate-200 dark:divide-slate-800">
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {/* Apply Online */}
                {notification.applyOnlineUrl && (
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{isHindi ? 'ऑनलाइन आवेदन करें (Apply Online)' : 'Apply Online (Official Portal)'}</span>
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={notification.applyOnlineUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-red-700 hover:bg-red-800 text-white font-extrabold px-3 py-1.5 rounded shadow-xs text-xs tracking-wide transition-all uppercase"
                      >
                        <span>{isHindi ? 'यहाँ क्लिक करें' : 'Click Here'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                )}

                {/* Download Notification PDF */}
                {notification.officialPdfUrl && (
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{isHindi ? 'आधिकारिक अधिसूचना PDF डाउनलोड करें' : 'Download Official Notification PDF'}</span>
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={notification.officialPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white font-extrabold px-3 py-1.5 rounded shadow-xs text-xs tracking-wide transition-all uppercase"
                      >
                        <span>{isHindi ? 'यहाँ क्लिक करें' : 'Click Here'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                )}

                {/* Download Admit Card */}
                {notification.admitCardUrl && (
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{isHindi ? 'एडमिट कार्ड डाउनलोड करें' : 'Download Admit Card / Hall Ticket'}</span>
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={notification.admitCardUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold px-3 py-1.5 rounded shadow-xs text-xs tracking-wide transition-all uppercase"
                      >
                        <span>{isHindi ? 'यहाँ क्लिक करें' : 'Click Here'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                )}

                {/* Check Result */}
                {notification.resultUrl && (
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{isHindi ? 'परीक्षा परिणाम देखें (Check Result)' : 'Check Official Exam Result'}</span>
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={notification.resultUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold px-3 py-1.5 rounded shadow-xs text-xs tracking-wide transition-all uppercase"
                      >
                        <span>{isHindi ? 'यहाँ क्लिक करें' : 'Click Here'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                )}

                {/* Score Card / Cutoff Marks */}
                {notification.scoreCardUrl && (
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-3 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Award className="w-4 h-4 text-purple-600 shrink-0" />
                      <span>{isHindi ? 'स्कोर कार्ड देखें (Check Score Card)' : 'Check Marks / Score Card'}</span>
                    </td>
                    <td className="p-3 text-right">
                      <a
                        href={notification.scoreCardUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-purple-700 hover:bg-purple-800 text-white font-extrabold px-3 py-1.5 rounded shadow-xs text-xs tracking-wide transition-all uppercase"
                      >
                        <span>{isHindi ? 'यहाँ क्लिक करें' : 'Click Here'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  </tr>
                )}

                {/* Official Website */}
                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-600 shrink-0" />
                    <span>{isHindi ? 'आधिकारिक वेबसाइट (Official Website)' : 'Official Website of Organization'}</span>
                  </td>
                  <td className="p-3 text-right">
                    <a
                      href={notification.officialWebsiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-black text-white font-extrabold px-3 py-1.5 rounded shadow-xs text-xs tracking-wide transition-all uppercase"
                    >
                      <span>{isHindi ? 'यहाँ क्लिक करें' : 'Click Here'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Mandatory Safety Notice */}
        <div className="p-4 bg-amber-100/70 dark:bg-amber-950/40 border-t border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-800 dark:text-amber-300 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>{isHindi ? 'महत्वपूर्ण चेतावनी:' : 'Safety Advisory:'} </strong>
            {isHindi
              ? 'अभ्यर्थी ध्यान दें: भारत रोज़गार केवल आधिकारिक सूचनाएं उपलब्ध कराता है। आवेदन फॉर्म भरने व शुल्क जमा करने के लिए केवल संबंधित आयोग/विभाग की आधिकारिक वेबसाइट का ही प्रयोग करें।'
              : 'Aspirants notice: Bharat Rojgar is strictly an informational aggregator. Never submit fees or application credentials on unofficial portals. Use only the official government links above.'}
          </p>
        </div>
      </div>

      {/* Related Notifications Box */}
      {related.length > 0 && (
        <div className="mt-8 bg-[var(--card)] border border-slate-300 dark:border-slate-800 rounded-lg p-4">
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-100 mb-3 uppercase tracking-wide border-b border-slate-200 dark:border-slate-800 pb-2">
            {isHindi ? 'संबंधित अन्य सरकारी सूचनाएं' : 'Related Recruitment & Examination Updates'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {related.map((item) => (
              <Link
                key={item.id}
                href={`/notification/${item.slug}`}
                className="p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800/60 block border border-slate-200 dark:border-slate-800/80"
              >
                <div className="font-semibold text-blue-700 dark:text-blue-400 hover:underline line-clamp-1">
                  • {isHindi && item.titleHi ? item.titleHi : item.title}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
