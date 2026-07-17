import { prisma } from '@/lib/prisma';

// Camada de leitura do site público (Server Components).
// Ordenação padrão: campo `order` asc; desempate por data de criação.

const byOrder = [{ order: 'asc' as const }, { createdAt: 'asc' as const }];

export function getProfile() {
  return prisma.profile.findFirst();
}

export function getJobs() {
  return prisma.job.findMany({ orderBy: byOrder });
}

export function getProjects() {
  return prisma.project.findMany({ orderBy: byOrder });
}

export function getCourses() {
  return prisma.course.findMany({ orderBy: byOrder });
}

export function getEducation() {
  return prisma.education.findMany({ orderBy: byOrder });
}

export function getLanguages() {
  return prisma.language.findMany({ orderBy: byOrder });
}

export function getGallery() {
  return prisma.galleryItem.findMany({ orderBy: byOrder });
}

export interface SkillGroup {
  category: string;
  items: string[];
}

// Agrupa as habilidades por categoria, preservando a ordem de `order`.
export async function getSkillGroups(): Promise<SkillGroup[]> {
  const skills = await prisma.skill.findMany({ orderBy: byOrder });
  const groups: SkillGroup[] = [];
  const index = new Map<string, SkillGroup>();

  for (const skill of skills) {
    let group = index.get(skill.category);
    if (!group) {
      group = { category: skill.category, items: [] };
      index.set(skill.category, group);
      groups.push(group);
    }
    group.items.push(skill.item);
  }

  return groups;
}

// Perfil de fallback (evita quebra antes de rodar o seed).
export const FALLBACK_PROFILE = {
  id: '',
  fullName: 'Seu Nome',
  headline: 'Adicione seu perfil no painel /admin',
  terminalLine: '$ configure --perfil',
  summary: 'Nenhum perfil cadastrado ainda. Rode o seed ou preencha em /admin/profile.',
  phone: '',
  email: '',
  linkedinUrl: '',
  cvUrl: null as string | null,
  status: 'EM CONFIGURAÇÃO',
  statYears: '—',
  statSystems: '—',
  statAgencies: '—',
  createdAt: new Date(),
  updatedAt: new Date(),
};
