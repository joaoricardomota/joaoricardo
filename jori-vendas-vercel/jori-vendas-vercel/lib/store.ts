import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Contato {
  id: string;
  nome: string;
  fantasia: string;
  cnpj: string;
  contato: string;
  endereco: string;
  bairro: string;
  cidade: string;
  telefone: string;
  telefone2: string;
  email: string;
  origem: string;
  etapa: string;
  tag: string;
  vendedor: string;
  observacoes: string;
  dataCadastro: string;
}

export interface Atividade {
  id: string;
  contatoId: string;
  tipo: string;
  descricao: string;
  data: string;
  concluida: boolean;
}

interface Store {
  contatos: Contato[];
  atividades: Atividade[];
  selectedContatos: Set<string>;
  
  addContatos: (contatos: Contato[]) => void;
  updateContato: (id: string, updates: Partial<Contato>) => void;
  deleteContato: (id: string) => void;
  
  addAtividade: (atividade: Atividade) => void;
  updateAtividade: (id: string, updates: Partial<Atividade>) => void;
  
  toggleSelectContato: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  
  moveSelectedToEtapa: (etapa: string) => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      contatos: [],
      atividades: [],
      selectedContatos: new Set(),

      addContatos: (newContatos) => {
        set((state) => {
          const existingKeys = new Set(state.contatos.map(c => `${c.nome}-${c.telefone}`));
          const filtered = newContatos.filter(c => !existingKeys.has(`${c.nome}-${c.telefone}`));
          return { contatos: [...state.contatos, ...filtered] };
        });
      },

      updateContato: (id, updates) => {
        set((state) => ({
          contatos: state.contatos.map(c => c.id === id ? { ...c, ...updates } : c)
        }));
      },

      deleteContato: (id) => {
        set((state) => ({
          contatos: state.contatos.filter(c => c.id !== id),
          selectedContatos: new Set([...state.selectedContatos].filter(cId => cId !== id))
        }));
      },

      addAtividade: (atividade) => {
        set((state) => ({ atividades: [...state.atividades, atividade] }));
      },

      updateAtividade: (id, updates) => {
        set((state) => ({
          atividades: state.atividades.map(a => a.id === id ? { ...a, ...updates } : a)
        }));
      },

      toggleSelectContato: (id) => {
        set((state) => {
          const newSet = new Set(state.selectedContatos);
          if (newSet.has(id)) {
            newSet.delete(id);
          } else {
            newSet.add(id);
          }
          return { selectedContatos: newSet };
        });
      },

      selectAll: (ids) => {
        set((state) => {
          if (state.selectedContatos.size === ids.length) {
            return { selectedContatos: new Set() };
          }
          return { selectedContatos: new Set(ids) };
        });
      },

      clearSelection: () => {
        set({ selectedContatos: new Set() });
      },

      moveSelectedToEtapa: (etapa) => {
        set((state) => ({
          contatos: state.contatos.map(c => 
            state.selectedContatos.has(c.id) ? { ...c, etapa } : c
          ),
          selectedContatos: new Set()
        }));
      },
    }),
    {
      name: 'jori-vendas-storage',
      partialize: (state) => ({ 
        contatos: state.contatos, 
        atividades: state.atividades 
      }),
    }
  )
);
