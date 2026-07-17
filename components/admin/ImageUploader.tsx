'use client';

import { useRef, useState } from 'react';
import { Loader2, Upload, X, AlertCircle } from 'lucide-react';

// Faz upload para /api/upload (Vercel Blob) e devolve as URLs públicas.
// Usado tanto para imagem única (multiple=false) quanto múltiplas.
export default function ImageUploader({
  urls,
  onChange,
  multiple = true,
}: {
  urls: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError('');
    try {
      let next = [...urls];
      for (const file of Array.from(files)) {
        const fd = new FormData();
        fd.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(data?.error || 'Falha no upload.');
          break;
        }
        next = multiple ? [...next, data.url] : [data.url];
      }
      onChange(next);
    } catch {
      setError('Falha de conexão no upload.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {urls.map((url) => (
          <div key={url} className="relative group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt=""
              className="h-24 w-24 object-cover rounded-md border border-border"
            />
            <button
              type="button"
              onClick={() => onChange(urls.filter((u) => u !== url))}
              className="absolute -top-2 -right-2 bg-bg border border-border rounded-full p-1 text-ink-faint hover:text-red-400"
              aria-label="Remover imagem"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        {(multiple || urls.length === 0) && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="h-24 w-24 flex flex-col items-center justify-center gap-1 rounded-md border border-dashed border-border text-ink-faint hover:border-teal hover:text-teal transition-colors disabled:opacity-60"
          >
            {uploading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
            <span className="text-[10px] font-mono uppercase">
              {uploading ? 'enviando' : 'enviar'}
            </span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {error && (
        <p className="mt-2 flex items-center gap-2 text-xs text-red-400">
          <AlertCircle size={14} />
          {error}
        </p>
      )}
    </div>
  );
}
