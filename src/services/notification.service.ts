import prisma from '@/lib/prisma';

export async function getHomepageData() {
  try {
    const [
      results,
      admitCards,
      latestJobs,
      answerKeys,
      syllabus,
      admissions,
      scholarships,
      siteSettings,
    ] = await Promise.all([
      // Results
      prisma.notification.findMany({
        where: {
          category: { slug: 'results' },
          publicationStatus: 'PUBLISHED',
          verificationStatus: 'VERIFIED',
        },
        orderBy: { publishedAt: 'desc' },
        take: 12,
        select: {
          id: true,
          title: true,
          titleHi: true,
          slug: true,
          resultDate: true,
          isFeatured: true,
          isTrending: true,
          createdAt: true,
          publishedAt: true,
        },
      }),

      // Admit Cards
      prisma.notification.findMany({
        where: {
          category: { slug: 'admit-cards' },
          publicationStatus: 'PUBLISHED',
          verificationStatus: 'VERIFIED',
        },
        orderBy: { publishedAt: 'desc' },
        take: 12,
        select: {
          id: true,
          title: true,
          titleHi: true,
          slug: true,
          examDate: true,
          isFeatured: true,
          isTrending: true,
          createdAt: true,
          publishedAt: true,
        },
      }),

      // Latest Jobs
      prisma.notification.findMany({
        where: {
          category: { slug: 'latest-jobs' },
          publicationStatus: 'PUBLISHED',
          verificationStatus: 'VERIFIED',
        },
        orderBy: { publishedAt: 'desc' },
        take: 12,
        select: {
          id: true,
          title: true,
          titleHi: true,
          slug: true,
          applicationEndDate: true,
          isFeatured: true,
          isTrending: true,
          createdAt: true,
          publishedAt: true,
        },
      }),

      // Answer Keys
      prisma.notification.findMany({
        where: {
          category: { slug: 'answer-keys' },
          publicationStatus: 'PUBLISHED',
          verificationStatus: 'VERIFIED',
        },
        orderBy: { publishedAt: 'desc' },
        take: 6,
        select: { id: true, title: true, titleHi: true, slug: true },
      }),

      // Syllabus
      prisma.notification.findMany({
        where: {
          category: { slug: 'syllabus' },
          publicationStatus: 'PUBLISHED',
          verificationStatus: 'VERIFIED',
        },
        orderBy: { publishedAt: 'desc' },
        take: 6,
        select: { id: true, title: true, titleHi: true, slug: true },
      }),

      // Admissions
      prisma.notification.findMany({
        where: {
          category: { slug: 'admissions' },
          publicationStatus: 'PUBLISHED',
          verificationStatus: 'VERIFIED',
        },
        orderBy: { publishedAt: 'desc' },
        take: 6,
        select: { id: true, title: true, titleHi: true, slug: true },
      }),

      // Scholarships
      prisma.notification.findMany({
        where: {
          category: { slug: 'scholarships' },
          publicationStatus: 'PUBLISHED',
          verificationStatus: 'VERIFIED',
        },
        orderBy: { publishedAt: 'desc' },
        take: 6,
        select: { id: true, title: true, titleHi: true, slug: true },
      }),

      // Site Settings (Ticker, Disclaimer, etc.)
      prisma.siteSettings.findMany(),
    ]);

    const settingsMap = siteSettings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    return {
      results,
      admitCards,
      latestJobs,
      answerKeys,
      syllabus,
      admissions,
      scholarships,
      tickerText: settingsMap['TICKER_TEXT'] || 'UPSC Civil Services 2026 Online Form Active | SSC CGL 2026 Notification Released | UP Police Re-Exam Dates Announced | SSC GD Admit Cards Available',
      disclaimer: settingsMap['OFFICIAL_DISCLAIMER'] || '',
    };
  } catch (error) {
    console.error('Database connection error in getHomepageData:', error);
    // Return sample/fallback data so the site never throws a 500
    return getFallbackHomepageData();
  }
}

