import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 1) Usuário admin (a partir das variáveis de ambiente) --------------------
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error('Defina ADMIN_EMAIL e ADMIN_PASSWORD no .env antes de rodar o seed.');
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.upsert({
    where: { email },
    update: { password: passwordHash, name: 'Luis Antonio Sanches Dias', role: 'ADMIN' },
    create: { email, password: passwordHash, name: 'Luis Antonio Sanches Dias', role: 'ADMIN' },
  });

  // 2) Limpa o conteúdo (seed idempotente) -----------------------------------
  await prisma.$transaction([
    prisma.job.deleteMany(),
    prisma.project.deleteMany(),
    prisma.course.deleteMany(),
    prisma.education.deleteMany(),
    prisma.skill.deleteMany(),
    prisma.language.deleteMany(),
    prisma.galleryItem.deleteMany(),
    prisma.profile.deleteMany(),
  ]);

  // 3) Perfil ----------------------------------------------------------------
  await prisma.profile.create({
    data: {
      fullName: 'Luis Antonio Sanches Dias',
      headline: 'Analista de Sistemas & Desenvolvedor Full Stack',
      terminalLine:
        '$ analista_de_sistemas --stack full-stack --foco infraestrutura,geoprocessamento,dados,IA',
      summary:
        'Profissional com sólida experiência em Sistemas de Informação, atuando em órgãos do Governo do Estado do Acre no desenvolvimento, administração e suporte de sistemas críticos de monitoramento ambiental, gestão pública e infraestrutura de TI. Atualmente aprofundando-se em Inteligência Artificial e Ciência de Dados.',
      phone: '(68) 9 9244-6118',
      email: '14luisdias@gmail.com',
      linkedinUrl: 'https://linkedin.com/in/luis-antonio-14370a1a0/',
      cvUrl: null,
      status: 'DISPONÍVEL PARA NOVOS PROJETOS',
      statYears: '13+',
      statSystems: '6',
      statAgencies: '5',
    },
  });

  // 4) Experiências ----------------------------------------------------------
  await prisma.job.createMany({
    data: [
      {
        order: 1,
        role: 'Analista de Sistemas',
        org: 'SEMA/AC (CIGMA)',
        periodStart: '01/2023',
        periodEnd: null,
        status: 'ONLINE',
        description:
          'Gerenciamento e administração dos sistemas do CIGMA (SICAR/AC, PCIGMA, PGCAR, SICAM, GPRO); suporte a sistemas de informação, infraestrutura e administração de Windows Server 2019, DHCP, FTP, backup e redes locais.',
      },
      {
        order: 2,
        role: 'Consultor Analista de Sistemas (GIZ)',
        org: 'SEMAPI/AC',
        periodStart: '10/2022',
        periodEnd: '12/2022',
        status: 'CONCLUIDO',
        description:
          'Suporte técnico e monitoramento de infraestrutura das VMs que hospedam o SICAR/AC na SEICT, incluindo redimensionamento de discos a nível de sistema operacional.',
      },
      {
        order: 3,
        role: 'Consultor Analista de Sistemas (GIZ)',
        org: 'SEMAPI/AC',
        periodStart: '03/2022',
        periodEnd: '09/2022',
        status: 'CONCLUIDO',
        description:
          'Levantamento de infraestrutura de TI da SEMAPI e SEICT para implantação das plataformas PCIGMA e PGCAR.',
      },
      {
        order: 4,
        role: 'Consultor Analista de Negócios em TI (BID)',
        org: 'SEMAPI/AC',
        periodStart: '06/2021',
        periodEnd: '11/2021',
        status: 'CONCLUIDO',
        description:
          'Análise de negócio no desenvolvimento de plataforma de integração de dados e monitoramento gerencial do CIGMA.',
      },
      {
        order: 5,
        role: 'Analista de Sistemas (EFFORT Serviços)',
        org: 'SEMA/AC',
        periodStart: '10/2020',
        periodEnd: '06/2021',
        status: 'CONCLUIDO',
        description:
          'Suporte a sistemas de informação e infraestrutura; administração de Windows Server 2019, servidor de domínios, DHCP, FTP, backup e redes locais.',
      },
      {
        order: 6,
        role: 'Consultor Web Designer Front-End (BID)',
        org: 'SEPA/AC',
        periodStart: '04/2020',
        periodEnd: '03/2021',
        status: 'CONCLUIDO',
        description:
          'Desenvolvimento front-end em PHP 7.4, JavaScript, HTML e CSS; PostgreSQL; Apache 2.4.7; Bootstrap 4.',
      },
      {
        order: 7,
        role: 'Analista de Sistemas (Marques e Barbosa)',
        org: 'SEPA/AC',
        periodStart: '06/2018',
        periodEnd: '02/2020',
        status: 'CONCLUIDO',
        description:
          'Desenvolvedor Full Stack em PHP 7.4 na plataforma Scriptcase, com MySQL 5.5 e Apache 2.4.7.',
      },
      {
        order: 8,
        role: 'Digitador/Desenvolvedor (JWC Multiserviços)',
        org: 'SESACRE/AC',
        periodStart: '09/2016',
        periodEnd: '06/2018',
        status: 'CONCLUIDO',
        description:
          'Desenvolvedor Full Stack em PHP 5, JavaScript e HTML; PostgreSQL e MySQL 5.5; Apache 2.4.7; Bootstrap 3.',
      },
      {
        order: 9,
        role: 'Técnico em Manutenção de Computadores',
        org: 'MAV Construtora / ETENGE',
        periodStart: '05/2012',
        periodEnd: '06/2016',
        status: 'CONCLUIDO',
        description:
          'Suporte a infraestrutura, administração de Windows Server 2008, servidor de domínios, DHCP, FTP, backup, redes locais e manutenção de equipamentos.',
      },
    ],
  });

  // 5) Projetos --------------------------------------------------------------
  await prisma.project.createMany({
    data: [
      {
        order: 1,
        name: 'PGCAR',
        year: 2022,
        description:
          'Painel de Gestão do CAR (Cadastro Ambiental Rural), implantado em ambiente Docker na SEMAPI e SEICT.',
        stack: ['PHP CodeIgniter 4', 'PostgreSQL/PostGIS', 'Bootstrap', 'Docker', 'Nginx'],
        imageUrls: [],
      },
      {
        order: 2,
        name: 'PCIGMA',
        year: 2021,
        description:
          'Plataforma Integrada de Monitoramento Ambiental do Acre; levantamento de requisitos, implantação e implementação em Docker.',
        stack: ['Laravel 8', 'PostgreSQL/PostGIS', 'Bootstrap', 'Docker', 'Nginx'],
        imageUrls: [],
      },
      {
        order: 3,
        name: 'SIAGRO',
        year: 2020,
        description: 'Sistema de Informações Agrícolas do Acre; desenvolvimento front-end.',
        stack: ['Laravel 7', 'PostgreSQL', 'Bootstrap', 'Apache'],
        imageUrls: [],
      },
      {
        order: 4,
        name: 'SIGSEPA',
        year: 2019,
        description: 'Sistema de Informações Gerenciais da SEPA; desenvolvimento full stack.',
        stack: ['Scriptcase', 'MySQL', 'Apache'],
        imageUrls: [],
      },
      {
        order: 5,
        name: 'ATALAIA',
        year: 2017,
        description:
          'Sistema de Recursos Humanos da SESACRE; desenvolvimento full stack orientado a objetos.',
        stack: ['PHP OO', 'jQuery', 'JSON', 'PostgreSQL', 'Bootstrap'],
        imageUrls: [],
      },
      {
        order: 6,
        name: 'GCON',
        year: 2016,
        description: 'Sistema de Gerenciamento de Contratos da SESACRE; desenvolvimento full stack.',
        stack: ['PHP', 'jQuery', 'JSON', 'MySQL', 'Bootstrap'],
        imageUrls: [],
      },
    ],
  });

  // 6) Formação acadêmica ----------------------------------------------------
  await prisma.education.createMany({
    data: [
      {
        order: 1,
        degree: 'MBA em Inteligência Artificial e Ciência de Dados',
        org: 'IDP (Instituto Brasileiro de Ensino, Desenvolvimento e Pesquisa)',
        periodStart: 2025,
        periodEnd: 2026,
        inProgress: true,
        highlight: 'Pós-graduação em andamento.',
      },
      {
        order: 2,
        degree: 'Bacharelado em Sistemas de Informação',
        org: 'UNINORTE (Rio Branco, Acre)',
        periodStart: 2013,
        periodEnd: 2017,
        inProgress: false,
        highlight: 'Certificado de Honra ao Mérito — 1º lugar da turma.',
      },
      {
        order: 3,
        degree: 'Ensino Médio',
        org: 'ENEM',
        periodStart: 2011,
        periodEnd: null,
        inProgress: false,
        highlight: null,
      },
    ],
  });

  // 7) Cursos complementares -------------------------------------------------
  await prisma.course.createMany({
    data: [
      { order: 1, name: 'Claude Code em Ação', org: 'Anthropic', year: 2025, hours: null },
      { order: 2, name: 'Imersão Inteligência Artificial na Prática', org: 'Daxus', year: 2025, hours: '8h' },
      {
        order: 3,
        name: 'Apache Airflow na Prática: Do Zero ao Deploy com Python',
        org: 'Udemy',
        year: 2025,
        hours: '3,5h',
      },
      { order: 4, name: 'Formação em Figma', org: 'Alura', year: 2023, hours: '47h' },
      { order: 5, name: 'Trilha Conectar (Discover)', org: 'Rocketseat', year: 2023, hours: '2h23' },
      { order: 6, name: 'SQL e Visualização de Dados (Metabase)', org: 'Udemy', year: 2021, hours: '5,5h' },
      { order: 7, name: 'Diagnósticos Geoespaciais Integrados', org: 'GIZ', year: 2020, hours: '16h' },
      { order: 8, name: 'Scriptcase Módulo I', org: 'NetMake', year: 2018, hours: '20h' },
      { order: 9, name: 'Programação em C#', org: 'Fundação Bradesco', year: 2017, hours: '117h' },
      { order: 10, name: 'Aperfeiçoamento em PHP com MySQL', org: 'SENAC', year: 2016, hours: '40h' },
      { order: 11, name: 'Lógica de Programação', org: 'SENAI', year: 2016, hours: '14h' },
    ],
  });

  // 8) Habilidades (agrupadas por categoria, ordem sequencial) ---------------
  const skillGroups: Record<string, string[]> = {
    Linguagens: ['PHP 8/7', 'Python 3', 'JavaScript', 'Java Web', 'Visual Basic'],
    'Frameworks e Plataformas': ['Laravel (13)', 'Scriptcase 9.04/8', 'Bootstrap 3/4', 'CSS'],
    'Banco de Dados': ['PostgreSQL 13', 'MySQL', 'SQL'],
    Infraestrutura: [
      'Docker',
      'Apache 2.4.7',
      'Windows Server 2008/12/16/19',
      'Linux (Ubuntu/CentOS)',
      'DHCP',
      'FTP',
      'Backup',
      'Redes',
    ],
    'Dados & IA': [
      'Inteligência Artificial',
      'Ciência de Dados',
      'Apache Airflow',
      'Pentaho (Server e Data Integration)',
      'Metabase',
      'Power BI',
    ],
    'Ferramentas IA/Dev': ['Claude Code (MCP, Skills, Hooks, Rules)'],
    Metodologias: ['UML', 'MER', 'RUP'],
    'Controle de versão': ['GitHub', 'GitLab'],
    Outros: ['Microsoft Office 365/Pro', 'Figma'],
  };
  let skillOrder = 0;
  const skillRows: { category: string; item: string; order: number }[] = [];
  for (const [category, items] of Object.entries(skillGroups)) {
    for (const item of items) {
      skillRows.push({ category, item, order: skillOrder });
      skillOrder += 1;
    }
  }
  await prisma.skill.createMany({ data: skillRows });

  // 9) Idiomas ---------------------------------------------------------------
  await prisma.language.createMany({
    data: [
      { order: 1, name: 'Português', level: 'Avançado', pct: 100 },
      { order: 2, name: 'Espanhol', level: 'Avançado', pct: 90 },
      { order: 3, name: 'Inglês', level: 'Básico (técnico)', pct: 40 },
    ],
  });

  // 10) Galeria (imageUrl placeholder até o upload real) ---------------------
  await prisma.galleryItem.create({
    data: {
      order: 1,
      title: 'Reunião Técnica — Prevenção e Resposta ao Período de Cheia (Acre)',
      imageUrl: '/gallery-placeholder.svg',
      caption:
        'Evento do Governo do Estado do Acre / SEMAPI — Rio Branco, formato híbrido, 4h.',
      eventDate: new Date('2023-02-16T12:00:00Z'),
    },
  });

  console.log('Seed concluído com sucesso.');
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
