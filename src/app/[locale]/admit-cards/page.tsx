import React from 'react';
import { getNotificationsByCategory } from '@/services/notification.service';
import { CategoryListingView } from '@/components/notifications/CategoryListingView';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admit Card 2026 | Hall Ticket & Exam City Intimation Slip | Bharat Rojgar',
  description: 'Download latest Sarkari Admit Cards, Hall Tickets, Exam City Intimation Slips and Interview Call Letters for SSC, UPSC, Railways, Bank exams.',
};

export default async function AdmitCardsPage({
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
  const { items, total, totalPages } = await getNotificationsByCategory('admit-cards', {
    organization: sParams.org,
    search: sParams.search,
    page: currentPage,
    limit: 15,
  });

  return (
    <CategoryListingView
      categoryName="Admit Cards & Hall Tickets"
      categoryNameHi="प्रवेश पत्र (Admit Card & Exam City 2026)"
      categorySlug="admit-cards"
      description="Download official exam hall tickets, exam city slips and interview letters"
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
