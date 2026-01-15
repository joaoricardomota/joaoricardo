// Tipos para o sistema de orçamentos

export interface Vendedor {
  nome: string;
  telefone: string;
}

export interface Cliente {
  empresa: string;
  contato: string;
  whatsapp: string;
  email: string;
}

export interface Produto {
  id: string;
  codigo?: string;
  descricao: string;
  unidade: string;
  quantidade: number;
  preco: number;
  total: number;
}

export type CondicaoPagamento = 
  | 'À vista'
  | '7 dias'
  | '14 dias'
  | '21 dias'
  | '28 dias'
  | '30/60 dias'
  | '30/60/90 dias';

export interface Condicoes {
  pagamento: CondicaoPagamento;
  validade: number;
  observacoes: string;
}

export interface Orcamento {
  vendedor: Vendedor;
  cliente: Cliente;
  produtos: Produto[];
  condicoes: Condicoes;
  total: number;
  dataEmissao: Date;
  numero?: string;
}

export interface ConfiguracaoImagens {
  logo: string | null;
  banner: string | null;
}

export interface DashboardStats {
  totalOrcamentos: number;
  ticketMedio: number;
  valorTotal: number;
  crescimentoMensal: number;
}
