'use client';

import { useState } from 'react';
import { User, Building, Phone, Mail, AtSign, Plus, Trash2, FileDown, Share2 } from 'lucide-react';
import { Vendedor, Cliente, Produto, CondicaoPagamento, Condicoes } from '@/app/types';
import { formatCurrency, generateId } from '@/app/lib/utils';
import html2canvas from 'html2canvas';

interface FormularioOrcamentoProps {
  onGerarOrcamento: (data: any) => void;
}

export default function FormularioOrcamento({ onGerarOrcamento }: FormularioOrcamentoProps) {
  const [vendedor, setVendedor] = useState<Vendedor>({ nome: '', telefone: '' });
  const [cliente, setCliente] = useState<Cliente>({
    empresa: '',
    contato: '',
    whatsapp: '',
    email: '',
  });
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [condicoes, setCondicoes] = useState<Condicoes>({
    pagamento: 'À vista',
    validade: 7,
    observacoes: '',
  });

  const adicionarProduto = () => {
    const novoProduto: Produto = {
      id: generateId(),
      codigo: '',
      descricao: '',
      unidade: 'UN',
      quantidade: 1,
      preco: 0,
      total: 0,
    };
    setProdutos([...produtos, novoProduto]);
  };

  const removerProduto = (id: string) => {
    setProdutos(produtos.filter(p => p.id !== id));
  };

  const atualizarProduto = (id: string, campo: keyof Produto, valor: any) => {
    setProdutos(produtos.map(p => {
      if (p.id === id) {
        const updated = { ...p, [campo]: valor };
        if (campo === 'quantidade' || campo === 'preco') {
          updated.total = updated.quantidade * updated.preco;
        }
        return updated;
      }
      return p;
    }));
  };

  const calcularTotal = () => {
    return produtos.reduce((sum, p) => sum + p.total, 0);
  };

  const handleGerarOrcamento = () => {
    const orcamento = {
      vendedor,
      cliente,
      produtos,
      condicoes,
      total: calcularTotal(),
      dataEmissao: new Date(),
      numero: `ORC-${Date.now()}`,
    };
    onGerarOrcamento(orcamento);
  };

  return (
    <div className="space-y-8">
      {/* Dados do Vendedor */}
      <div className="card p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-primary-600" />
          </div>
          <h2 className="text-xl font-display font-bold text-secondary-900">
            Dados do Vendedor
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Nome Completo</label>
            <input
              type="text"
              className="input"
              placeholder="Digite o nome do vendedor"
              value={vendedor.nome}
              onChange={(e) => setVendedor({ ...vendedor, nome: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Telefone</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="tel"
                className="input pl-12"
                placeholder="(21) 98765-4321"
                value={vendedor.telefone}
                onChange={(e) => setVendedor({ ...vendedor, telefone: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dados do Cliente */}
      <div className="card p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center">
            <Building className="w-5 h-5 text-accent-600" />
          </div>
          <h2 className="text-xl font-display font-bold text-secondary-900">
            Dados do Cliente
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">Empresa</label>
            <input
              type="text"
              className="input"
              placeholder="Nome da empresa"
              value={cliente.empresa}
              onChange={(e) => setCliente({ ...cliente, empresa: e.target.value })}
            />
          </div>
          <div>
            <label className="label">Contato</label>
            <input
              type="text"
              className="input"
              placeholder="Nome do contato"
              value={cliente.contato}
              onChange={(e) => setCliente({ ...cliente, contato: e.target.value })}
            />
          </div>
          <div>
            <label className="label">WhatsApp</label>
            <div className="relative">
              <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="tel"
                className="input pl-12"
                placeholder="(21) 98765-4321"
                value={cliente.whatsapp}
                onChange={(e) => setCliente({ ...cliente, whatsapp: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="label">E-mail</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                className="input pl-12"
                placeholder="contato@empresa.com.br"
                value={cliente.email}
                onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Produtos */}
      <div className="card p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <FileDown className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-display font-bold text-secondary-900">
              Produtos
            </h2>
          </div>
          <button
            onClick={adicionarProduto}
            className="btn btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Adicionar Produto
          </button>
        </div>

        {produtos.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl">
            <FileDown className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-600">Nenhum produto adicionado</p>
            <p className="text-sm text-slate-400 mt-1">Clique em "Adicionar Produto" para começar</p>
          </div>
        ) : (
          <div className="space-y-4">
            {produtos.map((produto, index) => (
              <div key={produto.id} className="p-5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white rounded-lg flex items-center justify-center text-sm font-bold text-secondary-700 shadow-sm">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div>
                      <label className="label text-xs">Código</label>
                      <input
                        type="text"
                        className="input text-sm"
                        placeholder="SKU"
                        value={produto.codigo}
                        onChange={(e) => atualizarProduto(produto.id, 'codigo', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label text-xs">Descrição</label>
                      <input
                        type="text"
                        className="input text-sm"
                        placeholder="Nome do produto"
                        value={produto.descricao}
                        onChange={(e) => atualizarProduto(produto.id, 'descricao', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Unidade</label>
                      <select
                        className="input text-sm"
                        value={produto.unidade}
                        onChange={(e) => atualizarProduto(produto.id, 'unidade', e.target.value)}
                      >
                        <option value="UN">UN</option>
                        <option value="CX">CX</option>
                        <option value="FD">FD</option>
                        <option value="KG">KG</option>
                        <option value="LT">LT</option>
                      </select>
                    </div>
                    <div>
                      <label className="label text-xs">Quantidade</label>
                      <input
                        type="number"
                        className="input text-sm"
                        min="1"
                        value={produto.quantidade}
                        onChange={(e) => atualizarProduto(produto.id, 'quantidade', Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="label text-xs">Preço Un.</label>
                      <input
                        type="number"
                        className="input text-sm"
                        step="0.01"
                        min="0"
                        value={produto.preco}
                        onChange={(e) => atualizarProduto(produto.id, 'preco', Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex flex-col items-end gap-2">
                    <div className="text-right">
                      <p className="text-xs text-slate-600 mb-1">Total</p>
                      <p className="text-lg font-bold text-secondary-900">
                        {formatCurrency(produto.total)}
                      </p>
                    </div>
                    <button
                      onClick={() => removerProduto(produto.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remover produto"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Total Geral */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t-2 border-slate-200">
              <span className="text-lg font-semibold text-secondary-700">Total Geral:</span>
              <span className="text-3xl font-bold text-primary-600 font-display">
                {formatCurrency(calcularTotal())}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Condições */}
      <div className="card p-8">
        <h2 className="text-xl font-display font-bold text-secondary-900 mb-6">
          Condições Comerciais
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="label">Forma de Pagamento</label>
            <select
              className="input"
              value={condicoes.pagamento}
              onChange={(e) => setCondicoes({ ...condicoes, pagamento: e.target.value as CondicaoPagamento })}
            >
              <option value="À vista">À vista</option>
              <option value="7 dias">7 dias</option>
              <option value="14 dias">14 dias</option>
              <option value="21 dias">21 dias</option>
              <option value="28 dias">28 dias</option>
              <option value="30/60 dias">30/60 dias</option>
              <option value="30/60/90 dias">30/60/90 dias</option>
            </select>
          </div>
          <div>
            <label className="label">Validade da Proposta</label>
            <div className="relative">
              <input
                type="number"
                className="input pr-16"
                min="1"
                value={condicoes.validade}
                onChange={(e) => setCondicoes({ ...condicoes, validade: Number(e.target.value) })}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                dias
              </span>
            </div>
          </div>
        </div>

        <div>
          <label className="label">Observações</label>
          <textarea
            className="input resize-none"
            rows={4}
            placeholder="Informações adicionais sobre a proposta..."
            value={condicoes.observacoes}
            onChange={(e) => setCondicoes({ ...condicoes, observacoes: e.target.value })}
          />
        </div>
      </div>

      {/* Botão Gerar */}
      <div className="flex justify-end gap-4">
        <button className="btn btn-secondary">
          Limpar Formulário
        </button>
        <button 
          onClick={handleGerarOrcamento}
          className="btn btn-success flex items-center gap-2 text-lg px-8"
          disabled={produtos.length === 0}
        >
          <Share2 className="w-5 h-5" />
          Gerar Orçamento
        </button>
      </div>
    </div>
  );
}
