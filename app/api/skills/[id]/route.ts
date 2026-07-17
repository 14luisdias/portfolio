import { prisma } from '@/lib/prisma';
import { makeItemRoute } from '@/lib/crud';
import { skillUpdateSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';

export const { GET, PUT, PATCH, DELETE } = makeItemRoute(prisma.skill, skillUpdateSchema);
