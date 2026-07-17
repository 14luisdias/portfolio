# Guia de Deploy — Next.js + Prisma + PostgreSQL (Neon) + Vercel

Playbook reutilizável para publicar uma app **Next.js (App Router) + Prisma + PostgreSQL**
na **Vercel**, usando **Neon** como banco em produção. Escrito a partir de um deploy real —
inclui os erros mais comuns e como corrigi-los (seção [Troubleshooting](#troubleshooting)).

> **Modelo mental:** você tem **três ambientes de banco, separados e independentes**:
> - **Dev local** → Postgres na sua máquina (ex.: banco `projeto_dev`)
> - **Docker local** → mesmo Postgres da máquina, via `host.docker.internal`
> - **Produção** → Neon (na nuvem)
>
> Eles **não** precisam ter o mesmo nome. Cada um tem seu próprio `DATABASE_URL`.

---

## Pré-requisitos

- Projeto já roda localmente (`npm run dev`) com migrations aplicadas.
- Conta na [Vercel](https://vercel.com) com o projeto conectado ao repositório GitHub.
- Conta no [Neon](https://neon.tech).
- No `package.json`, o script de build roda o generate do Prisma:
  ```json
  "scripts": { "build": "prisma generate && next build" }
  ```
- Migrations versionadas em `prisma/migrations/` (commitadas no git).
- Páginas que leem do banco são **dinâmicas** (`export const dynamic = 'force-dynamic'`),
  senão o build tenta renderizá-las estático e falha por não ter banco.

---

## Passo 1 — Criar o banco no Neon

1. Neon → **New Project** → escolha uma região próxima dos usuários.
2. Copie a **Connection string**. Formato:
   ```
   postgresql://USUARIO:SENHA@ep-xxxxx.REGIAO.aws.neon.tech/neondb?sslmode=require
   ```
3. **Garanta o `?sslmode=require` no final** — o Neon recusa conexão sem SSL.

> Guarde essa URL: ela será usada em **dois** lugares (passo 2 e passo 4) e precisa ser
> **idêntica** nos dois, senão você popula um banco e a app lê outro.

---

## Passo 2 — Aplicar migrations e seed **no Neon**

> ⚠️ **O erro nº 1 aqui:** rodar o seed e ele ir parar no banco **local** em vez do Neon.
> Isso acontece porque **o Prisma sempre lê o `DATABASE_URL` do arquivo `.env`** — e um
> prefixo `DATABASE_URL=... comando` nem sempre tem prioridade (depende de shell/versão).

**Jeito à prova de falhas** (aponte o `.env` pro Neon só durante o seed):

1. Abra o `.env` e **copie o valor atual** do `DATABASE_URL` (para restaurar depois).
2. Troque a linha pelo Neon:
   ```
   DATABASE_URL="postgresql://...neon...?sslmode=require"
   ```
3. Rode:
   ```bash
   npx prisma migrate deploy   # cria as tabelas no Neon
   npm run db:seed             # popula os dados + usuário admin
   ```
   Sucesso = ver algo como `migrations applied` e a mensagem final do seed.
4. **Confirme** que foi pro Neon (Neon → SQL Editor):
   ```sql
   SELECT count(*) FROM "Nome_De_Uma_Tabela";
   ```
5. **Restaure** o `DATABASE_URL` do `.env` para o valor **local** — senão seu
   `npm run dev` para de conectar.

> `prisma migrate deploy` (produção) ≠ `prisma migrate dev` (desenvolvimento).
> Em produção use sempre `deploy`: ele só aplica migrations existentes, não cria novas.

---

## Passo 3 — Vercel Blob (opcional, se houver upload de imagens)

1. Vercel → seu projeto → aba **Storage** → **Create** → **Blob**.
2. Ao criar/conectar, a Vercel injeta o `BLOB_READ_WRITE_TOKEN` no projeto
   automaticamente. Se não injetar, copie o token e adicione no passo 4.

---

## Passo 4 — Variáveis de ambiente na Vercel

Vercel → seu projeto → **Settings → Environment Variables**. Adicione todas com escopo
**Production** (marque o checkbox certo!):

| Variável | Valor |
|---|---|
| `DATABASE_URL` | **a URL do Neon** (a MESMA do passo 2, com `?sslmode=require`) |
| `NEXTAUTH_SECRET` / `AUTH_SECRET` | segredo forte (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | a URL pública, ex.: `https://SEU-APP.vercel.app` |
| `BLOB_READ_WRITE_TOKEN` | token do Blob (se usar upload) |
| demais segredos do app | (ex.: `ADMIN_*`, chaves de API...) |

> ⚠️ **O erro nº 2 (o que nos pegou):** colar o **nome** da variável mas deixar o
> **valor vazio** (ou como "nota"). Confira que cada variável tem um **valor real**.

---

## Passo 5 — Subir o código pro GitHub

A Vercel builda a partir do GitHub, então publicar = dar `push`.

> ⚠️ **Antes**, garanta que segredos não vão pro repositório. Se algum `.env*` foi
> commitado antes de existir `.gitignore`, remova do rastreamento:
> ```bash
> git rm --cached .env .env.local 2>/dev/null
> ```
> E confirme que o `.gitignore` cobre `.env`, `.env.local`, `.env*.local`.
> Se um segredo já foi commitado/enviado antes, **rotacione** essa chave.

```bash
git add -A
git commit -m "Deploy: banco + variáveis de produção"
git push
```

---

## Passo 6 — Redeploy (sempre que mexer em variável)

> ⚠️ **O erro nº 3:** adicionar/alterar uma variável de ambiente e o site continuar
> quebrado. **Variável nova só passa a valer em um deploy novo.**

- Vercel → **Deployments** → no deploy mais recente → **⋯ → Redeploy**.
- Espere ficar **Ready** e recarregue o site.

---

## Passo 7 — Verificar

1. **Build**: Deployments → o último deve estar **Ready** (verde). Se **Error**,
   abra os **Build Logs**.
2. **Site**: `https://SEU-APP.vercel.app` → carrega estilizado e com os dados reais.
3. **Rota que usa banco** (ex.: `/api/algo`) → responde dados, não 500.
4. **Login/admin** (se houver): entra normalmente.
5. Ao mudar conteúdo pelo painel, ele reflete no site (páginas dinâmicas).

---

## Troubleshooting

**Onde ver o erro REAL:** Vercel → seu projeto → **Deployments** → clique no deploy →
aba **Logs** (Runtime) → recarregue o site para gerar o erro → leia a última linha.

| Sintoma / linha no log | Causa | Correção |
|---|---|---|
| **500 sem corpo** / `Environment variable not found: DATABASE_URL` | `DATABASE_URL` ausente no runtime (não setada, escopo errado, ou sem Redeploy) | Passos 4 e 6: setar valor real em **Production** + **Redeploy** |
| Página abre mas **sem dados** | migrations/seed rodaram no banco **errado** (local) | Refaça o passo 2 apontando o `.env` pro Neon |
| `The table "public.X" does not exist` | Vercel aponta pra um Neon diferente do que você semeou | Use a **mesma** URL no passo 2 e no passo 4 |
| `Can't reach database server` / erro de SSL | falta `?sslmode=require` ou host errado | Corrija o valor do `DATABASE_URL` + Redeploy |
| `Query engine ... could not be found` | binary target do Prisma incompatível com o runtime | No `schema.prisma`: `binaryTargets = ["native", "rhel-openssl-3.0.x"]` e rebuild |
| Build falha em página que lê banco | página estática tentando acessar o banco no build | Adicione `export const dynamic = 'force-dynamic'` na página |
| Mudei a env var e nada mudou | deploy antigo não tem a variável | **Redeploy** |

---

## Checklist rápido

- [ ] Neon criado, connection string com `?sslmode=require`
- [ ] `migrate deploy` + `seed` rodados **no Neon** (confirmado por `SELECT count(*)`)
- [ ] `.env` local **restaurado** para o banco de dev
- [ ] Variáveis na Vercel com **valor real** e escopo **Production**
- [ ] `DATABASE_URL` da Vercel == URL usada no seed
- [ ] `.env*` fora do git; segredos vazados rotacionados
- [ ] `git push` feito
- [ ] **Redeploy** após configurar variáveis
- [ ] Site, rota de dados e login verificados

---

## Fluxo de manutenção (depois do 1º deploy)

- **Mudou código** → `git push` (a Vercel rebuilda sozinha).
- **Mudou o schema do Prisma** → crie a migration em dev (`npx prisma migrate dev`),
  commite `prisma/migrations/`, e aplique em produção (`migrate deploy` com a URL do Neon,
  ou automatize no comando de build).
- **Mudou variável de ambiente** → **Redeploy**.
- **Rodando em Docker** (build de produção) → `docker compose up --build -d` a cada mudança.
