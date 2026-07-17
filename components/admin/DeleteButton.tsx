'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, Loader2 } from 'lucide-react';

export default function DeleteButton({
  endpoint,
  id,
  label,
}: {
  endpoint: string;
  id: string;
  label?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!window.confirm(`Excluir ${label ?? 'este item'}? Esta ação não pode ser desfeita.`)) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        window.alert(data?.error || 'Não foi possível excluir.');
      }
    } catch {
      window.alert('Falha de conexão ao excluir.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center gap-1 text-ink-faint hover:text-red-400 transition-colors disabled:opacity-60"
      aria-label="Excluir"
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
    </button>
  );
}
