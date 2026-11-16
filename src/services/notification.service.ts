import prisma from '@/lib/prisma';

export async function getHomepageData() {
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
    tickerText: settingsMap['TICKER_TEXT'] || '',
    disclaimer: settingsMap['OFFICIAL_DISCLAIMER'] || '',
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
}

export async function getNotificationBySlug(slug: string) {
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
}
