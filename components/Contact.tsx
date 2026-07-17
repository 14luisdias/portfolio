'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import type { Profile } from '@prisma/client';
import type { ContactResponse } from '@/lib/types';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact({ profile }: { profile: Profile }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const phoneHref = profile.phone ? `tel:+55${profile.phone.replace(/\D/g, '')}` : undefined;
  const linkedinLabel = profile.linkedinUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data: ContactResponse = await res.json();

      if (!res.ok || !data.ok) {
        setStatus('error');
        setErrorMsg(data.error ?? 'Não foi possível enviar. Tente novamente.');
        return;
      }

      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('error');
      setErrorMsg('Falha de conexão. Verifique sua internet e tente novamente.');
    }
  };

  return (
    <section id="contato" className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-2 gap-12"
      >
        <div>
          <span className="font-mono text-xs text-teal uppercase tracking-widest">{'// contato'}</span>
          <h2 className="font-display text-3xl font-semibold mt-3 mb-6">Vamos conversar</h2>
          <p className="text-ink-muted leading-relaxed mb-8 max-w-md">
            Aberto a novas oportunidades em desenvolvimento full stack, administração de sistemas
            e infraestrutura de TI. Entre em contato pelos canais abaixo ou pelo formulário.
          </p>

          <div className="space-y-4">
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-3 text-ink-muted hover:text-teal transition-colors"
              >
                <Mail size={18} />
                <span className="font-mono text-sm">{profile.email}</span>
              </a>
            )}
            {phoneHref && (
              <a
                href={phoneHref}
                className="flex items-center gap-3 text-ink-muted hover:text-teal transition-colors"
              >
                <Phone size={18} />
                <span className="font-mono text-sm">{profile.phone}</span>
              </a>
            )}
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-ink-muted hover:text-teal transition-colors"
              >
                <Linkedin size={18} />
                <span className="font-mono text-sm">{linkedinLabel}</span>
              </a>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-xs font-mono text-ink-faint uppercase mb-2">
              Nome
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface border border-border rounded-md px-4 py-3 text-ink text-sm focus:border-teal outline-none transition-colors"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-xs font-mono text-ink-faint uppercase mb-2">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface border border-border rounded-md px-4 py-3 text-ink text-sm focus:border-teal outline-none transition-colors"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-xs font-mono text-ink-faint uppercase mb-2">
              Mensagem
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-surface border border-border rounded-md px-4 py-3 text-ink text-sm focus:border-teal outline-none transition-colors resize-none"
              placeholder="Como posso ajudar?"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full inline-flex items-center justify-center gap-2 bg-teal text-bg font-medium px-6 py-3 rounded-md hover:bg-teal-dim transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send size={16} />
                Enviar mensagem
              </>
            )}
          </button>

          {status === 'success' && (
            <p className="flex items-center gap-2 text-sm text-teal">
              <CheckCircle2 size={16} />
              Mensagem enviada com sucesso. Obrigado pelo contato!
            </p>
          )}
          {status === 'error' && (
            <p className="flex items-center gap-2 text-sm text-red-400">
              <AlertCircle size={16} />
              {errorMsg}
            </p>
          )}
        </form>
      </motion.div>
    </section>
  );
}
