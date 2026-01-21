'use client'

import { useState, useEffect } from 'react'
import { useLeadsStore } from '@/lib/store'
import { Lead } from '@/lib/types'
import { Header } from '@/components/Header'
import { StatsCards, FunnelOverview } from '@/components/StatsCards'
import { LeadsTable } from '@/components/LeadsTable'
import { LeadModal } from '@/components/LeadModal'
import { KanbanBoard } from '@/components/KanbanBoard'
import { LoadingOverlay } from '@/components/Loading'
import { LayoutGrid, Table, TrendingUp } from 'lucide-react'

type ViewMode = 'table' | 'kanban'

export default function HomePage() {
  const { isLoading, leads } = useLeadsStore()
  const [viewMode, setViewMode] = useState<ViewMode>('table')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleNewLead = () => {
    setEditingLead(null)
    setIsModalOpen(true)
  }

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingLead(null)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-gray-700 border-t-jori-500 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {isLoading && <LoadingOverlay />}
      
      <Header onNewLead={handleNewLead} />

      <main className="max-w-[1800px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Stats */}
        <StatsCards />

        {/* Content area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main content */}
          <div className="lg:col-span-3 space-y-4">
            {/* View switcher */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 p-1 bg-gray-800/50 rounded-xl">
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'table'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Table className="w-4 h-4" />
                  Tabela
                </button>
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    viewMode === 'kanban'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  Kanban
                </button>
              </div>

              <p className="text-sm text-gray-400">
                {leads.length.toLocaleString('pt-BR')} leads no total
              </p>
            </div>

            {/* View content */}
            {viewMode === 'table' ? (
              <LeadsTable onEditLead={handleEditLead} />
            ) : (
              <KanbanBoard onEditLead={handleEditLead} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <FunnelOverview />
            
            {/* Quick tips */}
            <div className="glass-card p-6">
              <h3 className="font-display font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-jori-400" />
                Dicas Rápidas
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-jori-400">•</span>
                  Importe sua planilha Excel para começar
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-jori-400">•</span>
                  Use filtros para encontrar leads específicos
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-jori-400">•</span>
                  Arraste cards no Kanban para mover etapas
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-jori-400">•</span>
                  Selecione múltiplos leads para ações em lote
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-jori-400">•</span>
                  Exporte os dados filtrados a qualquer momento
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      <LeadModal
        lead={editingLead}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}