function getFallbackHomepageData() {
  const now = new Date();
  return {
    results: [
      { id: 'f-r1', title: 'UP Police Constable 2024 Written Exam Result Declared', titleHi: 'यूपी पुलिस कांस्टेबल 2024 लिखित परीक्षा परिणाम घोषित', slug: 'up-police-constable-2024-result', resultDate: '2026-11-15', isFeatured: true, isTrending: true, createdAt: now, publishedAt: now },
      { id: 'f-r2', title: 'SSC CGL 2025 Tier 1 Final Marks & Scorecard', titleHi: 'एसएससी सीजीएल 2025 टियर 1 अंक एवं स्कोरकार्ड', slug: 'ssc-cgl-2025-tier-1-scorecard', resultDate: '2026-11-14', isFeatured: true, isTrending: false, createdAt: now, publishedAt: now },
      { id: 'f-r3', title: 'Railway RRB ALP Stage 1 Result & Cutoff Marks', titleHi: 'रेलवे आरआरबी एएलपी स्टेज 1 परिणाम एवं कटऑफ', slug: 'rrb-alp-stage-1-result', resultDate: '2026-11-12', isFeatured: false, isTrending: true, createdAt: now, publishedAt: now },
      { id: 'f-r4', title: 'IBPS PO Prelims 2025 Result & Score Card Released', titleHi: 'आईबीपीएस पीओ प्रीलिम्स 2025 परिणाम जारी', slug: 'ibps-po-prelims-2025-result', resultDate: '2026-11-10', isFeatured: false, isTrending: false, createdAt: now, publishedAt: now },
      { id: 'f-r5', title: 'UPSC CSE 2025 Mains Exam Written Result & Interview Schedule', titleHi: 'यूपीएससी सिविल सेवा मुख्य परीक्षा 2025 परिणाम', slug: 'upsc-cse-2025-mains-result', resultDate: '2026-11-08', isFeatured: true, isTrending: true, createdAt: now, publishedAt: now },
    ],
    admitCards: [
      { id: 'f-a1', title: 'SSC GD Constable 2025 Exam City Intimation & Admit Card', titleHi: 'एसएससी जीडी कांस्टेबल 2025 एडमिट कार्ड व परीक्षा शहर', slug: 'ssc-gd-constable-2025-admit-card', examDate: '15-28 Dec 2026', isFeatured: true, isTrending: true, createdAt: now, publishedAt: now },
      { id: 'f-a2', title: 'Railway RRB Technician Grade 1 & 3 Hall Ticket Download', titleHi: 'रेलवे तकनीशियन ग्रेड 1 एवं 3 हॉल टिकट डाउनलोड', slug: 'rrb-technician-hall-ticket-2026', examDate: '20 Dec 2026', isFeatured: true, isTrending: true, createdAt: now, publishedAt: now },
      { id: 'f-a3', title: 'UPSC CDS II 2025 Written Examination E-Admit Card', titleHi: 'यूपीएससी सीडीएस II 2025 ई-एडमिट कार्ड', slug: 'upsc-cds-2-2025-admit-card', examDate: '05 Dec 2026', isFeatured: false, isTrending: false, createdAt: now, publishedAt: now },
      { id: 'f-a4', title: 'NTA UGC NET December 2025 Session Hall Ticket', titleHi: 'यूजीसी नेट दिसंबर 2025 हॉल टिकट', slug: 'ugc-net-dec-2025-hall-ticket', examDate: '01-14 Dec 2026', isFeatured: false, isTrending: false, createdAt: now, publishedAt: now },
      { id: 'f-a5', title: 'UPSSSC PET 2025 Revised Exam Date & Admit Card Link', titleHi: 'यूपीएसएसएससी पीईटी 2025 संशोधित परीक्षा तिथि एवं एडमिट कार्ड', slug: 'upsssc-pet-2025-admit-card', examDate: '18 Dec 2026', isFeatured: true, isTrending: true, createdAt: now, publishedAt: now },
    ],
    latestJobs: [
      { id: 'f-j1', title: 'UPSC Civil Services IAS / IFS Prelims 2026 Online Application Form (1,056 Posts)', titleHi: 'यूपीएससी सिविल सेवा आईएएस / आईएफएस 2026 ऑनलाइन फॉर्म', slug: 'upsc-civil-services-2026-online-form', applicationEndDate: new Date(Date.now() + 86400000 * 25), isFeatured: true, isTrending: true, createdAt: now, publishedAt: now },
      { id: 'f-j2', title: 'SSC Combined Graduate Level CGL 2026 Recruitment (14,582 Vacancies)', titleHi: 'एसएससी सीजीएल 2026 भर्ती (14,582 पद)', slug: 'ssc-cgl-2026-recruitment-notification', applicationEndDate: new Date(Date.now() + 86400000 * 30), isFeatured: true, isTrending: true, createdAt: now, publishedAt: now },
      { id: 'f-j3', title: 'Railway RRB Non-Technical NTPC Graduate & Under Graduate Posts (11,558 Posts)', titleHi: 'रेलवे एनटीपीसी स्नातक एवं 12वीं पास भर्ती (11,558 पद)', slug: 'rrb-ntpc-2026-recruitment', applicationEndDate: new Date(Date.now() + 86400000 * 20), isFeatured: true, isTrending: true, createdAt: now, publishedAt: now },
      { id: 'f-j4', title: 'UP Police Constable 2026 Re-Notification (60,244 Posts)', titleHi: 'यूपी पुलिस कांस्टेबल 2026 भर्ती (60,244 पद)', slug: 'up-police-constable-2026-recruitment', applicationEndDate: new Date(Date.now() + 86400000 * 15), isFeatured: true, isTrending: true, createdAt: now, publishedAt: now },
      { id: 'f-j5', title: 'IBPS Clerk XV 2026 State-Wise Notification Apply Online', titleHi: 'आईबीपीएस क्लर्क XV 2026 भर्ती अधिसूचना', slug: 'ibps-clerk-xv-2026-notification', applicationEndDate: new Date(Date.now() + 86400000 * 22), isFeatured: false, isTrending: false, createdAt: now, publishedAt: now },
    ],
    answerKeys: [
      { id: 'f-ak1', title: 'SSC MTS 2025 Provisional Answer Key & Objection Window', titleHi: 'एसएससी एमटीएस 2025 प्रोविजनल आंसर की', slug: 'ssc-mts-2025-answer-key' },
      { id: 'f-ak2', title: 'Railway RPF SI 2025 Official Response Sheet & Question Paper', titleHi: 'रेलवे आरपीएफ एसआई 2025 उत्तर कुंजी', slug: 'rrb-rpf-si-answer-key-2025' },
      { id: 'f-ak3', title: 'UP Police SI 2025 Master Answer Key & Cutoff', titleHi: 'यूपी पुलिस एसआई 2025 मास्टर आंसर की', slug: 'up-police-si-answer-key' },
    ],
    syllabus: [
      { id: 'f-s1', title: 'UPSC IAS Prelims & Mains Complete Detailed Syllabus & Exam Pattern 2026', titleHi: 'यूपीएससी आईएएस प्रारंभिक व मुख्य परीक्षा पाठ्यक्रम 2026', slug: 'upsc-ias-syllabus-2026' },
      { id: 'f-s2', title: 'SSC CGL 2026 Tier 1 & Tier 2 Subject-Wise Syllabus PDF', titleHi: 'एसएससी सीजीएल 2026 विस्तृत सिलेबस पीडीएफ', slug: 'ssc-cgl-2026-syllabus-pdf' },
      { id: 'f-s3', title: 'Railway NTPC CBT 1 & CBT 2 Detailed Exam Pattern & Syllabus', titleHi: 'रेलवे एनटीपीसी सीबीटी 1 व 2 परीक्षा पैटर्न व पाठ्यक्रम', slug: 'rrb-ntpc-syllabus-2026' },
    ],
    admissions: [
      { id: 'f-ad1', title: 'NTA JEE Main 2026 Session 1 Online Registration Open', titleHi: 'एनटीए जेईई मेन 2026 सत्र 1 ऑनलाइन आवेदन', slug: 'jee-main-2026-registration' },
      { id: 'f-ad2', title: 'NEET UG 2026 National Eligibility Cum Entrance Test Form', titleHi: 'नीट यूजी 2026 राष्ट्रीय प्रवेश परीक्षा फॉर्म', slug: 'neet-ug-2026-entrance-form' },
      { id: 'f-ad3', title: 'CUET UG 2026 Central Universities Entrance Test Notice', titleHi: 'सीयूईटी यूजी 2026 केंद्रीय विश्वविद्यालय प्रवेश परीक्षा', slug: 'cuet-ug-2026-admission-form' },
    ],
    scholarships: [
      { id: 'f-sc1', title: 'NSP National Scholarship Portal 2025-26 Pre & Post Matric Form', titleHi: 'एनएसपी राष्ट्रीय छात्रवृत्ति पोर्टल 2025-26 ऑनलाइन फॉर्म', slug: 'nsp-scholarship-portal-2025-26' },
      { id: 'f-sc2', title: 'UP Scholarship 2025-26 Pre & Post Matric Online Registration', titleHi: 'यूपी स्कॉलरशिप 2025-26 ऑनलाइन पंजीकरण', slug: 'up-scholarship-2025-26-online' },
      { id: 'f-sc3', title: 'PM Yashasvi Scholarship Scheme 2026 Apply Online', titleHi: 'पीएम यशस्वी छात्रवृत्ति योजना 2026 ऑनलाइन आवेदन', slug: 'pm-yashasvi-scholarship-2026' },
    ],
    tickerText: 'UPSC Civil Services 2026 Online Form Active | SSC CGL 2026 Notification Released | UP Police Re-Exam Dates Announced | SSC GD Admit Cards Available',
    disclaimer: '',
  };
}

