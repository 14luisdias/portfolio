# Portfólio — Luis Antonio Sanches Dias

Portfólio pessoal full stack em **Next.js 14 (App Router) + TypeScript + Tailwind CSS**,
com painel administrativo protegido e conteúdo servido a partir de um banco
**PostgreSQL** via **Prisma**. Dark mode (paleta teal/âmbar, fontes Space Grotesk /
Inter / JetBrains Mono, estética de "painel de sistema").

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** + **framer-motion** + **lucide-react**
- **Prisma** (ORM) + **PostgreSQL** (local em dev, Neon em produção)
- **NextAuth (Auth.js) v5** — login do admin por credenciais (e-mail + senha), sessão JWT
- **bcryptjs** — hash de senha
- **Vercel Blob** — upload de imagens (dev e produção)
- **zod** — validação nas rotas de API
- **Resend** — envio do formulário de contato (opcional)

## Estrutura

```
app/
  page.tsx                 # site público (Server Component; lê do banco)
  admin/                   # painel protegido (login + CRUD por entidade)
  api/                     # rotas REST (GET público; escrita protegida) + upload + contato
components/                # seções do site + componentes do admin
lib/                       # prisma, auth helpers, schemas zod, config do admin, leitura de dados
prisma/
  schema.prisma            # modelos
  seed.ts                  # popula o banco com os dados reais + admin
```

---

## Desenvolvimento local

### 1. Pré-requisitos

- Node.js 20+
- PostgreSQL rodando **na máquina host** (fora do Docker)

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar o banco local

Crie um banco e um usuário no seu PostgreSQL, por exemplo:

```sql
CREATE ROLE portfolio WITH LOGIN PASSWORD 'sua_senha' CREATEDB;
CREATE DATABASE portfolio_dev OWNER portfolio;
```

> O privilégio `CREATEDB` no role é necessário para o `prisma migrate dev`
> criar o *shadow database* durante as migrações.

### 4. Variáveis de ambiente

Copie `.env.example` para `.env` e preencha:

```bash
cp .env.example .env
```

Gere o segredo do NextAuth:

```bash
openssl rand -base64 32   # cole em NEXTAUTH_SECRET
```

Veja a [tabela de variáveis](#variáveis-de-ambiente) abaixo.

### 5. Migrations e seed

```bash
npm run db:migrate     # aplica as migrations (prisma migrate dev)
npm run db:seed        # cria o admin e popula o conteúdo real
```

O admin é criado a partir de `ADMIN_EMAIL` / `ADMIN_PASSWORD` do `.env`.

### 6. Rodar

```bash
npm run dev
```

- Site: <http://localhost:3000>
- Painel: <http://localhost:3000/admin> (login em `/admin/login`)

### Scripts úteis

| Script               | O que faz                                     |
| -------------------- | --------------------------------------------- |
| `npm run dev`        | Servidor de desenvolvimento                   |
| `npm run build`      | `prisma generate` + `next build`              |
| `npm run start`      | Servidor de produção (após build)             |
| `npm run lint`       | ESLint                                        |
| `npm run db:migrate` | `prisma migrate dev`                          |
| `npm run db:deploy`  | `prisma migrate deploy` (produção)            |
| `npm run db:seed`    | Roda `prisma/seed.ts`                         |
| `npm run db:studio`  | Abre o Prisma Studio                          |

---

## Rodar com Docker (Postgres externo)

O `docker-compose.yml` **não** sobe um Postgres — o banco continua sendo o da
sua máquina host. O container o alcança via `host.docker.internal`
(configurado com `extra_hosts`).

1. Garanta que o `.env` tem `DATABASE_URL_DOCKER` apontando para
   `host.docker.internal` (o Compose injeta esse valor como `DATABASE_URL`
   dentro do container).
2. Suba:

```bash
docker compose up --build
```

O container lê todas as variáveis do `.env` (`env_file`).

---

## Painel administrativo

- Acesse `/admin/login` e entre com `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
- CRUD completo de: Perfil, Experiências, Projetos, Cursos, Formação,
  Habilidades, Idiomas e Galeria.
- Upload de imagens (Projetos e Galeria) via Vercel Blob — requer
  `BLOB_READ_WRITE_TOKEN` configurado.
- Ordenação manual pelo campo **Ordem** em cada registro.

Para trocar a senha do admin: altere `ADMIN_PASSWORD` no `.env` e rode
`npm run db:seed` novamente (o admin é atualizado via upsert).

---

## Variáveis de ambiente

| Variável                | Obrigatória | Descrição                                                               |
| ----------------------- | ----------- | ----------------------------------------------------------------------- |
| `DATABASE_URL`          | sim         | Conexão PostgreSQL. Dev: `localhost`. Prod: Neon com `sslmode=require`.  |
| `DATABASE_URL_DOCKER`   | (Docker)    | Igual à anterior, mas com host `host.docker.internal`.                  |
| `NEXTAUTH_SECRET`       | sim         | Segredo do NextAuth (`openssl rand -base64 32`).                        |
| `NEXTAUTH_URL`          | sim         | `http://localhost:3000` em dev; URL da Vercel em produção.              |
| `BLOB_READ_WRITE_TOKEN` | upload      | Token do Vercel Blob (upload de imagens).                              |
| `ADMIN_EMAIL`           | seed        | E-mail do admin criado pelo seed.                                       |
| `ADMIN_PASSWORD`        | seed        | Senha do admin criado pelo seed.                                        |
| `RESEND_API_KEY`        | não         | Envio real de e-mail do formulário de contato.                          |
| `CONTACT_EMAIL_TO`      | não         | Destino das mensagens do formulário.                                    |

---

## Produção (Neon + Vercel)

> 📘 Guia detalhado, passo a passo e com troubleshooting: **[`docs/DEPLOY.md`](docs/DEPLOY.md)**.

### 1. Banco no Neon (Vercel Postgres)

1. Crie um projeto no [Neon](https://neon.tech) (ou Vercel Postgres).
2. Copie a connection string (inclui `?sslmode=require`).

### 2. Vercel Blob

1. No painel da Vercel: **Storage → Blob → Create**.
2. Gere um token de leitura/escrita → use em `BLOB_READ_WRITE_TOKEN`.

### 3. Variáveis na Vercel

Em **Settings → Environment Variables**, adicione:

- `DATABASE_URL` = string do Neon (`...?sslmode=require`)
- `NEXTAUTH_SECRET` = segredo gerado
- `NEXTAUTH_URL` = `https://SEU-APP.vercel.app`
- `BLOB_READ_WRITE_TOKEN` = token do Blob
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- (opcional) `RESEND_API_KEY`, `CONTACT_EMAIL_TO`

### 4. Migrations e seed em produção

Com o `DATABASE_URL` de produção no ambiente local (ou via CI):

```bash
npx prisma migrate deploy   # aplica as migrations no Neon
npm run db:seed             # popula o conteúdo (rodar uma vez)
```

O build da Vercel roda `prisma generate` automaticamente (script `build`).

---

## Notas técnicas

- O site público é `dynamic` (SSR a cada requisição) para refletir edições do admin.
- Rotas de API: `GET` é público (o site lê daqui); `POST/PUT/PATCH/DELETE` exigem
  sessão admin (verificada nas rotas) e o middleware protege as páginas `/admin`.
- Validação de entrada com **zod** em todas as rotas de escrita.
- O contato (`/api/contact`) continua funcionando: envia via Resend se
  `RESEND_API_KEY` estiver configurada; caso contrário, apenas registra nos logs.
