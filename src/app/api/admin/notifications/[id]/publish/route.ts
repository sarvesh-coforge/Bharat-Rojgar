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
    const existing = await prisma.notification.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const nextStatus = existing.publicationStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED';
    const updated = await prisma.notification.update({
      where: { id },
      data: {
        publicationStatus: nextStatus,
        publishedAt: nextStatus === 'PUBLISHED' ? new Date() : existing.publishedAt,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        userName: session.name,
        action: 'TOGGLE_PUBLISH',
        entityType: 'NOTIFICATION',
        entityId: id,
        details: `Toggled status to ${nextStatus} for ${updated.title}`,
      },
    });

    return NextResponse.json({ success: true, notification: updated });
  } catch (error: any) {
    console.error('Publish error:', error);
    return NextResponse.json({ error: 'Failed to update publish state' }, { status: 500 });
  }
}
