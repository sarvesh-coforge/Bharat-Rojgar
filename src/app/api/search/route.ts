import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.trim() || '';

  if (!q) {
    return NextResponse.json({ items: [] });
  }

  try {
    const items = await prisma.notification.findMany({
      where: {
        publicationStatus: 'PUBLISHED',
        verificationStatus: 'VERIFIED',
        OR: [
          { title: { contains: q } },
          { titleHi: { contains: q } },
          { postName: { contains: q } },
          { organization: { shortName: { contains: q } } },
          { organization: { name: { contains: q } } },
        ],
      },
      take: 15,
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        titleHi: true,
        slug: true,
        applicationEndDate: true,
        examDate: true,
        category: {
          select: {
            slug: true,
            name: true,
            nameHi: true,
          },
        },
        organization: {
          select: {
            shortName: true,
          },
        },
      },
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
