import * as XLSX from 'xlsx';
import type { Contato } from './store';

const genId = () => Math.random().toString(36).substr(2, 9);

export const extractPhones = (text: string | number | null | undefined): string[] => {
  if (!text) return [];
  const str = String(text);
  const matches = str.match(/\(?\d{2}\)?\s*\d{4,5}[-.\s]?\d{4}/g) || [];
  return [...new Set(
    matches
      .map(m => m.replace(/\D/g, ''))
      .filter(p => p.length >= 10 && p.length <= 11)
  )];
};

export const extractEmails = (text: string | null | undefined): string[] => {
  if (!text) return [];
  const matches = String(text).match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  return [...new Set(matches.map(e => e.toLowerCase()))];
};

export const formatPhone = (phone: string): string => {
  const clean = String(phone).replace(/\D/g, '');
  if (clean.length === 11) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`;
  }
  if (clean.length === 10) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
  }
  return phone;
};

export const processExcel = async (file: File): Promise<Contato[]> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const wb = XLSX.read(data, { type: 'array' });
        const results: Contato[] = [];

        wb.SheetNames.forEach((name) => {
          const sheet = wb.Sheets[name];
          const json = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][];

          let headerRow = 0;
          for (let i = 0; i < Math.min(10, json.length); i++) {
            const row = json[i] || [];
            const txt = row.join(' ').toLowerCase();
            if (
              txt.includes('razao') ||
              txt.includes('nome') ||
              txt.includes('cliente') ||
              txt.includes('fantasia') ||
              txt.includes('telefone')
            ) {
              headerRow = i;
              break;
            }
          }

          const headers = (json[headerRow] || []).map((h) =>
            String(h || '').toLowerCase().trim()
          );

          const colMap = {
            nome: headers.findIndex(
              (h) =>
                h.includes('razao') ||
                h.includes('nome') ||
                h.includes('cliente') ||
                h === 'cli_raz'
            ),
            fantasia: headers.findIndex((h) => h.includes('fantasia')),
            cnpj: headers.findIndex(
              (h) => h.includes('cnpj') || h.includes('cpf') || h.includes('cgc')
            ),
            contato: headers.findIndex(
              (h) => h.includes('contato') || h === 'cli_contato'
            ),
            endereco: headers.findIndex(
              (h) =>
                h.includes('endereco') || h.includes('logra') || h === 'cli_logra'
            ),
            bairro: headers.findIndex(
              (h) => h.includes('bairro') || h === 'cli_bai'
            ),
            cidade: headers.findIndex(
              (h) => h.includes('cidade') || h.includes('municipio')
            ),
            telefone: headers.findIndex(
              (h) => h.includes('fone') || h.includes('telefone')
            ),
            telefone2: headers.findIndex(
              (h) => h.includes('fone2') || h.includes('telefone2')
            ),
            email: headers.findIndex(
              (h) => h.includes('email') || h.includes('e-mail')
            ),
          };

          for (let i = headerRow + 1; i < json.length; i++) {
            const row = json[i];
            if (!row || row.length === 0) continue;

            const rowText = row.join(' ');
            const nome = colMap.nome >= 0 ? String(row[colMap.nome] || '') : '';
            const fantasia =
              colMap.fantasia >= 0 ? String(row[colMap.fantasia] || '') : '';

            if (!nome && !fantasia) continue;

            const phones: string[] = [];
            if (colMap.telefone >= 0)
              phones.push(...extractPhones(row[colMap.telefone]));
            if (colMap.telefone2 >= 0)
              phones.push(...extractPhones(row[colMap.telefone2]));
            phones.push(...extractPhones(rowText));

            const emails =
              colMap.email >= 0
                ? extractEmails(row[colMap.email])
                : extractEmails(rowText);

            results.push({
              id: genId(),
              nome: nome || fantasia,
              fantasia,
              cnpj: colMap.cnpj >= 0 ? String(row[colMap.cnpj] || '') : '',
              contato: colMap.contato >= 0 ? String(row[colMap.contato] || '') : '',
              endereco:
                colMap.endereco >= 0 ? String(row[colMap.endereco] || '') : '',
              bairro: colMap.bairro >= 0 ? String(row[colMap.bairro] || '') : '',
              cidade: colMap.cidade >= 0 ? String(row[colMap.cidade] || '') : '',
              telefone: phones[0] ? formatPhone(phones[0]) : '',
              telefone2: phones[1] ? formatPhone(phones[1]) : '',
              email: emails[0] || '',
              origem: file.name,
              etapa: 'novo',
              tag: '',
              vendedor: '',
              observacoes: '',
              dataCadastro: new Date().toISOString(),
            });
          }
        });

        resolve(results);
      } catch (err) {
        console.error('Erro Excel:', err);
        resolve([]);
      }
    };
    reader.readAsArrayBuffer(file);
  });
};

export const processPDF = async (file: File): Promise<Contato[]> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
        
        const typedarray = new Uint8Array(e.target?.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        let fullText = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          fullText +=
            textContent.items.map((item: any) => item.str).join(' ') + '\n';
        }

        const results: Contato[] = [];
        const lines = fullText.split('\n');

        lines.forEach((line) => {
          const phones = extractPhones(line);
          const emails = extractEmails(line);

          if (phones.length > 0 || emails.length > 0) {
            const parts = line.split(/\s{2,}|\t/);
            let nome = '';
            for (const part of parts) {
              if (part.length > 5 && !part.match(/^\d/) && !part.includes('@')) {
                nome = part.trim();
                break;
              }
            }

            if (nome || phones.length > 0) {
              results.push({
                id: genId(),
                nome: nome || 'Sem nome',
                fantasia: '',
                cnpj: '',
                contato: '',
                endereco: '',
                bairro: '',
                cidade: '',
                telefone: phones[0] ? formatPhone(phones[0]) : '',
                telefone2: phones[1] ? formatPhone(phones[1]) : '',
                email: emails[0] || '',
                origem: file.name,
                etapa: 'novo',
                tag: '',
                vendedor: '',
                observacoes: '',
                dataCadastro: new Date().toISOString(),
              });
            }
          }
        });

        resolve(results);
      } catch (err) {
        console.error('Erro PDF:', err);
        resolve([]);
      }
    };
    reader.readAsArrayBuffer(file);
  });
};

export const processWord = async (file: File): Promise<Contato[]> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const mammoth = await import('mammoth');
        const result = await mammoth.extractRawText({
          arrayBuffer: e.target?.result as ArrayBuffer,
        });
        const results: Contato[] = [];

        result.value.split('\n').forEach((line) => {
          const phones = extractPhones(line);
          const emails = extractEmails(line);

          if (phones.length > 0 || emails.length > 0) {
            const parts = line.split(/\s{2,}|\t/);
            results.push({
              id: genId(),
              nome: parts[0] || 'Sem nome',
              fantasia: '',
              cnpj: '',
              contato: '',
              endereco: '',
              bairro: '',
              cidade: '',
              telefone: phones[0] ? formatPhone(phones[0]) : '',
              telefone2: phones[1] ? formatPhone(phones[1]) : '',
              email: emails[0] || '',
              origem: file.name,
              etapa: 'novo',
              tag: '',
              vendedor: '',
              observacoes: '',
              dataCadastro: new Date().toISOString(),
            });
          }
        });

        resolve(results);
      } catch (err) {
        console.error('Erro Word:', err);
        resolve([]);
      }
    };
    reader.readAsArrayBuffer(file);
  });
};

export const processFile = async (file: File): Promise<Contato[]> => {
  const ext = file.name.split('.').pop()?.toLowerCase() || '';
  
  if (['xlsx', 'xls', 'ods'].includes(ext)) {
    return processExcel(file);
  } else if (ext === 'pdf') {
    return processPDF(file);
  } else if (['docx', 'doc'].includes(ext)) {
    return processWord(file);
  }
  
  return [];
};
