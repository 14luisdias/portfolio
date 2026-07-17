import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { requireAdmin } from '@/lib/api-auth';

export const dynamic = 'force-dynamic';

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif'];

// POST /api/upload — recebe um arquivo (campo "file"), envia ao Vercel Blob
// e retorna a URL pública. Protegido por sessão admin.
export async function POST(req: NextRequest) {
  const gate = await requireAdmin();
  if (!gate.ok) return gate.response;

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: 'Upload indisponível: BLOB_READ_WRITE_TOKEN não configurado.' },
      { status: 503 },
    );
  }

  const form = await req.formData();
  const file = form.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'Envie um arquivo no campo "file".' }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: 'Formato não suportado. Use JPG, PNG, WEBP, GIF ou AVIF.' },
      { status: 422 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'Arquivo muito grande (máx. 8 MB).' }, { status: 422 });
  }

  const ext = file.name.includes('.') ? file.name.split('.').pop() : 'bin';
  const key = `portfolio/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const blob = await put(key, file, { access: 'public', token });

  return NextResponse.json({ url: blob.url });
}
