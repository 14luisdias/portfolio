'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';
import type { Education as EducationModel, Course } from '@prisma/client';

function formatEduPeriod(edu: EducationModel) {
  if (edu.periodEnd && edu.periodEnd !== edu.periodStart) {
    return `${edu.periodStart}–${edu.periodEnd}`;
  }
  return String(edu.periodStart);
}

export default function Education({
  education,
  courses,
}: {
  education: EducationModel[];
  courses: Course[];
}) {
  return (
    <section id="formacao" className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <span className="font-mono text-xs text-teal uppercase tracking-widest">{'// formação'}</span>
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
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap size={18} className="text-teal" />
            <h3 className="font-mono text-xs text-ink-faint uppercase tracking-wider">
              Formação acadêmica
            </h3>
          </div>

          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="border-b border-border/60 pb-6 last:border-0 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-display text-lg text-ink">{edu.degree}</h4>
                  {edu.inProgress && (
                    <span className="shrink-0 font-mono text-[10px] px-1.5 py-0.5 rounded bg-teal/10 text-teal uppercase">
                      em andamento
                    </span>
                  )}
                </div>
                <p className="text-sm text-ink-muted mt-1">
                  {edu.org} · {formatEduPeriod(edu)}
                </p>

                {edu.highlight && (
                  <div className="mt-3 flex items-start gap-2 text-sm text-amber bg-amber/10 border border-amber/20 rounded-md p-3">
                    <Award size={16} className="shrink-0 mt-0.5" />
                    <span>{edu.highlight}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
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
                key={c.id}
                className="flex items-center justify-between text-sm border-b border-border/60 pb-3 last:border-0 last:pb-0"
              >
                <div>
                  <p className="text-ink">{c.name}</p>
                  <p className="text-ink-faint text-xs font-mono">{c.org}</p>
                </div>
                <div className="text-right font-mono text-xs text-ink-faint whitespace-nowrap ml-4">
                  {c.year}
                  {c.hours ? ` · ${c.hours}` : ''}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
