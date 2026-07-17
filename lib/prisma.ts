import { PrismaClient } from '@prisma/client';

// Instância única do PrismaClient.
// Em desenvolvimento, o hot-reload do Next recria os módulos a cada alteração;
// guardar a instância no globalThis evita esgotar o pool de conexões do Postgres.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
