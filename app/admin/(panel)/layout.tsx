import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import Sidebar from '@/components/admin/Sidebar';

// O painel sempre reflete o estado atual do banco.
export const dynamic = 'force-dynamic';

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Reforço além do middleware: garante sessão antes de renderizar o painel.
  const session = await auth();
  if (!session?.user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-bg text-ink">
      <Sidebar userName={session.user.name} userEmail={session.user.email} />
      <main className="md:ml-60 px-4 sm:px-8 py-8">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
