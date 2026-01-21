import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { Lead, EtapaFunil } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function formatPhone(phone: string | null): string {
  if (!phone) return '-'
  return phone
}

export function formatDate(date: Date | string | null): string {
  if (!date) return '-'
  const d = new Date(date)
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(d)
}

export function formatDateRelative(date: Date | string | null): string {
  if (!date) return '-'
  const d = new Date(date)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Hoje'
  if (diffDays === 1) return 'Ontem'
  if (diffDays < 7) return `${diffDays} dias atrás`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} semanas atrás`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} meses atrás`
  return formatDate(date)
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function parseExcelToLeads(data: any[]): Lead[] {
  return data.map((row, index) => {
    let etapa: EtapaFunil = 'prospeccao'
    const etapaStr = row['Etapa Funil'] || row['etapa'] || ''
    if (etapaStr.includes('CONTATO')) etapa = 'contato_inicial'
    else if (etapaStr.includes('QUALIF')) etapa = 'qualificacao'
    else if (etapaStr.includes('PROPOSTA')) etapa = 'proposta'
    else if (etapaStr.includes('NEGOC')) etapa = 'negociacao'
    else if (etapaStr.includes('GANHO') || etapaStr.includes('✅')) etapa = 'fechado_ganho'
    else if (etapaStr.includes('PERDIDO') || etapaStr.includes('❌')) etapa = 'fechado_perdido'

    // Extrair CNPJ das observações se existir
    const obs = row['Observações'] || row['observacoes'] || ''
    let cnpj = row['CNPJ/CPF'] || row['cnpj'] || null
    let cidade = row['Cidade'] || row['cidade'] || null
    
    if (obs && !cnpj) {
      const cnpjMatch = obs.match(/CNPJ:\s*([\d./-]+)/)
      if (cnpjMatch) cnpj = cnpjMatch[1]
    }
    if (obs && !cidade) {
      const cidadeMatch = obs.match(/Cidade:\s*([^|]+)/)
      if (cidadeMatch) cidade = cidadeMatch[1].trim()
    }

    return {
      id: generateId() + index,
      vendedor: row['Vendedor'] || row['vendedor'] || null,
      empresa: row['Empresa/Cliente'] || row['Nome'] || row['empresa'] || `Lead ${index + 1}`,
      contato: row['Contato'] || row['Contato '] || row['contato'] || null,
      telefone: row['Telefone'] || row['Telefone '] || row['telefone'] || null,
      email: row['Email'] || row['email'] || null,
      segmento: row['Segmento'] || row['segmento'] || null,
      origem: row['Origem Lead'] || row['Origem'] || row['origem'] || null,
      etapa,
      interesse: row['Interesse Principal'] || row['interesse'] || null,
      valorEstimado: parseFloat(row['Valor Estimado (R$)']) || null,
      ultimoContato: row['Último Contato'] || row['Data do contato '] || null,
      proximoContato: row['Próximo Contato'] || row['Data próximo contato '] || null,
      probabilidade: parseFloat(row['Probabilidade (%)']) || null,
      observacoes: obs || null,
      motivoPerda: row['Motivo Perda'] || null,
      cnpj,
      cidade,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  })
}

export function exportLeadsToExcel(leads: Lead[]): any[] {
  return leads.map((lead) => ({
    'Vendedor': lead.vendedor || '',
    'Empresa/Cliente': lead.empresa,
    'Contato': lead.contato || '',
    'Telefone': lead.telefone || '',
    'Email': lead.email || '',
    'Segmento': lead.segmento || '',
    'Origem Lead': lead.origem || '',
    'Etapa Funil': lead.etapa,
    'Interesse Principal': lead.interesse || '',
    'Valor Estimado (R$)': lead.valorEstimado || '',
    'Último Contato': lead.ultimoContato ? formatDate(lead.ultimoContato) : '',
    'Próximo Contato': lead.proximoContato ? formatDate(lead.proximoContato) : '',
    'Probabilidade (%)': lead.probabilidade || '',
    'Observações': lead.observacoes || '',
    'CNPJ': lead.cnpj || '',
    'Cidade': lead.cidade || '',
  }))
}
