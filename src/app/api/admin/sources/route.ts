import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const sources = await prisma.officialSource.findMany({
      orderBy: { name: 'asc' },
      include: {
        fetchLogs: {
          take: 5,
          orderBy: { fetchedAt: 'desc' },
        },
      },
    });

    return NextResponse.json({ sources });
  } catch (error: any) {
    console.error('Fetch sources error:', error);
    return NextResponse.json({ error: 'Failed to fetch sources' }, { status: 500 });
  }
}
