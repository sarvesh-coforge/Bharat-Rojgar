import prisma from '@/lib/prisma';
import { registeredConnectors } from './connectors';
import { SyncResult } from './types';

export class DataCollectionManager {
  /**
   * Synchronize a specific source by its code (e.g. 'UPSC', 'SSC')
   */
  static async syncSource(sourceCode: string): Promise<SyncResult> {
    const connector = registeredConnectors[sourceCode];
    if (!connector) {
      return {
        sourceCode,
        status: 'ERROR',
        itemsFound: 0,
        itemsNew: 0,
        errorMessage: `No connector registered for source code: ${sourceCode}`,
      };
    }

    const sourceRecord = await prisma.officialSource.findUnique({
      where: { code: sourceCode },
    });

    if (!sourceRecord) {
      return {
        sourceCode,
        status: 'ERROR',
        itemsFound: 0,
        itemsNew: 0,
        errorMessage: `Source not found in database: ${sourceCode}`,
      };
    }

    try {
      // 1. Fetch raw items
      const rawItems = await connector.fetchUpdates();
      let itemsNew = 0;

      // 2. Fetch categories and org
      const categories = await prisma.notificationCategory.findMany();
      const categoryMap = new Map(categories.map((c) => [c.slug, c.id]));

      const org = await prisma.organization.findUnique({
        where: { shortName: sourceCode },
      });

      if (!org) {
        throw new Error(`Organization matching source code '${sourceCode}' not found.`);
      }

      // 3. Process each raw item with duplicate detection
      for (const item of rawItems) {
        const existing = await prisma.notification.findFirst({
          where: {
            OR: [
              { sourceReference: item.sourceReference },
              { title: item.title },
            ],
          },
        });

        if (!existing) {
          // Generate unique slug
          const baseSlug = item.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
          const uniqueSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

          const targetCategoryId =
            categoryMap.get(item.categorySlug) || categoryMap.get('latest-jobs')!;

          // STRICT SAFETY: Ingest strictly as PENDING & DRAFT
          await prisma.notification.create({
            data: {
              title: item.title,
              slug: uniqueSlug,
              description: item.details,
              organizationId: org.id,
              categoryId: targetCategoryId,
              officialSourceId: sourceRecord.id,
              sourceReference: item.sourceReference,
              officialWebsiteUrl: org.websiteUrl,
              officialPdfUrl: item.pdfUrl,
              applyOnlineUrl: item.categorySlug === 'latest-jobs' ? item.officialUrl : undefined,
              resultUrl: item.categorySlug === 'results' ? item.officialUrl : undefined,
              admitCardUrl: item.categorySlug === 'admit-cards' ? item.officialUrl : undefined,
              answerKeyUrl: item.categorySlug === 'answer-keys' ? item.officialUrl : undefined,
              verificationStatus: 'PENDING',
              publicationStatus: 'DRAFT',
            },
          });
          itemsNew++;
        }
      }

      // 4. Update source metadata
      await prisma.officialSource.update({
        where: { id: sourceRecord.id },
        data: {
          lastFetchedAt: new Date(),
          lastStatus: 'SUCCESS',
          errorCount: 0,
        },
      });

      // 5. Log the fetch event
      await prisma.sourceFetchLog.create({
        data: {
          sourceId: sourceRecord.id,
          status: 'SUCCESS',
          itemsFound: rawItems.length,
          itemsNew,
          details: `Fetched ${rawItems.length} official items. Ingested ${itemsNew} new pending approval records.`,
        },
      });

      return {
        sourceCode,
        status: 'SUCCESS',
        itemsFound: rawItems.length,
        itemsNew,
        details: `Successfully checked ${connector.name}. ${itemsNew} new notifications queued for admin verification.`,
      };
    } catch (error: any) {
      console.error(`Sync error for ${sourceCode}:`, error);

      await prisma.officialSource.update({
        where: { id: sourceRecord.id },
        data: {
          lastFetchedAt: new Date(),
          lastStatus: 'ERROR',
          errorCount: { increment: 1 },
        },
      });

      await prisma.sourceFetchLog.create({
        data: {
          sourceId: sourceRecord.id,
          status: 'ERROR',
          itemsFound: 0,
          itemsNew: 0,
          errorMessage: error?.message || 'Unknown fetch error',
        },
      });

      return {
        sourceCode,
        status: 'ERROR',
        itemsFound: 0,
        itemsNew: 0,
        errorMessage: error?.message,
      };
    }
  }

  /**
   * Synchronize all active official sources sequentially
   */
  static async syncAllActiveSources(): Promise<SyncResult[]> {
    const activeSources = await prisma.officialSource.findMany({
      where: { isActive: true },
    });

    const results: SyncResult[] = [];
    for (const src of activeSources) {
      const res = await this.syncSource(src.code);
      results.push(res);
    }
    return results;
  }
}
