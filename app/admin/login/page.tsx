'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Loader2, AlertCircle, Terminal } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (!res || res.error) {
      setError('Credenciais inválidas. Verifique e-mail e senha.');
      setLoading(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-noise-grid">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 font-mono text-xs text-teal mb-6 justify-center">
          <Terminal size={14} />
          PAINEL ADMINISTRATIVO
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <h1 className="font-display text-xl font-semibold text-ink">Entrar</h1>
          <p className="text-sm text-ink-muted mt-1 mb-6">
            Acesso restrito ao administrador do portfólio.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-mono text-ink-faint uppercase mb-2">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg border border-border rounded-md px-4 py-3 text-ink text-sm focus:border-teal outline-none transition-colors"
                placeholder="admin@exemplo.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-mono text-ink-faint uppercase mb-2">
                Senha
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg border border-border rounded-md px-4 py-3 text-ink text-sm focus:border-teal outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-teal text-bg font-medium px-6 py-3 rounded-md hover:bg-teal-dim transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Entrando...
                </>
              ) : (
                'Entrar'
              )}
            </button>

            {error && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <AlertCircle size={16} />
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
