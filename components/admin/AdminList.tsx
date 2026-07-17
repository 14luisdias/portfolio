'use client';

import Link from 'next/link';
import { Plus, Pencil } from 'lucide-react';
import type { EntityConfig } from '@/lib/admin-config';
import DeleteButton from './DeleteButton';

function formatCell(value: unknown): string {
  if (value === null || value === undefined || value === '') return '—';
  if (Array.isArray(value)) return value.length ? value.join(', ') : '—';
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
  if (value instanceof Date) return value.toLocaleDateString('pt-BR');
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value).toLocaleDateString('pt-BR');
  }
  return String(value);
}

export default function AdminList({
  config,
  items,
}: {
  config: EntityConfig;
  items: Record<string, any>[];
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <span className="font-mono text-xs text-teal uppercase tracking-widest">
            {`// ${config.key}`}
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold mt-2">{config.plural}</h1>
        </div>
        <Link
          href={`/admin/${config.key}/new`}
          className="inline-flex items-center gap-2 bg-teal text-bg font-medium px-4 py-2.5 rounded-md hover:bg-teal-dim transition-colors whitespace-nowrap"
        >
          <Plus size={16} />
          Novo
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="bg-surface border border-border rounded-lg p-8 text-center text-ink-muted">
          Nenhum registro ainda. Clique em <span className="text-teal">Novo</span> para adicionar.
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                {config.columns.map((col) => (
                  <th
                    key={col.name}
                    className="px-4 py-3 font-mono text-xs text-ink-faint uppercase tracking-wider whitespace-nowrap"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="px-4 py-3 w-24" />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-border/60 last:border-0 hover:bg-surface-alt/50">
                  {config.columns.map((col) => (
                    <td key={col.name} className="px-4 py-3 text-ink-muted max-w-xs truncate">
                      {formatCell(item[col.name])}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/${config.key}/${item.id}`}
                        className="text-ink-faint hover:text-teal transition-colors"
                        aria-label="Editar"
                      >
                        <Pencil size={16} />
                      </Link>
                      <DeleteButton endpoint={config.endpoint} id={item.id} label={config.singular} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
