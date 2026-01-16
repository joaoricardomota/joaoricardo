'use client';

import { useStore } from '@/lib/store';
import { CheckCircle2 } from 'lucide-react';

export default function Agenda() {
  const { contatos, atividades, updateAtividade } = useStore();

  const atividadesPendentes = atividades.filter(a => !a.concluida);
  const atividadesConcluidas = atividades.filter(a => a.concluida);

  const getIconByType = (tipo: string) => {
    switch (tipo) {
      case 'visita': return '📍';
      case 'ligacao': return '📞';
      case 'email': return '✉️';
      case 'reuniao': return '🤝';
      default: return '📋';
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Agenda de Atividades</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pendentes */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-5 flex items-center gap-2">
            📋 Pendentes
            <span className="ml-auto bg-amber-100 text-amber-700 px-2 py-1 rounded-full text-sm font-bold">
              {atividadesPendentes.length}
            </span>
          </h3>

          {atividadesPendentes.length === 0 ? (
            <p className="text-slate-400 text-center py-10">
              Nenhuma atividade pendente
            </p>
          ) : (
            <div className="space-y-2">
              {atividadesPendentes.map(a => {
                const contato = contatos.find(c => c.id === a.contatoId);
                const isToday = new Date(a.data).toDateString() === new Date().toDateString();
                const isPast = new Date(a.data) < new Date() && !isToday;
                
                return (
                  <div
                    key={a.id}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      isPast ? 'bg-red-50' : isToday ? 'bg-amber-50' : 'bg-slate-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      onChange={() => updateAtividade(a.id, { concluida: true })}
                      className="w-5 h-5 rounded cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="font-semibold text-slate-800">{a.descricao}</div>
                      <div className="text-sm text-slate-500">
                        {contato?.nome} • {new Date(a.data).toLocaleDateString('pt-BR')}
                        {isToday && <span className="ml-2 text-amber-600 font-medium">Hoje</span>}
                        {isPast && <span className="ml-2 text-red-500 font-medium">Atrasada</span>}
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold">
                      {getIconByType(a.tipo)} {a.tipo}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Concluídas */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-5 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" size={20} />
            Concluídas
            <span className="ml-auto bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-sm font-bold">
              {atividadesConcluidas.length}
            </span>
          </h3>

          {atividadesConcluidas.length === 0 ? (
            <p className="text-slate-400 text-center py-10">
              Nenhuma atividade concluída
            </p>
          ) : (
            <div className="space-y-2">
              {atividadesConcluidas.slice(0, 10).map(a => {
                const contato = contatos.find(c => c.id === a.contatoId);
                
                return (
                  <div
                    key={a.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/50 opacity-70"
                  >
                    <span className="text-emerald-500">✓</span>
                    <div className="flex-1">
                      <div className="font-medium text-slate-600 line-through">
                        {a.descricao}
                      </div>
                      <div className="text-sm text-slate-400">
                        {contato?.nome}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
