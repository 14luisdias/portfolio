import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// O middleware usa apenas a config base (sem Prisma/bcrypt) para ser edge-safe.
// O callback `authorized` (em auth.config.ts) decide o acesso às rotas /admin.
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  // Protege todas as rotas sob /admin (a própria /admin/login é liberada no callback).
  matcher: ['/admin/:path*'],
};
