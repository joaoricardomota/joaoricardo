'use client';

import { FileText, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { formatCurrency } from '@/app/lib/utils';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
}

function StatCard({ icon, label, value, trend, trendUp }: StatCardProps) {
  return (
    <div className="card p-6 hover:shadow-medium transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-secondary-600 mb-1">{label}</p>
          <p className="text-3xl font-bold text-secondary-900 font-display">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm font-medium ${
              trendUp ? 'text-accent-600' : 'text-red-600'
            }`}>
              <TrendingUp className={`w-4 h-4 ${!trendUp && 'rotate-180'}`} />
              {trend}
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          trendUp !== undefined 
            ? trendUp 
              ? 'bg-accent-100 text-accent-600' 
              : 'bg-red-100 text-red-600'
            : 'bg-primary-100 text-primary-600'
        }`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export default function DashboardStats() {
  // Dados mockados - depois você pode pegar do localStorage ou backend
  const stats = {
    totalOrcamentos: 0,
    ticketMedio: 0,
    valorTotal: 0,
    crescimentoMensal: 0,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={<FileText className="w-6 h-6" />}
        label="Orçamentos Gerados"
        value={stats.totalOrcamentos.toString()}
      />
      <StatCard
        icon={<DollarSign className="w-6 h-6" />}
        label="Ticket Médio"
        value={formatCurrency(stats.ticketMedio)}
        trend="+12,5%"
        trendUp={true}
      />
      <StatCard
        icon={<TrendingUp className="w-6 h-6" />}
        label="Valor Total"
        value={formatCurrency(stats.valorTotal)}
        trend="+8,2%"
        trendUp={true}
      />
      <StatCard
        icon={<Calendar className="w-6 h-6" />}
        label="Este Mês"
        value={formatCurrency(stats.crescimentoMensal)}
      />
    </div>
  );
}
