# ---- Etapa 1: dependências ----
FROM node:20-alpine AS deps
WORKDIR /app
# libc6-compat ajuda os binários nativos (engine do Prisma) no Alpine
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
# O schema precisa existir antes do npm ci por causa do postinstall (prisma generate)
COPY prisma ./prisma
RUN npm ci

# ---- Etapa 2: build ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# "npm run build" roda "prisma generate && next build"
RUN npm run build

# ---- Etapa 3: runtime (imagem final enxuta) ----
FROM node:20-alpine AS runner
WORKDIR /app

RUN apk add --no-cache libc6-compat
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copia apenas o necessário graças ao output: 'standalone'
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# Garante que o cliente Prisma gerado + engine acompanhem a imagem standalone
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.prisma ./node_modules/.prisma

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
