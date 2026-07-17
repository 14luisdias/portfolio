'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#habilidades', label: 'Habilidades' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#formacao', label: 'Formação' },
  { href: '#contato', label: 'Contato' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-display font-semibold text-ink tracking-tight">
          LD<span className="text-teal">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-wider">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-ink-muted hover:text-teal transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden text-ink"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-surface border-b border-border px-6 py-4">
          <ul className="flex flex-col gap-4 font-mono text-sm uppercase tracking-wider">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-ink-muted hover:text-teal transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
