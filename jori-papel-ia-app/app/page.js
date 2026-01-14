'use client';

import { useState, useRef, useEffect } from 'react';

// =====================================================
// CORES JORI PAPEL - Azul e Cinza
// =====================================================
const CORES = {
  azulPrincipal: '#1e3a5f',
  azulClaro: '#2d5a87',
  azulEscuro: '#0f2744',
  cinzaClaro: '#9ca3af',
  cinzaMedio: '#6b7280',
  cinzaEscuro: '#4b5563',
  branco: '#ffffff',
  amarelo: '#fbbf24',
  amareloEscuro: '#f59e0b'
};

// =====================================================
// BASE DE CONHECIMENTO COM FICHAS TÉCNICAS COMPLETAS
// =====================================================
const CONHECIMENTO = {
  empresa: {
    nome: "Grupo Jori Papel",
    slogan: "40 Anos de Excelência em Higiene Profissional",
    fundacao: 1986,
    telefone: "(21) 3393-5566",
    whatsappVendas: "5521999815566",
    cnpj: "31.438.302.0001-70",
    email: "contato@joripapel.com.br",
    site: "joripapel.com.br"
  },
  
  fichasTecnicas: {
    PHI12: {
      codigo: "PHI12",
      nome: "Higiênico Interfolhado Personal Professional",
      marca: "Personal Professional",
      linha: "Premium",
      tipo: "Folha Dupla",
      material: "100% Celulose Virgem",
      caracteristicas: [
        "Com Extrato de Algodão Natural",
        "Folha dupla ultra macia",
        "Não esfarela",
        "Alta absorção",
        "Resistente ao estado úmido"
      ],
      embalagem: "20 pacotes × 600 folhas",
      totalFolhas: 12000,
      dimensaoFolha: "10cm × 21cm",
      gramatura: "30g/m²",
      circulacao: "Baixa a Média",
      dispensersCompativeis: ["DQH20", "DQH10", "DIDI10", "DHE10"],
      preco: 169.90,
      precoFolha: "R$ 0,014/folha",
      uso: "Clínicas, escritórios premium, hotéis",
      beneficios: "Mais higiênico - cada pessoa pega só o que vai usar. Ideal para ambientes que prezam por qualidade e conforto."
    },
    
    EHR50: {
      codigo: "EHR50",
      nome: "Higiênico Rolo Eco Folha Simples 500m",
      marca: "Santher Eco",
      linha: "Econômica",
      tipo: "Folha Simples",
      material: "100% Celulose Virgem",
      caracteristicas: [
        "Alto rendimento (500m por rolo)",
        "Resistente",
        "Ótimo custo-benefício",
        "Dissolve na água",
        "Ideal para alto fluxo"
      ],
      embalagem: "8 rolos × 500m",
      totalMetros: 4000,
      dimensaoFolha: "10cm largura",
      gramatura: "18g/m²",
      circulacao: "Alta",
      dispensersCompativeis: ["DTR50", "DTR30", "DHR50"],
      preco: 125.50,
      precoMetro: "R$ 0,031/metro",
      uso: "Condomínios, academias, shoppings, escolas",
      beneficios: "Maior rendimento do mercado. Menos trocas, mais economia para locais com grande circulação."
    },
    
    PHR25: {
      codigo: "PHR25",
      nome: "Higiênico Rolo Personal Professional Folha Dupla",
      marca: "Personal Professional",
      linha: "Premium",
      tipo: "Folha Dupla",
      material: "100% Celulose Virgem",
      caracteristicas: [
        "Com Extrato de Algodão Natural",
        "Folha dupla extra macia",
        "Alta absorção",
        "Não esfarela",
        "Visual premium"
      ],
      embalagem: "8 rolos × 250m",
      totalMetros: 2000,
      dimensaoFolha: "10cm largura",
      gramatura: "32g/m²",
      circulacao: "Baixa a Média",
      dispensersCompativeis: ["DQR30", "DQR20", "DHR25"],
      preco: 101.90,
      precoMetro: "R$ 0,051/metro",
      uso: "Hotéis, escritórios sofisticados, clínicas premium",
      beneficios: "Conforto e maciez superiores. Transmite sofisticação e cuidado com os usuários."
    },
    
    ETI00: {
      codigo: "ETI00",
      nome: "Toalha Eco Interfolhada 3 Dobras",
      marca: "Santher Eco",
      linha: "Econômica",
      tipo: "Folha Simples - 3 Dobras",
      material: "100% Celulose Virgem",
      caracteristicas: [
        "3 dobras (sai completa do dispenser)",
        "Boa absorção",
        "Resistente ao estado úmido",
        "Melhor custo-benefício",
        "Ideal para alto consumo"
      ],
      embalagem: "6 pacotes × 400 folhas",
      totalFolhas: 2400,
      dimensaoFolha: "22cm × 23cm (3D)",
      gramatura: "29g/m²",
      circulacao: "Alta",
      dispensersCompativeis: ["DQT20", "DQT10", "DTD10", "DTE10"],
      preco: 86.50,
      precoFolha: "R$ 0,036/folha",
      uso: "Escolas, academias, indústrias, alto fluxo",
      beneficios: "Melhor preço por folha. As 3 dobras garantem que a folha saia completa, evitando desperdício."
    },
    
    ITI01: {
      codigo: "ITI01",
      nome: "Toalha Inovatta Interfolhada Folha Simples",
      marca: "Inovatta",
      linha: "Standard",
      tipo: "Folha Simples - 2 Dobras",
      material: "100% Celulose Virgem",
      caracteristicas: [
        "2 dobras",
        "Gofrada",
        "Alta absorção",
        "Excelente alvura e maciez",
        "Não causa irritações dérmicas"
      ],
      embalagem: "10 pacotes × 240 folhas",
      totalFolhas: 2400,
      dimensaoFolha: "22cm × 21,6cm",
      gramatura: "37g/m²",
      circulacao: "Média",
      dispensersCompativeis: ["DQT20", "DQT10", "DTD10", "DTE10"],
      preco: 108.90,
      precoFolha: "R$ 0,045/folha",
      uso: "Escritórios, comércios, uso geral",
      beneficios: "Bom equilíbrio entre custo e qualidade. Secagem eficiente com boa absorção."
    },
    
    ITI02: {
      codigo: "ITI02",
      nome: "Toalha Inovatta Interfolhada Folha Dupla",
      marca: "Inovatta",
      linha: "Premium",
      tipo: "Folha Dupla - 2 Dobras",
      material: "100% Celulose Virgem (Fibras não transgênicas)",
      caracteristicas: [
        "Folha dupla",
        "2 dobras",
        "Gofrada",
        "Excelente alvura e maciez",
        "Resistência ao estado úmido",
        "Tecnologia exclusiva de maciez",
        "Não causa irritações dérmicas"
      ],
      embalagem: "10 pacotes × 240 folhas",
      totalFolhas: 2400,
      dimensaoFolha: "22cm × 21,6cm",
      gramatura: "42g/m²",
      circulacao: "Baixa a Média",
      dispensersCompativeis: ["DQT20", "DQT10", "DTD10", "DTE10"],
      preco: 132.50,
      precoFolha: "R$ 0,055/folha",
      uso: "Clínicas, consultórios, escritórios premium",
      beneficios: "MAIS VENDIDO! Maior absorção reduz número de folhas por uso. Uma folha seca bem as mãos."
    },
    
    ITI03: {
      codigo: "ITI03",
      nome: "Toalha Inovatta Interfolhada Folha Tripla",
      marca: "Inovatta",
      linha: "Super Premium",
      tipo: "Folha Tripla - 2 Dobras",
      material: "100% Celulose Virgem",
      caracteristicas: [
        "Folha tripla (máxima absorção)",
        "2 dobras",
        "Gofrada",
        "Ultra macia",
        "Alta resistência",
        "Não deixa resíduos"
      ],
      embalagem: "12 pacotes × 200 folhas",
      totalFolhas: 2400,
      dimensaoFolha: "22cm × 21,6cm",
      gramatura: "46g/m²",
      circulacao: "Baixa",
      dispensersCompativeis: ["DQT20", "DQT10", "DTD10", "DTE10"],
      preco: 154.50,
      precoFolha: "R$ 0,064/folha",
      uso: "Hotéis 5 estrelas, recepções VIP, ambientes premium",
      beneficios: "Máxima absorção - uma única folha seca completamente. Transmite luxo e sofisticação."
    },
    
    ETB20: {
      codigo: "ETB20",
      nome: "Toalha Bobina Eco Folha Simples",
      marca: "Santher Eco",
      linha: "Econômica",
      tipo: "Bobina Folha Simples",
      material: "100% Celulose Virgem",
      caracteristicas: [
        "Alto rendimento (250m por rolo)",
        "Folha simples resistente",
        "Ideal para cozinhas",
        "Boa absorção",
        "Fácil reposição"
      ],
      embalagem: "8 rolos × 250m",
      totalMetros: 2000,
      dimensaoFolha: "20cm largura",
      gramatura: "29g/m²",
      circulacao: "Alta",
      dispensersCompativeis: ["DAD10", "DTB20", "DBE10"],
      preco: 269.00,
      precoMetro: "R$ 0,134/metro",
      uso: "Cozinhas industriais, restaurantes, refeitórios",
      beneficios: "Máximo rendimento para áreas de produção. Corte controlado evita desperdício."
    },
    
    SECP06800: {
      codigo: "SECP06800",
      nome: "Sabonete Espuma Luna",
      marca: "Inovatta Luna",
      linha: "Standard",
      tipo: "Sabonete Espuma/Spray",
      material: "Base Aloe Vera",
      caracteristicas: [
        "Fragrância sofisticada internacional",
        "Agentes umectantes",
        "Hidratante para as mãos",
        "Limpeza eficiente",
        "Rende até 3x mais que líquido comum",
        "Não resseca as mãos"
      ],
      embalagem: "Refil 800ml",
      rendimento: "~2.500 doses",
      dispensersCompativeis: ["DSF10", "DSE10", "DQS10"],
      preco: 129.90,
      precoPorDose: "R$ 0,052/dose",
      uso: "Banheiros em geral, escritórios, comércios",
      beneficios: "Espuma rende muito mais que sabonete líquido. Economia garantida com higiene completa."
    },
    
    SECQ06800: {
      codigo: "SECQ06800",
      nome: "Sabonete Espuma Quartz Premium",
      marca: "Quartz",
      linha: "Super Premium",
      tipo: "Sabonete Espuma Exclusivo",
      material: "Fórmula Premium com Agentes Emolientes",
      caracteristicas: [
        "Fragrância premium exclusiva",
        "Agentes emolientes especiais",
        "Hidratação intensiva",
        "Toque aveludado",
        "Não oleoso",
        "Exclusivo linha Quartz"
      ],
      embalagem: "Refil 800ml",
      rendimento: "~2.500 doses",
      dispensersCompativeis: ["DQS10 (Quartz)"],
      preco: 229.90,
      precoPorDose: "R$ 0,092/dose",
      uso: "Hotéis de luxo, recepções VIP, clínicas premium",
      beneficios: "Experiência premium para seus clientes. Visual sofisticado do dispenser Quartz."
    }
  }
};

