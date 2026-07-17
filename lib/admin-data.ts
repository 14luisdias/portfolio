import { prisma } from '@/lib/prisma';
import type { CrudDelegate } from '@/lib/crud';

// Mapa de chave da entidade -> delegate do Prisma (apenas no servidor).
const delegates: Record<string, CrudDelegate> = {
  jobs: prisma.job,
  projects: prisma.project,
  courses: prisma.course,
  education: prisma.education,
  skills: prisma.skill,
  languages: prisma.language,
  gallery: prisma.galleryItem,
};

export async function fetchEntityList(key: string): Promise<any[]> {
  const delegate = delegates[key];
  if (!delegate) return [];
  return delegate.findMany({ orderBy: [{ order: 'asc' }, { createdAt: 'desc' }] });
}

export async function fetchEntityItem(key: string, id: string): Promise<any | null> {
  const delegate = delegates[key];
  if (!delegate) return null;
  return delegate.findUnique({ where: { id } });
}
