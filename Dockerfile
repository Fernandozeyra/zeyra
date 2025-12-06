# Multi-stage build: compila o front e roda apenas o server em produção

# 1) Builder: instala deps e gera o dist
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2) Runtime: instala apenas deps de produção e serve o dist pelo server
FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Copia o build do front e os arquivos do server necessários em runtime
COPY --from=builder /app/dist ./dist
COPY server.js ./server.js
COPY middlewares ./middlewares
COPY utils ./utils
COPY config ./config
COPY models ./models
COPY api ./api    

# Porta do app (server lê APP_PORT, padrão 3000)
ENV APP_PORT=3000
EXPOSE 3000

CMD ["node", "server.js"]