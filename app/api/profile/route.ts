import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/api-auth';
import { profileSchema } from '@/lib/schemas';

export const dynamic = 'force-dynamic';

// GET público — o site lê o perfil daqui (linha única).
export async function GET() {
  const profile = await prisma.profile.findFirst();
  return NextResponse.json(profile);
}

// PUT/PATCH protegido — cria a linha única se não existir, senão atualiza.
export async function PUT(req: NextRequest) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corpo da requisição inválido (JSON).' }, { status: 400 });
  }

  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Dados inválidos.',
        issues: parsed.error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
      },
      { status: 422 },
    );
  }

  const existing = await prisma.profile.findFirst();
  const saved = existing
    ? await prisma.profile.update({ where: { id: existing.id }, data: parsed.data })
    : await prisma.profile.create({ data: parsed.data });

  return NextResponse.json(saved);
}

export const PATCH = PUT;
