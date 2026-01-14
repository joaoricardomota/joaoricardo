# 🧻 Jori Papel IA - Assistente Virtual

Assistente de vendas inteligente para a Jori Papel - Distribuidor Oficial Santher no Rio de Janeiro.

## 🚀 Deploy na Vercel

### Opção 1: Deploy Direto (Mais Fácil)

1. Acesse [vercel.com/new](https://vercel.com/new)
2. Clique em **"Upload"** ou arraste a pasta do projeto
3. Aguarde o deploy automático
4. Pronto! Seu site estará online

### Opção 2: Via GitHub

1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Na Vercel, importe o repositório
4. Deploy automático a cada commit

## 📁 Estrutura do Projeto

```
jori-papel-ia-app/
├── app/
│   ├── globals.css      # Estilos globais
│   ├── layout.js        # Layout e SEO
│   └── page.js          # Página principal (chatbot)
├── package.json         # Dependências
├── next.config.js       # Config Next.js
├── tailwind.config.js   # Config Tailwind
├── postcss.config.js    # Config PostCSS
└── README.md           # Este arquivo
```

## ⚙️ Configurações

### WhatsApp para Leads
O número de WhatsApp está configurado em `app/page.js`:
```javascript
whatsappVendas: "5521999815566"
```

### Preços dos Produtos
Os preços estão no objeto `fichasTecnicas` em `app/page.js`.

## 🎨 Cores da Marca

- Azul Principal: `#1e3a5f`
- Azul Claro: `#2d5a87`
- Cinza: `#9ca3af`
- Amarelo: `#fbbf24`

## 📱 Funcionalidades

- ✅ Chat interativo com botões
- ✅ Tabela de preços 2026
- ✅ Fichas técnicas completas
- ✅ Explicação do comodato
- ✅ Agendamento via WhatsApp
- ✅ Design responsivo (mobile/desktop)
- ✅ Cores oficiais Jori Papel

## 🔧 Desenvolvimento Local

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

---

**Jori Papel** - 40 Anos de Excelência em Higiene Profissional
📞 (21) 3393-5566 | 📱 (21) 99981-5566
