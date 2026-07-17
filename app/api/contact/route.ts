import { NextRequest, NextResponse } from 'next/server';
import { validateContactPayload } from '@/lib/validation';
import type { ContactPayload, ContactResponse } from '@/lib/types';

// Endpoint de backend: POST /api/contact
// Recebe { name, email, message }, valida no servidor e, se RESEND_API_KEY
// estiver configurada no ambiente, envia o e-mail via Resend (https://resend.com).
// Sem a chave configurada, apenas registra a mensagem nos logs do servidor
// (útil em desenvolvimento, sem quebrar o formulário em produção).
export async function POST(request: NextRequest) {
  let body: Partial<ContactPayload>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json<ContactResponse>(
      { ok: false, error: 'Corpo da requisição inválido.' },
      { status: 400 },
    );
  }

  const validationError = validateContactPayload(body);
  if (validationError) {
    return NextResponse.json<ContactResponse>(
      { ok: false, error: validationError },
      { status: 422 },
    );
  }

  const { name, email, message } = body as ContactPayload;
  const destination = process.env.CONTACT_EMAIL_TO ?? '14luisdias@gmail.com';
  const resendApiKey = process.env.RESEND_API_KEY;

  try {
    if (resendApiKey) {
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfólio <onboarding@resend.dev>',
          to: destination,
          reply_to: email,
          subject: `Contato via portfólio — ${name}`,
          text: `${message}\n\nDe: ${name} (${email})`,
        }),
      });

      if (!resendRes.ok) {
        const detail = await resendRes.text();
        console.error('Falha ao enviar via Resend:', detail);
        return NextResponse.json<ContactResponse>(
          { ok: false, error: 'Não foi possível enviar a mensagem agora. Tente novamente.' },
          { status: 502 },
        );
      }
    } else {
      // Sem provedor de e-mail configurado: registra no log do servidor.
      console.info('[contato] Nova mensagem (RESEND_API_KEY não configurada):', {
        name,
        email,
        message,
      });
    }

    return NextResponse.json<ContactResponse>({ ok: true }, { status: 200 });
  } catch (err) {
    console.error('Erro inesperado ao processar contato:', err);
    return NextResponse.json<ContactResponse>(
      { ok: false, error: 'Erro interno ao processar sua mensagem.' },
      { status: 500 },
    );
  }
}
