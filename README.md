# Encurtador de URL

Sistema completo de encurtamento de URLs desenvolvido com arquitetura separada entre frontend e backend.

## Arquitetura do Projeto

Este repositório contém o **frontend** da aplicação. O projeto está organizado da seguinte forma:

```
url_encurtador/
├── frontend/          # Aplicação React (este diretório)
│   ├── src/
│   ├── package.json
│   └── ...
└── backend/           # API Node.js/Express (repositório separado)
    ├── src/
    ├── package.json
    └── ...
```

### Frontend
Uma aplicação React para gerenciamento de URLs encurtadas, desenvolvida com TypeScript, Vite e TailwindCSS.

## Funcionalidades

- [x] Deve ser possível criar um link
  - [x] Não deve ser possível criar um link com encurtamento mal formatado
  - [x] Não deve ser possível criar um link com encurtamento já existente
- [x] Deve ser possível deletar um link
- [x] Deve ser possível obter a URL original por meio do encurtamento
- [x] Deve ser possível listar todas as URL's cadastradas
- [x] Deve ser possível incrementar a quantidade de acessos de um link
- [x] Deve ser possível baixar um CSV com o relatório dos links criados

## Tecnologias Utilizadas

- **React 18** - Biblioteca para interface de usuário
- **TypeScript** - Superset do JavaScript com tipagem estática
- **Vite** - Build tool e bundler
- **TailwindCSS** - Framework CSS utilitário
- **React Router** - Roteamento para SPA
- **React Query** - Gerenciamento de estado servidor
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **Lucide React** - Ícones

## Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── EmptyState.tsx
│   ├── Header.tsx
│   ├── Input.tsx
│   └── LoadingSpinner.tsx
├── hooks/              # Hooks personalizados
│   ├── useLinks.ts
│   └── useRedirect.ts
├── pages/              # Páginas da aplicação
│   ├── Home.tsx
│   ├── NotFound.tsx
│   └── Redirect.tsx
├── services/           # Serviços de API
│   └── api.ts
├── types/              # Definições de tipos TypeScript
│   └── index.ts
├── App.tsx             # Componente principal
└── main.tsx            # Ponto de entrada
```

## Páginas

1. **Página Principal (`/`)** - Formulário de cadastro e listagem dos links
2. **Página de Redirecionamento (`/:url-encurtada`)** - Redireciona para URL original
3. **Página 404** - Exibida para URLs não encontradas

## Como Executar o Projeto Completo

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn

### 1. Backend (API)
```bash
# Clone o repositório do backend
git clone https://github.com/Gusy66/url_encurtador backend

# Entre na pasta do backend
cd backend

# Instale as dependências
npm install

# Execute o servidor
npm run dev
# O backend estará rodando em http://localhost:3000
```

### 2. Frontend (Interface)
```bash
# Na pasta raiz do projeto (frontend)
# Instale as dependências
npm install

# Execute a aplicação
npm run dev
# O frontend estará rodando em http://localhost:5173
```

### Variáveis de Ambiente

Crie um arquivo `.env` baseado no `env.example`:

```bash
VITE_FRONTEND_URL=http://localhost:5173
VITE_BACKEND_URL=http://localhost:3000
```

### Scripts Disponíveis (Frontend)

```bash
# Instalar dependências
npm install

# Executar em modo de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## Funcionalidades Implementadas

### UX/UI
- ✅ Design responsivo (mobile-first)
- ✅ Estados de carregamento
- ✅ Estados vazios (empty states)
- ✅ Feedback visual para ações
- ✅ Validação de formulários
- ✅ Tratamento de erros

### Funcionalidades Core
- ✅ Criação de links encurtados
- ✅ Listagem de links
- ✅ Exclusão de links
- ✅ Redirecionamento automático
- ✅ Download de CSV
- ✅ Cópia de links para clipboard
- ✅ Contador de acessos

### Validações
- ✅ URL original deve ser válida
- ✅ Link encurtado deve seguir padrão (letras, números, hífens, underscores)
- ✅ Link encurtado não pode ser duplicado
- ✅ Tratamento de erros da API

## Design

O design segue fielmente o layout do Figma fornecido, incluindo:
- Paleta de cores (azul primário, cinzas)
- Tipografia (Inter)
- Componentes (cards, botões, inputs)
- Layout responsivo
- Estados visuais (loading, empty, error)

## Estrutura do Monorepo

Para entregar o projeto como um repositório único, organize da seguinte forma:

```
url_encurtador/
├── README.md              # Este arquivo (documentação principal)
├── frontend/              # Código do frontend (este diretório atual)
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
├── backend/               # Código do backend (adicionar aqui)
│   ├── src/
│   ├── package.json
│   ├── server.js
│   └── ...
└── docs/                  # Documentação adicional (opcional)
    ├── api.md
    └── deployment.md
```

### Como Organizar o Repositório

1. **Renomeie a pasta atual** de `url_encurtador_front` para `frontend`
2. **Adicione o backend** na pasta `backend/`
3. **Mantenha este README** na raiz do projeto
4. **Crie um README específico** para o backend em `backend/README.md`

## Desenvolvimento

### Scripts Disponíveis (Frontend)

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build
- `npm run lint` - Executa linter

### Padrões de Código

- TypeScript para tipagem
- Componentes funcionais com hooks
- React Query para cache e sincronização
- TailwindCSS para estilização
- Validação com Zod
- Formulários com React Hook Form

## Entrega do Projeto

*POR QUESTOES DE ESCALABILIDADE E ORGANIZAÇÃO, SEPAREI O BACK DO FRONT. O LINK PARA ACESSAR O BACKEND ESTÁ ABAIXO!*

Este repositório contém o projeto completo do encurtador de URLs, incluindo:

### Repositórios
- **Frontend**: [Este repositório](https://github.com/Gusy66/url_encurtador_front) - Interface React com TypeScript
- **Backend**: [Repositório da API](https://github.com/Gusy66/url_encurtador) - Servidor Node.js/Express

### Funcionalidades Completas
- ✅ Documentação completa
- ✅ Instruções de instalação e execução
- ✅ Arquitetura escalável e bem organizada
- ✅ Separação clara de responsabilidades
- ✅ Código limpo e bem documentado
