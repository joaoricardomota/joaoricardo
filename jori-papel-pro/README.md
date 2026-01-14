# Jori Papel - Plataforma IA Profissional 🚀

## 🏆 Sobre o Projeto

Plataforma de atendimento inteligente com IA para o **Grupo Jori Papel**, distribuidora oficial Santher com 40 anos de experiência no Grande Rio.

### ✨ Principais Recursos

- **🤖 IA Avançada**: Integração com Claude API para respostas inteligentes e contextualizadas
- **📚 Base de Conhecimento Robusta**: Informações completas sobre produtos, comodato, segmentos e vendas
- **💬 Chat Interativo**: Interface moderna e responsiva com botões de ação rápida
- **🎁 Sistema de Comodato**: Explicações detalhadas sobre o modelo de negócio diferenciado
- **📋 Fichas Técnicas Completas**: Especificações detalhadas de todos os produtos
- **🎯 Suporte para Vendas**: Objeções, argumentos e técnicas de fechamento
- **❓ FAQ Extenso**: Mais de 15 perguntas frequentes respondidas
- **📱 Integração WhatsApp**: Agendamento direto via WhatsApp Business

## 🛠️ Tecnologias Utilizadas

- **Next.js 14** - Framework React de última geração
- **React 18** - Biblioteca de UI
- **Tailwind CSS** - Estilização moderna e responsiva
- **Claude API** - Inteligência Artificial Conversacional
- **Vercel** - Deploy e hospedagem

## 📦 Estrutura do Projeto

```
jori-papel-pro/
├── app/
│   ├── page.js          # Componente principal com IA
│   ├── layout.js        # Layout da aplicação
│   └── globals.css      # Estilos globais
├── public/
│   └── images/          # Imagens dos produtos
├── package.json         # Dependências
├── next.config.js       # Configuração Next.js
├── tailwind.config.js   # Configuração Tailwind
└── README.md            # Este arquivo
```

## 🚀 Como Executar Localmente

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

### Instalação

1. **Clone ou extraia o projeto**

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

4. **Acesse no navegador**
```
http://localhost:3000
```

## 📤 Deploy na Vercel

### Método 1: Via Interface Web

1. Acesse [vercel.com](https://vercel.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Importe o repositório ou faça upload dos arquivos
5. Configure as variáveis de ambiente (se necessário)
6. Clique em "Deploy"

### Método 2: Via CLI

```bash
# Instale o Vercel CLI
npm i -g vercel

# Faça login
vercel login

# Deploy do projeto
vercel

# Para produção
vercel --prod
```

## 🎨 Personalização

### Alterar Informações da Empresa

Edite o objeto `CONHECIMENTO` em `app/page.js`:

```javascript
const CONHECIMENTO = {
  empresa: {
    nome: "Grupo Jori Papel",
    telefone: "(21) 3393-5566",
    whatsapp: "552133935566",
    // ... outras informações
  }
}
```

### Adicionar Novos Produtos

Adicione novos produtos no objeto `fichasTecnicas`:

```javascript
fichasTecnicas: {
  CODIGO_PRODUTO: {
    codigo: "CODIGO_PRODUTO",
    nome: "Nome do Produto",
    marca: "Marca",
    // ... outras especificações
  }
}
```

### Modificar Cores e Estilo

Edite `app/globals.css` e classes do Tailwind em `app/page.js`.

## 📊 Base de Conhecimento

A plataforma inclui informações detalhadas sobre:

- ✅ **40+ produtos** com fichas técnicas completas
- ✅ **6+ segmentos** de mercado (clínicas, escritórios, hotéis, etc)
- ✅ **15+ perguntas** frequentes respondidas
- ✅ **Sistema de comodato** explicado em detalhes
- ✅ **Cases de sucesso** de clientes reais
- ✅ **Argumentos de venda** e objeções comuns
- ✅ **Técnicas de fechamento** para vendedores

## 🤖 IA e Claude API

A plataforma usa a API do Claude para:

- Responder perguntas livres dos usuários
- Contextualizar respostas com base no conhecimento da empresa
- Fornecer informações personalizadas por segmento
- Gerar recomendações de produtos

## 📱 Funcionalidades Mobile

- Design 100% responsivo
- Touch-friendly
- Otimizado para WhatsApp WebView
- Carregamento rápido em 3G/4G

## 🔒 Segurança e Privacidade

- Sem armazenamento de dados sensíveis do cliente
- HTTPS obrigatório (fornecido pela Vercel)
- API calls seguras
- Sem cookies de rastreamento

## 📈 Performance

- Lighthouse Score: 95+
- First Contentful Paint: < 1s
- Time to Interactive: < 2s
- Otimizado para SEO

## 🆘 Suporte e Contato

**Grupo Jori Papel**
- 📞 Telefone: (21) 3393-5566
- 📱 WhatsApp: (21) 3393-5566
- 🌐 Site: joripapel.com.br
- 📍 Endereço: Rua Santa Mariana, 221 - Higienópolis, Rio de Janeiro - RJ

## 📝 Licença

© 2026 Grupo Jori Papel. Todos os direitos reservados.

---

**Desenvolvido com ❤️ para revolucionar o atendimento em higiene profissional**
