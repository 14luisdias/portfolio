import type { ContactPayload } from './types';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(data: Partial<ContactPayload>): string | null {
  if (!data.name || data.name.trim().length < 2) {
    return 'Informe um nome válido.';
  }
  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    return 'Informe um e-mail válido.';
  }
  if (!data.message || data.message.trim().length < 10) {
    return 'A mensagem precisa ter pelo menos 10 caracteres.';
  }
  if (data.message.length > 5000) {
    return 'A mensagem é muito longa.';
  }
  return null;
}
