import React from 'react';
import { getNotificationsByCategory } from '@/services/notification.service';
import { CategoryListingView } from '@/components/notifications/CategoryListingView';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exam Syllabus 2026 | Scheme & Pattern PDF Download | Bharat Rojgar',
  description: 'Download official exam syllabus, selection schemes and exam pattern PDFs for UPSC, SSC, RRB, Banking and Police recruitment.',
};

export default async function SyllabusPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ org?: string; search?: string; page?: string }>;
}) {
  const { locale } = await params;
  const sParams = await searchParams;
  setRequestLocale(locale);

  const currentPage = sParams.page ? parseInt(sParams.page, 10) : 1;
  const { items, total, totalPages } = await getNotificationsByCategory('syllabus', {
    organization: sParams.org,
    search: sParams.search,
    page: currentPage,
    limit: 15,
  });

  return (
    <CategoryListingView
      categoryName="Examination Syllabus & Pattern"
      categoryNameHi="परीक्षा पाठ्यक्रम (Exam Syllabus & Pattern)"
      categorySlug="syllabus"
      description="Download complete syllabus, subject-wise marking scheme and paper patterns"
      items={items}
      total={total}
      currentPage={currentPage}
      totalPages={totalPages}
      selectedOrg={sParams.org}
      searchQuery={sParams.search}
      locale={locale}
    />
  );
}
