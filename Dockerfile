FROM node:20-slim

WORKDIR /app

RUN apt-get update && \
    apt-get install -y python3 make g++ openssl && \
    rm -rf /var/lib/apt/lists/* && \
    corepack enable && \
    corepack prepare pnpm@10.28.2 --activate

COPY . .

RUN pnpm install --frozen-lockfile

RUN pnpm --filter=api run build

WORKDIR /app/apps/api

EXPOSE 3000

CMD ["sh", "-c", "pnpm db:migrate && node /app/apps/api/dist/main.js"]