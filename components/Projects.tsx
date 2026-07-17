'use client';

import { motion } from 'framer-motion';
import { Server, ExternalLink, Github } from 'lucide-react';
import type { Project } from '@prisma/client';

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projetos" className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <span className="font-mono text-xs text-teal uppercase tracking-widest">{'// projetos'}</span>
        <h2 className="font-display text-3xl font-semibold mt-3">Sistemas implantados</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-teal/50 transition-colors flex flex-col"
          >
            {p.imageUrls.length > 0 && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.imageUrls[0]}
                alt={p.name}
                className="h-40 w-full object-cover border-b border-border"
              />
            )}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Server size={16} className="text-teal" />
                  <h3 className="font-display font-medium text-ink">{p.name}</h3>
                </div>
                <span className="font-mono text-xs text-ink-faint">{p.year}</span>
              </div>
              <p className="text-sm text-ink-muted leading-relaxed mb-4">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] px-2 py-0.5 rounded bg-surface-alt text-ink-faint font-mono"
                  >
                    {s}
                  </span>
                ))}
              </div>
              {(p.demoUrl || p.repoUrl) && (
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                  {p.demoUrl && (
                    <a
                      href={p.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-teal transition-colors"
                    >
                      <ExternalLink size={14} />
                      demo
                    </a>
                  )}
                  {p.repoUrl && (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-ink-muted hover:text-teal transition-colors"
                    >
                      <Github size={14} />
                      código
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
