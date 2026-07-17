import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  title: 'Luis Antonio Sanches Dias — Analista de Sistemas & Desenvolvedor Full Stack',
  description:
    'Portfólio de Luis Antonio Sanches Dias, Analista de Sistemas com experiência em desenvolvimento full stack, infraestrutura de TI e sistemas de monitoramento ambiental para o Governo do Estado do Acre.',
  keywords: [
    'Luis Antonio Sanches Dias',
    'Analista de Sistemas',
    'Desenvolvedor Full Stack',
    'PHP Laravel',
    'PostgreSQL',
    'Rio Branco Acre',
  ],
  authors: [{ name: 'Luis Antonio Sanches Dias' }],
  openGraph: {
    title: 'Luis Antonio Sanches Dias — Analista de Sistemas & Desenvolvedor Full Stack',
    description:
      'Portfólio profissional: sistemas de monitoramento ambiental, infraestrutura de TI e desenvolvimento full stack no Acre.',
    locale: 'pt_BR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body bg-bg text-ink antialiased">{children}</body>
    </html>
  );
}
