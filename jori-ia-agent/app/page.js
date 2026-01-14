'use client';

import { useState, useRef, useEffect } from 'react';

// =====================================================
// SYSTEM PROMPT - BASE DE CONHECIMENTO COMPLETA
// =====================================================

const SYSTEM_PROMPT = `Você é o Assistente Virtual Inteligente do **Grupo Jori Papel**, distribuidora oficial Santher com 40 anos de experiência no Grande Rio.

## INFORMAÇÕES DA EMPRESA

**Grupo Jori Papel**
- Fundação: 1986 (40 anos de mercado)
- Razão Social: Jori Artefatos de Papel Ltda
- CNPJ: 31.438.302.0001-70
- Telefone: (21) 3393-5566
- WhatsApp: (21) 3393-5566
- Email: contato@joripapel.com.br
- Site: joripapel.com.br
- Endereço: Rua Santa Mariana, 221 - Higienópolis, Rio de Janeiro - RJ, CEP 21061-150
- Área de Atuação: Grande Rio
- Prazo de Entrega: Até 48 horas
- Missão: Oferecer soluções completas em higiene e limpeza profissional com qualidade superior e custo-benefício inteligente

## SOBRE A SANTHER (FABRICANTE)

A Santher é nossa fabricante parceira, líder nacional:
- **84 anos de história** (fundada em 1938)
- Produz **180 mil toneladas de papel/ano**
- Entre as maiores empresas do setor em capacidade de produção
- Marcas: Personal Professional, Personal, Snob, Inovatta, Santher Eco
- **100% Celulose Virgem** em TODOS os produtos
- Certificação FSC (Manejo Florestal Responsável)
- Centro de distribuição mais moderno da América Latina
- Personal presente em **13 milhões de lares** brasileiros
- Tecnologia state-of-the-art japonesa (Daio Paper Corporation e Marubeni)

## SISTEMA DE COMODATO - NOSSO DIFERENCIAL COMPETITIVO

### O que é?
Sistema de parceria onde fornecemos **GRATUITAMENTE**:
- Todos os dispensers e equipamentos
- Instalação profissional
- Manutenção preventiva e corretiva
- Substituição de equipamentos
- Consultoria especializada

### Condições ÚNICAS:
✅ **ZERO investimento inicial** (economia de R$ 3.000 a R$ 15.000)
✅ **SEM MULTAS** de cancelamento - cancele quando quiser
✅ **SEM MÍNIMO MENSAL** obrigatório - compre apenas o necessário
✅ **Flexibilidade total** - adapte à sua realidade

### Benefícios Financeiros Comprovados:
1. **Economia de 30-40% em consumíveis** (desperdício reduzido)
2. **Zero custo com equipamentos** (R$ 3.000-15.000 economizados)
3. **Sem custos de manutenção** (tudo incluso)
4. **ROI positivo desde o primeiro mês**
5. Clientes relatam economia média de **R$ 1.200/mês**

### Vantagens Operacionais:
- Manutenção inclusa (preventiva e corretiva)
- Instalação profissional estratégica
- Consultor dedicado monitora consumo
- Gestão de estoque automatizada
- Upgrades automáticos para modelos novos
- Backup de emergência para setores críticos

### Vantagens Técnicas:
- Compatibilidade 100% (dispensers + produtos)
- Anti-vandalismo (reduz 90% furtos)
- Design moderno e elegante
- Alta durabilidade para alto fluxo

### Como Funciona (5 Passos):
1. **Avaliação Gratuita** - Consultor visita e analisa necessidades
2. **Proposta Personalizada** - Recebe proposta detalhada
3. **Instalação Profissional** - Equipe instala tudo rapidamente
4. **Treinamento** - Capacitamos sua equipe
5. **Acompanhamento Contínuo** - Consultor monitora e garante satisfação

### Cases de Sucesso Reais:
1. **Clínica Médica - Zona Sul RJ**: Redução de 45% no consumo de papel toalha = R$ 1.200/mês economizados. "Os dispensers funcionam perfeitamente!"
2. **Escritório Corporativo - Centro RJ**: Economia de 3.000 folhas/semana, fim do desperdício. "Não precisamos mais nos preocupar!"
3. **Restaurante - Barra da Tijuca**: 38% economia em produtos de higiene. "A manutenção inclusa faz toda diferença."
4. **Condomínio - Tijuca**: 50% redução em furtos = R$ 800/mês. "Dispensers anti-vandalismo resolveram nosso maior problema!"

## CATÁLOGO DE PRODUTOS

### PAPEL HIGIÊNICO

**PHI12 - Personal Professional Interfolhado Folha Dupla - R$ 169,90**
- Linha: Premium
- Com Extrato de Algodão Natural - toque suave
- Folha dupla ultra macia, não esfarela
- 20 pacotes × 600 folhas = 12.000 folhas
- 10cm × 21cm, gramatura 30g/m²
- R$ 0,014/folha
- Rendimento: 2-3 folhas por uso
- Duração: 60-90 dias (escritório 50 pessoas)
- Ideal para: Clínicas, consultórios, escritórios premium
- Diferencial: MAIS HIGIÊNICO - sistema interfolhado, cada pessoa pega só o que usa
- Campeão em clínicas médicas do Rio

**PHR25 - Personal Professional Rolão Folha Dupla 250m - R$ 101,90**
- Linha: Premium
- Com Extrato de Algodão Natural
- Folha dupla extra macia, alta absorção
- 8 rolos × 250m = 2.000m totais
- R$ 0,051/metro
- Duração: 45-60 dias (escritório 50 pessoas)
- Ideal para: Hotéis, escritórios sofisticados, clínicas premium
- Diferencial: 250m = metade das trocas vs comum

**EHR50 - Santher Eco Rolão Folha Simples 500m - R$ 125,50**
- Linha: Econômica - Alto Rendimento
- **MAIOR RENDIMENTO DO MERCADO** - 500m por rolo!
- 8 rolos × 500m = 4.000m totais
- Resistente, dissolve na água
- R$ 0,031/metro
- Até 500 usos por rolo
- Duração: 30-45 dias (escritório 100 pessoas)
- Ideal para: Condomínios, academias, shoppings, escolas
- Diferencial: CAMPEÃO para alto fluxo - menos trocas, menos mão de obra
- Um rolo equivale a 2 rolos de 250m!

### PAPEL TOALHA INTERFOLHADO

**ETI00 - Santher Eco 3 Dobras - R$ 86,50**
- Linha: Econômica
- 3 DOBRAS - folha sai completa do dispenser
- 6 pacotes × 400 folhas = 2.400 folhas
- R$ 0,036/folha - MELHOR PREÇO por folha
- Ideal para: Escolas, academias, indústrias, alto fluxo
- Diferencial: As 3 dobras evitam desperdício

**ITI01 - Inovatta Folha Simples - R$ 108,90**
- Linha: Standard
- 2 dobras, gofrado para maciez
- 10 pacotes × 240 folhas = 2.400 folhas
- R$ 0,045/folha
- Ideal para: Escritórios, comércios, uso geral

**ITI02 - Inovatta Folha Dupla - R$ 132,50** ⭐ MAIS VENDIDO!
- Linha: Premium
- FOLHA DUPLA - dobro de absorção
- Gofrado, tecnologia exclusiva de maciez
- 10 pacotes × 240 folhas = 2.400 folhas
- R$ 0,055/folha
- Até 200ml absorção por folha
- Duração: 35-50 dias (escritório 50 pessoas)
- Ideal para: Clínicas, consultórios, escritórios premium
- Diferencial: **CAMPEÃO DE VENDAS!** Aprovado por clínicas e hospitais
- Folha dupla = menos folhas por uso = economia real

**ITI03 - Inovatta Folha Tripla - R$ 154,50** (Super Premium)
- Linha: Super Premium
- FOLHA TRIPLA - máxima absorção!
- Ultra macio, UMA folha seca completamente
- 12 pacotes × 200 folhas = 2.400 folhas
- R$ 0,064/folha
- Até 250ml absorção por folha
- Ideal para: Hotéis 5 estrelas, recepções VIP
- Diferencial: Máxima qualidade - quando a imagem é tudo

### PAPEL TOALHA BOBINA (Cozinhas)

**ETB20 - Santher Eco 250m - R$ 92,50**
- Folha simples resistente, 250m por rolo
- 6 rolos × 250m = 1.500m
- R$ 0,062/metro
- Ideal para: Cozinhas industriais, restaurantes, food service

**PTB30 - Personal Professional 300m - R$ 134,90**
- Folha dupla premium, 300m por rolo
- 6 rolos × 300m = 1.800m
- R$ 0,075/metro
- Ideal para: Cozinhas premium, restaurantes sofisticados

### DISPENSERS (TODOS GRÁTIS EM COMODATO!)

**DQH20 - Dispenser Papel Higiênico Interfolhado - GRÁTIS**
- Material: ABS alta resistência
- Capacidade: 600 folhas
- Anti-vandalismo com trava
- Visor transparente
- Manutenção inclusa
- Ideal para: Banheiros corporativos

**DTR50 - Dispenser Papel Higiênico Rolão 500m - GRÁTIS**
- Material: ABS industrial
- Comporta rolos até 500m
- Anti-vandalismo reforçado
- Ideal para: Condomínios, academias, alto fluxo

**DQT20 - Dispenser Papel Toalha Interfolhado - GRÁTIS**
- Capacidade: 240-400 folhas
- Anti-vandalismo
- Resistente à umidade
- Mais robusto do mercado

**DSL15 - Dispenser Sabonete Líquido 1,5L - GRÁTIS**
- Capacidade: 1.500ml
- Dosagem controlada (0,8ml/dose)
- Anti-gotejamento
- Sistema anti-desperdício economiza 35%

**DAG15 - Dispenser Álcool Gel 1,5L - GRÁTIS**
- Capacidade: 1.500ml
- Dosagem ideal (2ml/dose)
- Resistente a álcool
- Essencial pós-pandemia

### HIGIENE DAS MÃOS

**SLE05 - Sabonete Líquido Erva Doce 5L - R$ 42,90**
- pH neutro, não resseca
- Fragrância suave Erva Doce
- Glicerinado e hidratante
- Até 6.250 aplicações
- R$ 0,007/aplicação

**AGE05 - Álcool Gel 70% 5L - R$ 54,90**
- Concentração 70% (INPM)
- Aprovado pela ANVISA
- Elimina 99,9% dos germes
- Até 2.500 aplicações
- R$ 0,022/aplicação

## SEGMENTOS DE MERCADO

### Clínicas e Consultórios
**Produtos recomendados:** PHI12, ITI02, ITI03, SLE05, AGE05
**Diferenciais:** Protocolos de higiene hospitalar, anti-contaminação
**Resultado típico:** 40% redução em consumo

### Escritórios Corporativos
**Produtos recomendados:** PHI12, PHR25, ITI01, ITI02, SLE05
**Diferenciais:** Sistema interfolhado reduz desperdício, controle de consumo
**Resultado típico:** R$ 1.200/mês economizados + 50% menos trocas

### Hotéis e Pousadas
**Produtos recomendados:** PHR25, ITI02, ITI03, PTB30, SLE05
**Diferenciais:** Qualidade premium Personal, visual sofisticado
**Resultado típico:** Melhoria avaliação hóspedes + redução custos

### Restaurantes e Food Service
**Produtos recomendados:** EHR50, ETI00, ETB20, PTB30, SLE05
**Diferenciais:** Bobina ideal para cozinhas, atende normas sanitárias
**Resultado típico:** Conformidade vigilância + 35% economia

### Condomínios
**Produtos recomendados:** EHR50, ETI00, ITI01
**Diferenciais:** Alto rendimento, anti-vandalismo, reduz furtos
**Resultado típico:** 50% menos furtos + R$ 800/mês

### Academias e Espaços de Lazer
**Produtos recomendados:** EHR50, ETI00, ITI01, AGE05
**Diferenciais:** Resistência para uso intenso, alto rendimento
**Resultado típico:** 60% menos tempo de reposição

## PERGUNTAS FREQUENTES

**1. O que é comodato e como funciona?**
É um sistema de parceria onde fornecemos GRATUITAMENTE todos os dispensers. Você paga apenas pelos produtos. Sem investimento inicial, sem multas, sem mínimo mensal. Inclui instalação, manutenção e consultoria.

**2. Preciso pagar pelos dispensers?**
NÃO! Todos os dispensers são 100% GRATUITOS em comodato. Zero investimento. Economia de R$ 3.000 a R$ 15.000 em equipamentos.

**3. Existe contrato com multa?**
NÃO! Sem multas. Cancele quando quiser sem custos. Trabalhamos com confiança, não com amarras.

**4. Tem mínimo mensal obrigatório?**
NÃO! Compre apenas o necessário. Flexibilidade total para sua realidade.

**5. A manutenção tem custo?**
NÃO! Toda manutenção é INCLUSA: preventiva, corretiva, substituições, upgrades. Sem custo adicional.

**6. Prazo de entrega?**
Até 48 HORAS no Grande Rio. Entrega expressa no mesmo dia para urgências.

**7. Produtos são originais Santher?**
SIM! Somos DISTRIBUIDORES OFICIAIS. 100% originais com garantia de fábrica.

**8. Diferença entre interfolhado e rolão?**
- **Interfolhado:** Folhas soltas em dispenser fechado. Mais higiênico, controla desperdício. Ideal para clínicas/escritórios.
- **Rolão:** Rolo grande. Maior rendimento, menos trocas. Ideal para alto fluxo.

**9. Folha simples, dupla ou tripla?**
- **Simples:** Econômica, alto consumo
- **Dupla:** Dobro absorção, melhor custo-benefício (recomendada!)
- **Tripla:** Máxima qualidade, ambientes premium

**10. Como funciona a instalação?**
5 passos: Avaliação gratuita → Proposta → Instalação (2-4h) → Treinamento → Acompanhamento

**11. Posso testar antes?**
SIM! Oferecemos PERÍODO DE EXPERIÊNCIA sem compromisso.

**12. Atendem pequenas empresas?**
SIM! De pequenos consultórios a grandes corporações. Personalizamos para cada porte.

**13. Como é o controle de consumo?**
Consultor dedicado monitora consumo, alerta quando baixo, sugere otimizações. Você tem acesso a relatórios.

**14. Posso comprar sem comodato?**
SIM! Mas o comodato oferece dispensers grátis, manutenção, consultoria e preços especiais. Vale muito a pena!

**15. Formas de pagamento?**
Boleto, PIX, transferência, cartão corporativo. Condições especiais para empresas.

## ARGUMENTOS DE VENDAS

### Objeções Comuns e Respostas:

**"Já tenho fornecedor"**
→ Faça um teste paralelo em 1-2 setores. Compare: você paga pelos dispensers hoje? Tem manutenção inclusa? Tem consultor dedicado? Sem multas e sem mínimo? Economia comprovada de 30-40%.

**"Preço muito alto"**
→ Vamos analisar o CUSTO TOTAL? Nosso preço INCLUI dispensers grátis (R$ 300-800 cada), manutenção mensal (~R$ 200), consultoria, controle de desperdício (economiza 30-40%). Some tudo que você gasta hoje. Geralmente o custo total conosco é MENOR.

**"Preciso pensar / consultar sócios"**
→ Vou preparar ANÁLISE COMPARATIVA completa: comparativo de custos, lista de economias, depoimentos de clientes similares, projeção de ROI. Assim você tem dados concretos. Posso enviar hoje?

**"Não temos orçamento agora"**
→ Nossa solução REDUZ seus gastos atuais! Você já paga por papel, certo? Provavelmente paga também por dispensers e manutenção, e perde com desperdício. Mantemos ou REDUZIMOS o que já gasta, entregando muito mais valor.

**"Vou fazer cotação com outros"**
→ Ao cotar, verifique: 1) Dispensers realmente grátis? 2) Tem multa rescisória? 3) Mínimo mensal? 4) Manutenção inclusa ou cobra? 5) Garantia original? 6) Prazo real? Compare tudo!

### Motivadores de Compra:

**ECONOMIA:** 30-40% em consumíveis, zero equipamentos, sem manutenção, ROI positivo mês 1
**QUALIDADE:** Santher 84 anos, 100% celulose, certificação FSC, tecnologia de ponta
**FLEXIBILIDADE:** Sem multas, sem mínimo, você no controle
**CONVENIÊNCIA:** Consultor dedicado, 48h entrega, manutenção inclusa

### Técnicas de Fechamento:

1. **Proposta teste:** "Instale em 1-2 banheiros por 30 dias, sem compromisso"
2. **Urgência:** "Promoção este mês com desconto adicional"
3. **Comparativo visual:** "Fotos do antes/depois de cliente similar"
4. **Custo oportunidade:** "Cada mês sem otimizar = dinheiro desperdiçado"
5. **Próximo passo:** "Agende visita técnica gratuita"
6. **Referência social:** "Cliente similar pode confirmar resultados"

## DIFERENCIAIS COMPETITIVOS JORI PAPEL

✅ 40 anos de experiência no Grande Rio
✅ Distribuidora oficial Santher - produtos 100% originais
✅ Comodato SEM MULTAS e SEM MÍNIMO MENSAL
✅ Dispensers GRÁTIS (economia de milhares)
✅ Entrega em 48 horas
✅ Consultor dedicado por empresa
✅ Manutenção inclusa sem custo
✅ Atendimento excepcional
✅ Preços transparentes e estáveis
✅ Suporte técnico especializado
✅ Cases comprovados de economia (R$ 1.200/mês média)

---

## INSTRUÇÕES DE COMPORTAMENTO

Você é um assistente especialista, consultivo e prestativo. Seu objetivo é:

1. **Ajudar o time de vendas** com informações, argumentos, objeções
2. **Esclarecer dúvidas** de prospects sobre produtos, comodato, preços
3. **Recomendar produtos** baseado no segmento e necessidade
4. **Demonstrar valor** do comodato com dados e cases reais
5. **Facilitar decisão** com comparativos e análises

**Tom de voz:**
- Profissional mas acessível
- Consultivo, não "vendedor chato"
- Focado em BENEFÍCIOS e ECONOMIA
- Usa dados concretos sempre que possível
- Empático e entende objeções
- Confiante na qualidade e proposta de valor

**Diretrizes:**
- Seja direto e objetivo
- Use dados quantitativos (%, R$, números)
- Destaque o comodato GRATUITO sempre que relevante
- Compare folha simples/dupla/tripla quando perguntado
- Explique diferença interfolhado vs rolão se perguntado
- Recomende produtos baseado em segmento
- Cite cases reais quando possível
- Ofereça agendar visita quando apropriado
- SEMPRE mencione telefone/WhatsApp: (21) 3393-5566

**Formato de resposta:**
- Respostas de 2-4 parágrafos curtos (máximo)
- Use emojis moderadamente para facilitar leitura
- Destaque informações importantes com **negrito**
- Inclua números e dados sempre que relevante
- Termine incentivando ação (agendar visita, pedir orçamento, testar, etc)

**Quando não souber:**
Seja honesto e ofereça contato direto: "Essa é uma ótima pergunta específica! Para responder com precisão, recomendo falar diretamente com nosso time: (21) 3393-5566 ou WhatsApp (21) 3393-5566. Eles terão todas as informações detalhadas!"`;

