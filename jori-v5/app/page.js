'use client'

import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'

export default function Home() {
  // Estados
  const [logo, setLogo] = useState(null)
  const [banner, setBanner] = useState(null)
  const [vendedor, setVendedor] = useState({ nome: '', telefone: '' })
  const [cliente, setCliente] = useState({ empresa: '', contato: '', telefone: '', email: '' })
  const [produtos, setProdutos] = useState([])
  const [condicoes, setCondicoes] = useState({ 
    pagamento: 'À vista', 
    validade: 7, 
    frete: 'A combinar',
    comodato: 'Dispenser grátis*'
  })
  const [mostrarPreview, setMostrarPreview] = useState(false)
  const [processando, setProcessando] = useState(false)
  const [abaAtiva, setAbaAtiva] = useState('imagens')
  const previewRef = useRef(null)

  // Gerar número do orçamento
  const gerarNumero = () => Math.floor(100000 + Math.random() * 900000)
  const [numeroOrcamento] = useState(gerarNumero())

  // Upload de imagem
  const handleUpload = (tipo) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = e.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (tipo === 'logo') setLogo(event.target.result)
          else setBanner(event.target.result)
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
      tipo: 'UN',
      quantidade: 1,
      preco: 0,
    }])
  }

  const removerProduto = (id) => setProdutos(produtos.filter(p => p.id !== id))

  const atualizarProduto = (id, campo, valor) => {
    setProdutos(produtos.map(p => p.id === id ? { ...p, [campo]: valor } : p))
  }

  const calcularTotal = () => produtos.reduce((sum, p) => sum + (p.quantidade * p.preco), 0)

  const formatarMoeda = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  const formatarData = (dias = 0) => {
    const data = new Date()
    data.setDate(data.getDate() + dias)
    return data.toLocaleDateString('pt-BR')
  }

  // Gerar orçamento
  const gerarOrcamento = () => {
    if (produtos.length === 0) {
      alert('Adicione pelo menos um produto!')
      return
    }
    setMostrarPreview(true)
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
        logging: false,
      })
      const link = document.createElement('a')
      link.download = `orcamento-${numeroOrcamento}.png`
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
        logging: false,
      })
      canvas.toBlob(async (blob) => {
        if (blob) {
          const file = new File([blob], `orcamento-${numeroOrcamento}.png`, { type: 'image/png' })
          if (navigator.share && navigator.canShare?.({ files: [file] })) {
            await navigator.share({ files: [file], title: 'Orçamento Jori Papel' })
          } else {
            const url = URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `orcamento-${numeroOrcamento}.png`
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

  const abas = [
    { id: 'imagens', label: '🖼️ Imagens', icon: '🖼️' },
    { id: 'vendedor', label: '👤 Vendedor', icon: '👤' },
    { id: 'cliente', label: '🏢 Cliente', icon: '🏢' },
    { id: 'produtos', label: '📦 Produtos', icon: '📦' },
    { id: 'condicoes', label: '⚙️ Condições', icon: '⚙️' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {logo ? (
              <img src={logo} alt="Logo" className="h-10 object-contain" />
            ) : (
              <span className="text-lg font-bold text-jori-blue">🧻 JORI PAPEL</span>
            )}
          </div>
          <span className="text-sm text-gray-500">Sistema de Orçamentos</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* Abas */}
        <div className="flex gap-1 mb-4 overflow-x-auto pb-2">
          {abas.map((aba) => (
            <button
              key={aba.id}
              onClick={() => setAbaAtiva(aba.id)}
              className={`px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                abaAtiva === aba.id
                  ? 'bg-jori-blue text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {aba.label}
            </button>
          ))}
        </div>

        {/* Conteúdo */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          
          {/* ABA IMAGENS */}
          {abaAtiva === 'imagens' && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-1">Imagens do Orçamento</h2>
              <p className="text-sm text-gray-500 mb-6">Logo aparece no topo e o banner aparece após as condições comerciais</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Logo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Logo da Empresa</label>
                  <div 
                    onClick={() => handleUpload('logo')}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-jori-blue hover:bg-blue-50/50 transition-all min-h-[180px] flex flex-col items-center justify-center"
                  >
                    {logo ? (
                      <>
                        <img src={logo} alt="Logo" className="max-h-24 mb-3 object-contain" />
                        <span className="text-sm text-jori-blue font-medium">Clique para trocar</span>
                      </>
                    ) : (
                      <>
                        <span className="text-5xl mb-3">🏢</span>
                        <span className="text-gray-600 font-medium">Carregar Logo</span>
                        <span className="text-xs text-gray-400 mt-1">PNG, JPG (recomendado: fundo transparente)</span>
                      </>
                    )}
                  </div>
                  {logo && (
                    <button onClick={() => setLogo(null)} className="mt-2 text-sm text-red-500 hover:underline">
                      Remover
                    </button>
                  )}
                </div>

                {/* Banner */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Banner de Produtos</label>
                  <div 
                    onClick={() => handleUpload('banner')}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-jori-blue hover:bg-blue-50/50 transition-all min-h-[180px] flex flex-col items-center justify-center"
                  >
                    {banner ? (
                      <>
                        <img src={banner} alt="Banner" className="max-h-24 w-full object-cover rounded-lg mb-3" />
                        <span className="text-sm text-jori-blue font-medium">Clique para trocar</span>
                      </>
                    ) : (
                      <>
                        <span className="text-5xl mb-3">🖼️</span>
                        <span className="text-gray-600 font-medium">Carregar Banner</span>
                        <span className="text-xs text-gray-400 mt-1">Imagem dos produtos Santher</span>
                      </>
                    )}
                  </div>
                  {banner && (
                    <button onClick={() => setBanner(null)} className="mt-2 text-sm text-red-500 hover:underline">
                      Remover
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ABA VENDEDOR */}
          {abaAtiva === 'vendedor' && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Dados do Vendedor</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nome</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-jori-blue focus:outline-none transition-colors"
                    placeholder="Nome do vendedor"
                    value={vendedor.nome}
                    onChange={(e) => setVendedor({ ...vendedor, nome: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-jori-blue focus:outline-none transition-colors"
                    placeholder="21999999999"
                    value={vendedor.telefone}
                    onChange={(e) => setVendedor({ ...vendedor, telefone: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ABA CLIENTE */}
          {abaAtiva === 'cliente' && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Dados do Cliente</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Empresa</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-jori-blue focus:outline-none"
                    placeholder="Nome da empresa"
                    value={cliente.empresa}
                    onChange={(e) => setCliente({ ...cliente, empresa: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Contato</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-jori-blue focus:outline-none"
                    placeholder="Nome do contato"
                    value={cliente.contato}
                    onChange={(e) => setCliente({ ...cliente, contato: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-jori-blue focus:outline-none"
                    placeholder="21999999999"
                    value={cliente.telefone}
                    onChange={(e) => setCliente({ ...cliente, telefone: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-jori-blue focus:outline-none"
                    placeholder="email@empresa.com"
                    value={cliente.email}
                    onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ABA PRODUTOS */}
          {abaAtiva === 'produtos' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Produtos</h2>
                <button
                  onClick={adicionarProduto}
                  className="px-4 py-2 bg-jori-blue text-white rounded-lg font-medium hover:bg-jori-light transition-colors"
                >
                  + Adicionar
                </button>
              </div>

              {produtos.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-xl">
                  <span className="text-5xl block mb-3">📦</span>
                  <p className="text-gray-600 font-medium">Nenhum produto</p>
                  <p className="text-sm text-gray-400">Clique em "Adicionar" para incluir produtos</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {produtos.map((p, idx) => (
                    <div key={p.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                      <div className="grid grid-cols-12 gap-3 items-end">
                        <div className="col-span-2">
                          <label className="text-xs text-gray-500 block mb-1">Código</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-jori-blue focus:outline-none"
                            placeholder="PHI12"
                            value={p.codigo}
                            onChange={(e) => atualizarProduto(p.id, 'codigo', e.target.value)}
                          />
                        </div>
                        <div className="col-span-4">
                          <label className="text-xs text-gray-500 block mb-1">Produto</label>
                          <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-jori-blue focus:outline-none"
                            placeholder="Papel Hig. KAIKAI 20x600"
                            value={p.descricao}
                            onChange={(e) => atualizarProduto(p.id, 'descricao', e.target.value)}
                          />
                        </div>
                        <div className="col-span-1">
                          <label className="text-xs text-gray-500 block mb-1">Tipo</label>
                          <select
                            className="w-full px-2 py-2 border border-gray-200 rounded-lg text-sm focus:border-jori-blue focus:outline-none"
                            value={p.tipo}
                            onChange={(e) => atualizarProduto(p.id, 'tipo', e.target.value)}
                          >
                            <option>UN</option>
                            <option>CX</option>
                            <option>FD</option>
                            <option>PC</option>
                          </select>
                        </div>
                        <div className="col-span-1">
                          <label className="text-xs text-gray-500 block mb-1">Qtd</label>
                          <input
                            type="number"
                            className="w-full px-2 py-2 border border-gray-200 rounded-lg text-sm text-center focus:border-jori-blue focus:outline-none"
                            min="1"
                            value={p.quantidade}
                            onChange={(e) => atualizarProduto(p.id, 'quantidade', parseInt(e.target.value) || 1)}
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="text-xs text-gray-500 block mb-1">Preço Unit.</label>
                          <input
                            type="number"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-jori-blue focus:outline-none"
                            step="0.01"
                            min="0"
                            placeholder="0,00"
                            value={p.preco || ''}
                            onChange={(e) => atualizarProduto(p.id, 'preco', parseFloat(e.target.value) || 0)}
                          />
                        </div>
                        <div className="col-span-2 flex items-center justify-between">
                          <div>
                            <label className="text-xs text-gray-500 block mb-1">Total</label>
                            <span className="font-bold text-gray-800">{formatarMoeda(p.quantidade * p.preco)}</span>
                          </div>
                          <button
                            onClick={() => removerProduto(p.id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Remover"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end pt-4 border-t border-gray-200 mt-4">
                    <div className="text-right">
                      <span className="text-sm text-gray-500 block">Total Geral</span>
                      <span className="text-2xl font-bold text-jori-blue">{formatarMoeda(calcularTotal())}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ABA CONDIÇÕES */}
          {abaAtiva === 'condicoes' && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">Condições Comerciais</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Pagamento</label>
                  <select
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-jori-blue focus:outline-none"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-jori-blue focus:outline-none"
                    min="1"
                    value={condicoes.validade}
                    onChange={(e) => setCondicoes({ ...condicoes, validade: parseInt(e.target.value) || 7 })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Frete</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-jori-blue focus:outline-none"
                    placeholder="A combinar"
                    value={condicoes.frete}
                    onChange={(e) => setCondicoes({ ...condicoes, frete: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Comodato</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-jori-blue focus:outline-none"
                    placeholder="Dispenser grátis*"
                    value={condicoes.comodato}
                    onChange={(e) => setCondicoes({ ...condicoes, comodato: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Botão Gerar */}
        <button
          onClick={gerarOrcamento}
          disabled={produtos.length === 0}
          className="w-full py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg transition-all"
        >
          ✅ Gerar Orçamento
        </button>
      </main>

      {/* MODAL PREVIEW */}
      {mostrarPreview && (
        <div className="fixed inset-0 bg-black/70 z-50 overflow-auto py-4">
          <div className="max-w-3xl mx-auto px-4">
            <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
              {/* Header Modal */}
              <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">Orçamento Gerado</h2>
                  <p className="text-sm text-gray-500">Confira e compartilhe</p>
                </div>
                <button 
                  onClick={() => setMostrarPreview(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 text-xl"
                >
                  ✕
                </button>
              </div>

              {/* Preview do Orçamento */}
              <div className="p-4 bg-gray-100 overflow-auto">
                <div 
                  ref={previewRef} 
                  style={{ 
                    width: '595px', 
                    margin: '0 auto',
                    fontFamily: 'Arial, sans-serif',
                    backgroundColor: '#ffffff'
                  }}
                >
                  {/* === HEADER === */}
                  <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e5e5e5' }}>
                    <div>
                      {logo ? (
                        <img src={logo} alt="Logo" style={{ height: '60px', objectFit: 'contain' }} />
                      ) : (
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e3a5f' }}>JORI PAPEL</div>
                      )}
                    </div>
                    <div style={{ textAlign: 'right', fontSize: '13px', color: '#333' }}>
                      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Nº {numeroOrcamento}</div>
                      <div style={{ color: '#666', marginTop: '4px' }}>Data: {formatarData()}</div>
                      <div style={{ color: '#666' }}>Validade: {formatarData(condicoes.validade)}</div>
                    </div>
                  </div>

                  {/* === PROPOSTA COMERCIAL === */}
                  <div style={{ backgroundColor: '#1e3a5f', color: 'white', padding: '12px 20px', textAlign: 'center', fontSize: '16px', fontWeight: 'bold', letterSpacing: '2px' }}>
                    PROPOSTA COMERCIAL
                  </div>

                  {/* === CLIENTE === */}
                  <div style={{ padding: '20px' }}>
                    <div style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#1e3a5f', fontSize: '15px', fontWeight: 'bold' }}>
                        <span>📋</span> CLIENTE
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
                        <div><span style={{ color: '#666' }}>Empresa:</span> <strong>{cliente.empresa || '-'}</strong></div>
                        <div><span style={{ color: '#666' }}>Telefone:</span> <strong>{cliente.telefone || '-'}</strong></div>
                        <div><span style={{ color: '#666' }}>Contato:</span> <strong>{cliente.contato || '-'}</strong></div>
                        <div><span style={{ color: '#666' }}>E-mail:</span> <strong>{cliente.email || '-'}</strong></div>
                      </div>
                    </div>
                  </div>

                  {/* === TABELA PRODUTOS === */}
                  <div style={{ padding: '0 20px 20px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                      <thead>
                        <tr style={{ backgroundColor: '#1e3a5f', color: 'white' }}>
                          <th style={{ padding: '10px 8px', textAlign: 'left' }}>Código</th>
                          <th style={{ padding: '10px 8px', textAlign: 'left' }}>Produto</th>
                          <th style={{ padding: '10px 8px', textAlign: 'center' }}>Tipo</th>
                          <th style={{ padding: '10px 8px', textAlign: 'center' }}>Qtd</th>
                          <th style={{ padding: '10px 8px', textAlign: 'right' }}>Unit.</th>
                          <th style={{ padding: '10px 8px', textAlign: 'right' }}>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {produtos.map((p, idx) => (
                          <tr key={p.id} style={{ backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#ffffff', borderBottom: '1px solid #e5e5e5' }}>
                            <td style={{ padding: '10px 8px' }}>{p.codigo || '-'}</td>
                            <td style={{ padding: '10px 8px' }}>{p.descricao}</td>
                            <td style={{ padding: '10px 8px', textAlign: 'center' }}>{p.tipo}</td>
                            <td style={{ padding: '10px 8px', textAlign: 'center' }}>{p.quantidade}</td>
                            <td style={{ padding: '10px 8px', textAlign: 'right' }}>{formatarMoeda(p.preco)}</td>
                            <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 'bold' }}>{formatarMoeda(p.quantidade * p.preco)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {/* TOTAL */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 0', borderTop: '2px solid #1e3a5f', marginTop: '4px' }}>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '14px', color: '#666', marginRight: '16px' }}>TOTAL:</span>
                        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e3a5f' }}>{formatarMoeda(calcularTotal())}</span>
                      </div>
                    </div>
                  </div>

                  {/* === CONDIÇÕES COMERCIAIS === */}
                  <div style={{ padding: '0 20px 20px' }}>
                    <div style={{ backgroundColor: '#f5f5f5', borderRadius: '8px', padding: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: '#1e3a5f', fontSize: '15px', fontWeight: 'bold' }}>
                        <span>⚙️</span> CONDIÇÕES COMERCIAIS
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
                        <div><span style={{ color: '#666' }}>Pagamento:</span> {condicoes.pagamento}</div>
                        <div><span style={{ color: '#666' }}>Frete:</span> {condicoes.frete}</div>
                        <div><span style={{ color: '#666' }}>Validade:</span> {condicoes.validade} dias</div>
                        <div><span style={{ color: '#666' }}>Comodato:</span> {condicoes.comodato}</div>
                      </div>
                    </div>
                  </div>

                  {/* === BANNER === */}
                  {banner && (
                    <div style={{ padding: '0 20px 20px' }}>
                      <img src={banner} alt="Banner" style={{ width: '100%', borderRadius: '8px', display: 'block' }} />
                    </div>
                  )}

                  {/* === FOOTER === */}
                  <div style={{ backgroundColor: '#1e3a5f', color: 'white', padding: '16px 20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '14px', marginBottom: '4px' }}>
                      <strong>Vendedor:</strong> {vendedor.nome || '-'} | <strong>Tel:</strong> {vendedor.telefone || '-'}
                    </div>
                    <div style={{ fontSize: '12px', color: '#a0c4e8' }}>
                      Grupo Jori Papel - Distribuidor Oficial Santher RJ - 40 Anos
                    </div>
                    <div style={{ fontSize: '10px', color: '#7ba3c9', marginTop: '4px' }}>
                      *Comodato sujeito a análise. Proposta não constitui contrato. Preços sujeitos a alteração.
                    </div>
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="flex items-center justify-between p-4 bg-white border-t">
                <button 
                  onClick={() => setMostrarPreview(false)}
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
                    {processando ? '⏳ Gerando...' : '💾 Salvar Imagem'}
                  </button>
                  <button 
                    onClick={compartilhar}
                    disabled={processando}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50"
                  >
                    {processando ? '⏳...' : '📤 Compartilhar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
