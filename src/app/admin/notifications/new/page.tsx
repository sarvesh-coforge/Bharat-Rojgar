import React from 'react';
import { NotificationForm } from '@/components/admin/NotificationForm';
import prisma from '@/lib/prisma';

export default async function NewNotificationPage() {
  const orgs = await prisma.organization.findMany();
  const categories = await prisma.notificationCategory.findMany();

  return (
    <div className="space-y-6">
      <NotificationForm
        initialData={{
          organizationId: orgs[0]?.id || '',
          categoryId: categories[0]?.id || '',
          publicationStatus: 'PUBLISHED',
          verificationStatus: 'VERIFIED',
        }}
        isEdit={false}
      />
    </div>
  );
}
