import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Bharat Rojgar database...');

  // 1. Seed Admin User
  const passwordHash = await bcrypt.hash('AdminPassword@2026', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@bharatrojgar.gov.in' },
    update: { passwordHash },
    create: {
      email: 'admin@bharatrojgar.gov.in',
      name: 'Chief Portal Administrator',
      passwordHash,
      role: 'ADMIN',
      isActive: true,
    },
  });
  console.log(`Admin user created: ${admin.email}`);

  // 2. Seed Categories
  const categoriesData = [
    { name: 'Latest Jobs', nameHi: 'नवीनतम सरकारी नौकरियां', slug: 'latest-jobs', sortOrder: 1, icon: 'Briefcase', description: 'Latest Central and State Government recruitment notifications' },
    { name: 'Results', nameHi: 'परीक्षा परिणाम एवं मेरिट सूची', slug: 'results', sortOrder: 2, icon: 'Award', description: 'Exam results, score cards, cutoff marks and final selection lists' },
    { name: 'Admit Card', nameHi: 'प्रवेश पत्र एवं परीक्षा शहर', slug: 'admit-cards', sortOrder: 3, icon: 'CreditCard', description: 'Hall tickets, exam city intimation slips and interview call letters' },
    { name: 'Answer Key', nameHi: 'उत्तर कुंजी एवं आपत्ति सूचना', slug: 'answer-keys', sortOrder: 4, icon: 'Key', description: 'Provisional answer keys, response sheets and final keys' },
    { name: 'Admission', nameHi: 'विश्वविद्यालय एवं प्रवेश परीक्षा', slug: 'admissions', sortOrder: 5, icon: 'GraduationCap', description: 'University admissions, entrance exams and counselling notices' },
    { name: 'Scholarship', nameHi: 'छात्रवृत्ति योजनाएं', slug: 'scholarships', sortOrder: 6, icon: 'Banknote', description: 'Central and state government scholarship schemes and deadlines' },
    { name: 'Syllabus', nameHi: 'परीक्षा पाठ्यक्रम एवं पैटर्न', slug: 'syllabus', sortOrder: 7, icon: 'BookOpen', description: 'Official exam syllabus and paper pattern PDFs' },
  ];

  const categoryMap = new Map<string, string>();
  for (const cat of categoriesData) {
    const record = await prisma.notificationCategory.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categoryMap.set(cat.slug, record.id);
  }
  console.log(`Seeded ${categoriesData.length} categories.`);

  // 3. Seed Organizations
  const orgsData = [
    { name: 'Union Public Service Commission', nameHi: 'संघ लोक सेवा आयोग', shortName: 'UPSC', websiteUrl: 'https://upsc.gov.in', state: 'Central', category: 'Commission' },
    { name: 'Staff Selection Commission', nameHi: 'कर्मचारी चयन आयोग', shortName: 'SSC', websiteUrl: 'https://ssc.gov.in', state: 'Central', category: 'Commission' },
    { name: 'Railway Recruitment Boards', nameHi: 'रेलवे भर्ती बोर्ड', shortName: 'RRB', websiteUrl: 'https://indianrailways.gov.in', state: 'Central', category: 'Recruitment Board' },
    { name: 'Institute of Banking Personnel Selection', nameHi: 'बैंकिंग कार्मिक चयन संस्थान', shortName: 'IBPS', websiteUrl: 'https://www.ibps.in', state: 'Central', category: 'Banking' },
    { name: 'National Testing Agency', nameHi: 'राष्ट्रीय परीक्षा एजेंसी', shortName: 'NTA', websiteUrl: 'https://nta.ac.in', state: 'Central', category: 'Testing Agency' },
    { name: 'UP Subordinate Services Selection Commission', nameHi: 'उत्तर प्रदेश अधीनस्थ सेवा चयन आयोग', shortName: 'UPSSSC', websiteUrl: 'https://upsssc.gov.in', state: 'Uttar Pradesh', category: 'Recruitment Board' },
    { name: 'Uttar Pradesh Public Service Commission', nameHi: 'उत्तर प्रदेश लोक सेवा आयोग', shortName: 'UPPSC', websiteUrl: 'https://uppsc.up.nic.in', state: 'Uttar Pradesh', category: 'Commission' },
    { name: 'UP Police Recruitment & Promotion Board', nameHi: 'उत्तर प्रदेश पुलिस भर्ती एवं प्रोन्नति बोर्ड', shortName: 'UPPRPB', websiteUrl: 'https://uppbpb.gov.in', state: 'Uttar Pradesh', category: 'Police' },
  ];

  const orgMap = new Map<string, string>();
  for (const org of orgsData) {
    const record = await prisma.organization.upsert({
      where: { shortName: org.shortName },
      update: org,
      create: org,
    });
    orgMap.set(org.shortName, record.id);
  }
  console.log(`Seeded ${orgsData.length} organizations.`);

  // 4. Seed Official Sources
  const sourcesData = [
    { name: 'UPSC Official Portal', code: 'UPSC', websiteUrl: 'https://upsc.gov.in', feedUrl: 'https://upsc.gov.in/rss.xml', monitorType: 'HTML_SCRAPE', checkIntervalMinutes: 120, isActive: true },
    { name: 'SSC Official Portal', code: 'SSC', websiteUrl: 'https://ssc.gov.in', feedUrl: 'https://ssc.gov.in/whatsnew', monitorType: 'HTML_SCRAPE', checkIntervalMinutes: 120, isActive: true },
    { name: 'Indian Railways RRB', code: 'RRB', websiteUrl: 'https://indianrailways.gov.in', feedUrl: 'https://indianrailways.gov.in/notices', monitorType: 'HTML_SCRAPE', checkIntervalMinutes: 180, isActive: true },
    { name: 'IBPS Official Portal', code: 'IBPS', websiteUrl: 'https://www.ibps.in', feedUrl: 'https://www.ibps.in/rss', monitorType: 'HTML_SCRAPE', checkIntervalMinutes: 120, isActive: true },
    { name: 'NTA Public Notices', code: 'NTA', websiteUrl: 'https://nta.ac.in', feedUrl: 'https://nta.ac.in/NoticeArchive', monitorType: 'HTML_SCRAPE', checkIntervalMinutes: 120, isActive: true },
    { name: 'UPSSSC Official Portal', code: 'UPSSSC', websiteUrl: 'https://upsssc.gov.in', feedUrl: 'https://upsssc.gov.in/notices', monitorType: 'HTML_SCRAPE', checkIntervalMinutes: 240, isActive: true },
    { name: 'UPPSC Official Portal', code: 'UPPSC', websiteUrl: 'https://uppsc.up.nic.in', feedUrl: 'https://uppsc.up.nic.in/AllNotices', monitorType: 'HTML_SCRAPE', checkIntervalMinutes: 240, isActive: true },
  ];

  const sourceMap = new Map<string, string>();
  for (const src of sourcesData) {
    const record = await prisma.officialSource.upsert({
      where: { code: src.code },
      update: src,
      create: src,
    });
    sourceMap.set(src.code, record.id);
  }
  console.log(`Seeded ${sourcesData.length} official sources.`);

  // 5. Seed Notifications (Published & Pending)
  const notifications = [
    // LATEST JOBS
    {
      title: 'UPSC Civil Services (IAS / IFS) Examination 2026 Online Form',
      titleHi: 'यूपीएससी सिविल सेवा (आईएएस/आईएफएस) परीक्षा 2026 ऑनलाइन आवेदन',
      slug: 'upsc-civil-services-ias-ifs-2026-online-form',
      postName: 'Civil Services Examination 2026 (IAS, IPS, IFS & Central Group A/B Services)',
      organizationId: orgMap.get('UPSC')!,
      categoryId: categoryMap.get('latest-jobs')!,
      officialSourceId: sourceMap.get('UPSC'),
      vacancyCount: 1105,
      vacancyBreakdown: JSON.stringify({ General: 450, OBC: 300, EWS: 110, SC: 165, ST: 80 }),
      qualification: 'Graduation in Any Stream from Recognized University in India.',
      qualificationHi: 'भारत में किसी भी मान्यता प्राप्त विश्वविद्यालय से किसी भी विषय में स्नातक डिग्री।',
      salary: 'Level 10 (Rs. 56,100 - Rs. 1,77,500) + Allowances',
      salaryHi: 'पे मैट्रिक्स लेवल 10 (₹56,100 - ₹1,77,500) + भत्ते',
      ageLimit: '21 to 32 Years as on 01/08/2026. Age relaxation extra as per UPSC CSE rules.',
      ageLimitHi: '01/08/2026 को 21 से 32 वर्ष। आरक्षित श्रेणियों के लिए नियमानुसार छूट।',
      feeDetails: JSON.stringify({ General_OBC_EWS: 100, SC_ST_PH: 0, Female_All_Category: 0, PaymentMode: 'Net Banking, Debit/Credit Card, UPI or SBI Challan' }),
      selectionProcess: '1. Preliminary Examination (Objective)\n2. Main Examination (Written)\n3. Personality Test (Interview)',
      selectionProcessHi: '1. प्रारंभिक परीक्षा (ऑब्जेक्टिव)\n2. मुख्य परीक्षा (लिखित)\n3. साक्षात्कार (इंटरव्यू)',
      applicationStartDate: new Date('2026-02-01T00:00:00Z'),
      applicationEndDate: new Date('2026-03-05T18:00:00Z'),
      feeLastDate: new Date('2026-03-05T18:00:00Z'),
      examDate: '24 May 2026 (Preliminary)',
      admitCardDate: 'First Week of May 2026',
      applyOnlineUrl: 'https://upsconline.nic.in',
      officialPdfUrl: 'https://upsc.gov.in/sites/default/files/Notice-CSP-2026-Engl.pdf',
      officialWebsiteUrl: 'https://upsc.gov.in',
      verificationStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      isFeatured: true,
      isTrending: true,
      publishedAt: new Date(),
    },
    {
      title: 'SSC CGL 2026 Combined Graduate Level Recruitment Apply Online',
      titleHi: 'एसएससी सीजीएल 2026 संयुक्त स्नातक स्तरीय भर्ती ऑनलाइन आवेदन',
      slug: 'ssc-cgl-2026-combined-graduate-level-recruitment',
      postName: 'Assistant Section Officer, Inspector of Income Tax, Sub Inspector, Auditor & Other Posts',
      organizationId: orgMap.get('SSC')!,
      categoryId: categoryMap.get('latest-jobs')!,
      officialSourceId: sourceMap.get('SSC'),
      vacancyCount: 14582,
      vacancyBreakdown: JSON.stringify({ General: 5900, OBC: 3800, EWS: 1450, SC: 2200, ST: 1232 }),
      qualification: 'Bachelor Degree in Any Stream from a Recognized University.',
      qualificationHi: 'किसी भी मान्यता प्राप्त विश्वविद्यालय से स्नातक डिग्री।',
      salary: 'Pay Level 4 to Level 8 (Rs. 25,500 to Rs. 1,51,100)',
      salaryHi: 'पे लेवल 4 से लेवल 8 (₹25,500 से ₹1,51,100)',
      ageLimit: '18 to 30 Years (Post Wise). Relaxation as per SSC rules.',
      ageLimitHi: '18 से 30 वर्ष (पदानुसार)। नियमों के अनुसार छूट।',
      feeDetails: JSON.stringify({ General_OBC_EWS: 100, SC_ST_PH: 0, Female_All_Category: 0, PaymentMode: 'Online via BHIM UPI, Net Banking, Credit/Debit Cards' }),
      selectionProcess: 'Tier 1 Computer Based Exam, Tier 2 Exam, Document Verification & Medical Test',
      selectionProcessHi: 'टियर 1 कंप्यूटर आधारित परीक्षा, टियर 2 परीक्षा, दस्तावेज सत्यापन एवं मेडिकल टेस्ट',
      applicationStartDate: new Date('2026-02-15T00:00:00Z'),
      applicationEndDate: new Date('2026-03-24T23:00:00Z'),
      feeLastDate: new Date('2026-03-25T23:00:00Z'),
      examDate: 'June - July 2026 (Tier 1)',
      admitCardDate: '4 Days Before Exam',
      applyOnlineUrl: 'https://ssc.gov.in/candidate-portal/one-time-registration',
      officialPdfUrl: 'https://ssc.gov.in/notice-cgl-2026.pdf',
      officialWebsiteUrl: 'https://ssc.gov.in',
      verificationStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      isFeatured: true,
      isTrending: true,
      publishedAt: new Date(),
    },
    {
      title: 'UP Police Constable Recruitment 2026 (60,244 Posts) Re-Exam Updates',
      titleHi: 'यूपी पुलिस कांस्टेबल भर्ती 2026 (60,244 पद) विवरण एवं सूचना',
      slug: 'up-police-constable-recruitment-2026-updates',
      postName: 'Police Constable & PAC Constable Civil Police',
      organizationId: orgMap.get('UPPRPB')!,
      categoryId: categoryMap.get('latest-jobs')!,
      officialSourceId: sourceMap.get('UPSSSC'),
      vacancyCount: 60244,
      vacancyBreakdown: JSON.stringify({ General: 24102, OBC: 16264, EWS: 6024, SC: 12650, ST: 1204 }),
      qualification: 'Passed 10+2 (Intermediate) Exam From Any Recognized Board in India.',
      qualificationHi: 'भारत में किसी भी मान्यता प्राप्त बोर्ड से 10+2 (इंटरमीडिएट) परीक्षा उत्तीर्ण।',
      salary: 'Pay Band Rs. 5,200 - 20,200, Grade Pay Rs. 2,000',
      salaryHi: 'पे बैंड ₹5,200 - ₹20,200, ग्रेड पे ₹2,000',
      ageLimit: 'Male: 18-25 Years, Female: 18-28 Years. Relaxation applicable.',
      ageLimitHi: 'पुरुष: 18-25 वर्ष, महिला: 18-28 वर्ष। छूट लागू।',
      feeDetails: JSON.stringify({ All_Candidates: 400, PaymentMode: 'E-Challan or Online Debit Card/Credit Card/Net Banking' }),
      selectionProcess: 'Offline Written Examination (OMR Based), Physical Standard Test (PST), Physical Efficiency Test (PET)',
      selectionProcessHi: 'ऑफलाइन लिखित परीक्षा (ओएमआर), शारीरिक मानक परीक्षण (PST), शारीरिक दक्षता परीक्षण (PET)',
      applicationStartDate: new Date('2026-01-10T00:00:00Z'),
      applicationEndDate: new Date('2026-03-30T18:00:00Z'),
      feeLastDate: new Date('2026-03-30T18:00:00Z'),
      examDate: 'August 2026',
      admitCardDate: 'One Week Before Exam',
      applyOnlineUrl: 'https://uppbpb.gov.in',
      officialPdfUrl: 'https://uppbpb.gov.in/notice_constable_2026.pdf',
      officialWebsiteUrl: 'https://uppbpb.gov.in',
      verificationStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      isFeatured: true,
      isTrending: true,
      publishedAt: new Date(),
    },
    {
      title: 'Railway RRB NTPC Graduate & Undergraduate Recruitment 2026 (11,558 Posts)',
      titleHi: 'रेलवे आरआरबी एनटीपीसी स्नातक एवं 12वीं पास भर्ती 2026 (11,558 पद)',
      slug: 'railway-rrb-ntpc-recruitment-2026',
      postName: 'Junior Clerk, Accounts Clerk, Commercial Cum Ticket Clerk, Station Master, Goods Train Manager',
      organizationId: orgMap.get('RRB')!,
      categoryId: categoryMap.get('latest-jobs')!,
      officialSourceId: sourceMap.get('RRB'),
      vacancyCount: 11558,
      vacancyBreakdown: JSON.stringify({ General: 4800, OBC: 3100, EWS: 1150, SC: 1750, ST: 758 }),
      qualification: 'For Under Graduate Posts: 10+2 with 50% Marks. For Graduate Posts: Degree in Any Stream.',
      qualificationHi: 'अंडरग्रेजुएट पदों हेतु: 50% अंकों के साथ 12वीं। ग्रेजुएट पदों हेतु: स्नातक डिग्री।',
      salary: 'Level 2 to Level 6 (Rs. 19,900 to Rs. 35,400 + DA/HRA)',
      salaryHi: 'लेवल 2 से लेवल 6 (₹19,900 से ₹35,400 + भत्ते)',
      ageLimit: '18 to 33 Years for 12th Pass, 18 to 36 Years for Graduate Posts.',
      ageLimitHi: '12वीं पास हेतु 18-33 वर्ष, ग्रेजुएट पदों हेतु 18-36 वर्ष।',
      feeDetails: JSON.stringify({ General_OBC: 500, SC_ST_PH_Female: 250, RefundRule: 'Rs 400 refunded after appearing in CBT 1' }),
      selectionProcess: 'CBT 1, CBT 2, Typing Skill Test / CBAT (Post Wise), Document Verification, Medical Exam',
      selectionProcessHi: 'सीबीटी 1, सीबीटी 2, टाइपिंग / सीबीएटी (पदानुसार), दस्तावेज सत्यापन, मेडिकल परीक्षण',
      applicationStartDate: new Date('2026-02-10T00:00:00Z'),
      applicationEndDate: new Date('2026-04-05T23:59:00Z'),
      feeLastDate: new Date('2026-04-06T23:59:00Z'),
      examDate: 'September - October 2026',
      applyOnlineUrl: 'https://www.rrbapply.gov.in',
      officialPdfUrl: 'https://indianrailways.gov.in/railwayboard/uploads/directorate/rrb/NTPC-CEN-05-2026.pdf',
      officialWebsiteUrl: 'https://indianrailways.gov.in',
      verificationStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      isFeatured: true,
      isTrending: true,
      publishedAt: new Date(),
    },
    {
      title: 'IBPS Probationary Officers (PO / MT-XVI) Recruitment 2026 Apply Online',
      titleHi: 'आईबीपीएस बैंक पीओ / मैनेजमेंट ट्रेनी भर्ती 2026 ऑनलाइन आवेदन',
      slug: 'ibps-po-mt-xvi-recruitment-2026',
      postName: 'Probationary Officer / Management Trainee in Participating Public Sector Banks',
      organizationId: orgMap.get('IBPS')!,
      categoryId: categoryMap.get('latest-jobs')!,
      officialSourceId: sourceMap.get('IBPS'),
      vacancyCount: 4455,
      vacancyBreakdown: JSON.stringify({ General: 1850, OBC: 1200, EWS: 440, SC: 660, ST: 305 }),
      qualification: 'A Degree (Graduation) in any discipline from a recognized University.',
      qualificationHi: 'मान्यता प्राप्त विश्वविद्यालय से किसी भी विषय में स्नातक डिग्री।',
      salary: 'Rs. 36,000 - Rs. 63,840 + DA, HRA, CCA & Perquisites',
      salaryHi: '₹36,000 - ₹63,840 + महंगाई भत्ता, मकान किराया भत्ता आदि',
      ageLimit: '20 to 30 Years. Relaxation for OBC (3 yrs), SC/ST (5 yrs).',
      ageLimitHi: '20 से 30 वर्ष। ओबीसी हेतु 3 वर्ष, एससी/एसटी हेतु 5 वर्ष की छूट।',
      feeDetails: JSON.stringify({ General_OBC_EWS: 850, SC_ST_PWBD: 175, PaymentMode: 'Debit Cards, Credit Cards, Internet Banking, IMPS, Cash Cards/Mobile Wallets' }),
      selectionProcess: 'Online Preliminary Exam, Online Main Exam, Common Interview',
      selectionProcessHi: 'ऑनलाइन प्रारंभिक परीक्षा, मुख्य परीक्षा, साक्षात्कार',
      applicationStartDate: new Date('2026-03-01T00:00:00Z'),
      applicationEndDate: new Date('2026-04-15T23:59:00Z'),
      examDate: 'October 2026 (Prelims)',
      applyOnlineUrl: 'https://ibpsonline.ibps.in',
      officialPdfUrl: 'https://www.ibps.in/wp-content/uploads/DetailedAdvt_CRP_PO_XVI.pdf',
      officialWebsiteUrl: 'https://www.ibps.in',
      verificationStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      isFeatured: false,
      isTrending: true,
      publishedAt: new Date(),
    },
    {
      title: 'UPSSSC Rajasva Lekhpal Recruitment 2026 (4,697 Posts) Notification',
      titleHi: 'यूपीएसएसएससी राजस्व लेखपाल भर्ती 2026 (4,697 पद) विज्ञापन',
      slug: 'upsssc-rajasva-lekhpal-recruitment-2026',
      postName: 'Rajasva Lekhpal (Revenue Accountant)',
      organizationId: orgMap.get('UPSSSC')!,
      categoryId: categoryMap.get('latest-jobs')!,
      officialSourceId: sourceMap.get('UPSSSC'),
      vacancyCount: 4697,
      qualification: '10+2 Intermediate Exam with Valid UPSSSC PET 2025/2026 Score Card.',
      qualificationHi: '10+2 इंटरमीडिएट उत्तीर्ण एवं वैध यूपीएसएसएससी पीईटी स्कोर कार्ड।',
      salary: 'Pay Band-1 (Rs. 5,200 - 20,200), Grade Pay Rs. 2,000',
      salaryHi: 'पे बैंड-1 (₹5,200 - ₹20,200), ग्रेड पे ₹2,000',
      ageLimit: '18 to 40 Years as on 01/07/2026.',
      ageLimitHi: '01/07/2026 को 18 से 40 वर्ष।',
      feeDetails: JSON.stringify({ All_Categories: 25, PaymentMode: 'State Bank of India Collect / Online' }),
      selectionProcess: 'Shortlisting via PET Score, Main Written Examination, Document Verification',
      selectionProcessHi: 'पीईटी स्कोर द्वारा शॉर्टलिस्टिंग, मुख्य लिखित परीक्षा, दस्तावेज सत्यापन',
      applicationStartDate: new Date('2026-03-10T00:00:00Z'),
      applicationEndDate: new Date('2026-04-20T23:59:00Z'),
      examDate: 'November 2026',
      applyOnlineUrl: 'https://upsssc.gov.in/AllNotifications.aspx',
      officialPdfUrl: 'https://upsssc.gov.in/notice_lekhpal_2026.pdf',
      officialWebsiteUrl: 'https://upsssc.gov.in',
      verificationStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      isFeatured: false,
      isTrending: false,
      publishedAt: new Date(),
    },

    // RESULTS
    {
      title: 'SSC CGL 2025 Final Result, Merit List & Cutoff Marks Declared',
      titleHi: 'एसएससी सीजीएल 2025 अंतिम परीक्षा परिणाम, मेरिट सूची एवं कटऑफ जारी',
      slug: 'ssc-cgl-2025-final-result-cutoff-marks',
      postName: 'Combined Graduate Level Examination 2025 Final Allocation',
      organizationId: orgMap.get('SSC')!,
      categoryId: categoryMap.get('results')!,
      officialSourceId: sourceMap.get('SSC'),
      vacancyCount: 17727,
      qualification: 'Bachelor Degree',
      examDate: 'September - October 2025',
      resultDate: '15 February 2026',
      resultUrl: 'https://ssc.gov.in/api/result-download/cgl-2025-final',
      scoreCardUrl: 'https://ssc.gov.in/candidate-portal/login',
      cutoffPdfUrl: 'https://ssc.gov.in/uploads/cgl-2025-cutoff-marks.pdf',
      officialPdfUrl: 'https://ssc.gov.in/uploads/cgl-2025-final-writeup.pdf',
      officialWebsiteUrl: 'https://ssc.gov.in',
      verificationStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      isFeatured: true,
      isTrending: true,
      publishedAt: new Date(),
    },
    {
      title: 'UPSC Civil Services (Mains) 2025 Result with Name List for Interview',
      titleHi: 'यूपीएससी सिविल सेवा (मुख्य) 2025 परिणाम एवं साक्षात्कार हेतु चयनित सूची',
      slug: 'upsc-civil-services-mains-2025-result-interview-list',
      postName: 'Civil Services Main Examination 2025 Qualified Candidates',
      organizationId: orgMap.get('UPSC')!,
      categoryId: categoryMap.get('results')!,
      officialSourceId: sourceMap.get('UPSC'),
      vacancyCount: 1056,
      resultDate: '08 February 2026',
      resultUrl: 'https://upsc.gov.in/written-results/civil-services-main-examination-2025',
      officialPdfUrl: 'https://upsc.gov.in/sites/default/files/WR-CSM-2025-RollList-Engl.pdf',
      officialWebsiteUrl: 'https://upsc.gov.in',
      verificationStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      isFeatured: true,
      isTrending: true,
      publishedAt: new Date(),
    },
    {
      title: 'IBPS Clerk 2025 Main Examination Score Card & State Cutoff',
      titleHi: 'आईबीपीएस क्लर्क 2025 मुख्य परीक्षा स्कोर कार्ड एवं राज्यवार कटऑफ',
      slug: 'ibps-clerk-2025-mains-score-card-cutoff',
      postName: 'Clerical Cadre CRP Clerks-XV Mains Score Display',
      organizationId: orgMap.get('IBPS')!,
      categoryId: categoryMap.get('results')!,
      officialSourceId: sourceMap.get('IBPS'),
      vacancyCount: 6128,
      resultDate: '12 February 2026',
      resultUrl: 'https://ibpsonline.ibps.in/crpclerkxv/resma',
      scoreCardUrl: 'https://ibpsonline.ibps.in/crpclerkxv/scda',
      cutoffPdfUrl: 'https://www.ibps.in/crp-clerk-cutoff-2025.pdf',
      officialWebsiteUrl: 'https://www.ibps.in',
      verificationStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      isFeatured: false,
      isTrending: true,
      publishedAt: new Date(),
    },
    {
      title: 'UPPSC Combined State / Upper Subordinate (PCS) 2025 Final Result',
      titleHi: 'यूपीपीएससी सम्मिलित राज्य / प्रवर अधीनस्थ सेवा (पीसीएस) 2025 अंतिम परिणाम',
      slug: 'uppsc-pcs-2025-final-result-selection-list',
      postName: 'Sub Divisional Magistrate (SDM), DSP, BDO & Other State Services',
      organizationId: orgMap.get('UPPSC')!,
      categoryId: categoryMap.get('results')!,
      officialSourceId: sourceMap.get('UPPSC'),
      vacancyCount: 220,
      resultDate: '01 February 2026',
      resultUrl: 'https://uppsc.up.nic.in/Results.aspx',
      officialPdfUrl: 'https://uppsc.up.nic.in/PCS_2025_Final_Result_List.pdf',
      officialWebsiteUrl: 'https://uppsc.up.nic.in',
      verificationStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      isFeatured: false,
      isTrending: false,
      publishedAt: new Date(),
    },

    // ADMIT CARDS
    {
      title: 'SSC GD Constable 2026 Admit Card & Exam City Intimation Slip',
      titleHi: 'एसएससी जीडी कांस्टेबल 2026 प्रवेश पत्र एवं परीक्षा शहर पर्ची जारी',
      slug: 'ssc-gd-constable-2026-admit-card-exam-city',
      postName: 'Constable (GD) in Central Armed Police Forces (CAPFs), SSF and Rifleman (GD) in Assam Rifles',
      organizationId: orgMap.get('SSC')!,
      categoryId: categoryMap.get('admit-cards')!,
      officialSourceId: sourceMap.get('SSC'),
      vacancyCount: 39481,
      examDate: '20 February to 07 March 2026',
      admitCardDate: 'Available Now',
      admitCardUrl: 'https://ssc.gov.in/candidate-portal/admit-card',
      examCityUrl: 'https://ssc.gov.in/candidate-portal/exam-city-status',
      officialPdfUrl: 'https://ssc.gov.in/notice_gd_exam_dates.pdf',
      officialWebsiteUrl: 'https://ssc.gov.in',
      verificationStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      isFeatured: true,
      isTrending: true,
      publishedAt: new Date(),
    },
    {
      title: 'UPSC Combined Defence Services (CDS I) 2026 e-Admit Card Released',
      titleHi: 'यूपीएससी सीडीएस 1 2026 ई-प्रवेश पत्र जारी डाउनलोड करें',
      slug: 'upsc-cds-1-2026-e-admit-card-download',
      postName: 'Indian Military Academy, Naval Academy, Air Force Academy, OTA',
      organizationId: orgMap.get('UPSC')!,
      categoryId: categoryMap.get('admit-cards')!,
      officialSourceId: sourceMap.get('UPSC'),
      vacancyCount: 457,
      examDate: '12 April 2026',
      admitCardDate: 'Available from 25 March 2026',
      admitCardUrl: 'https://upsconline.nic.in/eadmitcard/subAdmin/',
      officialPdfUrl: 'https://upsc.gov.in/sites/default/files/Notice-CDSI-2026.pdf',
      officialWebsiteUrl: 'https://upsc.gov.in',
      verificationStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      isFeatured: true,
      isTrending: false,
      publishedAt: new Date(),
    },
    {
      title: 'NTA JEE Main 2026 Session 2 Exam City Slip & Hall Ticket',
      titleHi: 'एनटीए जेईई मेन 2026 सत्र 2 परीक्षा शहर सूचना एवं हॉल टिकट',
      slug: 'nta-jee-main-2026-session-2-exam-city-admit-card',
      postName: 'Joint Entrance Examination Main 2026 Session 2 (B.E./B.Tech/B.Arch)',
      organizationId: orgMap.get('NTA')!,
      categoryId: categoryMap.get('admit-cards')!,
      officialSourceId: sourceMap.get('NTA'),
      examDate: '01 April to 08 April 2026',
      admitCardDate: 'Expected Last Week of March 2026',
      admitCardUrl: 'https://jeemain.nta.nic.in',
      examCityUrl: 'https://jeemain.nta.nic.in/city-intimation-session-2',
      officialWebsiteUrl: 'https://nta.ac.in',
      verificationStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      isFeatured: false,
      isTrending: true,
      publishedAt: new Date(),
    },

    // ANSWER KEYS
    {
      title: 'SSC CGL 2025 Tier 2 Provisional Answer Key & Response Sheet',
      titleHi: 'एसएससी सीजीएल 2025 टियर 2 उत्तर कुंजी एवं रिस्पांस शीट जारी',
      slug: 'ssc-cgl-2025-tier-2-answer-key-response-sheet',
      postName: 'Combined Graduate Level Examination (Tier II) 2025 Answer Keys',
      organizationId: orgMap.get('SSC')!,
      categoryId: categoryMap.get('answer-keys')!,
      officialSourceId: sourceMap.get('SSC'),
      answerKeyUrl: 'https://ssc.gov.in/candidate-portal/challenge-system',
      officialPdfUrl: 'https://ssc.gov.in/notice_cgl_tier2_tentative_keys.pdf',
      officialWebsiteUrl: 'https://ssc.gov.in',
      verificationStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      isFeatured: true,
      isTrending: true,
      publishedAt: new Date(),
    },
    {
      title: 'NTA UGC NET December 2025 Final Answer Key for All 83 Subjects',
      titleHi: 'एनटीए यूजीसी नेट दिसंबर 2025 सभी 83 विषयों की फाइनल आंसर की',
      slug: 'nta-ugc-net-december-2025-final-answer-key',
      postName: 'UGC NET for Assistant Professor and Junior Research Fellowship (JRF)',
      organizationId: orgMap.get('NTA')!,
      categoryId: categoryMap.get('answer-keys')!,
      officialSourceId: sourceMap.get('NTA'),
      answerKeyUrl: 'https://ugcnet.nta.ac.in/final-keys',
      officialPdfUrl: 'https://ugcnet.nta.ac.in/download/Final_Key_Dec2025.pdf',
      officialWebsiteUrl: 'https://nta.ac.in',
      verificationStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      isFeatured: false,
      isTrending: false,
      publishedAt: new Date(),
    },

    // ADMISSIONS
    {
      title: 'NTA NEET UG 2026 National Eligibility Cum Entrance Test Registration',
      titleHi: 'एनटीए नीट यूजी 2026 राष्ट्रीय पात्रता सह प्रवेश परीक्षा ऑनलाइन आवेदन',
      slug: 'nta-neet-ug-2026-online-application-form',
      postName: 'Undergraduate Medical Admission (MBBS / BDS / BAMS / BHMS / Nursing)',
      organizationId: orgMap.get('NTA')!,
      categoryId: categoryMap.get('admissions')!,
      officialSourceId: sourceMap.get('NTA'),
      qualification: 'Passed / Appearing 10+2 with Physics, Chemistry, Biology (PCB) and English.',
      qualificationHi: 'भौतिकी, रसायन विज्ञान, जीव विज्ञान (PCB) एवं अंग्रेजी के साथ 12वीं उत्तीर्ण अथवा अपीयरिंग।',
      applicationStartDate: new Date('2026-02-09T00:00:00Z'),
      applicationEndDate: new Date('2026-03-15T21:00:00Z'),
      examDate: '03 May 2026 (Pen & Paper Mode)',
      applyOnlineUrl: 'https://neet.ntaonline.in',
      officialPdfUrl: 'https://exams.nta.ac.in/NEET/information-bulletin.pdf',
      officialWebsiteUrl: 'https://nta.ac.in',
      verificationStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      isFeatured: true,
      isTrending: true,
      publishedAt: new Date(),
    },

    // SCHOLARSHIPS
    {
      title: 'National Scholarship Portal (NSP) Central Sector Scheme 2025-26',
      titleHi: 'राष्ट्रीय छात्रवृत्ति पोर्टल (NSP) केंद्रीय क्षेत्र छात्रवृत्ति योजना 2025-26',
      slug: 'national-scholarship-portal-nsp-scheme-2025-26',
      postName: 'Pre-Matric, Post-Matric and Merit-cum-Means Scholarships',
      organizationId: orgMap.get('UPSC')!,
      categoryId: categoryMap.get('scholarships')!,
      qualification: 'Enrolled in Recognized Schools, Colleges, Universities with family income criteria.',
      qualificationHi: 'मान्यता प्राप्त विद्यालय अथवा विश्वविद्यालय में अध्ययनरत विद्यार्थी।',
      applicationStartDate: new Date('2025-10-01T00:00:00Z'),
      applicationEndDate: new Date('2026-03-31T23:59:00Z'),
      applyOnlineUrl: 'https://scholarships.gov.in',
      officialPdfUrl: 'https://scholarships.gov.in/public/guidelines.pdf',
      officialWebsiteUrl: 'https://scholarships.gov.in',
      verificationStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      isFeatured: false,
      isTrending: false,
      publishedAt: new Date(),
    },

    // SYLLABUS
    {
      title: 'UPSC Civil Services Examination (CSE) Detailed Syllabus & Exam Pattern',
      titleHi: 'यूपीएससी सिविल सेवा परीक्षा (आईएएस/आईपीएस) विस्तृत पाठ्यक्रम एवं परीक्षा पैटर्न',
      slug: 'upsc-civil-services-cse-detailed-syllabus-exam-pattern',
      postName: 'Preliminary GS 1 & CSAT, Mains 9 Papers Complete Topic-Wise Syllabus',
      organizationId: orgMap.get('UPSC')!,
      categoryId: categoryMap.get('syllabus')!,
      officialSourceId: sourceMap.get('UPSC'),
      syllabusUrl: 'https://upsc.gov.in/examinations/revised-syllabus-scheme',
      officialPdfUrl: 'https://upsc.gov.in/sites/default/files/CSE_Syllabus_Official.pdf',
      officialWebsiteUrl: 'https://upsc.gov.in',
      verificationStatus: 'VERIFIED',
      publicationStatus: 'PUBLISHED',
      isFeatured: false,
      isTrending: false,
      publishedAt: new Date(),
    },

    // PENDING APPROVAL (Automated Ingestion Queue for Admin Testing)
    {
      title: 'SSC Junior Engineer (JE) Civil, Electrical, Mechanical Examination 2026',
      titleHi: 'एसएससी जूनियर इंजीनियर (सिविल, इलेक्ट्रिकल, मैकेनिकल) परीक्षा 2026',
      slug: 'ssc-junior-engineer-je-recruitment-2026-pending',
      postName: 'Junior Engineer (Civil, Mechanical & Electrical) in CPWD, MES, CWC',
      organizationId: orgMap.get('SSC')!,
      categoryId: categoryMap.get('latest-jobs')!,
      officialSourceId: sourceMap.get('SSC'),
      vacancyCount: 968,
      qualification: 'Diploma or Degree in Relevant Engineering Discipline.',
      applicationStartDate: new Date('2026-03-28T00:00:00Z'),
      applicationEndDate: new Date('2026-04-25T23:00:00Z'),
      examDate: 'June 2026',
      applyOnlineUrl: 'https://ssc.gov.in',
      officialPdfUrl: 'https://ssc.gov.in/notice_je_2026_draft.pdf',
      officialWebsiteUrl: 'https://ssc.gov.in',
      sourceReference: 'SSC-AUTO-2026-03-JE',
      verificationStatus: 'PENDING',
      publicationStatus: 'DRAFT',
      isFeatured: false,
      isTrending: false,
    },
    {
      title: 'UPPSC Assistant Conservator of Forest (ACF) / RFO 2026 Notification',
      titleHi: 'यूपीपीएससी सहायक वन संरक्षक (ACF) / वन क्षेत्राधिकारी 2026 विज्ञापन',
      slug: 'uppsc-acf-rfo-recruitment-2026-pending',
      postName: 'Assistant Conservator of Forest and Regional Forest Officer',
      organizationId: orgMap.get('UPPSC')!,
      categoryId: categoryMap.get('latest-jobs')!,
      officialSourceId: sourceMap.get('UPPSC'),
      vacancyCount: 45,
      qualification: 'Bachelor Degree in Botany, Zoology, Chemistry, Physics, Mathematics, Forestry.',
      applyOnlineUrl: 'https://uppsc.up.nic.in',
      officialPdfUrl: 'https://uppsc.up.nic.in/ACF_2026_Draft.pdf',
      officialWebsiteUrl: 'https://uppsc.up.nic.in',
      sourceReference: 'UPPSC-AUTO-2026-ACF',
      verificationStatus: 'PENDING',
      publicationStatus: 'DRAFT',
      isFeatured: false,
      isTrending: false,
    }
  ];

  for (const notif of notifications) {
    await prisma.notification.upsert({
      where: { slug: notif.slug },
      update: notif,
      create: notif,
    });
  }
  console.log(`Seeded ${notifications.length} notifications.`);

  // 6. Seed Site Settings
  const settingsData = [
    { key: 'SITE_TITLE', value: 'Bharat Rojgar | भारत रोज़गार', description: 'Portal Main Title' },
    { key: 'SITE_TAGLINE', value: 'Official Indian Government Jobs, Results, Admit Cards & Recruitment Portal 2026', description: 'Portal Tagline' },
    { key: 'OFFICIAL_DISCLAIMER', value: 'Disclaimer: Bharat Rojgar (भारत रोज़गार) is an informational notification and aggregator portal. We NEVER collect recruitment application forms, candidate documents, or application fees. All candidate registrations, fee submissions, exam admit card downloads, and score verification must be completed exclusively on the respective official government websites indicated in each notice.', description: 'Mandatory Legal & Safety Disclaimer' },
    { key: 'HELPLINE_EMAIL', value: 'contact@bharatrojgar.gov.in', description: 'Contact Email' },
    { key: 'TICKER_TEXT', value: '🔥 UPSC Civil Services 2026 Online Form Active | SSC CGL 2026 Notification Released | UP Police Re-Exam Dates Announced | SSC GD Admit Cards Available', description: 'Breaking Announcements Ticker' },
  ];

  for (const s of settingsData) {
    await prisma.siteSettings.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    });
  }
  console.log(`Seeded site settings.`);

  // 7. Seed Advertisements
  const adsData = [
    {
      title: 'Free Mock Test Series for UPSC & SSC 2026 (Govt Exam Prep)',
      bannerUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=60',
      targetUrl: 'https://upsc.gov.in',
      placement: 'HOMEPAGE_TOP',
      isActive: true,
    },
    {
      title: 'National Scholarship Portal 2026 Registration Open - Apply Before 31 March',
      bannerUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60',
      targetUrl: 'https://scholarships.gov.in',
      placement: 'SIDEBAR_RIGHT',
      isActive: true,
    }
  ];

  for (const ad of adsData) {
    await prisma.advertisement.create({ data: ad });
  }
  console.log('Seeded advertisements.');

  console.log('Database seeding successfully finished!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
