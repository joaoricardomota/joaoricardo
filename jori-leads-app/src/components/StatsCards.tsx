'use client'

import { useLeadsStore } from '@/lib/store'
import { formatCurrency } from '@/lib/utils'
import { ETAPAS_CONFIG } from '@/lib/types'
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  AlertCircle,
  Clock,
  Target
} from 'lucide-react'

export function StatsCards() {
  const stats = useLeadsStore((state) => state.getStats())

  const cards = [
    {
      label: 'Total de Leads',
      value: stats.totalLeads.toLocaleString('pt-BR'),
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Pipeline Total',
      value: formatCurrency(stats.valorTotalPipeline),
      icon: DollarSign,
      color: 'text-jori-400',
      bgColor: 'bg-jori-500/10',
    },
    {
      label: 'Valor Ponderado',
      value: formatCurrency(stats.valorPonderado),
      icon: Target,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      label: 'Taxa de Conversão',
      value: `${stats.taxaConversao.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
    },
    {
      label: 'Sem Contato',
      value: stats.leadsSemContato.toLocaleString('pt-BR'),
      icon: Clock,
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10',
    },
    {
      label: 'Atrasados',
      value: stats.leadsAtrasados.toLocaleString('pt-BR'),
      icon: AlertCircle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {cards.map((card, index) => (
        <div
          key={card.label}
          className="stat-card animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className={`w-10 h-10 rounded-xl ${card.bgColor} flex items-center justify-center`}>
            <card.icon className={`w-5 h-5 ${card.color}`} />
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-white">
              {card.value}
            </p>
            <p className="text-sm text-gray-400">{card.label}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function FunnelOverview() {
  const stats = useLeadsStore((state) => state.getStats())
  const { setFilters } = useLeadsStore()
  
  const etapas = Object.entries(ETAPAS_CONFIG)
    .filter(([key]) => key !== 'fechado_ganho' && key !== 'fechado_perdido')
    .sort(([, a], [, b]) => a.order - b.order)

  const maxCount = Math.max(...etapas.map(([key]) => stats.leadsPorEtapa[key as keyof typeof stats.leadsPorEtapa] || 0))

  return (
    <div className="glass-card p-6">
      <h3 className="font-display font-semibold text-white mb-4">Funil de Vendas</h3>
      
      <div className="space-y-3">
        {etapas.map(([key, config]) => {
          const count = stats.leadsPorEtapa[key as keyof typeof stats.leadsPorEtapa] || 0
          const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0
          
          return (
            <button
              key={key}
              onClick={() => setFilters({ etapa: key as any })}
              className="w-full group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  {config.emoji} {config.label}
                </span>
                <span className="text-sm font-mono text-gray-400">
                  {count.toLocaleString('pt-BR')}
                </span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500 group-hover:opacity-80"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: config.color,
                  }}
                />
              </div>
            </button>
          )
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700/50 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-2xl font-display font-bold text-jori-400">
            {stats.leadsPorEtapa.fechado_ganho || 0}
          </p>
          <p className="text-sm text-gray-400">✅ Ganhos</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-display font-bold text-red-400">
            {stats.leadsPorEtapa.fechado_perdido || 0}
          </p>
          <p className="text-sm text-gray-400">❌ Perdidos</p>
        </div>
      </div>
    </div>
  )
}
