import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const updated = await prisma.notification.update({
      where: { id },
      data: {
        verificationStatus: 'VERIFIED',
        publicationStatus: 'PUBLISHED',
        verifiedBy: session.name,
        verifiedAt: new Date(),
        publishedAt: new Date(),
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        userName: session.name,
        action: 'APPROVE_NOTIFICATION',
        entityType: 'NOTIFICATION',
        entityId: id,
        details: `Approved & published notification: ${updated.title}`,
      },
    });

    return NextResponse.json({ success: true, notification: updated });
  } catch (error: any) {
    console.error('Approve error:', error);
    return NextResponse.json({ error: 'Failed to approve' }, { status: 500 });
  }
}
