'use client';

import { motion } from 'framer-motion';
import type { GalleryItem } from '@prisma/client';

function formatEventDate(date: Date | string | null) {
  if (!date) return null;
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export default function Gallery({ items }: { items: GalleryItem[] }) {
  // Seção só aparece quando há itens cadastrados.
  if (items.length === 0) return null;

  return (
    <section id="galeria" className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <span className="font-mono text-xs text-teal uppercase tracking-widest">{'// galeria'}</span>
        <h2 className="font-display text-3xl font-semibold mt-3">Eventos & trabalho</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => {
          const date = formatEventDate(item.eventDate);
          return (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group bg-surface border border-border rounded-lg overflow-hidden hover:border-teal/50 transition-colors"
            >
              <div className="aspect-video bg-surface-alt overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <figcaption className="p-5">
                <h3 className="font-display text-ink font-medium leading-snug">{item.title}</h3>
                {item.caption && (
                  <p className="text-sm text-ink-muted mt-2 leading-relaxed">{item.caption}</p>
                )}
                {date && (
                  <p className="font-mono text-xs text-ink-faint mt-3 uppercase tracking-wide">
                    {date}
                  </p>
                )}
              </figcaption>
            </motion.figure>
          );
        })}
      </div>
    </section>
  );
}
