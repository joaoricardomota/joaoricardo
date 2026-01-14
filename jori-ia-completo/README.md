# 🚀 JORI PAPEL PRO - Sistema Completo

## 🎯 O Que É?

Sistema profissional 2-em-1 para o Grupo Jori Papel:

1. **🤖 Assistente IA Inteligente** - Claude Sonnet 4 responde qualquer dúvida
2. **📄 Gerador de Propostas PDF** - Cria propostas comerciais modernas automaticamente

## ✨ Funcionalidades

### Aba 1: Assistente IA

- ✅ Agente IA real (não chatbot com respostas prontas)
- ✅ Responde qualquer pergunta sobre produtos, preços, comodato
- ✅ Dá argumentos de vendas e responde objeções
- ✅ Recomenda produtos por segmento
- ✅ Mantém contexto da conversa
- ✅ Disponível 24/7

### Aba 2: Gerador de Propostas

- ✅ Interface intuitiva para dados do cliente
- ✅ Seleção de produtos do catálogo (11 produtos)
- ✅ Adição múltipla de itens
- ✅ Cálculo automático de totais
- ✅ Geração de PDF profissional e moderno
- ✅ Download instantâneo

## 📋 Características do PDF

### Design Profissional

- 🎨 **Cabeçalho estilizado** com logo/branding Jori Papel
- 📊 **Tabela moderna** de produtos com zebra striping
- 💰 **Total destacado** em verde
- 📝 **Box especial** para informações do comodato
- 📄 **Rodapé completo** em todas as páginas

### Conteúdo Completo

1. **Dados do Cliente**
   - Razão Social, CNPJ, Endereço completo
   - Contato, Telefone, Email
   
2. **Produtos e Serviços**
   - Tabela detalhada: Código | Produto | Qtd | Valor Unit. | Subtotal
   - Descrição completa de cada produto
   - Total geral destacado

3. **Condições Comerciais**
   - Prazo de pagamento: **28 dias**
   - Prazo de entrega: 48h no Grande Rio
   - Validade da proposta: 15 dias
   
4. **Sistema de Comodato** (Box Destacado)
   - Lista completa do que está incluso GRÁTIS
   - Economia comprovada (30-40%)
   - Dispensers, instalação, manutenção, consultoria
   
5. **Observações Importantes**
   - Produtos originais Santher
   - Certificações (FSC, 100% celulose virgem)
   - Garantias e suporte
   
6. **Rodapé Profissional**
   - Dados completos da empresa
   - CNPJ, endereço, contatos
   - Numeração de páginas

## 🛠️ Instalação e Uso

### Pré-requisitos

- Node.js 18+ 
- Python 3.8+
- npm ou yarn

### Instalação

```bash
# 1. Descompacte o projeto
cd jori-ia-completo

# 2. Instale dependências Node.js
npm install

# 3. Instale dependências Python
pip install -r requirements.txt

# 4. Execute em desenvolvimento
npm run dev

# 5. Acesse
http://localhost:3000
```

### Deploy na Vercel

```bash
# Instale CLI da Vercel
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel --prod
```

