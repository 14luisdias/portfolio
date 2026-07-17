'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';

const stats = [
  { label: 'anos de atuação em TI', value: '13+' },
  { label: 'sistemas implantados', value: '6' },
  { label: 'órgãos públicos atendidos', value: '5' },
];

export default function Hero() {
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
          STATUS: DISPONÍVEL PARA NOVOS PROJETOS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight max-w-3xl"
        >
          Luis Antonio Sanches Dias
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 font-mono text-teal text-base sm:text-lg"
        >
          $ analista_de_sistemas --stack full-stack --foco infraestrutura,geoprocessamento
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-2xl text-ink-muted text-base sm:text-lg leading-relaxed"
        >
          Mantenho sistemas, servidores e plataformas de monitoramento ambiental em produção
          para o Governo do Estado do Acre — do código à infraestrutura que o sustenta.
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
            href="/curriculo-luis-sanches-dias.pdf"
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
