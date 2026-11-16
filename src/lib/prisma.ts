import { PrismaClient } from '@prisma/client';

// Support Vercel Storage / Prisma Postgres / Neon connection variables
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL =
    process.env.STORAGE_URL ||
    process.env.POSTGRES_PRISMA_URL ||
    process.env.POSTGRES_URL ||
    process.env.PRISMA_POSTGRES_URL;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
