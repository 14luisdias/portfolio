'use client';

import { motion } from 'framer-motion';

const groups = [
  {
    title: 'Linguagens',
    items: ['PHP 8', 'PHP 7', 'JavaScript', 'Java Web', 'Visual Basic'],
  },
  {
    title: 'Frameworks & Plataformas',
    items: ['Laravel', 'Scriptcase 9.04/8', 'Bootstrap 3/4', 'CSS'],
  },
  {
    title: 'Banco de Dados',
    items: ['PostgreSQL 13', 'MySQL', 'SQL'],
  },
  {
    title: 'Infraestrutura',
    items: [
      'Docker',
      'Apache 2.4.7',
      'Windows Server 2008/12/16/19',
      'Linux (Ubuntu/CentOS)',
      'DHCP',
      'FTP',
      'Backup',
      'Redes',
    ],
  },
  {
    title: 'BI & ETL',
    items: ['Pentaho Server', 'Pentaho Data Integration', 'Metabase', 'Power BI'],
  },
  {
    title: 'Metodologias',
    items: ['UML', 'MER', 'RUP'],
  },
  {
    title: 'Versionamento',
    items: ['GitHub', 'GitLab'],
  },
  {
    title: 'Outros',
    items: ['Microsoft Office 365/Pro', 'Figma'],
  },
];

export default function Skills() {
  return (
    <section id="habilidades" className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <span className="font-mono text-xs text-teal uppercase tracking-widest">// stack</span>
        <h2 className="font-display text-3xl font-semibold mt-3">Habilidades técnicas</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {groups.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="bg-surface border border-border rounded-lg p-5"
          >
            <h3 className="font-mono text-xs text-ink-faint uppercase tracking-wider mb-3">
              {g.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="text-xs px-2.5 py-1 rounded bg-surface-alt border border-border text-ink-muted font-mono"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
