'use client';

import { useState, useRef, useEffect } from 'react';

// =====================================================
// BASE DE CONHECIMENTO COMPLETA E ROBUSTA
// =====================================================

const CONHECIMENTO = {
  empresa: {
    nome: "Grupo Jori Papel",
    razaoSocial: "Jori Artefatos de Papel Ltda",
    slogan: "40 Anos de Excelência em Higiene Profissional",
    fundacao: 1986,
    anos: 40,
    telefone: "(21) 3393-5566",
    whatsapp: "552133935566",
    whatsappVendas: "552133935566",
    cnpj: "31.438.302.0001-70",
    email: "contato@joripapel.com.br",
    site: "joripapel.com.br",
    endereco: "Rua Santa Mariana, 221 - Higienópolis, Rio de Janeiro - RJ",
    cep: "21061-150",
    areaAtuacao: "Grande Rio",
    prazoEntrega: "Até 48 horas",
    missao: "Oferecer soluções completas em higiene e limpeza profissional com qualidade superior e custo-benefício inteligente",
    valores: ["Qualidade", "Compromisso", "Inovação", "Sustentabilidade", "Excelência no Atendimento"]
  },

  fabricantes: {
    santher: {
      nome: "Santher",
      anos: 84,
      fundacao: 1938,
      descricao: "Fabricante de referência nacional com 84 anos de história, produzindo cerca de 180 mil toneladas de papel ao ano. Entre as maiores empresas do setor em capacidade de produção.",
      marcas: ["Personal Professional", "Personal", "Snob", "Inovatta", "Santher Eco"],
      diferenciais: [
        "100% Celulose Virgem em todos os produtos",
        "Tecnologia state-of-the-art",
        "Centro de distribuição mais moderno da América Latina",
        "Certificação FSC - Manejo Florestal Responsável",
        "Marca Personal presente em mais de 13 milhões de lares brasileiros"
      ]
    }
  },

  comodato: {
    titulo: "COMODATO JORI PAPEL - Economia Inteligente para Sua Empresa",
    descricao: "Sistema de parceria onde fornecemos GRATUITAMENTE todos os dispensers e equipamentos, você paga apenas pelos produtos que utilizar. Sem investimento inicial, sem multas, sem mínimo mensal.",
    
    vantagensFinanceiras: {
      titulo: "💰 Vantagens Financeiras",
      itens: [
        {
          titulo: "Zero Investimento Inicial",
          descricao: "Todos os dispensers instalados GRATUITAMENTE. Economia imediata de R$ 3.000 a R$ 15.000 em equipamentos.",
          economia: "100% do custo de equipamentos"
        },
        {
          titulo: "Sem Multas ou Penalidades",
          descricao: "Flexibilidade total. Cancele quando quiser, sem custos adicionais.",
          economia: "Risco zero"
        },
        {
          titulo: "Sem Mínimo Mensal",
          descricao: "Compre apenas o que precisar, quando precisar. Adaptável à sua realidade.",
          economia: "30-50% em desperdício"
        },
        {
          titulo: "Redução de Consumo Comprovada",
          descricao: "Dispensers inteligentes reduzem desperdício em até 40%. Clientes relatam economia de 3.000 folhas/semana.",
          economia: "40% em consumíveis"
        }
      ]
    },

    vantagensOperacionais: {
      titulo: "🔧 Vantagens Operacionais",
      itens: [
        {
          titulo: "Manutenção Inclusa",
          descricao: "Todas as manutenções preventivas e corretivas sem custo adicional. Substituição imediata de equipamentos com defeito."
        },
        {
          titulo: "Instalação Profissional",
          descricao: "Equipe técnica especializada instala todos os equipamentos de forma estratégica para máxima eficiência."
        },
        {
          titulo: "Gestão de Estoque",
          descricao: "Consultor dedicado monitora seu consumo e garante reposição antes do produto acabar."
        },
        {
          titulo: "Upgrades Automáticos",
          descricao: "Sempre com os equipamentos mais modernos. Atualizações sem custo adicional."
        },
        {
          titulo: "Backup de Emergência",
          descricao: "Para setores críticos, mantemos dispensers reserva na sua empresa para troca imediata."
        }
      ]
    },

    vantagensTecnicas: {
      titulo: "⚙️ Vantagens Técnicas",
      itens: [
        {
          titulo: "Compatibilidade Total",
          descricao: "Dispensers e produtos 100% compatíveis. Sem travamentos, sem desperdício, sem problemas."
        },
        {
          titulo: "Anti-Vandalismo",
          descricao: "Equipamentos robustos com travas de segurança. Redução de 90% em furtos e vandalismos."
        },
        {
          titulo: "Design Moderno",
          descricao: "Dispensers elegantes que valorizam o ambiente. Impressione clientes e colaboradores."
        },
        {
          titulo: "Alta Durabilidade",
          descricao: "Materiais de primeira linha. Resistentes a impactos e ideal para alto fluxo."
        }
      ]
    },

    comoFunciona: [
      {
        passo: 1,
        titulo: "Avaliação Gratuita",
        descricao: "Consultor visita sua empresa, analisa necessidades e dimensiona solução ideal."
      },
      {
        passo: 2,
        titulo: "Proposta Personalizada",
        descricao: "Recebe proposta detalhada com todos os dispensers e produtos recomendados."
      },
      {
        passo: 3,
        titulo: "Instalação Profissional",
        descricao: "Equipe técnica instala todos os equipamentos. Processo rápido e sem interrupções."
      },
      {
        passo: 4,
        titulo: "Treinamento da Equipe",
        descricao: "Capacitamos seus colaboradores para uso correto e controle de consumo."
      },
      {
        passo: 5,
        titulo: "Acompanhamento Contínuo",
        descricao: "Consultor dedicado monitora consumo, faz reposições e garante sua satisfação."
      }
    ],

    casesResultados: [
      {
        empresa: "Clínica Médica - Zona Sul RJ",
        segmento: "Saúde",
        resultado: "Redução de 45% no consumo de papel toalha. Economia de R$ 1.200/mês.",
        depoimento: "Os dispensers funcionam perfeitamente e a qualidade do papel Personal é excepcional. Recomendo!"
      },
      {
        empresa: "Escritório Corporativo - Centro RJ",
        segmento: "Corporativo",
        resultado: "Economia de 3.000 folhas/semana. Fim do desperdício e vandalismo.",
        depoimento: "Não precisamos mais nos preocupar com papel acabando. O atendimento é impecável!"
      },
      {
        empresa: "Restaurante - Barra da Tijuca",
        segmento: "Food Service",
        resultado: "Economia de 38% em produtos de higiene. Melhor controle operacional.",
        depoimento: "A manutenção inclusa faz toda diferença. Nossa cozinha está sempre em ordem."
      },
      {
        empresa: "Condomínio Residencial - Tijuca",
        segmento: "Condomínios",
        resultado: "Redução de 50% em furtos. Economia de R$ 800/mês.",
        depoimento: "Dispensers anti-vandalismo resolveram nosso maior problema. Excelente custo-benefício!"
      }
    ],

    porqueEscolher: [
      "✓ 40 anos de experiência no mercado do Grande Rio",
      "✓ Distribuidora oficial Santher - garantia de produto original",
      "✓ Entrega em até 48 horas",
      "✓ Consultor dedicado para sua empresa",
      "✓ Sem surpresas: preços transparentes e estáveis",
      "✓ Flexibilidade total: sem amarras contratuais",
      "✓ Suporte técnico especializado",
      "✓ Produtos de primeira linha com melhor custo-benefício"
    ]
  },

  produtos: {
    categorias: {
      papelHigienico: {
        nome: "Papel Higiênico",
        descricao: "Linha completa para diferentes necessidades e orçamentos",
        produtos: ["PHI12", "PHR25", "EHR50", "IHI01", "IHI02"]
      },
      papelToalha: {
        nome: "Papel Toalha",
        descricao: "Alta absorção e resistência para todos os ambientes",
        produtos: ["ETI00", "ITI01", "ITI02", "ITI03", "ETB20", "PTB30"]
      },
      dispensers: {
        nome: "Dispensers",
        descricao: "Equipamentos modernos e duráveis em COMODATO GRATUITO",
        produtos: ["DQH20", "DQT20", "DTR50", "DQR30", "DSL15", "DAG15"]
      },
      higieneMaos: {
        nome: "Higiene das Mãos",
        descricao: "Sabonetes e álcool gel para proteção completa",
        produtos: ["SLE05", "AGE05", "ARE10"]
      }
    }
  },

  fichasTecnicas: {
    // PAPEL HIGIÊNICO PREMIUM
    PHI12: {
      codigo: "PHI12",
      nome: "Papel Higiênico Interfolhado Personal Professional Folha Dupla",
      marca: "Personal Professional",
      fabricante: "Santher",
      linha: "Premium",
      categoria: "Papel Higiênico",
      tipo: "Interfolhado - Folha Dupla",
      material: "100% Celulose Virgem",
      caracteristicas: [
        "✓ Com Extrato de Algodão Natural - toque suave como algodão",
        "✓ Folha dupla ultra macia - máximo conforto",
        "✓ Não esfarela nem deixa resíduos",
        "✓ Alta absorção e resistência ao estado úmido",
        "✓ Gofrado para maior maciez",
        "✓ Certificação FSC - manejo florestal responsável"
      ],
      embalagem: "20 pacotes × 600 folhas",
      totalFolhas: 12000,
      dimensaoFolha: "10cm × 21cm",
      gramatura: "30g/m²",
      alvura: "Superior a 85%",
      ph: "Neutro (5.0 - 8.0)",
      circulacao: "Baixa a Média",
      dispensersCompativeis: ["DQH20", "DQH10", "DIDI10", "DHE10"],
      preco: 169.90,
      precoFolha: "R$ 0,014/folha",
      rendimentoMedio: "2-3 folhas por uso",
      duracaoMedia: "60-90 dias (escritório 50 pessoas)",
      usoIdeal: "Clínicas médicas, consultórios odontológicos, escritórios premium, hotéis boutique, ambientes que prezam por qualidade superior",
      beneficios: "O sistema interfolhado é MAIS HIGIÊNICO - cada pessoa pega apenas o que vai usar, direto do dispenser fechado. Ideal para ambientes que prezam por excelência e sofisticação.",
      diferencial: "Papel mais vendido em clínicas e consultórios médicos do Rio de Janeiro",
      imagem: "/images/phi12.jpg"
    },

    PHR25: {
      codigo: "PHR25",
      nome: "Papel Higiênico Rolão Personal Professional Folha Dupla 250m",
      marca: "Personal Professional",
      fabricante: "Santher",
      linha: "Premium",
      categoria: "Papel Higiênico",
      tipo: "Rolo - Folha Dupla",
      material: "100% Celulose Virgem",
      caracteristicas: [
        "✓ Com Extrato de Algodão Natural",
        "✓ Folha dupla extra macia",
        "✓ Alta absorção - economia comprovada",
        "✓ Não esfarela",
        "✓ Visual premium",
        "✓ Resistente ao estado úmido"
      ],
      embalagem: "8 rolos × 250m",
      totalMetros: 2000,
      dimensaoFolha: "10cm largura",
      gramatura: "32g/m²",
      alvura: "Superior a 85%",
      circulacao: "Baixa a Média",
      dispensersCompativeis: ["DQR30", "DQR20", "DHR25"],
      preco: 101.90,
      precoMetro: "R$ 0,051/metro",
      rendimentoMedio: "Até 250 usos por rolo",
      duracaoMedia: "45-60 dias (escritório 50 pessoas)",
      usoIdeal: "Hotéis, pousadas, escritórios sofisticados, clínicas premium, ambientes que buscam conforto superior",
      beneficios: "Conforto e maciez superiores transmitem sofisticação. Maior metragem = menos trocas.",
      diferencial: "250m por rolo = metade das trocas vs rolão de 300m folha simples",
      imagem: "/images/phr25.jpg"
    },

    EHR50: {
      codigo: "EHR50",
      nome: "Papel Higiênico Rolão Eco Folha Simples 500m",
      marca: "Santher Eco",
      fabricante: "Santher",
      linha: "Econômica - Alto Rendimento",
      categoria: "Papel Higiênico",
      tipo: "Rolo - Folha Simples",
      material: "100% Celulose Virgem",
      caracteristicas: [
        "✓ ALTO RENDIMENTO - 500m por rolo!",
        "✓ Resistente e econômico",
        "✓ Ótimo custo-benefício",
        "✓ Dissolve rapidamente na água",
        "✓ Ideal para locais com alto fluxo de pessoas",
        "✓ Menos trocas = menos mão de obra"
      ],
      embalagem: "8 rolos × 500m",
      totalMetros: 4000,
      dimensaoFolha: "10cm largura",
      gramatura: "18g/m²",
      alvura: "80-83%",
      circulacao: "Alta a Muito Alta",
      dispensersCompativeis: ["DTR50", "DTR30", "DHR50"],
      preco: 125.50,
      precoMetro: "R$ 0,031/metro",
      rendimentoMedio: "Até 500 usos por rolo",
      duracaoMedia: "30-45 dias (escritório 100 pessoas)",
      usoIdeal: "Condomínios, academias, shopping centers, escolas, universidades, indústrias, locais com muito tráfego",
      beneficios: "MAIOR RENDIMENTO DO MERCADO! 500m = menos trocas para locais com grande circulação. Reduz até 50% o tempo de reposição.",
      diferencial: "Campeão de vendas para academias e condomínios. Um rolo equivale a 2 rolos de 250m!",
      imagem: "/images/ehr50.jpg"
    },

    // PAPEL TOALHA INTERFOLHADO
    ETI00: {
      codigo: "ETI00",
      nome: "Papel Toalha Eco Interfolhado 3 Dobras",
      marca: "Santher Eco",
      fabricante: "Santher",
      linha: "Econômica",
      categoria: "Papel Toalha",
      tipo: "Interfolhado - Folha Simples - 3 Dobras",
      material: "100% Celulose Virgem",
      caracteristicas: [
        "✓ 3 DOBRAS - folha completa sai do dispenser",
        "✓ Boa absorção",
        "✓ Resistente ao estado úmido",
        "✓ Melhor custo-benefício da categoria",
        "✓ Ideal para alto consumo",
        "✓ Reduz desperdício"
      ],
      embalagem: "6 pacotes × 400 folhas",
      totalFolhas: 2400,
      dimensaoFolha: "22cm × 23cm (3 dobras)",
      gramatura: "29g/m²",
      alvura: "78-82%",
      circulacao: "Alta",
      dispensersCompativeis: ["DQT20", "DQT10", "DTD10", "DTE10"],
      preco: 86.50,
      precoFolha: "R$ 0,036/folha",
      rendimentoMedio: "1-2 folhas por uso",
      capacidadeAbsorcao: "Até 120ml por folha",
      duracaoMedia: "20-30 dias (escritório 50 pessoas)",
      usoIdeal: "Escolas, academias, indústrias, locais com alto fluxo, banheiros públicos",
      beneficios: "MELHOR PREÇO POR FOLHA! As 3 dobras evitam desperdício - a folha sai completa, pronta para uso.",
      diferencial: "Escolha #1 para escolas públicas e privadas em todo o Rio de Janeiro",
      imagem: "/images/eti00.jpg"
    },

    ITI01: {
      codigo: "ITI01",
      nome: "Papel Toalha Inovatta Interfolhado Folha Simples",
      marca: "Inovatta",
      fabricante: "Santher",
      linha: "Standard",
      categoria: "Papel Toalha",
      tipo: "Interfolhado - Folha Simples - 2 Dobras",
      material: "100% Celulose Virgem",
      caracteristicas: [
        "✓ 2 dobras - boa absorção",
        "✓ Gofrado para maciez",
        "✓ Alta absorção",
        "✓ Excelente alvura e maciez",
        "✓ Não causa irritações dérmicas",
        "✓ Bom equilíbrio custo-benefício"
      ],
      embalagem: "10 pacotes × 240 folhas",
      totalFolhas: 2400,
      dimensaoFolha: "22cm × 21,6cm",
      gramatura: "37g/m²",
      alvura: "83-86%",
      circulacao: "Média",
      dispensersCompativeis: ["DQT20", "DQT10", "DTD10", "DTE10"],
      preco: 108.90,
      precoFolha: "R$ 0,045/folha",
      rendimentoMedio: "1-2 folhas por uso",
      capacidadeAbsorcao: "Até 150ml por folha",
      duracaoMedia: "25-35 dias (escritório 50 pessoas)",
      usoIdeal: "Escritórios, comércios, restaurantes, uso geral corporativo",
      beneficios: "Equilíbrio perfeito entre qualidade e economia. Versátil para diversos ambientes.",
      diferencial: "Linha Inovatta oferece ótima qualidade a preço competitivo",
      imagem: "/images/iti01.jpg"
    },

    ITI02: {
      codigo: "ITI02",
      nome: "Papel Toalha Inovatta Interfolhado Folha Dupla - MAIS VENDIDO!",
      marca: "Inovatta",
      fabricante: "Santher",
      linha: "Premium",
      categoria: "Papel Toalha",
      tipo: "Interfolhado - Folha Dupla - 2 Dobras",
      material: "100% Celulose Virgem",
      caracteristicas: [
        "✓ FOLHA DUPLA - dobro de absorção",
        "✓ 2 dobras para melhor pegada",
        "✓ Gofrado - textura premium",
        "✓ Excelente alvura e maciez",
        "✓ Resistência superior ao estado úmido",
        "✓ Tecnologia exclusiva de maciez Inovatta",
        "✓ Não causa irritações dérmicas"
      ],
      embalagem: "10 pacotes × 240 folhas",
      totalFolhas: 2400,
      dimensaoFolha: "22cm × 21,6cm",
      gramatura: "42g/m²",
      alvura: "85-88%",
      circulacao: "Baixa a Média",
      dispensersCompativeis: ["DQT20", "DQT10", "DTD10", "DTE10"],
      preco: 132.50,
      precoFolha: "R$ 0,055/folha",
      rendimentoMedio: "1 folha por uso",
      capacidadeAbsorcao: "Até 200ml por folha",
      duracaoMedia: "35-50 dias (escritório 50 pessoas)",
      usoIdeal: "Clínicas, consultórios médicos, escritórios premium, hotéis, restaurantes sofisticados",
      beneficios: "🏆 CAMPEÃO DE VENDAS! Folha dupla = maior absorção = menos folhas por uso = economia real. Investimento que se paga.",
      diferencial: "Produto MAIS VENDIDO do Grupo Jori Papel. Aprovado por clínicas e hospitais.",
      imagem: "/images/iti02.jpg"
    },

    ITI03: {
      codigo: "ITI03",
      nome: "Papel Toalha Inovatta Interfolhado Folha Tripla - SUPER PREMIUM",
      marca: "Inovatta",
      fabricante: "Santher",
      linha: "Super Premium",
      categoria: "Papel Toalha",
      tipo: "Interfolhado - Folha Tripla - 2 Dobras",
      material: "100% Celulose Virgem",
      caracteristicas: [
        "✓ FOLHA TRIPLA - máxima absorção!",
        "✓ 2 dobras premium",
        "✓ Gofrado especial - ultra macio",
        "✓ Alta resistência",
        "✓ Não deixa resíduos",
        "✓ Visual e toque de luxo",
        "✓ UMA folha seca completamente as mãos"
      ],
      embalagem: "12 pacotes × 200 folhas",
      totalFolhas: 2400,
      dimensaoFolha: "22cm × 21,6cm",
      gramatura: "46g/m²",
      alvura: "Superior a 88%",
      circulacao: "Baixa",
      dispensersCompativeis: ["DQT20", "DQT10", "DTD10", "DTE10"],
      preco: 154.50,
      precoFolha: "R$ 0,064/folha",
      rendimentoMedio: "1 folha por uso",
      capacidadeAbsorcao: "Até 250ml por folha",
      duracaoMedia: "40-60 dias (escritório 30 pessoas)",
      usoIdeal: "Hotéis 5 estrelas, recepções VIP, escritórios de alto padrão, clínicas de luxo, spas",
      beneficios: "MÁXIMA QUALIDADE! Uma única folha seca completamente as mãos. Impressione seus clientes.",
      diferencial: "Escolha de hotéis e clínicas premium. Quando a imagem é tudo.",
      imagem: "/images/iti03.jpg"
    },

    // PAPEL TOALHA BOBINA
    ETB20: {
      codigo: "ETB20",
      nome: "Papel Toalha Bobina Eco Folha Simples 250m",
      marca: "Santher Eco",
      fabricante: "Santher",
      linha: "Econômica",
      categoria: "Papel Toalha",
      tipo: "Bobina - Folha Simples",
      material: "100% Celulose Virgem",
      caracteristicas: [
        "✓ Alto rendimento - 250m por rolo",
        "✓ Folha simples resistente",
        "✓ Ideal para cozinhas profissionais",
        "✓ Boa absorção",
        "✓ Picote prático",
        "✓ Econômico"
      ],
      embalagem: "6 rolos × 250m",
      totalMetros: 1500,
      largura: "20cm",
      gramatura: "32g/m²",
      alvura: "78-82%",
      dispensersCompativeis: ["DTB20", "DBN25"],
      preco: 92.50,
      precoMetro: "R$ 0,062/metro",
      usoIdeal: "Cozinhas industriais, restaurantes, food service, lanchonetes, padarias",
      beneficios: "Formato bobina ideal para limpeza de superfícies e equipamentos. Econômico para alto consumo.",
      diferencial: "Bobina de 250m dura 3x mais que rolos convencionais",
      imagem: "/images/etb20.jpg"
    },

    PTB30: {
      codigo: "PTB30",
      nome: "Papel Toalha Bobina Personal Professional Folha Dupla 300m",
      marca: "Personal Professional",
      fabricante: "Santher",
      linha: "Premium",
      categoria: "Papel Toalha",
      tipo: "Bobina - Folha Dupla",
      material: "100% Celulose Virgem",
      caracteristicas: [
        "✓ Folha dupla premium",
        "✓ 300m de alto rendimento",
        "✓ Alta absorção e resistência",
        "✓ Picote facilitado",
        "✓ Qualidade Personal",
        "✓ Ideal para uso intenso"
      ],
      embalagem: "6 rolos × 300m",
      totalMetros: 1800,
      largura: "20cm",
      gramatura: "38g/m²",
      alvura: "85-88%",
      dispensersCompativeis: ["DTB30", "DBN30"],
      preco: 134.90,
      precoMetro: "R$ 0,075/metro",
      usoIdeal: "Cozinhas premium, restaurantes sofisticados, hotéis, catering",
      beneficios: "Qualidade superior para cozinhas profissionais. Absorção e resistência excepcionais.",
      diferencial: "Folha dupla suporta limpezas pesadas sem rasgar",
      imagem: "/images/ptb30.jpg"
    },

    // DISPENSERS (COMODATO GRATUITO)
    DQH20: {
      codigo: "DQH20",
      nome: "Dispenser para Papel Higiênico Interfolhado - COMODATO GRÁTIS",
      tipo: "Dispenser",
      categoria: "Dispensers",
      compativel: "Papel Higiênico Interfolhado",
      material: "ABS de Alta Resistência",
      cor: "Branco Premium",
      capacidade: "600 folhas",
      caracteristicas: [
        "✓ FORNECIDO GRATUITAMENTE em comodato",
        "✓ Anti-vandalismo com trava de segurança",
        "✓ Visor transparente - controle visual",
        "✓ Sistema de gaveta para fácil reposição",
        "✓ Design moderno e elegante",
        "✓ Alta resistência a impactos",
        "✓ Manutenção inclusa"
      ],
      dimensoes: "32cm (A) × 26cm (L) × 13cm (P)",
      fixacao: "Parede - parafusos inclusos",
      comodato: "GRATUITO",
      manutencao: "Inclusa no comodato",
      garantia: "Total durante vigência do contrato",
      usoIdeal: "Banheiros corporativos, clínicas, escritórios",
      diferencial: "Sistema de travamento premium impede furtos e vandalismos",
      imagem: "/images/dqh20.jpg"
    },

    DQT20: {
      codigo: "DQT20",
      nome: "Dispenser para Papel Toalha Interfolhado - COMODATO GRÁTIS",
      tipo: "Dispenser",
      categoria: "Dispensers",
      compativel: "Papel Toalha Interfolhado",
      material: "ABS de Alta Resistência",
      cor: "Branco Premium",
      capacidade: "240-400 folhas",
      caracteristicas: [
        "✓ FORNECIDO GRATUITAMENTE em comodato",
        "✓ Anti-vandalismo",
        "✓ Visor para controle de nível",
        "✓ Reposição simplificada",
        "✓ Design contemporâneo",
        "✓ Resistente à umidade",
        "✓ Manutenção inclusa"
      ],
      dimensoes: "38cm (A) × 28cm (L) × 15cm (P)",
      fixacao: "Parede - kit completo",
      comodato: "GRATUITO",
      manutencao: "Inclusa no comodato",
      garantia: "Total durante vigência do contrato",
      usoIdeal: "Todos os ambientes corporativos",
      diferencial: "Dispenser mais robusto do mercado - ideal para alto tráfego",
      imagem: "/images/dqt20.jpg"
    },

    DTR50: {
      codigo: "DTR50",
      nome: "Dispenser para Papel Higiênico Rolão 500m - COMODATO GRÁTIS",
      tipo: "Dispenser",
      categoria: "Dispensers",
      compativel: "Papel Higiênico Rolão até 500m",
      material: "ABS Industrial",
      cor: "Branco ou Fumê",
      capacidade: "1 rolo até 500m",
      caracteristicas: [
        "✓ FORNECIDO GRATUITAMENTE em comodato",
        "✓ Sistema anti-vandalismo reforçado",
        "✓ Comporta rolos grandes (até 500m)",
        "✓ Trava de segurança dupla",
        "✓ Visor resistente",
        "✓ Ideal para alto fluxo",
        "✓ Manutenção inclusa"
      ],
      dimensoes: "42cm (A) × 35cm (L) × 18cm (P)",
      fixacao: "Parede - fixação reforçada",
      comodato: "GRATUITO",
      manutencao: "Inclusa no comodato",
      garantia: "Total durante vigência do contrato",
      usoIdeal: "Condomínios, academias, escolas, shopping centers",
      diferencial: "Aceita rolos de até 500m - menos trocas!",
      imagem: "/images/dtr50.jpg"
    },

    DSL15: {
      codigo: "DSL15",
      nome: "Dispenser para Sabonete Líquido 1,5L - COMODATO GRÁTIS",
      tipo: "Dispenser",
      categoria: "Dispensers",
      compativel: "Sabonete Líquido",
      material: "Polipropileno Reforçado",
      cor: "Branco Soft Touch",
      capacidade: "1.500ml",
      caracteristicas: [
        "✓ FORNECIDO GRATUITAMENTE em comodato",
        "✓ Acionamento suave",
        "✓ Dosagem controlada - economia",
        "✓ Anti-gotejamento",
        "✓ Visor de nível",
        "✓ Fácil higienização",
        "✓ Manutenção inclusa"
      ],
      dimensoes: "28cm (A) × 15cm (L) × 12cm (P)",
      fixacao: "Parede ou bancada",
      dosagem: "0,8ml por acionamento",
      rendimento: "Até 1.875 aplicações",
      comodato: "GRATUITO",
      manutencao: "Inclusa no comodato",
      garantia: "Total durante vigência do contrato",
      usoIdeal: "Banheiros, cozinhas, lavatórios",
      diferencial: "Sistema anti-desperdício economiza até 35% em sabonete",
      imagem: "/images/dsl15.jpg"
    },

    DAG15: {
      codigo: "DAG15",
      nome: "Dispenser para Álcool Gel 1,5L - COMODATO GRÁTIS",
      tipo: "Dispenser",
      categoria: "Dispensers",
      compativel: "Álcool Gel 70%",
      material: "Polipropileno Premium",
      cor: "Branco",
      capacidade: "1.500ml",
      caracteristicas: [
        "✓ FORNECIDO GRATUITAMENTE em comodato",
        "✓ Acionamento por alavanca - higiênico",
        "✓ Dosagem ideal (2ml)",
        "✓ Indicado para protocolos de saúde",
        "✓ Resistente a álcool",
        "✓ Visual profissional",
        "✓ Manutenção inclusa"
      ],
      dimensoes: "28cm (A) × 15cm (L) × 12cm (P)",
      fixacao: "Parede - versão de bancada disponível",
      dosagem: "2ml por acionamento",
      rendimento: "Até 750 aplicações",
      comodato: "GRATUITO",
      manutencao: "Inclusa no comodato",
      garantia: "Total durante vigência do contrato",
      usoIdeal: "Recepções, entradas, corredores, todos ambientes",
      diferencial: "Essencial pós-pandemia - demonstra cuidado com saúde",
      imagem: "/images/dag15.jpg"
    },

    // HIGIENE DAS MÃOS
    SLE05: {
      codigo: "SLE05",
      nome: "Sabonete Líquido Erva Doce 5L",
      marca: "Personal Professional",
      categoria: "Higiene das Mãos",
      tipo: "Sabonete Líquido",
      fragrancia: "Erva Doce",
      caracteristicas: [
        "✓ pH neutro - não resseca",
        "✓ Fragrância suave Erva Doce",
        "✓ Alta performance de limpeza",
        "✓ Glicerinado - hidratante",
        "✓ Testado dermatologicamente",
        "✓ Biodegradável"
      ],
      embalagem: "Galão 5 litros",
      rendimento: "Até 6.250 aplicações (0,8ml/dose)",
      preco: 42.90,
      precoAplicacao: "R$ 0,007/aplicação",
      usoIdeal: "Banheiros corporativos, lavatórios",
      diferencial: "Fragrância agradável que perdura",
      imagem: "/images/sle05.jpg"
    },

    AGE05: {
      codigo: "AGE05",
      nome: "Álcool Gel 70% 5L",
      marca: "Personal Professional",
      categoria: "Higiene das Mãos",
      tipo: "Álcool Gel Antisséptico",
      concentracao: "70% (INPM)",
      caracteristicas: [
        "✓ 70% de concentração - máxima eficácia",
        "✓ Aprovado pela ANVISA",
        "✓ Elimina 99,9% dos germes",
        "✓ Com hidratante - não resseca",
        "✓ Secagem rápida",
        "✓ Fragrância neutra"
      ],
      embalagem: "Galão 5 litros",
      rendimento: "Até 2.500 aplicações (2ml/dose)",
      registroAnvisa: "Sim",
      preco: 54.90,
      precoAplicacao: "R$ 0,022/aplicação",
      usoIdeal: "Recepções, entradas, salas de espera, todos ambientes",
      diferencial: "Proteção eficaz contra vírus e bactérias",
      imagem: "/images/age05.jpg"
    }
  },

  segmentos: {
    clinicas: {
      nome: "Clínicas e Consultórios",
      descricao: "Soluções especializadas para saúde",
      produtosRecomendados: ["PHI12", "ITI02", "ITI03", "SLE05", "AGE05"],
      diferenciais: [
        "Produtos que atendem protocolos de higiene hospitalar",
        "Papel higiênico e toalha de alta absorção",
        "Dispensers anti-contaminação",
        "Álcool gel aprovado ANVISA"
      ],
      casesComuns: "Redução de 40% em consumo de papel + eliminação de desperdício"
    },
    escritorios: {
      nome: "Escritórios Corporativos",
      descricao: "Eficiência e economia inteligente",
      produtosRecomendados: ["PHI12", "PHR25", "ITI01", "ITI02", "SLE05"],
      diferenciais: [
        "Sistema interfolhado reduz desperdício",
        "Controle de consumo com relatórios",
        "Dispensers modernos valorizam ambiente",
        "Economia comprovada de 30-40%"
      ],
      casesComuns: "Economia média de R$ 1.200/mês + redução de 50% em trocas"
    },
    hoteis: {
      nome: "Hotéis e Pousadas",
      descricao: "Qualidade que impressiona hóspedes",
      produtosRecomendados: ["PHR25", "ITI02", "ITI03", "PTB30", "SLE05"],
      diferenciais: [
        "Produtos premium Personal e Inovatta",
        "Visual sofisticado",
        "Alta performance em absorção",
        "Fragrâncias agradáveis"
      ],
      casesComuns: "Melhoria na avaliação de hóspedes + redução de custos operacionais"
    },
    restaurantes: {
      nome: "Restaurantes e Food Service",
      descricao: "Higiene profissional para sua cozinha",
      produtosRecomendados: ["EHR50", "ETI00", "ETB20", "PTB30", "SLE05"],
      diferenciais: [
        "Papel toalha bobina ideal para cozinhas",
        "Alto rendimento para uso intenso",
        "Atende normas sanitárias",
        "Ótimo custo-benefício"
      ],
      casesComuns: "Conformidade com vigilância sanitária + economia de 35%"
    },
    condominios: {
      nome: "Condomínios",
      descricao: "Solução completa para áreas comuns",
      produtosRecomendados: ["EHR50", "ETI00", "ITI01"],
      diferenciais: [
        "Alto rendimento para grandes volumes",
        "Dispensers anti-vandalismo",
        "Redução drástica em furtos",
        "Economia para o condomínio"
      ],
      casesComuns: "Redução de 50% em furtos + economia de R$ 800/mês"
    },
    academias: {
      nome: "Academias e Espaços de Lazer",
      descricao: "Resistência para alto tráfego",
      produtosRecomendados: ["EHR50", "ETI00", "ITI01", "AGE05"],
      diferenciais: [
        "Produtos resistentes para uso intenso",
        "Alto rendimento = menos trocas",
        "Dispensers para alto fluxo",
        "Álcool gel para proteção"
      ],
      casesComuns: "Redução de 60% em tempo de reposição"
    }
  },

  faq: [
    {
      pergunta: "O que é comodato e como funciona?",
      resposta: "Comodato é um sistema de parceria onde o Grupo Jori Papel fornece GRATUITAMENTE todos os dispensers e equipamentos necessários. Você paga apenas pelos produtos consumíveis (papel, sabonete, etc). Sem investimento inicial, sem multas de cancelamento, sem mínimo mensal obrigatório. Inclui instalação profissional, manutenção preventiva e corretiva, e consultoria especializada. Você tem flexibilidade total para comprar na sua necessidade."
    },
    {
      pergunta: "Tenho que pagar pelos dispensers?",
      resposta: "NÃO! Todos os dispensers são fornecidos em COMODATO GRATUITO. Zero investimento. Isso inclui: dispensers de papel higiênico, papel toalha, sabonete líquido, álcool gel, e todos os acessórios. A instalação também é gratuita. Você economiza de R$ 3.000 a R$ 15.000 em equipamentos."
    },
    {
      pergunta: "Existe contrato com multa de cancelamento?",
      resposta: "NÃO! Nosso comodato é SEM MULTAS. Você pode cancelar quando quiser sem custos adicionais. Trabalhamos com parceria baseada em confiança e qualidade de serviço, não em amarras contratuais. Nossa meta é conquistar sua preferência pela excelência, não pela obrigação."
    },
    {
      pergunta: "Preciso comprar um mínimo mensal?",
      resposta: "NÃO! Não temos mínimo mensal obrigatório. Você compra apenas o que precisa, quando precisa. Se sua empresa tem sazonalidade ou períodos de menor movimento, sem problemas. Flexibilidade total para se adaptar à sua realidade."
    },
    {
      pergunta: "A manutenção dos dispensers tem custo?",
      resposta: "NÃO! Toda manutenção está INCLUSA no comodato: preventiva (revisões periódicas), corretiva (reparos quando necessário), substituição de equipamentos com defeito, e até upgrades para modelos mais modernos. Nossa equipe técnica cuida de tudo sem custo adicional."
    },
    {
      pergunta: "Quanto tempo demora a entrega?",
      resposta: "Entregamos em até 48 HORAS em todo o Grande Rio. Para pedidos urgentes, podemos fazer entrega no mesmo dia (consulte disponibilidade). Temos estoque próprio e frota dedicada."
    },
    {
      pergunta: "Os produtos são originais Santher?",
      resposta: "SIM! Somos DISTRIBUIDORES OFICIAIS Santher. Todos os produtos são 100% ORIGINAIS com garantia de fábrica. Personal Professional, Inovatta, Santher Eco - todas as linhas autênticas, direto do fabricante para você."
    },
    {
      pergunta: "Qual a diferença entre papel interfolhado e rolão?",
      resposta: "PAPEL INTERFOLHADO: folhas soltas sobrepostas em dispenser fechado. Mais higiênico (cada pessoa pega só o que usa), controla desperdício, visual profissional. Ideal para clínicas, escritórios. ROLÃO: rolo grande em suporte aberto. Maior rendimento, menos trocas, mais econômico. Ideal para alto fluxo (academias, condomínios)."
    },
    {
      pergunta: "Papel folha simples ou dupla? Qual escolher?",
      resposta: "FOLHA SIMPLES: mais econômica, boa para alto consumo, locais com orçamento apertado. FOLHA DUPLA: dobro de absorção, mais conforto, menos folhas por uso, economia a longo prazo. FOLHA TRIPLA: máxima qualidade, ambientes premium. Nossa recomendação: folha dupla oferece o melhor custo-benefício - qualidade superior com economia real."
    },
    {
      pergunta: "Como funciona o processo de instalação?",
      resposta: "1) Agendamos visita do consultor para análise (GRATUITA). 2) Apresentamos proposta personalizada. 3) Aprovada, agendamos instalação em data/horário conveniente. 4) Equipe técnica instala todos equipamentos (2-4 horas). 5) Treinamos sua equipe. 6) Deixamos primeira carga de produtos. Processo rápido e sem interromper sua operação."
    },
    {
      pergunta: "Posso testar antes de decidir?",
      resposta: "SIM! Oferecemos PERÍODO DE EXPERIÊNCIA. Instalamos alguns dispensers, fornecemos produtos para teste, você avalia qualidade e economia. Sem compromisso. Nossa confiança nos produtos permite essa flexibilidade."
    },
    {
      pergunta: "Vocês atendem pequenas empresas?",
      resposta: "SIM! Atendemos de pequenos consultórios a grandes corporações. Personalizamos a solução para cada porte. Pequenas empresas se beneficiam ainda mais do comodato - zero investimento em equipamentos, economia proporcional."
    },
    {
      pergunta: "Como é feito o controle de consumo?",
      resposta: "Seu consultor dedicado monitora seu padrão de consumo, alerta quando estoque está baixo, sugere otimizações. Você também tem acesso a relatórios de consumo para controle interno. Evitamos que falte produto e ajudamos a reduzir desperdícios."
    },
    {
      pergunta: "Posso comprar só os produtos sem comodato?",
      resposta: "SIM! Você pode comprar diretamente sem comodato. Porém, o COMODATO oferece vantagens significativas: dispensers grátis (economia de milhares), manutenção inclusa, consultoria, controle de estoque, preços especiais. Vale muito a pena avaliar."
    },
    {
      pergunta: "Quais formas de pagamento aceitam?",
      resposta: "Diversas opções: boleto bancário, transferência/PIX, cartão de crédito corporativo. Condições especiais para empresas: prazos diferenciados, parcelamento facilitado. Trabalhamos para se adaptar à sua realidade financeira."
    }
  ],

  argumentosVenda: {
    objecoes: {
      "Já tenho fornecedor": {
        resposta: "Ótimo ter fornecedor! Nossa proposta não é substituir, mas AGREGAR valor. Compare: no sistema atual você paga pelos dispensers? Tem manutenção inclusa? Tem consultor dedicado? Sem multas e sem mínimo? Faça um teste paralelo em alguns setores. Muitos clientes mantiveram ambos inicialmente e depois migraram 100% para nós pela economia comprovada.",
        argumentos: [
          "Teste paralelo sem risco",
          "Economia comprovada de 30-40%",
          "Equipamentos gratuitos vs comprados",
          "Flexibilidade vs amarras contratuais"
        ]
      },
      "Preço muito alto": {
        resposta: "Entendo a preocupação com preço. Mas vamos analisar o CUSTO TOTAL? Nosso 'preço mais alto' INCLUI: dispensers de R$ 300-800 cada (gratuitos), manutenção mensal estimada em R$ 200, consultoria especializada, treinamento de equipe, controle de desperdício que economiza 30-40%. Some tudo que você gasta hoje (produto + equipamentos + manutenção + desperdício). Geralmente o custo total conosco é MENOR. Posso fazer essa análise com você?",
        argumentos: [
          "Análise de custo total (TCO)",
          "Dispensers grátis = economia imediata de milhares",
          "Redução de desperdício = economia mensal real",
          "Sem surpresas ou custos ocultos"
        ]
      },
      "Preciso pensar / consultar sócios": {
        resposta: "Claro! Decisão importante merece análise. Que tal eu preparar uma ANÁLISE COMPARATIVA completa para você apresentar? Incluo: comparativo de custos (antes x depois), lista de economias (dispensers, manutenção, desperdício), depoimentos de clientes similares, projeção de ROI. Assim você tem dados concretos para a decisão. Posso enviar ainda hoje?",
        argumentos: [
          "Material completo para apresentação",
          "Dados concretos e cases reais",
          "Calculadora de economia personalizada",
          "Período de experiência sem compromisso"
        ]
      },
      "Não temos orçamento agora": {
        resposta: "Interessante você mencionar orçamento, porque nossa solução REDUZ seus gastos atuais! Você já paga por papel, certo? Provavelmente paga também por dispensers (compra ou aluguel), manutenção, e ainda perde dinheiro com desperdício. Nossa proposta mantém ou REDUZ o que você já gasta, mas entregando equipamentos grátis e muito mais valor. É uma ECONOMIA, não um gasto novo. Posso mostrar os números?",
        argumentos: [
          "Substitui gastos existentes",
          "Reduz custos operacionais",
          "Zero investimento inicial",
          "Economia desde o primeiro mês"
        ]
      },
      "Vou fazer cotação com outros": {
        resposta: "Perfeito! Comparar é prudente. Ao cotar, verifique esses pontos que costumam passar despercebidos: 1) Dispensers são realmente grátis ou cobrados 'disfarçadamente' no produto? 2) Tem multa rescisória? Qual valor? 3) Qual o mínimo mensal obrigatório? 4) Manutenção inclusa ou cobra à parte? 5) Garantia do fabricante original? 6) Prazo de entrega real? Faça essas perguntas e compare. Tenho certeza que nossa proposta se destacará. Posso acompanhar sua análise?",
        argumentos: [
          "Checklist de comparação completo",
          "Transparência total nos custos",
          "Credenciais e diferenciais únicos",
          "40 anos de mercado = confiabilidade"
        ]
      }
    },

    motivadores: {
      economia: {
        titulo: "ECONOMIA COMPROVADA",
        argumentos: [
          "Economia de 30-40% em consumíveis (desperdício reduzido)",
          "Zero investimento em equipamentos (R$ 3.000-15.000 economizados)",
          "Sem custos de manutenção",
          "Sem surpresas: preços transparentes e estáveis",
          "ROI positivo desde o primeiro mês"
        ],
        frase: "Clientes relatam economia média de R$ 1.200/mês!"
      },
      qualidade: {
        titulo: "QUALIDADE SANTHER - REFERÊNCIA NACIONAL",
        argumentos: [
          "Produtos originais Santher - 84 anos de tradição",
          "100% celulose virgem - máxima absorção",
          "Certificação FSC - sustentabilidade",
          "Tecnologia de ponta na fabricação",
          "Marcas premiadas: Personal, Inovatta"
        ],
        frase: "Personal: presente em 13 milhões de lares brasileiros!"
      },
      flexibilidade: {
        titulo: "FLEXIBILIDADE TOTAL",
        argumentos: [
          "SEM multas de cancelamento",
          "SEM mínimo mensal obrigatório",
          "Compre na sua necessidade",
          "Ajuste consumo conforme sazonalidade",
          "Parceria de confiança, não contrato-prisão"
        ],
        frase: "Você no controle. Sempre."
      },
      conveniencia: {
        titulo: "CONVENIÊNCIA E SUPORTE",
        argumentos: [
          "Consultor dedicado para sua empresa",
          "Entrega em até 48 horas",
          "Controle de estoque para você",
          "Instalação e manutenção inclusas",
          "Treinamento da equipe"
        ],
        frase: "Menos preocupação, mais foco no seu negócio."
      }
    },

    fechamento: {
      tecnicas: [
        "Proposta teste: 'Que tal instalarmos em 1-2 banheiros por 30 dias? Sem compromisso. Você avalia economia e qualidade.'",
        "Urgência genuína: 'Temos promoção este mês com desconto adicional de 15% + brindes. Vale conferir!'",
        "Comparativo visual: 'Tenho aqui fotos do antes/depois de um escritório similar. Posso mostrar?'",
        "Custo de oportunidade: 'Cada mês que passa sem otimizar é dinheiro desperdiçado. Que tal começarmos logo?'",
        "Próximo passo pequeno: 'Sem decidir agora, posso agendar a visita técnica gratuita? Só para você conhecer.'",
        "Referência social: 'A clínica Dr. Silva ali perto é nossa cliente. Posso pedir autorização para você conversar com eles?'"
      ]
    }
  },

  duvidas: {
    tecnicas: [
      "Qual diferença entre interfolhado e rolão?",
      "Folha simples ou dupla pra meu caso?",
      "Quanto economiza em média com comodato?",
      "Tem mínimo mensal?",
      "Pode cancelar quando quiser?",
      "Manutenção dos dispensers é cobrada?",
      "Produtos são originais Santher?",
      "Prazo de entrega?",
      "Preciso pagar pelos dispensers?",
      "Posso fazer teste antes?"
    ],
    vendas: [
      "Como convencer cliente que já tem fornecedor?",
      "Objeção: preço alto. Como responder?",
      "Cliente quer pensar. Como engajar?",
      "Principais argumentos de venda?",
      "Como fechar negócio?",
      "Argumentos para linha econômica vs premium?"
    ]
  }
};

