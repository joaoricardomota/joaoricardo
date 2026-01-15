'use client';

import { useState, useRef } from 'react';
import { X, Download, Share2, Image as ImageIcon, Settings } from 'lucide-react';
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import FormularioOrcamento from './components/FormularioOrcamento';
import PreviewOrcamento from './components/PreviewOrcamento';
import { Orcamento, ConfiguracaoImagens } from './types';
import html2canvas from 'html2canvas';

export default function Home() {
  const [orcamentoAtual, setOrcamentoAtual] = useState<Orcamento | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarConfig, setMostrarConfig] = useState(false);
  const [imagens, setImagens] = useState<ConfiguracaoImagens>({
    logo: '/logo-jori.jpeg',
    banner: '/banner-santher.jpeg',
  });
  const [processando, setProcessando] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleGerarOrcamento = (orcamento: Orcamento) => {
    setOrcamentoAtual(orcamento);
    setMostrarModal(true);
  };

  const handleBaixarImagem = async () => {
    if (!previewRef.current) return;
    
    setProcessando(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `orcamento-${orcamentoAtual?.numero || 'jori'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Erro ao gerar imagem:', error);
      alert('Erro ao gerar imagem. Tente novamente.');
    } finally {
      setProcessando(false);
    }
  };

  const handleCompartilhar = async () => {
    if (!previewRef.current || !orcamentoAtual) return;
    
    setProcessando(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
      });
      
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `orcamento-${orcamentoAtual.numero}.png`, {
            type: 'image/png',
          });
          
          if (navigator.share && navigator.canShare({ files: [file] })) {
            navigator.share({
              files: [file],
              title: `Orçamento ${orcamentoAtual.numero}`,
              text: `Orçamento para ${orcamentoAtual.cliente.empresa}`,
            }).catch(console.error);
          } else {
            // Fallback: baixar imagem
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `orcamento-${orcamentoAtual.numero}.png`;
            link.click();
            URL.revokeObjectURL(url);
          }
        }
        setProcessando(false);
      }, 'image/png');
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
      alert('Erro ao compartilhar. Tente novamente.');
      setProcessando(false);
    }
  };

  const handleCarregarImagem = (tipo: 'logo' | 'banner') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setImagens({
            ...imagens,
            [tipo]: event.target?.result as string,
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleLimparImagens = () => {
    setImagens({ logo: '/logo-jori.jpeg', banner: '/banner-santher.jpeg' });
  };

  const handleRemoverImagens = () => {
    setImagens({ logo: null, banner: null });
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Dashboard */}
        <DashboardStats />

        {/* Botão Configurar Imagens */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={() => setMostrarConfig(!mostrarConfig)}
            className="btn btn-secondary flex items-center gap-2"
          >
            <Settings className="w-5 h-5" />
            Configurar Imagens
          </button>
        </div>

        {/* Painel de Configuração */}
        {mostrarConfig && (
          <div className="card p-6 mb-8 animate-slide-up">
            <h3 className="text-lg font-bold text-secondary-900 mb-4">
              Personalização de Imagens
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Logo */}
              <div>
                <label className="label">Logo da Empresa</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center">
                  {imagens.logo ? (
                    <div className="space-y-4">
                      <img
                        src={imagens.logo}
                        alt="Logo"
                        className="max-h-32 mx-auto object-contain"
                      />
                      <button
                        onClick={() => handleCarregarImagem('logo')}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Trocar imagem
                      </button>
                    </div>
                  ) : (
                    <div>
                      <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                      <button
                        onClick={() => handleCarregarImagem('logo')}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Carregar logo
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Banner */}
              <div>
                <label className="label">Banner do Cabeçalho</label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center">
                  {imagens.banner ? (
                    <div className="space-y-4">
                      <img
                        src={imagens.banner}
                        alt="Banner"
                        className="max-h-32 w-full mx-auto object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleCarregarImagem('banner')}
                        className="text-sm text-primary-600 hover:text-primary-700"
                      >
                        Trocar imagem
                      </button>
                    </div>
                  ) : (
                    <div>
                      <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                      <button
                        onClick={() => handleCarregarImagem('banner')}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      >
                        Carregar banner
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {(imagens.logo || imagens.banner) && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleLimparImagens}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Limpar todas as imagens
                </button>
              </div>
            )}
          </div>
        )}

        {/* Formulário */}
        <FormularioOrcamento onGerarOrcamento={handleGerarOrcamento} />
      </main>

      {/* Modal de Preview */}
      {mostrarModal && orcamentoAtual && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden animate-scale-in">
            {/* Header do Modal */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
              <div>
                <h2 className="text-2xl font-display font-bold text-secondary-900">
                  Orçamento Gerado
                </h2>
                <p className="text-sm text-secondary-600 mt-1">
                  Confira e escolha como deseja compartilhar
                </p>
              </div>
              <button
                onClick={() => setMostrarModal(false)}
                className="p-2 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <X className="w-6 h-6 text-secondary-600" />
              </button>
            </div>

            {/* Preview do Orçamento */}
            <div className="overflow-y-auto max-h-[calc(90vh-180px)] p-6 bg-slate-50">
              <PreviewOrcamento
                ref={previewRef}
                orcamento={orcamentoAtual}
                logo={imagens.logo}
                banner={imagens.banner}
              />
            </div>

            {/* Footer com Ações */}
            <div className="flex items-center justify-between p-6 border-t border-slate-200 bg-white">
              <button
                onClick={() => setMostrarModal(false)}
                className="btn btn-secondary"
              >
                Fechar
              </button>
              <div className="flex gap-3">
                <button
                  onClick={handleBaixarImagem}
                  disabled={processando}
                  className="btn btn-primary flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  {processando ? 'Gerando...' : 'Baixar Imagem'}
                </button>
                <button
                  onClick={handleCompartilhar}
                  disabled={processando}
                  className="btn btn-success flex items-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  {processando ? 'Preparando...' : 'Compartilhar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
