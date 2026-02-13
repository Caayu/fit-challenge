## 1. Visão Geral do Projeto

**Objetivo:**
O sistema **Fit Challenge** soluciona o problema de catalogação e gestão de livros, oferecendo uma interface simplificada para usuários adicionarem, atualizarem, e removerem livros de sua biblioteca pessoal ou organizacional.

**Público-alvo:**
Leitores, administradores de pequenas bibliotecas e colecionadores.

**Principais Módulos:**

- **Catálogo de Livros (Web):** Interface de listagem, busca e visualização detalhada.
- **API REST (Backend):** Servidor centralizado para persistência e regras de negócio.
- **Upload de Capas:** Sistema de upload de imagens para capas de livros.

**Tecnologias Principais:**

- **Frontend:** Next.js 16 (App Router), React 19, TailwindCSS.
- **Backend:** NestJS 11, Drizzle ORM.
- **Infraestrutura:** Docker, Turborepo, PostgreSQL.

---

## 2. Estrutura do Monorepo

O projeto utiliza **Turborepo** para orquestração de builds e tarefas, com **pnpm** workspaces para gerenciamento de dependências.

### Estrutura Detalhada

```text
.
├── apps/
│   ├── api/            # Aplicação Backend (NestJS)
│   └── web/            # Aplicação Frontend (Next.js)
├── packages/           # Bibliotecas compartilhadas (ex: configs de linting)
├── docker-compose.yml  # Orquestração de containers para desenvolvimento local
├── turbo.json          # Pipeline de build e testes do monorepo
└── package.json        # Dependências raiz e scripts globais
```

**Separação Apps vs Packages:**

- **Apps:** Contém as aplicações deployáveis (`web`, `api`). Cada uma é independente, com seu próprio ciclo de vida e deploy.
- **Packages:** Contém configurações compartilhadas (`eslint-config`, `typescript-config`) usadas por múltiplos apps para garantir consistência.

**Bibliotecas Compartilhadas:**

- `@repo/eslint-config`: Configurações de linting padronizadas.
- `@repo/typescript-config`: Configurações base do TypeScript (`tsconfig.json`).

## 3. Stack Tecnológica

As versões listadas abaixo são exatas, conforme extraído dos arquivos de configuração.

### Frontend (`apps/web`)

| Tecnologia          | Versão    | Função                                 |
| :------------------ | :-------- | :------------------------------------- |
| **Next.js**         | `16.1.5`  | Framework React Fullstack (App Router) |
| **React**           | `19.2.0`  | Biblioteca de UI                       |
| **TypeScript**      | `5.9.2`   | Linguagem / Tipagem Estática           |
| **TailwindCSS**     | `4.1.18`  | Framework de Estilização Utility-First |
| **React Hook Form** | `7.71.1`  | Gerenciamento de Formulários           |
| **Zod**             | `4.3.6`   | Validação de Schemas                   |
| **Sonner**          | `2.0.7`   | Notificações (Toasts)                  |
| **Lucide React**    | `0.563.0` | Ícones                                 |

### Backend (`apps/api`)

| Tecnologia          | Versão   | Função                                       |
| :------------------ | :------- | :------------------------------------------- |
| **NestJS**          | `11.0.1` | Framework Node.js progressivo                |
| **Drizzle ORM**     | `0.45.1` | Mapeamento Object-Relational e Query Builder |
| **PostgreSQL**      | `8.18.0` | Driver de Banco de Dados (`pg`)              |
| **Class Validator** | `0.14.3` | Validação de DTOs baseada em decoradores     |
| **Swagger**         | `11.2.6` | Documentação de API (`@nestjs/swagger`)      |
| **Multer**          | `2.0.2`  | Middleware para upload de arquivos           |

### Infraestrutura e Ferramentas

| Ferramenta    | Versão   | Função                              |
| :------------ | :------- | :---------------------------------- |
| **Turborepo** | `2.8.6`  | Sistema de build para monorepo      |
| **pnpm**      | `9.0.0`  | Gerenciador de pacotes e workspaces |
| **Docker**    | N/A      | Containerização da aplicação        |
| **Husky**     | `9.1.7`  | Git hooks (pre-commit, pre-push)    |
| **ESLint**    | `9.39.1` | Linter de código                    |
| **Prettier**  | `3.7.4`  | Formatador de código                |

---

## 4. Guia de Instalação e Execução

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (v18 ou superior)
- **Docker** (para banco de dados e execução via container)
- **pnpm**, **npm** ou **yarn** (pnpm é o recomendado para este monorepo)

---

