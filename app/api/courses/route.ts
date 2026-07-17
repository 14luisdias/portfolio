import { prisma } from '@/lib/prisma';
import { makeCollectionRoute } from '@/lib/crud';
import { courseCreateSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';

export const { GET, POST } = makeCollectionRoute(prisma.course, courseCreateSchema);
