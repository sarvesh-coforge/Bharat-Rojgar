import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [
      totalNotifications,
      publishedJobs,
      publishedResults,
      publishedAdmitCards,
      publishedAnswerKeys,
      pendingApprovals,
      activeSources,
      failedFetches,
      recentNotifications,
      recentLogs,
    ] = await Promise.all([
      prisma.notification.count(),
      prisma.notification.count({
        where: { category: { slug: 'latest-jobs' }, publicationStatus: 'PUBLISHED' },
      }),
      prisma.notification.count({
        where: { category: { slug: 'results' }, publicationStatus: 'PUBLISHED' },
      }),
      prisma.notification.count({
        where: { category: { slug: 'admit-cards' }, publicationStatus: 'PUBLISHED' },
      }),
      prisma.notification.count({
        where: { category: { slug: 'answer-keys' }, publicationStatus: 'PUBLISHED' },
      }),
      prisma.notification.count({
        where: { verificationStatus: 'PENDING' },
      }),
      prisma.officialSource.count({
        where: { isActive: true },
      }),
      prisma.sourceFetchLog.count({
        where: { status: 'ERROR' },
      }),
      prisma.notification.findMany({
        take: 8,
        orderBy: { updatedAt: 'desc' },
        include: {
          organization: true,
          category: true,
        },
      }),
      prisma.auditLog.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalNotifications,
        publishedJobs,
        publishedResults,
        publishedAdmitCards,
        publishedAnswerKeys,
        pendingApprovals,
        activeSources,
        failedFetches,
      },
      recentNotifications,
      recentLogs,
    });
  } catch (error: any) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json({ error: 'Failed to load dashboard' }, { status: 500 });
  }
}