### Configuração de Variáveis de Ambiente

O projeto utiliza um arquivo `.env` na raiz para configurar o ambiente de desenvolvimento e Docker.

1.  **Copie o exemplo:**

    ```bash
    cp .env.example .env
    ```

2.  **Ajuste os valores (se necessário):**
    Por padrão, o `.env.example` já vem configurado para rodar localmente com o Docker Compose fornecido.

    ```env
    # Database
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_USER=postgres
    DATABASE_PASSWORD=postgres
    DATABASE_NAME=fit-challenge

    # API
    PORT=3001
    API_URL=http://localhost:3001
    NEXT_PUBLIC_API_URL=http://localhost:3001

    # Uploads
    UPLOAD_DIR=./uploads
    ```

---

### Opção 1: Execução Manual (Desenvolvimento Local)

Ideal para desenvolver e ter hot-reload tanto no frontend quanto no backend.

1.  **Suba o Banco de Dados (Docker):**

    ```bash
    docker compose up -d postgres
    ```

2.  **Instale as dependências:**

    ```bash
    pnpm install
    # ou
    npm install
    # ou
    yarn install
    ```

3.  **Rode as migrações (Banco de Dados):**

    ```bash
    pnpm db:migrate
    # ou
    npm run db:migrate
    ```

4.  **Inicie as aplicações (Web + API):**
    Este comando inicia ambos os apps em paralelo usando Turborepo.

    ```bash
    pnpm dev
    # ou
    npm run dev
    ```

    - **Frontend:** http://localhost:3000
    - **API:** http://localhost:3001
    - **Swagger Docs:** http://localhost:3001/api/docs

---

### Opção 2: Execução Full Docker (Produção/Teste)

Ideal para simular o ambiente de produção ou rodar tudo com um único comando, sem instalar Node.js localmente.

1.  **Build e Start:**

    ```bash
    docker compose up --build
    ```

    Isso irá:
    - Criar os containers da API e do Web.
    - Subir o banco Postgres.
    - Rodar as migrações automaticamente na inicialização da API.
    - Disponibilizar os serviços nas mesmas portas (3000 e 3001).

2.  **Parar a execução:**
    ```bash
    docker compose down
    ```

---

## 5. Arquitetura

### 5.1 Arquitetura do Frontend (`apps/web`)

O frontend segue uma adaptação do **Feature-Sliced Design (FSD)** e **Modular Architecture**, focado na organização por domínios de negócio.

- **Padrão:** Feature-based / Domain-driven.
- **Renderização:** Server-Side Rendering (SSR) e Server Components (RSC) como padrão (Next.js App Router).
- **Roteamento:** File-system based routing (App Router).
- **Gerenciamento de Estado:**
  - **Server State:** Gerenciado via Server Actions e cache do Next.js (revalidatePath/revalidateTag).
  - **Client State:** `React Hooks` locais (`useState`, `useTransition`) e `react-hook-form` para formulários. URL Search Params para filtros.
- **Comunicação com API:**
  - **Server-Side:** `fetch` direto nos Server Actions.
  - **Client-Side:** Invocação de Server Actions (`actions.ts`) que atuam como proxy para o backend.

**Estrutura de Diretórios (`src/`):**

- `app/`: Camada de Roteamento (Thin Layer). Apenas define rotas e layouts.
- `features/`: Camada de Domínio. Contém toda a lógica de negócio fatiada por contexto (ex: `books/`).
  - `components/`: UI específica da feature.
  - `hooks/`: Lógica de estado da feature.
  - `actions.ts`: Server Actions para comunicação de dados.
  - `schemas.ts`: Schemas de validação Zod.
- `components/`: Componentes visuais genéricos (UI Kit) compartilhados.
- `lib/`: Configurações de infraestrutura (utils, env vars).

### 5.2 Arquitetura do Backend (`apps/api`)

O backend adota **Clean Architecture** (ou Arquitetura Hexagonal), isolando o domínio de detalhes de infraestrutura.

- **Padrão:** Clean Architecture + Modular Monolith.
- **Injeção de Dependência:** Nativa do NestJS.
- **Tratamento de Erros:** Global Exception Filter (`BookExceptionFilter`) mapeando erros de domínio para HTTP Status.

**Camadas do Módulo (ex: `books/`):**

1.  **Domain (`domain/`)**:
    - **Entities:** Classes de domínio (ex: `Book`).
    - **Repositories (Interfaces):** Contratos de acesso a dados (ex: `BookRepository`).
    - **Errors:** Erros de negócio específicos (ex: `BookAlreadyExistsError`).
