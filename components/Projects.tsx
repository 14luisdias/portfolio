'use client';

import { motion } from 'framer-motion';
import { Server } from 'lucide-react';

const projects = [
  {
    name: 'PGCAR',
    year: '2022',
    desc: 'Painel de Gestão do CAR (Cadastro Ambiental Rural), implantado em ambiente Docker na SEMAPI e SEICT.',
    stack: ['PHP CodeIgniter 4', 'PostgreSQL/PostGIS', 'Bootstrap', 'Docker', 'Nginx'],
  },
  {
    name: 'PCIGMA',
    year: '2021',
    desc: 'Plataforma Integrada de Monitoramento Ambiental do Acre — levantamento de requisitos, implantação e implementação em Docker.',
    stack: ['Laravel 8', 'PostgreSQL/PostGIS', 'Bootstrap', 'Docker', 'Nginx'],
  },
  {
    name: 'SIAGRO',
    year: '2020',
    desc: 'Sistema de Informações Agrícolas do Acre — desenvolvimento front-end.',
    stack: ['Laravel 7', 'PostgreSQL', 'Bootstrap', 'Apache'],
  },
  {
    name: 'SIGSEPA',
    year: '2019',
    desc: 'Sistema de Informações Gerenciais da SEPA — desenvolvimento full stack.',
    stack: ['Scriptcase', 'MySQL', 'Apache'],
  },
  {
    name: 'ATALAIA',
    year: '2017',
    desc: 'Sistema de Recursos Humanos da SESACRE — desenvolvimento full stack orientado a objetos.',
    stack: ['PHP OO', 'jQuery', 'JSON', 'PostgreSQL', 'Bootstrap'],
  },
  {
    name: 'GCON',
    year: '2016',
    desc: 'Sistema de Gerenciamento de Contratos da SESACRE — desenvolvimento full stack.',
    stack: ['PHP', 'jQuery', 'JSON', 'MySQL', 'Bootstrap'],
  },
];

export default function Projects() {
  return (
    <section id="projetos" className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <span className="font-mono text-xs text-teal uppercase tracking-widest">// projetos</span>
        <h2 className="font-display text-3xl font-semibold mt-3">Sistemas implantados</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group bg-surface border border-border rounded-lg p-6 hover:border-teal/50 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Server size={16} className="text-teal" />
                <h3 className="font-display font-medium text-ink">{p.name}</h3>
              </div>
              <span className="font-mono text-xs text-ink-faint">{p.year}</span>
            </div>
            <p className="text-sm text-ink-muted leading-relaxed mb-4">{p.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="text-[11px] px-2 py-0.5 rounded bg-surface-alt text-ink-faint font-mono"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
