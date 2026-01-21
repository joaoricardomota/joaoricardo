'use client'

import { useLeadsStore } from '@/lib/store'
import { Lead, ETAPAS_CONFIG, EtapaFunil } from '@/lib/types'
import { cn, formatPhone, formatCurrency } from '@/lib/utils'
import { Phone, Mail, GripVertical, Building2 } from 'lucide-react'
import { useState } from 'react'

interface KanbanBoardProps {
  onEditLead: (lead: Lead) => void
}

export function KanbanBoard({ onEditLead }: KanbanBoardProps) {
  const { getFilteredLeads, updateLead } = useLeadsStore()
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null)
  const [dragOverColumn, setDragOverColumn] = useState<EtapaFunil | null>(null)

  const leads = getFilteredLeads()

  const columns: EtapaFunil[] = [
    'prospeccao',
    'contato_inicial',
    'qualificacao',
    'proposta',
    'negociacao',
    'fechado_ganho',
  ]

  const getLeadsByEtapa = (etapa: EtapaFunil) => 
    leads.filter(l => l.etapa === etapa).slice(0, 50) // Limitar para performance

  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    setDraggedLead(lead)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent, etapa: EtapaFunil) => {
    e.preventDefault()
    setDragOverColumn(etapa)
  }

  const handleDragLeave = () => {
    setDragOverColumn(null)
  }

  const handleDrop = (e: React.DragEvent, etapa: EtapaFunil) => {
    e.preventDefault()
    if (draggedLead && draggedLead.etapa !== etapa) {
      updateLead(draggedLead.id, { etapa })
    }
    setDraggedLead(null)
    setDragOverColumn(null)
  }

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-4 min-w-max">
        {columns.map((etapa) => {
          const config = ETAPAS_CONFIG[etapa]
          const columnLeads = getLeadsByEtapa(etapa)
          const totalLeads = leads.filter(l => l.etapa === etapa).length
          const isDragOver = dragOverColumn === etapa

          return (
            <div
              key={etapa}
              className={cn(
                'w-80 flex-shrink-0 rounded-2xl transition-colors',
                isDragOver ? 'bg-jori-500/10 ring-2 ring-jori-500/50' : 'bg-gray-900/30'
              )}
              onDragOver={(e) => handleDragOver(e, etapa)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, etapa)}
            >
              {/* Column header */}
              <div className="p-4 border-b border-gray-700/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: config.color }}
                    />
                    <h3 className="font-medium text-white">
                      {config.emoji} {config.label}
                    </h3>
                  </div>
                  <span className="text-sm text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">
                    {totalLeads}
                  </span>
                </div>
              </div>

              {/* Cards */}
              <div className="p-3 space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
                {columnLeads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, lead)}
                    onClick={() => onEditLead(lead)}
                    className={cn(
                      'glass-card-hover p-4 cursor-pointer group',
                      draggedLead?.id === lead.id && 'opacity-50'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <GripVertical className="w-4 h-4 text-gray-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate">
                          {lead.empresa}
                        </p>
                        
                        {lead.contato && (
                          <p className="text-sm text-gray-400 truncate">
                            {lead.contato}
                          </p>
                        )}

                        <div className="mt-3 space-y-1">
                          {lead.telefone && (
                            <a 
                              href={`tel:${lead.telefone}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-jori-400 transition-colors"
                            >
                              <Phone className="w-3 h-3" />
                              {formatPhone(lead.telefone)}
                            </a>
                          )}
                          
                          {lead.email && (
                            <a
                              href={`mailto:${lead.email}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-jori-400 transition-colors truncate"
                            >
                              <Mail className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{lead.email}</span>
                            </a>
                          )}
                        </div>

                        {lead.valorEstimado && (
                          <div className="mt-3 pt-3 border-t border-gray-700/50">
                            <p className="text-sm font-medium text-jori-400">
                              {formatCurrency(lead.valorEstimado)}
                            </p>
                          </div>
                        )}

                        {lead.vendedor && (
                          <div className="mt-2">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">
                              {lead.vendedor}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {columnLeads.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Building2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Nenhum lead</p>
                  </div>
                )}

                {totalLeads > 50 && (
                  <p className="text-center text-xs text-gray-500 py-2">
                    +{totalLeads - 50} leads não exibidos
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
