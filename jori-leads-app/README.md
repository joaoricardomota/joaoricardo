# 🚀 Jori Papel - Sistema de Gestão de Leads

Sistema moderno de gestão de leads para a Jori Papel, desenvolvido com tecnologias de última geração.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)

## ✨ Recursos

### 📊 Dashboard Completo
- Estatísticas em tempo real
- Funil de vendas visual
- Métricas de conversão

### 📋 Visualizações
- **Tabela** - Com virtualização para 30.000+ leads
- **Kanban** - Drag & drop entre etapas

### 🔍 Busca e Filtros
- Busca por empresa, contato, email, telefone, CNPJ
- Filtros por etapa, vendedor, segmento
- Ordenação por qualquer coluna

### 📤 Importação/Exportação
- Importa planilhas Excel (.xlsx, .xls, .csv)
- Exporta dados filtrados para Excel
- Compatível com a planilha atual da Jori Papel

### ⚡ Performance
- Virtualização de tabela (TanStack Virtual)
- Estado global otimizado (Zustand)
- Persistência local automática
- Carregamento instantâneo

## 🛠️ Deploy na Vercel

### Opção 1: Deploy Direto (mais fácil)

1. Faça upload deste projeto no GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "New Project"
4. Importe o repositório
5. Clique em "Deploy"

Pronto! A Vercel detecta Next.js automaticamente.

### Opção 2: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Na pasta do projeto
vercel

# Seguir as instruções
```

## 💻 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build de produção
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css      # Estilos globais
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Página inicial
├── components/
│   ├── Header.tsx       # Header com busca e filtros
│   ├── StatsCards.tsx   # Cards de estatísticas
│   ├── LeadsTable.tsx   # Tabela virtualizada
│   ├── KanbanBoard.tsx  # Visualização Kanban
│   ├── LeadModal.tsx    # Modal de edição
│   └── Loading.tsx      # Estados de loading
└── lib/
    ├── types.ts         # Tipos TypeScript
    ├── store.ts         # Estado global (Zustand)
    └── utils.ts         # Utilitários
```

## 🔧 Tecnologias

| Tecnologia | Uso |
|------------|-----|
| **Next.js 14** | Framework React com App Router |
| **TypeScript** | Tipagem estática |
| **Tailwind CSS** | Estilização utility-first |
| **Zustand** | Gerenciamento de estado |
| **TanStack Virtual** | Virtualização de lista |
| **SheetJS (xlsx)** | Importação/exportação Excel |
| **Lucide React** | Ícones |
| **Framer Motion** | Animações (opcional) |

## 📱 Responsivo

O sistema é totalmente responsivo e funciona em:
- 🖥️ Desktop
- 💻 Laptop  
- 📱 Tablet
- 📱 Mobile

## 🔒 Dados

Os dados são armazenados localmente no navegador (localStorage).
Para persistência em servidor, configure um banco de dados (Supabase recomendado).

## 📞 Suporte

Desenvolvido para Jori Papel - Distribuidor Oficial Santher

---

**Versão:** 1.0.0
