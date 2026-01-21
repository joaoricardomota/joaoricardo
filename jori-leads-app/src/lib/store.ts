import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Lead, EtapaFunil, FilterState, DashboardStats, ETAPAS_CONFIG } from './types'

interface LeadsStore {
  leads: Lead[]
  filters: FilterState
  selectedLeads: Set<string>
  isLoading: boolean
  
  // Actions
  setLeads: (leads: Lead[]) => void
  addLead: (lead: Lead) => void
  updateLead: (id: string, updates: Partial<Lead>) => void
  deleteLead: (id: string) => void
  deleteLeads: (ids: string[]) => void
  
  setFilters: (filters: Partial<FilterState>) => void
  resetFilters: () => void
  
  toggleSelectLead: (id: string) => void
  selectAllLeads: () => void
  clearSelection: () => void
  
  bulkUpdateEtapa: (ids: string[], etapa: EtapaFunil) => void
  bulkUpdateVendedor: (ids: string[], vendedor: string) => void
  
  setLoading: (loading: boolean) => void
  
  // Computed
  getFilteredLeads: () => Lead[]
  getStats: () => DashboardStats
}

const defaultFilters: FilterState = {
  search: '',
  etapa: 'all',
  vendedor: 'all',
  segmento: 'all',
}

export const useLeadsStore = create<LeadsStore>()(
  persist(
    (set, get) => ({
      leads: [],
      filters: defaultFilters,
      selectedLeads: new Set(),
      isLoading: false,

      setLeads: (leads) => set({ leads }),
      
      addLead: (lead) => set((state) => ({ 
        leads: [lead, ...state.leads] 
      })),
      
      updateLead: (id, updates) => set((state) => ({
        leads: state.leads.map((lead) =>
          lead.id === id ? { ...lead, ...updates, updatedAt: new Date() } : lead
        ),
      })),
      
      deleteLead: (id) => set((state) => ({
        leads: state.leads.filter((lead) => lead.id !== id),
        selectedLeads: new Set([...state.selectedLeads].filter((sid) => sid !== id)),
      })),
      
      deleteLeads: (ids) => set((state) => ({
        leads: state.leads.filter((lead) => !ids.includes(lead.id)),
        selectedLeads: new Set(),
      })),

      setFilters: (filters) => set((state) => ({
        filters: { ...state.filters, ...filters },
      })),
      
      resetFilters: () => set({ filters: defaultFilters }),

      toggleSelectLead: (id) => set((state) => {
        const newSelected = new Set(state.selectedLeads)
        if (newSelected.has(id)) {
          newSelected.delete(id)
        } else {
          newSelected.add(id)
        }
        return { selectedLeads: newSelected }
      }),
      
      selectAllLeads: () => set((state) => ({
        selectedLeads: new Set(get().getFilteredLeads().map((l) => l.id)),
      })),
      
      clearSelection: () => set({ selectedLeads: new Set() }),

      bulkUpdateEtapa: (ids, etapa) => set((state) => ({
        leads: state.leads.map((lead) =>
          ids.includes(lead.id) ? { ...lead, etapa, updatedAt: new Date() } : lead
        ),
        selectedLeads: new Set(),
      })),
      
      bulkUpdateVendedor: (ids, vendedor) => set((state) => ({
        leads: state.leads.map((lead) =>
          ids.includes(lead.id) ? { ...lead, vendedor, updatedAt: new Date() } : lead
        ),
        selectedLeads: new Set(),
      })),

      setLoading: (isLoading) => set({ isLoading }),

      getFilteredLeads: () => {
        const { leads, filters } = get()
        return leads.filter((lead) => {
          if (filters.search) {
            const search = filters.search.toLowerCase()
            const matchesSearch = 
              lead.empresa?.toLowerCase().includes(search) ||
              lead.contato?.toLowerCase().includes(search) ||
              lead.email?.toLowerCase().includes(search) ||
              lead.telefone?.includes(search) ||
              lead.cnpj?.includes(search)
            if (!matchesSearch) return false
          }
          if (filters.etapa !== 'all' && lead.etapa !== filters.etapa) return false
          if (filters.vendedor !== 'all' && lead.vendedor !== filters.vendedor) return false
          if (filters.segmento !== 'all' && lead.segmento !== filters.segmento) return false
          return true
        })
      },

      getStats: () => {
        const { leads } = get()
        const now = new Date()
        
        const leadsPorEtapa = Object.keys(ETAPAS_CONFIG).reduce((acc, etapa) => {
          acc[etapa as EtapaFunil] = leads.filter((l) => l.etapa === etapa).length
          return acc
        }, {} as Record<EtapaFunil, number>)

        const leadsAtivos = leads.filter(
          (l) => l.etapa !== 'fechado_ganho' && l.etapa !== 'fechado_perdido'
        )

        const valorTotalPipeline = leadsAtivos.reduce(
          (sum, l) => sum + (l.valorEstimado || 0), 
          0
        )

        const valorPonderado = leadsAtivos.reduce(
          (sum, l) => sum + (l.valorEstimado || 0) * ((l.probabilidade || 0) / 100),
          0
        )

        const ganhos = leads.filter((l) => l.etapa === 'fechado_ganho').length
        const perdidos = leads.filter((l) => l.etapa === 'fechado_perdido').length
        const taxaConversao = ganhos + perdidos > 0 
          ? (ganhos / (ganhos + perdidos)) * 100 
          : 0

        const leadsSemContato = leads.filter((l) => !l.ultimoContato).length

        const leadsAtrasados = leads.filter((l) => {
          if (!l.proximoContato) return false
          return new Date(l.proximoContato) < now
        }).length

        return {
          totalLeads: leads.length,
          leadsPorEtapa,
          valorTotalPipeline,
          valorPonderado,
          taxaConversao,
          leadsSemContato,
          leadsAtrasados,
        }
      },
    }),
    {
      name: 'jori-leads-storage',
      partialize: (state) => ({ 
        leads: state.leads,
        filters: state.filters,
      }),
    }
  )
)
