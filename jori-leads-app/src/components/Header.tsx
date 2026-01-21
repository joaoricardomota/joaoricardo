'use client'

import { useLeadsStore } from '@/lib/store'
import { 
  Search, 
  Upload, 
  Download, 
  Plus,
  Filter,
  X,
  Menu
} from 'lucide-react'
import { useState, useRef } from 'react'
import { parseExcelToLeads, exportLeadsToExcel } from '@/lib/utils'
import { ETAPAS_CONFIG, VENDEDORES, SEGMENTOS, EtapaFunil } from '@/lib/types'
import * as XLSX from 'xlsx'

interface HeaderProps {
  onNewLead: () => void
}

export function Header({ onNewLead }: HeaderProps) {
  const { 
    filters, 
    setFilters, 
    resetFilters, 
    leads, 
    setLeads, 
    setLoading,
    getFilteredLeads 
  } = useLeadsStore()
  
  const [showFilters, setShowFilters] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      const buffer = await file.arrayBuffer()
      const workbook = XLSX.read(buffer)
      const sheetName = workbook.SheetNames.find(
        name => name.includes('Leads') || name.includes('Contatos')
      ) || workbook.SheetNames[0]
      const worksheet = workbook.Sheets[sheetName]
      const data = XLSX.utils.sheet_to_json(worksheet)
      
      const newLeads = parseExcelToLeads(data)
      setLeads([...leads, ...newLeads])
    } catch (error) {
      console.error('Erro ao importar arquivo:', error)
      alert('Erro ao importar arquivo. Verifique se é um arquivo Excel válido.')
    } finally {
      setLoading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleExport = () => {
    const filteredLeads = getFilteredLeads()
    const data = exportLeadsToExcel(filteredLeads)
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads')
    XLSX.writeFile(workbook, `leads_jori_${new Date().toISOString().split('T')[0]}.xlsx`)
  }

  const hasActiveFilters = 
    filters.etapa !== 'all' || 
    filters.vendedor !== 'all' || 
    filters.segmento !== 'all'

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-gray-700/50 rounded-none">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-4">
        {/* Top row */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-jori-500 to-jori-700 flex items-center justify-center font-display font-bold text-white text-lg">
              J
            </div>
            <div>
              <h1 className="font-display font-bold text-xl text-white">
                Jori Papel
              </h1>
              <p className="text-xs text-gray-400">Gestão de Leads</p>
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por empresa, contato, email, telefone ou CNPJ..."
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
                className="input-field pl-12"
              />
              {filters.search && (
                <button
                  onClick={() => setFilters({ search: '' })}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-secondary flex items-center gap-2 ${hasActiveFilters ? 'border-jori-500 text-jori-400' : ''}`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">Filtros</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-jori-500" />
              )}
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Importar</span>
            </button>
            
            <button
              onClick={handleExport}
              className="btn-secondary flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Exportar</span>
            </button>
            
            <button
              onClick={onNewLead}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Novo Lead</span>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="mt-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              className="input-field pl-12"
            />
          </div>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-800/50 rounded-xl border border-gray-700/50 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-white">Filtros</h3>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-jori-400 hover:text-jori-300 transition-colors"
                >
                  Limpar filtros
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Etapa do Funil</label>
                <select
                  value={filters.etapa}
                  onChange={(e) => setFilters({ etapa: e.target.value as EtapaFunil | 'all' })}
                  className="input-field"
                >
                  <option value="all">Todas as etapas</option>
                  {Object.entries(ETAPAS_CONFIG).map(([key, config]) => (
                    <option key={key} value={key}>
                      {config.emoji} {config.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Vendedor</label>
                <select
                  value={filters.vendedor}
                  onChange={(e) => setFilters({ vendedor: e.target.value })}
                  className="input-field"
                >
                  <option value="all">Todos os vendedores</option>
                  {VENDEDORES.map((v) => (
                    <option key={v} value={v}>{v}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-gray-400 mb-2">Segmento</label>
                <select
                  value={filters.segmento}
                  onChange={(e) => setFilters({ segmento: e.target.value })}
                  className="input-field"
                >
                  <option value="all">Todos os segmentos</option>
                  {SEGMENTOS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
