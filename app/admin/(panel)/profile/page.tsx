import { prisma } from '@/lib/prisma';
import { profileConfig } from '@/lib/admin-config';
import AdminForm from '@/components/admin/AdminForm';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const profile = await prisma.profile.findFirst();

  return (
    <div>
      <span className="font-mono text-xs text-teal uppercase tracking-widest">{'// perfil'}</span>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-2">Perfil</h1>
      <p className="text-ink-muted mt-2">
        Dados do topo do site (nome, headline, resumo, contato e métricas do Hero).
      </p>
      <AdminForm config={profileConfig} initial={profile} />
    </div>
  );
}
