import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const status = searchParams.get('status');
  const verification = searchParams.get('verification');
  const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const skip = (page - 1) * limit;

  const where: any = {};
  if (category) where.category = { slug: category };
  if (status) where.publicationStatus = status;
  if (verification) where.verificationStatus = verification;
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { titleHi: { contains: search } },
      { postName: { contains: search } },
    ];
  }

  try {
    const [items, total] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { updatedAt: 'desc' },
        skip,
        take: limit,
        include: {
          organization: true,
          category: true,
        },
      }),
      prisma.notification.count({ where }),
    ]);

    return NextResponse.json({
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error: any) {
    console.error('Fetch notifications error:', error);
    return NextResponse.json({ error: 'Failed to fetch notifications' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();

    if (!data.title || !data.organizationId || !data.categoryId || !data.officialWebsiteUrl) {
      return NextResponse.json(
        { error: 'Title, Organization, Category, and Official Website URL are required.' },
        { status: 400 }
      );
    }

    // Generate unique slug
    const baseSlug = (data.slug || data.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    let slug = baseSlug;
    const existing = await prisma.notification.findUnique({ where: { slug } });
    if (existing) {
      slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }

    const newNotification = await prisma.notification.create({
      data: {
        title: data.title,
        titleHi: data.titleHi,
        slug,
        description: data.description,
        postName: data.postName,
        organizationId: data.organizationId,
        categoryId: data.categoryId,
        vacancyCount: data.vacancyCount ? parseInt(data.vacancyCount, 10) : 0,
        vacancyBreakdown: data.vacancyBreakdown,
        qualification: data.qualification,
        qualificationHi: data.qualificationHi,
        salary: data.salary,
        salaryHi: data.salaryHi,
        ageLimit: data.ageLimit,
        ageLimitHi: data.ageLimitHi,
        feeDetails: data.feeDetails,
        selectionProcess: data.selectionProcess,
        applicationStartDate: data.applicationStartDate ? new Date(data.applicationStartDate) : null,
        applicationEndDate: data.applicationEndDate ? new Date(data.applicationEndDate) : null,
        feeLastDate: data.feeLastDate ? new Date(data.feeLastDate) : null,
        examDate: data.examDate,
        admitCardDate: data.admitCardDate,
        resultDate: data.resultDate,
        applyOnlineUrl: data.applyOnlineUrl,
        officialPdfUrl: data.officialPdfUrl,
        officialWebsiteUrl: data.officialWebsiteUrl,
        resultUrl: data.resultUrl,
        admitCardUrl: data.admitCardUrl,
        answerKeyUrl: data.answerKeyUrl,
        syllabusUrl: data.syllabusUrl,
        verificationStatus: data.verificationStatus || 'VERIFIED',
        publicationStatus: data.publicationStatus || 'PUBLISHED',
        isFeatured: Boolean(data.isFeatured),
        isTrending: Boolean(data.isTrending),
        publishedAt: data.publicationStatus === 'PUBLISHED' ? new Date() : null,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        userName: session.name,
        action: 'CREATE_NOTIFICATION',
        entityType: 'NOTIFICATION',
        entityId: newNotification.id,
        details: `Created notification: ${newNotification.title}`,
      },
    });

    return NextResponse.json({ success: true, notification: newNotification });
  } catch (error: any) {
    console.error('Create notification error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to create' }, { status: 500 });
  }
}
