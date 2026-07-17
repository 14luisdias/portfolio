'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

const courses = [
  { name: 'Formação em Figma', org: 'Alura', year: '2023', hours: '47h' },
  { name: 'SQL and Data Visualization (Metabase)', org: 'Udemy', year: '2021', hours: '5,5h' },
  { name: 'Diagnósticos Geoespaciais Integrados', org: 'GIZ', year: '2020', hours: '16h' },
  { name: 'Scriptcase Módulo I', org: 'NetMake', year: '2018', hours: '20h' },
  { name: 'Programação em C#', org: 'Fundação Bradesco', year: '2017', hours: '117h' },
];

export default function Education() {
  return (
    <section id="formacao" className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <span className="font-mono text-xs text-teal uppercase tracking-widest">// formação</span>
        <h2 className="font-display text-3xl font-semibold mt-3">Formação acadêmica & cursos</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="bg-surface border border-border rounded-lg p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <GraduationCap size={18} className="text-teal" />
            <h3 className="font-mono text-xs text-ink-faint uppercase tracking-wider">
              Graduação
            </h3>
          </div>
          <h4 className="font-display text-lg text-ink mb-1">
            Bacharelado em Sistemas de Informação
          </h4>
          <p className="text-sm text-ink-muted">UNINORTE — Rio Branco, Acre · 2013–2017</p>

          <div className="mt-4 flex items-start gap-2 text-sm text-amber bg-amber/10 border border-amber/20 rounded-md p-3">
            <Award size={16} className="shrink-0 mt-0.5" />
            <span>
              Certificado de Honra ao Mérito — 1º lugar da turma de Sistemas de Informação
            </span>
          </div>

          <p className="text-sm text-ink-muted mt-4 pt-4 border-t border-border">
            Ensino Médio via ENEM · 2011
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-surface border border-border rounded-lg p-6"
        >
          <h3 className="font-mono text-xs text-ink-faint uppercase tracking-wider mb-4">
            Cursos complementares
          </h3>
          <ul className="space-y-3">
            {courses.map((c) => (
              <li
                key={c.name}
                className="flex items-center justify-between text-sm border-b border-border/60 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-ink">{c.name}</p>
                  <p className="text-ink-faint text-xs font-mono">{c.org}</p>
                </div>
                <div className="text-right font-mono text-xs text-ink-faint whitespace-nowrap ml-4">
                  {c.year} · {c.hours}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
