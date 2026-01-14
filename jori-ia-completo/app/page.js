'use client';

import { useState, useRef, useEffect } from 'react';

// =====================================================
// BASE DE CONHECIMENTO E PRODUTOS
// =====================================================

const PRODUTOS = [
  {
    codigo: "PHI12",
    nome: "Papel Higiênico Interfolhado Personal Professional Folha Dupla",
    marca: "Personal Professional",
    tipo: "Interfolhado - Folha Dupla",
    embalagem: "20 pacotes × 600 folhas = 12.000 folhas",
    preco: 169.90,
    unidade: "fardo"
  },
  {
    codigo: "PHR25",
    nome: "Papel Higiênico Rolão Personal Professional Folha Dupla 250m",
    marca: "Personal Professional",
    tipo: "Rolo - Folha Dupla",
    embalagem: "8 rolos × 250m = 2.000m",
    preco: 101.90,
    unidade: "fardo"
  },
  {
    codigo: "EHR50",
    nome: "Papel Higiênico Rolão Eco Folha Simples 500m",
    marca: "Santher Eco",
    tipo: "Rolo - Folha Simples",
    embalagem: "8 rolos × 500m = 4.000m",
    preco: 125.50,
    unidade: "fardo"
  },
  {
    codigo: "ETI00",
    nome: "Papel Toalha Eco Interfolhado 3 Dobras",
    marca: "Santher Eco",
    tipo: "Interfolhado - 3 Dobras",
    embalagem: "6 pacotes × 400 folhas = 2.400 folhas",
    preco: 86.50,
    unidade: "fardo"
  },
  {
    codigo: "ITI01",
    nome: "Papel Toalha Inovatta Interfolhado Folha Simples",
    marca: "Inovatta",
    tipo: "Interfolhado - Folha Simples",
    embalagem: "10 pacotes × 240 folhas = 2.400 folhas",
    preco: 108.90,
    unidade: "fardo"
  },
  {
    codigo: "ITI02",
    nome: "Papel Toalha Inovatta Interfolhado Folha Dupla ⭐ MAIS VENDIDO",
    marca: "Inovatta",
    tipo: "Interfolhado - Folha Dupla",
    embalagem: "10 pacotes × 240 folhas = 2.400 folhas",
    preco: 132.50,
    unidade: "fardo"
  },
  {
    codigo: "ITI03",
    nome: "Papel Toalha Inovatta Interfolhado Folha Tripla",
    marca: "Inovatta",
    tipo: "Interfolhado - Folha Tripla",
    embalagem: "12 pacotes × 200 folhas = 2.400 folhas",
    preco: 154.50,
    unidade: "fardo"
  },
  {
    codigo: "ETB20",
    nome: "Papel Toalha Bobina Eco 250m",
    marca: "Santher Eco",
    tipo: "Bobina - Folha Simples",
    embalagem: "6 rolos × 250m = 1.500m",
    preco: 92.50,
    unidade: "fardo"
  },
  {
    codigo: "PTB30",
    nome: "Papel Toalha Bobina Personal Professional 300m",
    marca: "Personal Professional",
    tipo: "Bobina - Folha Dupla",
    embalagem: "6 rolos × 300m = 1.800m",
    preco: 134.90,
    unidade: "fardo"
  },
  {
    codigo: "SLE05",
    nome: "Sabonete Líquido Erva Doce 5L",
    marca: "Personal Professional",
    tipo: "Sabonete Líquido",
    embalagem: "Galão 5 litros",
    preco: 42.90,
    unidade: "galão"
  },
  {
    codigo: "AGE05",
    nome: "Álcool Gel 70% 5L",
    marca: "Personal Professional",
    tipo: "Álcool Gel Antisséptico",
    embalagem: "Galão 5 litros - Aprovado ANVISA",
    preco: 54.90,
    unidade: "galão"
  }
];

const SYSTEM_PROMPT = `Você é o Assistente Virtual Inteligente do **Grupo Jori Papel**, distribuidora oficial Santher com 40 anos de experiência no Grande Rio. Responda de forma profissional, consultiva e focada em benefícios. Use dados concretos sempre que possível.`;

