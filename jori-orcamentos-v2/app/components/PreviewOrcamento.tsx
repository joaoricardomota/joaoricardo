'use client';

import { Building2, Calendar, Phone, Mail, MapPin } from 'lucide-react';
import { Orcamento } from '@/app/types';
import { formatCurrency, formatDate } from '@/app/lib/utils';
import { forwardRef } from 'react';

interface PreviewOrcamentoProps {
  orcamento: Orcamento;
  logo?: string | null;
  banner?: string | null;
}

const PreviewOrcamento = forwardRef<HTMLDivElement, PreviewOrcamentoProps>(
  ({ orcamento, logo, banner }, ref) => {
    return (
      <div ref={ref} className="bg-white w-[800px] mx-auto shadow-2xl">
        {/* Header com Banner/Logo */}
        <div className="relative h-48 bg-gradient-to-br from-primary-600 to-primary-800 overflow-hidden">
          {banner ? (
            <img src={banner} alt="Banner" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          
          <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between">
            <div>
              <h1 className="text-4xl font-display font-bold text-white mb-2">
                PROPOSTA COMERCIAL
              </h1>
              <p className="text-white/90 text-lg">
                Orçamento Nº {orcamento.numero}
              </p>
            </div>
            {logo && (
              <div className="w-24 h-24 bg-white rounded-xl p-2 shadow-lg">
                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
            )}
          </div>
        </div>

        {/* Informações do Cabeçalho */}
        <div className="px-8 py-6 bg-slate-50 border-b border-slate-200">
          <div className="grid grid-cols-2 gap-8">
            {/* Cliente */}
            <div>
              <h3 className="text-xs font-bold text-primary-600 uppercase tracking-wide mb-3">
                Cliente
              </h3>
              <div className="space-y-2">
                <p className="font-bold text-secondary-900 text-lg">
                  {orcamento.cliente.empresa}
                </p>
                <p className="text-secondary-700">{orcamento.cliente.contato}</p>
                <div className="flex items-center gap-2 text-sm text-secondary-600">
                  <Phone className="w-4 h-4" />
                  {orcamento.cliente.whatsapp}
                </div>
                <div className="flex items-center gap-2 text-sm text-secondary-600">
                  <Mail className="w-4 h-4" />
                  {orcamento.cliente.email}
                </div>
              </div>
            </div>

            {/* Vendedor e Data */}
            <div>
              <h3 className="text-xs font-bold text-primary-600 uppercase tracking-wide mb-3">
                Informações da Proposta
              </h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-secondary-600">Vendedor</p>
                  <p className="font-semibold text-secondary-900">{orcamento.vendedor.nome}</p>
                  <p className="text-sm text-secondary-600">{orcamento.vendedor.telefone}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-secondary-700">
                  <Calendar className="w-4 h-4" />
                  Emitido em {formatDate(orcamento.dataEmissao)}
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent-100 text-accent-700 rounded-full text-xs font-semibold">
                  Válido por {orcamento.condicoes.validade} dias
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Produtos */}
        <div className="px-8 py-8">
          <h3 className="text-lg font-bold text-secondary-900 mb-4">Itens da Proposta</h3>
          
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th className="text-left py-3 px-2 text-xs font-bold text-secondary-600 uppercase">
                  Item
                </th>
                <th className="text-left py-3 px-2 text-xs font-bold text-secondary-600 uppercase">
                  Código
                </th>
                <th className="text-left py-3 px-2 text-xs font-bold text-secondary-600 uppercase">
                  Descrição
                </th>
                <th className="text-center py-3 px-2 text-xs font-bold text-secondary-600 uppercase">
                  Qtd
                </th>
                <th className="text-center py-3 px-2 text-xs font-bold text-secondary-600 uppercase">
                  Un.
                </th>
                <th className="text-right py-3 px-2 text-xs font-bold text-secondary-600 uppercase">
                  Valor Un.
                </th>
                <th className="text-right py-3 px-2 text-xs font-bold text-secondary-600 uppercase">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {orcamento.produtos.map((produto, index) => (
                <tr key={produto.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-2 text-secondary-700 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-4 px-2 text-secondary-700">
                    {produto.codigo || '-'}
                  </td>
                  <td className="py-4 px-2 text-secondary-900 font-medium">
                    {produto.descricao}
                  </td>
                  <td className="py-4 px-2 text-center text-secondary-700">
                    {produto.quantidade}
                  </td>
                  <td className="py-4 px-2 text-center text-secondary-700">
                    {produto.unidade}
                  </td>
                  <td className="py-4 px-2 text-right text-secondary-700">
                    {formatCurrency(produto.preco)}
                  </td>
                  <td className="py-4 px-2 text-right font-semibold text-secondary-900">
                    {formatCurrency(produto.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total */}
          <div className="mt-6 flex justify-end">
            <div className="w-80">
              <div className="flex justify-between items-center py-4 border-t-2 border-primary-600">
                <span className="text-lg font-bold text-secondary-900">VALOR TOTAL</span>
                <span className="text-3xl font-bold text-primary-600 font-display">
                  {formatCurrency(orcamento.total)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Condições Comerciais */}
        <div className="px-8 pb-8">
          <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-secondary-900 mb-4">Condições Comerciais</h3>
            <div className="grid grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-xs text-secondary-600 mb-1">Forma de Pagamento</p>
                <p className="font-semibold text-secondary-900">{orcamento.condicoes.pagamento}</p>
              </div>
              <div>
                <p className="text-xs text-secondary-600 mb-1">Validade da Proposta</p>
                <p className="font-semibold text-secondary-900">{orcamento.condicoes.validade} dias</p>
              </div>
            </div>
            {orcamento.condicoes.observacoes && (
              <div>
                <p className="text-xs text-secondary-600 mb-1">Observações</p>
                <p className="text-sm text-secondary-700 leading-relaxed">
                  {orcamento.condicoes.observacoes}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-secondary-900 text-white">
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-bold mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                JORI PAPEL
              </p>
              <p className="text-white/70 text-xs">Distribuidor Oficial Santher RJ</p>
              <p className="text-white/70 text-xs">40 Anos de Mercado</p>
            </div>
            <div>
              <p className="font-bold mb-2">Contato</p>
              <p className="text-white/70 text-xs">Tel: (21) 3xxx-xxxx</p>
              <p className="text-white/70 text-xs">vendas@joripapel.com.br</p>
            </div>
            <div>
              <p className="font-bold mb-2">Endereço</p>
              <p className="text-white/70 text-xs">Rio de Janeiro - RJ</p>
              <p className="text-white/70 text-xs">www.joripapel.com.br</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PreviewOrcamento.displayName = 'PreviewOrcamento';

export default PreviewOrcamento;
