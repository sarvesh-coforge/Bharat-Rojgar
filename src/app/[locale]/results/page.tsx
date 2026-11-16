import React from 'react';
import { getNotificationsByCategory } from '@/services/notification.service';
import { CategoryListingView } from '@/components/notifications/CategoryListingView';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sarkari Results 2026 | Government Exam Results & Merit Lists | Bharat Rojgar',
  description: 'Check latest Sarkari Exam Results, Score Cards, Cutoff Marks and Merit Lists for SSC, UPSC, Railways, Banking, UPPSC, NTA and State boards.',
};

export default async function ResultsPage({
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
  const { items, total, totalPages } = await getNotificationsByCategory('results', {
    organization: sParams.org,
    search: sParams.search,
    page: currentPage,
    limit: 15,
  });

  return (
    <CategoryListingView
      categoryName="Government Examination Results"
      categoryNameHi="सरकारी परीक्षा परिणाम (Results 2026)"
      categorySlug="results"
      description="Download official exam results, score cards, cutoff marks and final merit lists"
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
