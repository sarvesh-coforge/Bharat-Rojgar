import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const ads = await prisma.advertisement.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json({ ads });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const ad = await prisma.advertisement.create({
      data: {
        title: data.title,
        bannerUrl: data.bannerUrl,
        targetUrl: data.targetUrl,
        placement: data.placement || 'HOMEPAGE_TOP',
        isActive: Boolean(data.isActive),
      },
    });

    return NextResponse.json({ success: true, ad });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to create ad' }, { status: 500 });
  }
}
