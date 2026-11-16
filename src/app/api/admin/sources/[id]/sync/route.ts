import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { DataCollectionManager } from '@/modules/data-collection/manager';

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
    const source = await prisma.officialSource.findUnique({
      where: { id },
    });

    if (!source) {
      return NextResponse.json({ error: 'Source not found' }, { status: 404 });
    }

    const result = await DataCollectionManager.syncSource(source.code);

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        userName: session.name,
        action: 'SYNC_SOURCE',
        entityType: 'SOURCE',
        entityId: id,
        details: `Manual sync triggered for ${source.name}. Result: ${result.status}, Found: ${result.itemsFound}, Ingested: ${result.itemsNew}`,
      },
    });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error('Sync source API error:', error);
    return NextResponse.json({ error: error?.message || 'Sync failed' }, { status: 500 });
  }
}
