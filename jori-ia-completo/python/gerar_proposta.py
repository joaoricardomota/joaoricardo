#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import sys
import json
from datetime import datetime, timedelta
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_RIGHT, TA_LEFT, TA_JUSTIFY
from reportlab.pdfgen import canvas

def gerar_proposta_pdf(dados_json, output_path):
    """
    Gera uma proposta comercial moderna em PDF
    """
    dados = json.loads(dados_json)
    cliente = dados['cliente']
    itens = dados['itens']
    total = dados['total']
    
    # Criar documento
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm
    )
    
    # Estilos
    styles = getSampleStyleSheet()
    
    # Estilo customizado para título
    style_titulo = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=colors.HexColor('#1e40af'),
        spaceAfter=30,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )
    
    # Estilo para subtítulos
    style_subtitulo = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=colors.HexColor('#1e40af'),
        spaceAfter=12,
        spaceBefore=20,
        fontName='Helvetica-Bold'
    )
    
    # Estilo para texto normal
    style_normal = ParagraphStyle(
        'CustomNormal',
        parent=styles['Normal'],
        fontSize=10,
        textColor=colors.HexColor('#1e293b'),
        spaceAfter=6
    )
    
    # Estilo para destaque
    style_destaque = ParagraphStyle(
        'CustomDestaque',
        parent=styles['Normal'],
        fontSize=11,
        textColor=colors.HexColor('#059669'),
        spaceAfter=10,
        fontName='Helvetica-Bold'
    )
    
    # Container de elementos
    elements = []
    
    # =======================
    # CABEÇALHO
    # =======================
    
    # Logo/Título da empresa (texto estilizado como não temos logo)
    empresa_nome = Paragraph(
        '<font color="#1e40af" size="28"><b>GRUPO JORI PAPEL</b></font>',
        style_titulo
    )
    elements.append(empresa_nome)
    
    empresa_info = Paragraph(
        '<font color="#64748b" size="10">Distribuidora Oficial Santher • 40 Anos de Excelência</font>',
        ParagraphStyle('subtitle', parent=styles['Normal'], alignment=TA_CENTER, fontSize=10, textColor=colors.HexColor('#64748b'))
    )
    elements.append(empresa_info)
    elements.append(Spacer(1, 0.5*cm))
    
    # Linha divisória
    from reportlab.platypus import HRFlowable
    elements.append(HRFlowable(width="100%", thickness=2, color=colors.HexColor('#3b82f6'), spaceAfter=20))
    
    # =======================
    # TÍTULO DA PROPOSTA
    # =======================
    
    numero_proposta = f"PROP-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    
    titulo_proposta = Paragraph(
        f'<font size="18" color="#1e40af"><b>PROPOSTA COMERCIAL DE COMODATO</b></font>',
        ParagraphStyle('title', parent=styles['Normal'], alignment=TA_CENTER, spaceAfter=10)
    )
    elements.append(titulo_proposta)
    
    numero = Paragraph(
        f'<font size="10" color="#64748b">Proposta Nº {numero_proposta}</font>',
        ParagraphStyle('num', parent=styles['Normal'], alignment=TA_CENTER, spaceAfter=15)
    )
    elements.append(numero)
    
    data_emissao = datetime.now()
    data_validade = data_emissao + timedelta(days=15)
    
    info_data = Paragraph(
        f'<font size="9" color="#64748b">Emissão: {data_emissao.strftime("%d/%m/%Y")} | Validade: {data_validade.strftime("%d/%m/%Y")}</font>',
        ParagraphStyle('data', parent=styles['Normal'], alignment=TA_CENTER, spaceAfter=20)
    )
    elements.append(info_data)
    
    # =======================
    # DADOS DO CLIENTE
    # =======================
    
    elements.append(Paragraph('<b>DADOS DO CLIENTE</b>', style_subtitulo))
    
    # Tabela com dados do cliente
    dados_cliente_lista = [
        ['Razão Social:', cliente.get('razaoSocial', '')],
        ['CNPJ:', cliente.get('cnpj', 'Não informado')],
        ['Endereço:', cliente.get('endereco', 'Não informado')],
        ['Cidade/UF:', f"{cliente.get('cidade', 'Rio de Janeiro')}/{cliente.get('estado', 'RJ')}"],
        ['CEP:', cliente.get('cep', 'Não informado')],
        ['Contato:', cliente.get('contato', 'Não informado')],
        ['Telefone:', cliente.get('telefone', 'Não informado')],
        ['Email:', cliente.get('email', 'Não informado')]
    ]
    
    tabela_cliente = Table(dados_cliente_lista, colWidths=[4*cm, 13*cm])
    tabela_cliente.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#f1f5f9')),
        ('TEXTCOLOR', (0, 0), (0, -1), colors.HexColor('#1e40af')),
        ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('ALIGN', (0, 0), (0, -1), 'RIGHT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1'))
    ]))
    
    elements.append(tabela_cliente)
    elements.append(Spacer(1, 0.8*cm))
    
    # =======================
    # PRODUTOS E SERVIÇOS
    # =======================
    
    elements.append(Paragraph('<b>PRODUTOS E SERVIÇOS</b>', style_subtitulo))
    
    # Cabeçalho da tabela de produtos
    dados_produtos = [
        ['Cód.', 'Produto / Descrição', 'Qtd', 'Valor Unit.', 'Subtotal']
    ]
    
    # Adicionar produtos
    for item in itens:
        dados_produtos.append([
            item['codigo'],
            f"{item['nome']}\n{item['embalagem']}",
            str(item['quantidade']),
            f"R$ {item['preco']:.2f}",
            f"R$ {item['subtotal']:.2f}"
        ])
    
    # Linha de total
    dados_produtos.append(['', '', '', 'TOTAL:', f"R$ {total:.2f}"])
    
    # Criar tabela
    tabela_produtos = Table(
        dados_produtos,
        colWidths=[2*cm, 8.5*cm, 1.5*cm, 2.5*cm, 2.5*cm]
    )
    
    tabela_produtos.setStyle(TableStyle([
        # Cabeçalho
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1e40af')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 10),
        ('ALIGN', (0, 0), (-1, 0), 'CENTER'),
        
        # Linhas de produtos
        ('FONTSIZE', (0, 1), (-1, -2), 9),
        ('ALIGN', (0, 1), (0, -2), 'CENTER'),  # Código
        ('ALIGN', (1, 1), (1, -2), 'LEFT'),    # Produto
        ('ALIGN', (2, 1), (2, -2), 'CENTER'),  # Quantidade
        ('ALIGN', (3, 1), (3, -2), 'RIGHT'),   # Valor unitário
        ('ALIGN', (4, 1), (4, -2), 'RIGHT'),   # Subtotal
        
        # Linha total
        ('BACKGROUND', (0, -1), (-1, -1), colors.HexColor('#f1f5f9')),
        ('TEXTCOLOR', (3, -1), (-1, -1), colors.HexColor('#059669')),
        ('FONTNAME', (3, -1), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (3, -1), (-1, -1), 12),
        ('ALIGN', (3, -1), (3, -1), 'RIGHT'),
        ('ALIGN', (4, -1), (4, -1), 'RIGHT'),
        
        # Grid
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        
        # Padding
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        
        # Zebra striping (linhas alternadas)
        ('ROWBACKGROUNDS', (0, 1), (-1, -2), [colors.white, colors.HexColor('#f8fafc')])
    ]))
    
    elements.append(tabela_produtos)
    elements.append(Spacer(1, 0.8*cm))
    
    # =======================
    # CONDIÇÕES COMERCIAIS
    # =======================
    
    elements.append(Paragraph('<b>CONDIÇÕES COMERCIAIS</b>', style_subtitulo))
    
    condicoes = f"""
    <b>Prazo de Pagamento:</b> 28 dias<br/>
    <b>Prazo de Entrega:</b> Até 48 horas no Grande Rio<br/>
    <b>Validade da Proposta:</b> 15 dias corridos<br/>
    <b>Frete:</b> FOB (consultar condições especiais)
    """
    
    elements.append(Paragraph(condicoes, style_normal))
    elements.append(Spacer(1, 0.5*cm))
    
    # =======================
    # SISTEMA DE COMODATO (DESTAQUE)
    # =======================
    
    # Box de destaque
    comodato_texto = """
    <font color="#059669" size="12"><b>🎁 SISTEMA DE COMODATO INCLUSO - SEM CUSTO ADICIONAL!</b></font><br/>
    <font size="9">
    <br/>
    <b>O que está incluído gratuitamente:</b><br/>
    ✓ Todos os dispensers necessários (valor de R$ 300 a R$ 800 cada)<br/>
    ✓ Instalação profissional completa<br/>
    ✓ Manutenção preventiva e corretiva<br/>
    ✓ Substituição de equipamentos quando necessário<br/>
    ✓ Consultoria especializada e acompanhamento<br/>
    ✓ Sem multas de cancelamento<br/>
    ✓ Sem pedido mínimo mensal obrigatório<br/>
    <br/>
    <b>Economia comprovada:</b> Clientes reduzem de 30% a 40% o consumo de produtos devido ao<br/>
    controle de desperdício proporcionado pelos dispensers inteligentes!
    </font>
    """
    
    # Criar um frame com borda
    from reportlab.platypus import KeepTogether
    
    comodato_box = Paragraph(
        comodato_texto,
        ParagraphStyle(
            'comodato',
            parent=styles['Normal'],
            fontSize=9,
            leading=14,
            leftIndent=10,
            rightIndent=10,
            spaceAfter=10,
            spaceBefore=10,
            borderWidth=2,
            borderColor=colors.HexColor('#059669'),
            borderPadding=15,
            backColor=colors.HexColor('#f0fdf4')
        )
    )
    
    elements.append(comodato_box)
    elements.append(Spacer(1, 0.8*cm))
    
    # =======================
    # OBSERVAÇÕES
    # =======================
    
    elements.append(Paragraph('<b>OBSERVAÇÕES IMPORTANTES</b>', style_subtitulo))
    
    obs = """
    1. Produtos 100% originais Santher com garantia de fábrica<br/>
    2. Certificação FSC - Manejo Florestal Responsável<br/>
    3. 100% Celulose Virgem em todos os produtos<br/>
    4. Tecnologia japonesa de ponta (Daio Paper Corporation)<br/>
    5. Somos distribuidores oficiais Santher há 40 anos<br/>
    6. Suporte técnico especializado incluído<br/>
    7. Esta proposta não gera compromisso até assinatura formal
    """
    
    elements.append(Paragraph(obs, style_normal))
    elements.append(Spacer(1, 1*cm))
    
    # =======================
    # ASSINATURA
    # =======================
    
    elements.append(Spacer(1, 1.5*cm))
    
    linha_assinatura = Table(
        [['_' * 50], ['Assinatura e Carimbo']],
        colWidths=[17*cm]
    )
    linha_assinatura.setStyle(TableStyle([
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('TEXTCOLOR', (0, 0), (-1, -1), colors.HexColor('#64748b')),
        ('LINEABOVE', (0, 0), (-1, 0), 1, colors.HexColor('#1e40af'))
    ]))
    
    elements.append(linha_assinatura)
    
    # =======================
    # RODAPÉ
    # =======================
    
    def add_footer(canvas, doc):
        """Adiciona rodapé em todas as páginas"""
        canvas.saveState()
        
        # Linha superior do rodapé
        canvas.setStrokeColor(colors.HexColor('#3b82f6'))
        canvas.setLineWidth(2)
        canvas.line(2*cm, 2.5*cm, A4[0] - 2*cm, 2.5*cm)
        
        # Informações da empresa
        canvas.setFont('Helvetica-Bold', 10)
        canvas.setFillColor(colors.HexColor('#1e40af'))
        canvas.drawCentredString(A4[0] / 2, 2*cm, "GRUPO JORI PAPEL - JORI ARTEFATOS DE PAPEL LTDA")
        
        canvas.setFont('Helvetica', 8)
        canvas.setFillColor(colors.HexColor('#64748b'))
        
        info_linha1 = "CNPJ: 31.438.302/0001-70 | Rua Santa Mariana, 221 - Higienópolis, Rio de Janeiro - RJ, CEP 21061-150"
        canvas.drawCentredString(A4[0] / 2, 1.5*cm, info_linha1)
        
        info_linha2 = "Tel: (21) 3393-5566 | WhatsApp: (21) 3393-5566 | Email: contato@joripapel.com.br | Site: joripapel.com.br"
        canvas.drawCentredString(A4[0] / 2, 1.1*cm, info_linha2)
        
        # Número da página
        canvas.setFont('Helvetica', 8)
        canvas.drawRightString(A4[0] - 2*cm, 0.7*cm, f"Página {doc.page}")
        
        canvas.restoreState()
    
    # Build do PDF
    doc.build(elements, onFirstPage=add_footer, onLaterPages=add_footer)
    
    return output_path

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Uso: python gerar_proposta.py <dados_json> <output_path>")
        sys.exit(1)
    
    dados_json = sys.argv[1]
    output_path = sys.argv[2]
    
    try:
        resultado = gerar_proposta_pdf(dados_json, output_path)
        print(resultado)
    except Exception as e:
        print(f"ERRO: {str(e)}", file=sys.stderr)
        sys.exit(1)
