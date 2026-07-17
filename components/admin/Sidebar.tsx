'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Briefcase,
  FolderGit2,
  BookOpen,
  GraduationCap,
  Wrench,
  Languages,
  Images,
  ExternalLink,
} from 'lucide-react';
import SignOutButton from './SignOutButton';

const nav = [
  { href: '/admin', label: 'Painel', icon: LayoutDashboard, exact: true },
  { href: '/admin/profile', label: 'Perfil', icon: User },
  { href: '/admin/jobs', label: 'Experiências', icon: Briefcase },
  { href: '/admin/projects', label: 'Projetos', icon: FolderGit2 },
  { href: '/admin/courses', label: 'Cursos', icon: BookOpen },
  { href: '/admin/education', label: 'Formação', icon: GraduationCap },
  { href: '/admin/skills', label: 'Habilidades', icon: Wrench },
  { href: '/admin/languages', label: 'Idiomas', icon: Languages },
  { href: '/admin/gallery', label: 'Galeria', icon: Images },
];

export default function Sidebar({
  userName,
  userEmail,
}: {
  userName?: string | null;
  userEmail?: string | null;
}) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  const links = nav.map((item) => {
    const Icon = item.icon;
    const active = isActive(item.href, item.exact);
    return (
      <Link
        key={item.href}
        href={item.href}
        className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors whitespace-nowrap ${
          active
            ? 'bg-teal/10 text-teal'
            : 'text-ink-muted hover:text-ink hover:bg-surface-alt'
        }`}
      >
        <Icon size={16} />
        {item.label}
      </Link>
    );
  });

  return (
    <>
      {/* Sidebar fixa (desktop) */}
      <aside className="hidden md:flex md:flex-col fixed inset-y-0 left-0 w-60 bg-surface border-r border-border p-4">
        <Link href="/admin" className="font-display font-semibold text-ink tracking-tight px-3 py-2">
          PLALURE<span className="text-teal">.</span>{' '}
          <span className="text-ink-faint font-mono text-xs">admin</span>
        </Link>

        <nav className="mt-4 flex-1 space-y-1">{links}</nav>

        <div className="border-t border-border pt-4 space-y-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 text-xs text-ink-faint hover:text-teal transition-colors font-mono"
          >
            <ExternalLink size={14} />
            ver site
          </a>
          <div className="px-3">
            <p className="text-sm text-ink truncate">{userName}</p>
            <p className="text-xs text-ink-faint font-mono truncate">{userEmail}</p>
          </div>
          <div className="px-3">
            <SignOutButton className="text-sm" />
          </div>
        </div>
      </aside>

      {/* Barra superior (mobile) */}
      <header className="md:hidden sticky top-0 z-40 bg-surface border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <Link href="/admin" className="font-display font-semibold text-ink tracking-tight">
            PLALURE<span className="text-teal">.</span>{' '}
            <span className="text-ink-faint font-mono text-xs">admin</span>
          </Link>
          <SignOutButton className="text-sm" />
        </div>
        <nav className="flex gap-2 overflow-x-auto px-4 pb-3">{links}</nav>
      </header>
    </>
  );
}