// =====================================================
// COMPONENTE PRINCIPAL
// =====================================================

export default function JoriApp() {
  const [abaAtiva, setAbaAtiva] = useState('chat');
  
  // Estados do Chat
  const [mensagens, setMensagens] = useState([
    {
      tipo: 'assistant',
      texto: `👋 Olá! Sou o **Assistente IA do Grupo Jori Papel**!\n\nEstou aqui para ajudar com dúvidas sobre produtos, comodato e vendas.\n\n**Como posso ajudar?**`
    }
  ]);
  const [input, setInput] = useState('');
  const [carregando, setCarregando] = useState(false);
  const messagesEndRef = useRef(null);

  // Estados da Proposta
  const [dadosCliente, setDadosCliente] = useState({
    razaoSocial: '',
    cnpj: '',
    endereco: '',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    cep: '',
    contato: '',
    telefone: '',
    email: ''
  });
  
  const [itensProposta, setItensProposta] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [gerandoPDF, setGerandoPDF] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensagens]);

  // Funções do Chat
  const chamarClaudeAPI = async (historico) => {
    try {
      setCarregando(true);

      const mensagensAPI = historico.map(msg => ({
        role: msg.tipo === 'user' ? 'user' : 'assistant',
        content: msg.texto
      }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 2000,
          system: SYSTEM_PROMPT,
          messages: mensagensAPI
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      const respostaIA = data.content[0].text;
      
      setCarregando(false);
      return respostaIA;
    } catch (error) {
      console.error("Erro na API Claude:", error);
      setCarregando(false);
      return "Desculpe, tive um problema técnico momentâneo. Por favor, tente novamente ou entre em contato:\n\n📞 **(21) 3393-5566**";
    }
  };

  const enviarMensagem = async () => {
    if (!input.trim() || carregando) return;

    const novaMensagemUser = { tipo: 'user', texto: input };
    const novoHistorico = [...mensagens, novaMensagemUser];
    
    setMensagens(novoHistorico);
    setInput('');

    const respostaIA = await chamarClaudeAPI(novoHistorico);
    
    setMensagens(prev => [
      ...prev,
      { tipo: 'assistant', texto: respostaIA }
    ]);
  };

  // Funções da Proposta
  const adicionarItem = () => {
    if (!produtoSelecionado || quantidade < 1) return;

    const produto = PRODUTOS.find(p => p.codigo === produtoSelecionado);
    if (!produto) return;

    const novoItem = {
      ...produto,
      quantidade: quantidade,
      subtotal: produto.preco * quantidade
    };

    setItensProposta([...itensProposta, novoItem]);
    setProdutoSelecionado('');
    setQuantidade(1);
  };

  const removerItem = (index) => {
    setItensProposta(itensProposta.filter((_, i) => i !== index));
  };

  const calcularTotal = () => {
    return itensProposta.reduce((sum, item) => sum + item.subtotal, 0);
  };

  const gerarProposta = async () => {
    if (!dadosCliente.razaoSocial || itensProposta.length === 0) {
      alert('Preencha a Razão Social do cliente e adicione pelo menos um produto!');
      return;
    }

    setGerandoPDF(true);

    try {
      // Faz requisição para gerar PDF
      const response = await fetch('/api/gerar-proposta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cliente: dadosCliente,
          itens: itensProposta,
          total: calcularTotal()
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar PDF');
      }

      // Baixa o PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Proposta_${dadosCliente.razaoSocial.replace(/[^a-zA-Z0-9]/g, '_')}_${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      alert('✅ Proposta gerada com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      alert('❌ Erro ao gerar proposta. Verifique se o servidor Python está rodando.');
    } finally {
      setGerandoPDF(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="p-5 border-b border-white/10 bg-gradient-to-r from-blue-950/95 to-slate-950/95 backdrop-blur-xl shadow-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-xl opacity-30"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 p-3 rounded-2xl">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-white tracking-tight">JORI PAPEL</span>
                <span className="px-2 py-0.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[10px] font-bold rounded-full">PRO</span>
              </div>
              <span className="text-xs text-blue-300 font-medium">Sistema Completo • IA + Propostas</span>
            </div>
          </div>
          
          <a 
            href="https://wa.me/552133935566"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-2xl text-white font-bold transition-all shadow-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            (21) 3393-5566
          </a>
        </div>
      </header>

      {/* Abas */}
      <div className="bg-gradient-to-r from-slate-900/90 to-blue-900/90 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex gap-2 p-2">
          <button
            onClick={() => setAbaAtiva('chat')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              abaAtiva === 'chat'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Assistente IA
          </button>
          <button
            onClick={() => setAbaAtiva('proposta')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              abaAtiva === 'proposta'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Gerar Proposta PDF
          </button>
        </div>
      </div>

      {/* Conteúdo das Abas */}
      <div className="flex-1 overflow-y-auto">
        {abaAtiva === 'chat' && (
          <ChatIA
            mensagens={mensagens}
            input={input}
            setInput={setInput}
            enviarMensagem={enviarMensagem}
            carregando={carregando}
            messagesEndRef={messagesEndRef}
          />
        )}

        {abaAtiva === 'proposta' && (
          <GerarProposta
            dadosCliente={dadosCliente}
            setDadosCliente={setDadosCliente}
            itensProposta={itensProposta}
            produtoSelecionado={produtoSelecionado}
            setProdutoSelecionado={setProdutoSelecionado}
            quantidade={quantidade}
            setQuantidade={setQuantidade}
            adicionarItem={adicionarItem}
            removerItem={removerItem}
            calcularTotal={calcularTotal}
            gerarProposta={gerarProposta}
            gerandoPDF={gerandoPDF}
            PRODUTOS={PRODUTOS}
          />
        )}
      </div>
    </div>
  );
}

// =====================================================
// COMPONENTE CHAT IA
// =====================================================

function ChatIA({ mensagens, input, setInput, enviarMensagem, carregando, messagesEndRef }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 max-w-5xl mx-auto w-full">
        <div className="space-y-5">
          {mensagens.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.tipo === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start gap-3 max-w-[85%] ${msg.tipo === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  msg.tipo === 'user' 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700' 
                    : 'bg-gradient-to-br from-emerald-500 to-green-600'
                }`}>
                  {msg.tipo === 'user' ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  )}
                </div>

                <div className={`rounded-3xl p-5 shadow-2xl ${
                  msg.tipo === 'user' 
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-md' 
                    : 'bg-white/95 text-slate-800 rounded-bl-md border border-slate-200'
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {msg.texto.split('\n').map((line, i) => (
                      <p key={i} dangerouslySetInnerHTML={{ 
                        __html: line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                      }} className="mb-2 last:mb-0" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {carregando && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-500 to-green-600">
                  <svg className="w-6 h-6 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div className="bg-white/95 rounded-3xl p-5 shadow-2xl border border-slate-200 rounded-bl-md">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    <span className="ml-2 text-sm text-slate-600 font-medium">IA pensando...</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 bg-gradient-to-r from-slate-950/98 to-blue-950/98 border-t border-white/10 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && enviarMensagem()}
              placeholder="Digite sua pergunta..."
              disabled={carregando}
              className="flex-1 px-6 py-4 rounded-2xl bg-white/95 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg text-sm disabled:opacity-50"
            />
            <button
              onClick={enviarMensagem}
              disabled={carregando || !input.trim()}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg disabled:opacity-50 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =====================================================
// COMPONENTE GERAR PROPOSTA
// =====================================================

function GerarProposta({
  dadosCliente,
  setDadosCliente,
  itensProposta,
  produtoSelecionado,
  setProdutoSelecionado,
  quantidade,
  setQuantidade,
  adicionarItem,
  removerItem,
  calcularTotal,
  gerarProposta,
  gerandoPDF,
  PRODUTOS
}) {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Dados do Cliente */}
      <div className="bg-white/95 rounded-2xl p-6 shadow-xl border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Dados do Cliente
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Razão Social *</label>
            <input
              type="text"
              value={dadosCliente.razaoSocial}
              onChange={(e) => setDadosCliente({...dadosCliente, razaoSocial: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nome da empresa"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">CNPJ</label>
            <input
              type="text"
              value={dadosCliente.cnpj}
              onChange={(e) => setDadosCliente({...dadosCliente, cnpj: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="00.000.000/0000-00"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Endereço</label>
            <input
              type="text"
              value={dadosCliente.endereco}
              onChange={(e) => setDadosCliente({...dadosCliente, endereco: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Rua, número, bairro"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Cidade</label>
            <input
              type="text"
              value={dadosCliente.cidade}
              onChange={(e) => setDadosCliente({...dadosCliente, cidade: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Estado</label>
            <input
              type="text"
              value={dadosCliente.estado}
              onChange={(e) => setDadosCliente({...dadosCliente, estado: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength="2"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">CEP</label>
            <input
              type="text"
              value={dadosCliente.cep}
              onChange={(e) => setDadosCliente({...dadosCliente, cep: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="00000-000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contato</label>
            <input
              type="text"
              value={dadosCliente.contato}
              onChange={(e) => setDadosCliente({...dadosCliente, contato: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nome do responsável"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Telefone</label>
            <input
              type="text"
              value={dadosCliente.telefone}
              onChange={(e) => setDadosCliente({...dadosCliente, telefone: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="(21) 0000-0000"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={dadosCliente.email}
              onChange={(e) => setDadosCliente({...dadosCliente, email: e.target.value})}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="contato@empresa.com"
            />
          </div>
        </div>
      </div>

      {/* Adicionar Produtos */}
      <div className="bg-white/95 rounded-2xl p-6 shadow-xl border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Adicionar Produtos
        </h2>
        
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[300px]">
            <label className="block text-sm font-medium text-slate-700 mb-1">Produto</label>
            <select
              value={produtoSelecionado}
              onChange={(e) => setProdutoSelecionado(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Selecione um produto</option>
              {PRODUTOS.map(prod => (
                <option key={prod.codigo} value={prod.codigo}>
                  {prod.codigo} - {prod.nome} - R$ {prod.preco.toFixed(2)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="w-32">
            <label className="block text-sm font-medium text-slate-700 mb-1">Quantidade</label>
            <input
              type="number"
              min="1"
              value={quantidade}
              onChange={(e) => setQuantidade(parseInt(e.target.value) || 1)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={adicionarItem}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Adicionar
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Produtos */}
      {itensProposta.length > 0 && (
        <div className="bg-white/95 rounded-2xl p-6 shadow-xl border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Produtos na Proposta
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Código</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Produto</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Qtd</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">Preço Unit.</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">Subtotal</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {itensProposta.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-sm font-medium text-slate-900">{item.codigo}</td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      <div className="font-medium">{item.nome}</div>
                      <div className="text-xs text-slate-500">{item.embalagem}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-center text-slate-900">{item.quantidade}</td>
                    <td className="px-4 py-3 text-sm text-right text-slate-900">R$ {item.preco.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-right font-semibold text-slate-900">R$ {item.subtotal.toFixed(2)}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => removerItem(index)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-100">
                <tr>
                  <td colSpan="4" className="px-4 py-3 text-right text-base font-bold text-slate-900">
                    TOTAL:
                  </td>
                  <td className="px-4 py-3 text-right text-lg font-bold text-green-600">
                    R$ {calcularTotal().toFixed(2)}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>🎁 Incluso no Comodato:</strong> Todos os dispensers necessários, instalação profissional, manutenção e consultoria são <strong>100% GRATUITOS!</strong>
            </p>
          </div>
        </div>
      )}

      {/* Botão Gerar */}
      <div className="flex justify-center">
        <button
          onClick={gerarProposta}
          disabled={gerandoPDF || !dadosCliente.razaoSocial || itensProposta.length === 0}
          className="px-12 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
        >
          {gerandoPDF ? (
            <>
              <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Gerando PDF...
            </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Gerar Proposta em PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
}
