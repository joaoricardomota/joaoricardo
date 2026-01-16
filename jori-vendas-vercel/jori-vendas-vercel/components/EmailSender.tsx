'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { EMAIL_TEMPLATES } from '@/lib/constants';
import { Send, Paperclip, FileText, Check } from 'lucide-react';

export default function EmailSender() {
  const { contatos, selectedContatos } = useStore();
  const [assunto, setAssunto] = useState('');
  const [corpo, setCorpo] = useState('');
  const [anexo, setAnexo] = useState<File | null>(null);

  const destinatarios = contatos.filter(c => selectedContatos.has(c.id) && c.email);

  const aplicarTemplate = (template: typeof EMAIL_TEMPLATES[0]) => {
    setAssunto(template.assunto);
    setCorpo(template.corpo);
  };

  const handleEnviar = () => {
    if (destinatarios.length === 0) {
      alert('Selecione contatos com email na aba Contatos!');
      return;
    }
    if (!assunto || !corpo) {
      alert('Preencha o assunto e a mensagem!');
      return;
    }
    alert(
      `Email preparado para ${destinatarios.length} destinatários!\n\nNota: Para envio real, integre com serviço de email (Resend, SendGrid, etc.)`
    );
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Disparador de E-mail</h2>

      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Destinatários */}
          <div>
            <label className="block mb-2 font-semibold text-slate-500 text-sm uppercase tracking-wide">
              Destinatários ({destinatarios.length} selecionados com email)
            </label>
            <div className="max-h-52 overflow-y-auto p-4 bg-slate-50 rounded-xl">
              {destinatarios.length === 0 ? (
                <p className="text-slate-400 text-center py-4">
                  Selecione contatos na aba Contatos
                </p>
              ) : (
                destinatarios.map(c => (
                  <div key={c.id} className="flex items-center gap-2 py-1.5 text-sm">
                    <Check size={16} className="text-emerald-500" />
                    <span className="font-medium">{c.nome}</span>
                    <span className="text-slate-400">({c.email})</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Templates */}
          <div>
            <label className="block mb-2 font-semibold text-slate-500 text-sm uppercase tracking-wide">
              Templates Prontos
            </label>
            <div className="space-y-2">
              {EMAIL_TEMPLATES.map((t, i) => (
                <button
                  key={i}
                  onClick={() => aplicarTemplate(t)}
                  className="w-full p-4 rounded-xl border-2 border-slate-200 bg-white text-left hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <div className="font-semibold text-slate-800 flex items-center gap-2">
                    <FileText size={18} className="text-primary" />
                    {t.nome}
                  </div>
                  <div className="text-sm text-slate-500 mt-1">{t.assunto}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div>
          <label className="block mb-2 font-semibold text-slate-500 text-sm uppercase tracking-wide">
            Assunto
          </label>
          <input
            type="text"
            value={assunto}
            onChange={(e) => setAssunto(e.target.value)}
            placeholder="Assunto do email..."
            className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-primary outline-none text-lg mb-6"
          />

          <label className="block mb-2 font-semibold text-slate-500 text-sm uppercase tracking-wide">
            Mensagem
            <span className="font-normal text-slate-400 ml-2">
              (Use {"{{nome}}"} para personalizar)
            </span>
          </label>
          <textarea
            value={corpo}
            onChange={(e) => setCorpo(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-primary outline-none min-h-[300px] resize-y leading-relaxed"
          />

          {/* Anexo */}
          <div className="mt-6 flex items-center gap-4">
            <label className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors">
              <input
                type="file"
                onChange={(e) => setAnexo(e.target.files?.[0] || null)}
                className="hidden"
              />
              <Paperclip size={18} className="text-slate-500" />
              Anexar arquivo
            </label>
            {anexo && (
              <span className="text-sm text-slate-500">
                {anexo.name}
                <button
                  onClick={() => setAnexo(null)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </span>
            )}
          </div>

          {/* Botão enviar */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleEnviar}
              className="px-8 py-4 rounded-xl bg-primary text-white font-semibold flex items-center gap-3 hover:bg-primary/90 transition-colors text-lg"
            >
              <Send size={20} />
              Enviar para {destinatarios.length} contatos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