// =====================================================
// COMPONENTE PRINCIPAL
// =====================================================
export default function JoriPapelIA() {
  const [mensagens, setMensagens] = useState([
    {
      tipo: 'bot',
      texto: `Olá! Sou a **IA da Jori Papel**, distribuidor oficial Santher no Rio de Janeiro há 40 anos!\n\n🎉 **Promoção 2026 - Até 25% de desconto!**\n\nComo posso ajudar você hoje?`,
      opcoes: [
        { texto: "Ver preços", acao: "precos", icon: "💰" },
        { texto: "Como funciona o comodato?", acao: "comodato", icon: "🎁" },
        { texto: "Ficha técnica de produto", acao: "fichas", icon: "📋" },
        { texto: "Falar com especialista", acao: "agendar", icon: "📅" }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [etapaConversa, setEtapaConversa] = useState('inicio');
  const [dadosCliente, setDadosCliente] = useState({
    nome: '', telefone: '', empresa: '', segmento: '', horario: '', interesse: ''
  });
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => { scrollToBottom(); }, [mensagens]);

  // Enviar WhatsApp
  const enviarWhatsApp = (dados) => {
    const numero = CONHECIMENTO.empresa.whatsappVendas;
    const mensagem = encodeURIComponent(
      `🔔 *NOVO LEAD - JORI PAPEL IA*\n\n` +
      `👤 *Nome:* ${dados.nome || 'Não informado'}\n` +
      `📱 *Telefone:* ${dados.telefone || 'Não informado'}\n` +
      `🏢 *Empresa:* ${dados.empresa || 'Não informado'}\n` +
      `📋 *Segmento:* ${dados.segmento || 'Não informado'}\n` +
      `🕐 *Melhor horário:* ${dados.horario || 'Não informado'}\n` +
      `💼 *Interesse:* ${dados.interesse || 'Geral'}\n\n` +
      `📅 *Data:* ${new Date().toLocaleString('pt-BR')}`
    );
    window.open(`https://wa.me/${numero}?text=${mensagem}`, '_blank');
  };

  // Gerar ficha técnica formatada
  const gerarFichaTecnica = (codigo) => {
    const ficha = CONHECIMENTO.fichasTecnicas[codigo];
    if (!ficha) return null;
    
    let texto = `📋 **FICHA TÉCNICA - ${ficha.codigo}**\n\n`;
    texto += `**${ficha.nome}**\n`;
    texto += `Marca: ${ficha.marca} | Linha: ${ficha.linha}\n\n`;
    texto += `**📦 Embalagem:**\n${ficha.embalagem}\n`;
    texto += ficha.totalFolhas ? `Total: ${ficha.totalFolhas.toLocaleString()} folhas\n` : '';
    texto += ficha.totalMetros ? `Total: ${ficha.totalMetros.toLocaleString()} metros\n` : '';
    texto += `\n**📐 Dimensões:**\n${ficha.dimensaoFolha}\n`;
    texto += ficha.gramatura ? `Gramatura: ${ficha.gramatura}\n` : '';
    texto += `\n**✅ Características:**\n`;
    ficha.caracteristicas.forEach(c => { texto += `• ${c}\n`; });
    texto += `\n**🎯 Indicação:**\n${ficha.uso}\n`;
    texto += `Circulação: ${ficha.circulacao}\n`;
    texto += `\n**🔧 Dispensers Compatíveis:**\n${ficha.dispensersCompativeis.join(' | ')}\n`;
    texto += `\n**💰 PREÇO PROMOCIONAL:**\n`;
    texto += `**R$ ${ficha.preco.toFixed(2)}**\n`;
    texto += ficha.precoFolha || ficha.precoMetro || ficha.precoPorDose || '';
    texto += `\n\n**💡 Benefícios:**\n${ficha.beneficios}`;
    
    return {
      texto,
      opcoes: [
        { texto: "Fazer pedido", acao: "agendar", icon: "📅" },
        { texto: "Ver outras fichas", acao: "fichas", icon: "📋" },
        { texto: "Voltar ao menu", acao: "menu", icon: "🏠" }
      ]
    };
  };

  // Processar mensagem
  const processarMensagem = (texto, acao = null) => {
    const p = texto.toLowerCase();
    
    // Ações dos botões
    if (acao) {
      switch(acao) {
        case 'menu':
          setEtapaConversa('inicio');
          return {
            texto: `Como posso ajudar?`,
            opcoes: [
              { texto: "Ver preços", acao: "precos", icon: "💰" },
              { texto: "Comodato", acao: "comodato", icon: "🎁" },
              { texto: "Fichas técnicas", acao: "fichas", icon: "📋" },
              { texto: "Falar com especialista", acao: "agendar", icon: "📅" }
            ]
          };
          
        case 'precos':
          return {
            texto: `**TABELA DE PREÇOS 2026**\n\nQual tipo de produto você procura?`,
            opcoes: [
              { texto: "Papel Higiênico", acao: "cat_higienico", icon: "🧻" },
              { texto: "Papel Toalha", acao: "cat_toalha", icon: "🧴" },
              { texto: "Sabonete", acao: "cat_sabonete", icon: "🧼" },
              { texto: "Ver tabela completa", acao: "cat_todos", icon: "📋" }
            ]
          };
          
        case 'cat_higienico':
          return {
            texto: `**PAPEL HIGIÊNICO**\n\nTemos duas opções:\n\n**Interfolhado** - Mais higiênico (cada um pega só o que usa)\n**Rolo/Rolão** - Maior rendimento e economia`,
            opcoes: [
              { texto: "Interfolhado", acao: "hig_inter", icon: "📄" },
              { texto: "Rolo/Rolão", acao: "hig_rolo", icon: "🧻" }
            ]
          };
          
        case 'hig_inter':
          return {
            texto: `**PAPEL HIGIÊNICO INTERFOLHADO**\n\n` +
              `**PHI12** - Personal VIP Folha Dupla\n` +
              `📦 20×600 folhas (12.000)\n` +
              `💰 **R$ 169,90** (R$ 0,014/folha)\n` +
              `✅ Com Extrato de Algodão Natural\n\n` +
              `🎁 Dispenser GRÁTIS no comodato!`,
            opcoes: [
              { texto: "Ver ficha técnica PHI12", acao: "ficha_PHI12", icon: "📋" },
              { texto: "Fazer pedido", acao: "agendar", icon: "📅" },
              { texto: "Ver outros produtos", acao: "precos", icon: "⬅️" }
            ]
          };
          
        case 'hig_rolo':
          return {
            texto: `**PAPEL HIGIÊNICO ROLO**\n\n` +
              `**EHR50** - Rolão Eco 500m\n` +
              `📦 8×500m (4.000 metros)\n` +
              `💰 **R$ 125,50** (R$ 0,031/metro)\n` +
              `✅ Maior rendimento do mercado!\n\n` +
              `**PHR25** - Personal VIP Folha Dupla\n` +
              `📦 8×250m (2.000 metros)\n` +
              `💰 **R$ 101,90** (R$ 0,051/metro)\n` +
              `✅ Premium com Extrato de Algodão\n\n` +
              `🎁 Dispenser GRÁTIS no comodato!`,
            opcoes: [
              { texto: "Ficha EHR50", acao: "ficha_EHR50", icon: "📋" },
              { texto: "Ficha PHR25", acao: "ficha_PHR25", icon: "📋" },
              { texto: "Fazer pedido", acao: "agendar", icon: "📅" }
            ]
          };
          
        case 'cat_toalha':
          return {
            texto: `**PAPEL TOALHA**\n\nQual formato você prefere?`,
            opcoes: [
              { texto: "Interfolhado", acao: "toalha_inter", icon: "📄" },
              { texto: "Bobina", acao: "toalha_bobina", icon: "🧻" }
            ]
          };
          
        case 'toalha_inter':
          return {
            texto: `**PAPEL TOALHA INTERFOLHADO**\n\n` +
              `**ETI00** - Eco 3 Dobras (Econômico)\n` +
              `📦 6×400 folhas | 💰 **R$ 86,50**\n\n` +
              `**ITI01** - Inovatta Folha Simples\n` +
              `📦 10×240 folhas | 💰 **R$ 108,90**\n\n` +
              `**ITI02** - Inovatta Folha Dupla ⭐ MAIS VENDIDO\n` +
              `📦 10×240 folhas | 💰 **R$ 132,50**\n\n` +
              `**ITI03** - Inovatta Folha Tripla (Premium)\n` +
              `📦 12×200 folhas | 💰 **R$ 154,50**\n\n` +
              `🎁 Dispenser GRÁTIS no comodato!`,
            opcoes: [
              { texto: "Ficha ITI02 (mais vendido)", acao: "ficha_ITI02", icon: "⭐" },
              { texto: "Ver todas as fichas", acao: "fichas_toalha", icon: "📋" },
              { texto: "Fazer pedido", acao: "agendar", icon: "📅" }
            ]
          };
          
        case 'toalha_bobina':
          return {
            texto: `**PAPEL TOALHA BOBINA**\n\n` +
              `**ETB20** - Bobina Eco 250m\n` +
              `📦 8×250m (2.000 metros total)\n` +
              `💰 **R$ 269,00** (R$ 0,134/metro)\n` +
              `✅ Ideal para cozinhas e áreas de produção\n\n` +
              `🎁 Dispenser GRÁTIS no comodato!`,
            opcoes: [
              { texto: "Ver ficha técnica", acao: "ficha_ETB20", icon: "📋" },
              { texto: "Fazer pedido", acao: "agendar", icon: "📅" }
            ]
          };
          
        case 'cat_sabonete':
          return {
            texto: `**SABONETE ESPUMA**\n\n` +
              `**SECP06800** - Luna Espuma\n` +
              `📦 Refil 800ml (~2.500 doses)\n` +
              `💰 **R$ 129,90**\n` +
              `✅ Rende 3x mais que líquido comum!\n\n` +
              `**SECQ06800** - Quartz Premium\n` +
              `📦 Refil 800ml (~2.500 doses)\n` +
              `💰 **R$ 229,90**\n` +
              `✅ Fragrância exclusiva premium\n\n` +
              `🎁 Dispenser GRÁTIS no comodato!`,
            opcoes: [
              { texto: "Ficha Luna", acao: "ficha_SECP06800", icon: "📋" },
              { texto: "Ficha Quartz", acao: "ficha_SECQ06800", icon: "📋" },
              { texto: "Fazer pedido", acao: "agendar", icon: "📅" }
            ]
          };
          
        case 'cat_todos':
          let tabela = `**TABELA COMPLETA 2026**\n\n`;
          tabela += `**🧻 PAPEL HIGIÊNICO:**\n`;
          tabela += `PHI12 (Interf. VIP) - R$ 169,90\n`;
          tabela += `EHR50 (Rolão 500m) - R$ 125,50\n`;
          tabela += `PHR25 (Rolão FD) - R$ 101,90\n\n`;
          tabela += `**🧴 PAPEL TOALHA:**\n`;
          tabela += `ETI00 (Eco 3D) - R$ 86,50\n`;
          tabela += `ITI01 (Simples) - R$ 108,90\n`;
          tabela += `ITI02 (Dupla) ⭐ - R$ 132,50\n`;
          tabela += `ITI03 (Tripla) - R$ 154,50\n`;
          tabela += `ETB20 (Bobina) - R$ 269,00\n\n`;
          tabela += `**🧼 SABONETE:**\n`;
          tabela += `SECP06800 (Luna) - R$ 129,90\n`;
          tabela += `SECQ06800 (Quartz) - R$ 229,90\n\n`;
          tabela += `🎁 **COMODATO:** Dispenser GRÁTIS!`;
          return {
            texto: tabela,
            opcoes: [
              { texto: "Ver fichas técnicas", acao: "fichas", icon: "📋" },
              { texto: "Fazer pedido", acao: "agendar", icon: "📅" }
            ]
          };
          
        case 'comodato':
          return {
            texto: `**COMODATO JORI PAPEL**\n\n` +
              `**O que é?**\n` +
              `Você recebe os dispensers **GRATUITAMENTE**. Paga só pelos refis!\n\n` +
              `**Como funciona:**\n` +
              `1️⃣ Avaliamos seu espaço gratuitamente\n` +
              `2️⃣ Instalamos os dispensers sem custo\n` +
              `3️⃣ Você compra só os refis mensalmente\n` +
              `4️⃣ Manutenção é por nossa conta!\n\n` +
              `**Linhas disponíveis:**\n` +
              `• **Quartz** - Design sofisticado premium\n` +
              `• **Titanium** - Máxima durabilidade\n` +
              `• **Elegance** - Clássico e funcional\n\n` +
              `**Vantagens:**\n` +
              `✅ Economia de até 30%\n` +
              `✅ Reduz desperdício em 40%\n` +
              `✅ Ambiente mais bonito`,
            opcoes: [
              { texto: "Quero comodato!", acao: "agendar", icon: "📅" },
              { texto: "Ver preços dos refis", acao: "precos", icon: "💰" }
            ]
          };
          
        case 'fichas':
          return {
            texto: `**FICHAS TÉCNICAS**\n\nSelecione o produto para ver especificações completas:`,
            opcoes: [
              { texto: "PHI12 - Hig. Interfolhado", acao: "ficha_PHI12", icon: "📋" },
              { texto: "EHR50 - Hig. Rolão 500m", acao: "ficha_EHR50", icon: "📋" },
              { texto: "ITI02 - Toalha F. Dupla ⭐", acao: "ficha_ITI02", icon: "📋" },
              { texto: "Ver mais produtos", acao: "fichas_todas", icon: "📋" }
            ]
          };
          
        case 'fichas_todas':
          return {
            texto: `**TODAS AS FICHAS TÉCNICAS**\n\nSelecione:`,
            opcoes: [
              { texto: "PHI12", acao: "ficha_PHI12", icon: "🧻" },
              { texto: "EHR50", acao: "ficha_EHR50", icon: "🧻" },
              { texto: "PHR25", acao: "ficha_PHR25", icon: "🧻" },
              { texto: "ETI00", acao: "ficha_ETI00", icon: "🧴" },
              { texto: "ITI01", acao: "ficha_ITI01", icon: "🧴" },
              { texto: "ITI02 ⭐", acao: "ficha_ITI02", icon: "🧴" },
              { texto: "ITI03", acao: "ficha_ITI03", icon: "🧴" },
              { texto: "ETB20", acao: "ficha_ETB20", icon: "🧴" },
              { texto: "Sabonetes", acao: "cat_sabonete", icon: "🧼" }
            ]
          };
          
        case 'fichas_toalha':
          return {
            texto: `**FICHAS - PAPEL TOALHA**`,
            opcoes: [
              { texto: "ETI00 - Eco 3D", acao: "ficha_ETI00", icon: "📋" },
              { texto: "ITI01 - F. Simples", acao: "ficha_ITI01", icon: "📋" },
              { texto: "ITI02 - F. Dupla ⭐", acao: "ficha_ITI02", icon: "📋" },
              { texto: "ITI03 - F. Tripla", acao: "ficha_ITI03", icon: "📋" }
            ]
          };
          
        // Fichas técnicas individuais
        case 'ficha_PHI12': return gerarFichaTecnica('PHI12');
        case 'ficha_EHR50': return gerarFichaTecnica('EHR50');
        case 'ficha_PHR25': return gerarFichaTecnica('PHR25');
        case 'ficha_ETI00': return gerarFichaTecnica('ETI00');
        case 'ficha_ITI01': return gerarFichaTecnica('ITI01');
        case 'ficha_ITI02': return gerarFichaTecnica('ITI02');
        case 'ficha_ITI03': return gerarFichaTecnica('ITI03');
        case 'ficha_ETB20': return gerarFichaTecnica('ETB20');
        case 'ficha_SECP06800': return gerarFichaTecnica('SECP06800');
        case 'ficha_SECQ06800': return gerarFichaTecnica('SECQ06800');
          
        case 'agendar':
          setEtapaConversa('agendar_nome');
          return {
            texto: `**FALAR COM ESPECIALISTA**\n\nVou conectar você com nosso time comercial.\n\n**Qual seu nome?**`
          };
          
        case 'confirmar_whatsapp':
          enviarWhatsApp(dadosCliente);
          setEtapaConversa('inicio');
          return {
            texto: `✅ **Perfeito, ${dadosCliente.nome}!**\n\nAbrimos o WhatsApp com suas informações.\n\nCaso não tenha aberto:\n📱 **(21) 99981-5566**\n📞 **(21) 3393-5566**\n\nNosso time entra em contato em até 2h úteis!\n\n🎁 Lembre-se: **Dispenser GRÁTIS** no comodato!`,
            opcoes: [
              { texto: "Ver produtos", acao: "precos", icon: "💰" },
              { texto: "Menu principal", acao: "menu", icon: "🏠" }
            ]
          };
          
        default:
          break;
      }
    }

    // Fluxo de agendamento
    if (etapaConversa === 'agendar_nome') {
      setDadosCliente({...dadosCliente, nome: texto});
      setEtapaConversa('agendar_telefone');
      return { texto: `Prazer, **${texto}**! 👋\n\nQual seu **WhatsApp ou telefone**?` };
    }
    
    if (etapaConversa === 'agendar_telefone') {
      setDadosCliente({...dadosCliente, telefone: texto});
      setEtapaConversa('agendar_empresa');
      return { texto: `📱 Anotado!\n\nQual o **nome da sua empresa**?` };
    }
    
    if (etapaConversa === 'agendar_empresa') {
      setDadosCliente({...dadosCliente, empresa: texto});
      setEtapaConversa('agendar_segmento');
      return {
        texto: `🏢 **${texto}** - ótimo!\n\nQual o **segmento**?`,
        opcoes: [
          { texto: "Clínica/Consultório", acao: "seg_clinica", icon: "🏥" },
          { texto: "Escritório", acao: "seg_escritorio", icon: "🏢" },
          { texto: "Hotel/Pousada", acao: "seg_hotel", icon: "🏨" },
          { texto: "Restaurante/Bar", acao: "seg_restaurante", icon: "🍽️" },
          { texto: "Condomínio", acao: "seg_condominio", icon: "🏠" },
          { texto: "Outro", acao: "seg_outro", icon: "📋" }
        ]
      };
    }

    // Segmentos
    if (acao && acao.startsWith('seg_')) {
      const segs = {
        seg_clinica: 'Clínica/Consultório', seg_escritorio: 'Escritório',
        seg_hotel: 'Hotel/Pousada', seg_restaurante: 'Restaurante/Bar',
        seg_condominio: 'Condomínio', seg_outro: 'Outro'
      };
      setDadosCliente({...dadosCliente, segmento: segs[acao]});
      setEtapaConversa('agendar_horario');
      return {
        texto: `✅ Entendido!\n\n**Melhor horário** para contato?`,
        opcoes: [
          { texto: "Manhã (9h-12h)", acao: "hor_manha", icon: "🌅" },
          { texto: "Tarde (14h-18h)", acao: "hor_tarde", icon: "🌞" },
          { texto: "Qualquer horário", acao: "hor_qualquer", icon: "🕐" }
        ]
      };
    }

    // Horários
    if (acao && acao.startsWith('hor_')) {
      const hors = { hor_manha: 'Manhã (9h-12h)', hor_tarde: 'Tarde (14h-18h)', hor_qualquer: 'Qualquer horário' };
      const novosDados = {...dadosCliente, horario: hors[acao]};
      setDadosCliente(novosDados);
      setEtapaConversa('agendar_confirmar');
      
      return {
        texto: `**RESUMO DO AGENDAMENTO**\n\n` +
          `👤 **Nome:** ${novosDados.nome}\n` +
          `📱 **Telefone:** ${novosDados.telefone}\n` +
          `🏢 **Empresa:** ${novosDados.empresa}\n` +
          `📋 **Segmento:** ${novosDados.segmento}\n` +
          `🕐 **Horário:** ${novosDados.horario}\n\n` +
          `**Confirma envio para WhatsApp?**`,
        opcoes: [
          { texto: "Sim, enviar!", acao: "confirmar_whatsapp", icon: "✅" },
          { texto: "Corrigir dados", acao: "agendar", icon: "✏️" }
        ]
      };
    }

    // Texto livre - detectar intenções
    if (p.match(/pre[çc]o|valor|quanto|tabela|comprar/)) {
      return processarMensagem('', 'precos');
    }
    if (p.match(/comodato|dispenser|gr[aá]tis/)) {
      return processarMensagem('', 'comodato');
    }
    if (p.match(/ficha|t[eé]cnic|especifica/)) {
      return processarMensagem('', 'fichas');
    }
    if (p.match(/falar|contato|agendar|vendedor|whatsapp|ligar/)) {
      return processarMensagem('', 'agendar');
    }
    if (p.match(/phi12/i)) return gerarFichaTecnica('PHI12');
    if (p.match(/ehr50/i)) return gerarFichaTecnica('EHR50');
    if (p.match(/phr25/i)) return gerarFichaTecnica('PHR25');
    if (p.match(/eti00/i)) return gerarFichaTecnica('ETI00');
    if (p.match(/iti01/i)) return gerarFichaTecnica('ITI01');
    if (p.match(/iti02/i)) return gerarFichaTecnica('ITI02');
    if (p.match(/iti03/i)) return gerarFichaTecnica('ITI03');
    if (p.match(/etb20/i)) return gerarFichaTecnica('ETB20');
    if (p.match(/higi[êe]nico/)) return processarMensagem('', 'cat_higienico');
    if (p.match(/toalha/)) return processarMensagem('', 'cat_toalha');
    if (p.match(/sabonete/)) return processarMensagem('', 'cat_sabonete');

    // Default
    return {
      texto: `Como posso ajudar?`,
      opcoes: [
        { texto: "Ver preços", acao: "precos", icon: "💰" },
        { texto: "Comodato", acao: "comodato", icon: "🎁" },
        { texto: "Fichas técnicas", acao: "fichas", icon: "📋" },
        { texto: "Falar com especialista", acao: "agendar", icon: "📅" }
      ]
    };
  };

  // Enviar mensagem
  const enviarMensagem = () => {
    if (!input.trim()) return;
    setMensagens(prev => [...prev, { tipo: 'user', texto: input }]);
    setTimeout(() => {
      const resposta = processarMensagem(input);
      setMensagens(prev => [...prev, { tipo: 'bot', ...resposta }]);
    }, 500);
    setInput('');
  };

  // Handler opção
  const handleOpcao = (acao) => {
    const opcaoTexto = mensagens[mensagens.length - 1]?.opcoes?.find(o => o.acao === acao)?.texto;
    if (opcaoTexto) {
      setMensagens(prev => [...prev, { tipo: 'user', texto: opcaoTexto }]);
    }
    setTimeout(() => {
      const resposta = processarMensagem('', acao);
      setMensagens(prev => [...prev, { tipo: 'bot', ...resposta }]);
    }, 500);
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ 
        background: `linear-gradient(135deg, ${CORES.azulEscuro} 0%, ${CORES.azulPrincipal} 50%, ${CORES.azulClaro} 100%)` 
      }}
    >
      {/* Header */}
      <header 
        className="p-4 border-b backdrop-blur-md"
        style={{ 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          borderColor: 'rgba(255,255,255,0.2)' 
        }}
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo Jori Papel */}
            <div className="flex items-center">
              <svg viewBox="0 0 200 60" className="h-10 md:h-12">
                <text x="5" y="35" style={{ fill: CORES.branco, fontSize: '28px', fontWeight: 'bold', fontFamily: 'Arial Black, sans-serif' }}>JORI</text>
                <text x="85" y="35" style={{ fill: CORES.cinzaClaro, fontSize: '16px', fontWeight: 'normal', fontFamily: 'Arial, sans-serif' }}>PAPEL</text>
                <polygon points="130,15 145,30 130,45 140,30" style={{ fill: CORES.cinzaClaro }} />
                <polygon points="145,15 160,30 145,45 155,30" style={{ fill: CORES.cinzaMedio }} />
              </svg>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs" style={{ color: CORES.cinzaClaro }}>Distribuidor Oficial Santher RJ</p>
              <p className="text-xs font-bold" style={{ color: CORES.amarelo }}>40 ANOS</p>
            </div>
          </div>
          <a 
            href={`https://wa.me/${CONHECIMENTO.empresa.whatsappVendas}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-white text-sm font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: '#22c55e' }}
          >
            <span>📱</span> 
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </div>
      </header>

      {/* Banner */}
      <div 
        className="py-2 px-4 text-center"
        style={{ background: `linear-gradient(90deg, ${CORES.amarelo}, ${CORES.amareloEscuro})` }}
      >
        <p className="text-xs md:text-sm font-bold" style={{ color: CORES.azulEscuro }}>
          🎉 PROMOÇÃO 2026 - Até 25% OFF + Dispenser GRÁTIS no comodato!
        </p>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 max-w-4xl mx-auto w-full">
        <div className="space-y-4">
          {mensagens.map((msg, idx) => (
            <div key={idx}>
              <div className={`flex ${msg.tipo === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className="max-w-[90%] md:max-w-[85%] rounded-2xl p-3 md:p-4 shadow-lg"
                  style={{
                    backgroundColor: msg.tipo === 'user' ? CORES.azulClaro : CORES.branco,
                    color: msg.tipo === 'user' ? CORES.branco : CORES.azulEscuro,
                    borderBottomRightRadius: msg.tipo === 'user' ? '4px' : '16px',
                    borderBottomLeftRadius: msg.tipo === 'user' ? '16px' : '4px'
                  }}
                >
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {msg.texto.split('\n').map((line, i) => {
                      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                      return <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} className="mb-1" />;
                    })}
                  </div>
                </div>
              </div>
              
              {/* Botões */}
              {msg.tipo === 'bot' && msg.opcoes && (
                <div className="flex flex-wrap gap-2 mt-3 ml-2">
                  {msg.opcoes.map((opcao, oidx) => (
                    <button
                      key={oidx}
                      onClick={() => handleOpcao(opcao.acao)}
                      className="px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all hover:shadow-md active:scale-95"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        color: CORES.azulPrincipal,
                        border: `2px solid ${CORES.azulClaro}`
                      }}
                    >
                      {opcao.icon && <span className="mr-1">{opcao.icon}</span>}
                      {opcao.texto}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div 
        className="p-3 md:p-4 border-t backdrop-blur-md"
        style={{ 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          borderColor: 'rgba(255,255,255,0.2)' 
        }}
      >
        <div className="max-w-4xl mx-auto flex gap-2 md:gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
            placeholder="Digite sua mensagem..."
            className="flex-1 px-4 md:px-5 py-3 md:py-4 rounded-2xl shadow-lg focus:outline-none focus:ring-2 text-sm md:text-base"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.95)', 
              color: CORES.azulEscuro
            }}
          />
          <button
            onClick={enviarMensagem}
            className="px-4 md:px-6 py-3 md:py-4 rounded-2xl font-bold transition-all hover:opacity-90 shadow-lg text-sm md:text-base"
            style={{ 
              background: `linear-gradient(135deg, ${CORES.amarelo}, ${CORES.amareloEscuro})`,
              color: CORES.azulEscuro
            }}
          >
            Enviar
          </button>
        </div>
        <div 
          className="max-w-4xl mx-auto mt-3 flex flex-wrap justify-center gap-2 md:gap-4 text-xs"
          style={{ color: CORES.cinzaClaro }}
        >
          <span>📞 (21) 3393-5566</span>
          <span>📱 (21) 99981-5566</span>
          <span className="hidden sm:inline">🌐 joripapel.com.br</span>
        </div>
      </div>
    </div>
  );
}
