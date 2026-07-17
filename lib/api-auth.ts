import { NextResponse } from 'next/server';
import type { Session } from 'next-auth';
import { auth } from '@/auth';

// Resultado do guard de autorização das rotas de API.
type Gate =
  | { ok: true; session: Session }
  | { ok: false; response: NextResponse };

// Garante que a requisição tem uma sessão admin válida.
// Use nas rotas de escrita (POST/PUT/PATCH/DELETE):
//   const gate = await requireAdmin();
//   if (!gate.ok) return gate.response;
export async function requireAdmin(): Promise<Gate> {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      response: NextResponse.json(
        { error: 'Não autorizado. Faça login como administrador.' },
        { status: 401 },
      ),
    };
  }

  return { ok: true, session };
}
