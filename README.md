# Portfólio — Luis Antonio Sanches Dias

Site de portfólio pessoal construído em **Next.js 14 (App Router)** + **TypeScript** +
**Tailwind CSS**, com tema dark mode inspirado em painéis de monitoramento de sistemas —
refletindo a atuação do Luis como Analista de Sistemas e Desenvolvedor Full Stack.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (animações)
- Lucide React (ícones)

## Rodando localmente (sem Docker)

Pré-requisitos: Node.js 18+ e npm.

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

Para gerar a build de produção localmente:

```bash
npm run build
npm run start
```

## Rodando com Docker

Pré-requisitos: Docker e Docker Compose instalados.

```bash
docker compose build
docker compose up -d
```

O site sobe em [http://localhost:3000](http://localhost:3000).

Para parar:

```bash
docker compose down
```

Para ver os logs:

```bash
docker compose logs -f
```

O `Dockerfile` usa build multi-stage e o modo `output: 'standalone'` do Next.js, gerando uma
imagem final enxuta (só o necessário para rodar em produção, sem o código-fonte completo).

## Deploy na Vercel (passo a passo)

A Vercel não usa o `docker-compose.yml` — ela faz o build nativo do Next.js na própria
infraestrutura. O Docker aqui serve para você rodar/testar localmente ou hospedar em outro
ambiente (VPS, EC2 etc.) caso queira no futuro.

1. **Suba o projeto para o GitHub:**

   ```bash
   git init
   git add .
   git commit -m "portfolio inicial"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/portfolio.git
   git push -u origin main
   ```

2. **Crie uma conta na Vercel:** acesse [vercel.com](https://vercel.com) → "Sign Up" →
   "Continue with GitHub" (autoriza acesso aos seus repositórios).

3. **Importe o projeto:** no dashboard, clique em **"Add New" → "Project"** e selecione o
   repositório `portfolio` da lista.

4. **Deploy:** a Vercel detecta automaticamente que é um projeto Next.js — não precisa mexer em
   nada, só clicar em **"Deploy"**.

5. **Pronto:** em ~1-2 minutos você recebe uma URL do tipo
   `portfolio-seu-usuario.vercel.app`.

6. **Deploys automáticos:** a cada `git push` na branch `main`, a Vercel refaz o deploy sozinha.
   Pull requests geram URLs de preview automaticamente.

7. **Domínio próprio (opcional):** em Project Settings → Domains, você pode conectar um domínio
   próprio (ex: `luisdias.dev`).

## Estrutura do projeto

O projeto separa claramente **frontend** (páginas e componentes visuais) de
**backend** (rotas de API e lógica de servidor), ambos dentro do mesmo projeto
Next.js — é assim que o Next.js organiza full stack:

```
├── app/
│   ├── layout.tsx           # Layout raiz, fontes e metadata SEO      [frontend]
│   ├── page.tsx             # Página principal (monta as seções)     [frontend]
│   ├── globals.css          # Estilos globais e grid de fundo        [frontend]
│   └── api/
│       └── contact/
│           └── route.ts     # Endpoint POST /api/contact             [backend]
├── components/                                                       [frontend]
│   ├── Nav.tsx               # Navegação fixa
│   ├── Hero.tsx              # Seção inicial com status e destaques
│   ├── About.tsx             # Objetivo profissional e idiomas
│   ├── Experience.tsx        # Timeline de experiência profissional
│   ├── Skills.tsx            # Habilidades técnicas por categoria
│   ├── Projects.tsx          # Cards de sistemas/projetos implantados
│   ├── Education.tsx         # Formação acadêmica e cursos
│   ├── Contact.tsx           # Formulário de contato (chama a API)
│   └── Footer.tsx
├── lib/                                                               [backend]
│   ├── types.ts              # Tipos compartilhados (ContactPayload, etc.)
│   └── validation.ts         # Validação de dados recebidos pela API
├── .env.example              # Variáveis de ambiente do backend
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── next.config.js            # output: 'standalone' para builds Docker enxutas
```

### Backend: formulário de contato

O formulário em `components/Contact.tsx` envia um `POST` para `/api/contact`
(`app/api/contact/route.ts`), que roda **no servidor** e faz:

1. Validação dos campos (`lib/validation.ts`) — nome, e-mail e mensagem.
2. Se a variável `RESEND_API_KEY` estiver configurada, envia o e-mail de
   verdade via [Resend](https://resend.com).
3. Caso contrário, apenas registra a mensagem nos logs do servidor (não quebra
   o formulário, só não envia e-mail real — útil em desenvolvimento).

Para ativar o envio real de e-mail:

```bash
cp .env.example .env.local
# edite .env.local e preencha RESEND_API_KEY com sua chave do Resend
```

Na Vercel, adicione as mesmas variáveis em **Project Settings → Environment
Variables**.

## Personalização rápida

- **Baixar CV:** coloque o PDF do currículo em `public/curriculo-luis-sanches-dias.pdf` — o
  botão "Baixar CV" no Hero já aponta para esse caminho.
- **Cores:** ajuste a paleta em `tailwind.config.ts` (chaves `bg`, `surface`, `teal`, `amber`,
  `ink`).
- **Conteúdo:** os dados de experiência, projetos, skills e formação estão diretamente nos
  respectivos componentes em `components/`, como arrays de objetos fáceis de editar.
