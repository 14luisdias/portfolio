import Link from 'next/link';
import {
  User,
  Briefcase,
  FolderGit2,
  BookOpen,
  GraduationCap,
  Wrench,
  Languages,
  Images,
} from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const [jobs, projects, courses, education, skills, languages, gallery, profile] =
    await Promise.all([
      prisma.job.count(),
      prisma.project.count(),
      prisma.course.count(),
      prisma.education.count(),
      prisma.skill.count(),
      prisma.language.count(),
      prisma.galleryItem.count(),
      prisma.profile.findFirst(),
    ]);

  const cards = [
    { href: '/admin/jobs', label: 'Experiências', value: jobs, icon: Briefcase },
    { href: '/admin/projects', label: 'Projetos', value: projects, icon: FolderGit2 },
    { href: '/admin/courses', label: 'Cursos', value: courses, icon: BookOpen },
    { href: '/admin/education', label: 'Formação', value: education, icon: GraduationCap },
    { href: '/admin/skills', label: 'Habilidades', value: skills, icon: Wrench },
    { href: '/admin/languages', label: 'Idiomas', value: languages, icon: Languages },
    { href: '/admin/gallery', label: 'Galeria', value: gallery, icon: Images },
  ];

  return (
    <div>
      <span className="font-mono text-xs text-teal uppercase tracking-widest">{'// painel'}</span>
      <h1 className="font-display text-3xl font-semibold mt-3">Visão geral</h1>
      <p className="text-ink-muted mt-2">
        Gerencie o conteúdo exibido no site público. Escolha uma seção para editar.
      </p>

      {!profile && (
        <div className="mt-6 flex items-start gap-2 text-sm text-amber bg-amber/10 border border-amber/20 rounded-md p-3">
          <User size={16} className="shrink-0 mt-0.5" />
          <span>
            Nenhum perfil cadastrado ainda. Rode o seed (<code className="font-mono">npm run db:seed</code>){' '}
            ou preencha em <Link href="/admin/profile" className="underline">Perfil</Link>.
          </span>
        </div>
      )}

      <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/profile"
          className="bg-surface border border-border rounded-lg p-5 hover:border-teal/50 transition-colors"
        >
          <User size={18} className="text-teal" />
          <div className="mt-3 font-mono text-2xl text-ink">{profile ? 'OK' : '—'}</div>
          <div className="text-xs text-ink-faint mt-1 uppercase tracking-wide">Perfil</div>
        </Link>

        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="bg-surface border border-border rounded-lg p-5 hover:border-teal/50 transition-colors"
            >
              <Icon size={18} className="text-teal" />
              <div className="mt-3 font-mono text-2xl text-ink">{c.value}</div>
              <div className="text-xs text-ink-faint mt-1 uppercase tracking-wide">{c.label}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
