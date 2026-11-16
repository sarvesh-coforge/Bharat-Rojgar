import React from 'react';
import { getNotificationsByCategory } from '@/services/notification.service';
import { CategoryListingView } from '@/components/notifications/CategoryListingView';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Answer Key 2026 | Question Paper Solution & Response Sheet | Bharat Rojgar',
  description: 'Download tentative and final answer keys, response sheets and submit online objections for government exams.',
};

export default async function AnswerKeysPage({
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
  const { items, total, totalPages } = await getNotificationsByCategory('answer-keys', {
    organization: sParams.org,
    search: sParams.search,
    page: currentPage,
    limit: 15,
  });

  return (
    <CategoryListingView
      categoryName="Official Answer Keys"
      categoryNameHi="उत्तर कुंजी (Answer Key & Response Sheet)"
      categorySlug="answer-keys"
      description="Download official tentative and final answer keys, response sheets and challenge links"
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