Ou faça upload direto em [vercel.com](https://vercel.com)

## 📦 Estrutura do Projeto

```
jori-ia-completo/
├── app/
│   ├── api/
│   │   └── gerar-proposta/
│   │       └── route.js          # API para gerar PDF
│   ├── page.js                   # Aplicação principal (Chat IA + Propostas)
│   ├── layout.js                 # Layout
│   └── globals.css               # Estilos globais
├── python/
│   └── gerar_proposta.py         # Script Python para gerar PDF
├── package.json                  # Dependências Node.js
├── requirements.txt              # Dependências Python
├── next.config.js                # Config Next.js
├── tailwind.config.js            # Config Tailwind
├── postcss.config.js             # Config PostCSS
└── vercel.json                   # Config Vercel
```

## 🎨 Como Usar o Gerador de Propostas

### Passo 1: Preencher Dados do Cliente

![Dados do Cliente](https://via.placeholder.com/800x300?text=Dados+do+Cliente)

- Razão Social (obrigatório)
- CNPJ, Endereço, Cidade/UF, CEP
- Contato, Telefone, Email

### Passo 2: Adicionar Produtos

![Adicionar Produtos](https://via.placeholder.com/800x200?text=Adicionar+Produtos)

1. Selecione um produto do dropdown (11 opções)
2. Informe a quantidade
3. Clique em "Adicionar"
4. Repita para adicionar mais produtos

### Passo 3: Revisar Lista

![Lista de Produtos](https://via.placeholder.com/800x300?text=Lista+de+Produtos)

- Veja todos os produtos adicionados
- Verifique quantidades e valores
- Remova itens se necessário
- Confira o total

### Passo 4: Gerar PDF

![Gerar PDF](https://via.placeholder.com/800x100?text=Gerar+PDF)

- Clique em "Gerar Proposta em PDF"
- Aguarde alguns segundos
- Download automático do PDF
- Nome: `Proposta_NomeEmpresa_timestamp.pdf`

## 📄 Produtos Disponíveis

### Papel Higiênico (3 opções)

1. **PHI12** - Personal Professional Interfolhado FD - R$ 169,90
2. **PHR25** - Personal Professional Rolão FD 250m - R$ 101,90
3. **EHR50** - Santher Eco Rolão FS 500m - R$ 125,50

### Papel Toalha (6 opções)

4. **ETI00** - Eco Interfolhado 3 Dobras - R$ 86,50
5. **ITI01** - Inovatta Interfolhado FS - R$ 108,90
6. **ITI02** - Inovatta Interfolhado FD ⭐ MAIS VENDIDO - R$ 132,50
7. **ITI03** - Inovatta Interfolhado FT - R$ 154,50
8. **ETB20** - Eco Bobina 250m - R$ 92,50
9. **PTB30** - Personal Professional Bobina 300m - R$ 134,90

### Higiene das Mãos (2 opções)

10. **SLE05** - Sabonete Líquido Erva Doce 5L - R$ 42,90
11. **AGE05** - Álcool Gel 70% 5L - R$ 54,90

## 💡 Exemplos de Uso

### Exemplo 1: Proposta para Clínica

**Cliente:**
- Clínica Médica Saúde Total
- 3 consultórios

**Produtos:**
- 5x PHI12 (Papel Higiênico Premium)
- 5x ITI02 (Papel Toalha Mais Vendido)
- 2x AGE05 (Álcool Gel)

**Total:** R$ 1.619,30

**Resultado:** PDF profissional com destaque para comodato grátis

### Exemplo 2: Proposta para Escritório

**Cliente:**
- Tech Solutions LTDA
- Escritório 100 funcionários

**Produtos:**
- 10x EHR50 (Rolão Eco 500m - alto rendimento)
- 10x ITI01 (Toalha Standard)
- 3x SLE05 (Sabonete Líquido)

**Total:** R$ 2.472,70

**Resultado:** PDF com ênfase em economia e praticidade

### Exemplo 3: Proposta para Hotel

**Cliente:**
- Hotel Beira Mar
- 50 quartos

**Produtos:**
- 15x PHR25 (Rolão Premium 250m)
- 15x ITI03 (Toalha Folha Tripla - luxury)
- 20x PTB30 (Bobina Premium para cozinha)

**Total:** R$ 5.545,50

**Resultado:** PDF destacando qualidade premium

## 🔧 Personalização

### Adicionar Novos Produtos

Edite `app/page.js`, no array `PRODUTOS`:

```javascript
const PRODUTOS = [
  {
    codigo: "NOVO01",
    nome: "Nome do Produto Novo",
    marca: "Marca",
    tipo: "Tipo",
    embalagem: "Descrição da embalagem",
    preco: 99.90,
    unidade: "fardo"
  },
  // ... produtos existentes
];
```

### Customizar Design do PDF

Edite `python/gerar_proposta.py`:

```python
# Cores
colors.HexColor('#1e40af')  # Azul primário
colors.HexColor('#059669')  # Verde destaque

# Fontes
'Helvetica-Bold'

# Tamanhos
fontSize=12
```

### Alterar Prazo de Pagamento

No arquivo `python/gerar_proposta.py`, localize:

```python
<b>Prazo de Pagamento:</b> 28 dias<br/>
```

E altere para o prazo desejado.

### Modificar Informações do Comodato

Edite a seção `comodato_texto` em `python/gerar_proposta.py`

## ⚙️ Tecnologias Utilizadas

### Frontend

- **Next.js 14** - Framework React
- **React 18** - UI Library
- **Tailwind CSS** - Styling
- **Claude API** - IA conversacional

### Backend

- **Next.js API Routes** - Endpoints
- **Python 3** - Processamento
- **ReportLab** - Geração de PDF

### Design

- **Inter Font** - Tipografia moderna
- **Gradient Backgrounds** - Visual premium
- **Responsive Design** - Mobile-first

## 📊 Fluxo de Geração do PDF

```
1. Usuário preenche formulário
   ↓
2. JavaScript valida dados
   ↓
3. POST para /api/gerar-proposta
   ↓
4. API recebe JSON
   ↓
5. Chama script Python
   ↓
6. Python gera PDF com ReportLab
   ↓
7. PDF salvo em /tmp
   ↓
8. API lê arquivo
   ↓
9. Retorna PDF como blob
   ↓
10. Download automático no browser
```

## 🐛 Troubleshooting

### Erro: "PDF não foi gerado"

**Solução:**
```bash
# Verifique se Python está instalado
python3 --version

# Verifique se reportlab está instalado
pip list | grep reportlab

# Reinstale se necessário
pip install --upgrade reportlab
```

### Erro: "Cannot find module"

**Solução:**
```bash
# Reinstale dependências Node
rm -rf node_modules package-lock.json
npm install
```

### PDF gerado mas download falha

**Solução:**
- Verifique permissões da pasta `/tmp`
- Verifique console do navegador
- Teste com navegador diferente

### Caracteres especiais não aparecem

**Solução:**
- ReportLab tem suporte limitado a UTF-8
- Use fontes que suportem acentos
- Alternativa: converta para ASCII quando possível

## 📈 Melhorias Futuras

### Fase 1 (Curto Prazo)

- [ ] Upload de logo personalizado
- [ ] Múltiplos templates de proposta
- [ ] Edição de textos do PDF
- [ ] Preview antes de gerar
- [ ] Salvar rascunhos

### Fase 2 (Médio Prazo)

- [ ] Histórico de propostas geradas
- [ ] Envio automático por email
- [ ] Assinatura digital
- [ ] Versionamento de propostas
- [ ] Integração com CRM

### Fase 3 (Longo Prazo)

- [ ] Dashboard de analytics
- [ ] Propostas em inglês/espanhol
- [ ] Geração de contratos
- [ ] Sistema de aprovação
- [ ] Mobile app dedicado

## 💰 Custos

### Desenvolvimento

- ✅ **Código:** Incluído
- ✅ **Documentação:** Incluída
- ✅ **Suporte:** Incluído

### Operação

**Claude API (IA):**
- ~R$ 0,18 por conversa
- 1.000 conversas/mês = ~R$ 180/mês

**Vercel Hosting (Recomendado):**
- Free tier: 100GB transferência/mês
- Pro: $20/mês (ilimitado)

**Alternativas de Hosting:**
- AWS EC2: ~$10-50/mês
- DigitalOcean: ~$6-20/mês
- Próprio servidor: Custo único

## 🔒 Segurança

- ✅ Validação de dados no frontend e backend
- ✅ Sanitização de inputs
- ✅ Arquivos temporários deletados após uso
- ✅ Sem armazenamento de dados sensíveis
- ✅ HTTPS obrigatório em produção
- ✅ Rate limiting configurável

## 📞 Suporte

**Grupo Jori Papel**
- 📞 (21) 3393-5566
- 📱 WhatsApp: (21) 3393-5566
- 📧 contato@joripapel.com.br
- 🌐 joripapel.com.br

**Suporte Técnico:**
- Documentação completa incluída
- Código comentado
- README detalhado
- Exemplos práticos

## 🎉 Conclusão

Este é um **sistema profissional completo** que combina:

✅ **Inteligência Artificial** avançada (Claude Sonnet 4)
✅ **Automação** de propostas comerciais
✅ **Design moderno** e profissional
✅ **Fácil de usar** para equipe de vendas
✅ **Escalável** para crescimento
✅ **Documentado** completamente

**Diferencial competitivo:**
- Seu concorrente tem chatbot básico → Você tem IA real
- Concorrente faz proposta no Word → Você gera PDF em 5 segundos
- Concorrente demora horas → Você responde instantaneamente

---

## 🏆 Desenvolvido para o Grupo Jori Papel

**40 Anos de Excelência • Tecnologia de Ponta • Futuro da Distribuição**

**Powered by:**
- 🤖 Claude Sonnet 4 (Anthropic)
- ⚛️ Next.js 14
- 🐍 Python 3 + ReportLab
- 🎨 Tailwind CSS

---

**📝 Nota:** Este sistema foi desenvolvido com as melhores práticas de mercado, design moderno e tecnologias de ponta para proporcionar uma experiência premium tanto para o time de vendas quanto para os clientes finais.

**🚀 Pronto para revolucionar o atendimento e vendas do Grupo Jori Papel!**
