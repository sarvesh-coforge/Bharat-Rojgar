import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const notification = await prisma.notification.findUnique({
    where: { id },
    include: {
      organization: true,
      category: true,
      officialSource: true,
    },
  });

  if (!notification) {
    return NextResponse.json({ error: 'Notification not found' }, { status: 404 });
  }

  return NextResponse.json({ notification });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const data = await request.json();

    const updated = await prisma.notification.update({
      where: { id },
      data: {
        title: data.title,
        titleHi: data.titleHi,
        postName: data.postName,
        description: data.description,
        organizationId: data.organizationId,
        categoryId: data.categoryId,
        vacancyCount: data.vacancyCount !== undefined ? parseInt(data.vacancyCount, 10) : undefined,
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
        verificationStatus: data.verificationStatus,
        publicationStatus: data.publicationStatus,
        isFeatured: data.isFeatured !== undefined ? Boolean(data.isFeatured) : undefined,
        isTrending: data.isTrending !== undefined ? Boolean(data.isTrending) : undefined,
        publishedAt: data.publicationStatus === 'PUBLISHED' ? new Date() : undefined,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        userName: session.name,
        action: 'UPDATE_NOTIFICATION',
        entityType: 'NOTIFICATION',
        entityId: id,
        details: `Updated details for ${updated.title}`,
      },
    });

    return NextResponse.json({ success: true, notification: updated });
  } catch (error: any) {
    console.error('Update notification error:', error);
    return NextResponse.json({ error: error?.message || 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const deleted = await prisma.notification.delete({
      where: { id },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        userName: session.name,
        action: 'DELETE_NOTIFICATION',
        entityType: 'NOTIFICATION',
        entityId: id,
        details: `Deleted notification: ${deleted.title}`,
      },
    });

    return NextResponse.json({ success: true, message: 'Notification deleted successfully' });
  } catch (error: any) {
    console.error('Delete notification error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