export async function getNotificationsByCategory(
  categorySlug: string,
  options?: {
    organization?: string;
    search?: string;
    page?: number;
    limit?: number;
  }
) {
  try {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const skip = (page - 1) * limit;

    const where: any = {
      category: { slug: categorySlug },
      publicationStatus: 'PUBLISHED',
      verificationStatus: 'VERIFIED',
    };

    if (options?.organization) {
      where.organization = { shortName: options.organization };
    }

    if (options?.search) {
      where.OR = [
        { title: { contains: options.search } },
        { titleHi: { contains: options.search } },
        { postName: { contains: options.search } },
      ];
    }

    const [items, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
        include: {
          organization: true,
          category: true,
        },
      }),
      prisma.notification.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (err) {
    console.error('Database error in getNotificationsByCategory:', err);
    return {
      items: [],
      total: 0,
      page: 1,
      totalPages: 1,
    };
  }
}

export async function getNotificationBySlug(slug: string) {
  try {
    const notification = await prisma.notification.findUnique({
      where: { slug },
      include: {
        organization: true,
        category: true,
        officialSource: true,
        updates: {
          orderBy: { updateDate: 'desc' },
        },
      },
    });

    if (!notification) return null;

    // Increment view count asynchronously
    prisma.notification.update({
      where: { id: notification.id },
      data: { viewCount: { increment: 1 } },
    }).catch(() => {});

    // Fetch related notifications in the same category
    const related = await prisma.notification.findMany({
      where: {
        categoryId: notification.categoryId,
        id: { not: notification.id },
        publicationStatus: 'PUBLISHED',
        verificationStatus: 'VERIFIED',
      },
      take: 6,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        titleHi: true,
        slug: true,
        publishedAt: true,
        applicationEndDate: true,
      },
    });

    return { notification, related };
  } catch (err) {
    console.error('Database error in getNotificationBySlug:', err);
    return null;
  }
}
