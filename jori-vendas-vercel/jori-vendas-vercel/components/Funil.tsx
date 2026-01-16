'use client';

import { useStore, type Contato } from '@/lib/store';
import { FUNIL_ETAPAS } from '@/lib/constants';

interface FunilProps {
  onViewContato: (contato: Contato) => void;
}

export default function Funil({ onViewContato }: FunilProps) {
  const { contatos } = useStore();

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Funil de Vendas</h2>

      <div className="flex gap-4 overflow-x-auto pb-5">
        {FUNIL_ETAPAS.map(etapa => {
          const etapaContatos = contatos.filter(c => c.etapa === etapa.id);
          
          return (
            <div
              key={etapa.id}
              className="flex-shrink-0 w-72 bg-white rounded-2xl overflow-hidden shadow-sm"
            >
              {/* Header da coluna */}
              <div
                className="px-5 py-4 flex items-center gap-3 text-white"
                style={{ backgroundColor: etapa.cor }}
              >
                <span className="text-xl">{etapa.icon}</span>
                <span className="font-semibold flex-1">{etapa.nome}</span>
                <span className="bg-white/30 px-3 py-1 rounded-full text-sm font-bold">
                  {etapaContatos.length}
                </span>
              </div>

              {/* Cards */}
              <div className="p-3 max-h-[500px] overflow-y-auto">
                {etapaContatos.map(contato => (
                  <div
                    key={contato.id}
                    onClick={() => onViewContato(contato)}
                    className="p-3 bg-slate-50 rounded-xl mb-2 cursor-pointer border-2 border-transparent hover:border-slate-200 transition-all"
                  >
                    <div className="font-semibold text-sm text-slate-800 mb-1">
                      {contato.nome}
                    </div>
                    {contato.contato && (
                      <div className="text-xs text-slate-500 mb-1">
                        {contato.contato}
                      </div>
                    )}
                    {contato.telefone && (
                      <div className="text-xs text-primary">
                        📞 {contato.telefone}
                      </div>
                    )}
                    {contato.tag && (
                      <span
                        className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-semibold"
                        style={{ backgroundColor: '#f5a62320', color: '#f5a623' }}
                      >
                        {contato.tag}
                      </span>
                    )}
                  </div>
                ))}

                {etapaContatos.length === 0 && (
                  <div className="p-5 text-center text-slate-400 text-sm">
                    Nenhum contato
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
