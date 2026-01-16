export const FUNIL_ETAPAS = [
  { id: 'novo', nome: 'Novo Lead', cor: '#6366f1', icon: '✨' },
  { id: 'contato', nome: 'Primeiro Contato', cor: '#8b5cf6', icon: '📞' },
  { id: 'qualificado', nome: 'Qualificado', cor: '#06b6d4', icon: '✅' },
  { id: 'proposta', nome: 'Proposta Enviada', cor: '#f59e0b', icon: '📄' },
  { id: 'negociacao', nome: 'Negociação', cor: '#f97316', icon: '🤝' },
  { id: 'visita', nome: 'Visita Agendada', cor: '#ec4899', icon: '📍' },
  { id: 'ganho', nome: 'Fechado Ganho', cor: '#10b981', icon: '🏆' },
  { id: 'perdido', nome: 'Fechado Perdido', cor: '#ef4444', icon: '❌' },
];

export const TAGS = [
  'Clínica',
  'Hotel',
  'Restaurante',
  'Condomínio',
  'Escritório',
  'Indústria',
  'Comércio',
  'Outros',
];

export const VENDEDORES = [
  'Débora',
  'Rackel',
  'Marcelo',
  'Susy',
  'Joyce',
  'Felipe',
  'Mariana',
  'Ludyane',
  'Maryele',
  'Luciana',
  'Guilherme',
];

export const TIPOS_ATIVIDADE = [
  { id: 'ligacao', nome: 'Ligação', icon: '📞' },
  { id: 'visita', nome: 'Visita', icon: '📍' },
  { id: 'email', nome: 'Email', icon: '✉️' },
  { id: 'reuniao', nome: 'Reunião', icon: '🤝' },
  { id: 'followup', nome: 'Follow-up', icon: '🔄' },
];

export const EMAIL_TEMPLATES = [
  {
    nome: 'Apresentação Jori Papel',
    assunto: 'Jori Papel - Soluções em Higiene Profissional',
    corpo: `Prezado(a) {{nome}},

Somos a Jori Papel, distribuidora autorizada Santher há mais de 40 anos no Rio de Janeiro.

Oferecemos um modelo exclusivo de COMODATO onde sua empresa recebe dispensers profissionais gratuitamente, pagando apenas pelos produtos consumíveis.

Benefícios:
• Dispensers modernos sem custo de aquisição
• Produtos de alta qualidade Santher
• Entrega rápida em toda região
• Suporte técnico especializado

Gostaria de agendar uma visita para apresentar nossas soluções?

Atenciosamente,
Equipe Jori Papel
(21) XXXX-XXXX`,
  },
  {
    nome: 'Follow-up Proposta',
    assunto: 'Sua proposta Jori Papel - Próximos passos',
    corpo: `Olá {{nome}},

Espero que esteja bem!

Estou entrando em contato para saber se teve a oportunidade de analisar nossa proposta de comodato.

Fico à disposição para esclarecer qualquer dúvida ou ajustar as condições conforme sua necessidade.

Podemos agendar uma ligação rápida?

Abraços,
Equipe Jori Papel`,
  },
  {
    nome: 'Reativação de Cliente',
    assunto: 'Sentimos sua falta! - Jori Papel',
    corpo: `Olá {{nome}},

Notamos que faz um tempo desde nosso último contato.

Gostaríamos de saber se podemos ajudá-lo novamente com soluções em higiene profissional para sua empresa.

Temos novidades e condições especiais para clientes que retornam!

Podemos conversar?

Atenciosamente,
Equipe Jori Papel`,
  },
];
