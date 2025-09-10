# Como Organizar o Projeto em Monorepo

## Passos para Entregar o Projeto

### 1. Preparar a Estrutura do Monorepo

```bash
# 1. Criar a pasta principal do projeto
mkdir url_encurtador
cd url_encurtador

# 2. Mover o código do frontend
# (Copie todo o conteúdo da pasta atual para url_encurtador/frontend/)
# Ou renomeie a pasta atual para 'frontend'

# 3. Adicionar o backend
# Clone ou copie o código do backend para url_encurtador/backend/
```

### 2. Estrutura Final

```
url_encurtador/
├── README.md              # Documentação principal (este arquivo)
├── frontend/              # Código React
│   ├── src/
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
├── backend/               # Código Node.js/Express
│   ├── src/
│   ├── package.json
│   ├── server.js
│   └── ...
└── docs/                  # Documentação adicional (opcional)
    ├── api.md
    └── deployment.md
```

### 3. Configurar o Git

```bash
# Na pasta raiz do monorepo
git init
git add .
git commit -m "Initial commit: Encurtador de URL - Frontend e Backend"
git remote add origin [URL_DO_REPOSITORIO_PRINCIPAL]
git push -u origin main
```

### 4. Atualizar o README Principal

O README principal deve:
- Explicar que é um projeto completo
- Mostrar a arquitetura frontend/backend
- Incluir instruções para executar ambas as partes
- Documentar todas as funcionalidades

### 5. Criar READMEs Específicos

- `frontend/README.md` - Documentação específica do frontend
- `backend/README.md` - Documentação específica do backend

## Vantagens desta Abordagem

✅ **Um único repositório** para entregar na faculdade
✅ **Separação clara** entre frontend e backend
✅ **Documentação centralizada** na raiz
✅ **Fácil de navegar** e entender a estrutura
✅ **Escalável** para futuras funcionalidades
✅ **Profissional** e bem organizado

## Alternativas

Se preferir manter repositórios separados:

1. **Usar o repositório do frontend** como principal
2. **Adicionar o backend como submódulo Git**
3. **Documentar claramente** no README que existem dois repositórios
4. **Incluir links** para ambos os repositórios
