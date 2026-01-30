# 📅 Agenda de Visitas Técnicas - Jori Papel

Sistema de agendamento de visitas técnicas com banco de dados compartilhado via Vercel KV.

## Deploy no Vercel

### 1. Subir no GitHub
```bash
cd agenda-jori-vercel
git init
git add .
git commit -m "feat: agenda de visitas técnicas"
git remote add origin https://github.com/SEU_USUARIO/agenda-jori-vercel.git
git push -u origin main
```

### 2. Deploy no Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Importe o repositório do GitHub
4. Clique em "Deploy"

### 3. Configurar Vercel KV
1. No dashboard do projeto no Vercel, vá em **Storage**
2. Clique em **Create Database**
3. Selecione **KV**
4. Dê um nome (ex: `agenda-jori-kv`)
5. Clique em **Create & Continue**
6. O Vercel vai automaticamente adicionar as variáveis de ambiente

### 4. Redeploy
Após criar o KV, faça um redeploy para aplicar as variáveis:
1. Vá em **Deployments**
2. Clique nos 3 pontos do último deploy
3. Selecione **Redeploy**

## Funcionalidades

- ✅ Calendário com mês atual e próximo
- ✅ Agendamento de visitas com vendedor, técnico, data, horário e motivo
- ✅ Lista de agendamentos por dia
- ✅ Gerenciamento de técnicos (adicionar/remover)
- ✅ Dados persistentes e compartilhados via Vercel KV
- ✅ Visual em tons nude/terrosos

## Estrutura

```
agenda-jori-vercel/
├── package.json
├── .gitignore
├── README.md
└── app/
    ├── layout.js
    ├── page.js
    └── api/
        ├── agendamentos/route.js
        └── tecnicos/route.js
```
