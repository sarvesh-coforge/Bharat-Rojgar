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
    const { reason } = await request.json();

    const updated = await prisma.notification.update({
      where: { id },
      data: {
        verificationStatus: 'REJECTED',
        publicationStatus: 'ARCHIVED',
        rejectionReason: reason || 'Information does not match official government source.',
        verifiedBy: session.name,
        verifiedAt: new Date(),
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        userName: session.name,
        action: 'REJECT_NOTIFICATION',
        entityType: 'NOTIFICATION',
        entityId: id,
        details: `Rejected notification '${updated.title}'. Reason: ${reason}`,
      },
    });

    return NextResponse.json({ success: true, notification: updated });
  } catch (error: any) {
    console.error('Reject error:', error);
    return NextResponse.json({ error: 'Failed to reject' }, { status: 500 });
  }
}
