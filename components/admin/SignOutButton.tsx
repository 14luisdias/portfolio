'use client';

import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

export default function SignOutButton({ className = '' }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/admin/login' })}
      className={`inline-flex items-center gap-2 text-ink-muted hover:text-teal transition-colors ${className}`}
    >
      <LogOut size={16} />
      Sair
    </button>
  );
}