// =====================================================
// COMPONENTE PRINCIPAL
// =====================================================

export default function JoriPapelIA() {
  const [mensagens, setMensagens] = useState([
    {
      tipo: 'bot',
      texto: `👋 **Olá! Bem-vindo ao Grupo Jori Papel!**\n\n🏆 **40 Anos** atendendo o Grande Rio\n💎 **Distribuidor Oficial Santher**\n🎁 **Dispensers GRÁTIS em Comodato**\n\n**Como posso ajudar hoje?**`,
      opcoes: [
        { texto: "💰 Ver Produtos e Preços", acao: "produtos", icon: "🛍️" },
        { texto: "🎁 Entender o Comodato", acao: "comodato", icon: "🎁" },
        { texto: "📋 Fichas Técnicas Completas", acao: "fichas", icon: "📋" },
        { texto: "📞 Falar com Especialista", acao: "agendar", icon: "📞" },
        { texto: "❓ Perguntas Frequentes", acao: "faq", icon: "❓" },
        { texto: "🎯 Para Time de Vendas", acao: "vendas", icon: "🎯" }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [etapaConversa, setEtapaConversa] = useState('inicio');
  const [dadosCliente, setDadosCliente] = useState({});
  const [carregando, setCarregando] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  // Função para gerar resposta usando Claude API
  const gerarRespostaIA = async (pergunta) => {
    try {
      setCarregando(true);
      
      const prompt = `Você é um assistente especializado do Grupo Jori Papel, distribuidora oficial Santher com 40 anos de experiência no Grande Rio.

INFORMAÇÕES IMPORTANTES:
- Comodato: Dispensers 100% GRATUITOS, sem multa, sem mínimo mensal
- Produtos: Santher (Personal, Inovatta, Eco) - 100% originais
- Entrega: Até 48h no Grande Rio
- Telefone: (21) 3393-5566
- WhatsApp: (21) 3393-5566

PERGUNTA DO CLIENTE: ${pergunta}

Responda de forma:
- Profissional mas acessível
- Focada em BENEFÍCIOS e ECONOMIA
- Com dados concretos quando possível
- Sempre mencionando o diferencial do comodato GRATUITO
- Incentivando ação (agendar visita, pedir orçamento)

Limite: 3-4 parágrafos curtos.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            { role: "user", content: prompt }
          ],
        })
      });

      const data = await response.json();
      const respostaIA = data.content[0].text;
      
      setCarregando(false);
      return respostaIA;
    } catch (error) {
      console.error("Erro na API:", error);
      setCarregando(false);
      return "Desculpe, tive um problema técnico. Por favor, entre em contato diretamente: (21) 3393-5566 ou WhatsApp (21) 3393-5566";
    }
  };

  const gerarFichaTecnica = (codigo) => {
    const produto = CONHECIMENTO.fichasTecnicas[codigo];
    if (!produto) return { texto: "Produto não encontrado." };

    let texto = `**${produto.nome}**\n\n`;
    texto += `📦 **Código:** ${produto.codigo}\n`;
    texto += `🏭 **Fabricante:** ${produto.fabricante} - ${produto.marca}\n`;
    texto += `⭐ **Linha:** ${produto.linha}\n\n`;

    if (produto.preco) {
      texto += `💰 **PREÇO:** R$ ${produto.preco.toFixed(2)}\n`;
      if (produto.precoFolha) texto += `└─ ${produto.precoFolha}\n`;
      if (produto.precoMetro) texto += `└─ ${produto.precoMetro}\n`;
      texto += `\n`;
    }

    texto += `**📋 CARACTERÍSTICAS:**\n`;
    produto.caracteristicas.forEach(c => texto += `${c}\n`);
    
    texto += `\n**📦 EMBALAGEM:**\n`;
    texto += `└─ ${produto.embalagem}\n`;
    if (produto.totalFolhas) texto += `└─ Total: ${produto.totalFolhas.toLocaleString()} folhas\n`;
    if (produto.totalMetros) texto += `└─ Total: ${produto.totalMetros}m\n`;
    
    if (produto.dimensaoFolha) {
      texto += `\n**📏 ESPECIFICAÇÕES:**\n`;
      texto += `└─ Folha: ${produto.dimensaoFolha}\n`;
      texto += `└─ Gramatura: ${produto.gramatura}\n`;
      if (produto.alvura) texto += `└─ Alvura: ${produto.alvura}\n`;
    }

    if (produto.comodato === "GRATUITO") {
      texto += `\n🎁 **COMODATO GRÁTIS**\n`;
      texto += `└─ Fornecido gratuitamente\n`;
      texto += `└─ Manutenção inclusa\n`;
      texto += `└─ Sem custos adicionais\n`;
    }

    if (produto.rendimentoMedio) {
      texto += `\n**📊 RENDIMENTO:**\n`;
      texto += `└─ ${produto.rendimentoMedio}\n`;
      if (produto.duracaoMedia) texto += `└─ Duração: ${produto.duracaoMedia}\n`;
    }

    texto += `\n**💡 USO IDEAL:**\n${produto.usoIdeal}\n`;
    texto += `\n**✨ BENEFÍCIOS:**\n${produto.beneficios}\n`;
    if (produto.diferencial) texto += `\n**🏆 DIFERENCIAL:**\n${produto.diferencial}\n`;

    return {
      texto,
      opcoes: [
        { texto: "Solicitar Orçamento", acao: "orcamento_" + codigo, icon: "💰" },
        { texto: "Ver Outros Produtos", acao: "produtos", icon: "🛍️" },
        { texto: "Falar com Especialista", acao: "agendar", icon: "📞" },
        { texto: "Menu Principal", acao: "menu", icon: "🏠" }
      ]
    };
  };

  const processarMensagem = async (texto = '', acao = '') => {
    const p = texto.toLowerCase();

    // Sistema de Claude API para perguntas livres
    if (!acao && texto && texto.length > 10) {
      const respostaIA = await gerarRespostaIA(texto);
      return {
        texto: respostaIA,
        opcoes: [
          { texto: "Ver Produtos", acao: "produtos", icon: "🛍️" },
          { texto: "Sobre Comodato", acao: "comodato", icon: "🎁" },
          { texto: "Falar com Especialista", acao: "agendar", icon: "📞" },
          { texto: "Menu", acao: "menu", icon: "🏠" }
        ]
      };
    }

    // Fluxo de ações
    switch(acao) {
      case 'menu':
        setEtapaConversa('inicio');
        return {
          texto: "**Menu Principal**\n\nComo posso ajudar?",
          opcoes: [
            { texto: "Produtos e Preços", acao: "produtos", icon: "🛍️" },
            { texto: "Comodato", acao: "comodato", icon: "🎁" },
            { texto: "Fichas Técnicas", acao: "fichas", icon: "📋" },
            { texto: "Falar com Especialista", acao: "agendar", icon: "📞" },
            { texto: "FAQ", acao: "faq", icon: "❓" },
            { texto: "Para Vendas", acao: "vendas", icon: "🎯" }
          ]
        };

      case 'produtos':
        return {
          texto: `**📦 NOSSOS PRODUTOS**\n\n**PAPEL HIGIÊNICO**\n✦ Personal Professional (Premium)\n✦ Inovatta (Standard/Premium)\n✦ Santher Eco (Econômico)\n\n**PAPEL TOALHA**\n✦ Interfolhado (Eco/Inovatta)\n✦ Bobina (Cozinhas)\n\n**DISPENSERS**\n✦ Todos em COMODATO GRÁTIS!\n\n**HIGIENE DAS MÃOS**\n✦ Sabonete Líquido\n✦ Álcool Gel 70%\n\n**Escolha uma categoria:**`,
          opcoes: [
            { texto: "🧻 Papel Higiênico", acao: "cat_higienico", icon: "🧻" },
            { texto: "🗞️ Papel Toalha", acao: "cat_toalha", icon: "🗞️" },
            { texto: "📱 Dispensers GRÁTIS", acao: "cat_dispensers", icon: "📱" },
            { texto: "🧼 Higiene Mãos", acao: "cat_maos", icon: "🧼" },
            { texto: "Menu", acao: "menu", icon: "🏠" }
          ]
        };

      case 'cat_higienico':
        return {
          texto: `**🧻 PAPEL HIGIÊNICO**\n\n**PREMIUM:**\n✦ PHI12 - Personal Interfolhado FD - R$ 169,90\n✦ PHR25 - Personal Rolão FD 250m - R$ 101,90\n\n**ECONÔMICO:**\n✦ EHR50 - Eco Rolão FS 500m - R$ 125,50\n   (Campeão de vendas para alto fluxo!)\n\n**Escolha para ver ficha completa:**`,
          opcoes: [
            { texto: "PHI12 - Premium Interfolhado", acao: "ficha_PHI12", icon: "⭐" },
            { texto: "PHR25 - Premium Rolão", acao: "ficha_PHR25", icon: "⭐" },
            { texto: "EHR50 - Eco 500m", acao: "ficha_EHR50", icon: "💰" },
            { texto: "Voltar", acao: "produtos", icon: "◀️" }
          ]
        };

      case 'cat_toalha':
        return {
          texto: `**🗞️ PAPEL TOALHA**\n\n**INTERFOLHADO:**\n✦ ETI00 - Eco 3 Dobras - R$ 86,50\n✦ ITI01 - Inovatta FS - R$ 108,90\n✦ ITI02 - Inovatta FD - R$ 132,50 ⭐ MAIS VENDIDO\n✦ ITI03 - Inovatta FT - R$ 154,50 (Premium)\n\n**BOBINA (Cozinhas):**\n✦ ETB20 - Eco 250m - R$ 92,50\n✦ PTB30 - Personal 300m - R$ 134,90\n\n**Escolha:**`,
          opcoes: [
            { texto: "ETI00 - Eco", acao: "ficha_ETI00", icon: "💰" },
            { texto: "ITI02 - Inovatta FD ⭐", acao: "ficha_ITI02", icon: "⭐" },
            { texto: "ITI03 - Premium", acao: "ficha_ITI03", icon: "💎" },
            { texto: "Bobinas", acao: "fichas_bobina", icon: "🍳" },
            { texto: "Voltar", acao: "produtos", icon: "◀️" }
          ]
        };

      case 'cat_dispensers':
        return {
          texto: `**📱 DISPENSERS - 100% GRÁTIS EM COMODATO!**\n\n✅ **ZERO INVESTIMENTO**\n✅ **MANUTENÇÃO INCLUSA**\n✅ **SUBSTITUIÇÃO GRATUITA**\n✅ **ANTI-VANDALISMO**\n\n**TIPOS:**\n• DQH20 - Papel Higiênico Interfolhado\n• DTR50 - Papel Higiênico Rolão (até 500m)\n• DQT20 - Papel Toalha Interfolhado\n• DSL15 - Sabonete Líquido 1,5L\n• DAG15 - Álcool Gel 1,5L\n\n💡 **Todos GRÁTIS no sistema de comodato!**\n\n**Quer conhecer?**`,
          opcoes: [
            { texto: "Como funciona o comodato?", acao: "comodato", icon: "🎁" },
            { texto: "Ver fichas dispensers", acao: "fichas_dispensers", icon: "📋" },
            { texto: "Solicitar visita técnica", acao: "agendar", icon: "📞" },
            { texto: "Voltar", acao: "produtos", icon: "◀️" }
          ]
        };

      case 'comodato':
        const comodato = CONHECIMENTO.comodato;
        let textoComodato = `**🎁 COMODATO JORI PAPEL**\n\n`;
        textoComodato += `${comodato.descricao}\n\n`;
        textoComodato += `**💰 VANTAGENS FINANCEIRAS:**\n`;
        comodato.vantagensFinanceiras.itens.slice(0, 3).forEach(v => {
          textoComodato += `✓ ${v.titulo}\n  └─ ${v.descricao}\n`;
        });
        textoComodato += `\n**🔧 VANTAGENS OPERACIONAIS:**\n`;
        comodato.vantagensOperacionais.itens.slice(0, 3).forEach(v => {
          textoComodato += `✓ ${v.titulo}\n  └─ ${v.descricao}\n`;
        });
        textoComodato += `\n**📞 (21) 3393-5566** para mais informações!`;
        
        return {
          texto: textoComodato,
          opcoes: [
            { texto: "Como funciona (passo a passo)", acao: "comodato_processo", icon: "📋" },
            { texto: "Cases de sucesso", acao: "comodato_cases", icon: "🏆" },
            { texto: "Quero agendar visita!", acao: "agendar", icon: "📞" },
            { texto: "Menu", acao: "menu", icon: "🏠" }
          ]
        };

      case 'comodato_processo':
        let textoProcesso = `**📋 COMO FUNCIONA O COMODATO - PASSO A PASSO**\n\n`;
        CONHECIMENTO.comodato.comoFunciona.forEach(passo => {
          textoProcesso += `**${passo.passo}. ${passo.titulo}**\n`;
          textoProcesso += `└─ ${passo.descricao}\n\n`;
        });
        textoProcesso += `**É simples, rápido e sem riscos!**`;
        
        return {
          texto: textoProcesso,
          opcoes: [
            { texto: "Ver cases de sucesso", acao: "comodato_cases", icon: "🏆" },
            { texto: "Quero começar agora!", acao: "agendar", icon: "📞" },
            { texto: "Mais sobre comodato", acao: "comodato", icon: "🎁" },
            { texto: "Menu", acao: "menu", icon: "🏠" }
          ]
        };

      case 'comodato_cases':
        let textoCases = `**🏆 CASES DE SUCESSO - CLIENTES REAIS**\n\n`;
        CONHECIMENTO.comodato.casesResultados.forEach((caso, idx) => {
          textoCases += `**${idx + 1}. ${caso.empresa}** (${caso.segmento})\n`;
          textoCases += `📊 Resultado: ${caso.resultado}\n`;
          textoCases += `💬 "${caso.depoimento}"\n\n`;
        });
        textoCases += `**Quer resultados similares na sua empresa?**`;
        
        return {
          texto: textoCases,
          opcoes: [
            { texto: "Sim! Agendar visita", acao: "agendar", icon: "📞" },
            { texto: "Ver mais sobre comodato", acao: "comodato", icon: "🎁" },
            { texto: "Ver produtos", acao: "produtos", icon: "🛍️" },
            { texto: "Menu", acao: "menu", icon: "🏠" }
          ]
        };

      case 'faq':
        let textoFAQ = `**❓ PERGUNTAS FREQUENTES**\n\n`;
        CONHECIMENTO.faq.slice(0, 5).forEach((item, idx) => {
          textoFAQ += `**${idx + 1}. ${item.pergunta}**\n${item.resposta}\n\n`;
        });
        textoFAQ += `**Mais dúvidas? Escolha:**`;
        
        return {
          texto: textoFAQ,
          opcoes: [
            { texto: "Mais perguntas", acao: "faq_completo", icon: "❓" },
            { texto: "Falar com especialista", acao: "agendar", icon: "📞" },
            { texto: "Ver produtos", acao: "produtos", icon: "🛍️" },
            { texto: "Menu", acao: "menu", icon: "🏠" }
          ]
        };

      case 'vendas':
        let textoVendas = `**🎯 SUPORTE PARA TIME DE VENDAS**\n\n`;
        textoVendas += `**PRINCIPAIS OBJEÇÕES:**\n`;
        Object.keys(CONHECIMENTO.argumentosVenda.objecoes).slice(0, 3).forEach(objecao => {
          const obj = CONHECIMENTO.argumentosVenda.objecoes[objecao];
          textoVendas += `\n**"${objecao}"**\n`;
          textoVendas += `💡 ${obj.resposta.substring(0, 150)}...\n`;
        });
        textoVendas += `\n**Escolha para ver respostas completas:**`;
        
        return {
          texto: textoVendas,
          opcoes: [
            { texto: "Objeções e respostas", acao: "vendas_objecoes", icon: "🎯" },
            { texto: "Argumentos de venda", acao: "vendas_argumentos", icon: "💪" },
            { texto: "Técnicas de fechamento", acao: "vendas_fechamento", icon: "✅" },
            { texto: "Menu", acao: "menu", icon: "🏠" }
          ]
        };

      case 'agendar':
        setEtapaConversa('agendar_nome');
        return {
          texto: `**📞 VAMOS AGENDAR SUA VISITA TÉCNICA GRATUITA!**\n\nÉ rápido e sem compromisso. Vou coletar algumas informações.\n\n**Qual seu nome?**`
        };

      case 'fichas':
        return {
          texto: `**📋 FICHAS TÉCNICAS COMPLETAS**\n\nEscolha o tipo de produto:`,
          opcoes: [
            { texto: "Papel Higiênico", acao: "cat_higienico", icon: "🧻" },
            { texto: "Papel Toalha", acao: "cat_toalha", icon: "🗞️" },
            { texto: "Dispensers", acao: "fichas_dispensers", icon: "📱" },
            { texto: "Menu", acao: "menu", icon: "🏠" }
          ]
        };

      case 'confirmar_whatsapp':
        const mensagemWhatsApp = encodeURIComponent(
          `Olá! Vim através do site.\n\n` +
          `Nome: ${dadosCliente.nome}\n` +
          `Empresa: ${dadosCliente.empresa}\n` +
          `Segmento: ${dadosCliente.segmento}\n` +
          `Telefone: ${dadosCliente.telefone}\n` +
          `Horário preferido: ${dadosCliente.horario}\n\n` +
          `Gostaria de agendar uma visita técnica gratuita!`
        );
        window.open(`https://wa.me/${CONHECIMENTO.empresa.whatsapp}?text=${mensagemWhatsApp}`, '_blank');
        setEtapaConversa('inicio');
        return {
          texto: `**✅ Perfeito!**\n\nAbrindo WhatsApp com suas informações...\n\nNosso time entrará em contato em breve!\n\n**Obrigado por escolher o Grupo Jori Papel!** 🎉`,
          opcoes: [
            { texto: "Menu Principal", acao: "menu", icon: "🏠" }
          ]
        };

      default:
        // Processa fichas técnicas
        if (acao.startsWith('ficha_')) {
          const codigo = acao.replace('ficha_', '');
          return gerarFichaTecnica(codigo);
        }
        break;
    }

    // Fluxo de agendamento
    if (etapaConversa === 'agendar_nome') {
      setDadosCliente({...dadosCliente, nome: texto});
      setEtapaConversa('agendar_telefone');
      return { texto: `Prazer, **${texto}**! 😊\n\n**Qual seu WhatsApp?**` };
    }
    
    if (etapaConversa === 'agendar_telefone') {
      setDadosCliente({...dadosCliente, telefone: texto});
      setEtapaConversa('agendar_empresa');
      return { texto: `📱 Anotado!\n\n**Nome da sua empresa?**` };
    }
    
    if (etapaConversa === 'agendar_empresa') {
      setDadosCliente({...dadosCliente, empresa: texto});
      setEtapaConversa('agendar_segmento');
      return {
        texto: `🏢 **${texto}**\n\n**Qual o segmento?**`,
        opcoes: [
          { texto: "Clínica/Consultório", acao: "seg_clinica", icon: "🏥" },
          { texto: "Escritório", acao: "seg_escritorio", icon: "🏢" },
          { texto: "Hotel/Pousada", acao: "seg_hotel", icon: "🏨" },
          { texto: "Restaurante/Food", acao: "seg_restaurante", icon: "🍽️" },
          { texto: "Condomínio", acao: "seg_condominio", icon: "🏠" },
          { texto: "Academia/Lazer", acao: "seg_academia", icon: "🏃" },
          { texto: "Outro", acao: "seg_outro", icon: "📋" }
        ]
      };
    }

    if (acao && acao.startsWith('seg_')) {
      const segs = {
        seg_clinica: 'Clínica/Consultório',
        seg_escritorio: 'Escritório',
        seg_hotel: 'Hotel/Pousada',
        seg_restaurante: 'Restaurante/Food Service',
        seg_condominio: 'Condomínio',
        seg_academia: 'Academia/Lazer',
        seg_outro: 'Outro'
      };
      setDadosCliente({...dadosCliente, segmento: segs[acao]});
      setEtapaConversa('agendar_horario');
      return {
        texto: `📋 Perfeito!\n\n**Melhor horário para nossa visita?**`,
        opcoes: [
          { texto: "Manhã (8h-12h)", acao: "hor_manha", icon: "🌅" },
          { texto: "Tarde (13h-18h)", acao: "hor_tarde", icon: "🌞" },
          { texto: "Qualquer horário", acao: "hor_qualquer", icon: "🕐" }
        ]
      };
    }

    if (acao && acao.startsWith('hor_')) {
      const hors = {
        hor_manha: 'Manhã (8h-12h)',
        hor_tarde: 'Tarde (13h-18h)',
        hor_qualquer: 'Qualquer horário'
      };
      const novosDados = {...dadosCliente, horario: hors[acao]};
      setDadosCliente(novosDados);
      setEtapaConversa('inicio');
      
      return {
        texto: `**✅ CONFIRMAÇÃO DOS DADOS**\n\n` +
                `👤 **Nome:** ${novosDados.nome}\n` +
                `📱 **WhatsApp:** ${novosDados.telefone}\n` +
                `🏢 **Empresa:** ${novosDados.empresa}\n` +
                `📋 **Segmento:** ${novosDados.segmento}\n` +
                `🕐 **Horário:** ${novosDados.horario}\n\n` +
                `**Enviar para nosso WhatsApp?**\n` +
                `Nossa equipe entrará em contato em breve!`,
        opcoes: [
          { texto: "✅ Sim, enviar agora!", acao: "confirmar_whatsapp", icon: "✅" },
          { texto: "✏️ Corrigir dados", acao: "agendar", icon: "✏️" }
        ]
      };
    }

    // Busca por palavras-chave no texto livre
    if (p.match(/pre[çc]o|valor|quanto|tabela|or[çc]amento/)) return processarMensagem('', 'produtos');
    if (p.match(/comodato|dispenser|gr[aá]tis|gratuito/)) return processarMensagem('', 'comodato');
    if (p.match(/ficha|t[eé]cnic|especifica/)) return processarMensagem('', 'fichas');
    if (p.match(/falar|contato|agendar|whatsapp|visita/)) return processarMensagem('', 'agendar');
    if (p.match(/d[uú]vida|pergunta|faq/)) return processarMensagem('', 'faq');
    if (p.match(/venda|vendedor|time|equipe|comercial/)) return processarMensagem('', 'vendas');

    // Busca específica por códigos de produtos
    const codigosProdutos = ['PHI12', 'EHR50', 'PHR25', 'ETI00', 'ITI01', 'ITI02', 'ITI03', 'ETB20', 'PTB30'];
    for (const codigo of codigosProdutos) {
      if (p.includes(codigo.toLowerCase())) {
        return gerarFichaTecnica(codigo);
      }
    }

    // Resposta padrão
    return {
      texto: `**Como posso ajudar?**\n\nEscolha uma opção ou digite sua dúvida:`,
      opcoes: [
        { texto: "Ver Produtos", acao: "produtos", icon: "🛍️" },
        { texto: "Sobre Comodato", acao: "comodato", icon: "🎁" },
        { texto: "Perguntas Frequentes", acao: "faq", icon: "❓" },
        { texto: "Falar com Especialista", acao: "agendar", icon: "📞" }
      ]
    };
  };

  const enviarMensagem = async () => {
    if (!input.trim() || carregando) return;
    
    setMensagens(prev => [...prev, { tipo: 'user', texto: input }]);
    const inputTemp = input;
    setInput('');
    
    setTimeout(async () => {
      const resposta = await processarMensagem(inputTemp);
      setMensagens(prev => [...prev, { tipo: 'bot', ...resposta }]);
    }, 500);
  };

  const handleOpcao = async (acao) => {
    const opcaoTexto = mensagens[mensagens.length - 1]?.opcoes?.find(o => o.acao === acao)?.texto;
    if (opcaoTexto) {
      setMensagens(prev => [...prev, { tipo: 'user', texto: opcaoTexto }]);
    }
    
    setTimeout(async () => {
      const resposta = await processarMensagem('', acao);
      setMensagens(prev => [...prev, { tipo: 'bot', ...resposta }]);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header Premium */}
      <header className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-900/90 to-slate-900/90 backdrop-blur-xl shadow-2xl">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-3xl font-black text-white tracking-tight" style={{fontFamily: 'system-ui'}}>
                JORI PAPEL
              </span>
              <span className="text-xs text-amber-400 font-semibold tracking-wider">
                DISTRIBUIDOR OFICIAL SANTHER
              </span>
            </div>
            <div className="hidden md:flex items-center gap-3 ml-4 px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="flex flex-col text-right">
                <span className="text-[10px] text-gray-400">Desde</span>
                <span className="text-2xl font-bold text-amber-400">1986</span>
              </div>
              <div className="text-3xl">🏆</div>
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-400">No mercado</span>
                <span className="text-2xl font-bold text-white">40 anos</span>
              </div>
            </div>
          </div>
          <a 
            href={`https://wa.me/${CONHECIMENTO.empresa.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-2xl text-white font-bold text-sm transition-all shadow-lg hover:shadow-xl hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </header>

      {/* Banner Promocional */}
      <div className="py-3 px-4 text-center bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 shadow-lg">
        <p className="text-sm font-bold text-slate-900 flex items-center justify-center gap-2">
          <span className="text-xl">🎁</span>
          <span>DISPENSERS 100% GRÁTIS EM COMODATO • SEM MULTA • SEM MÍNIMO MENSAL</span>
          <span className="text-xl">🎁</span>
        </p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 max-w-5xl mx-auto w-full">
        <div className="space-y-4">
          {mensagens.map((msg, idx) => (
            <div key={idx}>
              <div className={`flex ${msg.tipo === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-3xl p-5 shadow-xl ${
                  msg.tipo === 'user' 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-md' 
                    : 'bg-white text-slate-800 rounded-bl-md border border-slate-200'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {msg.texto.split('\n').map((line, i) => (
                      <p key={i} dangerouslySetInnerHTML={{ 
                        __html: line
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                          .replace(/✓/g, '<span class="text-green-600">✓</span>')
                          .replace(/✦/g, '<span class="text-blue-600">✦</span>')
                          .replace(/└─/g, '<span class="text-gray-400">└─</span>')
                      }} className="mb-1" />
                    ))}
                  </div>
                </div>
              </div>
              
              {msg.tipo === 'bot' && msg.opcoes && (
                <div className="flex flex-wrap gap-2 mt-4 ml-2">
                  {msg.opcoes.map((opcao, oidx) => (
                    <button
                      key={oidx}
                      onClick={() => handleOpcao(opcao.acao)}
                      className="px-5 py-3 bg-white hover:bg-slate-50 border-2 border-blue-600 rounded-2xl text-blue-700 text-sm font-semibold transition-all hover:shadow-lg hover:scale-105 hover:-translate-y-0.5"
                    >
                      {opcao.icon && <span className="mr-2 text-lg">{opcao.icon}</span>}
                      {opcao.texto}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {carregando && (
            <div className="flex justify-start">
              <div className="bg-white rounded-3xl p-5 shadow-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                  <span className="ml-2 text-sm text-slate-600">Processando...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gradient-to-r from-slate-900/95 to-blue-900/95 border-t border-white/10 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
              placeholder="Digite sua mensagem ou dúvida..."
              disabled={carregando}
              className="flex-1 px-6 py-4 rounded-2xl bg-white/95 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg text-sm"
            />
            <button
              onClick={enviarMensagem}
              disabled={carregando}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {carregando ? '...' : 'Enviar'}
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 text-xs text-gray-300">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg">
              <span>📞</span>
              <span>(21) 3393-5566</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg">
              <span>📱</span>
              <span>(21) 3393-5566</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg">
              <span>🌐</span>
              <span>joripapel.com.br</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg">
              <span>📍</span>
              <span>Higienópolis, RJ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
