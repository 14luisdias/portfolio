'use client';

import { motion } from 'framer-motion';

const languages = [
  { name: 'Português', level: 'Avançado', pct: 100 },
  { name: 'Espanhol', level: 'Avançado', pct: 90 },
  { name: 'Inglês', level: 'Básico (técnico)', pct: 40 },
];

export default function About() {
  return (
    <section id="sobre" className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="grid md:grid-cols-[1fr_1.3fr] gap-12"
      >
        <div>
          <span className="font-mono text-xs text-teal uppercase tracking-widest">// sobre</span>
          <h2 className="font-display text-3xl font-semibold mt-3">Objetivo profissional</h2>
        </div>

        <div className="space-y-6">
          <p className="text-ink-muted leading-relaxed">
            Profissional com sólida experiência em Sistemas de Informação, atuando em órgãos do
            Governo do Estado do Acre no desenvolvimento, administração e suporte de sistemas
            críticos de monitoramento ambiental, gestão pública e infraestrutura de TI. Busco
            contribuir com soluções tecnológicas robustas para o desenvolvimento institucional,
            unindo experiência prática em produção com atenção constante à confiabilidade dos
            sistemas.
          </p>

          <div className="pt-4 border-t border-border">
            <span className="font-mono text-xs text-ink-faint uppercase tracking-widest">
              Idiomas
            </span>
            <div className="mt-4 space-y-4">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-ink">{lang.name}</span>
                    <span className="font-mono text-xs text-ink-faint">{lang.level}</span>
                  </div>
                  <div className="h-1.5 bg-surface-alt rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal rounded-full"
                      style={{ width: `${lang.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
