'use client'

import { forwardRef } from 'react'
import { Phone, Mail, Calendar } from 'lucide-react'
import { formatCurrency, formatDate } from '@/app/lib/utils'
import { LOGO_BASE64, BANNER_BASE64 } from '@/app/lib/images'

const PreviewOrcamento = forwardRef(({ orcamento }, ref) => {
  return (
    <div ref={ref} className="bg-white w-[800px] mx-auto shadow-2xl" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header com Banner */}
      <div className="relative h-52 overflow-hidden">
        <img 
          src={BANNER_BASE64}
          alt="Banner Santher" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
              PROPOSTA COMERCIAL
            </h1>
            <p className="text-white/90 text-sm">
              Orçamento Nº {orcamento.numero}
            </p>
          </div>
          <div className="bg-white rounded-xl p-2 shadow-xl">
            <img 
              src={LOGO_BASE64}
              alt="Jori Papel" 
              className="h-20 w-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Info Header */}
      <div className="px-6 py-5 bg-slate-50 border-b border-slate-200">
        <div className="grid grid-cols-2 gap-6">
          {/* Cliente */}
          <div>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">
              Cliente
            </h3>
            <p className="font-bold text-slate-900 text-lg">{orcamento.cliente.empresa || '-'}</p>
            <p className="text-slate-700 text-sm">{orcamento.cliente.contato || '-'}</p>
            <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
              <Phone className="w-3.5 h-3.5" />
              {orcamento.cliente.whatsapp || '-'}
            </div>
            {orcamento.cliente.email && (
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Mail className="w-3.5 h-3.5" />
                {orcamento.cliente.email}
              </div>
            )}
          </div>

          {/* Vendedor */}
          <div>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">
              Proposta
            </h3>
            <div className="space-y-1">
              <p className="text-sm text-slate-600">
                <span className="font-medium">Vendedor:</span> {orcamento.vendedor.nome || '-'}
              </p>
              <p className="text-sm text-slate-600">
                <span className="font-medium">Tel:</span> {orcamento.vendedor.telefone || '-'}
              </p>
              <div className="flex items-center gap-2 text-sm text-slate-700 mt-2">
                <Calendar className="w-3.5 h-3.5" />
                Emitido em {formatDate(orcamento.dataEmissao)}
              </div>
              <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                Válido por {orcamento.condicoes.validade} dias
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Produtos */}
      <div className="px-6 py-6">
        <h3 className="text-base font-bold text-slate-900 mb-3">Itens da Proposta</h3>
        
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-slate-200">
              <th className="text-left py-2 px-1 text-xs font-bold text-slate-600 uppercase">#</th>
              <th className="text-left py-2 px-1 text-xs font-bold text-slate-600 uppercase">Código</th>
              <th className="text-left py-2 px-1 text-xs font-bold text-slate-600 uppercase">Descrição</th>
              <th className="text-center py-2 px-1 text-xs font-bold text-slate-600 uppercase">Qtd</th>
              <th className="text-center py-2 px-1 text-xs font-bold text-slate-600 uppercase">Un.</th>
              <th className="text-right py-2 px-1 text-xs font-bold text-slate-600 uppercase">Valor Un.</th>
              <th className="text-right py-2 px-1 text-xs font-bold text-slate-600 uppercase">Total</th>
            </tr>
          </thead>
          <tbody>
            {orcamento.produtos.map((produto, index) => (
              <tr key={produto.id} className="border-b border-slate-100">
                <td className="py-3 px-1 text-slate-700">{index + 1}</td>
                <td className="py-3 px-1 text-slate-700">{produto.codigo || '-'}</td>
                <td className="py-3 px-1 text-slate-900 font-medium">{produto.descricao}</td>
                <td className="py-3 px-1 text-center text-slate-700">{produto.quantidade}</td>
                <td className="py-3 px-1 text-center text-slate-700">{produto.unidade}</td>
                <td className="py-3 px-1 text-right text-slate-700">{formatCurrency(produto.preco)}</td>
                <td className="py-3 px-1 text-right font-semibold text-slate-900">{formatCurrency(produto.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total */}
        <div className="mt-4 flex justify-end">
          <div className="w-72">
            <div className="flex justify-between items-center py-3 border-t-2 border-blue-600">
              <span className="font-bold text-slate-900">VALOR TOTAL</span>
              <span className="text-2xl font-bold text-blue-600">
                {formatCurrency(orcamento.total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Condições */}
      <div className="px-6 pb-6">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-3 text-sm">Condições Comerciais</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-slate-600">Forma de Pagamento</p>
              <p className="font-semibold text-slate-900">{orcamento.condicoes.pagamento}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600">Validade</p>
              <p className="font-semibold text-slate-900">{orcamento.condicoes.validade} dias</p>
            </div>
          </div>
          {orcamento.condicoes.observacoes && (
            <div className="mt-3">
              <p className="text-xs text-slate-600">Observações</p>
              <p className="text-sm text-slate-700">{orcamento.condicoes.observacoes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-slate-900 text-white">
        <div className="flex items-center justify-between text-xs">
          <div>
            <p className="font-bold">JORI PAPEL</p>
            <p className="text-white/70">Distribuidor Oficial Santher RJ • 40 Anos</p>
          </div>
          <div className="text-right text-white/70">
            <p>vendas@joripapel.com.br</p>
            <p>Rio de Janeiro - RJ</p>
          </div>
        </div>
      </div>
    </div>
  )
})

PreviewOrcamento.displayName = 'PreviewOrcamento'

export default PreviewOrcamento
