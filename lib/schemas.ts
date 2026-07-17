import { z } from 'zod';

// Helpers reutilizáveis -------------------------------------------------------

const requiredString = z.string().trim().min(1, 'Campo obrigatório.');

// String opcional que vira null quando vazia (útil para campos nullable).
const optionalNullableString = z
  .string()
  .trim()
  .nullish()
  .transform((v) => (v && v.length > 0 ? v : null));

const requiredInt = z.coerce.number().int();

// Inteiro opcional: '' / null / undefined viram null; caso contrário coage p/ int.
const optionalNullableInt = z.preprocess(
  (v) => (v === '' || v === null || v === undefined ? null : v),
  z.coerce.number().int().nullable(),
);

const stringArray = z.array(z.string().trim().min(1));

// Data opcional: '' / null / undefined viram null; caso contrário coage p/ Date.
const optionalNullableDate = z.preprocess(
  (v) => (v === '' || v === null || v === undefined ? null : v),
  z.coerce.date().nullable(),
);

// IMPORTANTE: os "shapes" abaixo NÃO têm `.default()`.
// Os defaults valem apenas na criação (create), pois no update parcial um
// `.default()` reaplica o valor padrão quando o campo é omitido — o que zeraria
// campos como status/order/arrays. Por isso:
//   - create = shape + defaults nos campos opcionais
//   - update = z.object(shape).partial()  (sem defaults)

// Job -------------------------------------------------------------------------
const jobShape = {
  role: requiredString,
  org: requiredString,
  periodStart: requiredString,
  periodEnd: optionalNullableString,
  status: z.enum(['ONLINE', 'CONCLUIDO']),
  description: requiredString,
  order: requiredInt,
};
export const jobCreateSchema = z.object({
  ...jobShape,
  status: z.enum(['ONLINE', 'CONCLUIDO']).default('CONCLUIDO'),
  order: requiredInt.default(0),
});
export const jobUpdateSchema = z.object(jobShape).partial();

// Project ---------------------------------------------------------------------
const projectShape = {
  name: requiredString,
  year: requiredInt,
  description: requiredString,
  stack: stringArray,
  imageUrls: stringArray,
  demoUrl: optionalNullableString,
  repoUrl: optionalNullableString,
  order: requiredInt,
};
export const projectCreateSchema = z.object({
  ...projectShape,
  stack: stringArray.default([]),
  imageUrls: stringArray.default([]),
  order: requiredInt.default(0),
});
export const projectUpdateSchema = z.object(projectShape).partial();

// Course ----------------------------------------------------------------------
const courseShape = {
  name: requiredString,
  org: requiredString,
  year: requiredInt,
  hours: optionalNullableString,
  order: requiredInt,
};
export const courseCreateSchema = z.object({
  ...courseShape,
  order: requiredInt.default(0),
});
export const courseUpdateSchema = z.object(courseShape).partial();

// Education -------------------------------------------------------------------
const educationShape = {
  degree: requiredString,
  org: requiredString,
  periodStart: requiredInt,
  periodEnd: optionalNullableInt,
  highlight: optionalNullableString,
  inProgress: z.boolean(),
  order: requiredInt,
};
export const educationCreateSchema = z.object({
  ...educationShape,
  inProgress: z.boolean().default(false),
  order: requiredInt.default(0),
});
export const educationUpdateSchema = z.object(educationShape).partial();

// Skill -----------------------------------------------------------------------
const skillShape = {
  category: requiredString,
  item: requiredString,
  order: requiredInt,
};
export const skillCreateSchema = z.object({
  ...skillShape,
  order: requiredInt.default(0),
});
export const skillUpdateSchema = z.object(skillShape).partial();

// Language --------------------------------------------------------------------
const languageShape = {
  name: requiredString,
  level: requiredString,
  pct: z.coerce.number().int().min(0).max(100),
  order: requiredInt,
};
export const languageCreateSchema = z.object({
  ...languageShape,
  order: requiredInt.default(0),
});
export const languageUpdateSchema = z.object(languageShape).partial();

// GalleryItem -----------------------------------------------------------------
const galleryShape = {
  title: requiredString,
  imageUrl: requiredString,
  caption: optionalNullableString,
  eventDate: optionalNullableDate,
  order: requiredInt,
};
export const galleryCreateSchema = z.object({
  ...galleryShape,
  order: requiredInt.default(0),
});
export const galleryUpdateSchema = z.object(galleryShape).partial();

// Profile — linha única, sempre enviado completo (PUT = substituição total).
export const profileSchema = z.object({
  fullName: requiredString,
  headline: requiredString,
  terminalLine: requiredString,
  summary: requiredString,
  phone: requiredString,
  email: z.string().trim().email('E-mail inválido.'),
  linkedinUrl: z.string().trim().url('URL inválida.'),
  cvUrl: optionalNullableString,
  status: requiredString,
  statYears: requiredString,
  statSystems: requiredString,
  statAgencies: requiredString,
});
