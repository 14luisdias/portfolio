// Configuração declarativa (somente dados, client-safe) que descreve cada
// entidade do admin: campos do formulário e colunas da listagem.
// Usada tanto pelas páginas (server) quanto pelos formulários (client).

export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'date'
  | 'tags'
  | 'images'
  | 'image';

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  help?: string;
  min?: number;
  max?: number;
}

export interface ColumnConfig {
  name: string;
  label: string;
}

export interface EntityConfig {
  key: string;
  endpoint: string;
  singular: string;
  plural: string;
  singleton?: boolean;
  fields: FieldConfig[];
  columns: ColumnConfig[];
}

export const entityConfigs: Record<string, EntityConfig> = {
  jobs: {
    key: 'jobs',
    endpoint: '/api/jobs',
    singular: 'Experiência',
    plural: 'Experiências',
    fields: [
      { name: 'role', label: 'Cargo / função', type: 'text', required: true },
      { name: 'org', label: 'Organização', type: 'text', required: true },
      { name: 'periodStart', label: 'Início (MM/AAAA)', type: 'text', required: true, placeholder: '01/2023' },
      { name: 'periodEnd', label: 'Fim (MM/AAAA)', type: 'text', placeholder: 'em branco = atual' },
      {
        name: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { value: 'CONCLUIDO', label: 'Concluído' },
          { value: 'ONLINE', label: 'Online (atual)' },
        ],
      },
      { name: 'description', label: 'Descrição', type: 'textarea', required: true },
      { name: 'order', label: 'Ordem', type: 'number' },
    ],
    columns: [
      { name: 'order', label: 'Ordem' },
      { name: 'role', label: 'Cargo' },
      { name: 'org', label: 'Organização' },
      { name: 'periodStart', label: 'Início' },
      { name: 'status', label: 'Status' },
    ],
  },

  projects: {
    key: 'projects',
    endpoint: '/api/projects',
    singular: 'Projeto',
    plural: 'Projetos',
    fields: [
      { name: 'name', label: 'Nome', type: 'text', required: true },
      { name: 'year', label: 'Ano', type: 'number', required: true },
      { name: 'description', label: 'Descrição', type: 'textarea', required: true },
      { name: 'stack', label: 'Stack (tecnologias)', type: 'tags', help: 'Enter ou vírgula para adicionar' },
      { name: 'imageUrls', label: 'Imagens', type: 'images' },
      { name: 'demoUrl', label: 'URL da demo', type: 'text' },
      { name: 'repoUrl', label: 'URL do repositório', type: 'text' },
      { name: 'order', label: 'Ordem', type: 'number' },
    ],
    columns: [
      { name: 'order', label: 'Ordem' },
      { name: 'name', label: 'Nome' },
      { name: 'year', label: 'Ano' },
      { name: 'stack', label: 'Stack' },
    ],
  },

  courses: {
    key: 'courses',
    endpoint: '/api/courses',
    singular: 'Curso',
    plural: 'Cursos',
    fields: [
      { name: 'name', label: 'Nome do curso', type: 'text', required: true },
      { name: 'org', label: 'Instituição', type: 'text', required: true },
      { name: 'year', label: 'Ano', type: 'number', required: true },
      { name: 'hours', label: 'Carga horária', type: 'text', placeholder: 'ex.: 40h' },
      { name: 'order', label: 'Ordem', type: 'number' },
    ],
    columns: [
      { name: 'order', label: 'Ordem' },
      { name: 'name', label: 'Curso' },
      { name: 'org', label: 'Instituição' },
      { name: 'year', label: 'Ano' },
      { name: 'hours', label: 'Horas' },
    ],
  },

  education: {
    key: 'education',
    endpoint: '/api/education',
    singular: 'Formação',
    plural: 'Formação acadêmica',
    fields: [
      { name: 'degree', label: 'Grau / curso', type: 'text', required: true },
      { name: 'org', label: 'Instituição', type: 'text', required: true },
      { name: 'periodStart', label: 'Ano de início', type: 'number', required: true },
      { name: 'periodEnd', label: 'Ano de fim', type: 'number', help: 'em branco = ano único / em andamento' },
      { name: 'highlight', label: 'Destaque', type: 'text' },
      { name: 'inProgress', label: 'Em andamento', type: 'checkbox' },
      { name: 'order', label: 'Ordem', type: 'number' },
    ],
    columns: [
      { name: 'order', label: 'Ordem' },
      { name: 'degree', label: 'Grau' },
      { name: 'org', label: 'Instituição' },
      { name: 'periodStart', label: 'Início' },
      { name: 'inProgress', label: 'Em andamento' },
    ],
  },

  skills: {
    key: 'skills',
    endpoint: '/api/skills',
    singular: 'Habilidade',
    plural: 'Habilidades',
    fields: [
      { name: 'category', label: 'Categoria', type: 'text', required: true, placeholder: 'ex.: Linguagens' },
      { name: 'item', label: 'Item', type: 'text', required: true, placeholder: 'ex.: PHP 8' },
      { name: 'order', label: 'Ordem', type: 'number' },
    ],
    columns: [
      { name: 'order', label: 'Ordem' },
      { name: 'category', label: 'Categoria' },
      { name: 'item', label: 'Item' },
    ],
  },

  languages: {
    key: 'languages',
    endpoint: '/api/languages',
    singular: 'Idioma',
    plural: 'Idiomas',
    fields: [
      { name: 'name', label: 'Idioma', type: 'text', required: true },
      { name: 'level', label: 'Nível', type: 'text', required: true, placeholder: 'ex.: Avançado' },
      { name: 'pct', label: 'Percentual (0–100)', type: 'number', required: true, min: 0, max: 100 },
      { name: 'order', label: 'Ordem', type: 'number' },
    ],
    columns: [
      { name: 'order', label: 'Ordem' },
      { name: 'name', label: 'Idioma' },
      { name: 'level', label: 'Nível' },
      { name: 'pct', label: '%' },
    ],
  },

  gallery: {
    key: 'gallery',
    endpoint: '/api/gallery',
    singular: 'Item da galeria',
    plural: 'Galeria',
    fields: [
      { name: 'title', label: 'Título', type: 'text', required: true },
      { name: 'imageUrl', label: 'Imagem', type: 'image', required: true },
      { name: 'caption', label: 'Legenda', type: 'textarea' },
      { name: 'eventDate', label: 'Data do evento', type: 'date' },
      { name: 'order', label: 'Ordem', type: 'number' },
    ],
    columns: [
      { name: 'order', label: 'Ordem' },
      { name: 'title', label: 'Título' },
      { name: 'eventDate', label: 'Data' },
    ],
  },
};

