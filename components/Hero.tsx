'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { ArrowDown } from 'lucide-react';
import type { Profile } from '@prisma/client';

export default function Hero({ profile }: { profile: Profile }) {
  const stats = [
    { label: 'anos de atuação em TI', value: profile.statYears },
    { label: 'sistemas implantados', value: profile.statSystems },
    { label: 'órgãos públicos atendidos', value: profile.statAgencies },
  ];

  const cvUrl = profile.cvUrl || '/curriculo-luis-sanches-dias.pdf';

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-center px-6 bg-noise-grid overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg pointer-events-none" />

      <div className="relative max-w-6xl mx-auto w-full pt-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 font-mono text-xs text-teal mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-teal animate-pulseDot" />
          </span>
          STATUS: {profile.status}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-[clamp(1.4rem,6vw,3.75rem)] font-semibold leading-[1.1] tracking-tight uppercase whitespace-nowrap"
        >
          {profile.fullName}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 font-mono text-teal text-base sm:text-lg break-words"
        >
          {profile.terminalLine}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-2xl text-ink-muted text-base sm:text-lg leading-relaxed"
        >
          {profile.headline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <a
            href="#projetos"
            className="inline-flex items-center gap-2 bg-teal text-bg font-medium px-6 py-3 rounded-md hover:bg-teal-dim transition-colors"
          >
            Ver projetos
          </a>
          <a
            href={cvUrl}
            download
            className="inline-flex items-center gap-2 border border-border text-ink px-6 py-3 rounded-md hover:border-teal hover:text-teal transition-colors"
          >
            <Download size={16} />
            Baixar CV
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-2xl border-t border-border pt-8"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-mono text-2xl sm:text-3xl text-teal font-medium">{s.value}</div>
              <div className="text-xs text-ink-faint mt-1 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <a
        href="#sobre"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-faint hover:text-teal transition-colors"
        aria-label="Rolar para a próxima seção"
      >
        <ArrowDown size={20} className="animate-bounce" />
      </a>
    </section>
  );
}
