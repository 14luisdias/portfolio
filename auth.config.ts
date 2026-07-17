import type { NextAuthConfig } from 'next-auth';

// Configuração base do NextAuth — SEM providers que usem APIs de Node
// (Prisma/bcrypt), para poder rodar também no middleware (edge runtime).
export const authConfig = {
  // Honra NEXTAUTH_SECRET (no v5 o padrão seria AUTH_SECRET).
  secret: process.env.NEXTAUTH_SECRET,
  // Confia no host da requisição (necessário fora do preset da Vercel / em self-host/Docker).
  trustHost: true,
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // Usado pelo middleware para autorizar o acesso às rotas.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // A página de login é pública; se já logado, manda para o painel.
      if (pathname === '/admin/login') {
        if (isLoggedIn) return Response.redirect(new URL('/admin', nextUrl));
        return true;
      }

      // Qualquer outra rota /admin exige sessão (redireciona para signIn se não).
      if (pathname.startsWith('/admin')) {
        return isLoggedIn;
      }

      return true;
    },
    // Propaga id e role para o token JWT.
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = user.role;
      }
      return token;
    },
    // Expõe id e role na sessão consumida pela aplicação.
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  providers: [], // preenchido em auth.ts (Credentials)
} satisfies NextAuthConfig;
