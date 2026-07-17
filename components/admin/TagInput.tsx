'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function TagInput({
  tags,
  onChange,
  placeholder,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  const [input, setInput] = useState('');

  function add() {
    const value = input.trim();
    if (value && !tags.includes(value)) {
      onChange([...tags, value]);
    }
    setInput('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      add();
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  }

  return (
    <div className="w-full bg-bg border border-border rounded-md px-3 py-2 flex flex-wrap gap-2 focus-within:border-teal transition-colors">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-surface-alt border border-border text-ink font-mono"
        >
          {tag}
          <button
            type="button"
            onClick={() => onChange(tags.filter((t) => t !== tag))}
            className="text-ink-faint hover:text-red-400"
            aria-label={`Remover ${tag}`}
          >
            <X size={12} />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={add}
        placeholder={placeholder ?? 'Adicionar...'}
        className="flex-1 min-w-[8rem] bg-transparent outline-none text-ink text-sm py-1"
      />
    </div>
  );
}
