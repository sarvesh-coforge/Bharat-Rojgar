import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sarkariselection.com';

  // Base static pages for both en and hi
  const staticRoutes = [
    '',
    '/latest-jobs',
    '/results',
    '/admit-cards',
    '/answer-keys',
    '/syllabus',
    '/admissions',
    '/scholarships',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of ['en', 'hi']) {
    for (const route of staticRoutes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'hourly' : 'daily',
        priority: route === '' ? 1.0 : 0.8,
      });
    }
  }

  // Fetch all published notifications
  try {
    const notifications = await prisma.notification.findMany({
      where: { publicationStatus: 'PUBLISHED' },
      select: { slug: true, updatedAt: true },
      take: 500,
    });

    for (const notif of notifications) {
      for (const locale of ['en', 'hi']) {
        sitemapEntries.push({
          url: `${baseUrl}/${locale}/notification/${notif.slug}`,
          lastModified: notif.updatedAt,
          changeFrequency: 'daily',
          priority: 0.9,
        });
      }
    }
  } catch (err) {
    console.error('Sitemap fetch error:', err);
  }

  return sitemapEntries;
}
