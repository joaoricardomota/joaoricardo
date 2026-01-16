'use client';

import { useState, useCallback } from 'react';
import { useStore, type Contato } from '@/lib/store';
import { processFile } from '@/lib/file-processors';
import { Upload, Check, X, FileSpreadsheet, FileText } from 'lucide-react';

interface ImportarProps {
  onComplete: () => void;
  showNotification: (type: 'success' | 'error', message: string) => void;
}

export default function Importar({ onComplete, showNotification }: ImportarProps) {
  const { addContatos } = useStore();
  const [importStep, setImportStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFiles, setProcessedFiles] = useState<{ name: string; count: number }[]>([]);
  const [importedData, setImportedData] = useState<Contato[]>([]);

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsProcessing(true);
    setProcessedFiles([]);
    const allResults: Contato[] = [];

    for (const file of files) {
      const results = await processFile(file);
      setProcessedFiles(prev => [...prev, { name: file.name, count: results.length }]);
      allResults.push(...results);
    }

    setImportedData(allResults);
    setIsProcessing(false);
    setImportStep(2);
  }, []);

  const confirmImport = () => {
    addContatos(importedData);
    showNotification('success', `${importedData.length} contatos importados com sucesso!`);
    setImportedData([]);
    setImportStep(1);
    onComplete();
  };

  const cancelImport = () => {
    setImportedData([]);
    setImportStep(1);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-800 mb-6">Importar Contatos</h2>

      {importStep === 1 && (
        <div className="bg-white rounded-2xl p-10 shadow-sm text-center">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Upload size={36} className="text-primary" />
          </div>

          <h3 className="text-2xl font-semibold text-slate-800 mb-3">
            Arraste seus arquivos ou clique para selecionar
          </h3>
          <p className="text-slate-500 mb-6">
            Suportamos Excel (.xlsx, .xls), PDF e Word (.docx)
          </p>

          <label className="inline-block px-10 py-4 bg-primary text-white rounded-xl font-semibold cursor-pointer hover:bg-primary/90 transition-colors">
            <input
              type="file"
              multiple
              accept=".xlsx,.xls,.pdf,.docx,.doc,.ods"
              onChange={handleFileUpload}
              className="hidden"
            />
            Selecionar Arquivos
          </label>

          {isProcessing && (
            <div className="mt-8">
              <div className="w-12 h-12 border-4 border-slate-200 border-t-primary rounded-full mx-auto mb-4 animate-spin" />
              <p className="text-slate-500">Processando arquivos...</p>
              {processedFiles.map((f, i) => (
                <div key={i} className="text-emerald-600 text-sm mt-2 flex items-center justify-center gap-2">
                  <Check size={16} />
                  {f.name} - {f.count} contatos
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="p-4 bg-slate-50 rounded-xl">
              <FileSpreadsheet className="mx-auto text-emerald-600 mb-2" size={32} />
              <div className="text-sm text-slate-600">Excel</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <FileText className="mx-auto text-red-500 mb-2" size={32} />
              <div className="text-sm text-slate-600">PDF</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl">
              <FileText className="mx-auto text-blue-600 mb-2" size={32} />
              <div className="text-sm text-slate-600">Word</div>
            </div>
          </div>
        </div>
      )}

      {importStep === 2 && importedData.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-800">Preview da Importação</h3>
              <p className="text-slate-500 text-sm">{importedData.length} contatos encontrados</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={cancelImport}
                className="px-6 py-3 rounded-xl border-2 border-slate-200 font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <X size={18} />
                Cancelar
              </button>
              <button
                onClick={confirmImport}
                className="px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors flex items-center gap-2"
              >
                <Check size={18} />
                Confirmar Importação
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  {['Nome', 'Contato', 'Telefone', 'Email', 'Bairro', 'Origem'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-slate-500 border-b-2 border-slate-200">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {importedData.slice(0, 50).map((item, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium">{item.nome}</td>
                    <td className="px-4 py-3 text-slate-500">{item.contato}</td>
                    <td className="px-4 py-3">{item.telefone}</td>
                    <td className="px-4 py-3 text-secondary">{item.email}</td>
                    <td className="px-4 py-3 text-slate-500">{item.bairro}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium">
                        {item.origem}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {importedData.length > 50 && (
              <p className="text-center text-slate-500 mt-4">
                ... e mais {importedData.length - 50} contatos
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
