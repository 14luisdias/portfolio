import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import type { z } from 'zod';
import { requireAdmin } from '@/lib/api-auth';

// Interface mínima de um "delegate" do Prisma (prisma.job, prisma.project, ...).
// Parâmetros como `any` para aceitar qualquer model sem brigar com os tipos gerados.
export interface CrudDelegate {
  findMany: (args?: any) => Promise<any>;
  create: (args: any) => Promise<any>;
  findUnique: (args: any) => Promise<any>;
  update: (args: any) => Promise<any>;
  delete: (args: any) => Promise<any>;
}

type Ctx = { params: { id: string } };

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function validationError(error: z.ZodError) {
  return NextResponse.json(
    {
      error: 'Dados inválidos.',
      issues: error.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
    },
    { status: 422 },
  );
}

async function parseBody(req: NextRequest) {
  try {
    return { ok: true as const, data: await req.json() };
  } catch {
    return { ok: false as const, response: jsonError('Corpo da requisição inválido (JSON).', 400) };
  }
}

function handlePrismaError(e: unknown) {
  // P2025 = registro não encontrado (update/delete de id inexistente).
  if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2025') {
    return jsonError('Registro não encontrado.', 404);
  }
  console.error('Erro na API:', e);
  return jsonError('Erro interno ao processar a requisição.', 500);
}

// Rota de coleção: GET (público) + POST (protegido).
export function makeCollectionRoute(
  delegate: CrudDelegate,
  createSchema: z.ZodTypeAny,
  orderBy: unknown = [{ order: 'asc' }, { createdAt: 'desc' }],
) {
  async function GET() {
    try {
      const items = await delegate.findMany({ orderBy });
      return NextResponse.json(items);
    } catch (e) {
      return handlePrismaError(e);
    }
  }

  async function POST(req: NextRequest) {
    const gate = await requireAdmin();
    if (!gate.ok) return gate.response;

    const body = await parseBody(req);
    if (!body.ok) return body.response;

    const parsed = createSchema.safeParse(body.data);
    if (!parsed.success) return validationError(parsed.error);

    try {
      const created = await delegate.create({ data: parsed.data });
      return NextResponse.json(created, { status: 201 });
    } catch (e) {
      return handlePrismaError(e);
    }
  }

  return { GET, POST };
}

// Rota de item: GET (público) + PUT/PATCH/DELETE (protegidos).
export function makeItemRoute(delegate: CrudDelegate, updateSchema: z.ZodTypeAny) {
  async function GET(_req: NextRequest, { params }: Ctx) {
    try {
      const item = await delegate.findUnique({ where: { id: params.id } });
      if (!item) return jsonError('Registro não encontrado.', 404);
      return NextResponse.json(item);
    } catch (e) {
      return handlePrismaError(e);
    }
  }

  async function PUT(req: NextRequest, { params }: Ctx) {
    const gate = await requireAdmin();
    if (!gate.ok) return gate.response;

    const body = await parseBody(req);
    if (!body.ok) return body.response;

    const parsed = updateSchema.safeParse(body.data);
    if (!parsed.success) return validationError(parsed.error);

    try {
      const updated = await delegate.update({ where: { id: params.id }, data: parsed.data });
      return NextResponse.json(updated);
    } catch (e) {
      return handlePrismaError(e);
    }
  }

  async function DELETE(_req: NextRequest, { params }: Ctx) {
    const gate = await requireAdmin();
    if (!gate.ok) return gate.response;

    try {
      await delegate.delete({ where: { id: params.id } });
      return NextResponse.json({ ok: true });
    } catch (e) {
      return handlePrismaError(e);
    }
  }

  return { GET, PUT, PATCH: PUT, DELETE };
}
