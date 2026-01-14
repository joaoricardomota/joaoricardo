import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs/promises';

const execPromise = promisify(exec);

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Cria arquivo temporário com dados
    const timestamp = Date.now();
    const tempDataPath = `/tmp/proposta_data_${timestamp}.json`;
    const tempPdfPath = `/tmp/proposta_${timestamp}.pdf`;
    
    await fs.writeFile(tempDataPath, JSON.stringify(data, null, 2));
    
    // Caminho do script Python
    const scriptPath = path.join(process.cwd(), 'scripts', 'gerar_proposta.py');
    
    // Executa Python
    const command = `python3 "${scriptPath}" "${tempDataPath}" "${tempPdfPath}"`;
    
    try {
      const { stdout, stderr } = await execPromise(command);
      
      if (stderr) {
        console.log('Python stderr:', stderr);
      }
      
      console.log('Python stdout:', stdout);
      
      // Lê o PDF gerado
      const pdfBuffer = await fs.readFile(tempPdfPath);
      
      // Limpa arquivos temporários
      await fs.unlink(tempDataPath).catch(() => {});
      await fs.unlink(tempPdfPath).catch(() => {});
      
      // Retorna o PDF
      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="Proposta_Jori_Papel.pdf"`
        }
      });
    } catch (execError) {
      console.error('Erro ao executar Python:', execError);
      
      // Limpa arquivos se existirem
      await fs.unlink(tempDataPath).catch(() => {});
      await fs.unlink(tempPdfPath).catch(() => {});
      
      throw execError;
    }
  } catch (error) {
    console.error('Erro geral:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar proposta: ' + error.message },
      { status: 500 }
    );
  }
}
