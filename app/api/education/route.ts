import { prisma } from '@/lib/prisma';
import { makeCollectionRoute } from '@/lib/crud';
import { educationCreateSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';

export const { GET, POST } = makeCollectionRoute(prisma.education, educationCreateSchema);
