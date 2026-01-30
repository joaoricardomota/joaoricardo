# 📅 Agenda de Visitas Técnicas - Jori Papel

## Deploy Rápido (5 minutos)

### Passo 1: Criar banco Upstash (GRATUITO)

1. Acesse **https://console.upstash.com**
2. Crie conta com Google/GitHub
3. Clique **Create Database**
4. Escolha **Regional** → **São Paulo (South America)**
5. Nome: `agenda-jori`
6. Clique **Create**
7. Na aba **REST API**, copie:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### Passo 2: Deploy no Vercel

1. Suba o código no GitHub:
```bash
git init
git add .
git commit -m "Agenda Jori Papel"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/agenda-jori.git
git push -u origin main
```

2. Acesse **https://vercel.com**
3. Clique **Add New → Project**
4. Importe o repositório do GitHub
5. **ANTES de clicar Deploy**, vá em **Environment Variables**
6. Adicione:
   - `UPSTASH_REDIS_REST_URL` = (cole a URL do Upstash)
   - `UPSTASH_REDIS_REST_TOKEN` = (cole o token do Upstash)
7. Clique **Deploy**

### Pronto! 🎉

Acesse a URL gerada pelo Vercel.

---

## Funcionalidades

- ✅ Calendário mês atual + próximo
- ✅ Agendar visitas (vendedor, técnico, data, horário 08h-16h, motivo)
- ✅ Lista de agendamentos por dia
- ✅ Gerenciar técnicos (Antônio já cadastrado)
- ✅ Dados compartilhados (todos veem os mesmos agendamentos)
- ✅ Visual tons nude/terrosos

## Free Tier Upstash

- 10.000 requests/dia
- 256MB armazenamento
- Suficiente para uso normal
