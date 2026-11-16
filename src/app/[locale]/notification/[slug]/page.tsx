import React from 'react';
import { getNotificationBySlug } from '@/services/notification.service';
import { NotificationDetailView } from '@/components/notifications/NotificationDetailView';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const result = await getNotificationBySlug(slug);

  if (!result || !result.notification) {
    return {
      title: 'Notification Not Found | Bharat Rojgar',
    };
  }

  const { notification } = result;
  const isHindi = locale === 'hi';
  const title = isHindi && notification.titleHi ? notification.titleHi : notification.title;

  return {
    title: `${title} | Bharat Rojgar`,
    description: `Complete official details, eligibility criteria, vacancy breakdown, important dates and direct official links for ${notification.title}`,
    openGraph: {
      title: `${title} - Bharat Rojgar Official Portal`,
      description: `Check eligibility, dates and apply on official portal.`,
      url: `https://bharatrojgar.gov.in/${locale}/notification/${slug}`,
      siteName: 'Bharat Rojgar',
      locale: isHindi ? 'hi_IN' : 'en_IN',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Bharat Rojgar`,
      description: `Official details, dates and direct government portal links.`,
    },
  };
}

export default async function NotificationDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const result = await getNotificationBySlug(slug);
  if (!result || !result.notification) {
    notFound();
  }

  const { notification, related } = result;

  // Generate Google-compliant JobPosting JSON-LD structured data if category is latest-jobs
  const isJob = notification.category.slug === 'latest-jobs';
  const jsonLd = isJob
    ? {
        '@context': 'https://schema.org',
        '@type': 'JobPosting',
        title: notification.title,
        description: `${notification.postName || notification.title}. Eligibility: ${notification.qualification || 'Check official PDF'}. Total Vacancies: ${notification.vacancyCount || 'Various'}.`,
        identifier: {
          '@type': 'PropertyValue',
          name: notification.organization.shortName,
          value: notification.sourceReference || notification.slug,
        },
        datePosted: notification.publishedAt?.toISOString() || notification.createdAt.toISOString(),
        validThrough: notification.applicationEndDate?.toISOString(),
        employmentType: 'FULL_TIME',
        hiringOrganization: {
          '@type': 'Organization',
          name: notification.organization.name,
          sameAs: notification.organization.websiteUrl,
        },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'IN',
            addressRegion: notification.organization.state || 'All India',
          },
        },
        baseSalary: {
          '@type': 'MonetaryAmount',
          currency: 'INR',
          value: {
            '@type': 'QuantitativeValue',
            value: notification.salary || '7th CPC Pay Matrix',
            unitText: 'MONTH',
          },
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <NotificationDetailView
        notification={notification}
        related={related}
        locale={locale}
      />
    </>
  );
}
