'use client'

import { useState, useRef } from 'react'
import { User, Building, Phone, Mail, Plus, Trash2, Package, X, Download, Share2, Award } from 'lucide-react'
import { formatCurrency, generateId } from '@/app/lib/utils'
import PreviewOrcamento from '@/app/components/PreviewOrcamento'
import html2canvas from 'html2canvas'

export default function Home() {
  const [vendedor, setVendedor] = useState({ nome: '', telefone: '' })
  const [cliente, setCliente] = useState({ empresa: '', contato: '', whatsapp: '', email: '' })
  const [produtos, setProdutos] = useState([])
  const [condicoes, setCondicoes] = useState({ pagamento: 'À vista', validade: 7, observacoes: '' })
  const [mostrarModal, setMostrarModal] = useState(false)
  const [orcamento, setOrcamento] = useState(null)
  const [processando, setProcessando] = useState(false)
  const previewRef = useRef(null)

  const adicionarProduto = () => {
    setProdutos([...produtos, {
      id: generateId(),
      codigo: '',
      descricao: '',
      unidade: 'UN',
      quantidade: 1,
      preco: 0,
      total: 0,
    }])
  }

  const removerProduto = (id) => {
    setProdutos(produtos.filter(p => p.id !== id))
  }

  const atualizarProduto = (id, campo, valor) => {
    setProdutos(produtos.map(p => {
      if (p.id === id) {
        const updated = { ...p, [campo]: valor }
        if (campo === 'quantidade' || campo === 'preco') {
          updated.total = updated.quantidade * updated.preco
        }
        return updated
      }
      return p
    }))
  }

  const calcularTotal = () => produtos.reduce((sum, p) => sum + p.total, 0)

  const gerarOrcamento = () => {
    const novoOrcamento = {
      vendedor,
      cliente,
      produtos,
      condicoes,
      total: calcularTotal(),
      dataEmissao: new Date(),
      numero: `ORC-${Date.now().toString().slice(-8)}`,
    }
    setOrcamento(novoOrcamento)
    setMostrarModal(true)
  }

  const baixarImagem = async () => {
    if (!previewRef.current) return
    setProcessando(true)
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
      })
      const link = document.createElement('a')
      link.download = `orcamento-${orcamento.numero}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (error) {
      console.error('Erro:', error)
      alert('Erro ao gerar imagem')
    } finally {
      setProcessando(false)
    }
  }

  const compartilhar = async () => {
    if (!previewRef.current) return
    setProcessando(true)
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
      })
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `orcamento-${orcamento.numero}.png`, { type: 'image/png' })
          if (navigator.share && navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file], title: `Orçamento ${orcamento.numero}` })
          } else {
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `orcamento-${orcamento.numero}.png`
            link.click()
            URL.revokeObjectURL(url)
          }
        }
        setProcessando(false)
      }, 'image/png')
    } catch (error) {
      console.error('Erro:', error)
      setProcessando(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.jpeg" alt="Jori Papel" className="h-12 w-auto" />
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="px-3 py-1.5 bg-amber-100 text-amber-800 rounded-full text-xs font-semibold flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              40 Anos
            </span>
            <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
              Distribuidor Santher
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        {/* Vendedor */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Dados do Vendedor</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Nome</label>
              <input
                type="text"
                className="input"
                placeholder="Nome do vendedor"
                value={vendedor.nome}
                onChange={(e) => setVendedor({ ...vendedor, nome: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Telefone</label>
              <input
                type="tel"
                className="input"
                placeholder="(21) 98765-4321"
                value={vendedor.telefone}
                onChange={(e) => setVendedor({ ...vendedor, telefone: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Cliente */}
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <Building className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Dados do Cliente</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <input
                type="tel"
                className="input"
                placeholder="(21) 98765-4321"
                value={cliente.whatsapp}
                onChange={(e) => setCliente({ ...cliente, whatsapp: e.target.value })}
              />
            </div>
            <div>
              <label className="label">E-mail</label>
              <input
                type="email"
                className="input"
                placeholder="email@empresa.com"
                value={cliente.email}
                onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Produtos */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">Produtos</h2>
            </div>
            <button onClick={adicionarProduto} className="btn btn-primary flex items-center gap-2 text-sm py-2">
              <Plus className="w-4 h-4" />
              Adicionar
            </button>
          </div>

          {produtos.length === 0 ? (
            <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-xl">
              <Package className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600">Nenhum produto adicionado</p>
              <p className="text-sm text-slate-400">Clique em "Adicionar" para começar</p>
            </div>
          ) : (
            <div className="space-y-3">
              {produtos.map((produto, index) => (
                <div key={produto.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center text-sm font-bold text-slate-700 shadow-sm flex-shrink-0 mt-6">
                      {index + 1}
                    </div>
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-6 gap-3">
                      <div className="col-span-1">
                        <label className="text-xs font-medium text-slate-600">Código</label>
                        <input
                          type="text"
                          className="input text-sm py-2"
                          placeholder="SKU"
                          value={produto.codigo}
                          onChange={(e) => atualizarProduto(produto.id, 'codigo', e.target.value)}
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-2">
                        <label className="text-xs font-medium text-slate-600">Descrição</label>
                        <input
                          type="text"
                          className="input text-sm py-2"
                          placeholder="Nome do produto"
                          value={produto.descricao}
                          onChange={(e) => atualizarProduto(produto.id, 'descricao', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600">Unidade</label>
                        <select
                          className="input text-sm py-2"
                          value={produto.unidade}
                          onChange={(e) => atualizarProduto(produto.id, 'unidade', e.target.value)}
                        >
                          <option>UN</option>
                          <option>CX</option>
                          <option>FD</option>
                          <option>KG</option>
                          <option>LT</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600">Qtd</label>
                        <input
                          type="number"
                          className="input text-sm py-2"
                          min="1"
                          value={produto.quantidade}
                          onChange={(e) => atualizarProduto(produto.id, 'quantidade', Number(e.target.value))}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-600">Preço</label>
                        <input
                          type="number"
                          className="input text-sm py-2"
                          step="0.01"
                          min="0"
                          value={produto.preco}
                          onChange={(e) => atualizarProduto(produto.id, 'preco', Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 flex-shrink-0">
                      <p className="text-xs text-slate-600">Total</p>
                      <p className="text-lg font-bold text-slate-900">{formatCurrency(produto.total)}</p>
                      <button
                        onClick={() => removerProduto(produto.id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-end pt-3 border-t border-slate-200">
                <div className="text-right">
                  <p className="text-sm text-slate-600">Total Geral</p>
                  <p className="text-2xl font-bold text-blue-600">{formatCurrency(calcularTotal())}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Condições */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-5">Condições Comerciais</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label">Pagamento</label>
              <select
                className="input"
                value={condicoes.pagamento}
                onChange={(e) => setCondicoes({ ...condicoes, pagamento: e.target.value })}
              >
                <option>À vista</option>
                <option>7 dias</option>
                <option>14 dias</option>
                <option>21 dias</option>
                <option>28 dias</option>
                <option>30/60 dias</option>
                <option>30/60/90 dias</option>
              </select>
            </div>
            <div>
              <label className="label">Validade (dias)</label>
              <input
                type="number"
                className="input"
                min="1"
                value={condicoes.validade}
                onChange={(e) => setCondicoes({ ...condicoes, validade: Number(e.target.value) })}
              />
            </div>
            <div className="md:col-span-1">
              <label className="label">Observações</label>
              <input
                type="text"
                className="input"
                placeholder="Observações..."
                value={condicoes.observacoes}
                onChange={(e) => setCondicoes({ ...condicoes, observacoes: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Botão Gerar */}
        <div className="flex justify-end">
          <button
            onClick={gerarOrcamento}
            disabled={produtos.length === 0}
            className="btn btn-success flex items-center gap-2 text-lg px-8"
          >
            <Share2 className="w-5 h-5" />
            Gerar Orçamento
          </button>
        </div>
      </main>

      {/* Modal */}
      {mostrarModal && orcamento && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Orçamento Gerado</h2>
                <p className="text-sm text-slate-600">Baixe ou compartilhe</p>
              </div>
              <button onClick={() => setMostrarModal(false)} className="p-2 hover:bg-slate-200 rounded-xl">
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="overflow-auto max-h-[calc(90vh-140px)] p-4 bg-slate-100">
              <PreviewOrcamento ref={previewRef} orcamento={orcamento} />
            </div>

            <div className="flex items-center justify-between p-4 border-t border-slate-200 bg-white">
              <button onClick={() => setMostrarModal(false)} className="btn btn-secondary">
                Fechar
              </button>
              <div className="flex gap-2">
                <button onClick={baixarImagem} disabled={processando} className="btn btn-primary flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  {processando ? 'Gerando...' : 'Baixar'}
                </button>
                <button onClick={compartilhar} disabled={processando} className="btn btn-success flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  {processando ? 'Preparando...' : 'Compartilhar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
