'use client';

import { useStore } from '@/lib/store';
import { FUNIL_ETAPAS } from '@/lib/constants';
import { Users, Sparkles, Handshake, Trophy, CalendarDays } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div 
      className="bg-white rounded-2xl p-5 shadow-sm"
      style={{ borderLeft: `4px solid ${color}` }}
    >
      <div className="flex items-center gap-3">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          {icon}
        </div>
        <div>
          <div className="text-3xl font-bold" style={{ color }}>{value}</div>
          <div className="text-sm text-slate-500">{label}</div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { contatos, atividades } = useStore();

  const stats = {
    total: contatos.length,
    porEtapa: FUNIL_ETAPAS.reduce((acc, e) => {
      acc[e.id] = contatos.filter(c => c.etapa === e.id).length;
      return acc;
    }, {} as Record<string, number>),
    atividadesHoje: atividades.filter(a => 
      !a.concluida && new Date(a.data).toDateString() === new Date().toDateString()
    ).length
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        <StatCard 
          icon={<Users className="text-primary" size={24} />} 
          label="Total de Contatos" 
          value={stats.total} 
          color="#1e3a5f" 
        />
        <StatCard 
          icon={<Sparkles className="text-indigo-500" size={24} />} 
          label="Novos Leads" 
          value={stats.porEtapa.novo || 0} 
          color="#6366f1" 
        />
        <StatCard 
          icon={<Handshake className="text-orange-500" size={24} />} 
          label="Em Negociação" 
          value={stats.porEtapa.negociacao || 0} 
          color="#f97316" 
        />
        <StatCard 
          icon={<Trophy className="text-emerald-500" size={24} />} 
          label="Ganhos" 
          value={stats.porEtapa.ganho || 0} 
          color="#10b981" 
        />
        <StatCard 
          icon={<CalendarDays className="text-accent" size={24} />} 
          label="Atividades Hoje" 
          value={stats.atividadesHoje} 
          color="#f5a623" 
        />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-800 mb-5">Resumo do Funil</h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {FUNIL_ETAPAS.map(etapa => (
            <div 
              key={etapa.id}
              className="flex-1 min-w-[120px] p-4 rounded-xl text-center"
              style={{ 
                backgroundColor: `${etapa.cor}15`,
                borderLeft: `4px solid ${etapa.cor}`
              }}
            >
              <div className="text-3xl mb-1">{etapa.icon}</div>
              <div className="text-2xl font-bold" style={{ color: etapa.cor }}>
                {stats.porEtapa[etapa.id] || 0}
              </div>
              <div className="text-xs text-slate-500 mt-1">{etapa.nome}</div>
            </div>
          ))}
        </div>
      </div>

      {atividades.filter(a => !a.concluida).length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Próximas Atividades</h3>
          {atividades.filter(a => !a.concluida).slice(0, 5).map(a => {
            const contato = contatos.find(c => c.id === a.contatoId);
            return (
              <div key={a.id} className="flex items-center gap-3 py-3 border-b border-slate-100 last:border-0">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  {a.tipo === 'visita' ? '📍' : a.tipo === 'ligacao' ? '📞' : a.tipo === 'email' ? '✉️' : '📋'}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-800">{a.descricao}</div>
                  <div className="text-sm text-slate-500">
                    {contato?.nome} • {new Date(a.data).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
