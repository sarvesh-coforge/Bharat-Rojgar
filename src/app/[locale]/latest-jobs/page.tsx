import React from 'react';
import { getNotificationsByCategory } from '@/services/notification.service';
import { CategoryListingView } from '@/components/notifications/CategoryListingView';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Latest Government Jobs 2026 | Sarkari Naukri Online Form | Bharat Rojgar',
  description: 'Find all latest Central and State Government Jobs 2026, Railway RRB, SSC, UPSC, Bank IBPS, Police vacancies with eligibility, application fee and direct official apply links.',
};

export default async function LatestJobsPage({
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
  const { items, total, totalPages } = await getNotificationsByCategory('latest-jobs', {
    organization: sParams.org,
    search: sParams.search,
    page: currentPage,
    limit: 15,
  });

  return (
    <CategoryListingView
      categoryName="Latest Government Jobs"
      categoryNameHi="नवीनतम सरकारी नौकरियां (Latest Jobs 2026)"
      categorySlug="latest-jobs"
      description="All active central & state government recruitment notifications with official apply links"
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
