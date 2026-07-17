import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getEntityConfig } from '@/lib/admin-config';
import AdminForm from '@/components/admin/AdminForm';

export default function NewEntityPage({ params }: { params: { entity: string } }) {
  const config = getEntityConfig(params.entity);
  if (!config) notFound();

  return (
    <div>
      <Link
        href={`/admin/${config.key}`}
        className="inline-flex items-center gap-2 text-xs font-mono text-ink-faint hover:text-teal transition-colors"
      >
        <ArrowLeft size={14} />
        voltar para {config.plural}
      </Link>
      <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-3">
        Novo — {config.singular}
      </h1>
      <AdminForm config={config} />
    </div>
  );
}