export function getEntityConfig(key: string): EntityConfig | undefined {
  return entityConfigs[key];
}

// Perfil — entidade especial de linha única (PUT sem id).
export const profileConfig: EntityConfig = {
  key: 'profile',
  endpoint: '/api/profile',
  singular: 'Perfil',
  plural: 'Perfil',
  singleton: true,
  fields: [
    { name: 'fullName', label: 'Nome completo', type: 'text', required: true },
    { name: 'headline', label: 'Headline (subtítulo)', type: 'text', required: true },
    { name: 'terminalLine', label: 'Linha do terminal', type: 'text', required: true },
    { name: 'summary', label: 'Resumo / objetivo', type: 'textarea', required: true },
    { name: 'phone', label: 'Telefone', type: 'text', required: true },
    { name: 'email', label: 'E-mail', type: 'text', required: true },
    { name: 'linkedinUrl', label: 'URL do LinkedIn', type: 'text', required: true },
    { name: 'cvUrl', label: 'URL do currículo (PDF)', type: 'text' },
    { name: 'status', label: 'Status (disponibilidade)', type: 'text', required: true },
    { name: 'statYears', label: 'Métrica: anos de atuação', type: 'text', required: true, placeholder: '13+' },
    { name: 'statSystems', label: 'Métrica: sistemas implantados', type: 'text', required: true, placeholder: '6' },
    { name: 'statAgencies', label: 'Métrica: órgãos atendidos', type: 'text', required: true, placeholder: '5' },
  ],
  columns: [],
};