2.  **Application (`application/`)**:
    - **Use Cases:** Regras de negócio puras (ex: `CreateBookUseCase`). Orquestram o fluxo de dados.
    - **DTOs:** Objetos de transferência de dados validados.
3.  **Infrastructure (`infrastructure/`)**:
    - **Web:** Controllers (`BooksController`), DTOs de API.
    - **Persistence:** Implementação dos repositórios com Drizzle ORM (`DrizzleBookRepository`), Schemas do banco.

---

## 6. Principais Features do Sistema

### Módulo de Livros (`books`)

- **Listagem de Livros:** Visualização em grid com paginação infinita (implementada via "load more" ou scroll).
- **Busca de Livros:** Filtragem por título ou autor via query params.
- **Cadastro de Livros:** Criação de novos registros com validação de duplicidade (Título + Autor).
- **Edição de Livros:** Atualização de dados cadastrais.
- **Exclusão de Livros:** Remoção segura de registros.
- **Validação de Capa:** Upload obrigatório de imagem para a capa do livro.

### Módulo de Upload (`upload`)

- **Upload de Arquivos:** Processamento multipart/form-data.
- **Armazenamento:**
  - **Local:** Armazenamento em disco (volume persistente) configurável via `UPLOAD_DIR`.
  - **Serviço Estático:** Servir arquivos via `ServeStaticModule`.

---

## 7. Fluxos Principais do Sistema

### 7.1 Fluxo de Cadastro de Livro

1.  **Usuário:** Preenche formulário no modal (Web).
2.  **Web (Client):** `BookModal` valida dados com `Zod`.
3.  **Web (Action):** `createBook` é chamado. Envia POST multipart com imagem para API.
4.  **API (Controller):** `BooksController` recebe requisição, valida DTO com `class-validator` e upload com `Multer`.
5.  **API (UseCase):** `CreateBookUseCase` verifica duplicidade no repositório.
6.  **API (Repository):** `DrizzleBookRepository` persiste no PostgreSQL.
7.  **Retorno:** API retorna 201 Created -> Web revalida cache (`revalidatePath`) -> UI atualiza lista.

---

## 8. Configurações Importantes

### Variáveis de Ambiente (`.env`)

- **Globais:** `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_NAME`.
- **API:** `PORT` (padrão 3001), `UPLOAD_DIR` (para volumes persistentes).
- **Web:** `API_URL` (comunicação server-server), `NEXT_PUBLIC_API_URL` (uso client-side se necessário).

### Build e Deploy

- **Docker:** Build multi-stage para otimização de imagem.
- **Turborepo:** Cache de build para acelerar CI/CD.
- **Railway/Vercel:** Scripts de start personalizados para migrações automáticas (`npm run db:migrate`).

---

## 9. Segurança

- **Validação de Dados:**
  - Frontend: `Zod` impede envio de dados inválidos na UI.
  - Backend: `ValidationPipe` (whitelist, forbidNonWhitelisted) e `class-validator` garantem integridade na API.
- **CORS:** Habilitado globalmente na API via `app.enableCors()`.
- **Tratamento de Exceções:** Filtro global captura erros não tratados e evita vazamento de stack traces em produção.
- **Sanitização:** `ValidationPipe` do NestJS sanitiza inputs removendo propriedades não permitidas (whitelist).

---

## 10. Performance

- **Frontend:**
  - **Server Components:** Reduz JavaScript enviado ao cliente.
  - **Otimização de Imagens:** Componente `<Image>` do Next.js (embora atualmente usando `img` padrão por URLs externas, recomendado migrar).
  - **Prefetching:** Componente `<Link>` realiza prefetch de rotas visíveis no viewport.
- **Backend:**
  - **Fastify (Potencial):** NestJS roda sobre Express por padrão, mas pode migrar para Fastify para maior throughput.
  - **Drizzle ORM:** Query builder leve e performático, sem o overhead de ORMs tradicionais como TypeORM.

---

## 11. Padrões e Boas Práticas Identificadas

- **Feature-Sliced Design (Frontend):** Ótima organização para escalabilidade, mantendo componentes, hooks e lógica próximos da feature.
- **Clean Architecture (Backend):** Separação clara de responsabilidades, facilitando testes e manutenção.
- **Repository Pattern:** Abstração do acesso a dados, permitindo troca de ORM ou banco com menor impacto.
- **DTOs e Validação:** Uso consistente de DTOs para entrada de dados, garantindo tipagem e validação.
- **Server Actions:** Uso moderno do Next.js para simplificar a camada de API do frontend.

---
