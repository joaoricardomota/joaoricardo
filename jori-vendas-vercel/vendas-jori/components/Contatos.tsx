'use client';

import { useState, useMemo } from 'react';
import { useStore, type Contato } from '@/lib/store';
import { FUNIL_ETAPAS, TAGS } from '@/lib/constants';
import { Search, Eye, Trash2, Mail, Upload } from 'lucide-react';

interface ContatosProps {
  onViewContato: (contato: Contato) => void;
  onNavigate: (view: string) => void;
  showNotification: (type: 'success' | 'error', message: string) => void;
}

export default function Contatos({ onViewContato, onNavigate, showNotification }: ContatosProps) {
  const { 
    contatos, 
    selectedContatos, 
    updateContato, 
    deleteContato, 
    toggleSelectContato, 
    selectAll,
    moveSelectedToEtapa,
    clearSelection
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterEtapa, setFilterEtapa] = useState('todos');
  const [filterTag, setFilterTag] = useState('todos');

  const contatosFiltrados = useMemo(() => {
    let filtered = [...contatos];
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(c =>
        c.nome?.toLowerCase().includes(term) ||
        c.empresa?.toLowerCase().includes(term) ||
        c.email?.toLowerCase().includes(term) ||
        c.telefone?.includes(term) ||
        c.contato?.toLowerCase().includes(term)
      );
    }

    if (filterEtapa !== 'todos') {
      filtered = filtered.filter(c => c.etapa === filterEtapa);
    }

    if (filterTag !== 'todos') {
      filtered = filtered.filter(c => c.tag === filterTag);
    }

    return filtered;
  }, [contatos, searchTerm, filterEtapa, filterTag]);

  const handleMoveToEtapa = (etapa: string) => {
    moveSelectedToEtapa(etapa);
    showNotification('success', `${selectedContatos.size} contatos movidos!`);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este contato?')) {
      deleteContato(id);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-slate-800">
          Contatos
          <span className="text-base font-normal text-slate-500 ml-3">
            {contatosFiltrados.length} de {contatos.length}
          </span>
        </h2>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-xl p-4 mb-5 flex gap-4 flex-wrap items-center shadow-sm">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nome, telefone, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary outline-none"
          />
        </div>

        <select
          value={filterEtapa}
          onChange={(e) => setFilterEtapa(e.target.value)}
          className="px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary outline-none min-w-[180px]"
        >
          <option value="todos">Todas as etapas</option>
          {FUNIL_ETAPAS.map(e => (
            <option key={e.id} value={e.id}>{e.nome}</option>
          ))}
        </select>

        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary outline-none min-w-[160px]"
        >
          <option value="todos">Todos os tipos</option>
          {TAGS.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Ações em lote */}
      {selectedContatos.size > 0 && (
        <div className="bg-primary rounded-xl p-4 mb-5 flex gap-3 items-center text-white shadow-sm">
          <span className="font-semibold">{selectedContatos.size} selecionados</span>
          <div className="flex-1" />
          <select
            onChange={(e) => {
              if (e.target.value) {
                handleMoveToEtapa(e.target.value);
                e.target.value = '';
              }
            }}
            className="px-4 py-2 rounded-lg text-slate-800"
          >
            <option value="">Mover para...</option>
            {FUNIL_ETAPAS.map(e => (
              <option key={e.id} value={e.id}>{e.nome}</option>
            ))}
          </select>
          <button
            onClick={() => onNavigate('email')}
            className="px-4 py-2 rounded-lg bg-white/20 font-semibold flex items-center gap-2 hover:bg-white/30 transition-colors"
          >
            <Mail size={18} />
            Enviar E-mail
          </button>
        </div>
      )}

      {/* Tabela */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-4 w-10">
                <input
                  type="checkbox"
                  checked={selectedContatos.size === contatosFiltrados.length && contatosFiltrados.length > 0}
                  onChange={() => selectAll(contatosFiltrados.map(c => c.id))}
                  className="w-5 h-5 cursor-pointer rounded"
                />
              </th>
              {['Nome/Empresa', 'Contato', 'Telefone', 'Email', 'Etapa', 'Tag', 'Ações'].map(h => (
                <th key={h} className="p-4 text-left text-sm font-semibold text-slate-500 border-b-2 border-slate-200">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contatosFiltrados.slice(0, 100).map(contato => {
              const etapa = FUNIL_ETAPAS.find(e => e.id === contato.etapa);
              return (
                <tr
                  key={contato.id}
                  className={`border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                    selectedContatos.has(contato.id) ? 'bg-primary/5' : ''
                  }`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedContatos.has(contato.id)}
                      onChange={() => toggleSelectContato(contato.id)}
                      className="w-5 h-5 cursor-pointer rounded"
                    />
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-800">{contato.nome}</div>
                    {contato.fantasia && (
                      <div className="text-sm text-slate-500">{contato.fantasia}</div>
                    )}
                  </td>
                  <td className="p-4 text-slate-500">{contato.contato}</td>
                  <td className="p-4">
                    {contato.telefone && (
                      <a href={`tel:${contato.telefone}`} className="text-primary hover:underline">
                        {contato.telefone}
                      </a>
                    )}
                  </td>
                  <td className="p-4">
                    {contato.email && (
                      <a href={`mailto:${contato.email}`} className="text-secondary hover:underline text-sm">
                        {contato.email}
                      </a>
                    )}
                  </td>
                  <td className="p-4">
                    <span
                      className="px-3 py-1.5 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: `${etapa?.cor}20`,
                        color: etapa?.cor
                      }}
                    >
                      {etapa?.icon} {etapa?.nome}
                    </span>
                  </td>
                  <td className="p-4">
                    <select
                      value={contato.tag || ''}
                      onChange={(e) => updateContato(contato.id, { tag: e.target.value })}
                      className="px-2 py-1.5 rounded-md border border-slate-200 text-sm"
                    >
                      <option value="">Sem tag</option>
                      {TAGS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => onViewContato(contato)}
                        className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                        title="Ver detalhes"
                      >
                        <Eye size={16} className="text-primary" />
                      </button>
                      <button
                        onClick={() => handleDelete(contato.id)}
                        className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {contatosFiltrados.length === 0 && (
          <div className="p-16 text-center text-slate-500">
            <div className="text-5xl mb-4">📭</div>
            <p className="mb-4">Nenhum contato encontrado</p>
            <button
              onClick={() => onNavigate('importar')}
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold inline-flex items-center gap-2"
            >
              <Upload size={18} />
              Importar Contatos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
