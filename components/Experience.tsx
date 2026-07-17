'use client';

import { motion } from 'framer-motion';
import type { Job } from '@prisma/client';

// Formata "01/2023 — atual" ou "10/2020 — 06/2021".
function formatPeriod(job: Job) {
  return `${job.periodStart} — ${job.periodEnd ?? 'atual'}`;
}

export default function Experience({ jobs }: { jobs: Job[] }) {
  return (
    <section id="experiencia" className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <span className="font-mono text-xs text-teal uppercase tracking-widest">{'// experiência'}</span>
        <h2 className="font-display text-3xl font-semibold mt-3">Histórico profissional</h2>
      </motion.div>

      <div className="relative border-l border-border pl-8 space-y-10">
        {jobs.map((job, i) => {
          const online = job.status === 'ONLINE';
          return (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.03 }}
              className="relative"
            >
              <span
                className={`absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full ${
                  online ? 'bg-teal animate-pulseDot' : 'bg-ink-faint'
                }`}
              />
              <div className="font-mono text-xs text-ink-faint mb-1 flex items-center gap-3">
                <span>{formatPeriod(job)}</span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] ${
                    online ? 'bg-teal/10 text-teal' : 'bg-surface-alt text-ink-faint'
                  }`}
                >
                  {online ? 'ONLINE' : 'CONCLUÍDO'}
                </span>
              </div>
              <h3 className="font-display text-lg font-medium text-ink">{job.role}</h3>
              <p className="text-sm text-teal/80 font-mono mt-0.5">{job.org}</p>
              <p className="text-ink-muted text-sm mt-2 leading-relaxed max-w-2xl">
                {job.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
