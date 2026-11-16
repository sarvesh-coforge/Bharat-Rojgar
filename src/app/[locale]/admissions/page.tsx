import React from 'react';
import { getNotificationsByCategory } from '@/services/notification.service';
import { CategoryListingView } from '@/components/notifications/CategoryListingView';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admission 2026 | Entrance Exams, Counselling & Merit Lists | Bharat Rojgar',
  description: 'Apply online for Central and State University admissions, NEET UG, JEE Main, CUET and polytechnic entrance exams.',
};

export default async function AdmissionsPage({
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
  const { items, total, totalPages } = await getNotificationsByCategory('admissions', {
    organization: sParams.org,
    search: sParams.search,
    page: currentPage,
    limit: 15,
  });

  return (
    <CategoryListingView
      categoryName="Admissions & Entrance Examinations"
      categoryNameHi="विश्वविद्यालय एवं प्रवेश परीक्षा (Admission 2026)"
      categorySlug="admissions"
      description="Online entrance examination applications, counselling schedules and college merit lists"
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
