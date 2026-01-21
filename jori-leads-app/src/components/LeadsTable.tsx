'use client'

import { useLeadsStore } from '@/lib/store'
import { Lead, ETAPAS_CONFIG, EtapaFunil } from '@/lib/types'
import { formatPhone, formatDateRelative, cn } from '@/lib/utils'
import { 
  ChevronDown, 
  ChevronUp, 
  MoreVertical,
  Phone,
  Mail,
  Building2,
  User,
  Edit,
  Trash2,
  CheckSquare,
  Square,
  ArrowRight
} from 'lucide-react'
import { useState, useMemo, useCallback, useRef, useEffect } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

interface LeadsTableProps {
  onEditLead: (lead: Lead) => void
}

type SortField = 'empresa' | 'etapa' | 'ultimoContato' | 'valorEstimado'
type SortDir = 'asc' | 'desc'

export function LeadsTable({ onEditLead }: LeadsTableProps) {
  const { 
    getFilteredLeads, 
    selectedLeads, 
    toggleSelectLead, 
    selectAllLeads, 
    clearSelection,
    deleteLead,
    updateLead,
    bulkUpdateEtapa,
    bulkUpdateVendedor
  } = useLeadsStore()
  
  const [sortField, setSortField] = useState<SortField>('empresa')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [contextMenu, setContextMenu] = useState<{ leadId: string; x: number; y: number } | null>(null)
  const [showBulkActions, setShowBulkActions] = useState(false)

  const parentRef = useRef<HTMLDivElement>(null)

  const filteredLeads = getFilteredLeads()

  const sortedLeads = useMemo(() => {
    return [...filteredLeads].sort((a, b) => {
      let comparison = 0
      
      switch (sortField) {
        case 'empresa':
          comparison = (a.empresa || '').localeCompare(b.empresa || '')
          break
        case 'etapa':
          comparison = ETAPAS_CONFIG[a.etapa].order - ETAPAS_CONFIG[b.etapa].order
          break
        case 'ultimoContato':
          const dateA = a.ultimoContato ? new Date(a.ultimoContato).getTime() : 0
          const dateB = b.ultimoContato ? new Date(b.ultimoContato).getTime() : 0
          comparison = dateA - dateB
          break
        case 'valorEstimado':
          comparison = (a.valorEstimado || 0) - (b.valorEstimado || 0)
          break
      }
      
      return sortDir === 'asc' ? comparison : -comparison
    })
  }, [filteredLeads, sortField, sortDir])

  const rowVirtualizer = useVirtualizer({
    count: sortedLeads.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    overscan: 20,
  })

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null
    return sortDir === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />
  }

  const handleContextMenu = (e: React.MouseEvent, leadId: string) => {
    e.preventDefault()
    setContextMenu({ leadId, x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    const handleClick = () => setContextMenu(null)
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  const allSelected = selectedLeads.size === sortedLeads.length && sortedLeads.length > 0
  const someSelected = selectedLeads.size > 0

  const moveToNextStage = (lead: Lead) => {
    const stages: EtapaFunil[] = ['prospeccao', 'contato_inicial', 'qualificacao', 'proposta', 'negociacao', 'fechado_ganho']
    const currentIndex = stages.indexOf(lead.etapa)
    if (currentIndex < stages.length - 1) {
      updateLead(lead.id, { etapa: stages[currentIndex + 1] })
    }
  }

  return (
    <div className="glass-card overflow-hidden">
      {/* Bulk actions bar */}
      {someSelected && (
        <div className="px-4 py-3 bg-jori-500/10 border-b border-jori-500/30 flex items-center justify-between animate-slide-up">
          <span className="text-sm text-jori-300">
            {selectedLeads.size} lead{selectedLeads.size > 1 ? 's' : ''} selecionado{selectedLeads.size > 1 ? 's' : ''}
          </span>
          <div className="flex items-center gap-2">
            <select
              onChange={(e) => {
                if (e.target.value) {
                  bulkUpdateEtapa([...selectedLeads], e.target.value as EtapaFunil)
                  e.target.value = ''
                }
              }}
              className="px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white"
              defaultValue=""
            >
              <option value="" disabled>Mover para...</option>
              {Object.entries(ETAPAS_CONFIG).map(([key, config]) => (
                <option key={key} value={key}>{config.emoji} {config.label}</option>
              ))}
            </select>
            <button
              onClick={clearSelection}
              className="px-3 py-1.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Table header */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-700/50 bg-gray-800/30 text-sm font-medium text-gray-400">
        <div className="col-span-1 flex items-center">
          <button
            onClick={() => allSelected ? clearSelection() : selectAllLeads()}
            className="p-1 hover:bg-gray-700 rounded transition-colors"
          >
            {allSelected ? (
              <CheckSquare className="w-5 h-5 text-jori-400" />
            ) : (
              <Square className="w-5 h-5" />
            )}
          </button>
        </div>
        <button
          onClick={() => handleSort('empresa')}
          className="col-span-3 flex items-center gap-1 hover:text-white transition-colors text-left"
        >
          Empresa <SortIcon field="empresa" />
        </button>
        <div className="col-span-2">Contato</div>
        <button
          onClick={() => handleSort('etapa')}
          className="col-span-2 flex items-center gap-1 hover:text-white transition-colors text-left"
        >
          Etapa <SortIcon field="etapa" />
        </button>
        <button
          onClick={() => handleSort('ultimoContato')}
          className="col-span-2 flex items-center gap-1 hover:text-white transition-colors text-left"
        >
          Último Contato <SortIcon field="ultimoContato" />
        </button>
        <div className="col-span-2 text-right">Ações</div>
      </div>

      {/* Virtualized rows */}
      <div
        ref={parentRef}
        className="overflow-auto"
        style={{ height: 'calc(100vh - 400px)', minHeight: '400px' }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const lead = sortedLeads[virtualRow.index]
            const isSelected = selectedLeads.has(lead.id)
            const config = ETAPAS_CONFIG[lead.etapa]

            return (
              <div
                key={lead.id}
                className={cn(
                  'absolute top-0 left-0 w-full grid grid-cols-12 gap-4 px-4 py-4 border-b border-gray-800/50 transition-colors',
                  isSelected ? 'bg-jori-500/10' : 'hover:bg-gray-800/30'
                )}
                style={{
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                onContextMenu={(e) => handleContextMenu(e, lead.id)}
              >
                <div className="col-span-1 flex items-center">
                  <button
                    onClick={() => toggleSelectLead(lead.id)}
                    className="p-1 hover:bg-gray-700 rounded transition-colors"
                  >
                    {isSelected ? (
                      <CheckSquare className="w-5 h-5 text-jori-400" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                </div>

                <div className="col-span-3 flex flex-col justify-center min-w-0">
                  <p className="font-medium text-white truncate">{lead.empresa}</p>
                  {lead.cnpj && (
                    <p className="text-xs text-gray-500 font-mono truncate">{lead.cnpj}</p>
                  )}
                </div>

                <div className="col-span-2 flex flex-col justify-center min-w-0">
                  {lead.telefone && (
                    <a 
                      href={`tel:${lead.telefone}`}
                      className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-jori-400 transition-colors truncate"
                    >
                      <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{formatPhone(lead.telefone)}</span>
                    </a>
                  )}
                  {lead.email && (
                    <a
                      href={`mailto:${lead.email}`}
                      className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-jori-400 transition-colors truncate"
                    >
                      <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{lead.email}</span>
                    </a>
                  )}
                </div>

                <div className="col-span-2 flex items-center">
                  <span className={cn('badge', config.badgeClass)}>
                    {config.emoji} {config.label}
                  </span>
                </div>

                <div className="col-span-2 flex items-center text-sm text-gray-400">
                  {formatDateRelative(lead.ultimoContato)}
                </div>

                <div className="col-span-2 flex items-center justify-end gap-1">
                  {lead.etapa !== 'fechado_ganho' && lead.etapa !== 'fechado_perdido' && (
                    <button
                      onClick={() => moveToNextStage(lead)}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors group"
                      title="Avançar etapa"
                    >
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-jori-400" />
                    </button>
                  )}
                  <button
                    onClick={() => onEditLead(lead)}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors group"
                    title="Editar"
                  >
                    <Edit className="w-4 h-4 text-gray-400 group-hover:text-white" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Excluir este lead?')) {
                        deleteLead(lead.id)
                      }
                    }}
                    className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                    title="Excluir"
                  >
                    <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Empty state */}
      {sortedLeads.length === 0 && (
        <div className="py-20 text-center">
          <Building2 className="w-12 h-12 mx-auto text-gray-600 mb-4" />
          <p className="text-gray-400">Nenhum lead encontrado</p>
          <p className="text-sm text-gray-500 mt-1">
            Importe uma planilha ou adicione um novo lead
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-700/50 bg-gray-800/30 text-sm text-gray-400">
        Mostrando {sortedLeads.length.toLocaleString('pt-BR')} leads
      </div>

      {/* Context menu */}
      {contextMenu && (
        <div
          className="fixed z-50 glass-card py-2 min-w-[180px] animate-fade-in"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button
            onClick={() => {
              const lead = sortedLeads.find(l => l.id === contextMenu.leadId)
              if (lead) onEditLead(lead)
              setContextMenu(null)
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
          >
            <Edit className="w-4 h-4" /> Editar
          </button>
          <button
            onClick={() => {
              const lead = sortedLeads.find(l => l.id === contextMenu.leadId)
              if (lead) moveToNextStage(lead)
              setContextMenu(null)
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
          >
            <ArrowRight className="w-4 h-4" /> Avançar Etapa
          </button>
          <hr className="my-2 border-gray-700" />
          <button
            onClick={() => {
              if (confirm('Excluir este lead?')) {
                deleteLead(contextMenu.leadId)
              }
              setContextMenu(null)
            }}
            className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/20 flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" /> Excluir
          </button>
        </div>
      )}
    </div>
  )
}
