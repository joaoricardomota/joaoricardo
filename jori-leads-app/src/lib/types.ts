export interface Lead {
  id: string
  vendedor: string | null
  empresa: string
  contato: string | null
  telefone: string | null
  email: string | null
  segmento: string | null
  origem: string | null
  etapa: EtapaFunil
  interesse: string | null
  valorEstimado: number | null
  ultimoContato: Date | null
  proximoContato: Date | null
  probabilidade: number | null
  observacoes: string | null
  motivoPerda: string | null
  cnpj: string | null
  cidade: string | null
  createdAt: Date
  updatedAt: Date
}

export type EtapaFunil = 
  | 'prospeccao'
  | 'contato_inicial'
  | 'qualificacao'
  | 'proposta'
  | 'negociacao'
  | 'fechado_ganho'
  | 'fechado_perdido'

export const ETAPAS_CONFIG: Record<EtapaFunil, { 
  label: string
  emoji: string
  color: string
  badgeClass: string
  order: number
}> = {
  prospeccao: { 
    label: 'Prospecção', 
    emoji: '1️⃣', 
    color: '#3b82f6',
    badgeClass: 'badge-prospect',
    order: 1 
  },
  contato_inicial: { 
    label: 'Contato Inicial', 
    emoji: '2️⃣', 
    color: '#8b5cf6',
    badgeClass: 'badge-contact',
    order: 2 
  },
  qualificacao: { 
    label: 'Qualificação', 
    emoji: '3️⃣', 
    color: '#f59e0b',
    badgeClass: 'badge-qualified',
    order: 3 
  },
  proposta: { 
    label: 'Proposta', 
    emoji: '4️⃣', 
    color: '#f97316',
    badgeClass: 'badge-proposal',
    order: 4 
  },
  negociacao: { 
    label: 'Negociação', 
    emoji: '5️⃣', 
    color: '#ec4899',
    badgeClass: 'badge-negotiation',
    order: 5 
  },
  fechado_ganho: { 
    label: 'Fechado ✅', 
    emoji: '✅', 
    color: '#22c55e',
    badgeClass: 'badge-won',
    order: 6 
  },
  fechado_perdido: { 
    label: 'Perdido', 
    emoji: '❌', 
    color: '#ef4444',
    badgeClass: 'badge-lost',
    order: 7 
  },
}

export const SEGMENTOS = [
  'Escritório',
  'Indústria',
  'Hospital/Clínica',
  'Restaurante/Hotel',
  'Escola/Universidade',
  'Condomínio',
  'Academia',
  'Shopping',
  'Varejo',
  'Outro',
] as const

export const VENDEDORES = [
  'Débora',
  'Rackel',
  'Roberta',
] as const

export const INTERESSES = [
  'Papel Higiênico',
  'Papel Toalha',
  'Dispensers Comodato',
  'Sabonete Líquido',
  'Álcool Gel',
  'Kit Completo',
  'Outro',
] as const

export interface DashboardStats {
  totalLeads: number
  leadsPorEtapa: Record<EtapaFunil, number>
  valorTotalPipeline: number
  valorPonderado: number
  taxaConversao: number
  leadsSemContato: number
  leadsAtrasados: number
}

export interface FilterState {
  search: string
  etapa: EtapaFunil | 'all'
  vendedor: string | 'all'
  segmento: string | 'all'
}
