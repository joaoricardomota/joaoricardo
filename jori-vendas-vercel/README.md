# Jori Papel - Sistema de Gestão de Vendas

Sistema completo de gestão de vendas para distribuidora de produtos de higiene e limpeza.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8)

## ✨ Funcionalidades

- **📥 Importação Inteligente**: Aceita Excel, PDF e Word - extrai automaticamente nome, telefone, email
- **📊 Dashboard**: Métricas e visão geral do funil
- **👥 Gestão de Contatos**: Busca, filtros, seleção em lote
- **🎯 Funil de Vendas**: Kanban com 8 etapas customizáveis
- **📅 Agenda**: Agendar visitas, ligações, reuniões
- **✉️ Email Marketing**: Templates prontos, envio em lote

## 🚀 Deploy na Vercel

### Opção 1: Deploy via GitHub (recomendado)

1. Faça upload do projeto para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "New Project"
4. Importe o repositório do GitHub
5. Clique em "Deploy"

### Opção 2: Deploy via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Na pasta do projeto
vercel
```

## 💻 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Abrir http://localhost:3000
```

## 📁 Estrutura do Projeto

```
jori-vendas/
├── app/
│   ├── globals.css      # Estilos globais
│   ├── layout.tsx       # Layout principal
│   └── page.tsx         # Página principal
├── components/
│   ├── Header.tsx       # Navegação
│   ├── Dashboard.tsx    # Métricas
│   ├── Importar.tsx     # Upload de arquivos
│   ├── Contatos.tsx     # Lista de contatos
│   ├── Funil.tsx        # Kanban
│   ├── Agenda.tsx       # Atividades
│   ├── EmailSender.tsx  # Disparador de email
│   └── ContatoModal.tsx # Detalhes do contato
├── lib/
│   ├── store.ts         # Estado global (Zustand)
│   ├── constants.ts     # Configurações
│   └── file-processors.ts # Processamento de arquivos
└── package.json
```

## 🔧 Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Zustand** - Gerenciamento de estado
- **XLSX** - Processamento de Excel
- **PDF.js** - Processamento de PDF
- **Mammoth** - Processamento de Word
- **Lucide React** - Ícones

## 📝 Vendedores Configurados

- Débora, Rackel, Marcelo, Susy, Joyce, Felipe, Mariana, Ludyane, Maryele, Luciana, Guilherme

## 🏷️ Tags/Segmentos

- Clínica, Hotel, Restaurante, Condomínio, Escritório, Indústria, Comércio, Outros

## 📊 Etapas do Funil

1. ✨ Novo Lead
2. 📞 Primeiro Contato
3. ✅ Qualificado
4. 📄 Proposta Enviada
5. 🤝 Negociação
6. 📍 Visita Agendada
7. 🏆 Fechado Ganho
8. ❌ Fechado Perdido

## 🔐 Armazenamento

Os dados são salvos no localStorage do navegador. Para persistência em servidor, integre com:
- Supabase
- Firebase
- PostgreSQL

## 📧 Envio de Email

Para envio real de emails, integre com:
- Resend
- SendGrid
- Amazon SES

---

Desenvolvido para **Jori Papel** - Distribuidora Autorizada Santher
