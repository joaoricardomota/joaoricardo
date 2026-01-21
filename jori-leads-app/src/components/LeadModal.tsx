'use client'

import { useState, useEffect } from 'react'
import { Lead, ETAPAS_CONFIG, SEGMENTOS, VENDEDORES, INTERESSES, EtapaFunil } from '@/lib/types'
import { useLeadsStore } from '@/lib/store'
import { generateId } from '@/lib/utils'
import { X, Save, Building2, User, Phone, Mail, DollarSign, Calendar, FileText } from 'lucide-react'

interface LeadModalProps {
  lead: Lead | null
  isOpen: boolean
  onClose: () => void
}

export function LeadModal({ lead, isOpen, onClose }: LeadModalProps) {
  const { addLead, updateLead } = useLeadsStore()
  
  const [formData, setFormData] = useState<Partial<Lead>>({
    empresa: '',
    contato: '',
    telefone: '',
    email: '',
    segmento: '',
    vendedor: '',
    etapa: 'prospeccao',
    interesse: '',
    valorEstimado: null,
    proximoContato: null,
    probabilidade: null,
    observacoes: '',
    cnpj: '',
    cidade: '',
  })

  useEffect(() => {
    if (lead) {
      setFormData({
        ...lead,
        proximoContato: lead.proximoContato 
          ? new Date(lead.proximoContato).toISOString().split('T')[0] 
          : null,
      })
    } else {
      setFormData({
        empresa: '',
        contato: '',
        telefone: '',
        email: '',
        segmento: '',
        vendedor: '',
        etapa: 'prospeccao',
        interesse: '',
        valorEstimado: null,
        proximoContato: null,
        probabilidade: null,
        observacoes: '',
        cnpj: '',
        cidade: '',
      })
    }
  }, [lead, isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.empresa?.trim()) {
      alert('O nome da empresa é obrigatório')
      return
    }

    const now = new Date()
    
    if (lead) {
      updateLead(lead.id, {
        ...formData,
        proximoContato: formData.proximoContato ? new Date(formData.proximoContato as any) : null,
      })
    } else {
      const newLead: Lead = {
        id: generateId(),
        empresa: formData.empresa!,
        contato: formData.contato || null,
        telefone: formData.telefone || null,
        email: formData.email || null,
        segmento: formData.segmento || null,
        vendedor: formData.vendedor || null,
        origem: 'Manual',
        etapa: formData.etapa as EtapaFunil,
        interesse: formData.interesse || null,
        valorEstimado: formData.valorEstimado || null,
        ultimoContato: now,
        proximoContato: formData.proximoContato ? new Date(formData.proximoContato as any) : null,
        probabilidade: formData.probabilidade || null,
        observacoes: formData.observacoes || null,
        motivoPerda: null,
        cnpj: formData.cnpj || null,
        cidade: formData.cidade || null,
        createdAt: now,
        updatedAt: now,
      }
      addLead(newLead)
    }
    
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-gray-700/50 bg-gray-900/90 backdrop-blur-sm">
          <h2 className="font-display font-semibold text-xl text-white">
            {lead ? 'Editar Lead' : 'Novo Lead'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Dados da Empresa */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide flex items-center gap-2">
              <Building2 className="w-4 h-4" /> Dados da Empresa
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">
                  Nome da Empresa *
                </label>
                <input
                  type="text"
                  value={formData.empresa || ''}
                  onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                  className="input-field"
                  placeholder="Nome da empresa"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">CNPJ</label>
                <input
                  type="text"
                  value={formData.cnpj || ''}
                  onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                  className="input-field font-mono"
                  placeholder="00.000.000/0000-00"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Cidade</label>
                <input
                  type="text"
                  value={formData.cidade || ''}
                  onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                  className="input-field"
                  placeholder="Cidade"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Segmento</label>
                <select
                  value={formData.segmento || ''}
                  onChange={(e) => setFormData({ ...formData, segmento: e.target.value })}
                  className="input-field"
                >
                  <option value="">Selecione...</option>
                  {SEGMENTOS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Dados do Contato */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide flex items-center gap-2">
              <User className="w-4 h-4" /> Dados do Contato
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Nome do Contato
                </label>
                <input
                  type="text"
                  value={formData.contato || ''}
                  onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
                  className="input-field"
                  placeholder="Nome do contato"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" /> Telefone
                </label>
                <input
                  type="tel"
                  value={formData.telefone || ''}
                  onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                  className="input-field"
                  placeholder="(21) 99999-9999"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" /> Email
                </label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                  placeholder="email@empresa.com.br"
                />
              </div>
            </div>
          </div>

          {/* Dados Comerciais */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Dados Comerciais
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Vendedor</label>
                <select
                  value={formData.vendedor || ''}
                  onChange={(e) => setFormData({ ...formData, vendedor: e.target.value })}
                  className="input-field"
                >
                  <option value="">Selecione...</option>
                  {VENDEDORES.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Etapa do Funil</label>
                <select
                  value={formData.etapa || 'prospeccao'}
                  onChange={(e) => setFormData({ ...formData, etapa: e.target.value as EtapaFunil })}
                  className="input-field"
                >
                  {Object.entries(ETAPAS_CONFIG).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.emoji} {config.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Interesse Principal</label>
                <select
                  value={formData.interesse || ''}
                  onChange={(e) => setFormData({ ...formData, interesse: e.target.value })}
                  className="input-field"
                >
                  <option value="">Selecione...</option>
                  {INTERESSES.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Valor Estimado (R$)</label>
                <input
                  type="number"
                  value={formData.valorEstimado || ''}
                  onChange={(e) => setFormData({ ...formData, valorEstimado: parseFloat(e.target.value) || null })}
                  className="input-field"
                  placeholder="0,00"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Probabilidade (%)</label>
                <input
                  type="number"
                  value={formData.probabilidade || ''}
                  onChange={(e) => setFormData({ ...formData, probabilidade: parseFloat(e.target.value) || null })}
                  className="input-field"
                  placeholder="0"
                  min="0"
                  max="100"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" /> Próximo Contato
                </label>
                <input
                  type="date"
                  value={formData.proximoContato as string || ''}
                  onChange={(e) => setFormData({ ...formData, proximoContato: e.target.value as any })}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Observações */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide flex items-center gap-2">
              <FileText className="w-4 h-4" /> Observações
            </h3>
            
            <textarea
              value={formData.observacoes || ''}
              onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
              className="input-field min-h-[100px] resize-y"
              placeholder="Anotações sobre o lead..."
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-700/50">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {lead ? 'Salvar Alterações' : 'Criar Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