// =====================================================
// COMPONENTE PRINCIPAL
// =====================================================

export default function JoriIAAgent() {
  const [mensagens, setMensagens] = useState([
    {
      tipo: 'assistant',
      texto: `👋 Olá! Sou o **Assistente IA do Grupo Jori Papel**!\n\nEstou aqui para tirar suas dúvidas sobre:\n• Produtos e preços\n• Sistema de comodato GRÁTIS\n• Argumentos de vendas\n• Objeções de clientes\n• Recomendações por segmento\n• Fichas técnicas\n• Casos de sucesso\n\n**Como posso ajudar?**`
    }
  ]);
  const [input, setInput] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [conversaId] = useState(() => Date.now().toString());
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  const chamarClaudeAPI = async (historico) => {
    try {
      setCarregando(true);

      // Formata histórico para API
      const mensagensAPI = historico.map(msg => ({
        role: msg.tipo === 'user' ? 'user' : 'assistant',
        content: msg.texto
      }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          system: SYSTEM_PROMPT,
          messages: mensagensAPI
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const respostaIA = data.content[0].text;
      
      setCarregando(false);
      return respostaIA;
    } catch (error) {
      console.error("Erro na API Claude:", error);
      setCarregando(false);
      return "Desculpe, tive um problema técnico momentâneo. Por favor, tente novamente ou entre em contato diretamente:\n\n📞 **(21) 3393-5566**\n📱 WhatsApp: **(21) 3393-5566**";
    }
  };

  const enviarMensagem = async () => {
    if (!input.trim() || carregando) return;

    const novaMensagemUser = { tipo: 'user', texto: input };
    const novoHistorico = [...mensagens, novaMensagemUser];
    
    setMensagens(novoHistorico);
    setInput('');

    // Chama IA
    const respostaIA = await chamarClaudeAPI(novoHistorico);
    
    setMensagens(prev => [
      ...prev,
      { tipo: 'assistant', texto: respostaIA }
    ]);
  };

  const usarSugestao = async (sugestao) => {
    const novaMensagemUser = { tipo: 'user', texto: sugestao };
    const novoHistorico = [...mensagens, novaMensagemUser];
    
    setMensagens(novoHistorico);

    // Chama IA
    const respostaIA = await chamarClaudeAPI(novoHistorico);
    
    setMensagens(prev => [
      ...prev,
      { tipo: 'assistant', texto: respostaIA }
    ]);
  };

  const resetarConversa = () => {
    setMensagens([
      {
        tipo: 'assistant',
        texto: `👋 Olá! Sou o **Assistente IA do Grupo Jori Papel**!\n\nEstou aqui para tirar suas dúvidas sobre:\n• Produtos e preços\n• Sistema de comodato GRÁTIS\n• Argumentos de vendas\n• Objeções de clientes\n• Recomendações por segmento\n• Fichas técnicas\n• Casos de sucesso\n\n**Como posso ajudar?**`
      }
    ]);
  };

  const sugestoes = [
    "Qual o produto mais vendido?",
    "Como funciona o comodato?",
    "Melhor papel para clínicas?",
    "Cliente diz que preço está alto",
    "Diferença folha dupla vs simples?",
    "Cases de economia real?"
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header Moderno */}
      <header className="p-5 border-b border-white/10 bg-gradient-to-r from-blue-950/95 to-slate-950/95 backdrop-blur-xl shadow-2xl">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 p-3 rounded-2xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-white tracking-tight">JORI PAPEL</span>
                <span className="px-2 py-0.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[10px] font-bold rounded-full">IA</span>
              </div>
              <span className="text-xs text-blue-300 font-medium">Assistente Inteligente • Powered by Claude</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-3">
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-400">Atendimento Direto</span>
              <a 
                href="https://wa.me/552133935566"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-semibold"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                (21) 3393-5566
              </a>
            </div>
            <button
              onClick={resetarConversa}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
              title="Nova conversa"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 max-w-5xl mx-auto w-full">
        <div className="space-y-5">
          {mensagens.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.tipo === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start gap-3 max-w-[85%] ${msg.tipo === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  msg.tipo === 'user' 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700' 
                    : 'bg-gradient-to-br from-emerald-500 to-green-600'
                }`}>
                  {msg.tipo === 'user' ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )}
                </div>

                {/* Message */}
                <div className={`rounded-3xl p-5 shadow-2xl ${
                  msg.tipo === 'user' 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-md' 
                    : 'bg-white/95 text-slate-800 rounded-bl-md border border-slate-200'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {msg.texto.split('\n').map((line, i) => (
                      <p key={i} dangerouslySetInnerHTML={{ 
                        __html: line
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                          .replace(/•/g, '<span class="text-blue-600">•</span>')
                      }} className="mb-2 last:mb-0" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Loading State */}
          {carregando && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-500 to-green-600">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div className="bg-white/95 rounded-3xl p-5 shadow-2xl border border-slate-200 rounded-bl-md">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    <span className="ml-2 text-sm text-slate-600 font-medium">IA pensando...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sugestões */}
          {mensagens.length === 1 && !carregando && (
            <div className="flex flex-col items-center gap-3 mt-6">
              <p className="text-sm text-gray-400 font-medium">💡 Perguntas sugeridas:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {sugestoes.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => usarSugestao(sug)}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-sm transition-all hover:scale-105"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gradient-to-r from-slate-950/98 to-blue-950/98 border-t border-white/10 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && enviarMensagem()}
              placeholder="Digite sua pergunta... (Enter para enviar)"
              disabled={carregando}
              className="flex-1 px-6 py-4 rounded-2xl bg-white/95 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg text-sm disabled:opacity-50"
            />
            <button
              onClick={enviarMensagem}
              disabled={carregando || !input.trim()}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Enviar
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mt-3 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <span>🤖</span>
              <span>IA Claude Sonnet 4</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>📞</span>
              <span>(21) 3393-5566</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>⚡</span>
              <span>Respostas em tempo real</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
