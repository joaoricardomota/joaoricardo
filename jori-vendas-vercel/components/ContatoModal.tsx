'use client';

import { useState } from 'react';
import { useStore, type Contato, type Atividade } from '@/lib/store';
import { FUNIL_ETAPAS, TAGS, VENDEDORES, TIPOS_ATIVIDADE } from '@/lib/constants';
import { X, Phone, Mail, MapPin, Building2, FileText, User } from 'lucide-react';

interface ContatoModalProps {
  contato: Contato;
  onClose: () => void;
}

export default function ContatoModal({ contato, onClose }: ContatoModalProps) {
  const { updateContato, addAtividade, atividades } = useStore();
  const [obs, setObs] = useState(contato.observacoes || '');
  const [novaAtiv, setNovaAtiv] = useState({ tipo: 'ligacao', descricao: '', data: '' });

  const contatoAtividades = atividades.filter(a => a.contatoId === contato.id);
  const etapaAtual = FUNIL_ETAPAS.find(e => e.id === contato.etapa);

  const handleUpdate = (updates: Partial<Contato>) => {
    updateContato(contato.id, updates);
  };

  const handleAddAtividade = () => {
    if (!novaAtiv.descricao || !novaAtiv.data) return;
    
    const nova: Atividade = {
      id: Math.random().toString(36).substr(2, 9),
      contatoId: contato.id,
      tipo: novaAtiv.tipo,
      descricao: novaAtiv.descricao,
      data: novaAtiv.data,
      concluida: false,
    };
    
    addAtividade(nova);
    setNovaAtiv({ tipo: 'ligacao', descricao: '', data: '' });
  };

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
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
            {contato.nome?.charAt(0)?.toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-800">{contato.nome}</h2>
            {contato.fantasia && (
              <p className="text-slate-500">{contato.fantasia}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Etapas */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-slate-500 text-xs uppercase tracking-wide">
              Etapa do Funil
            </label>
            <div className="flex gap-2 flex-wrap">
              {FUNIL_ETAPAS.map(e => (
                <button
                  key={e.id}
                  onClick={() => handleUpdate({ etapa: e.id })}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    contato.etapa === e.id
                      ? 'border-2'
                      : 'border-2 border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                  style={
                    contato.etapa === e.id
                      ? { borderColor: e.cor, backgroundColor: `${e.cor}20`, color: e.cor }
                      : {}
                  }
                >
                  {e.icon} {e.nome}
                </button>
              ))}
            </div>
          </div>

          {/* Informações */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {contato.contato && (
              <InfoCard icon={<User size={18} />} label="Contato" value={contato.contato} />
            )}
            {contato.telefone && (
              <InfoCard
                icon={<Phone size={18} />}
                label="Telefone"
                value={contato.telefone}
                href={`tel:${contato.telefone}`}
              />
            )}
            {contato.telefone2 && (
              <InfoCard icon={<Phone size={18} />} label="Telefone 2" value={contato.telefone2} />
            )}
            {contato.email && (
              <InfoCard
                icon={<Mail size={18} />}
                label="Email"
                value={contato.email}
                href={`mailto:${contato.email}`}
              />
            )}
            {contato.bairro && (
              <InfoCard icon={<MapPin size={18} />} label="Bairro" value={contato.bairro} />
            )}
            {contato.cidade && (
              <InfoCard icon={<Building2 size={18} />} label="Cidade" value={contato.cidade} />
            )}
          </div>

          {/* Tag e Vendedor */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-2 font-semibold text-slate-500 text-xs uppercase tracking-wide">
                Tag / Segmento
              </label>
              <select
                value={contato.tag || ''}
                onChange={(e) => handleUpdate({ tag: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary outline-none"
              >
                <option value="">Selecionar...</option>
                {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-2 font-semibold text-slate-500 text-xs uppercase tracking-wide">
                Vendedor
              </label>
              <select
                value={contato.vendedor || ''}
                onChange={(e) => handleUpdate({ vendedor: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary outline-none"
              >
                <option value="">Selecionar...</option>
                {VENDEDORES.map(v => <option key={v} value={v}>{v}</option>)}
              </select>
            </div>
          </div>

          {/* Observações */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-slate-500 text-xs uppercase tracking-wide">
              Observações
            </label>
            <textarea
              value={obs}
              onChange={(e) => setObs(e.target.value)}
              onBlur={() => handleUpdate({ observacoes: obs })}
              placeholder="Adicione notas sobre este contato..."
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-primary outline-none min-h-[80px] resize-y"
            />
          </div>

          {/* Nova Atividade */}
          <div className="p-4 bg-slate-50 rounded-xl mb-4">
            <label className="block mb-3 font-semibold text-slate-800 text-sm">
              ➕ Agendar Atividade
            </label>
            <div className="flex gap-3 flex-wrap">
              <select
                value={novaAtiv.tipo}
                onChange={(e) => setNovaAtiv(p => ({ ...p, tipo: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-slate-200"
              >
                {TIPOS_ATIVIDADE.map(t => (
                  <option key={t.id} value={t.id}>{t.icon} {t.nome}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Descrição..."
                value={novaAtiv.descricao}
                onChange={(e) => setNovaAtiv(p => ({ ...p, descricao: e.target.value }))}
                className="flex-1 min-w-[150px] px-3 py-2 rounded-lg border border-slate-200"
              />
              <input
                type="date"
                value={novaAtiv.data}
                onChange={(e) => setNovaAtiv(p => ({ ...p, data: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-slate-200"
              />
              <button
                onClick={handleAddAtividade}
                className="px-5 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
              >
                Agendar
              </button>
            </div>
          </div>

          {/* Histórico */}
          {contatoAtividades.length > 0 && (
            <div>
              <label className="block mb-3 font-semibold text-slate-500 text-xs uppercase tracking-wide">
                Histórico de Atividades
              </label>
              <div className="space-y-2">
                {contatoAtividades.map(a => (
                  <div
                    key={a.id}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      a.concluida ? 'bg-emerald-50' : 'bg-slate-50'
                    }`}
                  >
                    <span>{getIconByType(a.tipo)}</span>
                    <div className="flex-1">
                      <div className={`font-medium ${a.concluida ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                        {a.descricao}
                      </div>
                      <div className="text-xs text-slate-400">
                        {new Date(a.data).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    {a.concluida && <span className="text-emerald-500">✓</span>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-3">
      <span className="text-slate-500">{icon}</span>
      <div>
        <div className="text-[10px] text-slate-400 uppercase">{label}</div>
        <div className={`font-medium ${href ? 'text-primary' : 'text-slate-800'}`}>
          {value}
        </div>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} className="hover:opacity-80 transition-opacity">{content}</a>;
  }

  return content;
}
