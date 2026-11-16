import React from 'react';
import { NotificationForm } from '@/components/admin/NotificationForm';
import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';

export default async function EditNotificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notification = await prisma.notification.findUnique({
    where: { id },
  });

  if (!notification) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <NotificationForm initialData={notification} isEdit={true} />
    </div>
  );
}
