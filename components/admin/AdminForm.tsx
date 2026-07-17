'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import type { EntityConfig, FieldConfig } from '@/lib/admin-config';
import TagInput from './TagInput';
import ImageUploader from './ImageUploader';

type Values = Record<string, any>;
type Status = 'idle' | 'loading' | 'success' | 'error';

// Monta os valores iniciais do formulário a partir do registro (ou vazios).
function initValues(config: EntityConfig, initial: Values | null): Values {
  const values: Values = {};
  for (const field of config.fields) {
    const current = initial?.[field.name];
    switch (field.type) {
      case 'tags':
      case 'images':
        values[field.name] = Array.isArray(current) ? current : [];
        break;
      case 'checkbox':
        values[field.name] = Boolean(current);
        break;
      case 'date':
        values[field.name] = current ? String(current).slice(0, 10) : '';
        break;
      case 'select':
        values[field.name] =
          current != null ? String(current) : field.options?.[0]?.value ?? '';
        break;
      default:
        values[field.name] = current != null ? String(current) : '';
    }
  }
  return values;
}

export default function AdminForm({
  config,
  initial,
  itemId,
}: {
  config: EntityConfig;
  initial?: Values | null;
  itemId?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Values>(() => initValues(config, initial ?? null));
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const isEdit = Boolean(itemId) || Boolean(config.singleton);

  function set(name: string, value: any) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const url = config.singleton
      ? config.endpoint
      : itemId
        ? `${config.endpoint}/${itemId}`
        : config.endpoint;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg = Array.isArray(data?.issues) && data.issues.length
          ? data.issues.map((i: any) => `${i.path}: ${i.message}`).join(' · ')
          : data?.error || 'Não foi possível salvar.';
        setError(msg);
        setStatus('error');
        return;
      }

      setStatus('success');
      if (config.singleton) {
        router.refresh();
      } else {
        router.push(`/admin/${config.key}`);
        router.refresh();
      }
    } catch {
      setError('Falha de conexão. Tente novamente.');
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5 max-w-2xl">
      {config.fields.map((field) => (
        <FieldRow key={field.name} field={field} value={values[field.name]} onChange={(v) => set(field.name, v)} />
      ))}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center gap-2 bg-teal text-bg font-medium px-6 py-3 rounded-md hover:bg-teal-dim transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {status === 'loading' ? 'Salvando...' : 'Salvar'}
        </button>

        {status === 'success' && (
          <span className="flex items-center gap-2 text-sm text-teal">
            <CheckCircle2 size={16} />
            Salvo com sucesso.
          </span>
        )}
        {status === 'error' && (
          <span className="flex items-center gap-2 text-sm text-red-400">
            <AlertCircle size={16} />
            {error}
          </span>
        )}
      </div>
    </form>
  );
}

function FieldRow({
  field,
  value,
  onChange,
}: {
  field: FieldConfig;
  value: any;
  onChange: (value: any) => void;
}) {
  const labelEl = (
    <label htmlFor={field.name} className="block text-xs font-mono text-ink-faint uppercase mb-2">
      {field.label}
      {field.required && <span className="text-amber ml-1">*</span>}
    </label>
  );

  const inputClass =
    'w-full bg-bg border border-border rounded-md px-4 py-3 text-ink text-sm focus:border-teal outline-none transition-colors';

  if (field.type === 'checkbox') {
    return (
      <div className="flex items-center gap-3">
        <input
          id={field.name}
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-teal"
        />
        <label htmlFor={field.name} className="text-sm text-ink">
          {field.label}
        </label>
      </div>
    );
  }

  return (
    <div>
      {labelEl}
      {field.type === 'textarea' && (
        <textarea
          id={field.name}
          rows={4}
          required={field.required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={`${inputClass} resize-y`}
        />
      )}

      {field.type === 'select' && (
        <select
          id={field.name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        >
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      {field.type === 'tags' && <TagInput tags={value} onChange={onChange} placeholder={field.placeholder} />}

      {field.type === 'images' && <ImageUploader urls={value} onChange={onChange} multiple />}

      {field.type === 'image' && (
        <ImageUploader
          urls={value ? [value] : []}
          onChange={(arr) => onChange(arr[0] ?? '')}
          multiple={false}
        />
      )}

      {(field.type === 'text' || field.type === 'number' || field.type === 'date') && (
        <input
          id={field.name}
          type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
          required={field.required}
          value={value}
          min={field.min}
          max={field.max}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={inputClass}
        />
      )}

      {field.help && <p className="mt-1.5 text-xs text-ink-faint">{field.help}</p>}
    </div>
  );
}
