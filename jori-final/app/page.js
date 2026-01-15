'use client'

import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'

export default function Home() {
  // Estados
  const [logo, setLogo] = useState(null)
  const [banner, setBanner] = useState(null)
  const [vendedor, setVendedor] = useState({ nome: '', telefone: '' })
  const [cliente, setCliente] = useState({ empresa: '', contato: '', whatsapp: '', email: '' })
  const [produtos, setProdutos] = useState([])
  const [condicoes, setCondicoes] = useState({ pagamento: 'À vista', validade: 7, observacoes: '' })
  const [mostrarModal, setMostrarModal] = useState(false)
  const [processando, setProcessando] = useState(false)
  const [abaAtiva, setAbaAtiva] = useState('imagens')
  const previewRef = useRef(null)

  // Upload de imagem para base64
  const handleUpload = (tipo) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (tipo === 'logo') {
            setLogo(event.target.result)
          } else {
            setBanner(event.target.result)
          }
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  // Produtos
  const adicionarProduto = () => {
    setProdutos([...produtos, {
      id: Date.now(),
      codigo: '',
      descricao: '',
      unidade: 'UN',
      quantidade: 1,
      preco: 0,
    }])
  }

  const removerProduto = (id) => {
    setProdutos(produtos.filter(p => p.id !== id))
  }

  const atualizarProduto = (id, campo, valor) => {
    setProdutos(produtos.map(p => p.id === id ? { ...p, [campo]: valor } : p))
  }

  const calcularTotal = () => {
    return produtos.reduce((sum, p) => sum + (p.quantidade * p.preco), 0)
  }

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor)
  }

  const formatarData = (data) => {
    return new Intl.DateTimeFormat('pt-BR').format(data)
  }

  // Gerar orçamento
  const gerarOrcamento = () => {
    if (produtos.length === 0) {
      alert('Adicione pelo menos um produto')
      return
    }
    setMostrarModal(true)
  }

  // Baixar imagem
  const baixarImagem = async () => {
    if (!previewRef.current) return
    setProcessando(true)
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      })
      const link = document.createElement('a')
      link.download = `orcamento-jori-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error(err)
      alert('Erro ao gerar imagem')
    }
    setProcessando(false)
  }

  // Compartilhar
  const compartilhar = async () => {
    if (!previewRef.current) return
    setProcessando(true)
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
      })
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], 'orcamento.png', { type: 'image/png' })
          if (navigator.share && navigator.canShare({ files: [file] })) {
            await navigator.share({ files: [file], title: 'Orçamento Jori Papel' })
          } else {
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `orcamento-jori-${Date.now()}.png`
            link.click()
            URL.revokeObjectURL(url)
          }
        }
        setProcessando(false)
      }, 'image/png')
    } catch (err) {
      console.error(err)
      setProcessando(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {logo ? (
              <img src={logo} alt="Logo" className="h-12 object-contain" />
            ) : (
              <div className="text-xl font-bold text-blue-600">🧻 JORI PAPEL</div>
            )}
          </div>
          <div className="text-sm text-gray-500">Sistema de Orçamentos</div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Abas */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['imagens', 'vendedor', 'cliente', 'produtos', 'condicoes'].map((aba) => (
            <button
              key={aba}
              onClick={() => setAbaAtiva(aba)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                abaAtiva === aba
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {aba === 'imagens' && '🖼️ Imagens'}
              {aba === 'vendedor' && '👤 Vendedor'}
              {aba === 'cliente' && '🏢 Cliente'}
              {aba === 'produtos' && '📦 Produtos'}
              {aba === 'condicoes' && '⚙️ Condições'}
            </button>
          ))}
        </div>

        {/* Conteúdo das Abas */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          
          {/* Aba Imagens */}
          {abaAtiva === 'imagens' && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">📷 Logo e Banner do Orçamento</h2>
              <p className="text-sm text-gray-500 mb-6">Estas imagens aparecerão em todos os orçamentos gerados</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Logo da Empresa</label>
                  <div 
                    onClick={() => handleUpload('logo')}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    {logo ? (
                      <div>
                        <img src={logo} alt="Logo" className="max-h-32 mx-auto mb-3 object-contain" />
                        <p className="text-sm text-blue-600">Clique para trocar</p>
                      </div>
                    ) : (
                      <div>
                        <div className="text-4xl mb-2">🏢</div>
                        <p className="text-gray-600 font-medium">Clique para carregar logo</p>
                        <p className="text-sm text-gray-400">PNG, JPG até 5MB</p>
                      </div>
                    )}
                  </div>
                  {logo && (
                    <button 
                      onClick={() => setLogo(null)} 
                      className="mt-2 text-sm text-red-500 hover:text-red-700"
                    >
                      Remover logo
                    </button>
                  )}
                </div>

                {/* Banner */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Banner / Imagem de Fundo</label>
                  <div 
                    onClick={() => handleUpload('banner')}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    {banner ? (
                      <div>
                        <img src={banner} alt="Banner" className="max-h-32 w-full mx-auto mb-3 object-cover rounded-lg" />
                        <p className="text-sm text-blue-600">Clique para trocar</p>
                      </div>
                    ) : (
                      <div>
                        <div className="text-4xl mb-2">🖼️</div>
                        <p className="text-gray-600 font-medium">Clique para carregar banner</p>
                        <p className="text-sm text-gray-400">PNG, JPG até 5MB</p>
                      </div>
                    )}
                  </div>
                  {banner && (
                    <button 
                      onClick={() => setBanner(null)} 
                      className="mt-2 text-sm text-red-500 hover:text-red-700"
                    >
                      Remover banner
                    </button>
                  )}
                </div>
              </div>

              {(!logo || !banner) && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Recomendado: Adicione logo e banner para um orçamento mais profissional
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Aba Vendedor */}
          {abaAtiva === 'vendedor' && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">👤 Dados do Vendedor</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nome</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                    placeholder="Nome do vendedor"
                    value={vendedor.nome}
                    onChange={(e) => setVendedor({ ...vendedor, nome: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                    placeholder="(21) 98765-4321"
                    value={vendedor.telefone}
                    onChange={(e) => setVendedor({ ...vendedor, telefone: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Aba Cliente */}
          {abaAtiva === 'cliente' && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">🏢 Dados do Cliente</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Empresa</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                    placeholder="Nome da empresa"
                    value={cliente.empresa}
                    onChange={(e) => setCliente({ ...cliente, empresa: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contato</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                    placeholder="Nome do contato"
                    value={cliente.contato}
                    onChange={(e) => setCliente({ ...cliente, contato: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                    placeholder="(21) 98765-4321"
                    value={cliente.whatsapp}
                    onChange={(e) => setCliente({ ...cliente, whatsapp: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                    placeholder="email@empresa.com"
                    value={cliente.email}
                    onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Aba Produtos */}
          {abaAtiva === 'produtos' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">📦 Produtos</h2>
                <button
                  onClick={adicionarProduto}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  + Adicionar Produto
                </button>
              </div>

              {produtos.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                  <div className="text-4xl mb-2">📦</div>
                  <p className="text-gray-600">Nenhum produto adicionado</p>
                  <p className="text-sm text-gray-400">Clique em "Adicionar Produto" para começar</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {produtos.map((produto, index) => (
                    <div key={produto.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1 grid grid-cols-2 sm:grid-cols-5 gap-3">
                          <div>
                            <label className="text-xs text-gray-500">Código</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                              placeholder="SKU"
                              value={produto.codigo}
                              onChange={(e) => atualizarProduto(produto.id, 'codigo', e.target.value)}
                            />
                          </div>
                          <div className="col-span-2">
                            <label className="text-xs text-gray-500">Descrição</label>
                            <input
                              type="text"
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                              placeholder="Nome do produto"
                              value={produto.descricao}
                              onChange={(e) => atualizarProduto(produto.id, 'descricao', e.target.value)}
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Qtd</label>
                            <input
                              type="number"
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                              min="1"
                              value={produto.quantidade}
                              onChange={(e) => atualizarProduto(produto.id, 'quantidade', Number(e.target.value))}
                            />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500">Preço</label>
                            <input
                              type="number"
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                              step="0.01"
                              min="0"
                              value={produto.preco}
                              onChange={(e) => atualizarProduto(produto.id, 'preco', Number(e.target.value))}
                            />
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Total</p>
                          <p className="font-bold text-gray-800">{formatarMoeda(produto.quantidade * produto.preco)}</p>
                          <button
                            onClick={() => removerProduto(produto.id)}
                            className="text-red-500 text-sm mt-1 hover:text-red-700"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Geral</p>
                      <p className="text-2xl font-bold text-blue-600">{formatarMoeda(calcularTotal())}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Aba Condições */}
          {abaAtiva === 'condicoes' && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">⚙️ Condições Comerciais</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pagamento</label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Validade (dias)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                    min="1"
                    value={condicoes.validade}
                    onChange={(e) => setCondicoes({ ...condicoes, validade: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Observações</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 outline-none"
                    placeholder="Observações..."
                    value={condicoes.observacoes}
                    onChange={(e) => setCondicoes({ ...condicoes, observacoes: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botão Gerar */}
        <div className="flex justify-end">
          <button
            onClick={gerarOrcamento}
            disabled={produtos.length === 0}
            className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            ✅ Gerar Orçamento
          </button>
        </div>
      </main>

      {/* Modal Preview */}
      {mostrarModal && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden">
            {/* Header Modal */}
            <div className="flex items-center justify-between p-4 border-b bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Orçamento Gerado</h2>
                <p className="text-sm text-gray-500">Baixe ou compartilhe</p>
              </div>
              <button 
                onClick={() => setMostrarModal(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Preview */}
            <div className="overflow-auto max-h-[calc(95vh-140px)] p-4 bg-gray-100">
              <div 
                ref={previewRef} 
                className="bg-white w-[700px] mx-auto shadow-xl"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {/* Banner */}
                {banner ? (
                  <div className="relative h-40 overflow-hidden">
                    <img src={banner} alt="Banner" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                      <div>
                        <h1 className="text-2xl font-bold text-white">PROPOSTA COMERCIAL</h1>
                        <p className="text-white/80 text-sm">Orçamento #{Date.now().toString().slice(-6)}</p>
                      </div>
                      {logo && (
                        <div className="bg-white rounded-lg p-2">
                          <img src={logo} alt="Logo" className="h-14 object-contain" />
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-600 p-6 flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-bold text-white">PROPOSTA COMERCIAL</h1>
                      <p className="text-white/80 text-sm">Orçamento #{Date.now().toString().slice(-6)}</p>
                    </div>
                    {logo && (
                      <div className="bg-white rounded-lg p-2">
                        <img src={logo} alt="Logo" className="h-14 object-contain" />
                      </div>
                    )}
                  </div>
                )}

                {/* Info */}
                <div className="p-4 bg-gray-50 border-b grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-blue-600 font-bold uppercase mb-1">Cliente</p>
                    <p className="font-bold text-gray-800">{cliente.empresa || '-'}</p>
                    <p className="text-gray-600">{cliente.contato || '-'}</p>
                    <p className="text-gray-500">{cliente.whatsapp || '-'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-600 font-bold uppercase mb-1">Vendedor</p>
                    <p className="font-bold text-gray-800">{vendedor.nome || '-'}</p>
                    <p className="text-gray-500">{vendedor.telefone || '-'}</p>
                    <p className="text-gray-500 mt-1">Data: {formatarData(new Date())}</p>
                  </div>
                </div>

                {/* Tabela */}
                <div className="p-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b-2 border-gray-200">
                        <th className="text-left py-2 text-xs text-gray-500 uppercase">#</th>
                        <th className="text-left py-2 text-xs text-gray-500 uppercase">Código</th>
                        <th className="text-left py-2 text-xs text-gray-500 uppercase">Descrição</th>
                        <th className="text-center py-2 text-xs text-gray-500 uppercase">Qtd</th>
                        <th className="text-right py-2 text-xs text-gray-500 uppercase">Valor</th>
                        <th className="text-right py-2 text-xs text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {produtos.map((p, i) => (
                        <tr key={p.id} className="border-b border-gray-100">
                          <td className="py-2 text-gray-600">{i + 1}</td>
                          <td className="py-2 text-gray-600">{p.codigo || '-'}</td>
                          <td className="py-2 text-gray-800 font-medium">{p.descricao}</td>
                          <td className="py-2 text-center text-gray-600">{p.quantidade}</td>
                          <td className="py-2 text-right text-gray-600">{formatarMoeda(p.preco)}</td>
                          <td className="py-2 text-right font-bold text-gray-800">{formatarMoeda(p.quantidade * p.preco)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="flex justify-end mt-4 pt-3 border-t-2 border-blue-600">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">TOTAL</p>
                      <p className="text-2xl font-bold text-blue-600">{formatarMoeda(calcularTotal())}</p>
                    </div>
                  </div>
                </div>

                {/* Condições */}
                <div className="px-4 pb-4">
                  <div className="bg-gray-50 rounded-lg p-3 text-sm">
                    <p className="font-bold text-gray-800 mb-2">Condições</p>
                    <div className="grid grid-cols-2 gap-2 text-gray-600">
                      <p><span className="text-gray-500">Pagamento:</span> {condicoes.pagamento}</p>
                      <p><span className="text-gray-500">Validade:</span> {condicoes.validade} dias</p>
                    </div>
                    {condicoes.observacoes && (
                      <p className="mt-2 text-gray-600"><span className="text-gray-500">Obs:</span> {condicoes.observacoes}</p>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-800 text-white p-4 text-xs">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold">JORI PAPEL</p>
                      <p className="text-gray-400">Distribuidor Oficial Santher RJ • 40 Anos</p>
                    </div>
                    <div className="text-right text-gray-400">
                      <p>Rio de Janeiro - RJ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Modal */}
            <div className="flex items-center justify-between p-4 border-t bg-white">
              <button 
                onClick={() => setMostrarModal(false)}
                className="px-6 py-3 border-2 border-gray-200 rounded-xl font-medium hover:bg-gray-50"
              >
                Fechar
              </button>
              <div className="flex gap-3">
                <button 
                  onClick={baixarImagem}
                  disabled={processando}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50"
                >
                  {processando ? '⏳ Gerando...' : '⬇️ Baixar'}
                </button>
                <button 
                  onClick={compartilhar}
                  disabled={processando}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50"
                >
                  {processando ? '⏳ Preparando...' : '📤 Compartilhar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
