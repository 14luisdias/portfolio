'use client';

import { motion } from 'framer-motion';

const jobs = [
  {
    period: '01/2023 — atual',
    status: 'ONLINE',
    role: 'Analista de Sistemas',
    org: 'SEMA/AC — Secretaria de Estado do Meio Ambiente (CIGMA)',
    desc: 'Gerenciamento e administração dos sistemas do CIGMA (SICAR/AC, PCIGMA, PGCAR, SICAM, GPRO); suporte a sistemas de informação, infraestrutura e administração de Windows Server 2019, DHCP, FTP, backup e redes locais.',
  },
  {
    period: '10/2022 — 12/2022',
    status: 'CONCLUÍDO',
    role: 'Consultor Analista de Sistemas (GIZ)',
    org: 'SEMAPI/AC — Secretaria de Estado do Meio Ambiente e das Políticas Indígenas',
    desc: 'Suporte técnico e monitoramento de infraestrutura das VMs que hospedam o SICAR/AC na SEICT, incluindo redimensionamento de discos a nível de sistema operacional.',
  },
  {
    period: '03/2022 — 09/2022',
    status: 'CONCLUÍDO',
    role: 'Consultor Analista de Sistemas (GIZ)',
    org: 'SEMAPI/AC',
    desc: 'Levantamento de infraestrutura de TI da SEMAPI e SEICT para implantação das plataformas PCIGMA e PGCAR, com escritório técnico de gestão do CAR.',
  },
  {
    period: '06/2021 — 11/2021',
    status: 'CONCLUÍDO',
    role: 'Consultor Analista de Negócios em TI (BID)',
    org: 'SEMAPI/AC',
    desc: 'Análise de negócio no desenvolvimento de plataforma de integração de dados e monitoramento gerencial do Centro Integrado de Geoprocessamento e Monitoramento Ambiental.',
  },
  {
    period: '10/2020 — 06/2021',
    status: 'CONCLUÍDO',
    role: 'Analista de Sistemas — EFFORT Serviços',
    org: 'SEMA/AC',
    desc: 'Suporte a sistemas de informação e infraestrutura; administração de Windows Server 2019, servidor de domínios, DHCP, FTP, backup e redes locais.',
  },
  {
    period: '04/2020 — 03/2021',
    status: 'CONCLUÍDO',
    role: 'Consultor Web Designer Front-End (BID)',
    org: 'SEPA/AC — Secretaria de Estado de Produção e Agronegócio',
    desc: 'Desenvolvimento front-end em PHP 7.4, JavaScript, HTML e CSS; SGBD PostgreSQL; servidor Apache 2.4.7; framework Bootstrap 4.',
  },
  {
    period: '06/2018 — 02/2020',
    status: 'CONCLUÍDO',
    role: 'Analista de Sistemas — Marques e Barbosa Ltda.',
    org: 'SEPA/AC',
    desc: 'Desenvolvedor Full Stack em PHP 7.4 na plataforma Scriptcase, com MySQL 5.5 e servidor Apache 2.4.7.',
  },
  {
    period: '09/2016 — 06/2018',
    status: 'CONCLUÍDO',
    role: 'Digitador / Desenvolvedor — JWC Multiserviços',
    org: 'SESACRE/AC — Secretaria de Estado de Saúde',
    desc: 'Desenvolvedor Full Stack em PHP 5, JavaScript e HTML; PostgreSQL e MySQL 5.5; Apache 2.4.7; framework Bootstrap 3.',
  },
  {
    period: '05/2012 — 06/2016',
    status: 'CONCLUÍDO',
    role: 'Técnico em Manutenção de Computadores',
    org: 'MAV Construtora Ltda. / ETENGE',
    desc: 'Suporte a infraestrutura, administração de Windows Server 2008, servidor de domínios, DHCP, FTP, backup, redes locais e manutenção de equipamentos.',
  },
];

export default function Experience() {
  return (
    <section id="experiencia" className="max-w-6xl mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >
        <span className="font-mono text-xs text-teal uppercase tracking-widest">// experiência</span>
        <h2 className="font-display text-3xl font-semibold mt-3">Histórico profissional</h2>
      </motion.div>

      <div className="relative border-l border-border pl-8 space-y-10">
        {jobs.map((job, i) => (
          <motion.div
            key={job.period + job.role}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.03 }}
            className="relative"
          >
            <span
              className={`absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full ${
                job.status === 'ONLINE' ? 'bg-teal animate-pulseDot' : 'bg-ink-faint'
              }`}
            />
            <div className="font-mono text-xs text-ink-faint mb-1 flex items-center gap-3">
              <span>{job.period}</span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] ${
                  job.status === 'ONLINE'
                    ? 'bg-teal/10 text-teal'
                    : 'bg-surface-alt text-ink-faint'
                }`}
              >
                {job.status}
              </span>
            </div>
            <h3 className="font-display text-lg font-medium text-ink">{job.role}</h3>
            <p className="text-sm text-teal/80 font-mono mt-0.5">{job.org}</p>
            <p className="text-ink-muted text-sm mt-2 leading-relaxed max-w-2xl">{job.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
